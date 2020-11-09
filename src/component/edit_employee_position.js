import React from "react";
import firebase from "../config";
import Sidebar from "./sidebar";
import Header from "./header";
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import { Form } from "reactstrap";
import { Link } from "react-router-dom";
import Iframe from "react-iframe";
class EditEmployeePosition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      created_on: new Date().toLocaleString(),
      employee_position: "",
      employee_details: "",
      employee_task_list: "",
      employee_position_document: "",

      employer_sevice_message: "",
      validError: false,
      mobile_message: "",
      avatar: "",
      isUploading: false,
      progress: 0,
      avatarURL: "",
      filenames: [],
      uploadProgress: 0,

      employeePositionsList: [],
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
    this.employeePositionList();
  }

  employeePositionList = () => {
    const { employeePositionId } = this.props.match.params;
    this.setState({ loading: true });
    var ref = firebase
      .firestore()
      .collection("/employee_positions")
      .doc(employeePositionId)
      .get()
      .then((snapshot) => {
        var employeePosition = snapshot.data();

        // console.log(categories)

        this.setState({
          // created_on:employeePosition.created_on,

          employee_position: employeePosition.employee_position,
          employee_details: employeePosition.employee_details,
          employee_task_list: employeePosition.employee_task_list,
          employee_position_document:
            employeePosition.employee_position_document,
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
      .then((url) => this.setState({ employee_position_document: url }));
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.validator.allValid()) {
      const { employeePositionId } = this.props.match.params;
      var sessionId = sessionStorage.getItem("RoleId");
      var username = sessionStorage.getItem("username");
      var businessId = sessionStorage.getItem("businessId");
      var key = Math.round(new Date().getTime() / 1000);
      let dbCon = await firebase
        .firestore()
        .collection("/employee_positions")
        .doc(employeePositionId)

        .update({
          created_on: this.state.created_on,
          employee_position: this.state.employee_position,
          employee_details: this.state.employee_details,
          employee_task_list: this.state.employee_task_list,

          employee_position_document: this.state.employee_position_document,

          sessionId: sessionId,
          username: username,
          businessId: businessId,
        });
      window.location.href = "/AllEmployeePositions";
      // this
      //     .props
      //     .history
      //     .push("/AllEmployeePositions");
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

  employeePositionChange = async (e) => {
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");
    this.setState({
      employee_position: e.target.value,
    });
    if (this.state.validError != true) {
      var ref = await firebase
        .firestore()
        .collection("employee_positions/")
        .where("sessionId", "==", sessionId)
        .where("businessId", "==", businessId)
        .where("employee_position", "==", e.target.value)

        .get()
        .then((snapshot) => {
          var user_exist = snapshot.size;
          console.log(user_exist);

          if (user_exist > 0 && this.state.validError != true) {
            this.setState({
              mobile_message: "Position Name already exist",
              validError: false,
            });
          } else {
            this.setState({ mobile_message: "", validError: true });
          }
        });
    }
  };

  render() {
    return (
      // <div className="modal fade" id="add_employee_position" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true">
      <div className="modal-dialog modal-sm hipal_pop" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="smallmodalLabel">
              Edit Employee Position
            </h5>
          </div>
          <Form onSubmit={this.handleSubmit}>
            {" "}
            {this.state.employer_sevice_message}
            <div className="modal-body product_edit">
              <div className="col-12 w-100-row">
                <div className="row form-group">
                  <div className="col col-md-4">
                    <label className=" form-control-label">Position</label>
                  </div>
                  <div className="col-12 col-md-6">
                    <input
                      type="text"
                      id="text-input"
                      name="employee_position"
                      value={this.state.employee_position}
                      onChange={this.employeePositionChange}
                      placeholder="Accounts"
                      className="form-control edit_product"
                    />
                    {this.validator.message(
                      "Position",
                      this.state.employee_position,
                      "required|whitespace|min:2|max:70"
                    )}
                    <div className="text-danger">
                      {" "}
                      {this.state.mobile_message}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 w-100-row">
                <div className="row form-group">
                  <div className="col col-md-4">
                    <label className=" form-control-label">Details</label>
                  </div>
                  <div className="col-12 col-md-6">
                    <textarea
                      name="employee_details"
                      value={this.state.employee_details}
                      onChange={this.onChange}
                      id="textarea-input"
                      rows="3"
                      placeholder="Does the accounting work"
                      className="form-control edit_product"
                    ></textarea>
                    {this.validator.message(
                      "Details",
                      this.state.employee_details,
                      "required|whitespace|min:2|max:70"
                    )}
                  </div>
                </div>
              </div>

              <div className="col-12 w-100-row">
                <div className="row form-group">
                  <div className="col col-md-4">
                    <label className=" form-control-label">Task List</label>
                  </div>
                  <div className="col-12 col-md-6">
                    <textarea
                      name="employee_task_list"
                      value={this.state.employee_task_list}
                      onChange={this.onChange}
                      id="textarea-input"
                      rows="3"
                      placeholder="Detailed Task List "
                      className="form-control edit_product"
                    ></textarea>
                    {this.validator.message(
                      "Task List",
                      this.state.employee_task_list,
                      "required|whitespace|min:2|max:70"
                    )}
                  </div>
                </div>
              </div>

              <div className="col-12 w-100-row">
                <div className="row form-group">
                  <div className="col col-md-4">
                    <label className=" form-control-label">Documentation</label>
                  </div>
                  <div className="col-12 col-md-6">
                    {/* <div className="upload_img upload_small">
   <div className="form-group">
      <div className="img_show product_img_small"><img id="img-upload"/></div>
         <div className="input-group">
              <span className="input-group-btn">
                  <span className="btn btn-default btn-file">
                      Upload PDF or Word File <input type="file" id="imgInp"/>
                  </span>
              </span>
              <input type="text" className="form-control" readonly=""/>
          </div>
          
      </div></div> */}
                    <Iframe
                      url={this.state.employee_position_document}
                      width="50%"
                      height="50%"
                      id="myId"
                      className="myClassname"
                      display="initial"
                      position="relative"
                    />
                    <FileUploader
                      accept="files/*"
                      name="employee_position_document"
                      randomizeFilename
                      storageRef={firebase.storage().ref("images")}
                      onUploadStart={this.handleFrontImageUploadStart}
                      onUploadError={this.handleUploadError}
                      onUploadSuccess={this.handleItemPhotoSuccess}
                      onProgress={this.handleProgress}
                    />
                    {this.validator.message(
                      "Document",
                      this.state.employee_position_document,
                      "required"
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <Link to="/AllEmployeePositions">
                <button
                  type="button"
                  className="btn close_btn"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
              </Link>
              <button type="submit" className="btn save_btn">
                Save
              </button>
            </div>
          </Form>
        </div>
      </div>
      //   </div>
    );
  }
}

export default EditEmployeePosition;
