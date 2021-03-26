// this is for add,edit,delete,view,list floors
import React from "react";
import firebase from "../config";
import { db } from "../config";
import SimpleReactValidator from "simple-react-validator";
import { Form } from "reactstrap";
import swal from "sweetalert";
import { Modal } from "react-bootstrap";
import FileUploader from "react-firebase-file-uploader";

class SettingsMedia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      created_on: new Date().toLocaleString(),
      mobile_message: "",
      employer_sevice_message: "",
      validError: false,

      show: false,

      editMedia: false,
      currentPage: 0,
    };

    this.onChange = this.onChange.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.editMedia = this.editMedia.bind(this);

    this.validator = new SimpleReactValidator({
      className: "text-danger",
      validators: {
        passwordvalid: {
          message:
            "The :attribute must be at least 6 and at most 30 with 1 numeric,1 special charac" +
            "ter and 1 alphabet.",
          rule: function (val, params, validator) {
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

        zip: {
          message: "Invalid Pin Code",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /^(\d{5}(\d{4})?)?$/i) &&
              params.indexOf(val) === -1
            );
          },
        },
        website: {
          message: "The Url should be example.com ",
          rule: function (val, params, validator) {
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

      db.collection("/merchant_users")
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
      db.collection("/businessdetails")
        .doc(businessId)
        .get()
        .then((snapshot) => {
          var business = snapshot.data();
          console.log(business);
          sessionStorage.setItem("BusinessName", business.business_name);
          sessionStorage.setItem("BusinessLogo", business.business_logo);
        });
    }

    this.mediaList();
  }

  mediaList = async () => {
    var businessId = sessionStorage.getItem("businessId");

    this.setState({ loading: true });
    db.collection("settings_Media_Image")
      .where("businessId", "==", businessId)
      .get()
      .then((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          data.push({
            ...childSnapShot.data(),
            mediaimageId: childSnapShot.id,
          });
        });
        this.setState({
          mediaList: data,
          countPage: data.length,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.unsubscribe = db
      .collection("settings_Media_Image")
      .where("businessId", "==", businessId)
      .onSnapshot((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          data.push({
            ...childSnapShot.data(),
            mediaimageId: childSnapShot.id,
          });
        });
        this.setState({
          mediaList: data,
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
      .then((url) => this.setState({ media_image: url }));
  };

  handleUploadStart = () =>
    this.setState({ isUploading: true, uploadProgress: 0 });

  handleFrontvideoUploadStart = () =>
    this.setState({ isUploading: true, uploadProgress: 0, avatarURL: "" });
  handleProgress = (progress) => this.setState({ uploadProgress: progress });

  handleUploadError = (error) => {
    this.setState({
      isUploading: false,
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
      .then((url) => this.setState({ media_video: url }));
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.validator.allValid()) {
      var sessionId = sessionStorage.getItem("RoleId");
      var username = sessionStorage.getItem("username");
      var businessId = sessionStorage.getItem("businessId");
      await db
        .collection("/settings_Media_Image")

        .add({
          media_image: this.state.media_image,
          media_video: this.state.media_video,
          video_link: this.state.video_link,
          created_on: this.state.created_on,
          sessionId: sessionId,
          username: username,
          businessId: businessId,
        });

      this.setState({
        employer_sevice_message: "Data Added",

        media_image: "",
        media_video: "",
        video_link: "",
        show: false,
      });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  editMedia = (id) => {
    this.setState({ editMedia: true });
    var media;
    for (var i = 0; i < this.state.mediaList.length; i++) {
      if (this.state.mediaList[i].mediaimageId === id) {
        media = this.state.mediaList[i];
        break;
      }
    }
    console.log(media);
    this.setState({
      media_image: media.media_image,
      media_video: media.media_video,
      video_link: media.video_link,

      mediaimageId: id,
    });
  };
  onEditSubmit = async (e) => {
    var sessionId = sessionStorage.getItem("RoleId");
    var username = sessionStorage.getItem("username");
    var businessId = sessionStorage.getItem("businessId");
    e.preventDefault();
    await db
      .collection("settings_Media_Image")
      .doc(this.state.mediaimageId)
      .update({
        media_image: this.state.media_image,
        media_video: this.state.media_video,
        video_link: this.state.video_link,
        created_on: this.state.created_on,
        sessionId: sessionId,
        username: username,
        businessId: businessId,
      });
    this.setState({
      editMedia: false,
      media_image: "",
      media_video: "",
      video_link: "",
      mediaimageId: "",
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
        var playersRef = db.collection("/settings_Media_Image").doc(id);
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
  handlePageClick = ({ selected: selectedPage }) => {
    this.setState({
      currentPage: selectedPage,
    });
  };
  render() {
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

            {this.state.mediaList &&
              this.state.mediaList.map((data, index) => {
                return (
                  <div className="row form-group mb-0" key={index}>
                    <div className="col col-md-3">
                      <div className="upload_img upload_small small_img">
                        <div className="form-group">
                          <img src={data.media_image} id="img-upload" />

                          <div className="input-group">
                            <span
                              className="input-group-btn"
                              onClick={() => {
                                this.editMedia(data.mediaimageId);
                              }}
                            >
                              <span className="btn btn-default btn-file">
                                &#60; Update &#62;
                              </span>
                            </span>
                            <span
                              className="input-group-btn"
                              onClick={this.deleteItem.bind(
                                this,
                                data.mediaimageId
                              )}
                            >
                              <span className="btn btn-default btn-file">
                                &#60; Delete &#62;
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

            <div className="col-md-12 text-right m-t-10">
              <span>
                <button
                  className="save_small_button"
                  onClick={() => {
                    this.setState({ show: true });
                  }}
                >
                  Add Media
                </button>
              </span>
            </div>
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
                  Add Media
                </h5>
              </div>

              <Form onSubmit={this.handleSubmit}>
                <div className="modal-body upload_carosel">
                  <div className="col-12 w-100-row line_bdr_bottom">
                    <div className="row">
                      <div className="col col-md-5 font-18">
                        {this.state.media_image && (
                          <img src={this.state.media_image} />
                        )}
                        <FileUploader
                          accept="image/*"
                          name="media_image"
                          randomizeFilename
                          storageRef={firebase.storage().ref("images")}
                          onUploadStart={this.handleFrontImageUploadStart}
                          onUploadError={this.handleUploadError}
                          onUploadSuccess={this.handleItemPhotoSuccess}
                          onProgress={this.handleProgress}
                        />
                      </div>
                      {this.validator.message(
                        "Image",
                        this.state.media_image,
                        "required"
                      )}

                      <div className="col col-md-6 bill_id_settle">
                        <div className="form-group">
                          {/* <span className="pull-left m-b-20"><input type="text" id="text-input" name="text-input" placeholder="Link" className="form-control edit_product"/></span> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row line_bdr_bottom">
                    <div className="row">
                      <div className="col col-md-5 font-18">
                        {this.state.media_video && (
                          <video
                            controls
                            width="80%"
                            height="80%"
                            src={this.state.media_video}
                          />
                        )}
                        <FileUploader
                          accept="video/*"
                          name="media_video"
                          randomizeFilename
                          storageRef={firebase.storage().ref("images")}
                          onUploadStart={this.handleFrontvideoUploadStart}
                          onUploadError={this.handleUploadError}
                          onUploadSuccess={this.handleItemvideoSuccess}
                          onProgress={this.handleProgress}
                        />
                      </div>
                      {this.validator.message(
                        "Video",
                        this.state.media_video,
                        "required"
                      )}
                      <div className="col col-md-6 bill_id_settle">
                        <div className="form-group">
                          {/* <span className="pull-left m-b-20"><input type="text" id="text-input" name="text-input" placeholder="Link" className="form-control edit_product"/></span> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row line_bdr_bottom">
                    <div className="row">
                      <div className="col col-md-5 font-18">
                        <input
                          type="text"
                          id="text-input"
                          name="video_link"
                          onChange={this.onChange}
                          value={this.state.video_link}
                          placeholder="Video Link"
                          className="form-control edit_product"
                        />
                      </div>
                      {this.validator.message(
                        "Link",
                        this.state.video_link,
                        "required|url"
                      )}
                      <div className="col col-md-6 bill_id_settle">
                        <div className="form-group">
                          {/* <span className="pull-left m-b-20"><input type="text" id="text-input" name="text-input" placeholder="Link" className="form-control edit_product"/></span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn save_btn" type="submit">
                    Add Media
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </Modal>
        <Modal
          show={this.state.editMedia}
          onHide={() => this.setState({ editMedia: false })}
        >
          <div className="modal-dialog modal-sm hipal_pop" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="smallmodalLabel">
                  Update Media
                </h5>
              </div>

              <Form onSubmit={this.onEditSubmit}>
                <div className="modal-body upload_carosel">
                  <div className="col-12 w-100-row line_bdr_bottom">
                    <div className="row">
                      <div className="col col-md-5 font-18">
                        {this.state.media_image && (
                          <img src={this.state.media_image} />
                        )}
                        <FileUploader
                          accept="image/*"
                          name="media_image"
                          randomizeFilename
                          storageRef={firebase.storage().ref("images")}
                          onUploadStart={this.handleFrontImageUploadStart}
                          onUploadError={this.handleUploadError}
                          onUploadSuccess={this.handleItemPhotoSuccess}
                          onProgress={this.handleProgress}
                        />
                      </div>
                      {this.validator.message(
                        "Image",
                        this.state.media_image,
                        "required"
                      )}

                      <div className="col col-md-6 bill_id_settle">
                        <div className="form-group">
                          {/* <span className="pull-left m-b-20"><input type="text" id="text-input" name="text-input" placeholder="Link" className="form-control edit_product"/></span> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row line_bdr_bottom">
                    <div className="row">
                      <div className="col col-md-5 font-18">
                        {this.state.media_video && (
                          <video
                            controls
                            width="80%"
                            height="80%"
                            src={this.state.media_video}
                          />
                        )}
                        <FileUploader
                          accept="video/*"
                          name="media_video"
                          randomizeFilename
                          storageRef={firebase.storage().ref("images")}
                          onUploadStart={this.handleFrontvideoUploadStart}
                          onUploadError={this.handleUploadError}
                          onUploadSuccess={this.handleItemvideoSuccess}
                          onProgress={this.handleProgress}
                        />
                      </div>
                      {this.validator.message(
                        "Video",
                        this.state.media_video,
                        "required"
                      )}
                      <div className="col col-md-6 bill_id_settle">
                        <div className="form-group">
                          {/* <span className="pull-left m-b-20"><input type="text" id="text-input" name="text-input" placeholder="Link" className="form-control edit_product"/></span> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row line_bdr_bottom">
                    <div className="row">
                      <div className="col col-md-5 font-18">
                        <input
                          type="text"
                          id="text-input"
                          name="video_link"
                          onChange={this.onChange}
                          value={this.state.video_link}
                          placeholder="Video Link"
                          className="form-control edit_product"
                        />
                      </div>
                      {this.validator.message(
                        "Link",
                        this.state.video_link,
                        "required|url"
                      )}
                      <div className="col col-md-6 bill_id_settle">
                        <div className="form-group">
                          {/* <span className="pull-left m-b-20"><input type="text" id="text-input" name="text-input" placeholder="Link" className="form-control edit_product"/></span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn save_btn" type="submit">
                    Update Media
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default SettingsMedia;
