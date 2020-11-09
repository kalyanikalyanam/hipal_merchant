import React from "react";
import firebase from "../config";
import Sidebar from "./sidebar";
import Header from "./header";
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import { Form } from "reactstrap";
import { Link } from "react-router-dom";

class EditCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      created_on: new Date().toLocaleString(),
      employer_sevice_message: "",
      email_message: "",
      mobile_message: "",

      customer_name: "",
      customer_email: "",
      customer_phonenumber: "",
      customer_notes: "",
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

    this.customerList();
  }

  customerList = async () => {
    const { customerId } = this.props.match.params;
    this.setState({ loading: true });
    var ref = await firebase
      .firestore()
      .collection("/customers")
      .doc(customerId)
      .get()
      .then((snapshot) => {
        var customer = snapshot.data();

        // console.log(categories)

        this.setState({
          // created_on:employeePosition.created_on,

          customer_name: customer.customer_name,
          customer_email: customer.customer_email,
          customer_phonenumber: customer.customer_phonenumber,
          customer_notes: customer.customer_notes,
        });
      });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.validator.allValid()) {
      const { customerId } = this.props.match.params;
      var sessionId = sessionStorage.getItem("RoleId");
      var username = sessionStorage.getItem("username");

      let dbCon = await firebase
        .firestore()
        .collection("/customers")
        .doc(customerId)

        .update({
          created_on: this.state.created_on,
          customer_name: this.state.customer_name,
          customer_email: this.state.customer_email,
          customer_phonenumber: this.state.customer_phonenumber,

          customer_notes: this.state.customer_notes,

          sessionId: sessionId,
          username: username,
        });
      window.location.href = "/AllCustomers";
      // this
      //     .props
      //     .history
      //     .push("/AllCustomers");
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  customeremailchange = (e) => {
    var sessionId = sessionStorage.getItem("RoleId");
    var username = sessionStorage.getItem("username");
    var businessId = sessionStorage.getItem("businessId");
    this.setState({
      customer_email: e.target.value,
    });
    if (this.state.validError != true) {
      var ref = firebase
        .firestore()
        .collection("customers")
        .where("sessionId", "==", sessionId)
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
    var sessionId = sessionStorage.getItem("RoleId");
    var username = sessionStorage.getItem("username");
    var businessId = sessionStorage.getItem("businessId");
    this.setState({
      customer_phonenumber: e.target.value,
    });
    if (this.state.validError != true) {
      var ref = firebase
        .firestore()
        .collection("customers")
        .where("sessionId", "==", sessionId)
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

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      // <div className="modal fade" id="add_customer" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true">
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
                    <label className=" form-control-label">Customer Name</label>
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
                    <label className=" form-control-label">Email Address</label>
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
              <Link to="/AllCustomers">
                <button
                  type="button"
                  className="btn close_btn"
                  data-dismiss="modal"
                >
                  Close{" "}
                </button>
              </Link>
              <button type="submit" className="btn save_btn">
                Save
              </button>
            </div>
            {/* <div className="modal-footer">
            <button type="submit" className="btn save_btn">Save</button>
            </div> */}
          </Form>
        </div>
      </div>
      // </div>
    );
  }
}

export default EditCustomer;
