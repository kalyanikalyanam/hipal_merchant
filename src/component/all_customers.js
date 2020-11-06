import React from "react";
import firebase from '../config';
import Sidebar from './sidebar';
import Header from './header';
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import {Form} from 'reactstrap';
import {Link} from "react-router-dom";
import swal from 'sweetalert';
class AllCustomers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            created_on: new Date().toLocaleString(),
            employer_sevice_message:'',
            email_message:'',
            mobile_message:'',

            customer_name:'',
            customer_email:'',
            customer_phonenumber:'',
            customer_notes:'',
        };



        this.onChange = this
        .onChange
        .bind(this);

        this.deleteItem = this
        .deleteItem
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
        var businessId = sessionStorage.getItem("businessId");
        if (sessionId) {
          //console.log(sessionId);
    
          firebase
            .database()
            .ref("merchant_users/" + sessionId)
            .on("value", (snapshot) => {
              var Users = snapshot.val();
              //console.log(Users);
              sessionStorage.setItem("username", Users.user_name);
              sessionStorage.setItem("email", Users.email_id);
    
              this.setState({
                userRole: Users.Role,
                loading: false,
              });
            });
    
            firebase
            .database().ref('merchaant_business_details/' + businessId).on('value', snapshot => {
         var business = snapshot.val();
         console.log(business);
         sessionStorage.setItem("BusinessId", business.businessId);
         sessionStorage.setItem("BusinessName", business.business_name);
         sessionStorage.setItem("BusinessLogo", business.business_logo);
       
        this.setState({
        
            
            
          });
    
          
         
         
        });
        }

        this.customersList();
           
       }

       customersList=()=>{
        var sessionId = sessionStorage.getItem("RoleId");
        var businessId = sessionStorage.getItem("businessId");
        this.setState({loading: true});
        var ref = firebase
            .database()
            .ref("customers/").orderByChild("sessionId").equalTo(sessionId);

        ref.on('value', snapshot => {
            const data = [];
            snapshot.forEach(childSnapShot => {

                const GSTData = {
                    customerId: childSnapShot.key .toString(),
                       
                    customer_name: childSnapShot.val().customer_name,
                    customer_email: childSnapShot.val().customer_email,
                    customer_phonenumber: childSnapShot.val().customer_phonenumber,
                    customer_notes: childSnapShot.val().customer_notes,
                      

                       

 };

                data.push(GSTData);
            });
            let sortedKeys = data.filter((res) => {
                return res.businessId === businessId;
              });
            this.setState({customersList: sortedKeys, countPage: data.length, loading: false});
            console.log(this.state.customersList);
    
        });


    }


  

       handleSubmit = (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
          
            var sessionId = sessionStorage.getItem("RoleId");
            var username = sessionStorage.getItem("username");
            var businessId = sessionStorage.getItem("businessId");
            let dbCon = firebase
                .database()
                .ref('/customers');
            
              
            dbCon.push({
               
                created_on:this.state.created_on,

                customer_name:this.state.customer_name,
                customer_email:this.state.customer_email,
                customer_phonenumber:this.state.customer_phonenumber,

                customer_notes:this.state.customer_notes,

                

                
                sessionId:sessionId,
                username:username,
                businessId:businessId,
               
           
        
             });
             this.setState({
                employer_sevice_message:"Data Added",
                customer_name:'',
                customer_email:'',
                customer_phonenumber:'',
                customer_notes:'',
             })
window.location.href="/AllCustomers";

            // this
            //     .props
            //     .history
            //     .push("/AllCustomers");
        } else {
            this
                .validator
                .showMessages();
            this.forceUpdate();
        }

    };

    customeremailchange  = (e) => {
        this.setState({
            customer_email: e.target.value
        });
        if(this.state.validError!=true){
           
            
            var ref = firebase
            .database()
            .ref('customers/').orderByChild("customer_email").equalTo(e.target.value);
            ref.on('value', snapshot => {
                var  user_exist = snapshot.numChildren();
                console.log(user_exist);
           
            if(user_exist>0 && this.state.validError!=true){
               
               
                this.setState({email_message: "customer email id  already exist",validError:false});

            }
          
            else
            {
                this.setState({email_message: "",validError:true});
               
            }
           
        })
    }
       
    };

    customerphonenumberchange  = (e) => {
        this.setState({
            customer_phonenumber: e.target.value
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





    deleteItem = id => {
        swal({title: "Are you sure?", text: "Do your really want to remove?", icon: "warning", buttons: true, dangerMode: true}).then(willDelete => {
            if (willDelete) {
        console.log(id);
        var playersRef = firebase
            .database()
            .ref(`/customers/${id}`);
        playersRef.remove();
            }else{
    
            }
    });
    };

      onChange = (event) => {

        this.setState({
            [event.target.name]: event.target.value
        });
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
<div className="col-md-6">
<div className="company_name_box">
<div className="company_iocn"></div>
<div className="company_details">
<p className="name">{sessionStorage.getItem("BusinessName")} </p>
<p className="open">OPEN <i className="fa fa-circle" aria-hidden="true"></i></p>
</div>
</div>
</div>
<div className="col-md-3">
<div className="search_top">
<a href="#" className="search_icon"><i className="fas fa-search"></i></a>       
<input className="search_input" type="text" name="" placeholder="Search..."/>
</div>
</div>
<div className="col-md-3 ">
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

<div className="col-md-5 p-0">
<div className="overview-wrap">
<div className="order_btns">
<button type="button"  data-toggle="modal" data-target="#add_customer">
<span className="btn add_ord m-l-0"><img src="/images/icon/add_plus_icon_w.svg"/>
Add Customer</span>
</button>
</div>
</div>
</div>
		
		
{/* <div className="col-md-7 p-0">
<div className="track_box">


<div className="track_ord_block">
<div className="track_bg">
<div className="track-50">
<form>
<div className="input-group">
<input type="text" className="form-control" placeholder="Track here"/>

</div>
</form>
</div>
<div className="track-50 line-tack">
<span><img src="/images/icon/green_order_prepare.svg"/></span>Order is being prepared
</div>
</div>
</div>
</div>
</div> */}
					
</div>

<div className="row mt-30">
<div className="col-md-12 p-0">
<div className="category_upload_image">
<h1>All Customers</h1>
<div className="upload_img_block add_menu">

<div className="row">

<div className="col-md-12 p-0 customer_table">

<div className="table-responsive table-data">
<table className="table">
<thead>

<tr>
<td>S.no</td>
<td>Customer Name</td>
<td>Email Address</td> 
<td>Mobile</td> 
<td>Points </td> 
<td>Actions</td>
</tr>

</thead>
<tbody id="myTable">
{this.state.customersList && this.state.customersList.map((customer,index) => {
return (
    
<tr key={index}> 
<td>{index+1}</td>


<td>{customer.customer_name}</td>
<td>{customer.customer_email}</td>
<td>{customer.customer_phonenumber}</td>
<td>10+</td>
<td>
<Link to={`/EditCustomer/${customer.customerId}`}>
    <img src="images/icon/edit_icon_blue.svg"  className="edit_delete"/> 
    </Link>
<img src="images/icon/delete_cross.svg" onClick={this.deleteItem.bind(this, customer.customerId)} className="edit_delete"/></td>
</tr>

)})}

</tbody>
</table>
</div>


</div>			



</div>



</div>


</div>
</div>			
</div>


</div>
</div>
</div>


</div>   
</div>




<div className="modal fade" id="add_customer" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true">
<div className="modal-dialog modal-sm hipal_pop" role="document">
<div className="modal-content">


<div className="modal-header">
<h5 className="modal-title" id="smallmodalLabel">Add Customer
</h5>
</div>

<Form onSubmit={this.handleSubmit}>
<div className="modal-body product_edit">



<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Customer Name</label>
</div>
<div className="col-12 col-md-6">
<input type="text" id="text-input" 
 name="customer_name"
 value={this.state.customer_name}
 onChange={this.onChange}
 
placeholder="Krishna Kola" className="form-control edit_product"/>
</div>
{this .validator.message("Customer Name", this.state.customer_name, "required|whitespace|min:2|max:70")}
</div>
</div>



<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Email Address</label>
</div>
<div className="col-12 col-md-6">
<input type="text" id="text-input" 
 name="customer_email"
 value={this.state.customer_email}
 onChange={this.onChange}
 
placeholder="krishna.kola@gmail.com" className="form-control edit_product"/>
</div>
{this .validator.message("Email ", this.state.customer_email, "required|email|min:6|max:70")}
<div className="text-danger">
                                                        {" "}
                                                        {this.state.email_message}
                                                        </div>
</div>
</div>



<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Mobile</label>
</div>
<div className="col-12 col-md-6">
<input type="text" id="text-input" 
 name="customer_phonenumber"
 value={this.state.customer_phonenumber}
 onChange={this.customerphonenumberchange} placeholder="9703371164" className="form-control edit_product"/>
</div>
{this .validator.message("Mobile Number", this.state.customer_phonenumber, "required|whitespace|min:10|max:10")}
<div className="text-danger">
                                                        {" "}
                                                        {this.state.mobile_message}
                                                        </div>
</div>
</div>


<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Notes</label>
</div>
<div className="col-12 col-md-6">

<textarea
 name="customer_notes"
 value={this.state.customer_notes}
 onChange={this.onChange} id="textarea-input" rows="3" placeholder="Likes take away, Yapral" className="form-control edit_product"></textarea>

</div>
{this .validator.message("Notes", this.state.customer_notes, "required|whitespace|min:2|max:70")}
</div>
</div>


</div>



<div className="modal-footer">
<Link to="/AllCustomers">
            <button type="button" className="btn close_btn" data-dismiss="modal">Close </button>
            </Link>
<button type="submit" className="btn save_btn">Save</button>
</div>
</Form>

</div>
</div>
</div>





            </>  
                                                                                               
        );
    }
}



export default AllCustomers;
