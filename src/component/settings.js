import React from "react";
import firebase from '../config';
import Sidebar from './sidebar';
import Header from './header';
import SettingsInfo from '../settings/settinga_info';
import SettingsGstInfo from '../settings/settings_gst_info';
import SettingsFssaiInfo from '../settings/settings_fssai_info';
import SettingsStation from '../settings/settings_stations';
import SettingsUploadCaurosel from '../settings/settings_upload_caurosel';
import SettingsBestRecommendations from '../settings/settings_best_recommendations';
import SettingsMedia from '../settings/settings_media';
import SimpleReactValidator from "simple-react-validator";
import SettingsTimings from '../settings/settings_timings';
import FileUploader from "react-firebase-file-uploader";
import {Form} from 'reactstrap';
import {Link} from "react-router-dom";
import swal from 'sweetalert';
import { Alert } from 'reactstrap';

class Settings extends React.Component {
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

        this.Force();
           
       }
       Force() {
        this.setState({ loading: false });
        var user=null;
        var sessionId = sessionStorage.getItem("RoleId");
    if(sessionId){
       
      
    
        firebase
            .database().ref('settings_Force/' + sessionId).on('value', snapshot => {
                
         var info = snapshot.val();
         if(snapshot.numChildren()>0){
       console.log(info);
        this.setState({
            
            Force:info.Force,
           
            

            
          });
         
        }
        else{

        }
        });
    }
      }

       handleSubmit = (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
          
            var sessionId = sessionStorage.getItem("RoleId");
            var username = sessionStorage.getItem("username");
            var businessId = sessionStorage.getItem("businessId");
            var ref = firebase
            .database()
            .ref(`settings_Force/${sessionId}`);
           
            ref.update({
           

                Force:this.state.Force,
               
                sessionId:sessionId,
                username:username,
                businessId:businessId,
               
           
        
             });
             this.setState({employer_sevice_message:  <Alert color="success">
      Information has been updated ...!
      </Alert>});
window.location.href="/Settings";

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
<div className="col-md-12 p-0">
<div className="category_upload_image w-100-row">


<h1 className="pull-left w-100-row">
<div className="w-50 pull-left">
Your Store Settings 
</div>

<div className="w-50 pull-left">

<span className="pull-right">
<button className="btn edit_small_button">Edit</button>
</span>

</div>

</h1>







<div className="upload_img_block add_menu w-100-row settings">



{/* <div className="row business_reg_box">

<div className="col-md-6">

<div className="w-100-row open_store"><span></span>Open</div>

<div className="w-100-row running_time">
<span><span className="dot_green"></span></span>Running Based On Time
</div>



</div>

<div className="col-md-6">


<div className="force_close_open">
<div className="force"><span className="close_shop"> 
                                                                    <input
                                                                        type="radio"
                                                                        name="Force"
                                                                        value="Force Closed"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.Force === 'Force Closed'}/>
                                                              </span> 
                                                              Force Closed
                                                              </div>
<div className="force"><span className="open_shop">
                                                                      <input
                                                                        type="radio"
                                                                        name="Force"
                                                                        value="Force Open"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.Force === 'Force Open'}/>
    </span>Force Open </div>
</div>


</div>


</div> */}



{/* <hr></hr> */}
<SettingsTimings/>

{/* <div className="row business_reg_box">

<div className="col-md-12"><h3>Timing</h3></div>

<div className="col-md-12">

<div className="row form-group mb-0">


<div className="col-md-12">

<div className="timimg_row">
<span className="pull-left"></span>
<span className="pull-left">

</span>
<span className="pull-left">
From
</span>
<span className="pull-left">
To
</span>
<span className="pull-left">
Break
</span>
<span className="pull-left">
Between
</span>
<span className="pull-left">
To
</span>
</div>

<div className="timimg_row">
<span className="pull-left">Monday</span>
<span className="pull-left">
<select name="select" id="select" className="form-control open_cafe">
<option value="0">Open</option>
<option value="0">Close</option>
</select>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
</div>



<div className="timimg_row">
<span className="pull-left">Tuesday</span>
<span className="pull-left">
<select name="select" id="select" className="form-control open_cafe">
<option value="0">Open</option>
<option value="0">Close</option>
</select>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
</div>



<div className="timimg_row">
<span className="pull-left">Wednesday</span>
<span className="pull-left">
<select name="select" id="select" className="form-control open_cafe">
<option value="0">Open</option>
<option value="0">Close</option>
</select>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
</div>



<div className="timimg_row">
<span className="pull-left">Thursday</span>
<span className="pull-left">
<select name="select" id="select" className="form-control open_cafe">
<option value="0">Open</option>
<option value="0">Close</option>
</select>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
</div>



<div className="timimg_row">
<span className="pull-left">Friday</span>
<span className="pull-left">
<select name="select" id="select" className="form-control open_cafe">
<option value="0">Open</option>
<option value="0">Close</option>
</select>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
</div>



<div className="timimg_row">
<span className="pull-left">Saturday</span>
<span className="pull-left">
<select name="select" id="select" className="form-control open_cafe">
<option value="0">Open</option>
<option value="0">Close</option>
</select>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
</div>



<div className="timimg_row">
<span className="pull-left">Sunday</span>
<span className="pull-left">
<select name="select" id="select" className="form-control close_cafe">
<option value="0">Close</option>
<option value="0">Open</option>
</select>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" id="text-input" name="text-input" className="form-control"/>
</span>
</div>




</div>



</div>

</div>



<div className="col-md-12 text-right m-t-10"><span><button className="save_small_button">Save</button></span></div>

</div> */}

<hr></hr>


<SettingsInfo/>

{/* <div className="row business_reg_box">

<div className="col-md-12"><h3>Info</h3></div>

<div className="col-md-6">

<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Easy Location Guide</label>
</div>
<div className="col-12 col-md-8">
<input type="text" id="text-input" name="text-input" placeholder="Text here" className="form-control"/>
</div>
</div>

</div>

<div className="col-md-6">

<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Average Price 
for 2 People</label>
</div>
<div className="col-12 col-md-8">
<input type="text" id="text-input" name="text-input" placeholder="Text here" className="form-control"/>
</div>
</div>

</div>



<div className="col-md-6">

<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Help-Line Number</label>
</div>
<div className="col-12 col-md-8">
<input type="text" id="text-input" name="text-input" placeholder="9703371164" className="form-control"/>
</div>
</div>

</div>

<div className="col-md-6">

<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Cusine</label>
</div>
<div className="col-12 col-md-8">
<input type="text" id="text-input" name="text-input" placeholder="9703371164" className="form-control"/>
</div>
</div>

</div>


<div className="col-md-12 text-right m-t-10"><span><button className="save_small_button">Save</button></span></div>

</div> */}

<hr></hr>

<SettingsUploadCaurosel/>

{/* <div className="row business_reg_box">

<div className="col-md-12"><h3>Upload Home Page Courosal</h3></div>

<div className="col-md-12">

<div className="row form-group mb-0">

<div className="col col-md-3">
<div className="upload_img upload_small">
<div className="form-group">
<div className="img_show product_img_small"><img id="img-upload"/></div>
  
  <div className="input-group">
       <span className="input-group-btn">
           <span className="btn btn-default btn-file">
               &#60; Update &#62; <input type="file" id="imgInp"/>
           </span>
       </span>
       <input type="text" className="form-control" readonly=""/>
   </div>
   
</div></div>
</div>


<div className="col col-md-3">
<div className="upload_img upload_small">
<div className="form-group">
<div className="img_show product_img_small"><img id="img-upload"/></div>
  <div className="input-group">
       <span className="input-group-btn">
           <span className="btn btn-default btn-file">
               &#60; Update &#62; <input type="file" id="imgInp"/>
           </span>
       </span>
       <input type="text" className="form-control" readonly=""/>
   </div>
   
</div></div>
</div>




<div className="col col-md-3">
<div className="upload_img upload_small">
<div className="form-group">
<div className="img_show product_img_small"><img id="img-upload"/></div>
  <div className="input-group">
       <span className="input-group-btn">
           <span className="btn btn-default btn-file">
               &#60; Update &#62; <input type="file" id="imgInp"/>
           </span>
       </span>
       <input type="text" className="form-control" readonly=""/>
   </div>
   
</div></div>
</div>




</div>

</div>



<div className="col-md-12 text-right m-t-10"><span><button className="save_small_button">Save</button></span></div>

</div> */}

<hr></hr>


<SettingsBestRecommendations/>
{/* <div className="row business_reg_box">

<div className="col-md-12"><h3>Best recommendation</h3></div>

<div className="col-md-12">

<div className="row form-group mb-0">

<div className="col col-md-3">
<div className="upload_img upload_small">
<div className="form-group">
<div className="img_show product_img_small"><img id="img-upload"/></div>
  
  <div className="input-group">
       <span className="input-group-btn">
           <span className="btn btn-default btn-file">
               &#60; Update &#62; <input type="file" id="imgInp"/>
           </span>
       </span>
       <input type="text" className="form-control" readonly=""/>
   </div>
   
</div></div>
</div>


<div className="col col-md-3">
<div className="upload_img upload_small">
<div className="form-group">
<div className="img_show product_img_small"><img id="img-upload"/></div>
  
  <div className="input-group">
       <span className="input-group-btn">
           <span className="btn btn-default btn-file">
               &#60; Update &#62; <input type="file" id="imgInp"/>
           </span>
       </span>
       <input type="text" className="form-control" readonly=""/>
   </div>
   
</div></div>
</div>




<div className="col col-md-3">
<div className="upload_img upload_small">
<div className="form-group">
<div className="img_show product_img_small"><img id="img-upload"/></div>
  <div className="input-group">
       <span className="input-group-btn">
           <span className="btn btn-default btn-file">
               &#60; Update &#62; <input type="file" id="imgInp"/>
           </span>
       </span>
       <input type="text" className="form-control" readonly=""/>
   </div>
   
</div></div>
</div>




<div className="col col-md-3">
<div className="upload_img upload_small">
<div className="form-group">
<div className="img_show product_img_small"><img id="img-upload"/></div>
  <div className="input-group">
       <span className="input-group-btn">
           <span className="btn btn-default btn-file">
               &#60; Update &#62; <input type="file" id="imgInp"/>
           </span>
       </span>
       <input type="text" className="form-control" readonly=""/>
   </div>
   
</div></div>
</div>




</div>

</div>



<div className="col-md-12 text-right m-t-10"><span><button className="save_small_button">Save</button></span></div>

</div> */}

<hr></hr>

<SettingsMedia/>

{/* <div className="row business_reg_box">

<div className="col-md-12"><h3>Media</h3></div>

<div className="col-md-12">


<div className="row form-group mb-0">

<div className="col col-md-3">
Images
</div>


<div className="col col-md-3">
Videos
</div>


</div>




<div className="row form-group mb-0">

<div className="col col-md-3">
<div className="upload_img upload_small small_img">
<div className="form-group">
<div className="img_show icon_small"><img id="img-upload"/></div>
  
  <div className="input-group">
       <span className="input-group-btn">
           <span className="btn btn-default btn-file">
               &#60; Update &#62; <input type="file" id="imgInp"/>
           </span>
       </span>
       <input type="text" className="form-control" readonly=""/>
   </div>
   
</div></div>
</div>

<div className="col col-md-3">
<div className="upload_img upload_small small_img">
<div className="form-group">
<div className="img_show icon_small"><img id="img-upload"/></div>
  
  <div className="input-group">
       <span className="input-group-btn">
           <span className="btn btn-default btn-file">
               &#60; Update &#62; <input type="file" id="imgInp"/>
           </span>
       </span>
       <input type="text" className="form-control" readonly=""/>
   </div>
   
</div></div>
</div>

<div className="col col-md-6">
<div className="w-100-row media_padding">
<span className="pull-left"><b>OR</b></span>

<span className="pull-left"><input type="text" id="text-input" name="text-input" placeholder="Add Youtube link here" className="form-control"/></span>
</div>
</div>

</div>


<div className="row form-group mb-0">

<div className="col col-md-3">
<div className="upload_img upload_small small_img">
<div className="form-group">
<div className="img_show icon_small"><img id="img-upload"/></div>
  
  <div className="input-group">
       <span className="input-group-btn">
           <span className="btn btn-default btn-file">
               &#60; Update &#62; <input type="file" id="imgInp"/>
           </span>
       </span>
       <input type="text" className="form-control" readonly=""/>
   </div>
   
</div></div>
</div>

<div className="col col-md-3">
<div className="upload_img upload_small small_img">
<div className="form-group">
<div className="img_show icon_small"><img id="img-upload"/></div>
  
  <div className="input-group">
       <span className="input-group-btn">
           <span className="btn btn-default btn-file">
               &#60; Update &#62; <input type="file" id="imgInp"/>
           </span>
       </span>
       <input type="text" className="form-control" readonly=""/>
   </div>
   
</div></div>
</div>

<div className="col col-md-6">
<div className="w-100-row media_padding">
<span className="pull-left"><b>OR</b></span>

<span className="pull-left"><input type="text" id="text-input" name="text-input" placeholder="Add Youtube link here" className="form-control"/></span>
</div>
</div>

</div>



<div className="row form-group mb-0">

<div className="col col-md-3">
<div className="upload_img upload_small small_img">
<div className="form-group">
<div className="img_show icon_small"><img id="img-upload"/></div>
  
  <div className="input-group">
       <span className="input-group-btn">
           <span className="btn btn-default btn-file">
               &#60; Update &#62; <input type="file" id="imgInp"/>
           </span>
       </span>
       <input type="text" className="form-control" readonly=""/>
   </div>
   
</div></div>
</div>

<div className="col col-md-3">
<div className="upload_img upload_small small_img">
<div className="form-group">
<div className="img_show icon_small"><img id="img-upload"/></div>
  
  <div className="input-group">
       <span className="input-group-btn">
           <span className="btn btn-default btn-file">
               &#60; Update &#62; <input type="file" id="imgInp"/>
           </span>
       </span>
       <input type="text" className="form-control" readonly=""/>
   </div>
   
</div></div>
</div>

<div className="col col-md-6">
<div className="w-100-row media_padding">
<span className="pull-left"><b>OR</b></span>

<span className="pull-left"><input type="text" id="text-input" name="text-input" placeholder="Add Youtube link here" className="form-control"/></span>
</div>
</div>

</div>




<div className="col-md-12 text-right m-t-10"><span><button className="save_small_button">Save</button></span></div>

</div></div> */}

<hr></hr>

<SettingsStation/>

{/* <div className="row business_reg_box">

<div className="col-md-12"><h3>Update stations</h3></div>

<div className="col-md-12">

<div className="row form-group mb-0">

<div className="col-md-4">
<div className="billion_stations">
<span className="edit_billing"><button className="edit_small_button">EDIT</button></span>
<p>Billing Counter</p>
<p>Number Of Printers : <span>1</span></p>
<p>Added Printer : <span>(hP00123)</span></p>
</div>
</div>
<div className="col-md-4">
<div className="billion_stations">
<span className="edit_billing"><button className="edit_small_button">EDIT</button></span>
<p>Billing Counter</p>
<p>Number Of Printers : <span>1</span></p>
<p>Added Printer : <span>(hP00123)</span></p>
</div>
</div>
<div className="col-md-4">

<div className="add_station">
<img src="images/icon/plus_add.png"/><br></br>
Add station</div>


</div>

</div>

</div>





</div> */}

<hr></hr>

<SettingsGstInfo/>



{/* <div className="row business_reg_box">
<div className="col-md-6 p-0">
<div className="col-md-12">

<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">GST number</label>
</div>
<div className="col-12 col-md-8">
<input type="text" id="text-input" name="text-input" placeholder="Text here" className="form-control"/>
</div>
</div>

</div>

<div className="col-md-12">

<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">GST registration form</label>
</div>
<div className="col-12 col-md-8">
<input type="file" id="text-input" name="text-input" placeholder="Text here" className="form-control"/>
</div>
</div>

</div>

</div>

<div className="col-md-12 text-right m-t-10"><span><button className="save_small_button">Save</button></span></div>
</div> */}

<hr></hr>


<SettingsFssaiInfo/>


{/* <div className="row business_reg_box">
<div className="col-md-6 p-0">
<div className="col-md-12">

<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">FSSAI number</label>
</div>
<div className="col-12 col-md-8">
<input type="text" id="text-input" name="text-input" placeholder="Text here" className="form-control"/>
</div>
</div>

</div>

<div className="col-md-12">

<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">FSSAI form</label>
</div>
<div className="col-12 col-md-8">
<input type="file" id="text-input" name="text-input" placeholder="Text here" className="form-control"/>
</div>
</div>

</div>

</div>

<div className="col-md-12 text-right m-t-10"><span><button className="save_small_button">Save</button></span></div>
</div> */}






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



export default Settings;
