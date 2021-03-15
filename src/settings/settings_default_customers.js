//this is the page for setting the default customers
import React from "react";
import firebase from "../config";
import SimpleReactValidator from "simple-react-validator";
import { Form } from "reactstrap";
import { Alert } from "reactstrap";
class SettingsDefaultCustomers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employer_sevice_message: "",
      email_message: "",
      mobile_message: "",

      customer_name: "",

      customer_phonenumber: "",
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

    this.info();
  }
  info = async () => {
    this.setState({ loading: false });
    var user = null;
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");
    if (sessionId) {
      const ref = await firebase
        .firestore()
        .collection("settings_default_customers")
        .doc(businessId)
        .get();
      if (ref.exists) {
        await firebase
          .firestore()
          .collection("/settings_default_customers")
          .doc(businessId)
          .get()
          .then((snapshot) => {
            var info = snapshot.data();

            console.log(info);
            this.setState({
              customer_name: info.customer_name,
              customer_phonenumber: info.customer_phonenumber,
              businessId: info.businessId,
              sessionId: info.sessionId,
            });
          });
      } else {
      }
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.validator.allValid()) {
      var sessionId = sessionStorage.getItem("RoleId");
      var username = sessionStorage.getItem("username");
      var businessId = sessionStorage.getItem("businessId");
      var ref = await firebase
        .firestore()
        .collection("/settings_default_customers")
        .doc(businessId)
        .set({
          customer_name: this.state.customer_name,

          customer_phonenumber: this.state.customer_phonenumber,

          businessId: businessId,
          sessionId: sessionId,
          username: username,
        });
      this.setState({
        employer_sevice_message: (
          <Alert color="success">Information has been updated ...!</Alert>
        ),
      });
      window.location.href = "/Settings";
      //   this.props.history.push("/Settings");
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
  render() {
    return (
      <>
        <div className="text-danger"> {this.state.employer_sevice_message}</div>
        <Form onSubmit={this.handleSubmit}>
          <div className="row business_reg_box">
            <div className="col-md-6 p-0">
              <div className="col-md-12">
                <div className="row form-group">
                  <div className="col col-md-4">
                    <label className=" form-control-label">Customer Name</label>
                  </div>
                  <div className="col-12 col-md-8">
                    <input
                      type="text"
                      id="text-input"
                      name="customer_name"
                      value={this.state.customer_name}
                      onChange={this.onChange}
                      placeholder="Krishna Kola"
                      className="form-control"
                    />
                  </div>
                  {this.validator.message(
                    "Customer Name",
                    this.state.customer_name,
                    "required|whitespace|min:2|max:70"
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="row form-group">
                  <div className="col col-md-4">
                    <label className=" form-control-label">
                      Customer Number
                    </label>
                  </div>
                  <div className="col-12 col-md-8">
                    <input
                      type="text"
                      id="text-input"
                      name="customer_phonenumber"
                      value={this.state.customer_phonenumber}
                      onChange={this.onChange}
                      placeholder="9703371164"
                      className="form-control edit_product"
                    />
                    {this.validator.message(
                      "Mobile Number",
                      this.state.customer_phonenumber,
                      "required|whitespace|min:10|max:10"
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12 text-right m-t-10">
              <span>
                <button className="save_small_button">Update</button>
              </span>
            </div>
          </div>
        </Form>
      </>
    );
  }
}

export default SettingsDefaultCustomers;
