//this is the code for adding ,editing and viewing  employee positions
import React from "react";
import { db } from "../config";
import firebase from "../config";
import Sidebar from "./../component/sidebar";
import Header from "./../component/header";
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import { Form } from "reactstrap";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Iframe from "react-iframe";
import { Modal } from "react-bootstrap";
import ReactPaginate from "react-paginate";
const PER_PAGE = 5;
class AllEmployeePositions extends React.Component {
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

      show: false,
      viewEmployeePosition: false,
      editEmployeePosition: false,
      currentPage: 0,
    };
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.editEmployeePosition = this.editEmployeePosition.bind(this);
    this.onChange = this.onChange.bind(this);
    this.viewEmployeePosition = this.viewEmployeePosition.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
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
    this.setState({ loading: false });

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

    this.employeePositionsList();
  }
  //here is the code for getting the list of employee positions , when we add a new employee we need to select the position to that employee ,for that purpose we add the employee positions
  employeePositionsList = async () => {
    var businessId = sessionStorage.getItem("businessId");

    this.setState({ loading: true });
    db.collection("employee_positions")
      .where("businessId", "==", businessId)
      .get()
      .then((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          data.push({
            ...childSnapShot.data(),
            employeePositionId: childSnapShot.id,
          });
        });
        this.setState({
          employeePositionsList: data,
          countPage: data.length,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.unsubscribe = db
      .collection("employee_positions")
      .where("businessId", "==", businessId)
      .onSnapshot((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          data.push({
            ...childSnapShot.data(),
            employeePositionId: childSnapShot.id,
          });
        });
        this.setState({
          employeePositionsList: data,
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
      var sessionId = sessionStorage.getItem("RoleId");
      var username = sessionStorage.getItem("username");
      var businessId = sessionStorage.getItem("businessId");
      await db
        .collection("/employee_positions")

        .add({
          created_on: this.state.created_on,
          employee_position: this.state.employee_position,
          employee_details: this.state.employee_details,
          employee_task_list: this.state.employee_task_list,
          employee_position_document: this.state.employee_position_document,
          sessionId: sessionId,
          username: username,
          businessId: businessId,
        });

      this.setState({
        employee_position: "",
        employee_details: "",
        employee_task_list: "",
        employee_position_document: "",
        show: false,
      });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };
  //if the added employee position name is already exist in the database ,then this function takes action and then we get the message called employee position already exist
  employeePositionChange = async (e) => {
    var businessId = sessionStorage.getItem("businessId");
    this.setState({
      employee_position: e.target.value,
    });
    if (this.state.validError != true) {
      await db
        .collection("employee_positions/")
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
        db.collection("/employee_positions").doc(id).delete();
      } else {
      }
    });
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  // this is the code for view the particular details of the employee position which we had selected
  viewEmployeePosition = (id) => {
    this.setState({ viewEmployeePosition: true });

    var employeeposition;
    for (var i = 0; i < this.state.employeePositionsList.length; i++) {
      if (this.state.employeePositionsList[i].employeePositionId === id) {
        employeeposition = this.state.employeePositionsList[i];
        break;
      }
    }
    this.setState({
      employee_position: employeeposition.employee_position,
      employee_details: employeeposition.employee_details,
      employee_task_list: employeeposition.employee_task_list,
      employee_position_document: employeeposition.employee_position_document,
      employeePositionId: id,
    });
  };
  // this is for editing the employee position details
  editEmployeePosition = (id) => {
    this.setState({ editEmployeePosition: true });
    var employeeposition;
    for (var i = 0; i < this.state.employeePositionsList.length; i++) {
      if (this.state.employeePositionsList[i].employeePositionId === id) {
        employeeposition = this.state.employeePositionsList[i];
        break;
      }
    }
    console.log(employeeposition);
    this.setState({
      employee_position: employeeposition.employee_position,
      employee_details: employeeposition.employee_details,
      employee_task_list: employeeposition.employee_task_list,
      employee_position_document: employeeposition.employee_position_document,
      employeePositionId: id,
    });
  };
  // this functionality is for updating the edited data
  onEditSubmit = async (e) => {
    e.preventDefault();
    await db
      .collection("employee_positions")
      .doc(this.state.employeePositionId)
      .update({
        employee_position: this.state.employee_position,
        employee_details: this.state.employee_details,
        employee_task_list: this.state.employee_task_list,
        employee_position_document: this.state.employee_position_document,
      });
    this.setState({
      editEmployeePosition: false,
      employee_position: "",
      employee_details: "",
      employee_task_list: "",
      employee_position_document: "",
      employeePositionId: "",
    });
  };
  handlePageClick = ({ selected: selectedPage }) => {
    this.setState({
      currentPage: selectedPage,
    });
  };
  render() {
    const offset = this.state.currentPage * PER_PAGE;

    const currentPageData =
      this.state.employeePositionsList &&
      this.state.employeePositionsList
        .slice(offset, offset + PER_PAGE)
        .map((employee_position, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{employee_position.employee_position}</td>
              <td>{employee_position.employee_details}</td>
              <td>
                <img
                  src="/images/icon/edit_icon_blue.svg"
                  className="edit_delete"
                  onClick={() => {
                    this.editEmployeePosition(
                      employee_position.employeePositionId
                    );
                  }}
                />

                <img
                  src="/images/icon/delete_cross.svg"
                  onClick={this.deleteItem.bind(
                    this,
                    employee_position.employeePositionId
                  )}
                  className="edit_delete"
                />
                <button type="button">
                  <span
                    className="btn view_order_btn_td"
                    onClick={this.viewEmployeePosition.bind(
                      this,
                      employee_position.employeePositionId
                    )}
                  >
                    View Position
                  </span>
                </button>
              </td>
            </tr>
          );
        });

    const pageCount = Math.ceil(
      this.state.employeePositionsList &&
        this.state.employeePositionsList.length / PER_PAGE
    );
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
                            {/* <div className="search_top">
                              <a href="#" className="search_icon">
                                <i className="fas fa-search"></i>
                              </a>
                              <input
                                className="search_input"
                                type="text"
                                name=""
                                placeholder="Search..."
                              />
                            </div> */}
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
                    <div className="col-md-5 p-0">
                      <div className="overview-wrap">
                        <div className="order_btns">
                          <span
                            className="btn add_ord m-l-0 p_btn"
                            onClick={() => {
                              this.setState({ show: true });
                            }}
                          >
                            <img src="/images/icon/add_plus_icon_w.svg" />
                            Add Employee Position
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-30">
                    <div className="col-md-12 p-0">
                      <div className="orders_menu">
                        <ul>
                          <li>
                            <a href="/AllEmployees">Employees</a>
                          </li>

                          <li>
                            <a
                              href="/AllEmployeePositions"
                              className="activemenu"
                            >
                              Positions
                            </a>
                          </li>

                          {/* <li>
                            <a href="/AllEmplopyesRoles">User roles</a>
                          </li> */}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-30">
                    <div className="col-md-12 p-0 employes_table user_position">
                      <div className="table-responsive table-data">
                        <table className="table">
                          <thead>
                            <tr>
                              <td>S.no</td>
                              <td>Position</td>
                              <td>Details</td>
                              <td>Actions</td>
                            </tr>
                          </thead>
                          <tbody id="myTable">{currentPageData}</tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={this.handlePageClick.bind(this)}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                  />
                </div>
              </div>
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
                  Add Employee Position
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
                        <label className=" form-control-label">
                          Documentation
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
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
                  <button
                    type="button"
                    className="btn close_btn"
                    onClick={() =>
                      this.setState({
                        employee_position: "",
                        employee_details: "",
                        employee_task_list: "",
                        employee_position_document: "",
                        show: false,
                      })
                    }
                  >
                    Cancel
                  </button>

                  <button type="submit" className="btn save_btn">
                    Save
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </Modal>
        <Modal
          show={this.state.viewEmployeePosition}
          onHide={() => this.setState({ viewEmployeePosition: false })}
        >
          <div className="modal-dialog modal-sm hipal_pop" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="smallmodalLabel">
                  View Employee Position
                </h5>
              </div>{" "}
              {this.state.employer_sevice_message}
              <div className="modal-body product_edit">
                <div className="col-12 w-100-row">
                  <div className="row form-group">
                    <div className="col col-md-4">
                      <label className=" form-control-label">Position</label>
                    </div>
                    <div className="col-12 col-md-6">
                      <input
                        value={this.state.employee_position}
                        readOnly
                        className="form-control edit_product"
                      />
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
                        value={this.state.employee_details}
                        rows="3"
                        readOnly
                        className="form-control edit_product"
                      ></textarea>
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
                        value={this.state.employee_task_list}
                        rows="3"
                        readOnly
                        className="form-control edit_product"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="col-12 w-100-row">
                  <div className="row form-group">
                    <div className="col col-md-4">
                      <label className=" form-control-label">
                        Documentation
                      </label>
                    </div>
                    <div className="col-12 col-md-6">
                      <Iframe
                        url={this.state.employee_position_document}
                        width="50%"
                        height="50%"
                        id="myId"
                        className="myClassname"
                        display="initial"
                        position="relative"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn close_btn"
                  onClick={() =>
                    this.setState({
                      employee_position: "",
                      employee_details: "",
                      employee_task_list: "",
                      employee_position_document: "",
                      viewEmployeePosition: false,
                    })
                  }
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          show={this.state.editEmployeePosition}
          onHide={() => this.setState({ editEmployeePosition: false })}
        >
          <div className="modal-dialog modal-sm hipal_pop" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="smallmodalLabel">
                  Edit Employee Position
                </h5>
              </div>
              <Form onSubmit={this.onEditSubmit}>
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
                        <label className=" form-control-label">
                          Documentation
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
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
                      onClick={() =>
                        this.setState({
                          employee_position: "",
                          employee_details: "",
                          employee_task_list: "",
                          employee_position_document: "",
                          editEmployeePosition: false,
                        })
                      }
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
        </Modal>
      </>
    );
  }
}

export default AllEmployeePositions;
