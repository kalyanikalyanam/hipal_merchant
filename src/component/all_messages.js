import React from "react";
import firebase from "../config";
import Sidebar from "./sidebar";
import Header from "./header";
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import { Form } from "reactstrap";
import { Link } from "react-router-dom";
import swal from "sweetalert";
class AllMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onChange = this.onChange.bind(this);

    this.deleteItem = this.deleteItem.bind(this);
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

    this.messageList();
  }
  messageList = async () => {
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");

    this.setState({ loading: true });
    firebase
      .firestore()
      .collection("Message")
      .where("sessionId", "==", sessionId)
      .where("businessId", "==", businessId)
      .get()
      .then((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          const GSTData = {
            messageId: childSnapShot.id,

            Message: childSnapShot.data().Message,
            UserName: childSnapShot.data().UserName,
            sessionId: childSnapShot.data().sessionId,
            created_on: childSnapShot.data().created_on,
            businessId: childSnapShot.data().businessId,
            sessionId: childSnapShot.data().sessionId,
          };

          data.push(GSTData);
        });
        this.setState({
          messageList: data,
          countPage: data.length,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteItem = (id) => {
    swal({
      title: "Are you sure?",
      text: "Do your really want to remove?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        console.log(id);
        var playersRef = firebase
          .firestore()
          .collection("/Message")
          .doc(id)
          .delete();
      } else {
      }
    });
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    return (
      <>
        <div
          className="modal fade"
          id="message_chat"
          tabindex="-1"
          role="dialog"
          aria-labelledby="smallmodalLabel"
          aria-hidden="true"
        >
          <div className="chat">
            <button
              type="button"
              className="close chat_close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="card">
              <div className="card-header msg_head">
                <div className="d-flex bd-highlight">
                  <div className="img_cont">
                    <span className="posi_rel chat_img">
                      <img
                        src="images/icon/profile_w.jpg"
                        className="user_img"
                      />
                      <span className="online_icon"></span>
                    </span>

                    <span className="chat_names">
                      <p>Rishabh Hurshan</p>
                      <p>rishabh@gmail.com</p>
                    </span>
                  </div>
                </div>
              </div>

              <div className="card-body msg_card_body">
                <div className="justify-content-start mb-4 w-100-row">
                  <div className="img_cont_msg pull-left">
                    <img
                      src="images/icon/profile.jpg"
                      className="user_img_msg"
                    />
                  </div>
                  <div className="msg_cotainer  pull-left">
                    Hello, welcome to Bubble. How may I assist you today?
                    <span className="time_date">17/09/2020 3:00 am</span>
                  </div>

                  <div className="chat_image msg_user">
                    <img src="images/category_img.png" />
                  </div>
                </div>

                <div className="justify-content-end  w-100-row mb-4">
                  <div className="img_cont_msg pull-right">
                    <img
                      src="images/icon/profile.jpg"
                      className="user_img_msg"
                    />
                  </div>

                  <div className="msg_cotainer_send pull-right">
                    Hi, I need the new plan.
                    <span className="time_date">17/09/2020 3:00 am</span>
                  </div>

                  <div className="chat_image msg_send">
                    <img src="images/category_img.png" />
                  </div>
                </div>

                <div className="justify-content-start  w-100-row mb-4">
                  <div className="img_cont_msg pull-left">
                    <img
                      src="images/icon/profile.jpg"
                      className="user_img_msg"
                    />
                  </div>
                  <div className="msg_cotainer  pull-left">
                    Want to give us your email address? That way we can follow
                    up in case we get disconnected.
                    <span className="msg_time">9:00 AM, Today</span>
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <div className="spacer_line"></div>
                <div className="input-group">
                  <textarea
                    name=""
                    className="form-control type_msg"
                    placeholder="Type your message…"
                  ></textarea>
                  <div className="input-group-append">
                    <span className="input-group-text send_btn">
                      <img src="images/icon/attachment_icon.svg" />
                    </span>

                    <span className="input-group-text send_btn">
                      <img src="images/icon/smile_icon.svg" />
                    </span>

                    <span className="input-group-text send_btn">
                      <img src="images/icon/send_icon.svg" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                      <div className="category_upload_image">
                        <h1>Messages</h1>
                        <div className="upload_img_block add_menu">
                          <div className="row">
                            <div className="col-md-12 p-0 message_table">
                              <div className="table-responsive table-data">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <td>Customer Name</td>
                                      <td>Message</td>
                                      <td>Actions</td>
                                    </tr>
                                  </thead>
                                  <tbody id="myTable">
                                    {this.state.messageList &&
                                      this.state.messageList.map(
                                        (message, index) => {
                                          return (
                                            <tr key={index}>
                                              <td>
                                                kalyani
                                                {/* <span className="msg_count"  data-toggle="modal" data-target="#message_chat">1</span> */}
                                              </td>
                                              <td>{message.Message}</td>
                                              <td>
                                                <img
                                                  src="images/icon/delete_cross.svg"
                                                  onClick={this.deleteItem.bind(
                                                    this,
                                                    message.messageId
                                                  )}
                                                  className="edit_delete"
                                                />
                                              </td>
                                            </tr>
                                          );
                                        }
                                      )}
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
          </div>
        </div>
      </>
    );
  }
}

export default AllMessages;
