import React from "react";
import firebase from "../config";
import Sidebar from "../component/sidebar";
import Header from "../component/header";
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import { Form } from "reactstrap";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { Alert } from "reactstrap";
import Iframe from "react-iframe";
class SettingsGstInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employer_sevice_message: "",
      email_message: "",
      mobile_message: "",

      customer_name: "",
      customer_email: "",
      customer_phonenumber: "",
      customer_notes: "",

      gst_number: "",
      gst_registration_form: "",

      avatar: "",
      isUploading: false,
      progress: 0,
      avatarURL: "",
      filenames: [],
      uploadProgress: 0,
    };

    this.onChange = this.onChange.bind(this);

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
            // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
            // params.indexOf(val) === -1
            return (
              validator.helpers.testRegex(val, /^[ A-Za-z0-9_@./#&+-]*$/i) &&
              params.indexOf(val) === -1
            );
          },
        },
        specialCharText: {
          message: "The :attribute may only contain letters, dot and spaces.",
          rule: function (val, params, validator) {
            // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
            // params.indexOf(val) === -1
            return (
              validator.helpers.testRegex(val, /^[ A-Za-z_@./#&+-]*$/i) &&
              params.indexOf(val) === -1
            );
          },
        },

        zip: {
          message: "Invalid Pin Code",
          rule: function (val, params, validator) {
            // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
            // params.indexOf(val) === -1
            return (
              validator.helpers.testRegex(val, /^(\d{5}(\d{4})?)?$/i) &&
              params.indexOf(val) === -1
            );
          },
        },
        website: {
          message: "The Url should be example.com ",
          rule: function (val, params, validator) {
            // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
            // params.indexOf(val) === -1
            return (
              validator.helpers.testRegex(
                val,
                /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
              ) && params.indexOf(val) === -1
            );
          },
        },
        Fax: {
          message: "Invalid fax number ",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(
                val,
                /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i
              ) && params.indexOf(val) === -1
            );
          },
        },
      },
    });
  }

  componentDidMount() {
    this.setState({ loading: true });

    var sessionId = sessionStorage.getItem("RoleId");
    if (sessionId) {
      console.log(sessionId);

      firebase
        .firestore()
        .collection("/merchant_users")
        .doc(sessionId)
        .get()
        .then((snapshot) => {
          var Users = snapshot.data();
          console.log(Users);
          sessionStorage.setItem("username", Users.user_name);
          sessionStorage.setItem("email", Users.email_id);

          this.setState({
            userRole: Users.Role,
            loading: false,
          });
        });
      var businessId = sessionStorage.getItem("businessId");
      firebase
        .firestore()
        .collection("/businessdetails")
        .doc(businessId)
        .get()
        .then((snapshot) => {
          var business = snapshot.data();
          console.log(business);
          sessionStorage.setItem("BusinessName", business.business_name);
          sessionStorage.setItem("BusinessLogo", business.business_logo);
        });
    }

    this.info();
  }
  info = async () => {
    this.setState({ loading: false });
    var user = null;
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");
    if (sessionId) {
      const ref = await firebase
        .firestore()
        .collection("settings_gst_info")
        .doc(businessId)
        .get();
      if (ref.exists) {
        await firebase
          .firestore()
          .collection("/settings_gst_info")
          .doc(businessId)
          .get()
          .then((snapshot) => {
            var info = snapshot.data();
            // if (snapshot.numChildren > 0) {
            console.log(info);
            this.setState({
              gst_number: info.gst_number,
              gst_registration_form: info.gst_registration_form,
              businessId: info.businessId,
              sessionId: info.sessionId,
            });
            console.log(this.state.gst_registration_form);
            // } else {
            // }
          });
      } else {
      }
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
      // Todo: handle error
    });
    console.error(error);
  };

  handleItemPhotoSuccess = (filename) => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    console.log(this.state.avatar);
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then((url) => this.setState({ gst_registration_form: url }));
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.validator.allValid()) {
      var sessionId = sessionStorage.getItem("RoleId");
      var username = sessionStorage.getItem("username");
      var businessId = sessionStorage.getItem("businessId");
      var ref = await firebase
        .firestore()
        .collection("/settings_gst_info")
        .doc(businessId)
        .set({
          gst_number: this.state.gst_number,
          gst_registration_form: this.state.gst_registration_form,

          businessId: businessId,
          sessionId: sessionId,
          username: username,
        });
      this.setState({
        employer_sevice_message: (
          <Alert color="success">Information has been updated ...!</Alert>
        ),
      });
      window.location.href = "/Settings";

      // this
      //     .props
      //     .history
      //     .push("/AllCustomers");
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    return (
      <>
        <div className="text-danger"> {this.state.employer_sevice_message}</div>
        <Form onSubmit={this.handleSubmit}>
          <div className="row business_reg_box">
            <div className="col-md-6 p-0">
              <div className="col-md-12">
                <div className="row form-group">
                  <div className="col col-md-4">
                    <label className=" form-control-label">GST number</label>
                  </div>
                  <div className="col-12 col-md-8">
                    <input
                      type="text"
                      id="text-input"
                      name="gst_number"
                      onChange={this.onChange}
                      value={this.state.gst_number}
                      placeholder="Text here"
                      className="form-control"
                    />
                  </div>
                  {this.validator.message(
                    "Gst Number",
                    this.state.gst_number,
                    "required|min:1|max:70"
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="row form-group">
                  <div className="col col-md-4">
                    <label className=" form-control-label">
                      GST registration form
                    </label>
                  </div>
                  <div className="col-12 col-md-8">
                    {/* <input type="file" id="text-input" name="text-input" placeholder="Text here" className="form-control"/> */}
                    {/* <iframe
  type="application/pdf"
    src={this.state.gst_registration_form}
    frameBorder="0"
    scrolling="auto"
    height="50%"
    width="50%"
></iframe> */}

                    <Iframe
                      url={this.state.gst_registration_form}
                      width="50%"
                      height="50%"
                      id="myId"
                      className="myClassname"
                      display="initial"
                      position="relative"
                    />
                    <FileUploader
                      accept="files/*"
                      name="gst_registration_form"
                      randomizeFilename
                      storageRef={firebase.storage().ref("images")}
                      onUploadStart={this.handleFrontImageUploadStart}
                      onUploadError={this.handleUploadError}
                      onUploadSuccess={this.handleItemPhotoSuccess}
                      onProgress={this.handleProgress}
                    />
                    {this.validator.message(
                      "GstRegistrationForm",
                      this.state.gst_registration_form,
                      "required"
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12 text-right m-t-10">
              <span>
                <button className="save_small_button">Update</button>
              </span>
            </div>
          </div>
        </Form>
      </>
    );
  }
}

export default SettingsGstInfo;
