import React from "react";
import { db } from "../config";
import Sidebar from "./sidebar";
import Header from "./header";
import SimpleReactValidator from "simple-react-validator";
import { Form } from "reactstrap";
import swal from "sweetalert";
import { Modal } from "react-bootstrap";
import ReactPaginate from "react-paginate";
const PER_PAGE = 10;
class AllCustomers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      created_on: Date.now(),
      employer_sevice_message: "",
      email_message: "",
      mobile_message: "",

      customerId: "",
      customer_name: "",
      customer_email: "",
      customer_phonenumber: "",
      customer_notes: "",
      show: false,
      viewCustomer: false,
      editCustomer: false,
      currentPage: 0,
    };

    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.editCustomer = this.editCustomer.bind(this);
    this.onChange = this.onChange.bind(this);
    this.viewCustomer = this.viewCustomer.bind(this);
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

    this.customersList();
  }
  customersList = async () => {
    var businessId = sessionStorage.getItem("businessId");

    this.setState({ loading: true });
    db.collection("customers")
      .where("businessId", "==", businessId)
      .get()
      .then((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          data.push({ ...childSnapShot.data(), customerId: childSnapShot.id });
        });
        this.setState({
          customersList: data,
          countPage: data.length,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.unsubscribe = db
      .collection("customers")
      .where("businessId", "==", businessId)
      .onSnapshot((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          data.push({ ...childSnapShot.data(), customerId: childSnapShot.id });
        });
        this.setState({
          customersList: data,
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
        .collection("/customers")

        .add({
          created_on: this.state.created_on,
          customer_name: this.state.customer_name,
          customer_email: this.state.customer_email,
          customer_phonenumber: this.state.customer_phonenumber,
          customer_notes: this.state.customer_notes,
          sessionId: sessionId,
          username: username,
          businessId: businessId,
        });

      this.setState({
        employer_sevice_message: "Data Added",
        customer_name: "",
        customer_email: "",
        customer_phonenumber: "",
        customer_notes: "",
        show: false,
      });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  customeremailchange = (e) => {
    var businessId = sessionStorage.getItem("businessId");
    this.setState({
      customer_email: e.target.value,
    });
    if (this.state.validError != true) {
      db.collection("customers")
        .where("businessId", "==", businessId)
        .where("customer_email", "==", e.target.value)
        .get()
        .then((snapshot) => {
          var user_exist = snapshot.size;
          console.log(user_exist);

          if (user_exist > 0 && this.state.validError != true) {
            this.setState({
              email_message: "customer email id  already exist",
              validError: false,
            });
          } else {
            this.setState({ email_message: "", validError: true });
          }
        });
    }
  };

  customerphonenumberchange = (e) => {
    var businessId = sessionStorage.getItem("businessId");
    this.setState({
      customer_phonenumber: e.target.value,
    });
    if (this.state.validError != true) {
      var ref = db
        .collection("customers")
        .where("businessId", "==", businessId)
        .where("customer_phonenumber", "==", e.target.value)
        .get()
        .then((snapshot) => {
          var user_exist = snapshot.size;
          console.log(user_exist);

          if (user_exist > 0 && this.state.validError != true) {
            this.setState({
              mobile_message: "customer Phone Number already exist",
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
        var playersRef = db.collection("/customers").doc(id);
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
  viewCustomer = (id) => {
    this.setState({ viewCustomer: true });

    var customer;
    for (var i = 0; i < this.state.customersList.length; i++) {
      if (this.state.customersList[i].customerId === id) {
        customer = this.state.customersList[i];
        break;
      }
    }
    this.setState({
      customer_name: customer.customer_name,
      customer_email: customer.customer_email,
      customer_phonenumber: customer.customer_phonenumber,
      customer_notes: customer.customer_notes,
      customerId: id,
    });
  };

  editCustomer = (id) => {
    this.setState({ editCustomer: true });
    var customer;
    for (var i = 0; i < this.state.customersList.length; i++) {
      if (this.state.customersList[i].customerId === id) {
        customer = this.state.customersList[i];
        break;
      }
    }
    console.log(customer);
    this.setState({
      customer_name: customer.customer_name,
      customer_email: customer.customer_email,
      customer_phonenumber: customer.customer_phonenumber,
      customer_notes: customer.customer_notes,
      customerId: id,
    });
  };
  onEditSubmit = async (e) => {
    e.preventDefault();
    await db.collection("customers").doc(this.state.customerId).update({
      customer_name: this.state.customer_name,
      customer_email: this.state.customer_email,
      customer_phonenumber: this.state.customer_phonenumber,
      customer_notes: this.state.customer_notes,
    });
    this.setState({
      editCustomer: false,
      customer_name: "",
      customer_email: "",
      customer_phonenumber: "",
      customer_notes: "",
      customerId: "",
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
      this.state.customersList &&
      this.state.customersList
        .slice(offset, offset + PER_PAGE)
        .map((customer, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>

              <td>{customer.customer_name}</td>
              <td>{customer.customer_email}</td>
              <td>**********</td>
              <td>10+</td>
              <td>
                {sessionStorage.getItem("role") == "Merchant" ? (
                  <>
                    <img
                      src="images/icon/edit_icon_blue.svg"
                      className="edit_delete"
                      onClick={() => {
                        this.editCustomer(customer.customerId);
                      }}
                    />
                    <img
                      src="images/icon/delete_cross.svg"
                      onClick={this.deleteItem.bind(this, customer.customerId)}
                      className="edit_delete"
                    />
                    <button
                      type="button"
                      data-toggle="modal"
                      data-target="#view_customer"
                    >
                      <span
                        className="btn view_order_btn_td"
                        onClick={this.viewCustomer.bind(
                          this,
                          customer.customerId
                        )}
                      >
                        View Customer
                      </span>
                    </button>
                  </>
                ) : (
                  ""
                )}

                {sessionStorage.getItem("deleteeditcustomers") == "Yes" ? (
                  <>
                    <img
                      src="images/icon/edit_icon_blue.svg"
                      className="edit_delete"
                      onClick={() => {
                        this.editCustomer.bind(this, customer.customerId);
                      }}
                    />
                    <img
                      src="images/icon/delete_cross.svg"
                      onClick={this.deleteItem.bind(this, customer.customerId)}
                      className="edit_delete"
                    />
                  </>
                ) : (
                  ""
                )}
                {sessionStorage.getItem("viewcustomersdetails") == "Yes" ? (
                  <>
                    <button
                      type="button"
                      data-toggle="modal"
                      data-target="#view_customer"
                    >
                      <span
                        className="btn view_order_btn_td"
                        onClick={this.viewCustomer.bind(
                          this,
                          customer.customerId
                        )}
                      >
                        View Customers
                      </span>
                    </button>
                  </>
                ) : (
                  ""
                )}
              </td>
            </tr>
          );
        });

    const pageCount = Math.ceil(
      this.state.customersList && this.state.customersList.length / PER_PAGE
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
                          <div className="col-md-3"></div>
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
                            Add Customers
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-30">
                    <div className="col-md-12 p-0">
                      <div className="category_upload_image">
                        <h1>All Customers</h1>
                        <div className="upload_img_block add_menu">
                          <div className="row">
                            <div className="col-md-12 p-0 customer_table">
                              <div className="table-responsive table-data">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <td>S.no</td>
                                      <td>Customer Name</td>
                                      <td>Email Address</td>
                                      <td>Mobile</td>
                                      <td>Points </td>
                                      {sessionStorage.getItem("role") ==
                                        "Merchant" ||
                                      sessionStorage.getItem(
                                        "deleteeditcustomers"
                                      ) == "Yes" ||
                                      sessionStorage.getItem(
                                        "viewcustomersdetails"
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
                          <div className="col-md-12">
                            <div className="row">
                              <div className="col-md-6"></div>
                              <div className="col-md-6">
                                <ReactPaginate
                                  previousLabel={"Previous"}
                                  nextLabel={"Next"}
                                  pageCount={pageCount}
                                  onPageChange={this.handlePageClick.bind(this)}
                                  containerClassName={"pagination"}
                                  previousLinkClassName={"pagination__link"}
                                  nextLinkClassName={"pagination__link"}
                                  disabledClassName={
                                    "pagination__link--disabled"
                                  }
                                  activeClassName={"pagination__link--active"}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                  Add Customer
                </h5>
              </div>

              <Form onSubmit={this.handleSubmit}>
                <div className="modal-body product_edit">
                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">
                          Customer Name
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          id="text-input"
                          name="customer_name"
                          value={this.state.customer_name}
                          onChange={this.onChange}
                          placeholder="Krishna Kola"
                          className="form-control edit_product"
                        />
                      </div>
                      {this.validator.message(
                        "Customer Name",
                        this.state.customer_name,
                        "required|whitespace|min:2|max:70"
                      )}
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
                          name="customer_email"
                          value={this.state.customer_email}
                          onChange={this.onChange}
                          placeholder="krishna.kola@gmail.com"
                          className="form-control edit_product"
                        />
                        <div className="text-danger">
                          {" "}
                          {this.state.email_message}
                        </div>
                      </div>
                      {this.validator.message(
                        "Email ",
                        this.state.customer_email,
                        "required|email|min:6|max:70"
                      )}
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">Mobile</label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          id="text-input"
                          name="customer_phonenumber"
                          value={this.state.customer_phonenumber}
                          onChange={this.customerphonenumberchange}
                          placeholder="9703371164"
                          className="form-control edit_product"
                        />
                        <div className="text-danger">
                          {" "}
                          {this.state.mobile_message}
                        </div>
                      </div>
                      {this.validator.message(
                        "Mobile Number",
                        this.state.customer_phonenumber,
                        "required|whitespace|min:10|max:10"
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
                          name="customer_notes"
                          value={this.state.customer_notes}
                          onChange={this.onChange}
                          id="textarea-input"
                          rows="3"
                          placeholder="Likes take away, Yapral"
                          className="form-control edit_product"
                        ></textarea>
                      </div>
                      {this.validator.message(
                        "Notes",
                        this.state.customer_notes,
                        "required|whitespace|min:2|max:70"
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
                        customer_name: "",
                        customer_email: "",
                        customer_phonenumber: "",
                        customer_notes: "",
                      })
                    }
                  >
                    Close{" "}
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
          show={this.state.viewCustomer}
          onHide={() => this.setState({ viewCustomer: false })}
        >
          <div className="modal-dialog modal-sm hipal_pop" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="smallmodalLabel">
                  View Customer
                </h5>
              </div>

              <div className="modal-body product_edit">
                <div className="col-12 w-100-row">
                  <div className="row form-group">
                    <div className="col col-md-4">
                      <label className=" form-control-label">
                        Customer Name
                      </label>
                    </div>
                    <div className="col-12 col-md-6">
                      <input
                        value={this.state.customer_name}
                        className="form-control edit_product"
                        readOnly
                      />
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
                        value={this.state.customer_email}
                        className="form-control edit_product"
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12 w-100-row">
                  <div className="row form-group">
                    <div className="col col-md-4">
                      <label className=" form-control-label">Mobile</label>
                    </div>
                    <div className="col-12 col-md-6">
                      <input
                        value={this.state.customer_phonenumber}
                        className="form-control edit_product"
                        readOnly
                      />
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
                      <label className=" form-control-label">Notes</label>
                    </div>
                    <div className="col-12 col-md-6">
                      <textarea
                        value={this.state.customer_notes}
                        rows="3"
                        className="form-control edit_product"
                        readOnly
                      ></textarea>
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
                      viewCustomer: false,
                      customer_name: "",
                      customer_email: "",
                      customer_phonenumber: "",
                      customer_notes: "",
                      customerId: "",
                    });
                  }}
                >
                  Close{" "}
                </button>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          show={this.state.editCustomer}
          onHide={() => this.setState({ editCustomer: false })}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="smallmodalLabel">
                Edit Customer
              </h5>
            </div>

            <Form onSubmit={this.onEditSubmit}>
              <div className="modal-body product_edit">
                <div className="col-12 w-100-row">
                  <div className="row form-group">
                    <div className="col col-md-4">
                      <label className=" form-control-label">
                        Customer Name
                      </label>
                    </div>
                    <div className="col-12 col-md-6">
                      <input
                        type="text"
                        id="text-input"
                        name="customer_name"
                        value={this.state.customer_name}
                        onChange={this.onChange}
                        placeholder="Krishna Kola"
                        className="form-control edit_product"
                      />
                    </div>
                    {this.validator.message(
                      "Customer Name",
                      this.state.customer_name,
                      "required|whitespace|min:2|max:70"
                    )}
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
                        name="customer_email"
                        value={this.state.customer_email}
                        onChange={this.onChange}
                        placeholder="krishna.kola@gmail.com"
                        className="form-control edit_product"
                      />
                      <div className="text-danger">
                        {" "}
                        {this.state.email_message}
                      </div>
                    </div>
                    {this.validator.message(
                      "Email ",
                      this.state.customer_email,
                      "required|email|min:6|max:70"
                    )}
                  </div>
                </div>

                <div className="col-12 w-100-row">
                  <div className="row form-group">
                    <div className="col col-md-4">
                      <label className=" form-control-label">Mobile</label>
                    </div>
                    <div className="col-12 col-md-6">
                      <input
                        type="text"
                        id="text-input"
                        name="customer_phonenumber"
                        value={this.state.customer_phonenumber}
                        onChange={this.customerphonenumberchange}
                        placeholder="9703371164"
                        className="form-control edit_product"
                      />
                      <div className="text-danger">
                        {" "}
                        {this.state.mobile_message}
                      </div>
                    </div>
                    {this.validator.message(
                      "Mobile Number",
                      this.state.customer_phonenumber,
                      "required|whitespace|min:10|max:10"
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
                        name="customer_notes"
                        value={this.state.customer_notes}
                        onChange={this.onChange}
                        id="textarea-input"
                        rows="3"
                        placeholder="Likes take away, Yapral"
                        className="form-control edit_product"
                      ></textarea>
                    </div>
                    {this.validator.message(
                      "Notes",
                      this.state.customer_notes,
                      "required|whitespace|min:2|max:70"
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
                      editCustomer: false,
                      customer_name: "",
                      customer_email: "",
                      customer_phonenumber: "",
                      customer_notes: "",
                      customerId: "",
                    });
                  }}
                >
                  Close{" "}
                </button>
                <button type="submit" className="btn save_btn">
                  Save
                </button>
              </div>
            </Form>
          </div>
        </Modal>
      </>
    );
  }
}

export default AllCustomers;
