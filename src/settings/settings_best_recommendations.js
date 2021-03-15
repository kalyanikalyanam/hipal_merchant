//this is the page for selecting the best recommended items
import React from "react";
import firebase from "../config";
import Sidebar from "../component/sidebar";
import Header from "../component/header";
import { Form } from "reactstrap";
import { Link } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import { Modal } from "react-responsive-modal";
import SettingsItemsList from "./settings_items_list";
class SettingsBestRecommendations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employer_sevice_message: "",
      validError: false,
      mobile_message: "",
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

    this.UploadCauroselList();
  }
  UploadCauroselList = async () => {
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");
    this.setState({ loading: true });
    var ref = await firebase
      .firestore()
      .collection("menuitems2")
      // .where("sessionId", "==", sessionId)
      .where("businessId", "==", businessId)
      .where("bestrecommendation", "==", "Selected")
      .get()
      .then((snapshot) => {
        const data = [];
        // console.log(snapshot.data());
        snapshot.forEach((element) => {
          const usersData = {
            itemId: element.id,
            item_id: element.data().item_id,
            item_name: element.data().item_name,
            bestrecommendation: element.data().bestrecommendation,
            item_image: element.data().item_image,
            businessId: element.data().businessId,
            sessionId: element.data().sessionId,
          };
          data.unshift(usersData);
        });

        this.setState(
          {
            UploadCauroselList: data,
            countPage: data.length,
            loading: false,
          },
          () => {
            console.log(this.state.UploadCauroselList, "UploadCauroselList");
          }
        );
      });
  };
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
            <h3>Best recommendation</h3>
          </div>

          <div className="col-md-12">
            <div className="row form-group mb-0">
              {this.state.UploadCauroselList &&
                this.state.UploadCauroselList.map((items, index) => {
                  return (
                    <div className="col col-md-3" key={index}>
                      <div className="upload_img upload_small">
                        <div className="form-group">
                          <img src={items.item_image} id="img-upload" />

                          <div className="input-group">
                            <span className="input-group-btn">
                              <Link to="/SettingsItemsList">
                                {" "}
                                <span className="btn btn-default btn-file">
                                  &#60; Update &#62;{" "}
                                  <input type="file" id="imgInp" />
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
                  );
                })}
            </div>
          </div>

          <div className="col-md-12 text-right m-t-10">
            <span>
              {/* <Link to="/SettingsItemsList"> */}
              <button className="save_small_button" onClick={this.onOpenModal}>
                Select
              </button>
              {/* </Link> */}
            </span>
          </div>
        </div>
        {open ? (
          <Modal open={open} onClose={this.onCloseModal}>
            <SettingsItemsList onClose={this.onCloseModal} />
          </Modal>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default SettingsBestRecommendations;
