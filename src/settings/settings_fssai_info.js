import React from "react";
import firebase from '../config';
import Sidebar from '../component/sidebar';
import Header from '../component/header';
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import {Form} from 'reactstrap';
import {Link} from "react-router-dom";
import swal from 'sweetalert';
import { Alert } from 'reactstrap';
class SettingsFssaiInfo extends React.Component {
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

            fssai_number:'',
            fssai_form:'',
            
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

        this.customersList();
        this.info();
           
       }
       info() {
        this.setState({ loading: false });
        var user=null;
        var sessionId = sessionStorage.getItem("RoleId");
    if(sessionId){
       
      
    
        firebase
            .database().ref('settings_fssai_info/' + sessionId).on('value', snapshot => {
                
         var info = snapshot.val();
         if(snapshot.numChildren()>0){
       console.log(info);
        this.setState({
            
            fssai_number:info.fssai_number,
            fssai_form:info.fssai_form,
            

            
          });
         
        }
        else{
            
        }
        });
    }
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

    handleItemPhotoSuccess = (filename) => {

        firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(url => this.setState({fssai_form: url}));
    };

       handleSubmit = (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
          
            var sessionId = sessionStorage.getItem("RoleId");
            var username = sessionStorage.getItem("username");
            var ref = firebase
            .database()
            .ref(`settings_fssai_info/${sessionId}`);
           
            ref.update({
           
            
              
          
               


                fssai_number:this.state.fssai_number,
                fssai_form:this.state.fssai_form,
              
                

                
                sessionId:sessionId,
                username:username,

               
           
        
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
             <div className="text-danger">
                                                    {" "}
                                                    {this.state.employer_sevice_message}
                                                </div>
            <Form onSubmit={this.handleSubmit}>
        
            <div className="row business_reg_box">
<div className="col-md-6 p-0">
<div className="col-md-12">

<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">FSSAI number</label>
</div>
<div className="col-12 col-md-8">
<input type="text" id="text-input" 
  name="fssai_number"
  onChange={this.onChange}
  value={this.state.fssai_number}
placeholder="Text here" className="form-control"/>
</div>
{this .validator.message("FSSAI Number", this.state.fssai_number, "required|min:1|max:70")}
</div>

</div>

<div className="col-md-12">

<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">FSSAI form</label>
</div>
<div className="col-12 col-md-8">
{/* <input type="file" id="text-input" name="text-input" placeholder="Text here" className="form-control"/> */}

<FileUploader
                                                accept="files/*"
                                                name="fssai_form"
                                                randomizeFilename
                                                storageRef={firebase
                                                .storage()
                                                .ref("images")}
                                                onUploadStart={this.handleFrontImageUploadStart}
                                                onUploadError={this.handleUploadError}
                                                onUploadSuccess={this.handleItemPhotoSuccess}
                                                onProgress={this.handleProgress}/>
                                                {this .validator.message("FSSAI Form", this.state.fssai_form, "required")}
  
  
 
</div>
</div>

</div>

</div>

<div className="col-md-12 text-right m-t-10"><span><button className="save_small_button">Update</button></span></div>
</div>
            </Form>
            </>
                                                                                               
        );
    }
}



export default SettingsFssaiInfo;