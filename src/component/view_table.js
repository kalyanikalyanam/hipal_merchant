import React from "react";
import firebase from '../config';
import Sidebar from './sidebar';
import Header from './header';
import {Link, withRouter} from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import {Form} from 'reactstrap';
import CartView from "./cart_view";
class ViewTables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          employer_sevice_message:'',
          table_name:'',
                    table_capacity:'',
                    table_floor:'',

                    table_icon:'',
                    table_notes:'',

                  table_qrcode:'',
                  status:'',
                  created_on: new Date().toLocaleString(),

                  customer_name:'',
                  customer_number:'',
                  mobile_message:'',
        };
        this.onChange = this
        .onChange
        .bind(this);
    this.validator = new SimpleReactValidator({
        className: "text-danger",
        validators: {
            passwordvalid: {
                message: "The :attribute must be at least 6 and at most 30 with 1 numeric,1 special charac" +
                        "ter and 1 alphabet.",
                rule: function (val, params, validator) {
                    // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
                    // params.indexOf(val) === -1
                    return (validator.helpers.testRegex(val, /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{6,30}$/i) && params.indexOf(val) === -1);
                }
            },
            passwordMismatch: {
                message: "confirm password must match with password field.",
                rule: function (val, params, validator) {
                    return document
                        .getElementById("password_input")
                        .value === val
                        ? true
                        : false;
                }
            },
            whitespace: {
                message: "The :attribute not allowed first whitespace   characters.",
                rule: function (val, params, validator) {
                    // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
                    // params.indexOf(val) === -1
                    return (validator.helpers.testRegex(val, /[^\s\\]/) && params.indexOf(val) === -1);
                }
            },
            specialChar: {
                message: "The :attribute not allowed special   characters.",
                rule: function (val, params, validator) {
                    // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
                    // params.indexOf(val) === -1
                    return (validator.helpers.testRegex(val, /^[ A-Za-z0-9_@./#&+-]*$/i) && params.indexOf(val) === -1);
                }
            },
            specialCharText: {
                message: "The :attribute may only contain letters, dot and spaces.",
                rule: function (val, params, validator) {
                    // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
                    // params.indexOf(val) === -1
                    return (validator.helpers.testRegex(val, /^[ A-Za-z_@./#&+-]*$/i) && params.indexOf(val) === -1);
                }
            },

            zip: {
                message: "Invalid Pin Code",
                rule: function (val, params, validator) {
                    // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
                    // params.indexOf(val) === -1
                    return (validator.helpers.testRegex(val, /^(\d{5}(\d{4})?)?$/i) && params.indexOf(val) === -1);
                }
            },
            website: {
                message: "The Url should be example.com ",
                rule: function (val, params, validator) {
                    // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
                    // params.indexOf(val) === -1
                    return (validator.helpers.testRegex(val, /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g) && params.indexOf(val) === -1);
                }
            },
            Fax: {
                message: "Invalid fax number ",
                rule: function (val, params, validator) {
                    return (validator.helpers.testRegex(val, /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i) && params.indexOf(val) === -1);
                }
            }
        }
    });
}
    


    componentDidMount() {
      this.setState({ loading: true });
      var sessionId = sessionStorage.getItem("RoleId");
      if(sessionId){
         
    console.log(sessionId);
      
          firebase
              .database().ref('merchant_users/' + sessionId).on('value', snapshot => {
           var Users = snapshot.val();
           console.log(Users);
           sessionStorage.setItem("username", Users.user_name);
           sessionStorage.setItem("email", Users.email_id);
         
          this.setState({
            userRole:Users.Role,loading: false
              
              
            });
           
           
          });
      }

     this.tableList();
         this.cartView();
         this.customerList();
     }
     cartView() {
      this.setState({loading: false});
  
      var cartItems = JSON.parse(localStorage.getItem('cartItems'));
  
      this.setState({
          cartList: cartItems,
          cartCount: cartItems
              ? cartItems.length
              : 0,
          loading: true
      });
  
  }

     tableList() {
      const {tableId} = this.props.match.params;
      console.log(tableId);

      var ref = firebase
          .database()
          .ref(`tables_with_floors/${tableId}`);

      ref.on('value', snapshot => {
          var userData = snapshot.val();
          console.log(userData)
          this.setState({
            table_name:userData.table_name,
            table_capacity:userData.table_capacity,
            table_floor:userData.table_floor,
            table_icon:userData.table_icon,
            table_notes:userData.table_notes,
            table_qrcode:userData.table_qrcode,
            status:userData.status,

           
          });
          //console.log(this.state.pageTitle);
      });

  }
customerList=()=>{
  this.setState({loading: true});
  var ref = firebase
      .database()
      .ref("Customer_with _tablename/").limitToLast(1);

  ref.on('value', snapshot => {
      const data = [];
      snapshot.forEach(childSnapShot => {

          const GSTData = {
              customerId: childSnapShot
                  .key
                  .toString(),
                  customer_name: childSnapShot
                  .val()
                  .customer_name,
                  customer_number:childSnapShot
                  .val().customer_number,
                  table_name:childSnapShot
                  .val().table_name,
                  created_on: childSnapShot
                  .val()
                  .created_on,


          };

          data.push(GSTData);
      });

      this.setState({customerList: data, countPage: data.length, loading: false});
      console.log(this.state.customerList);

  });
}
  onChange = (event) => {

    this.setState({
        [event.target.name]: event.target.value
    });
};


customerphonenumberchange  = (e) => {
    this.setState({
        customer_number: e.target.value
    });
    if(this.state.validError!=true){
       
        
        var ref = firebase
        .database()
        .ref('customers/').orderByChild("customer_phonenumber").equalTo(e.target.value);
        ref.on('value', snapshot => {
            var  user_exist = snapshot.numChildren();
            console.log(user_exist);
       
        if(user_exist>0 && this.state.validError!=true){
           
           
            this.setState({mobile_message: "customer Phone Number already exist",validError:false});

        }
      
        else
        {
            this.setState({mobile_message: "",validError:true});
           
        }
       
    })
}
   
};


    componentWillMount() {
   
        this.setState({loading: true});
        var ref = firebase
            .database()
            .ref("categories/");

        ref.on('value', snapshot => {
            const data = [];
            snapshot.forEach(childSnapShot => {

                const GSTData = {
                    categoryId: childSnapShot
                        .key
                        .toString(),
                        category: childSnapShot
                        .val()
                        .category,
                        category_photo:childSnapShot
                        .val().category_photo,
                        created_on: childSnapShot
                        .val()
                        .created_on,


                };

                data.push(GSTData);
            });

            this.setState({categoryList: data, countPage: data.length, loading: false});
            console.log(this.state.categoryList);
    
        });

	this.customerList();
		}
	
		handleChangeSinglePost = (value) => {
			this.setState({category: value});
    }
    


    handleSubmit = (event) => {
      event.preventDefault();
      if (this.validator.allValid()) {
          const {tableId} = this.props.match.params;
         
          var sessionId = sessionStorage.getItem("RoleId");
          var username = sessionStorage.getItem("username");
              let dbCon = firebase
                  .database()
                  .ref(`/tables_with_floors/${tableId}`);
              console.log(dbCon);
              dbCon.update({
                status:"Occupied", 
               });



               let dbCon1 = firebase
               .database()
               .ref('/Customer_with _tablename');
           
             
               dbCon1.push({
              


               customer_name:this.state.customer_name,
               customer_number:this.state.customer_number,
               table_name:this.state.table_name,
                sessionId:sessionId,
               username:username,

              
          
       
            });
            this.setState({
             
              customer_name:"",
              customer_number:"",


            });

// window.location.href=(`${tableId}`);
              this
                  .props
                  .history
                  .push( `${tableId}`);
                  // .push("/ViewTable");
                  // `tables_with_floors/${tableId}`
       
      } else {
          this
              .validator
              .showMessages();
          this.forceUpdate();
      }
    
  };




    render() {
        return (
          <>
       
          <div className="page-wrapper">
   

     <Sidebar/>
  
      
          <div className="page-container">
     
           <Header/>
            
              <div className="main-content">
                  <div className="section__content">
          
          
          
      
          
  <div className="container-fluid">
  
  <div className="row">
  
  <div className="col-md-12 p-0">
  
  <div className="search_profile">
  
  <div className="row">
  <div className="col-md-8">
  
  <div className="search_top">
  
  
      <a href="#" className="search_icon"><i className="fas fa-search"></i></a>       
    <input className="search_input" type="text" name="" placeholder="Search..."/>
           
  
      </div>
  </div>
  
  
  <div className="col-md-4 ">
  
  <div className="profile_user">
  <span className="usericon">
  <img src="/images/icon/profile.jpg"/>
  </span>
  <span className="profile_data">
  <p className="name">{sessionStorage.getItem("username")}</p>
  <p>{sessionStorage.getItem("email")}</p>
  </span>
  </div>
  
  
  </div>
  </div>
  
  </div>
  
  
  </div>
        
  </div>
  
  
  <div className="row mt-30">
  <a href="/Tables">
  <div className="col-md-4 view_table_arrow"> <img src="/images/icon/view_t-b_a.svg"/>View Table</div></a>
  <div className="col-md-8 table_heading_view">Table {this.state.table_name}</div>
  </div>
  
  <div className="row mt-30">
  
  <div className="col-lg-7">
  
  <div className="row">
  
  <div className="marge_table_btns mb-20">
  <span><button type="button" data-toggle="modal" data-target="#move">
Move
</button></span>
  <span><button type="button"  data-toggle="modal" data-target="#merge">
Merge
</button></span>
  <span><button type="button" data-toggle="modal" data-target="#swab">
Swab
</button></span>
  </div>



  





  
  <div className="people_box col-md-12 mb-20">
  <div className="row">
    
{this
                                                .state
                                                .customerList&&this.state.customerList
                                                .map((customer, index) => {

                                                    return (
  
  <div className="col-md-7 p-0" key={index}>
  <ol className="people_list">
  <li>{customer.customer_name}</li>

  </ol>
  </div>
                                                    )})}
  
  <div className="col-md-5">
  <div className="col-md-12  m-b-15 add_button_orange" data-toggle="modal" data-target="#add_customer"><span>ADD</span>
  </div>
  <div className="col-md-12">
  <span>
  <div className="waiter_dropdown">		
  <div className="dropdown">
    <button className="btn dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
      <span>
    <img src="/images/filter_icon.png"/>
    </span>Choose Waiter
      <span className="caret"></span>
    </button>
    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
      <li><a href="#" data-value="Floor 1">Waiter 1</a></li>
      <li><a href="#" data-value="Floor 2">Waiter 2</a></li>
      <li><a href="#" data-value="Floor 3">Waiter 3</a></li>
      <li><a href="#" data-value="Floor 4">Waiter 4</a></li>
    </ul>
  </div>
  </div>
  </span></div>
  
  </div>
  
  
  </div></div>
  
  
  <div className="col-md-12 confirm_cancel_cart mb-20 p-0">
  <span className="bnt con_cart_btn">Confirm cart <span className="cart_no">{this.state.cartCount}</span></span>
  <span className="btn cancel_btn">Cancel</span>
  </div>
  
  <div className="col-md-12 menu_category_block p-0">
  <div className="category_menu_search">
  {/* <span className="cate_menu">
 <a href="view_table.html" className="current">Menu</a> / 
  <a href="view_table_1.html">Category 1</a> / 
  <a href="view_table_2.html">Category 2</a>
  </span> */}
 
 <span className="cate_menu">
    <a href="#">Menu</a> 
   
    </span>

  <span className="cate_search">
  <input type="text" placeholder="Search"/>
  <a href="#" className="search_icon"><i className="fas fa-search"></i></a>
  </span>
  </div>
  
  
  <div className="cate_images_blk">
  
  <div className="row">


  

{this
                                                .state
                                                .categoryList&&this.state.categoryList
                                                .map((data, index) => {

                                                    return (
  <div className="col-md-4 mb-15"  key={index}>
      <Link to={`/ViewTables1/${data.category}`}>
  <div className="cate_img_box"style={{background:"#fd0606"}}>

  <img src="/images/category_img.png"/>
  
  <p> {data.category}</p>
                                           
  </div>
  </Link>
  </div>
          
         )

        })}
 
  
  
  
  
  </div>
  
  
  <div cl="row">
  <div className="pagi_nation w-100">
  <a href="#" className="activepage">1</a>
  <a href="#">2</a>
  <a href="#">3</a>
  </div>
  </div>
  
  </div>
  
  
  
  
  </div>
  
  
  </div>
      
      
          
  </div>
  
  
 
  
  <CartView/>
  </div></div>
  
  
  
  
  
  </div>
  
  
  
  
  
  
  
  </div>
                 
  
  
  
  
  
  
  
           </div>
              
        
        </div>




        {/* {this
                                                .state
                                                .categoryList&&this.state.categoryList
                                                .map((data, index) => {

                                                    return (
                                                      <> */}

        <div className="modal fade" id="add_customer" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true">
<div className="modal-dialog modal-sm hipal_pop" role="document">

<Form onSubmit={this.handleSubmit}>
<div className="modal-content">

<div className="modal-header">
<h5 className="modal-title" id="smallmodalLabel">Add Customer to Table {this.state.table_name}</h5>
</div>
<div className="modal-body">
<div className="col-12 w-100-row ocupeny_no m-t-10">Occupancy <span>{this.state.table_capacity}</span></div>
<div className="col-12 w-100-row">
<div className="w-10 no">01</div>
<div className="w-45 field">
<div className="form-group">
<input type="text" 
name="customer_name"
onChange={this.onChange}
value={this.state.customer_name}
placeholder="Name" className="form-control"/>
</div>
{this .validator.message("Customer Name", this.state.customer_name, "required|whitespace|min:2|max:70")}
</div>
<div className="w-45 field">
<div className="form-group">
<input type="number" id="text-input" 
name="customer_number"
onChange={this.customerphonenumberchange}
value={this.state.customer_number} placeholder="Number" className="form-control"/>
</div>
{this .validator.message("Customer Number", this.state.customer_number, "required|min:10|max:10")}
<div className="text-danger">
                                                        {" "}
                                                        {this.state.mobile_message}
                                                        </div>
</div>
</div>
{/* <div className="col-12 w-100-row">
<div className="w-10 no">02</div>
<div className="w-45 field">
<div className="form-group">
<input type="text" id="text-input" name="text-input" placeholder="Name" className="form-control"/>
</div>
</div>
<div className="w-45 field">
<div className="form-group">
<input type="text" id="text-input" name="text-input" placeholder="Number" className="form-control"/>
</div>
</div>
</div>
<div className="col-12 w-100-row">
<div className="w-10 no">03</div>
<div className="w-45 field">
<div className="form-group">
<input type="text" id="text-input" name="text-input" placeholder="Name" className="form-control"/>
</div>
</div>
<div className="w-45 field">
<div className="form-group">
<input type="text" id="text-input" name="text-input" placeholder="Number" className="form-control"/>
</div>
</div>
</div>
*/}

{/* <div className="col-12 w-100-row text-center"><span className="btn add_btn_pop_orange">ADD</span></div> */}
</div> 


<div className="modal-footer">
<button type="button" className="btn close_btn" data-dismiss="modal">Close </button>
<button type="submit" className="btn save_btn">Save</button>
</div>


</div>
</Form>

</div>

</div>
{/* </>

                                                    )})} */}





<div className="modal fade" id="swab" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true">
<div className="modal-dialog modal-sm hipal_pop" role="document">
<div className="modal-content">


<div className="modal-header">
<h5 className="modal-title" id="smallmodalLabel">Swab
</h5></div>


<div className="modal-body product_edit">



<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">

<div className="table_no_box">
Tabel 07
</div>


<p className="swab_box1">Customers <span>+3</span></p>
<p className="swab_box1">Customers <span>14</span></p>


</div>

<div className="col col-md-4">
<label className=" form-control-label">
<img src="images/icon/left_right_arrow.png"/>
</label>
</div>


<div className="col col-md-4">

<div className="table_no_box">
Tabel 17
</div>

<p className="swab_box2">Customers <span>+3</span></p>
<p className="swab_box2">Customers <span>14</span></p>

</div>




</div>
</div>




<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Current Table</label>
</div>
<div className="col-12 col-md-6">
<input type="text" id="text-input" name="text-input" placeholder="Table 07" className="form-control edit_product"/>

<div className="customers_merge">
<div className="left"><span>3+</span>Customers</div>
<div className="right"><span>14</span>Orders</div>
</div>

</div>
</div>
</div>


<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Swab with</label>
</div>
<div className="col-12 col-md-6">
<select name="select" id="select" className="form-control edit_product">
<option value="0">Table 5</option>
</select>

<div className="customers_merge">
<div className="left"><span>1+</span>Customers</div>
<div className="right"><span>1</span>Orders</div>
</div>

</div>
</div>
</div>





</div>



<div className="modal-footer">
<button type="button" className="btn close_btn" data-dismiss="modal">Close</button>
<button type="button" className="btn save_btn">Save</button>
</div>


</div>
</div>
</div>




<div className="modal fade" id="merge" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true">
<div className="modal-dialog modal-sm hipal_pop" role="document">
<div className="modal-content">


<div className="modal-header">
<h5 className="modal-title" id="smallmodalLabel">Merge
</h5></div>


<div className="modal-body product_edit">



<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Billing Table</label>
</div>
<div className="col-12 col-md-8">
<div className="bill_table">Table 07</div>
<div className="customers_merge bill_merge">
<div className="left"><span>3+</span>Customers</div>
<div className="right"><span>14</span>Orders</div>
</div>

</div>
</div>
</div>




<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Current Table</label>
</div>
<div className="col-12 col-md-6">
<input type="text" id="text-input" name="text-input" placeholder="Table 07" className="form-control edit_product"/>

<div className="customers_merge">
<div className="left"><span>3+</span>Customers</div>
<div className="right"><span>14</span>Orders</div>
</div>

</div>
</div>
</div>


<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Merge with</label>
</div>
<div className="col-12 col-md-6">
<select name="select" id="select" className="form-control edit_product">
<option value="0">5</option>
</select>

<div className="customers_merge">
<div className="left"><span>3+</span>Customers</div>
<div className="right"><span>14</span>Orders</div>
</div>

</div>
</div>
</div>





</div>



<div className="modal-footer">
<button type="button" className="btn close_btn" data-dismiss="modal">Close</button>
<button type="button" className="btn save_btn">Save</button>
</div>


</div>
</div>
</div>

		
<div className="modal fade" id="move" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true">
<div className="modal-dialog modal-sm hipal_pop" role="document">
<div className="modal-content">


<div className="modal-header">
<h5 className="modal-title" id="smallmodalLabel">Move
</h5></div>


<div className="modal-body product_edit">


<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Current Table</label>
</div>
<div className="col-12 col-md-6">
<input type="text" id="text-input" name="text-input" placeholder="Table 07" className="form-control edit_product"/>

<div className="customers_merge">
<div className="left"><span>3+</span>Customers</div>
<div className="right"><span>14</span>Orders</div>
</div>

</div>
</div>
</div>


<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Move to</label>
</div>
<div className="col-12 col-md-6">
<select name="select" id="select" className="form-control edit_product">
<option value="0">5</option>
</select>
</div>
</div>
</div>





</div>



<div className="modal-footer">
<button type="button" className="btn close_btn" data-dismiss="modal">Close</button>
<button type="button" className="btn save_btn">Save</button>
</div>


</div>
</div>
</div>
           
           
           </>
           
               
        );
    }
}



export default ViewTables;


