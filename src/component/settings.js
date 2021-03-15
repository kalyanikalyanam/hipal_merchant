// in dashboard we are having a option called settings ,these all functionality is in the settings components
import React from "react";
import firebase from "../config";
import Sidebar from "./sidebar";
import Header from "./header";
import SettingsInfo from "../settings/settinga_info";
import SettingsGstInfo from "../settings/settings_gst_info";
import SettingsFssaiInfo from "../settings/settings_fssai_info";
import SettingsStation from "../settings/settings_stations";
import SettingsUploadCaurosel from "../settings/settings_upload_caurosel";
import SettingsBestRecommendations from "../settings/settings_best_recommendations";
import SettingsDefaultCustomers from "../settings/settings_default_customers";
import SettingsMedia from "../settings/settings_media";
import SimpleReactValidator from "simple-react-validator";
import SettingsTimings from "../settings/settings_timings";
import { Alert } from "reactstrap";

class Settings extends React.Component {
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

    this.Force();
  }
  Force() {
    this.setState({ loading: false });
    var user = null;
    var sessionId = sessionStorage.getItem("RoleId");
    if (sessionId) {
      firebase
        .database()
        .ref("settings_Force/" + sessionId)
        .on("value", (snapshot) => {
          var info = snapshot.val();
          if (snapshot.numChildren() > 0) {
            console.log(info);
            this.setState({
              Force: info.Force,
            });
          } else {
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
      var ref = firebase.database().ref(`settings_Force/${sessionId}`);

      ref.update({
        Force: this.state.Force,

        sessionId: sessionId,
        username: username,
        businessId: businessId,
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
        <div className="page-wrapper">
          <Sidebar />
          <div className="page-container">
            <Header />
            <div className="main-content">
              <div className="section__content">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-12 p-0">
                      <div className="search_profile">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="company_name_box">
                              <div className="company_iocn">
                                <img
                                  src={sessionStorage.getItem("BusinessLogo")}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                  }}
                                />
                              </div>
                              <div className="company_details">
                                <p className="name">
                                  {sessionStorage.getItem("BusinessName")}{" "}
                                </p>
                                <p className="open">
                                  OPEN{" "}
                                  <i
                                    className="fa fa-circle"
                                    aria-hidden="true"
                                  ></i>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="search_top">
                              <a href="#" className="search_icon">
                                <i className="fas fa-search"></i>
                              </a>
                              <input
                                className="search_input"
                                type="text"
                                name=""
                                placeholder="Search..."
                              />
                            </div>
                          </div>
                          <div className="col-md-3 ">
                            <div className="profile_user">
                              <span className="usericon">
                                <img src="/images/icon/profile.jpg" />
                              </span>
                              <span className="profile_data">
                                <p className="name">
                                  {sessionStorage.getItem("username")}
                                </p>
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
                              {/* <button className="btn edit_small_button">
                                Edit
                              </button> */}
                            </span>
                          </div>
                        </h1>

                        <div className="upload_img_block add_menu w-100-row settings">
                          {/* <hr></hr> */}
                          <SettingsTimings />

                          <hr></hr>

                          <SettingsInfo />

                          <hr></hr>

                          <SettingsUploadCaurosel />

                          {/* <hr></hr> */}

                          {/* <SettingsBestRecommendations /> */}

                          <hr></hr>

                          <SettingsMedia />

                          <hr></hr>

                          <SettingsStation />

                          <hr></hr>

                          <SettingsGstInfo />

                          <hr></hr>

                          <SettingsFssaiInfo />
                          <hr></hr>
                          <SettingsDefaultCustomers />
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
