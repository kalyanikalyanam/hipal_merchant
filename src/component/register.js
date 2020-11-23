// import React from "react";
// import {Link} from "react-router-dom";
// import firebase from '../config';
// import Sidebar from './sidebar';
// class Register extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {

//         };
//     }

//     componentWillMount(){
//         document.getElementById('root').className='h-100'

//       }
//         componentWillUnmount(){
//         document.getElementById('root').className=''

// 	  }
//     render() {
//         return (

// <div className="page-wrapper login_register_box">

// <div className="row h-100">
// <div className="col-md-5 h-100">

// <div className="logo_login">
// <img src="images/icon/logo.svg"/>
// </div>

// </div>
// <div className="col-md-7 h-100">

// <div className="box_login_register h-100 col-12">

// <div className="login_signup_box register">
// <div className="login_regi_row col-12 m-b-50">
// <a href="/"><span className="btn">Login</span></a>

// <span className="btn active">Register</span>
// </div>
// <form>

// <div className="row form-group">
// <div className="col col-md-5">
// <label className=" form-control-label">Username</label>
// </div>
// <div className="col-12 col-md-7">
// <input type="text" id="text-input" name="text-input"  className="form-control"/>
// </div>
// </div>

// <div className="row form-group">
// <div className="col col-md-5">
// <label className=" form-control-label">Password</label>
// </div>
// <div className="col-12 col-md-7">
// <input type="text" id="text-input" name="text-input"  className="form-control"/>
// </div>
// </div>

// <div className="row form-group">
// <div className="col col-md-5">
// <label className=" form-control-label">Phone Number</label>
// </div>
// <div className="col-12 col-md-7">
// <input type="text" id="text-input" name="text-input"  className="form-control"/>
// </div>
// </div>

// <div className="row form-group">
// <div className="col col-md-5">
// <label className=" form-control-label">Business</label>
// </div>
// <div className="col-12 col-md-7">
// <input type="text" id="text-input" name="text-input"  className="form-control"/>
// </div>
// </div>

// <div className="row form-group">
// <div className="col col-md-5">
// <label className=" form-control-label">Email</label>
// </div>
// <div className="col-12 col-md-7">
// <input type="text" id="text-input" name="text-input"  className="form-control"/>
// </div>
// </div>

// <div className="row form-group">
// <div className="col col-md-5">
// <label className=" form-control-label">Re-enter Password</label>
// </div>
// <div className="col-12 col-md-7">
// <input type="text" id="text-input" name="text-input"  className="form-control"/>
// </div>
// </div>

// <div className="row form-group">
// <div className="col col-md-5"></div>
// <div className="col-12 col-md-7">
// <div className="btn login_btn_menu">Get Started</div>
// </div>
// </div>

// </form>
// </div>

// </div>

// </div>
// </div>

// </div>

//         );
//     }
// }

// export default Register;
import React from "react";
import { Link } from "react-router-dom";

import { Form } from "reactstrap";
import firebase from "../config";
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
// import axios from "axios";

const initState = {
  user_name: "",
  contact_number: "",
  email_id: "",
  password: "",
  confirm_password: "",
  business: "",
  photo: "",
  employer_sevice_message: "",
  created_on: new Date().toLocaleString(),
  mobile_message: "",
  validError: false,

  showLoading: false,

  avatar: "",
  isUploading: false,
  progress: 0,
  avatarURL: "",
  filenames: [],
  uploadProgress: 0,
};

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = initState;
    this.validator = new SimpleReactValidator({
      className: "text-danger",
      validators: {
        passwordvalid: {
          message:
            "The :attribute must be at least 6 and at most 30 with 1 numeric,1 special charac" +
            "ter and 1 alphabet.",
          rule: function (val, params, validator) {
            // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
            // params.indexOf(val) === -1
            return (
              validator.helpers.testRegex(
                val,
                /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{6,30}$/i
              ) && params.indexOf(val) === -1
            );
          },
        },
        passwordMismatch: {
          message: "confirm password must match with password field.",
          rule: function (val, params, validator) {
            return document.getElementById("password_input").value === val
              ? true
              : false;
          },
        },
        whitespace: {
          message: "The :attribute not allowed first whitespace   characters.",
          rule: function (val, params, validator) {
            // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
            // params.indexOf(val) === -1
            return (
              validator.helpers.testRegex(val, /[^\s\\]/) &&
              params.indexOf(val) === -1
            );
          },
        },
        specialChar: {
          message: "The :attribute not allowed special   characters.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /^[ A-Za-z0-9_@./#&+-]*$/i) &&
              params.indexOf(val) === -1
            );
          },
        },
        specialCharText: {
          message: "The :attribute may only contain letters, dot and spaces.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /^[ A-Za-z_@./#&+-]*$/i) &&
              params.indexOf(val) === -1
            );
          },
        },
      },
    });
  }
  componentWillMount() {
    document.getElementById("root").className = "h-100";
  }
  componentWillUnmount() {
    document.getElementById("root").className = "";
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email_id, password } = this.state;
    if (this.validator.allValid() && this.state.validError === true) {
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(email_id, password);
      var userID = res.user;
      var user = firebase.auth().currentUser;
      console.log(user);

      let dbRef = firebase
        .firestore()
        .collection("/merchant_users")
        .doc(userID.uid)
        .set({
          user_name: this.state.user_name,
          role: "Merchant",
          status: "Active",
          password: this.state.password,
          email_id: this.state.email_id,
          confirm_password: this.state.confirm_password,
          created_on: this.state.created_on,
        });
      this.setState(initState);
      // if (userID !== null) {
      //   userID.sendEmailVerification();
      // }

      this.props.history.push("/");
      // .catch((error) => {
      //   this.setState({ error });
      //   console.log(this.state.error);
      //   this.setState({ employer_sevice_message: this.state.error.message });
      // });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  handleUploadStart = () =>
    this.setState({ isUploading: true, uploadProgress: 0 });

  handleFrontImageUploadStart = () =>
    this.setState({ isUploading: true, uploadProgress: 0, avatarURL: "" });
  handleProgress = (progress) => this.setState({ uploadProgress: progress });

  handleUploadError = (error) => {
    this.setState({
      isUploading: false,
    });
    console.error(error);
  };

  handlePhotoSuccess = (filename) => {
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then((url) => this.setState({ photo: url }));
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  phoneNumberChange = async (e) => {
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");

    this.setState({ loading: true });
    this.setState({
      contact_number: e.target.value,
    });
    if (this.state.validError != true) {
      firebase
        .firestore()
        .collection("merchant_users")
        .where("sessionId", "==", sessionId)
        .where("businessId", "==", businessId)
        .where("contact_number", "==", e.target.value)

        .get()
        .then((snapshot) => {
          var user_exist = snapshot.size;

          console.log(user_exist);

          if (user_exist > 0 && this.state.validError != true) {
            this.setState({
              mobile_message: "Mobile number already exist",
              validError: false,
            });
          } else {
            this.setState({ mobile_message: "", validError: true });
          }
        });
    }
  };
  // phoneNumberChange = (e) => {
  //   this.setState({
  //     contact_number: e.target.value,
  //   });
  //   if (e.target.value.length == 10 && this.state.validError != true) {
  //     var ref = firebase
  //       .database()
  //       .ref("merchant_users/")
  //       .orderByChild("contact_number")
  //       .equalTo(e.target.value);
  //     ref.on("value", (snapshot) => {
  //       var user_exist = snapshot.numChildren();
  //       console.log(user_exist);

  //       if (user_exist > 0 && this.state.validError != true) {
  //         this.setState({
  //           mobile_message: "Mobile number already exist",
  //           validError: false,
  //         });
  //       } else {
  //         this.setState({ mobile_message: "", validError: true });
  //       }
  //     });
  //   }
  // };

  //     mobileNumberChange= (event) => {
  //         var phoneNumber = "+91" + this.state.contact_number;
  //         const formData = new FormData();
  //   formData.append("mobile", phoneNumber);

  //         const url = 'https://www.idlimachine.com/api/service/sendOTP';
  //         axios(url, {
  //             method: 'POST',
  //             data: formData,
  //             headers: {
  //                 "Content-type": "application/json; charset=UTF-8"
  //             }
  //         }).then((res) =>{
  //             console.log(res);
  //             if (res.status === 200) {
  //                 if(res.data.status ===1){
  //                     localStorage.setItem("otp_mobile_number", phoneNumber);
  //                     this.props.history.push("/OtpVerify");
  //                 }

  //             }

  //         })

  //     };
  render() {
    const { error } = this.state;
    return (
      <div className="page-wrapper login_register_box">
        <div className="row h-100">
          <div className="col-md-5 h-100">
            <div className="logo_login">
              <img src="images/icon/logo.svg" />
            </div>
          </div>
          <div className="col-md-7 h-100">
            <div className="box_login_register h-100 col-12">
              <div className="login_signup_box register">
                <div className="login_regi_row col-12 m-b-50">
                  <a href="/">
                    <span className="btn">Login</span>
                  </a>

                  <span className="btn active">Register</span>
                </div>

                <Form onSubmit={this.handleSubmit}>
                  <div className="row form-group">
                    <div className="col col-md-5">
                      <label className=" form-control-label">Username</label>
                    </div>
                    <div className="col-12 col-md-7">
                      <input
                        type="text"
                        id="text-input"
                        name="user_name"
                        placeholder="UserName"
                        value={this.state.user_name}
                        onChange={this.onChange}
                        className="form-control"
                      />
                    </div>
                    {this.validator.message(
                      "User Name",
                      this.state.user_name,
                      "required|specialCharText|whitespace|min:2|max:70"
                    )}
                  </div>

                  <div className="row form-group">
                    <div className="col col-md-5">
                      <label className=" form-control-label">Password</label>
                    </div>
                    <div className="col-12 col-md-7">
                      <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        placeholder="Password"
                        id="password_input"
                        className="form-control"
                      />
                    </div>
                    {this.validator.message(
                      "Password",
                      this.state.password,
                      "required|passwordvalid|min:6|max:30"
                    )}
                  </div>

                  <div className="row form-group">
                    <div className="col col-md-5">
                      <label className=" form-control-label">
                        Phone Number
                      </label>
                    </div>
                    <div className="col-12 col-md-7">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phone Number"
                        name="contact_number"
                        onChange={this.phoneNumberChange}
                        value={this.state.contact_number}
                      />
                    </div>
                    {this.validator.message(
                      "Contact Number",
                      this.state.contact_number,
                      "required|phone|min:10|max:10"
                    )}

                    <div className="text-danger">
                      {" "}
                      {this.state.mobile_message}
                    </div>
                  </div>

                  <div className="row form-group">
                    <div className="col col-md-5">
                      <label className=" form-control-label">Email</label>
                    </div>
                    <div className="col-12 col-md-7">
                      <input
                        type="text"
                        className="form-control"
                        name="email_id"
                        placeholder="Email ID"
                        value={this.state.email_id}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="text-danger">
                      {" "}
                      {this.state.employer_sevice_message}
                    </div>
                    {this.validator.message(
                      "Email",
                      this.state.email_id,
                      "required|email|min:6|max:70"
                    )}
                  </div>

                  <div className="row form-group">
                    <div className="col col-md-5">
                      <label className=" form-control-label">
                        Re-enter Password
                      </label>
                    </div>
                    <div className="col-12 col-md-7">
                      <input
                        type="password"
                        name="confirm_password"
                        className="form-control"
                        placeholder="Confirm Password"
                        onChange={this.onChange}
                        value={this.state.confirm_password}
                      />
                    </div>
                    {this.validator.message(
                      "Confirm Password",
                      this.state.confirm_password,
                      "required|passwordMismatch"
                    )}
                  </div>
                  <div className="row form-group">
                    <div className="col col-md-5"></div>
                    <div className="col-12 col-md-7">
                      <button className="btn login_btn_menu" type="submit">
                        Get Started
                      </button>
                      {/* <div className="btn login_btn_menu">Get Started</div> */}
                    </div>
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

export default Register;

// <p>Hello,</p>
// <p>Follow this link to reset your %APP_NAME% password for your %EMAIL% account.</p>
// <p><a href='%LINK%'>%LINK%</a></p>
// <p>If you didn’t ask to reset your password, you can ignore this email.</p>
// <p>Thanks,</p>
// <p>Your %APP_NAME% team</p>
