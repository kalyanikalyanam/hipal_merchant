// this is for add,edit,delete,view,list floors
import React from "react";
import firebase from "../config";
import Sidebar from "./../component/sidebar";
import Header from "./../component/header";
import { db } from "../config";
import SimpleReactValidator from "simple-react-validator";
import { Form } from "reactstrap";
import swal from "sweetalert";
import { Modal } from "react-bootstrap";
import ReactPaginate from "react-paginate";
const PER_PAGE = 10;
class FloorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      created_on: new Date().toLocaleString(),
      mobile_message: "",

      show: false,
      viewFloor: false,
      EditFloor: false,
      currentPage: 0,
    };

    this.onChange = this.onChange.bind(this);

    this.deleteItem = this.deleteItem.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.editFloor = this.editFloor.bind(this);

    this.viewFloor = this.viewFloor.bind(this);
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
          data.push({ ...childSnapShot.data(), floorId: childSnapShot.id });
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
    this.unsubscribe = db
      .collection("floors")
      .where("businessId", "==", businessId)
      .onSnapshot((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          data.push({ ...childSnapShot.data(), floorId: childSnapShot.id });
        });
        this.setState({
          floorsList: data,
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

  handleEmployeePhotoSuccess = (filename) => {
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then((url) => this.setState({ employee_photo: url }));
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
    if (this.validator.allValid()) {
      var sessionId = sessionStorage.getItem("RoleId");
      var username = sessionStorage.getItem("username");
      var businessId = sessionStorage.getItem("businessId");
      await db
        .collection("/floors")

        .add({
          created_on: this.state.created_on,

          floor_capacity: this.state.floor_capacity,
          floor_name: this.state.floor_name,
          floor_notes: this.state.floor_notes,

          sessionId: sessionId,
          username: username,
          businessId: businessId,
        });

      this.setState({
        employer_sevice_message: "Data Added",

        floor_capacity: "",
        floor_name: "",
        floor_notes: "",
        show: false,
      });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  viewFloor = (id) => {
    this.setState({ viewFloor: true });

    var floor;
    for (var i = 0; i < this.state.floorsList.length; i++) {
      if (this.state.floorsList[i].floorId === id) {
        floor = this.state.floorsList[i];
        break;
      }
    }
    this.setState({
      floor_capacity: floor.floor_capacity,
      floor_name: floor.floor_name,
      floor_notes: floor.floor_notes,
      floorId: id,
    });
  };

  editFloor = (id) => {
    this.setState({ editFloor: true });
    var floor;
    for (var i = 0; i < this.state.floorsList.length; i++) {
      if (this.state.floorsList[i].floorId === id) {
        floor = this.state.floorsList[i];
        break;
      }
    }
    console.log(floor);
    this.setState({
      floor_capacity: floor.floor_capacity,
      floor_name: floor.floor_name,
      floor_notes: floor.floor_notes,
      floorId: id,
    });
  };
  onEditSubmit = async (e) => {
    var sessionId = sessionStorage.getItem("RoleId");
    var username = sessionStorage.getItem("username");
    var businessId = sessionStorage.getItem("businessId");
    e.preventDefault();
    await db.collection("floors").doc(this.state.floorId).update({
      floor_capacity: this.state.floor_capacity,
      floor_name: this.state.floor_name,
      floor_notes: this.state.floor_notes,

      sessionId: sessionId,
      username: username,
      businessId: businessId,
    });
    this.setState({
      editFloor: false,
      floor_capacity: "",
      floor_name: "",
      floor_notes: "",
      floorId: "",
    });
  };

  floornameChange = (e) => {
    var businessId = sessionStorage.getItem("businessId");
    this.setState({
      floor_name: e.target.value,
    });
    if (this.state.validError != true) {
      db.collection("floors")
        .where("businessId", "==", businessId)
        .where("floor_name", "==", e.target.value)
        .get()
        .then((snapshot) => {
          var user_exist = snapshot.size;

          console.log(user_exist);

          if (user_exist > 0 && this.state.validError != true) {
            this.setState({
              mobile_message: "Floor Name already exist",
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
        var playersRef = db.collection("/floors").doc(id);
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
    const offset = this.state.currentPage * PER_PAGE;

    const currentPageData =
      this.state.floorsList &&
      this.state.floorsList
        .slice(offset, offset + PER_PAGE)
        .map((floor, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>

              <td>{floor.floor_name}</td>
              <td>{floor.floor_capacity}</td>
              <td>
                {sessionStorage.getItem("role") == "Merchant" ||
                sessionStorage.getItem("editdeletefloors") == "Yes" ? (
                  <>
                    <img
                      src="images/icon/edit_icon_blue.svg"
                      className="edit_delete"
                      onClick={() => {
                        this.editFloor(floor.floorId);
                      }}
                    />

                    <img
                      src="images/icon/delete_cross.svg"
                      onClick={this.deleteItem.bind(this, floor.floorId)}
                      className="edit_delete"
                    />
                  </>
                ) : (
                  ""
                )}
                <button type="button">
                  <span
                    className="btn view_order_btn_td"
                    onClick={this.viewFloor.bind(this, floor.floorId)}
                  >
                    View Floor
                  </span>
                </button>
              </td>
            </tr>
          );
        });

    const pageCount = Math.ceil(
      this.state.floorsList && this.state.floorsList.length / PER_PAGE
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
                        sessionStorage.getItem("addfloors") == "Yes" ? (
                          <div className="order_btns">
                            <span
                              className="btn add_ord m-l-0 p_btn"
                              onClick={() => {
                                this.setState({ show: true });
                              }}
                            >
                              <img src="/images/icon/add_plus_icon_w.svg" />
                              Add Floors
                            </span>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    {/* <div className="col-md-7 p-0">
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
                    </div> */}
                  </div>

                  <div className="row mt-30">
                    <div className="col-md-12 p-0">
                      <div className="orders_menu">
                        <ul>
                          <li>
                            <a href="/FloorList" className="activemenu">
                              Floors
                            </a>
                          </li>

                          <li>
                            <a href="/TablesList">Tables</a>
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
                              <td>Floor Name</td>
                              <td>Capacity</td>

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
                  Add Floor
                </h5>
              </div>

              <Form onSubmit={this.handleSubmit}>
                <div className="modal-body product_edit">
                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">
                          Floor Name
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          id="text-input"
                          name="floor_name"
                          value={this.state.floor_name}
                          onChange={this.floornameChange}
                          placeholder="First Floor"
                          className="form-control edit_product"
                        />
                        <div className="text-danger">
                          {" "}
                          {this.state.mobile_message}
                        </div>
                      </div>
                      {this.validator.message(
                        "Floor Name",
                        this.state.floor_name,
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
                          name="floor_capacity"
                          value={this.state.floor_capacity}
                          onChange={this.onChange}
                          placeholder=""
                          className="form-control edit_product"
                        />
                      </div>
                      {this.validator.message(
                        "Capacity",
                        this.state.floor_capacity,
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
                          name="floor_notes"
                          value={this.state.floor_notes}
                          onChange={this.onChange}
                          id="textarea-input"
                          rows="3"
                          placeholder="Table on first floor with window view"
                          className="form-control edit_product"
                        ></textarea>
                      </div>

                      {this.validator.message(
                        "Floor Name",
                        this.state.floor_notes,
                        "required|whitespace|min:2|max:150"
                      )}
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
                        floor_capacity: "",
                        floor_name: "",
                        floor_notes: "",
                        floorId: "",
                      })
                    }
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
        </Modal>
        <Modal
          show={this.state.viewFloor}
          onHide={() => this.setState({ viewFloor: false })}
        >
          <div className="modal-dialog modal-sm hipal_pop" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="smallmodalLabel">
                  View Floor
                </h5>
              </div>

              <div className="modal-body product_edit">
                <div className="col-12 w-100-row">
                  <div className="row form-group">
                    <div className="col col-md-4">
                      <label className=" form-control-label">Floor Name</label>
                    </div>
                    <div className="col-12 col-md-6">
                      {this.state.floor_name}
                    </div>
                  </div>
                </div>

                <div className="col-12 w-100-row">
                  <div className="row form-group">
                    <div className="col col-md-4">
                      <label className=" form-control-label">Capacity</label>
                    </div>
                    <div className="col-12 col-md-6">
                      {this.state.floor_capacity}
                    </div>
                  </div>
                </div>

                <div className="col-12 w-100-row">
                  <div className="row form-group">
                    <div className="col col-md-4">
                      <label className=" form-control-label">Notes</label>
                    </div>
                    <div className="col-12 col-md-6">
                      {this.state.floor_notes}
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn close_btn"
                  onClick={() => {
                    this.setState({
                      viewFloor: false,
                      floor_capacity: "",
                      floor_name: "",
                      floor_notes: "",
                      floorId: "",
                    });
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          show={this.state.editFloor}
          onHide={() => this.setState({ editFloor: false })}
        >
          <div className="modal-dialog modal-sm hipal_pop" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="smallmodalLabel">
                  Edit Floor
                </h5>
              </div>

              <Form onSubmit={this.onEditSubmit}>
                <div className="modal-body product_edit">
                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">
                          Floor Name
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          id="text-input"
                          name="floor_name"
                          value={this.state.floor_name}
                          onChange={this.floornameChange}
                          placeholder="First Floor"
                          className="form-control edit_product"
                        />
                        <div className="text-danger">
                          {" "}
                          {this.state.mobile_message}
                        </div>
                      </div>
                      {this.validator.message(
                        "Floor Name",
                        this.state.floor_name,
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
                          name="floor_capacity"
                          value={this.state.floor_capacity}
                          onChange={this.onChange}
                          placeholder=""
                          className="form-control edit_product"
                        />
                      </div>
                      {this.validator.message(
                        "Capacity",
                        this.state.floor_capacity,
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
                          name="floor_notes"
                          value={this.state.floor_notes}
                          onChange={this.onChange}
                          id="textarea-input"
                          rows="3"
                          placeholder="Table on first floor with window view"
                          className="form-control edit_product"
                        ></textarea>
                      </div>

                      {this.validator.message(
                        "Floor Name",
                        this.state.floor_notes,
                        "required|whitespace|min:2|max:150"
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
                        editFloor: false,
                        floor_capacity: "",
                        floor_name: "",
                        floor_notes: "",
                        floorId: "",
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
          </div>
        </Modal>
      </>
    );
  }
}

export default FloorList;
