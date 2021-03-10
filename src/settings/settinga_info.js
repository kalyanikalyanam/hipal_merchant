import React from "react";
import firebase from "../config";
import SimpleReactValidator from "simple-react-validator";
import { Form } from "reactstrap";
import { Alert } from "reactstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
class SettingsInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      easy_location_guide: "",
      average_price: "",
      help_line_number: "",
      cusine: "",
      address: "",
      theme: "snow",
    };
    this.handleChange1 = this.handleChange1.bind(this);
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
  modules = {
    toolbar: [
      [
        {
          header: [1, 2, 3, 4, 5, 6, false],
        },
      ],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        {
          list: "ordered",
        },
        {
          list: "bullet",
        },
        {
          indent: "-1",
        },
        {
          indent: "+1",
        },
      ],
      ["link", "image"],
      ["clean"],
      [
        {
          color: [],
        },
        {
          background: [],
        },
      ],
    ],
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "background",
  ];

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
        .collection("settings_info")
        .doc(businessId)
        .get();
      if (ref.exists) {
        await firebase
          .firestore()
          .collection("/settings_info")
          .doc(businessId)
          .get()
          .then((snapshot) => {
            var info = snapshot.data();

            console.log(info);
            this.setState({
              easy_location_guide: info.easy_location_guide,
              average_price: info.average_price,
              help_line_number: info.help_line_number,
              address: info.address,
              cusine: info.cusine,
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
        .collection("/settings_info")
        .doc(businessId)

        .set({
          easy_location_guide: this.state.easy_location_guide,
          average_price: this.state.average_price,
          help_line_number: this.state.help_line_number,

          cusine: this.state.cusine,
          address: this.state.address,

          sessionId: sessionId,
          username: username,
          businessId: businessId,
        });
      this.setState({
        employer_sevice_message: (
          <Alert color="success">Info has been updated ...!</Alert>
        ),
      });
      window.location.href = "/Settings";

      // this
      //     .props
      //     .history
      //     .push("/AllCustomers");
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };
  handleChange1 = (value) => {
    this.setState({ address: value });
  };
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const divStyle = {
      height: "50px",
    };
    return (
      <>
        <div className="text-danger"> {this.state.employer_sevice_message}</div>
        <Form onSubmit={this.handleSubmit}>
          <div className="row business_reg_box">
            <div className="col-md-12">
              <h3>Info</h3>
            </div>

            <div className="col-md-6">
              <div className="row form-group">
                <div className="col col-md-4">
                  <label className=" form-control-label">
                    Easy Location Guide
                  </label>
                </div>
                <div className="col-12 col-md-8">
                  <input
                    type="text"
                    id="text-input"
                    name="easy_location_guide"
                    onChange={this.onChange}
                    value={this.state.easy_location_guide}
                    placeholder="Text here"
                    className="form-control"
                  />
                </div>
                {this.validator.message(
                  "Easy Location Guide",
                  this.state.easy_location_guide,
                  "required|whitespace|min:2|max:70"
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="row form-group">
                <div className="col col-md-4">
                  <label className=" form-control-label">
                    Average Price for 2 People
                  </label>
                </div>
                <div className="col-12 col-md-8">
                  <input
                    type="number"
                    id="text-input"
                    name="average_price"
                    onChange={this.onChange}
                    value={this.state.average_price}
                    placeholder="Text here"
                    className="form-control"
                  />
                </div>
                {this.validator.message(
                  "Average price",
                  this.state.average_price,
                  "required"
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="row form-group">
                <div className="col col-md-4">
                  <label className=" form-control-label">
                    Help-Line Number
                  </label>
                </div>
                <div className="col-12 col-md-8">
                  <input
                    type="text"
                    id="text-input"
                    name="help_line_number"
                    value={this.state.help_line_number}
                    onChange={this.onChange}
                    placeholder=""
                    className="form-control"
                  />
                </div>
                {this.validator.message(
                  "Help Line Number",
                  this.state.help_line_number,
                  "required"
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="row form-group">
                <div className="col col-md-4">
                  <label className=" form-control-label">Cusine</label>
                </div>
                <div className="col-12 col-md-8">
                  <input
                    type="text"
                    id="text-input"
                    name="cusine"
                    onChange={this.onChange}
                    value={this.state.cusine}
                    placeholder=""
                    className="form-control"
                  />
                </div>
                {this.validator.message(
                  "Cusine",
                  this.state.cusine,
                  "required|whitespace|min:2|max:70"
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="row form-group">
                <div className="col col-md-4">
                  <label className=" form-control-label">Address</label>
                </div>
                <div className="col-12 col-md-8">
                  {/* <textarea
                    name="address"
                    onChange={this.onChange}
                    value={this.state.address}
                    placeholder="Enter text here"
                    className="form-control"
                  ></textarea> */}
                  <ReactQuill
                    theme={this.state.theme}
                    value={this.state.address}
                    placeholder="Enter Description"
                    onChange={this.handleChange1}
                    className="add-new-post__editor mb-1"
                    style={divStyle}
                  />
                  {this.validator.message(
                    "address",
                    this.state.address,
                    "required|whitespace|min:2|max:500"
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-12 text-right m-t-10">
              <span>
                <button className="save_small_button" type="submit">
                  Update
                </button>
              </span>
            </div>
          </div>
        </Form>
      </>
    );
  }
}

export default SettingsInfo;
