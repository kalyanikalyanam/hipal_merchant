import React from "react";
import firebase from '../config';
import Sidebar from '../component/sidebar';
import Header from '../component/header';
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import {Form} from 'reactstrap';
import {Link} from "react-router-dom";
class AddPrinterId extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            printer_id:'',
          
          

            employer_sevice_message: "",
            validError:false,
            mobile_message: '',
            avatar: "",
            isUploading: false,
            progress: 0,
            avatarURL: "",
            filenames: [],
           uploadProgress: 0,
         
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

     
           
       }

     



       handleSubmit = (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
          
            var sessionId = sessionStorage.getItem("RoleId");
            var username = sessionStorage.getItem("username");

            let dbCon = firebase
                .database()
                .ref('/PrinterId');
            
              
            dbCon.push({
               


                printer_id:this.state.printer_id,
              

               
                
                sessionId:sessionId,
                username:username,

               
           
        
             });
             window.location.href="/SettingsAddStation";
            // this
            //     .props
            //     .history
            //     .push("/AddCategory");
        } else {
            this
                .validator
                .showMessages();
            this.forceUpdate();
        }

    };

    printer_id_Change  = (e) => {
        this.setState({
            printer_id: e.target.value
        });
        if(this.state.validError!=true){
           
            
            var ref = firebase
            .database()
            .ref('PrinterId/').orderByChild("printer_id").equalTo(e.target.value);
            ref.on('value', snapshot => {
                var  user_exist = snapshot.numChildren();
                console.log(user_exist);
           
            if(user_exist>0 && this.state.validError!=true){
               
               
                this.setState({mobile_message: "Printer Id already exist",validError:false});

            }
          
            else
            {
                this.setState({mobile_message: "",validError:true});
               
            }
           
        })
    }
       
    };



      onChange = (event) => {

        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        return (
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
    
    
    
  
    
 
   
    
    <Form onSubmit={this.handleSubmit}>
    
    
    <div className="row mt-30">
    <div className="col-md-6 p-0">
    
    <div className="category_form">



    
    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Printer ID</label>
    </div>
    <div className="col-12 col-md-8">
    <input type="text"
    name="printer_id"
    onChange={this.printer_id_Change}
    value={this.state.printer_id}
     placeholder=""
      className="form-control"/>
    </div>

    {this .validator.message("Printer ID", this.state.printer_id, "required|whitespace|min:2|max:70")}
    <div className="text-danger">
                                                        {" "}
                                                        {this.state.mobile_message}
                                                        </div>
    </div>




    
   




    
    
    </div>
    </div>			
    </div>
    
  
    
   
    
    
      
    <div className="form-group">
    <button type="submit" className="btn save_btn_menu">Save
                                                    </button>

    
    
    </div>
    
    
    

    
    </Form>
    </div>
    </div>
    </div>
    
    
    </div>   
    </div>
               
        );
    }
}

export default AddPrinterId;
