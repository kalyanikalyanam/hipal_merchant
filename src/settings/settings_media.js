// here in this page we get list of settings media data
import React from "react";
import firebase from "../config";
import Sidebar from "../component/sidebar";
import Header from "../component/header";
import { Form } from "reactstrap";
import { Link } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import { Modal } from "react-responsive-modal";
// import Modal from 'react-responsive-modal';
import SettingsAddImageMedia from "./settings_add_media image";
class SettingsMedia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employer_sevice_message: "",
      validError: false,
      mobile_message: "",
      open: false,
      created_on: new Date().toLocaleString(),
    };

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

    this.stationList();
  }
  stationList() {
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");
    this.setState({ loading: true });
    var ref = firebase
      .firestore()
      .collection("settings_Media_Image/")
      .where("sessionId", "==", sessionId)
      .where("businessId", "==", businessId)
      .get()

      .then((snapshot) => {
        const data = [];
        snapshot.forEach((childSnapShot) => {
          const GSTData = {
            mediaimageId: childSnapShot.id,
            media_image: childSnapShot.data().media_image,
            media_video: childSnapShot.data().media_video,
            video_link: childSnapShot.data().video_link,
          };

          data.push(GSTData);
        });

        this.setState({
          MediaImageList: data,
          countPage: data.length,
          loading: false,
        });
        console.log(this.state.MediaImageList);
      });
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  render() {
    const { open } = this.state;
    return (
      <>
        <div className="row business_reg_box">
          <div className="col-md-12">
            <h3>Media</h3>
          </div>

          <div className="col-md-12">
            <div className="row form-group mb-0">
              <div className="col col-md-3">Images</div>

              <div className="col col-md-3">Videos</div>
            </div>

            {this.state.MediaImageList &&
              this.state.MediaImageList.map((data, index) => {
                return (
                  <div className="row form-group mb-0" key={index}>
                    <div className="col col-md-3">
                      <div className="upload_img upload_small small_img">
                        <div className="form-group">
                          <img src={data.media_image} id="img-upload" />

                          <div className="input-group">
                            <span className="input-group-btn">
                              <Link
                                to={`/SettingsEditImageMedia/${data.mediaimageId}`}
                              >
                                <span className="btn btn-default btn-file">
                                  &#60; Update &#62;
                                </span>
                              </Link>
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              readonly=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col col-md-3">
                      <div className="upload_img upload_small small_img">
                        <div className="form-group">
                          <div className="img_show icon_small">
                            <video
                              className="img_show icon_small"
                              controls
                              width="80%"
                              height="80%"
                              src={data.media_video}
                            />
                          </div>
                          {/*   
  <div className="input-group">
       <span className="input-group-btn">
           <span className="btn btn-default btn-file">
               &#60; Update &#62; <input type="file" id="imgInp"/>
           </span>
       </span>
       <input type="text" className="form-control" readonly=""/>
   </div> */}
                        </div>
                      </div>
                    </div>

                    <div className="col col-md-6">
                      <div className="w-100-row media_padding">
                        <span className="pull-left">
                          <b>OR</b>
                        </span>

                        <span className="pull-left">
                          <a
                            href={data.video_link}
                            className="form-control"
                            target="_blank"
                          >
                            Youtube Link
                          </a>{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

            {/* <div className="row form-group mb-0">

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

</div> */}

            <div className="col-md-12 text-right m-t-10">
              <span>
                {/* <Link to="/SettingsAddImageMedia"> */}
                <button
                  className="save_small_button"
                  onClick={this.onOpenModal}
                >
                  Add Media
                </button>
                {/* </Link> */}
              </span>
            </div>
          </div>
        </div>
        {open ? (
          <Modal open={open} onClose={this.onCloseModal}>
            <SettingsAddImageMedia onClose={this.onCloseModal} />
          </Modal>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default SettingsMedia;
