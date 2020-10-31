import React from "react";
import firebase from '../config';
import Sidebar from './sidebar';
import Header from './header';
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import {Form} from 'reactstrap';
import {Link} from "react-router-dom";
import Iframe from 'react-iframe'
class EditBusiness extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
business_owners_name:'',
business_name:'',
business_legal_name:'',
business_nick_name:'',
business_automatic_id:'',


business_email:'',
business_secondary_email:'',
business_phone_number:'',


business_logo:'',



business_currency:'',
// business_timezone:'',
business_timezone_from:'',
business_timezone_to:'',

business_fssai_number:'',
business_fssai_form:'',

business_account_name:'',
business_account_number:'',
business_ifsc_code:'',


employer_sevice_message: "",
validError:false,
mobile_message: '',
email_message:'',
avatar: "",
isUploading: false,
progress: 0,
avatarURL: "",
filenames: [],
uploadProgress: 0,

created_on: new Date().toLocaleString()
         
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

   
  this.businessList();

       
   }

  

   businessList=()=>{

    const {businessId} = this.props.match.params;
    this.setState({loading: true});
    var ref = firebase
        .database()
        .ref(`merchaant_business_details/${businessId}`);

        ref.on('value', snapshot => {
            var business = snapshot.val();

            // console.log(categories)

            this.setState({
               
                   
                created_on:this.state.created_on,



                business_owners_name:business.business_owners_name,
                business_name:business.business_name,
                business_legal_name:business.business_legal_name,
                business_nick_name:business.business_nick_name,
                // business_automatic_id:business.business_automatic_id,
                
                
                business_email:business.business_email,
                business_secondary_email:business.business_secondary_email,
                business_phone_number:business.business_phone_number,
                
                
                business_logo:business.business_logo,
                
                
                
                business_currency:business.business_currency,
                // business_timezone:business.business_timezone,
                business_timezone_from:business.business_timezone_from,
                business_timezone_to:business.business_timezone_to,
                
                
                business_fssai_number:business.business_fssai_number,
                business_fssai_form:business.business_fssai_form,
                
                business_account_name:business.business_account_name,
                business_account_number:business.business_account_number,
                business_ifsc_code:business.business_ifsc_code,
              
                status:business.status,
              
                
                sessionId:business.sessionId,
                username:business.username,
             
                    
               });
    });



}






handleUploadStart = () => this.setState({isUploading: true, uploadProgress: 0});
    
handleFrontImageUploadStart = () => this.setState({isUploading: true, uploadProgress: 0, avatarURL: ''});
handleProgress = progress => this.setState({uploadProgress: progress});

handleUploadError = error => {
    this.setState({
        isUploading: false
        // Todo: handle error
    });
    console.error(error);
};

handleBusinessLogoSuccess = (filename) => {

    firebase
        .storage()
        .ref("images")
        .child(filename)
        .getDownloadURL()
        .then(url => this.setState({business_logo: url}));
};

handlebusinessformSuccess = (filename) => {

    firebase
        .storage()
        .ref("images")
        .child(filename)
        .getDownloadURL()
        .then(url => this.setState({business_fssai_form: url}));
};



onChange = (event) => {

    this.setState({
        [event.target.name]: event.target.value
    });
};








handleSubmit = (event) => {
    event.preventDefault();
    if (this.validator.allValid()) {
        const {businessId}=this.props.match.params;
        var sessionId = sessionStorage.getItem("RoleId");
        var username = sessionStorage.getItem("username");

        let dbCon = firebase.database().ref(`/merchaant_business_details/${businessId}`);
          
        
          
       dbCon.update ({
          
           
        created_on:this.state.created_on,



        business_owners_name:this.state.business_owners_name,
        business_name:this.state.business_name,
        business_legal_name:this.state.business_legal_name,
        business_nick_name:this.state.business_nick_name,
        // business_automatic_id:this.state.business_automatic_id,
        
        
        business_email:this.state.business_email,
        business_secondary_email:this.state.business_secondary_email,
        business_phone_number:this.state.business_phone_number,
        
        
        business_logo:this.state.business_logo,
        
        
        
        business_currency:this.state.business_currency,
        // business_timezone:this.state.business_timezone,
        business_timezone_from:this.state.business_timezone_from,
        business_timezone_to:this.state.business_timezone_to,
        
        
        business_fssai_number:this.state.business_fssai_number,
        business_fssai_form:this.state.business_fssai_form,
        
        business_account_name:this.state.business_account_name,
        business_account_number:this.state.business_account_number,
        business_ifsc_code:this.state.business_ifsc_code,
      
        status:this.state.status,
      
        
        sessionId:sessionId,
        username:username,
           
       
    
         });
         window.location.href="/BusinessList";
         // this
         //     .props
         //     .history
         //     .push("/BusinessList");
        }
       
else {
        this
            .validator
            .showMessages();
        this.forceUpdate();
      }
  };


    render() {
        return (
          
         

            <div className="page-wrapper">
   

   <aside className="menu-sidebar d-none d-lg-block">
          				  
                            <div className="menu-sidebar__content js-scrollbar1">
                                <nav className="navbar-sidebar">
                                    <ul className="list-unstyled navbar__list">
                                        
                {/* <li><a href="#" className="home">Home</a></li>
                <li><a href="/Tables" className="oders">Orders</a></li>
                <li><a href="/AllCustomers" className="customers">Customers</a></li>
                <li><a href="/AddItemMenu"  className="resturent">My Restaurent</a></li>
                <li><a href="/AllEmployees"  className="employees">Employees</a></li>
                <li><a href="/AllMessages"  className="messages">Messages</a></li>
                <li><a href="#"  className="bills">Bills</a></li>
                <li><a href="TablesList"  className="tabels">Tabels</a></li> */}
                <li><a href="#" className="settings">Settings</a></li>
                
                                        
                                        
                                        
                                        
                                        
                               
                                        
                                    
                                        
                                    </ul>
                                </nav>
                            </div>
                        </aside>
    
          
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
    <div className="col-md-12 p-0 text-right">	
    <span className="register_details_box">Registration Details</span>
    </div></div>
    
    <div className="row mt-30">
    <div className="col-md-12 p-0">
    <div className="category_upload_image w-100-row">
    
    
    <h1 className="pull-left w-100-row">
    <div className="w-50 pull-left">
    Business Registration
    </div>
    
    <div className="w-50 pull-left">
        {this.state.status=="Active"?
    <span className="active_green font-25">{this.state.status}</span> 
    :
    <span className="active_red font-25">{this.state.status}</span> 
        }
    <span className="pull-right">
    <button className="btn edit_small_button">Edit</button>
    </span>
    
    </div>
    
    </h1>
    
    
    
    <Form onSubmit={this.handleSubmit}>
    
    
    
    <div className="upload_img_block add_menu w-100-row">
    
    <div className="row business_reg_box">
    
    <div className="col-md-6">
    
    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Owner’s name</label>
    </div>
    <div className="col-12 col-md-8">
    <input type="text" id="text-input" 
    name="business_owners_name"
    value={this.state.business_owners_name}
    onChange={this.onChange}
    placeholder="Text here" className="form-control"/>

    </div>
    {this .validator.message("Business Owner Name", this.state.business_owners_name, "required|whitespace|min:2|max:70")}
    </div>
    
    </div>
   
    
    <div className="col-md-6">
    
    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Business Name</label>
    </div>
    <div className="col-12 col-md-8">
    <input type="text" id="text-input" 
      name="business_name"
      value={this.state.business_name}
      onChange={this.onChange}
    placeholder="Text here" className="form-control"/>
    </div>
    {this .validator.message("Business  Name", this.state.business_name, "required|whitespace|min:2|max:70")}
    </div>
    
    </div>
    
    
    
    <div className="col-md-6">
    
    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Business Legal Name</label>
    </div>
    <div className="col-12 col-md-8">
    <input type="text" id="text-input" 
     name="business_legal_name"
     value={this.state.business_legal_name}
     onChange={this.onChange}
    placeholder=" " className="form-control"/>

    </div>
    {this .validator.message("Business Legal Name", this.state.business_legal_name, "required|whitespace|min:2|max:70")}
    </div>
    
    </div>
    
    
    
    <div className="col-md-6">
    
    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Business Nickname</label>
    </div>
    <div className="col-12 col-md-8">
    <input type="text" id="text-input" 
     name="business_nick_name"
     value={this.state.business_nick_name}
     onChange={this.onChange}
    placeholder="" className="form-control"/>

    </div>
    {this .validator.message("Business Nick Name", this.state.business_nick_name, "required|whitespace|min:2|max:70")}
    </div>
    
    </div>
    
    {/* <div className="col-md-6">
    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Business ID</label>
    </div>
    <div className="col-12 col-md-8">
    <input type="text" id="text-input" name="text-input" placeholder="Auto Genrated Business ID By Hipal" className="form-control"/>
    </div>
    </div>
    </div> */}
    
    
    
    </div>
    
    <hr></hr>
    
    
    <div className="row business_reg_box">
    
    <div className="col-md-6">
    
    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Email address</label>
    </div>
    <div className="col-12 col-md-8">
    <input type="text" id="text-input" 
    
    name="business_email"
     value={this.state.business_email}
     onChange={this.onChange}
    placeholder="Text here" className="form-control"/>
     
    </div>
    {this .validator.message("Business Email", this.state.business_email, "required|email|min:6|max:70")}
    </div>
    
    </div>
    
    <div className="col-md-6">
    
    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Secondary
    email</label>
    </div>
    <div className="col-12 col-md-8">
    <input type="text" id="text-input" 
     name="business_secondary_email"
     value={this.state.business_secondary_email}
     onChange={this.onChange}
    placeholder="" className="form-control"/>
    </div>
    {this .validator.message("Business Secondary Email", this.state.business_secondary_email, "required|email|min:6|max:70")}
    </div>
    
    </div>
    
    
    
    <div className="col-md-6">
    
    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Phone number</label>
    </div>
    <div className="col-12 col-md-8">
    <input type="number" id="text-input" 
     name="business_phone_number"
     value={this.state.business_phone_number}
     onChange={this.onChange}
    placeholder="9703371164" className="form-control"/>
    </div>
    {this .validator.message("Mobile Number", this.state.business_phone_number, "required|whitespace|min:10|max:10")}
    </div>
    
    </div>
    
    
    </div>
    
    <hr></hr>
    
    
    
    <div className="row business_reg_box">
    
    <div className="col-md-6">
    
    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Logo</label>
    </div>
    <div className="col-12 col-md-8">
    {/* <div className="upload_img">
     <div className="form-group">
        <div className="img_show" style={{height:"200px"}}><img id="img-upload"/></div>
           <div className="input-group">
                <span className="input-group-btn">
                    <span className="btn btn-default btn-file">
                        Upload Logo <input type="file" id="imgInp"/>
                    </span>
                </span>
                <input type="text" className="form-control" readonly=""/>
            </div>
            
        </div>
     </div> */}



{this.state.business_logo && <img src={this.state.business_logo} />}
                                                 <FileUploader
                                                accept="image/*"
                                                name="business_logo"
                                                randomizeFilename
                                                storageRef={firebase
                                                .storage()
                                                .ref("images")}
                                                onUploadStart={this.handleFrontImageUploadStart}
                                                onUploadError={this.handleUploadError}
                                                onUploadSuccess={this.handleBusinessLogoSuccess}
                                                onProgress={this.handleProgress}/>


    </div>
    {this .validator.message(" logo", this.state.business_logo, "required")}
    </div>
    
    </div>
    
    </div>
    
    <hr></hr>
    
    
    
    <div className="row business_reg_box">
    <div className="col-md-6 p-0">
    <div className="col-md-12">
    
    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Currency</label>
    </div>
    <div className="col-12 col-md-8">
    <input type="text" id="text-input"
    name="business_currency"
    value={this.state.business_currency}
    onChange={this.onChange}
    placeholder="Text here" className="form-control"/>
    </div>
    {this .validator.message("Currency", this.state.business_currency,  "required")}
    </div>
    
    </div>
    
    <div className="col-md-12">
    
    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Time Zone</label>
    </div>
    <div className="col-12 col-md-4">
    <input type="time" id="text-input" 
      name="business_timezone_from"
      value={this.state.business_timezone_from}
      onChange={this.onChange}
    placeholder="" className="form-control"/>
    </div>
    {this .validator.message("Business Time Zone From", this.state.business_timezone_from,  "required")}
    <div className="col-12 col-md-4">
    <input type="time" id="text-input" 
      name="business_timezone_to"
      value={this.state.business_timezone_to}
      onChange={this.onChange}
    placeholder="" className="form-control"/>
    </div>
    {this .validator.message("Business Time Zone To", this.state.business_timezone_to,  "required")}
    </div>
    
    </div>
    
    </div>
    </div>
    
    <hr></hr>
    
    
    
    <div className="row business_reg_box">
    <div className="col-md-6 p-0">
    <div className="col-md-12">
    
    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">FSSAI number</label>
    </div>
    <div className="col-12 col-md-8">
    <input type="text" id="text-input" 
    name="business_fssai_number"
    value={this.state.business_fssai_number}
    onChange={this.onChange}
     placeholder="" className="form-control"/>
    </div>
    {this .validator.message("FSSAI Number", this.state.business_fssai_number, "required|whitespace|min:10|max:16")}
    </div>
    
    </div>
    
    <div className="col-md-12">
    
    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">FSSAI Form</label>
    </div>
    <div className="col-12 col-md-8">

    {/* {this.state.business_fssai_form && <img src={this.state.business_fssai_form} />} */}


    <Iframe url={this.state.business_fssai_form}
        width="50%"
        height="50%"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"/>
                                                 <FileUploader
                                                accept="file/*"
                                                name="business_fssai_form"
                                                randomizeFilename
                                                storageRef={firebase
                                                .storage()
                                                .ref("images")}
                                                onUploadStart={this.handleFrontImageUploadStart}
                                                onUploadError={this.handleUploadError}
                                                onUploadSuccess={this.handlebusinessformSuccess}
                                                onProgress={this.handleProgress}/>


    {/* <input type="file" id="text-input" 
     name="business_fssai_number"
     value={this.state.business_fssai_number}
     onChange={this.onChange}
     placeholder="Text here" className="form-control"/> */}
    </div>
    {this .validator.message("FSSAI Form", this.state.business_fssai_form, "required")}
    </div>
    
    </div>
    
    </div>
    </div>
    
    <hr></hr>
    
    
    <div className="row business_reg_box">
    <div className="col-md-6 p-0">
    
    <div className="col-md-12"><p className="font-18 m-b-20">BANKING DETAILS</p></div>
    
    <div className="col-md-12">
    
    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Account Name</label>
    </div>
    <div className="col-12 col-md-8">
    <input type="text" id="text-input" 
    name="business_account_name"
    value={this.state.business_account_name}
    onChange={this.onChange}
    placeholder="" className="form-control"/>
    </div>
    {this .validator.message("Account Name", this.state.business_account_name, "required|whitespace|min:2|max:16")}

    </div>
    
    </div>
    
    <div className="col-md-12">
    
    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Account Number</label>
    </div>
    <div className="col-12 col-md-8">
    <input type="number" id="text-input" 
      name="business_account_number"
      value={this.state.business_account_number}
      onChange={this.onChange}
    placeholder="" className="form-control"/>
    </div>
    {this .validator.message("Account Number", this.state.business_account_number, "required|whitespace|min:10|max:16")}
    </div>
    
    </div>
    
    
    <div className="col-md-12">
    
    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">IFSC CODE</label>
    </div>
    <div className="col-12 col-md-8">
    <input type="text" id="text-input" 
    name="business_ifsc_code"
    value={this.state.business_ifsc_code}
    onChange={this.onChange}
    placeholder="" className="form-control"/>
    </div>
    {this .validator.message("IFSC Code", this.state.business_ifsc_code, "required|whitespace|min:10|max:16")}
    </div>
    
    </div>
    
    
    
    </div>
    </div>
    
    <hr></hr>
    
    
    <div className="row business_reg_box">
    <div className="col-md-12 p-0 text-center">
    <Link to="/BusinessList">
    <button type="button" className="btn close_button" >Close</button>
    </Link>
    <button className="btn save_button" type="submit">Save</button>
    
    </div>
    </div>
    
    
    
    </div>
    </Form>
    
    </div>
    </div>			
    </div>
    
    
    
    
    
    </div>
    </div>
    </div>
    
    
    </div>   
    </div>
              


        );
    }
}

export default EditBusiness;
