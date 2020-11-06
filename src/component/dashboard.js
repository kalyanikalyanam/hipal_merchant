import React from "react";
import firebase from '../config';
import Sidebar from './sidebar';
import Header from './header';
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import {Form} from 'reactstrap';
import {Link} from "react-router-dom";
import swal from 'sweetalert';
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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

            firebase
            .database().ref('merchaant_business_details/' + businessId).on('value', snapshot => {
         var business = snapshot.val();
         console.log(business);
         sessionStorage.setItem("BusinessName", business.business_name);
         sessionStorage.setItem("BusinessLogo", business.business_logo);
       
        this.setState({
        
            
            
          });

          
         
         
        });
        }

        this.customersList();
           
       }

       customersList=()=>{

        this.setState({loading: true});
        var ref = firebase
            .database()
            .ref("customers/");

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

            this.setState({customersList: data, countPage: data.length, loading: false});
            console.log(this.state.customersList);
    
        });


    }


  

       handleSubmit = (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
          
            var sessionId = sessionStorage.getItem("RoleId");
            var username = sessionStorage.getItem("username");

            let dbCon = firebase
                .database()
                .ref('/customers');
            
              
            dbCon.push({
               


                customer_name:this.state.customer_name,
                customer_email:this.state.customer_email,
                customer_phonenumber:this.state.customer_phonenumber,

                customer_notes:this.state.customer_notes,

                

                
                sessionId:sessionId,
                username:username,

               
           
        
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

{/* <div className="row">
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
</div> */}


<div class="row">
<div class="col-md-12 p-0">
<div class="search_profile">
<div class="row">
<div class="col-md-6">
<div class="company_name_box">
<div class="company_iocn"></div>
<div class="company_details">
<p class="name">{sessionStorage.getItem("BusinessName")} </p>
<p class="open">OPEN <i class="fa fa-circle" aria-hidden="true"></i></p>
</div>
</div>
</div>
<div class="col-md-3">
<div class="search_top">
<a href="#" class="search_icon"><i class="fas fa-search"></i></a>       
<input class="search_input" type="text" name="" placeholder="Search..."/>
</div>
</div>
<div class="col-md-3 ">
<div class="profile_user">
<span class="usericon">
<img src="/images/icon/profile.jpg"/>
</span>
<span class="profile_data">
<p class="name">{sessionStorage.getItem("username")}</p>
<p>{sessionStorage.getItem("email")}</p>
</span>
</div>
</div>
</div>
</div>
</div>
</div>





<div className="row mt-30">
<div className="col-md-12 p-0 text-right">	
<span className="register_details_box">Registration Details</span>
</div></div>

<div className="row mt-30">

<div className="col-md-7 p-0 text-left dash_board">	

<h4>Good Afternoon <span>Varun</span></h4>
<p>It’s so great to see you back again.</p>

</div>

<div className="col-md-5 p-0 text-right">	
<span className="register_details_box downlod_report">Download Report</span>
</div>

</div>



<div className="row mt-30">
<div className="col-md-12 p-0 text-left dash_board">	
<h5>We are <span className="open">OPen</span> , here is the summary for <span className="date">23/07/2020 </span></h5>
</div></div>




<div className="row mt-30">
<div className="col-md-12 p-0">
<div className="category_upload_image w-100-row p-30">

<div className="row">

<div className="col-md-3">
<div className="sales_reports_data w-100-row">


<div className="sale_report">
<div className="sales_head">Total Orders</div>
<div className="sales_counts">
<span className="number">242</span> 
<span className="sales_position up">
<span><i className="fa fa-caret-up" aria-hidden="true"></i></span>
(+12%)</span>
</div>
</div>

<div className="sale_report">
<div className="sales_head">New Customers</div>
<div className="sales_counts">
<span className="number">150</span> 
<span className="sales_position down">
<span><i className="fa fa-caret-down" aria-hidden="true"></i></span>
(+12%)</span>
</div>
</div>

<div className="sale_report">
<div className="sales_head">Total Transactions</div>
<div className="sales_counts">
<span className="number">412</span> 
<span className="sales_position up">
<span><i className="fa fa-caret-up" aria-hidden="true"></i></span>
(+12%)</span>
</div>
</div>

<div className="sale_report">
<div className="sales_head">Current Balance</div>
<div className="sales_counts">
<span className="number up">₹ 12000</span> 
<span className="sales_position">
<span><i className="fa fa-caret-up" aria-hidden="true"></i></span>
(+12%)</span>
</div>
</div>





</div>


</div>

<div className="col-md-1"></div>

<div className="col-md-8">
<div className="sales_reports_graph">

<div className="indication_row">

<div className="left_box"><span><i className="fa fa-circle" aria-hidden="true"></i> Revenue</span><span><i className="fa fa-circle" aria-hidden="true"></i> Profit</span></div>
<div className="right_box">
<select name="select" id="select" className="form-control green_border">
<option value="0">Today</option>
</select>

</div>
</div>

<div className="au-card-inner">
<canvas id="sales-chart"></canvas>
</div>



</div>

</div>
</div>

</div>
</div>			



</div>



<div className="row mt-30">
<div className="col-md-12 p-0">


<div className="row">

<div className="col-md-4">
<div className="category_upload_image w-100-row p-30 audience_count">

<div className="sales_reports_data w-100-row">

<h6>Audience</h6>

<div className="sale_report">
<div className="sales_head">Total Orders</div>
<div className="sales_counts">
<span className="number">242</span> 
<span className="sales_position up">
<span><i className="fa fa-caret-up" aria-hidden="true"></i></span>
(+12%)</span>
</div>
</div>

<div className="sale_report">
<div className="sales_head">New Customers</div>
<div className="sales_counts">
<span className="number">150</span> 
<span className="sales_position down">
<span><i className="fa fa-caret-down" aria-hidden="true"></i></span>
(+12%)</span>
</div>
</div>





</div>


</div>
</div>



<div className="col-md-8">
<div className="category_upload_image w-100-row p-30 orders_count">
<div className="sales_reports_data w-100-row">

<h6>Orders</h6>

<div className="sale_report">
<div className="sales_head">Total Orders</div>
<div className="sales_counts">
<span className="number">242</span> 
<span className="sales_position up">
<span><i className="fa fa-caret-up" aria-hidden="true"></i></span>
(+12%)</span>
</div>
</div>

<div className="sale_report">
<div className="sales_head">New Customers</div>
<div className="sales_counts">
<span className="number">150</span> 
<span className="sales_position down">
<span><i className="fa fa-caret-down" aria-hidden="true"></i></span>
(+12%)</span>
</div>
</div>

<div className="sale_report">
<div className="sales_head">Total Transactions</div>
<div className="sales_counts">
<span className="number">412</span> 
<span className="sales_position up">
<span><i className="fa fa-caret-up" aria-hidden="true"></i></span>
(+12%)</span>
</div>
</div>

<div className="sale_report">
<div className="sales_head">Current Balance</div>
<div className="sales_counts">
<span className="number">₹ 12000</span> 
<span className="sales_position up">
<span><i className="fa fa-caret-up" aria-hidden="true"></i></span>
(+12%)</span>
</div>
</div>





</div>
</div>
</div>

</div>


</div>			
</div>



<div className="row mt-30">
<div className="col-md-12 p-0">


<div className="row">

<div className="col-md-7">
<div className="category_upload_image w-100-row p-30 dashboard_box">

<div className="w-100-row">

<h6>Customer notifications</h6>

<p className="data">Lorem ipsum dolor sit amet, consectetur adipiscing elit.....</p>

<p className="data">Lorem ipsum dolor sit amet, consectetur adipiscing elit.....</p>

<p className="data">Lorem ipsum dolor sit amet, consectetur adipiscing elit.....</p>

<p className="data">Lorem ipsum dolor sit amet, consectetur adipiscing elit.....</p>

<p className="data">Lorem ipsum dolor sit amet, consectetur adipiscing elit.....</p>

</div>


</div>
</div>



<div className="col-md-5">

<div className="category_upload_image w-100-row p-30 dashboard_box">


<div className="w-100-row">

<h6>Top selling items</h6>

<div className="top_sellingbox">
<div className="left_item">
<span className="number_count">1</span>
<span>
<p className="head">Pizza Margherita</p>
<p className="name">Pizza</p>
</span>
</div>
<div className="right_item">12</div>
</div>

<div className="top_sellingbox">
<div className="left_item">
<span className="number_count">1</span>
<span>
<p className="head">Pizza Margherita</p>
<p className="name">Pizza</p>
</span>
</div>
<div className="right_item">12</div>
</div>


<div className="top_sellingbox">
<div className="left_item">
<span className="number_count">1</span>
<span>
<p className="head">Pizza Margherita</p>
<p className="name">Pizza</p>
</span>
</div>
<div className="right_item">12</div>
</div>




</div>


</div>
</div>

</div>






</div>			
</div>



<div className="row mt-30">
<div className="col-md-12 p-0">
<div className="category_upload_image w-100-row p-30 dashboard_box">
<h6>Quick messages</h6>





<div className="col-md-12 p-0 employes_table message_table">

<div className="table-responsive table-data">
<table className="table">

<tbody>


<tr>
<td>Rishabh Hurshan <span className="msg_count">2</span></td>
<td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.....</td>
<td><img src="images/icon/cross_red.png" className="edit_delete"/></td>
</tr>


<tr>
<td>Rishabh Hurshan <span className="msg_count">3</span></td>
<td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.....</td>
<td><img src="images/icon/cross_red.png" className="edit_delete"/></td>
</tr>


<tr>
<td>Rishabh Hurshan <span className="msg_count">4</span></td>
<td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.....</td>
<td><img src="images/icon/cross_red.png" className="edit_delete"/></td>
</tr>









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


</>  
                                                                                               
        );
    }
}



export default Dashboard;
