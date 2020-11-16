import React from "react";
import firebase from "../config";
import Sidebar from "./sidebar";
import Header from "./header";
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import { Form } from "reactstrap";
import { Link } from "react-router-dom";
import swal from "sweetalert";
class AllEmployees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      created_on: new Date().toLocaleString(),

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
    };

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
    this.employeePositionsList();
    this.employeeList();
  }

  employeePositionsList = async () => {
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");

    this.setState({ loading: true });
    await firebase
      .firestore()
      .collection("employee_positions")
      .where("sessionId", "==", sessionId)
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

  employeeList = async () => {
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");

    this.setState({ loading: true });
    await firebase
      .firestore()
      .collection("merchant_users")
      .where("sessionId", "==", sessionId)
      .where("businessId", "==", businessId)
      .where("role", "==", "Employee")

      .get()
      .then((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          const GSTData = {
            employeeId: childSnapShot.id,

            employee_unique_id: childSnapShot.data().employee_unique_id,
            created_on: childSnapShot.data().created_on,

            employee_name: childSnapShot.data().employee_name,
            user_name: childSnapShot.data().user_name,
            password: childSnapShot.data().password,
            employee_position: childSnapShot.data().employee_position,
            employee_division: childSnapShot.data().employee_division,
            employee_employement_type: childSnapShot.data()
              .employee_employement_type,
            email_id: childSnapShot.data().email_id,
            contact_number: childSnapShot.data().contact_number,
            photo: childSnapShot.data().photo,
            employee_special_password: childSnapShot.data()
              .employee_special_password,

            employee_dateofbirth: childSnapShot.data().employee_dateofbirth,
            employee_bloodgroup: childSnapShot.data().employee_bloodgroup,
            employee_address: childSnapShot.data().employee_address,
            employee_emergency_contact_number: childSnapShot.data()
              .employee_emergency_contact_number,
            employee_adharcard: childSnapShot.data().employee_adharcard,

            employee_account_number: childSnapShot.data()
              .employee_account_number,
            employee_ifsc_code: childSnapShot.data().employee_ifsc_code,
            employee_upi_id: childSnapShot.data().employee_upi_id,

            sessionId: childSnapShot.data().sessionId,
            businessId: childSnapShot.data().businessId,
          };

          data.push(GSTData);
        });
        this.setState({
          employeeList: data,
          countPage: data.length,
          loading: false,
        });
        this.componentDidMount();
        // console.log(itemTypeList);
      })
      .catch((err) => {
        console.log(err);
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
    event.preventDefault();
    if (this.validator.allValid() && this.state.validError === true) {
      var sessionId = sessionStorage.getItem("RoleId");
      var username = sessionStorage.getItem("username");
      var businessId = sessionStorage.getItem("businessId");
      var user = null;
      await firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.state.email_id,
          this.state.password
        )
        .then((result) => {
          var userId = result.user;
          user = firebase.auth().currentUser;
          //user.sendEmailVerification();
          var key = Math.round(new Date().getTime() / 1000);
          firebase.auth().sendPasswordResetEmail(this.state.email_id);
          let dbCon = firebase
            .firestore()
            .collection("/merchant_users")
            .doc(userId.uid)
            .set({
              employee_unique_id: key,
              created_on: this.state.created_on,

              // business_id:this.state.business_id,

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
            });

          //   let dbCon1 =await firebase
          //     .firestore()
          //     .collection("/merchant_employees")
          //     .add({
          //       employee_unique_id: key,
          //       created_on: this.state.created_on,

          //       // business_id:this.state.business_id,

          //       employee_name: this.state.employee_name,
          //       user_name: this.state.user_name,
          //       password: this.state.password,
          //       employee_position: this.state.employee_position,
          //       employee_division: this.state.employee_division,
          //       employee_employement_type: this.state.employee_employement_type,
          //       email_id: this.state.email_id,
          //       contact_number: this.state.contact_number,
          //       photo: this.state.photo,
          //       employee_special_password: this.state.employee_special_password,

          //       employee_dateofbirth: this.state.employee_dateofbirth,
          //       employee_bloodgroup: this.state.employee_bloodgroup,
          //       employee_address: this.state.employee_address,
          //       employee_emergency_contact_number: this.state
          //         .employee_emergency_contact_number,
          //       employee_adharcard: this.state.employee_adharcard,

          //       employee_account_number: this.state.employee_account_number,
          //       employee_ifsc_code: this.state.employee_ifsc_code,
          //       employee_upi_id: this.state.employee_upi_id,

          //       sessionId: sessionId,
          //       username: username,
          //       businessId: businessId,
          //       role: "Employee",
          //     });

          var user = result.user;

          if (user != null) {
            user.sendEmailVerification();
          }

          window.location.href = "/AllEmployees";
        })
        .catch((error) => {
          this.setState({ error });
          console.log(this.state.error);
          this.setState({ employer_sevice_message: this.state.error.message });
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  employeemailChange = async (e) => {
    var sessionId = sessionStorage.getItem("RoleId");
    var username = sessionStorage.getItem("username");
    var businessId = sessionStorage.getItem("businessId");
    this.setState({
      email_id: e.target.value,
    });
    if (this.state.validError != true) {
      var ref = await firebase
        .firestore()
        .collection("merchant_users")
        .where("sessionId", "==", sessionId)
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

  employeemobileChange = async (e) => {
    var sessionId = sessionStorage.getItem("RoleId");
    var username = sessionStorage.getItem("username");
    var businessId = sessionStorage.getItem("businessId");
    this.setState({
      contact_number: e.target.value,
    });
    if (this.state.validError != true) {
      var ref = await firebase

        .firestore()
        .collection("merchant_users")
        .where("sessionId", "==", sessionId)
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
        var playersRef = firebase
          .firestore()
          .collection("/merchant_users")
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
        <div className="page-wrapper">
          <Sidebar />

          {/* <!-- PAGE CONTAINER--> */}
          <div className="page-container">
            <Header />

            {/* <header className="header-desktop">
                
                <div className="logo_hipal">
                    <a href="#">
                        <img src="/images/icon/logo.svg" alt="Hipal Admin" />
                    </a>
                </div>
                
                
                Welcome Back Varun
                </header> */}
            {/* <!-- HEADER DESKTOP--> */}

            {/* <!-- MAIN CONTENT--> */}
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
                    <div className="col-md-5 p-0">
                      <div className="overview-wrap">
                        <div className="order_btns">
                          <button
                            type="button"
                            data-toggle="modal"
                            data-target="#add_employee"
                          >
                            <span className="btn add_ord m-l-0">
                              <img src="/images/icon/add_plus_icon_w.svg" />
                              ADD EMPLOYEES
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-7 p-0">
                      <div className="track_box">
                        <div className="track_ord_block">
                          <div className="track_bg">
                            <div className="track-50">
                              <form>
                                <div className="input-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Track here"
                                  />
                                </div>
                              </form>
                            </div>
                            <div className="track-50 line-tack">
                              <span>
                                <img src="/images/icon/green_order_prepare.svg" />
                              </span>
                              Order is being prepared
                            </div>
                          </div>
                        </div>
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

                          <li>
                            <a href="/AllEmplopyesRoles">User roles</a>
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
                              <td>Actions</td>
                            </tr>
                          </thead>
                          <tbody id="myTable">
                            {this.state.employeeList &&
                              this.state.employeeList.map((employee, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{index + 1}</td>

                                    <td>{employee.employee_name}</td>
                                    <td>{employee.employee_position}</td>
                                    <td>{employee.employee_division}</td>
                                    <td>
                                      {employee.employee_employement_type}
                                    </td>
                                    <td>{employee.contact_number}</td>
                                    <td>{employee.email_id}</td>
                                    <td>
                                      <img
                                        src={employee.photo}
                                        className="user_profile"
                                      />
                                    </td>

                                    <td>
                                      <Link
                                        to={`/EditEmployee/${employee.employeeId}`}
                                      >
                                        <img
                                          src="/images/icon/edit_icon_blue.svg"
                                          className="edit_delete"
                                        />
                                      </Link>
                                      <img
                                        src="/images/icon/delete_cross.svg"
                                        onClick={this.deleteItem.bind(
                                          this,
                                          employee.employeeId
                                        )}
                                        className="edit_delete"
                                      />
                                    </td>
                                  </tr>
                                );
                              })}
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

        <div
          className="modal fade"
          id="add_employee"
          tabindex="-1"
          role="dialog"
          aria-labelledby="smallmodalLabel"
          aria-hidden="true"
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
                          id="text-input"
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
                          id="text-input"
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
                          id="text-input"
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
                        {/* <select name="select" id="select" className="form-control edit_product">
<option value="0">Owner</option>
</select> */}
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
                          id="text-input"
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
                          id="text-input"
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
                          id="text-input"
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
                          id="text-input"
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

                        {/* <div className="upload_img upload_small">
 <div className="form-group">
	<div className="img_show product_img_small"><img id="img-upload"/></div>
       <div className="input-group">
            <span className="input-group-btn">
                <span className="btn btn-default btn-file">
                    Upload Image<input type="file" id="imgInp"/>
                </span>
            </span>
            <input type="text" className="form-control" readonly=""/>
        </div>
        
    </div></div> */}
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
                          id="text-input"
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
                          id="text-input"
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

                        {/* <div className="pull-left m-r-5">
<select name="select" id="select" className="form-control edit_product">
<option value="0">DD</option>
</select>
</div>


<div className="pull-left m-r-5">
<select name="select" id="select" className="form-control edit_product">
<option value="0">MM</option>
</select>
</div>

<div className="pull-left">
<select name="select" id="select" className="form-control edit_product">
<option value="0">YYYY</option>
</select>
</div> */}
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
                          id="text-input"
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

                        {/* <div className="upload_img upload_small">
 <div className="form-group">
	<div className="img_show product_img_small"><img id="img-upload"/></div>
       <div className="input-group">
            <span className="input-group-btn">
                <span className="btn btn-default btn-file">
                    Upload Image<input type="file" id="imgInp"/>
                </span>
            </span>
            <input type="text" className="form-control" readonly=""/>
        </div>
        
    </div></div> */}
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
                          id="text-input"
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
                          id="text-input"
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
                          id="text-input"
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
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn close_btn"
                    data-dismiss="modal"
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
        </div>
      </>
    );
  }
}

export default AllEmployees;
