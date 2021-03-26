// here in this page we get the caurosel list
import React from "react";
import firebase from "../config";
import { db } from "../config";
import { Form } from "reactstrap";
import swal from "sweetalert";
import SimpleReactValidator from "simple-react-validator";
import { Modal } from "react-bootstrap";
import FileUploader from "react-firebase-file-uploader";

class SettingsUploadCaurosel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employer_sevice_message: "",
      validError: false,
      mobile_message: "",
      show: false,
      created_on: new Date().toLocaleString(),
      editUploadCaurosel: false,
    };
    this.onChange = this.onChange.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.editUploadCaurosel = this.editUploadCaurosel.bind(this);

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
    var businessId = sessionStorage.getItem("businessId");

    this.setState({ loading: true });
    db.collection("settings_upload_caurosel")
      .where("businessId", "==", businessId)
      .get()
      .then((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          data.push({
            ...childSnapShot.data(),
            uploadcauroselIdId: childSnapShot.id,
          });
        });
        this.setState({
          UploadCauroselList: data,
          countPage: data.length,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.unsubscribe = db
      .collection("settings_upload_caurosel")
      .where("businessId", "==", businessId)
      .onSnapshot((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          data.push({
            ...childSnapShot.data(),
            uploadcauroselIdId: childSnapShot.id,
          });
        });
        this.setState({
          UploadCauroselList: data,
          countPage: data.length,
          loading: false,
        });
      });
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
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then((url) => this.setState({ upload_caurosel_photo: url }));
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.validator.allValid()) {
      var sessionId = sessionStorage.getItem("RoleId");
      var username = sessionStorage.getItem("username");
      var businessId = sessionStorage.getItem("businessId");
      await db
        .collection("/settings_upload_caurosel")

        .add({
          upload_caurosel_photo: this.state.upload_caurosel_photo,
          created_on: this.state.created_on,
          sessionId: sessionId,
          username: username,
          businessId: businessId,
        });

      this.setState({
        employer_sevice_message: "Data Added",

        upload_caurosel_photo: "",
        show: false,
      });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  editUploadCaurosel = (id) => {
    this.setState({ editUploadCaurosel: true });
    var uploadcaurosel;
    for (var i = 0; i < this.state.UploadCauroselList.length; i++) {
      if (this.state.UploadCauroselList[i].uploadcauroselIdId === id) {
        uploadcaurosel = this.state.UploadCauroselList[i];
        break;
      }
    }
    console.log(uploadcaurosel);
    this.setState({
      upload_caurosel_photo: uploadcaurosel.upload_caurosel_photo,

      uploadcauroselIdId: id,
    });
  };
  onEditSubmit = async (e) => {
    var sessionId = sessionStorage.getItem("RoleId");
    var username = sessionStorage.getItem("username");
    var businessId = sessionStorage.getItem("businessId");
    e.preventDefault();
    await db
      .collection("settings_upload_caurosel")
      .doc(this.state.uploadcauroselIdId)
      .update({
        upload_caurosel_photo: this.state.upload_caurosel_photo,
        created_on: this.state.created_on,
        sessionId: sessionId,
        username: username,
        businessId: businessId,
      });
    this.setState({
      editUploadCaurosel: false,
      upload_caurosel_photo: "",

      uploadcauroselIdId: "",
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
        var playersRef = db.collection("/settings_upload_caurosel").doc(id);
        playersRef.delete();
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
    const { open } = this.state;
    return (
      <>
        <div className="row business_reg_box">
          <div className="col-md-12">
            <h3>Upload Home Page Courosal</h3>
          </div>

          <div className="col-md-12">
            <div className="row form-group mb-0">
              {this.state.UploadCauroselList &&
                this.state.UploadCauroselList.map((data, index) => {
                  return (
                    <div className="col col-md-3" key={index}>
                      <div className="upload_img upload_small">
                        <div className="form-group">
                          <img
                            src={data.upload_caurosel_photo}
                            id="img-upload"
                          />

                          <div className="input-group">
                            <span className="input-group-btn">
                              {" "}
                              <span
                                className="btn btn-default btn-file"
                                onClick={() => {
                                  this.editUploadCaurosel(
                                    data.uploadcauroselIdId
                                  );
                                }}
                              >
                                &#60; Update &#62;{" "}
                              </span>
                              <span
                                className="btn btn-default btn-file"
                                onClick={this.deleteItem.bind(
                                  this,
                                  data.uploadcauroselIdId
                                )}
                              >
                                &#60; Delete &#62;{" "}
                              </span>
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
              {/* <Link to="/SettingsAddUploadCaurosel"> */}
              <button
                className="save_small_button"
                onClick={() => {
                  this.setState({ show: true });
                }}
              >
                Add
              </button>
              {/* </Link> */}
            </span>
          </div>
        </div>
        <Modal
          show={this.state.show}
          onHide={() => {
            this.setState({ show: false });
          }}
        >
          <div className="modal-dialog modal-sm hipal_pop" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="smallmodalLabel">
                  Add carousel
                </h5>
              </div>

              <div className="modal-body upload_carosel">
                <Form onSubmit={this.handleSubmit}>
                  <div className="col-12 w-100-row line_bdr_bottom">
                    <div className="row">
                      <div className="col col-md-5 font-18">
                        {this.state.upload_caurosel_photo && (
                          <img src={this.state.upload_caurosel_photo} />
                        )}
                        <FileUploader
                          accept="image/*"
                          name="upload_caurosel_photo"
                          randomizeFilename
                          storageRef={firebase.storage().ref("images")}
                          onUploadStart={this.handleFrontImageUploadStart}
                          onUploadError={this.handleUploadError}
                          onUploadSuccess={this.handleItemPhotoSuccess}
                          onProgress={this.handleProgress}
                        />
                      </div>
                      <div className="col col-md-6 bill_id_settle">
                        <div className="form-group">
                          {/* <span className="pull-left m-b-20"><input type="text" id="text-input" name="text-input" placeholder="Link" className="form-control edit_product"/></span> */}

                          <span className="pull-left m-b-20">
                            <button
                              className="btn add_btn_pop_orange addmode_pad"
                              type="submit"
                            >
                              Add
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          show={this.state.editUploadCaurosel}
          onHide={() => this.setState({ editUploadCaurosel: false })}
        >
          <div className="modal-dialog modal-sm hipal_pop" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="smallmodalLabel">
                  Update carousel
                </h5>
              </div>

              <div className="modal-body upload_carosel">
                <Form onSubmit={this.onEditSubmit}>
                  <div className="col-12 w-100-row line_bdr_bottom">
                    <div className="row">
                      <div className="col col-md-5 font-18">
                        {this.state.upload_caurosel_photo && (
                          <img src={this.state.upload_caurosel_photo} />
                        )}
                        <FileUploader
                          accept="image/*"
                          name="upload_caurosel_photo"
                          randomizeFilename
                          storageRef={firebase.storage().ref("images")}
                          onUploadStart={this.handleFrontImageUploadStart}
                          onUploadError={this.handleUploadError}
                          onUploadSuccess={this.handleItemPhotoSuccess}
                          onProgress={this.handleProgress}
                        />
                      </div>
                      <div className="col col-md-6 bill_id_settle">
                        <div className="form-group">
                          {/* <span className="pull-left m-b-20"><input type="text" id="text-input" name="text-input" placeholder="Link" className="form-control edit_product"/></span> */}

                          <span className="pull-left m-b-20">
                            <button
                              className="btn add_btn_pop_orange addmode_pad"
                              type="submit"
                            >
                              Update
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default SettingsUploadCaurosel;
