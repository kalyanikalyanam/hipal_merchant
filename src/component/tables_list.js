import React from "react";
import firebase from "../config";
import { db } from "../config";
import Sidebar from "./sidebar";
import Header from "./header";
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import { Form } from "reactstrap";
import { Link } from "react-router-dom";
import Doc from "./DocService";
import PdfContainer from "./PdfContainer";
import swal from "sweetalert";
import { Modal } from "react-bootstrap";
import ReactPaginate from "react-paginate";
const PER_PAGE = 10;
class TablesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      created_on: new Date().toLocaleString(),
      table_name: "",
      table_capacity: "",
      table_floor: "",

      table_icon: "",
      table_notes: "",

      table_qrcode: "",
      status: "Vacant",
      mobile_message: "",

      show: false,
      viewTable: false,
      editTable: false,
      currentPage: 0,
    };

    this.onChange = this.onChange.bind(this);

    this.deleteItem = this.deleteItem.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.editTable = this.editTable.bind(this);
    this.viewTable = this.viewTable.bind(this);
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

    this.floorsList();
    this.tableList();
  }

  floorsList = async () => {
    var businessId = sessionStorage.getItem("businessId");

    this.setState({ loading: true });
    db.collection("floors")

      .where("businessId", "==", businessId)
      .get()
      .then((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          const GSTData = {
            floorId: childSnapShot.id,

            floor_capacity: childSnapShot.data().floor_capacity,
            floor_name: childSnapShot.data().floor_name,
            floor_notes: childSnapShot.data().floor_notes,
            businessId: childSnapShot.data().businessId,
            sessionId: childSnapShot.data().sessionId,
          };

          data.push(GSTData);
        });
        this.setState({
          floorsList: data,
          countPage: data.length,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  tableList = async () => {
    var businessId = sessionStorage.getItem("businessId");

    this.setState({ loading: true });
    db.collection("tables")
      .where("businessId", "==", businessId)
      .get()
      .then((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          data.push({ ...childSnapShot.data(), tableId: childSnapShot.id });
        });
        this.setState({
          tableList: data,
          countPage: data.length,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.unsubscribe = db
      .collection("tables")
      .where("businessId", "==", businessId)
      .onSnapshot((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          data.push({ ...childSnapShot.data(), tableId: childSnapShot.id });
        });
        this.setState({
          tableList: data,
          countPage: data.length,
          loading: false,
        });
      });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.validator.allValid()) {
      var sessionId = sessionStorage.getItem("RoleId");
      var username = sessionStorage.getItem("username");
      var businessId = sessionStorage.getItem("businessId");
      await db
        .collection("/tables")

        .add({
          created_on: this.state.created_on,

          table_name: this.state.table_name,
          table_capacity: this.state.table_capacity,
          table_floor: this.state.table_floor,

          table_icon: this.state.table_icon,
          table_notes: this.state.table_notes,

          table_qrcode:
            "https://chart.googleapis.com/chart?cht=qr&chl=" +
            this.state.table_name +
            "&chs=160x160&chld=L|0",

          sessionId: sessionId,
          username: username,
          businessId: businessId,
          bill: [],
          liveCart: [],
          order: [],
          customers: [],
          status: "Vacant",
          occupency: 0,
          currentEmployee: "",
          billId: null,
          orderId: null,
          liveCartId: null,
        });

      this.setState({
        employer_sevice_message: "Data Added",

        table_name: "",
        table_capacity: "",
        table_floor: "",

        table_icon: "",
        table_notes: "",
        show: false,
      });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  viewTable = (id) => {
    this.setState({ viewTable: true });

    var table;
    for (var i = 0; i < this.state.tableList.length; i++) {
      if (this.state.tableList[i].tableId === id) {
        table = this.state.tableList[i];
        break;
      }
    }
    this.setState({
      table_name: table.table_name,
      table_capacity: table.table_capacity,
      table_floor: table.table_floor,
      table_icon: table.table_icon,
      table_notes: table.table_notes,
      table_qrcode: table.table_qrcode,
      tableId: id,
    });
  };

  editTable = (id) => {
    this.setState({ editTable: true });
    var table;
    for (var i = 0; i < this.state.tableList.length; i++) {
      if (this.state.tableList[i].tableId === id) {
        table = this.state.tableList[i];
        break;
      }
    }
    console.log(table);
    this.setState({
      table_name: table.table_name,
      table_capacity: table.table_capacity,
      table_floor: table.table_floor,
      table_icon: table.table_icon,
      table_notes: table.table_notes,
      table_qrcode: table.table_qrcode,
      tableId: id,
    });
  };
  onEditSubmit = async (e) => {
    var sessionId = sessionStorage.getItem("RoleId");
    var username = sessionStorage.getItem("username");
    var businessId = sessionStorage.getItem("businessId");
    e.preventDefault();
    await db
      .collection("tables")
      .doc(this.state.tableId)
      .update({
        created_on: this.state.created_on,

        table_name: this.state.table_name,
        table_capacity: this.state.table_capacity,
        table_floor: this.state.table_floor,

        table_icon: this.state.table_icon,
        table_notes: this.state.table_notes,

        table_qrcode:
          "https://chart.googleapis.com/chart?cht=qr&chl=" +
          this.state.table_name +
          "&chs=160x160&chld=L|0",

        sessionId: sessionId,
        username: username,
        businessId: businessId,
      });
    this.setState({
      editTable: false,
      table_name: "",
      table_capacity: "",
      table_floor: "",

      table_icon: "",
      table_notes: "",
      tableId: "",
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

  handleTableIconSuccess = (filename) => {
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then((url) => this.setState({ table_icon: url }));
  };

  handleAdharPhotoSuccess = (filename) => {
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then((url) => this.setState({ employee_adharcard: url }));
  };

  tablenameChange = (e) => {
    var businessId = sessionStorage.getItem("businessId");
    this.setState({
      table_name: e.target.value.trim(),
    });
    if (this.state.validError != true) {
      db.collection("tables")
        .where("businessId", "==", businessId)
        .where("table_name", "==", e.target.value)

        .get()
        .then((snapshot) => {
          var user_exist = snapshot.size;

          console.log(user_exist);

          if (user_exist > 0 && this.state.validError != true) {
            this.setState({
              mobile_message: "Table Name already exist",
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
        var playersRef = db.collection("/tables").doc(id);
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

  createPdf = (html) => Doc.createPdf(html);

  render() {
    var qrcode =
      "https://chart.googleapis.com/chart?cht=qr&chl=" +
      this.state.table_name +
      "&chs=160x160&chld=L|0";
    const offset = this.state.currentPage * PER_PAGE;

    const currentPageData =
      this.state.tableList &&
      this.state.tableList
        .slice(offset, offset + PER_PAGE)
        .map((table, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>

              <td>{table.table_name}</td>
              <td>{table.table_capacity}</td>
              <td>{table.table_floor}</td>
              <td>
                <img src={table.table_icon} width="15%" />
              </td>
              <td>
                {sessionStorage.getItem("role") == "Merchant" ||
                sessionStorage.getItem("editdeletetables") == "Yes" ? (
                  <>
                    <img
                      src="images/icon/edit_icon_blue.svg"
                      className="edit_delete"
                      onClick={() => {
                        this.editTable(table.tableId);
                      }}
                    />

                    <img
                      src="images/icon/delete_cross.svg"
                      onClick={this.deleteItem.bind(this, table.tableId)}
                      className="edit_delete"
                    />
                  </>
                ) : (
                  ""
                )}
                <button
                  type="button"
                  data-toggle="modal"
                  data-target="#view_table"
                >
                  <span
                    className="btn view_order_btn_td"
                    onClick={this.viewTable.bind(this, table.tableId)}
                  >
                    View Table
                  </span>
                </button>
              </td>
            </tr>
          );
        });

    const pageCount = Math.ceil(
      this.state.tableList && this.state.tableList.length / PER_PAGE
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
                        sessionStorage.getItem("addtables") == "Yes" ? (
                          <div className="order_btns">
                            <span
                              className="btn add_ord m-l-0 p_btn"
                              onClick={() => {
                                this.setState({ show: true });
                              }}
                            >
                              <img src="/images/icon/add_plus_icon_w.svg" />
                              Add Tables
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
                            <a href="/FloorList">Floors</a>
                          </li>

                          <li>
                            <a href="/TablesList" className="activemenu">
                              Tables
                            </a>
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
                              <td>Table Number</td>
                              <td>Table Capacity</td>
                              <td>Table floor</td>
                              <td>Table Icon</td>

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
              <Form onSubmit={this.handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title" id="smallmodalLabel">
                    Add Table
                  </h5>
                </div>

                <div className="modal-body product_edit">
                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">
                          Table Name
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          id="text-input"
                          name="table_name"
                          value={this.state.table_name}
                          onChange={this.tablenameChange}
                          placeholder="T1"
                          className="form-control edit_product"
                        />
                        <div className="text-danger">
                          {" "}
                          {this.state.mobile_message}
                        </div>
                      </div>
                      {this.validator.message(
                        "Table Name",
                        this.state.table_name,
                        "required|min:2|max:70"
                      )}
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">Capacity</label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="number"
                          id="text-input"
                          name="table_capacity"
                          value={this.state.table_capacity}
                          onChange={this.onChange}
                          placeholder=""
                          className="form-control edit_product"
                        />
                      </div>
                      {this.validator.message(
                        "Table Capacity",
                        this.state.table_capacity,
                        "required"
                      )}
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">Icon</label>
                      </div>
                      <div className="col-12 col-md-6">
                        {this.state.table_icon && (
                          <img
                            src={this.state.table_icon}
                            width="50%"
                            height="50%"
                          />
                        )}
                        <FileUploader
                          accept="image/*"
                          name="table_icon"
                          randomizeFilename
                          storageRef={firebase.storage().ref("images")}
                          onUploadStart={this.handleFrontImageUploadStart}
                          onUploadError={this.handleUploadError}
                          onUploadSuccess={this.handleTableIconSuccess}
                          onProgress={this.handleProgress}
                        />
                      </div>
                      {this.validator.message(
                        "Table Capacity",
                        this.state.table_icon,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">Floor</label>
                      </div>
                      <div className="col-12 col-md-6">
                        <select
                          className="form-control edit_product"
                          name="table_floor"
                          onChange={this.onChange}
                        >
                          <option>Select Floor</option>
                          {this.state.floorsList &&
                            this.state.floorsList.map((data, index) => {
                              return (
                                <option value={data.table_floor} key={index}>
                                  {data.floor_name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                      {this.validator.message(
                        "Table Floor",
                        this.state.table_floor,
                        "required"
                      )}
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">Notes</label>
                      </div>
                      <div className="col-12 col-md-6">
                        <textarea
                          name="table_notes"
                          value={this.state.table_notes}
                          onChange={this.onChange}
                          id="textarea-input"
                          rows="3"
                          placeholder="Table on first floor with window view"
                          className="form-control edit_product"
                        ></textarea>
                      </div>
                      {this.validator.message(
                        "Table Notes",
                        this.state.table_notes,
                        "required|whitespace|min:2|max:150"
                      )}
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">QR</label>
                      </div>
                      <div className="col-12 col-md-6">
                        <span className="pop_qr">
                          <img src={qrcode} />
                          {/* <img src="images/icon/QR_1.svg"/> */}
                        </span>
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
                        show: false,
                        table_name: "",
                        table_capacity: "",
                        table_floor: "",

                        table_icon: "",
                        table_notes: "",
                        tableId: "",
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
          show={this.state.viewTable}
          onHide={() => this.setState({ viewTable: false })}
        >
          <div className="modal-dialog modal-sm hipal_pop" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="smallmodalLabel">
                  View Table
                </h5>
              </div>

              <PdfContainer createPdf={this.createPdf}>
                <div className="modal-body product_edit">
                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">
                          Table Name
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
                        Tabel {this.state.table_name}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">Capacity</label>
                      </div>
                      <div className="col-12 col-md-6">
                        {this.state.table_capacity}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">Icon</label>
                      </div>
                      <div className="col-12 col-md-6">
                        <img
                          src={this.state.table_icon}
                          className="h-50_pixel"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">Floor</label>
                      </div>
                      <div className="col-12 col-md-6">
                        {this.state.table_floor}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">Notes</label>
                      </div>
                      <div className="col-12 col-md-6">
                        {this.state.table_notes}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">QR</label>
                      </div>
                      <div className="col-12 col-md-8">
                        <span className="pop_qr">
                          <img src={this.state.table_qrcode} />
                        </span>

                        {/* <span className="pull-left m-t-30 ml-30">
<p><button className="btn add_btn_pop_orange addmode_pad qr_btn">Print</button></p>
<p><button className="btn add_btn_pop_orange addmode_pad qr_btn m-t-20">Download</button></p>

</span> */}
                      </div>
                    </div>
                  </div>
                </div>
              </PdfContainer>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn close_btn"
                  onClick={() => {
                    this.setState({
                      viewTable: false,
                      table_name: "",
                      table_capacity: "",
                      table_floor: "",

                      table_icon: "",
                      table_notes: "",
                      tableId: "",
                    });
                  }}
                >
                  Close
                </button>
                {/* <button type="button" className="btn save_btn">Create</button> */}
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          show={this.state.editTable}
          onHide={() => this.setState({ editTable: false })}
        >
          <div className="modal-dialog modal-sm hipal_pop" role="document">
            <div className="modal-content">
              <Form onSubmit={this.onEditSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title" id="smallmodalLabel">
                    Edit Table
                  </h5>
                </div>

                <div className="modal-body product_edit">
                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">
                          Table Name
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          id="text-input"
                          name="table_name"
                          value={this.state.table_name}
                          onChange={this.tablenameChange}
                          placeholder="T1"
                          className="form-control edit_product"
                        />
                        <div className="text-danger">
                          {" "}
                          {this.state.mobile_message}
                        </div>
                      </div>
                      {this.validator.message(
                        "Table Name",
                        this.state.table_name,
                        "required|whitespace|min:2|max:70"
                      )}
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">Capacity</label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="number"
                          id="text-input"
                          name="table_capacity"
                          value={this.state.table_capacity}
                          onChange={this.onChange}
                          placeholder=""
                          className="form-control edit_product"
                        />
                      </div>
                      {this.validator.message(
                        "Table Capacity",
                        this.state.table_capacity,
                        "required"
                      )}
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">Icon</label>
                      </div>
                      <div className="col-12 col-md-6">
                        {this.state.table_icon && (
                          <img
                            src={this.state.table_icon}
                            width="50%"
                            height="50%"
                          />
                        )}
                        <FileUploader
                          accept="image/*"
                          name="table_icon"
                          randomizeFilename
                          storageRef={firebase.storage().ref("images")}
                          onUploadStart={this.handleFrontImageUploadStart}
                          onUploadError={this.handleUploadError}
                          onUploadSuccess={this.handleTableIconSuccess}
                          onProgress={this.handleProgress}
                        />
                      </div>
                      {this.validator.message(
                        "Table Capacity",
                        this.state.table_icon,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">Floor</label>
                      </div>
                      <div className="col-12 col-md-6">
                        <select
                          className="form-control edit_product"
                          name="table_floor"
                          value={this.state.table_floor}
                          onChange={this.onChange}
                        >
                          {this.state.floorsList &&
                            this.state.floorsList.map((data, index) => {
                              return (
                                <option
                                  value={data.floor_name}
                                  key={index}
                                  selected={
                                    data.floor_name == this.state.floor_name
                                  }
                                >
                                  {data.floor_name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                      {this.validator.message(
                        "Table Floor",
                        this.state.table_floor,
                        "required"
                      )}
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">Notes</label>
                      </div>
                      <div className="col-12 col-md-6">
                        <textarea
                          name="table_notes"
                          value={this.state.table_notes}
                          onChange={this.onChange}
                          id="textarea-input"
                          rows="3"
                          placeholder="Table on first floor with window view"
                          className="form-control edit_product"
                        ></textarea>
                      </div>
                      {this.validator.message(
                        "Table Notes",
                        this.state.table_notes,
                        "required|whitespace|min:2|max:150"
                      )}
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">QR</label>
                      </div>
                      <div className="col-12 col-md-6">
                        <span className="pop_qr">
                          <img src={qrcode} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <Link to="/TablesList">
                    <button
                      type="button"
                      className="btn close_btn"
                      onClick={() => {
                        this.setState({
                          editTable: false,
                          table_name: "",
                          table_capacity: "",
                          table_floor: "",

                          table_icon: "",
                          table_notes: "",
                          tableId: "",
                        });
                      }}
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

export default TablesList;
