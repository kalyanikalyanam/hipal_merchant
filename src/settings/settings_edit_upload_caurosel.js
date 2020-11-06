import React from "react";
import firebase from '../config';
import Sidebar from '../component/sidebar';
import Header from '../component/header';
import {Form} from 'reactstrap';
import {Link} from "react-router-dom";
import FileUploader from "react-firebase-file-uploader";
import SimpleReactValidator from "simple-react-validator";
class SettingsEditUploadCaurosel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          

    employer_sevice_message: "",
    validError:false,
    mobile_message: '',
         
};

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

 this.UploadCauroselList();
       
   }

 
   UploadCauroselList() {
    const {uploadcauroselIdId} = this.props.match.params;
    console.log(uploadcauroselIdId);

    var sessionId = sessionStorage.getItem("RoleId");
    var userName = sessionStorage.getItem("email");

    var ref = firebase
        .database()
        .ref(`settings_upload_caurosel/${uploadcauroselIdId}`);

    ref.on('value', snapshot => {
        var printer = snapshot.val();
        this.setState({
         
            upload_caurosel_photo:printer.upload_caurosel_photo,
             sessionId: sessionId,
             userName:userName,
             loading: false});
        
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
        .then(url => this.setState({upload_caurosel_photo: url}));
};


  
handleSubmit = (event) => {
    event.preventDefault();
    if (this.validator.allValid()) {
        const {uploadcauroselIdId} = this.props.match.params;
        var sessionId = sessionStorage.getItem("RoleId");
        var username = sessionStorage.getItem("username");

      
           
            let dbCon = firebase
            .database()
            .ref(`/settings_upload_caurosel/${uploadcauroselIdId}`);
        dbCon.update({
     
          

            upload_caurosel_photo:this.state.upload_caurosel_photo,
            sessionId: sessionId,
           
            username:username,




           

        });
        window.location.href="/Settings";
      
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


{/* <div className="modal fade" id="upload_carousel" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true"> */}
<div className="modal-dialog modal-sm hipal_pop" role="document">
<div className="modal-content">


<div className="modal-header">
<h5 className="modal-title" id="smallmodalLabel">Upload carousel
</h5></div>


<div className="modal-body upload_carosel">



<Form onSubmit={this.handleSubmit}>

<div className="col-12 w-100-row line_bdr_bottom">
<div className="row">
<div className="col col-md-5 font-18">
{this.state.upload_caurosel_photo && <img src={this.state.upload_caurosel_photo} />}
                                                 <FileUploader
                                                accept="image/*"
                                                name="upload_caurosel_photo"
                                                randomizeFilename
                                                storageRef={firebase
                                                .storage()
                                                .ref("images")}
                                                onUploadStart={this.handleFrontImageUploadStart}
                                                onUploadError={this.handleUploadError}
                                                onUploadSuccess={this.handleItemPhotoSuccess}
                                                onProgress={this.handleProgress}/>
</div>
<div className="col col-md-6 bill_id_settle">
<div className="form-group">



{/* <span className="pull-left m-b-20"><input type="text" id="text-input" name="text-input" placeholder="Link" className="form-control edit_product"/></span> */}


<span className="pull-left m-b-20">
<button className="btn add_btn_pop_orange addmode_pad" type="submit" >Submit</button>
</span>

</div>
</div>
</div>
</div>


</Form>












</div>






</div>
</div>
{/* </div> */}



</>

              
                                                                                               
        );
    }
}

export default SettingsEditUploadCaurosel;
