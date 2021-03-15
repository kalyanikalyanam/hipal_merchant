//this is the code for adding ,editing and viewing  employee details

import React from "react";
import { db } from "../config";
import firebase from "../config";
import Sidebar from "./sidebar";
import Header from "./header";
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import { Form } from "reactstrap";
import swal from "sweetalert";
import { Modal } from "react-bootstrap";
import ReactPaginate from "react-paginate";
const PER_PAGE = 5;
const initState = {
  created_on: Date.now(),

  employee_name: "",
  user_name: "",
  password: "",
  employee_position: "",
  employee_division: "",
  employee_employement_type: "",
  email_id: "",
  contact_number: "",
  photo: "",
  employee_special_password: "",

  employee_dateofbirth: "",
  employee_bloodgroup: "",
  employee_address: "",
  employee_emergency_contact_number: "",
  employee_adharcard: "",

  employee_account_number: "",
  employee_ifsc_code: "",
  employee_upi_id: "",

  employer_sevice_message: "",
  validError: false,
  mobile_message: "",
  email_message: "",
  avatar: "",
  isUploading: false,
  progress: 0,
  avatarURL: "",
  filenames: [],
  uploadProgress: 0,

  employeePositionsList: [],
  validError: false,
  viewcustomersdetails: "",

  deleteeditcustomers: "",
  chatwithcustomers: "",
  addemployees: "",
  vieweditdeleteemployees: "",

  categories: "",
  items: "",

  addtables: "",
  editdeletetables: "",
  addfloors: "",
  editdeletefloors: "",

  settings: "",
  viewbill: "",
  settle: "",
  additemdiscount: "",
  deleteitemafterkot: "",

  addEmployee: false,
  editEmployee: false,
  currentPage: 0,
};
class AllEmployees extends React.Component {
  constructor(props) {
    super(props);
    this.state = initState;
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.editEmployee = this.editEmployee.bind(this);
    this.onChange = this.onChange.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
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
    this.employeePositionsList();
    this.employeeList();
  }
  // employee position list
  // when we add new employee we need to choose the employee position also, for that purpose we need to get the employee position list
  employeePositionsList = async () => {
    var businessId = sessionStorage.getItem("businessId");

    this.setState({ loading: true });
    await db
      .collection("employee_positions")

      .where("businessId", "==", businessId)
      .get()
      .then((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          const GSTData = {
            employeePositionId: childSnapShot.id,

            employee_position: childSnapShot.data().employee_position,
            employee_details: childSnapShot.data().employee_details,
            employee_task_list: childSnapShot.data().employee_task_list,
            employee_position_document: childSnapShot.data()
              .iteemployee_position_documentm_image,
            sessionId: childSnapShot.data().sessionId,
            businessId: childSnapShot.data().businessId,
          };

          data.push(GSTData);
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
  };
  //employee list
  employeeList = async () => {
    var businessId = sessionStorage.getItem("businessId");

    this.setState({ loading: true });
    db.collection("merchant_users")
      .where("businessId", "==", businessId)
      .where("role", "==", "Employee")
      .get()
      .then((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          data.push({ ...childSnapShot.data(), employeeId: childSnapShot.id });
        });
        this.setState({
          employeeList: data,
          countPage: data.length,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.unsubscribe = db
      .collection("merchant_users")
      .where("businessId", "==", businessId)
      .where("role", "==", "Employee")
      .onSnapshot((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          data.push({ ...childSnapShot.data(), employeeId: childSnapShot.id });
        });
        this.setState({
          employeeList: data,
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

  handleEmployeePhotoSuccess = (filename) => {
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then((url) => this.setState({ photo: url }));
  };

  handleAdharPhotoSuccess = (filename) => {
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then((url) => this.setState({ employee_adharcard: url }));
  };

  handleSubmit = async (event) => {
    var sessionId = sessionStorage.getItem("RoleId");
    var username = sessionStorage.getItem("username");
    var businessId = sessionStorage.getItem("businessId");
    event.preventDefault();
    const { email_id, password } = this.state;
    if (this.validator.allValid() && this.state.validError === true) {
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(email_id, password);
      var userID = res.user;
      var user = firebase.auth().currentUser;
      console.log(user);
      var key = Math.round(new Date().getTime() / 1000);
      let dbRef = db.collection("/merchant_users").doc(userID.uid).set({
        employee_unique_id: key,

        employee_name: this.state.employee_name,
        user_name: this.state.user_name,
        password: this.state.password,
        employee_position: this.state.employee_position,
        employee_division: this.state.employee_division,
        employee_employement_type: this.state.employee_employement_type,
        email_id: this.state.email_id,
        contact_number: this.state.contact_number,
        photo: this.state.photo,
        employee_special_password: this.state.employee_special_password,

        employee_dateofbirth: this.state.employee_dateofbirth,
        employee_bloodgroup: this.state.employee_bloodgroup,
        employee_address: this.state.employee_address,
        employee_emergency_contact_number: this.state
          .employee_emergency_contact_number,
        employee_adharcard: this.state.employee_adharcard,

        employee_account_number: this.state.employee_account_number,
        employee_ifsc_code: this.state.employee_ifsc_code,
        employee_upi_id: this.state.employee_upi_id,

        sessionId: sessionId,
        username: username,
        businessId: businessId,
        role: "Employee",
        created_on: this.state.created_on,
        viewcustomersdetails: this.state.viewcustomersdetails,

        deleteeditcustomers: this.state.deleteeditcustomers,
        chatwithcustomers: this.state.chatwithcustomers,
        addemployees: this.state.addemployees,
        vieweditdeleteemployees: this.state.vieweditdeleteemployees,

        categories: this.state.categories,
        items: this.state.items,

        addtables: this.state.addtables,
        editdeletetables: this.state.editdeletetables,
        addfloors: this.state.addfloors,
        editdeletefloors: this.state.editdeletefloors,

        settings: this.state.settings,
        viewbill: this.state.viewbill,
        settle: this.state.settle,
        additemdiscount: this.state.additemdiscount,
        deleteitemafterkot: this.state.deleteitemafterkot,
      });
      this.setState(initState);
      if (userID !== null) {
        userID.sendEmailVerification();
      }
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };
  // here is the code,when we add the email id ,if that email id is already exist then this function takes action and replies the message ,email id already exist

  employeemailChange = async (e) => {
    var businessId = sessionStorage.getItem("businessId");
    this.setState({
      email_id: e.target.value,
    });
    if (this.state.validError != true) {
      var ref = await db
        .collection("merchant_users")

        .where("businessId", "==", businessId)
        .where("email_id", "==", e.target.value)

        .get()
        .then((snapshot) => {
          var user_exist = snapshot.size;
          console.log(user_exist);

          if (user_exist > 0 && this.state.validError != true) {
            this.setState({
              email_message: "Email already exist",
              validError: false,
            });
          } else {
            this.setState({ email_message: "", validError: true });
          }
        });
    }
  };
  // here is the code,when we add the phone number ,if that phone number is already exist then this function takes action and replies the message ,phone number already exist

  employeemobileChange = async (e) => {
    var businessId = sessionStorage.getItem("businessId");
    this.setState({
      contact_number: e.target.value,
    });
    if (this.state.validError != true) {
      var ref = await db
        .collection("merchant_users")

        .where("businessId", "==", businessId)
        .where("contact_number", "==", e.target.value)

        .get()
        .then((snapshot) => {
          var user_exist = snapshot.size;
          console.log(user_exist);

          if (user_exist > 0 && this.state.validError != true) {
            this.setState({
              mobile_message: "Number already exist",
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
        db.collection("/merchant_users").doc(id).delete();
      } else {
      }
    });
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  // this is for editing the employee  details
  editEmployee = (id) => {
    this.setState({ editEmployee: true });
    var employee;
    for (var i = 0; i < this.state.employeeList.length; i++) {
      if (this.state.employeeList[i].employeeId === id) {
        employee = this.state.employeeList[i];
        break;
      }
    }
    console.log(employee);
    this.setState({
      employeeId: id,

      employee_unique_id: employee.employee_unique_id,
      created_on: employee.created_on,

      employee_name: employee.employee_name,
      user_name: employee.user_name,
      password: employee.password,
      employee_position: employee.employee_position,
      employee_division: employee.employee_division,
      employee_employement_type: employee.employee_employement_type,
      email_id: employee.email_id,
      contact_number: employee.contact_number,
      photo: employee.photo,
      employee_special_password: employee.employee_special_password,

      employee_dateofbirth: employee.employee_dateofbirth,
      employee_bloodgroup: employee.employee_bloodgroup,
      employee_address: employee.employee_address,
      employee_emergency_contact_number:
        employee.employee_emergency_contact_number,
      employee_adharcard: employee.employee_adharcard,

      employee_account_number: employee.employee_account_number,
      employee_ifsc_code: employee.employee_ifsc_code,
      employee_upi_id: employee.employee_upi_id,

      viewcustomersdetails: employee.viewcustomersdetails,
      deleteeditcustomers: employee.deleteeditcustomers,
      chatwithcustomers: employee.chatwithcustomers,
      addemployees: employee.addemployees,
      vieweditdeleteemployees: employee.vieweditdeleteemployees,

      categories: employee.categories,
      items: employee.items,

      addtables: employee.addtables,
      editdeletetables: employee.editdeletetables,
      addfloors: employee.addfloors,
      editdeletefloors: employee.editdeletefloors,

      settings: employee.settings,
      viewbill: employee.viewbill,
      settle: employee.settle,
      additemdiscount: employee.additemdiscount,
      deleteitemafterkot: employee.deleteitemafterkot,
    });
  };
  // this functionality is for updating the edited data
  onEditSubmit = async (e) => {
    var sessionId = sessionStorage.getItem("RoleId");
    var username = sessionStorage.getItem("username");
    var businessId = sessionStorage.getItem("businessId");
    e.preventDefault();

    await db.collection("merchant_users").doc(this.state.employeeId).update({
      created_on: this.state.created_on,

      employee_name: this.state.employee_name,
      user_name: this.state.user_name,
      password: this.state.password,
      employee_position: this.state.employee_position,
      employee_division: this.state.employee_division,
      employee_employement_type: this.state.employee_employement_type,
      email_id: this.state.email_id,
      contact_number: this.state.contact_number,
      photo: this.state.photo,
      employee_special_password: this.state.employee_special_password,

      employee_dateofbirth: this.state.employee_dateofbirth,
      employee_bloodgroup: this.state.employee_bloodgroup,
      employee_address: this.state.employee_address,
      employee_emergency_contact_number: this.state
        .employee_emergency_contact_number,
      employee_adharcard: this.state.employee_adharcard,

      employee_account_number: this.state.employee_account_number,
      employee_ifsc_code: this.state.employee_ifsc_code,
      employee_upi_id: this.state.employee_upi_id,

      sessionId: sessionId,
      username: username,
      businessId: businessId,

      viewcustomersdetails: this.state.viewcustomersdetails,

      deleteeditcustomers: this.state.deleteeditcustomers,
      chatwithcustomers: this.state.chatwithcustomers,
      addemployees: this.state.addemployees,
      vieweditdeleteemployees: this.state.vieweditdeleteemployees,

      categories: this.state.categories,
      items: this.state.items,

      addtables: this.state.addtables,
      editdeletetables: this.state.editdeletetables,
      addfloors: this.state.addfloors,
      editdeletefloors: this.state.editdeletefloors,
      settings: this.state.settings,
      viewbill: this.state.viewbill,
      settle: this.state.settle,

      additemdiscount: this.state.additemdiscount,
      deleteitemafterkot: this.state.deleteitemafterkot,
    });
    this.setState({
      editEmployee: false,
      employeeId: "",
      employee_name: "",
      user_name: "",
      password: "",
      employee_position: "",
      employee_division: "",
      employee_employement_type: "",
      email_id: "",
      contact_number: "",
      photo: "",
      employee_special_password: "",

      employee_dateofbirth: "",
      employee_bloodgroup: "",
      employee_address: "",
      employee_emergency_contact_number: "",
      employee_adharcard: "",

      employee_account_number: "",
      employee_ifsc_code: "",
      employee_upi_id: "",

      sessionId: sessionId,
      username: username,
      businessId: businessId,

      viewcustomersdetails: "",

      deleteeditcustomers: "",
      chatwithcustomers: "",
      addemployees: "",
      vieweditdeleteemployees: "",

      categories: "",
      items: "",

      addtables: "",
      editdeletetables: "",
      addfloors: "",
      editdeletefloors: "",
      settings: "",
      viewbill: "",
      settle: "",

      additemdiscount: "",
      deleteitemafterkot: "",
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
      this.state.employeeList &&
      this.state.employeeList
        .slice(offset, offset + PER_PAGE)
        .map((employee, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{employee.employee_name}</td>
              <td>{employee.employee_position}</td>
              <td>{employee.employee_division}</td>
              <td>{employee.employee_employement_type}</td>
              <td>{employee.contact_number}</td>
              <td>{employee.email_id}</td>
              <td>
                <img src={employee.photo} className="user_profile" />
              </td>
              {sessionStorage.getItem("role") == "Merchant" ||
              sessionStorage.getItem("vieweditdeleteemployees") == "Yes" ? (
                <td>
                  <img
                    src="/images/icon/edit_icon_blue.svg"
                    className="edit_delete"
                    onClick={() => {
                      this.editEmployee(employee.employeeId);
                    }}
                  />

                  <img
                    src="/images/icon/delete_cross.svg"
                    onClick={this.deleteItem.bind(this, employee.employeeId)}
                    className="edit_delete"
                  />
                </td>
              ) : (
                ""
              )}
            </tr>
          );
        });

    const pageCount = Math.ceil(
      this.state.employeeList && this.state.employeeList.length / PER_PAGE
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
                        {sessionStorage.getItem("role") == "Merchant" ||
                        sessionStorage.getItem("addemployees") == "Yes" ? (
                          <div className="order_btns">
                            <span
                              className="btn add_ord m-l-0 p_btn"
                              onClick={() => {
                                this.setState({ addEmployee: true });
                              }}
                            >
                              <img src="/images/icon/add_plus_icon_w.svg" />
                              Add Employees
                            </span>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row mt-30">
                    <div className="col-md-12 p-0">
                      <div className="orders_menu">
                        <ul>
                          <li>
                            <a href="/AllEmployees" className="activemenu">
                              Employees
                            </a>
                          </li>

                          <li>
                            <a href="/AllEmployeePositions">Positions</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-30">
                    <div className="col-md-12 p-0 employes_table">
                      <div className="table-responsive table-data">
                        <table className="table">
                          <thead>
                            <tr>
                              <td>S.no</td>
                              <td>Employee Name</td>
                              <td>Position</td>
                              <td>Division</td>
                              <td>Employment Type</td>
                              <td>Mobile</td>
                              <td>Email</td>
                              <td>Photo</td>
                              {sessionStorage.getItem("role") == "Merchant" ||
                              sessionStorage.getItem(
                                "vieweditdeleteemployees"
                              ) == "Yes" ? (
                                <td>Actions</td>
                              ) : (
                                ""
                              )}
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
          show={this.state.addEmployee}
          onHide={() => {
            this.setState({ addEmployee: false });
          }}
        >
          <div className="modal-dialog modal-sm hipal_pop" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="smallmodalLabel">
                  Add Employee
                </h5>
              </div>
              <Form onSubmit={this.handleSubmit}>
                {" "}
                {this.state.employer_sevice_message}
                <div className="modal-body product_edit">
                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">
                          Employee Name
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          name="employee_name"
                          value={this.state.employee_name}
                          onChange={this.onChange}
                          placeholder=""
                          className="form-control edit_product"
                        />
                        {this.validator.message(
                          "Name",
                          this.state.employee_name,
                          "required|whitespace|min:2|max:70"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">Username</label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          name="user_name"
                          value={this.state.user_name}
                          onChange={this.onChange}
                          placeholder=""
                          className="form-control edit_product"
                        />
                        {this.validator.message(
                          "UserName",
                          this.state.user_name,
                          "required|whitespace|min:2|max:70"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">Password</label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="password"
                          name="password"
                          value={this.state.password}
                          onChange={this.onChange}
                          placeholder=""
                          className="form-control edit_product"
                        />
                        {this.validator.message(
                          "Password",
                          this.state.password,
                          "required|passwordvalid|min:6|max:30"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">Position</label>
                      </div>
                      <div className="col-12 col-md-6">
                        <select
                          className="form-control edit_product"
                          name="employee_position"
                          onChange={this.onChange}
                        >
                          <option>Select Position</option>
                          {this.state.employeePositionsList &&
                            this.state.employeePositionsList.map(
                              (data, index) => {
                                return (
                                  <option
                                    value={data.employee_position}
                                    key={index}
                                  >
                                    {data.employee_position}
                                  </option>
                                );
                              }
                            )}
                        </select>
                        {this.validator.message(
                          "Position",
                          this.state.employee_position,
                          "required"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">Division</label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          name="employee_division"
                          value={this.state.employee_division}
                          onChange={this.onChange}
                          placeholder=""
                          className="form-control edit_product"
                        />
                        {this.validator.message(
                          "Division",
                          this.state.employee_division,
                          "required|whitespace|min:2|max:70"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">
                          Employment Type
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          name="employee_employement_type"
                          value={this.state.employee_employement_type}
                          onChange={this.onChange}
                          placeholder=""
                          className="form-control edit_product"
                        />
                        {this.validator.message(
                          "Employment Type",
                          this.state.employee_employement_type,
                          "required|whitespace|min:2|max:70"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">
                          Email Address
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          name="email_id"
                          value={this.state.email_id}
                          onChange={this.employeemailChange}
                          placeholder=""
                          className="form-control edit_product"
                        />
                        {this.validator.message(
                          "Email ",
                          this.state.email_id,
                          "required|email|min:6|max:70"
                        )}
                        <div className="text-danger">
                          {" "}
                          {this.state.employer_sevice_message}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">
                          Mobile Number
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="number"
                          name="contact_number"
                          value={this.state.contact_number}
                          onChange={this.employeemobileChange}
                          placeholder=""
                          className="form-control edit_product"
                        />
                        {this.validator.message(
                          "Mobile Number",
                          this.state.contact_number,
                          "required|whitespace|min:10|max:10"
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
                        <label className=" form-control-label">Photo</label>
                      </div>
                      <div className="col-12 col-md-6">
                        {this.state.photo && (
                          <img
                            src={this.state.photo}
                            width="50%"
                            height="50%"
                          />
                        )}
                        <FileUploader
                          accept="image/*"
                          name="photo"
                          randomizeFilename
                          storageRef={firebase.storage().ref("images")}
                          onUploadStart={this.handleFrontImageUploadStart}
                          onUploadError={this.handleUploadError}
                          onUploadSuccess={this.handleEmployeePhotoSuccess}
                          onProgress={this.handleProgress}
                        />

                        {this.validator.message(
                          " Photo",
                          this.state.photo,
                          "required"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">
                          Special Password
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="password"
                          name="employee_special_password"
                          value={this.state.employee_special_password}
                          onChange={this.onChange}
                          placeholder=""
                          className="form-control edit_product"
                        />
                        {this.validator.message(
                          "Special Password",
                          this.state.employee_special_password,
                          "required|passwordvalid|min:6|max:30"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <h2 className="bdrbtm">Personal</h2>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">D.O.B</label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="date"
                          name="employee_dateofbirth"
                          value={this.state.employee_dateofbirth}
                          onChange={this.onChange}
                          placeholder=""
                          className="form-control edit_product"
                        />
                        {this.validator.message(
                          "Date Of Birth",
                          this.state.employee_dateofbirth,
                          "required"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">
                          Blood group
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
                        <select
                          name="employee_bloodgroup"
                          value={this.state.employee_bloodgroup}
                          onChange={this.onChange}
                          id="select"
                          className="form-control edit_product"
                        >
                          <option value="Select">Select Blood Group</option>
                          <option value="A Positive">A Positive</option>
                          <option value="B Positive">B Positive</option>
                          <option value="O Positive">O Positive</option>
                          <option value="A Negative">A Negative</option>
                          <option value="B Negative">B Negative</option>
                          <option value="O Negative">O Negative</option>
                          <option value="AB Negative">AB Negative</option>
                          <option value="AB Positive">AB Positive</option>
                        </select>
                        {this.validator.message(
                          "Blood Group",
                          this.state.employee_bloodgroup,
                          "required"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">Address </label>
                      </div>
                      <div className="col-12 col-md-6">
                        <textarea
                          name="employee_address"
                          value={this.state.employee_address}
                          onChange={this.onChange}
                          id="textarea-input"
                          rows="3"
                          placeholder=""
                          className="form-control edit_product"
                        ></textarea>
                        {this.validator.message(
                          "Employee Address",
                          this.state.employee_address,
                          "required|whitespace|min:2|max:70"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">
                          Emergency contact{" "}
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          name="employee_emergency_contact_number"
                          value={this.state.employee_emergency_contact_number}
                          onChange={this.onChange}
                          placeholder=""
                          className="form-control edit_product"
                        />
                        {this.validator.message(
                          "Emergency Contact Number",
                          this.state.employee_emergency_contact_number,
                          "required|whitespace|min:10|max:10"
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
                        <label className=" form-control-label">
                          Adhar card{" "}
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
                        {this.state.employee_adharcard && (
                          <img
                            src={this.state.employee_adharcard}
                            width="50%"
                            height="50%"
                          />
                        )}
                        <FileUploader
                          accept="image/*"
                          name="employee_adharcard"
                          randomizeFilename
                          storageRef={firebase.storage().ref("images")}
                          onUploadStart={this.handleFrontImageUploadStart}
                          onUploadError={this.handleUploadError}
                          onUploadSuccess={this.handleAdharPhotoSuccess}
                          onProgress={this.handleProgress}
                        />

                        {this.validator.message(
                          " AdharCard Photo",
                          this.state.employee_adharcard,
                          "required"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <h2 className="bdrbtm">Banking </h2>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">
                          ACC NUMBER
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          name="employee_account_number"
                          value={this.state.employee_account_number}
                          onChange={this.onChange}
                          placeholder=""
                          className="form-control edit_product"
                        />
                        {this.validator.message(
                          "Account Number",
                          this.state.employee_account_number,
                          "required|whitespace|min:10|max:16"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">
                          IFSC CODE{" "}
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          name="employee_ifsc_code"
                          value={this.state.employee_ifsc_code}
                          onChange={this.onChange}
                          placeholder=""
                          className="form-control edit_product"
                        />
                        {this.validator.message(
                          "IFSC Code",
                          this.state.employee_ifsc_code,
                          "required|whitespace|min:10|max:16"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">UPI ID</label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          name="employee_upi_id"
                          value={this.state.employee_upi_id}
                          onChange={this.onChange}
                          placeholder=""
                          className="form-control edit_product"
                        />
                        {this.validator.message(
                          "UPI ID",
                          this.state.employee_upi_id,
                          "required|whitespace|min:10|max:16"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <h3>Give Permissions</h3>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group user_roles_check">
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("viewcustomersdetails") ==
                        "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>View Customers Details</label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="viewcustomersdetails"
                                value="Yes"
                                onChange={this.onChange}
                                checked={
                                  this.state.viewcustomersdetails === "Yes"
                                }
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="viewcustomersdetails"
                                value="No"
                                onChange={this.onChange}
                                checked={
                                  this.state.viewcustomersdetails === "No"
                                }
                              />
                              No
                            </label>

                            {this.validator.message(
                              "View customers Details",
                              this.state.viewcustomersdetails,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("deleteeditcustomers") == "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>Delete/Edit Customers </label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="deleteeditcustomers"
                                value="Yes"
                                onChange={this.onChange}
                                checked={
                                  this.state.deleteeditcustomers === "Yes"
                                }
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="deleteeditcustomers"
                                value="No"
                                onChange={this.onChange}
                                checked={
                                  this.state.deleteeditcustomers === "No"
                                }
                              />
                              No
                            </label>

                            {this.validator.message(
                              "Delete Edit Customers",
                              this.state.deleteeditcustomers,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("chatwithcustomers") == "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>Chat With Customers </label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="chatwithcustomers"
                                value="Yes"
                                onChange={this.onChange}
                                checked={this.state.chatwithcustomers === "Yes"}
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="chatwithcustomers"
                                value="No"
                                onChange={this.onChange}
                                checked={this.state.chatwithcustomers === "No"}
                              />
                              No
                            </label>

                            {this.validator.message(
                              "Chat With Customers",
                              this.state.chatwithcustomers,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("addemployees") == "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>Add Employees</label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="addemployees"
                                value="Yes"
                                onChange={this.onChange}
                                checked={this.state.addemployees === "Yes"}
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="addemployees"
                                value="No"
                                onChange={this.onChange}
                                checked={this.state.addemployees === "No"}
                              />
                              No
                            </label>

                            {this.validator.message(
                              "Add Employees",
                              this.state.addemployees,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("vieweditdeleteemployees") ==
                        "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>View/Edit/Delete Employees</label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="vieweditdeleteemployees"
                                value="Yes"
                                onChange={this.onChange}
                                checked={
                                  this.state.vieweditdeleteemployees === "Yes"
                                }
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="vieweditdeleteemployees"
                                value="No"
                                onChange={this.onChange}
                                checked={
                                  this.state.vieweditdeleteemployees === "No"
                                }
                              />
                              No
                            </label>

                            {this.validator.message(
                              "View/Edit/Delete Employees",
                              this.state.vieweditdeleteemployees,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("categories") == "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>Add/Edit/Delete Categories</label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="categories"
                                value="Yes"
                                onChange={this.onChange}
                                checked={this.state.categories === "Yes"}
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="categories"
                                value="No"
                                onChange={this.onChange}
                                checked={this.state.categories === "No"}
                              />
                              No
                            </label>

                            {this.validator.message(
                              "Categories",
                              this.state.categories,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("items") == "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>Add/Edit/Delete Items</label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="items"
                                value="Yes"
                                onChange={this.onChange}
                                checked={this.state.items === "Yes"}
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="items"
                                value="No"
                                onChange={this.onChange}
                                checked={this.state.items === "No"}
                              />
                              No
                            </label>

                            {this.validator.message(
                              "Items",
                              this.state.items,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("addtables") == "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>Add Tables</label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="addtables"
                                value="Yes"
                                onChange={this.onChange}
                                checked={this.state.addtables === "Yes"}
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="addtables"
                                value="No"
                                onChange={this.onChange}
                                checked={this.state.addtables === "No"}
                              />
                              No
                            </label>

                            {this.validator.message(
                              "Add Tables",
                              this.state.addtables,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("editdeletetables") == "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>Edit/Delete Tables</label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="editdeletetables"
                                value="Yes"
                                onChange={this.onChange}
                                checked={this.state.editdeletetables === "Yes"}
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="editdeletetables"
                                value="No"
                                onChange={this.onChange}
                                checked={this.state.editdeletetables === "No"}
                              />
                              No
                            </label>

                            {this.validator.message(
                              "Edit/Delete Tables",
                              this.state.editdeletetables,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("addfloors") == "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>Add Floors</label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="addfloors"
                                value="Yes"
                                onChange={this.onChange}
                                checked={this.state.addfloors === "Yes"}
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="addfloors"
                                value="No"
                                onChange={this.onChange}
                                checked={this.state.addfloors === "No"}
                              />
                              No
                            </label>

                            {this.validator.message(
                              "Add Floors",
                              this.state.addfloors,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("editdeletefloors") == "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>Edit/Delete Floors</label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="editdeletefloors"
                                value="Yes"
                                onChange={this.onChange}
                                checked={this.state.editdeletefloors === "Yes"}
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="editdeletefloors"
                                value="No"
                                onChange={this.onChange}
                                checked={this.state.editdeletefloors === "No"}
                              />
                              No
                            </label>

                            {this.validator.message(
                              "Edit/Delete Floors",
                              this.state.editdeletefloors,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("settings") == "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>Settings</label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="settings"
                                value="Yes"
                                onChange={this.onChange}
                                checked={this.state.settings === "Yes"}
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="settings"
                                value="No"
                                onChange={this.onChange}
                                checked={this.state.settings === "No"}
                              />
                              No
                            </label>

                            {this.validator.message(
                              "Settings",
                              this.state.settings,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("viewbill") == "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>View Bill</label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="viewbill"
                                value="Yes"
                                onChange={this.onChange}
                                checked={this.state.viewbill === "Yes"}
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="viewbill"
                                value="No"
                                onChange={this.onChange}
                                checked={this.state.viewbill === "No"}
                              />
                              No
                            </label>

                            {this.validator.message(
                              "View Bill",
                              this.state.viewbill,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("settle") == "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>Settle</label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="settle"
                                value="Yes"
                                onChange={this.onChange}
                                checked={this.state.settle === "Yes"}
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="settle"
                                value="No"
                                onChange={this.onChange}
                                checked={this.state.settle === "No"}
                              />
                              No
                            </label>

                            {this.validator.message(
                              "Settle",
                              this.state.settle,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("additemdiscount") == "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>Add Item Discount</label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="additemdiscount"
                                value="Yes"
                                onChange={this.onChange}
                                checked={this.state.additemdiscount === "Yes"}
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="additemdiscount"
                                value="No"
                                onChange={this.onChange}
                                checked={this.state.additemdiscount === "No"}
                              />
                              No
                            </label>

                            {this.validator.message(
                              "Add Item Discount",
                              this.state.additemdiscount,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("deleteitemafterkot") == "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>Delete Item After KOT</label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="deleteitemafterkot"
                                value="Yes"
                                onChange={this.onChange}
                                checked={
                                  this.state.deleteitemafterkot === "Yes"
                                }
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="deleteitemafterkot"
                                value="No"
                                onChange={this.onChange}
                                checked={this.state.deleteitemafterkot === "No"}
                              />
                              No
                            </label>

                            {this.validator.message(
                              "Delete Item After KOT",
                              this.state.deleteitemafterkot,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn close_btn"
                    onClick={() => this.setState({ addEmployee: false })}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn save_btn">
                    Save
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </Modal>{" "}
        <Modal
          show={this.state.editEmployee}
          onHide={() => this.setState({ editEmployee: false })}
        >
          <div className="modal-dialog modal-sm hipal_pop" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="smallmodalLabel">
                  Edit Employee
                </h5>
              </div>
              <Form onSubmit={this.onEditSubmit}>
                {" "}
                {this.state.employer_sevice_message}
                <div className="modal-body product_edit">
                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">
                          Employee Name
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          name="employee_name"
                          value={this.state.employee_name}
                          onChange={this.onChange}
                          placeholder=""
                          className="form-control edit_product"
                        />
                        {this.validator.message(
                          "Name",
                          this.state.employee_name,
                          "required|whitespace|min:2|max:70"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">Username</label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          name="user_name"
                          value={this.state.user_name}
                          onChange={this.onChange}
                          placeholder=""
                          className="form-control edit_product"
                        />
                        {this.validator.message(
                          "UserName",
                          this.state.user_name,
                          "required|whitespace|min:2|max:70"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">Password</label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="password"
                          name="password"
                          value={this.state.password}
                          onChange={this.onChange}
                          placeholder=""
                          className="form-control edit_product"
                        />
                        {this.validator.message(
                          "Password",
                          this.state.password,
                          "required|passwordvalid|min:6|max:30"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">Position</label>
                      </div>
                      <div className="col-12 col-md-6">
                        <select
                          className="form-control edit_product"
                          name="employee_position"
                          onChange={this.onChange}
                        >
                          <option>Select Position</option>
                          {this.state.employeePositionsList &&
                            this.state.employeePositionsList.map(
                              (data, index) => {
                                return (
                                  <option
                                    value={data.employee_position}
                                    key={index}
                                  >
                                    {data.employee_position}
                                  </option>
                                );
                              }
                            )}
                        </select>
                        {this.validator.message(
                          "Position",
                          this.state.employee_position,
                          "required"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">Division</label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          name="employee_division"
                          value={this.state.employee_division}
                          onChange={this.onChange}
                          placeholder=""
                          className="form-control edit_product"
                        />
                        {this.validator.message(
                          "Division",
                          this.state.employee_division,
                          "required|whitespace|min:2|max:70"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">
                          Employment Type
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          name="employee_employement_type"
                          value={this.state.employee_employement_type}
                          onChange={this.onChange}
                          placeholder=""
                          className="form-control edit_product"
                        />
                        {this.validator.message(
                          "Employment Type",
                          this.state.employee_employement_type,
                          "required|whitespace|min:2|max:70"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">
                          Email Address
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          name="email_id"
                          value={this.state.email_id}
                          onChange={this.employeemailChange}
                          placeholder=""
                          className="form-control edit_product"
                        />
                        {this.validator.message(
                          "Email ",
                          this.state.email_id,
                          "required|email|min:6|max:70"
                        )}
                        <div className="text-danger">
                          {" "}
                          {this.state.employer_sevice_message}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">
                          Mobile Number
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="number"
                          name="contact_number"
                          value={this.state.contact_number}
                          onChange={this.employeemobileChange}
                          placeholder=""
                          className="form-control edit_product"
                        />
                        {this.validator.message(
                          "Mobile Number",
                          this.state.contact_number,
                          "required|whitespace|min:10|max:10"
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
                        <label className=" form-control-label">Photo</label>
                      </div>
                      <div className="col-12 col-md-6">
                        {this.state.photo && (
                          <img
                            src={this.state.photo}
                            width="50%"
                            height="50%"
                          />
                        )}
                        <FileUploader
                          accept="image/*"
                          name="photo"
                          randomizeFilename
                          storageRef={firebase.storage().ref("images")}
                          onUploadStart={this.handleFrontImageUploadStart}
                          onUploadError={this.handleUploadError}
                          onUploadSuccess={this.handleEmployeePhotoSuccess}
                          onProgress={this.handleProgress}
                        />

                        {this.validator.message(
                          " Photo",
                          this.state.photo,
                          "required"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">
                          Special Password
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="password"
                          name="employee_special_password"
                          value={this.state.employee_special_password}
                          onChange={this.onChange}
                          placeholder=""
                          className="form-control edit_product"
                        />
                        {this.validator.message(
                          "Special Password",
                          this.state.employee_special_password,
                          "required|passwordvalid|min:6|max:30"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <h2 className="bdrbtm">Personal</h2>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">D.O.B</label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="date"
                          name="employee_dateofbirth"
                          value={this.state.employee_dateofbirth}
                          onChange={this.onChange}
                          placeholder=""
                          className="form-control edit_product"
                        />
                        {this.validator.message(
                          "Date Of Birth",
                          this.state.employee_dateofbirth,
                          "required"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">
                          Blood group
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
                        <select
                          name="employee_bloodgroup"
                          value={this.state.employee_bloodgroup}
                          onChange={this.onChange}
                          id="select"
                          className="form-control edit_product"
                        >
                          <option value="Select">Select Blood Group</option>
                          <option value="A Positive">A Positive</option>
                          <option value="B Positive">B Positive</option>
                          <option value="O Positive">O Positive</option>
                          <option value="A Negative">A Negative</option>
                          <option value="B Negative">B Negative</option>
                          <option value="O Negative">O Negative</option>
                          <option value="AB Negative">AB Negative</option>
                          <option value="AB Positive">AB Positive</option>
                        </select>
                        {this.validator.message(
                          "Blood Group",
                          this.state.employee_bloodgroup,
                          "required"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">Address </label>
                      </div>
                      <div className="col-12 col-md-6">
                        <textarea
                          name="employee_address"
                          value={this.state.employee_address}
                          onChange={this.onChange}
                          id="textarea-input"
                          rows="3"
                          placeholder=""
                          className="form-control edit_product"
                        ></textarea>
                        {this.validator.message(
                          "Employee Address",
                          this.state.employee_address,
                          "required|whitespace|min:2|max:70"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">
                          Emergency contact{" "}
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          name="employee_emergency_contact_number"
                          value={this.state.employee_emergency_contact_number}
                          onChange={this.onChange}
                          placeholder=""
                          className="form-control edit_product"
                        />
                        {this.validator.message(
                          "Emergency Contact Number",
                          this.state.employee_emergency_contact_number,
                          "required|whitespace|min:10|max:10"
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
                        <label className=" form-control-label">
                          Adhar card{" "}
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
                        {this.state.employee_adharcard && (
                          <img
                            src={this.state.employee_adharcard}
                            width="50%"
                            height="50%"
                          />
                        )}
                        <FileUploader
                          accept="image/*"
                          name="employee_adharcard"
                          randomizeFilename
                          storageRef={firebase.storage().ref("images")}
                          onUploadStart={this.handleFrontImageUploadStart}
                          onUploadError={this.handleUploadError}
                          onUploadSuccess={this.handleAdharPhotoSuccess}
                          onProgress={this.handleProgress}
                        />

                        {this.validator.message(
                          " AdharCard Photo",
                          this.state.employee_adharcard,
                          "required"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <h2 className="bdrbtm">Banking </h2>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">
                          ACC NUMBER
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          name="employee_account_number"
                          value={this.state.employee_account_number}
                          onChange={this.onChange}
                          placeholder=""
                          className="form-control edit_product"
                        />
                        {this.validator.message(
                          "Account Number",
                          this.state.employee_account_number,
                          "required|whitespace|min:10|max:16"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">
                          IFSC CODE{" "}
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          name="employee_ifsc_code"
                          value={this.state.employee_ifsc_code}
                          onChange={this.onChange}
                          placeholder=""
                          className="form-control edit_product"
                        />
                        {this.validator.message(
                          "IFSC Code",
                          this.state.employee_ifsc_code,
                          "required|whitespace|min:10|max:16"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">UPI ID</label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          name="employee_upi_id"
                          value={this.state.employee_upi_id}
                          onChange={this.onChange}
                          placeholder=""
                          className="form-control edit_product"
                        />
                        {this.validator.message(
                          "UPI ID",
                          this.state.employee_upi_id,
                          "required|whitespace|min:10|max:16"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <h3>Give Permissions</h3>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group user_roles_check">
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("viewcustomersdetails") ==
                        "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>View Customers Details</label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="viewcustomersdetails"
                                value="Yes"
                                onChange={this.onChange}
                                checked={
                                  this.state.viewcustomersdetails === "Yes"
                                }
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="viewcustomersdetails"
                                value="No"
                                onChange={this.onChange}
                                checked={
                                  this.state.viewcustomersdetails === "No"
                                }
                              />
                              No
                            </label>

                            {this.validator.message(
                              "View customers Details",
                              this.state.viewcustomersdetails,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("deleteeditcustomers") == "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>Delete/Edit Customers </label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="deleteeditcustomers"
                                value="Yes"
                                onChange={this.onChange}
                                checked={
                                  this.state.deleteeditcustomers === "Yes"
                                }
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="deleteeditcustomers"
                                value="No"
                                onChange={this.onChange}
                                checked={
                                  this.state.deleteeditcustomers === "No"
                                }
                              />
                              No
                            </label>

                            {this.validator.message(
                              "Delete Edit Customers",
                              this.state.deleteeditcustomers,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("chatwithcustomers") == "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>Chat With Customers </label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="chatwithcustomers"
                                value="Yes"
                                onChange={this.onChange}
                                checked={this.state.chatwithcustomers === "Yes"}
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="chatwithcustomers"
                                value="No"
                                onChange={this.onChange}
                                checked={this.state.chatwithcustomers === "No"}
                              />
                              No
                            </label>

                            {this.validator.message(
                              "Chat With Customers",
                              this.state.chatwithcustomers,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("addemployees") == "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>Add Employees</label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="addemployees"
                                value="Yes"
                                onChange={this.onChange}
                                checked={this.state.addemployees === "Yes"}
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="addemployees"
                                value="No"
                                onChange={this.onChange}
                                checked={this.state.addemployees === "No"}
                              />
                              No
                            </label>

                            {this.validator.message(
                              "Add Employees",
                              this.state.addemployees,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("vieweditdeleteemployees") ==
                        "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>View/Edit/Delete Employees</label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="vieweditdeleteemployees"
                                value="Yes"
                                onChange={this.onChange}
                                checked={
                                  this.state.vieweditdeleteemployees === "Yes"
                                }
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="vieweditdeleteemployees"
                                value="No"
                                onChange={this.onChange}
                                checked={
                                  this.state.vieweditdeleteemployees === "No"
                                }
                              />
                              No
                            </label>

                            {this.validator.message(
                              "View/Edit/Delete Employees",
                              this.state.vieweditdeleteemployees,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("categories") == "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>Add/Edit/Delete Categories</label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="categories"
                                value="Yes"
                                onChange={this.onChange}
                                checked={this.state.categories === "Yes"}
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="categories"
                                value="No"
                                onChange={this.onChange}
                                checked={this.state.categories === "No"}
                              />
                              No
                            </label>

                            {this.validator.message(
                              "Categories",
                              this.state.categories,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("items") == "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>Add/Edit/Delete Items</label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="items"
                                value="Yes"
                                onChange={this.onChange}
                                checked={this.state.items === "Yes"}
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="items"
                                value="No"
                                onChange={this.onChange}
                                checked={this.state.items === "No"}
                              />
                              No
                            </label>

                            {this.validator.message(
                              "Items",
                              this.state.items,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("addtables") == "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>Add Tables</label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="addtables"
                                value="Yes"
                                onChange={this.onChange}
                                checked={this.state.addtables === "Yes"}
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="addtables"
                                value="No"
                                onChange={this.onChange}
                                checked={this.state.addtables === "No"}
                              />
                              No
                            </label>

                            {this.validator.message(
                              "Add Tables",
                              this.state.addtables,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("editdeletetables") == "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>Edit/Delete Tables</label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="editdeletetables"
                                value="Yes"
                                onChange={this.onChange}
                                checked={this.state.editdeletetables === "Yes"}
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="editdeletetables"
                                value="No"
                                onChange={this.onChange}
                                checked={this.state.editdeletetables === "No"}
                              />
                              No
                            </label>

                            {this.validator.message(
                              "Edit/Delete Tables",
                              this.state.editdeletetables,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("addfloors") == "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>Add Floors</label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="addfloors"
                                value="Yes"
                                onChange={this.onChange}
                                checked={this.state.addfloors === "Yes"}
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="addfloors"
                                value="No"
                                onChange={this.onChange}
                                checked={this.state.addfloors === "No"}
                              />
                              No
                            </label>

                            {this.validator.message(
                              "Add Floors",
                              this.state.addfloors,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("editdeletefloors") == "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>Edit/Delete Floors</label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="editdeletefloors"
                                value="Yes"
                                onChange={this.onChange}
                                checked={this.state.editdeletefloors === "Yes"}
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="editdeletefloors"
                                value="No"
                                onChange={this.onChange}
                                checked={this.state.editdeletefloors === "No"}
                              />
                              No
                            </label>

                            {this.validator.message(
                              "Edit/Delete Floors",
                              this.state.editdeletefloors,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("settings") == "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>Settings</label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="settings"
                                value="Yes"
                                onChange={this.onChange}
                                checked={this.state.settings === "Yes"}
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="settings"
                                value="No"
                                onChange={this.onChange}
                                checked={this.state.settings === "No"}
                              />
                              No
                            </label>

                            {this.validator.message(
                              "Settings",
                              this.state.settings,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("viewbill") == "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>View Bill</label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="viewbill"
                                value="Yes"
                                onChange={this.onChange}
                                checked={this.state.viewbill === "Yes"}
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="viewbill"
                                value="No"
                                onChange={this.onChange}
                                checked={this.state.viewbill === "No"}
                              />
                              No
                            </label>

                            {this.validator.message(
                              "View Bill",
                              this.state.viewbill,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("settle") == "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>Settle</label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="settle"
                                value="Yes"
                                onChange={this.onChange}
                                checked={this.state.settle === "Yes"}
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="settle"
                                value="No"
                                onChange={this.onChange}
                                checked={this.state.settle === "No"}
                              />
                              No
                            </label>

                            {this.validator.message(
                              "Settle",
                              this.state.settle,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("additemdiscount") == "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>Add Item Discount</label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="additemdiscount"
                                value="Yes"
                                onChange={this.onChange}
                                checked={this.state.additemdiscount === "Yes"}
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="additemdiscount"
                                value="No"
                                onChange={this.onChange}
                                checked={this.state.additemdiscount === "No"}
                              />
                              No
                            </label>

                            {this.validator.message(
                              "Add Item Discount",
                              this.state.additemdiscount,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {sessionStorage.getItem("role") == "Merchant" ||
                      sessionStorage.getItem("deleteitemafterkot") == "Yes" ? (
                        <>
                          <div className="col col-md-6">
                            <label>Delete Item After KOT</label>
                          </div>
                          <div className="col col-md-6">
                            <label>
                              <input
                                type="radio"
                                name="deleteitemafterkot"
                                value="Yes"
                                onChange={this.onChange}
                                checked={
                                  this.state.deleteitemafterkot === "Yes"
                                }
                              />
                              Yes
                            </label>
                            <label style={{ paddingLeft: "20px" }}>
                              <input
                                type="radio"
                                name="deleteitemafterkot"
                                value="No"
                                onChange={this.onChange}
                                checked={this.state.deleteitemafterkot === "No"}
                              />
                              No
                            </label>

                            {this.validator.message(
                              "Delete Item After KOT",
                              this.state.deleteitemafterkot,
                              "required"
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn close_btn"
                    onClick={() => {
                      this.setState({
                        editEmployee: false,
                        employeeId: "",
                        employee_name: "",
                        user_name: "",
                        password: "",
                        employee_position: "",
                        employee_division: "",
                        employee_employement_type: "",
                        email_id: "",
                        contact_number: "",
                        photo: "",
                        employee_special_password: "",

                        employee_dateofbirth: "",
                        employee_bloodgroup: "",
                        employee_address: "",
                        employee_emergency_contact_number: "",
                        employee_adharcard: "",

                        employee_account_number: "",
                        employee_ifsc_code: "",
                        employee_upi_id: "",

                        viewcustomersdetails: "",

                        deleteeditcustomers: "",
                        chatwithcustomers: "",
                        addemployees: "",
                        vieweditdeleteemployees: "",

                        categories: "",
                        items: "",

                        addtables: "",
                        editdeletetables: "",
                        addfloors: "",
                        editdeletefloors: "",
                        settings: "",
                        viewbill: "",
                        settle: "",

                        additemdiscount: "",
                        deleteitemafterkot: "",
                      });
                    }}
                  >
                    Close
                  </button>

                  <button type="submit" className="btn save_btn">
                    Save
                  </button>
                </div>
              </Form>
            </div>
          </div>{" "}
        </Modal>
      </>
    );
  }
}

export default AllEmployees;
