import React from "react";
import firebase from '../config';
import Sidebar from '../component/sidebar';
import Header from '../component/header';
import {Form} from 'reactstrap';
import {Link} from "react-router-dom";
import FileUploader from "react-firebase-file-uploader";
import SimpleReactValidator from "simple-react-validator";
class SettingsEditImageMedia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          

    employer_sevice_message: "",
    validError:false,
    mobile_message: '',
         
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

 
       
    this.MediaImageList();
       
}


MediaImageList() {
 const {mediaimageId} = this.props.match.params;
 console.log(mediaimageId);

 var sessionId = sessionStorage.getItem("RoleId");
 var userName = sessionStorage.getItem("email");

 var ref = firebase
     .database()
     .ref(`settings_Media_Image/${mediaimageId}`);

 ref.on('value', snapshot => {
     var printer = snapshot.val();
     this.setState({
       
        media_image:printer.media_image,
        media_video:printer.media_video,
        video_link:printer.video_link,
          sessionId: sessionId,
          userName:userName,
          loading: false
        
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

handleItemPhotoSuccess = (filename) => {

    firebase
        .storage()
        .ref("images")
        .child(filename)
        .getDownloadURL()
        .then(url => this.setState({media_image: url}));
};

handleUploadStart = () => this.setState({isUploading: true, uploadProgress: 0});

handleFrontvideoUploadStart = () => this.setState({isUploading: true, uploadProgress: 0, avatarURL: ''});
handleProgress = progress => this.setState({uploadProgress: progress});

handleUploadError = error => {
    this.setState({
        isUploading: false
        // Todo: handle error
    });
    console.error(error);
};

handleItemvideoSuccess = (filename) => {

    firebase
        .storage()
        .ref("images")
        .child(filename)
        .getDownloadURL()
        .then(url => this.setState({media_video: url}));
};
  

handleSubmit = (event) => {
    event.preventDefault();
    if (this.validator.allValid()) {
        const {mediaimageId} = this.props.match.params;
        var sessionId = sessionStorage.getItem("RoleId");
        var username = sessionStorage.getItem("username");

      
           
            let dbCon = firebase
            .database()
            .ref(`/settings_Media_Image/${mediaimageId}`);
        dbCon.update({
     
          

            media_image:this.state.media_image,
            media_video:this.state.media_video,
            video_link:this.state.video_link,
            sessionId:sessionId,
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
onChange = (event) => {

    this.setState({
        [event.target.name]: event.target.value
    });
};


    render() {
             
        return (
     
<>


{/* <div class="modal fade" id="upload_carousel" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true"> */}
<div class="modal-dialog modal-sm hipal_pop" role="document">
<div class="modal-content">


<div class="modal-header">
<h5 class="modal-title" id="smallmodalLabel">Edit Media 
</h5></div>

<Form onSubmit={this.handleSubmit}>
<div class="modal-body upload_carosel">





<div class="col-12 w-100-row line_bdr_bottom">
<div class="row">
<div class="col col-md-5 font-18">
{this.state.media_image && <img src={this.state.media_image} />}
                                                 <FileUploader
                                                accept="image/*"
                                                name="media_image"
                                                randomizeFilename
                                                storageRef={firebase
                                                .storage()
                                                .ref("images")}
                                                onUploadStart={this.handleFrontImageUploadStart}
                                                onUploadError={this.handleUploadError}
                                                onUploadSuccess={this.handleItemPhotoSuccess}
                                                onProgress={this.handleProgress}/>
</div>
{this .validator.message("Image", this.state.media_image, "required")}

<div class="col col-md-6 bill_id_settle">
<div class="form-group">



{/* <span class="pull-left m-b-20"><input type="text" id="text-input" name="text-input" placeholder="Link" class="form-control edit_product"/></span> */}




</div>
</div>
</div>
</div>

<div class="col-12 w-100-row line_bdr_bottom">
<div class="row">

<div class="col col-md-5 font-18">
{this.state.media_video && <video controls   width="80%" height="80%" src={this.state.media_video}/>}
                                                 <FileUploader
                                                accept="video/*"
                                                name="media_video"
                                                randomizeFilename
                                                storageRef={firebase
                                                .storage()
                                                .ref("images")}
                                                onUploadStart={this.handleFrontvideoUploadStart}
                                                onUploadError={this.handleUploadError}
                                                onUploadSuccess={this.handleItemvideoSuccess}
                                                onProgress={this.handleProgress}/>
</div>
{this .validator.message("Video", this.state.media_video, "required")}
<div class="col col-md-6 bill_id_settle">
<div class="form-group">



{/* <span class="pull-left m-b-20"><input type="text" id="text-input" name="text-input" placeholder="Link" class="form-control edit_product"/></span> */}




</div>
</div>
</div>
</div>

<div class="col-12 w-100-row line_bdr_bottom">
<div class="row">

<div class="col col-md-5 font-18">
<input type="text" id="text-input" name="video_link"
onChange={this.onChange}
value={this.state.video_link}
placeholder="Video Link" class="form-control edit_product"/>
</div>
{this .validator.message("Link", this.state.video_link, "required|url")}
<div class="col col-md-6 bill_id_settle">
<div class="form-group">



{/* <span class="pull-left m-b-20"><input type="text" id="text-input" name="text-input" placeholder="Link" class="form-control edit_product"/></span> */}




</div>
</div>
</div>
</div>











</div>



<div class="modal-footer">
<button type="button" class="btn save_btn" type="submit">Add Media</button>
</div>

</Form>
</div>
</div>
{/* </div> */}



</>

              
                                                                                               
        );
    }
}

export default SettingsEditImageMedia;