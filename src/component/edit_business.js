import React from "react";
import firebase from "../config";
import BusinessSidebar from "./business_list_sidebar";
import Header from "./header";
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import { Form } from "reactstrap";
import { Link } from "react-router-dom";
import Iframe from "react-iframe";
import TimezoneSelect from "react-timezone-select";
class EditBusiness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      business_owners_name: "",
      business_name: "",
      business_legal_name: "",
      business_nick_name: "",
      business_automatic_id: "",

      business_email: "",
      business_secondary_email: "",
      business_phone_number: "",
      business_address: "",

      business_logo: "",

      business_currency: "",

      business_fssai_number: "",
      business_fssai_form: "",

      business_account_name: "",
      business_account_number: "",
      business_ifsc_code: "",

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
      timezone: {},
      created_on: new Date().toLocaleString(),

      business_gst_number: "",
      business_gst_value: 0,
      business_cgst_value: 0,
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
    this.businessList();
  }

  businessList = async () => {
    const { businessId } = this.props.match.params;
    this.setState({ loading: true });
    var ref = await firebase
      .firestore()
      .collection("/businessdetails")
      .doc(businessId)
      .get()

      .then((snapshot) => {
        var business = snapshot.data();

        this.setState({
          created_on: this.state.created_on,

          business_owners_name: business.business_owners_name,
          business_name: business.business_name,
          business_legal_name: business.business_legal_name,
          business_nick_name: business.business_nick_name,

          business_email: business.business_email,
          business_secondary_email: business.business_secondary_email,
          business_phone_number: business.business_phone_number,
          business_address: business.business_address,
          business_logo: business.business_logo,

          business_currency: business.business_currency,
          timezone: business.timezone,

          business_fssai_number: business.business_fssai_number,
          business_fssai_form: business.business_fssai_form,

          business_gst_number: business.business_gst_number,
          business_gst_value: business.business_gst_value,
          business_cgst_value: business.business_cgst_value,

          business_account_name: business.business_account_name,
          business_account_number: business.business_account_number,
          business_ifsc_code: business.business_ifsc_code,

          status: business.status,

          businessurl: this.state.businessurl,
          businessqrcode: this.state.businessqrcode,

          sessionId: business.sessionId,
          username: business.username,
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

  handleBusinessLogoSuccess = (filename) => {
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then((url) => this.setState({ business_logo: url }));
  };

  handlebusinessformSuccess = (filename) => {
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then((url) => this.setState({ business_fssai_form: url }));
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.validator.allValid()) {
      const { businessId } = this.props.match.params;
      var sessionId = sessionStorage.getItem("RoleId");
      var username = sessionStorage.getItem("username");

      await firebase
        .firestore()
        .collection("/businessdetails")
        .doc(businessId)
        .update({
          created_on: this.state.created_on,

          business_owners_name: this.state.business_owners_name,
          business_name: this.state.business_name,
          business_legal_name: this.state.business_legal_name,
          business_nick_name: this.state.business_nick_name,
          // business_automatic_id:this.state.business_automatic_id,

          business_email: this.state.business_email,
          business_secondary_email: this.state.business_secondary_email,
          business_phone_number: this.state.business_phone_number,
          business_address: this.state.business_address,

          business_logo: this.state.business_logo,

          business_currency: this.state.business_currency,
          timezone: this.state.timezone,

          business_fssai_number: this.state.business_fssai_number,
          business_fssai_form: this.state.business_fssai_form,

          business_gst_number: this.state.business_gst_number,
          business_gst_value: this.state.business_gst_value,
          business_cgst_value: this.state.business_cgst_value,

          business_account_name: this.state.business_account_name,
          business_account_number: this.state.business_account_number,
          business_ifsc_code: this.state.business_ifsc_code,

          status: this.state.status,
          businessurl: `https://hipal-9a554.web.app/${this.state.business_name}`,
          businessqrcode:
            "https://chart.googleapis.com/chart?cht=qr&chl=" +
            this.state.businessurl +
            "&chs=160x160&chld=L|0",
          sessionId: sessionId,
          username: username,
        });
      window.location.href = "/BusinessList";
      // this
      //     .props
      //     .history
      //     .push("/BusinessList");
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };
  businessNameChange = async (e) => {
    var sessionId = sessionStorage.getItem("RoleId");
    var username = sessionStorage.getItem("username");
    var businessId = sessionStorage.getItem("businessId");
    this.setState({
      business_name: e.target.value,
    });
    if (this.state.validError != true) {
      var ref = await firebase
        .firestore()
        .collection("businessdetails/")
        .where("sessionId", "==", sessionId)

        .where("business_name", "==", e.target.value)

        .get()
        .then((snapshot) => {
          var user_exist = snapshot.size;
          console.log(user_exist);

          if (user_exist > 0 && this.state.validError != true) {
            this.setState({
              mobile_message: "Business Name already exist",
              validError: false,
            });
          } else {
            this.setState({ mobile_message: "", validError: true });
          }
        });
    }
  };
  timezone = (data) => {
    this.setState({
      timezone: data,
    });
  };

  render() {
    var url = `https://hipal-9a554.web.app/${this.state.business_name}`;
    var qrcode =
      "https://chart.googleapis.com/chart?cht=qr&chl=" +
      this.state.businessurl +
      "&chs=160x160&chld=L|0";
    return (
      <div className="page-wrapper">
        <BusinessSidebar />

        <div className="page-container">
          <Header />

          <div className="main-content">
            <div className="section__content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12 p-0">
                    <div className="search_profile">
                      <div className="row">
                        <div className="col-md-8">
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

                        <div className="col-md-4 ">
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
                  <div className="col-md-12 p-0 text-right">
                    <span className="register_details_box">
                      Registration Details
                    </span>
                  </div>
                </div>

                <div className="row mt-30">
                  <div className="col-md-12 p-0">
                    <div className="category_upload_image w-100-row">
                      <h1 className="pull-left w-100-row">
                        <div className="w-50 pull-left">
                          Business Registration
                        </div>

                        <div className="w-50 pull-left">
                          {this.state.status == "Active" ? (
                            <span className="active_green font-25">
                              {this.state.status}
                            </span>
                          ) : (
                            <span className="active_red font-25">
                              {this.state.status}
                            </span>
                          )}
                          <span className="pull-right">
                            <button className="btn edit_small_button">
                              Edit
                            </button>
                          </span>
                        </div>
                      </h1>

                      <Form onSubmit={this.handleSubmit}>
                        <div className="upload_img_block add_menu w-100-row">
                          <div className="row business_reg_box">
                            <div className="col-md-6">
                              <div className="row form-group">
                                <div className="col col-md-4">
                                  <label className=" form-control-label">
                                    Owner’s name
                                  </label>
                                </div>
                                <div className="col-12 col-md-8">
                                  <input
                                    type="text"
                                    id="text-input"
                                    name="business_owners_name"
                                    value={this.state.business_owners_name}
                                    onChange={this.onChange}
                                    placeholder="Text here"
                                    className="form-control"
                                  />
                                </div>
                                {this.validator.message(
                                  "Business Owner Name",
                                  this.state.business_owners_name,
                                  "required|whitespace|min:2|max:70"
                                )}
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="row form-group">
                                <div className="col col-md-4">
                                  <label className=" form-control-label">
                                    Business Name
                                  </label>
                                </div>
                                <div className="col-12 col-md-8">
                                  <input
                                    type="text"
                                    id="text-input"
                                    name="business_name"
                                    value={this.state.business_name}
                                    onChange={this.businessNameChange}
                                    placeholder="Text here"
                                    className="form-control"
                                  />
                                </div>
                                <div className="text-danger">
                                  {" "}
                                  {this.state.mobile_message}
                                </div>
                                {this.validator.message(
                                  "Business  Name",
                                  this.state.business_name,
                                  "required|whitespace|min:2|max:70"
                                )}
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="row form-group">
                                <div className="col col-md-4">
                                  <label className=" form-control-label">
                                    Business Legal Name
                                  </label>
                                </div>
                                <div className="col-12 col-md-8">
                                  <input
                                    type="text"
                                    id="text-input"
                                    name="business_legal_name"
                                    value={this.state.business_legal_name}
                                    onChange={this.onChange}
                                    placeholder=" "
                                    className="form-control"
                                  />
                                </div>
                                {this.validator.message(
                                  "Business Legal Name",
                                  this.state.business_legal_name,
                                  "required|whitespace|min:2|max:70"
                                )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="row form-group">
                                <div className="col col-md-4">
                                  <label className=" form-control-label">
                                    Business URL
                                  </label>
                                </div>
                                <div className="col-12 col-md-8">
                                  <input
                                    type="url"
                                    id="text-input"
                                    name="businessurl"
                                    value={url}
                                    // onChange={this.onChange}
                                    placeholder=" "
                                    className="form-control"
                                  />
                                </div>
                                {/* {this.validator.message(
                                  "Business URL",
                                  this.state.businessurl,
                                  "required|url"
                                )} */}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="row form-group">
                                <div className="col col-md-4">
                                  <label className=" form-control-label">
                                    Business Qrcode
                                  </label>
                                </div>
                                <div className="col-12 col-md-8">
                                  <span className="pop_qr">
                                    <img src={qrcode} />
                                    {/* <img src="images/icon/QR_1.svg"/> */}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="row form-group">
                                <div className="col col-md-4">
                                  <label className=" form-control-label">
                                    Business Nickname
                                  </label>
                                </div>
                                <div className="col-12 col-md-8">
                                  <input
                                    type="text"
                                    id="text-input"
                                    name="business_nick_name"
                                    value={this.state.business_nick_name}
                                    onChange={this.onChange}
                                    placeholder=""
                                    className="form-control"
                                  />
                                </div>
                                {this.validator.message(
                                  "Business Nick Name",
                                  this.state.business_nick_name,
                                  "required|whitespace|min:2|max:70"
                                )}
                              </div>
                            </div>
                          </div>

                          <hr></hr>

                          <div className="row business_reg_box">
                            <div className="col-md-6">
                              <div className="row form-group">
                                <div className="col col-md-4">
                                  <label className=" form-control-label">
                                    Email address
                                  </label>
                                </div>
                                <div className="col-12 col-md-8">
                                  <input
                                    type="text"
                                    id="text-input"
                                    name="business_email"
                                    value={this.state.business_email}
                                    onChange={this.onChange}
                                    placeholder="Text here"
                                    className="form-control"
                                  />
                                </div>
                                {this.validator.message(
                                  "Business Email",
                                  this.state.business_email,
                                  "required|email|min:6|max:70"
                                )}
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="row form-group">
                                <div className="col col-md-4">
                                  <label className=" form-control-label">
                                    Secondary email
                                  </label>
                                </div>
                                <div className="col-12 col-md-8">
                                  <input
                                    type="text"
                                    id="text-input"
                                    name="business_secondary_email"
                                    value={this.state.business_secondary_email}
                                    onChange={this.onChange}
                                    placeholder=""
                                    className="form-control"
                                  />
                                </div>
                                {this.validator.message(
                                  "Business Secondary Email",
                                  this.state.business_secondary_email,
                                  "required|email|min:6|max:70"
                                )}
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="row form-group">
                                <div className="col col-md-4">
                                  <label className=" form-control-label">
                                    Phone number
                                  </label>
                                </div>
                                <div className="col-12 col-md-8">
                                  <input
                                    type="number"
                                    id="text-input"
                                    name="business_phone_number"
                                    value={this.state.business_phone_number}
                                    onChange={this.onChange}
                                    placeholder="9703371164"
                                    className="form-control"
                                  />
                                </div>
                                {this.validator.message(
                                  "Mobile Number",
                                  this.state.business_phone_number,
                                  "required|whitespace|min:10|max:10"
                                )}
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="row form-group">
                                <div className="col col-md-4">
                                  <label className=" form-control-label">
                                    Address
                                  </label>
                                </div>
                                <div className="col-12 col-md-8">
                                  <textarea
                                    value={this.state.business_address}
                                    placeholder="Enter Description"
                                    onChange={this.onChange}
                                    name="business_address"
                                    className="form-control"
                                  ></textarea>
                                </div>
                                {this.validator.message(
                                  "Address",
                                  this.state.business_address,
                                  "required|whitespace|min:10|max:500"
                                )}
                              </div>
                            </div>
                          </div>

                          <hr></hr>

                          <div className="row business_reg_box">
                            <div className="col-md-6">
                              <div className="row form-group">
                                <div className="col col-md-4">
                                  <label className=" form-control-label">
                                    Logo
                                  </label>
                                </div>
                                <div className="col-12 col-md-8">
                                  {this.state.business_logo && (
                                    <img src={this.state.business_logo} />
                                  )}
                                  <FileUploader
                                    accept="image/*"
                                    name="business_logo"
                                    randomizeFilename
                                    storageRef={firebase
                                      .storage()
                                      .ref("images")}
                                    onUploadStart={
                                      this.handleFrontImageUploadStart
                                    }
                                    onUploadError={this.handleUploadError}
                                    onUploadSuccess={
                                      this.handleBusinessLogoSuccess
                                    }
                                    onProgress={this.handleProgress}
                                  />
                                </div>
                                {this.validator.message(
                                  " logo",
                                  this.state.business_logo,
                                  "required"
                                )}
                              </div>
                            </div>
                          </div>

                          <hr></hr>

                          <div className="row business_reg_box">
                            <div className="col-md-6 p-0">
                              <div className="col-md-12">
                                <div className="row form-group">
                                  <div className="col col-md-4">
                                    <label className=" form-control-label">
                                      Currency
                                    </label>
                                  </div>
                                  <div className="col-12 col-md-8">
                                    <input
                                      type="text"
                                      id="text-input"
                                      name="business_currency"
                                      value={this.state.business_currency}
                                      onChange={this.onChange}
                                      placeholder="Text here"
                                      className="form-control"
                                    />
                                  </div>
                                  {this.validator.message(
                                    "Currency",
                                    this.state.business_currency,
                                    "required"
                                  )}
                                </div>
                              </div>

                              <div className="col-md-12">
                                <div className="row form-group">
                                  <div className="col col-md-4">
                                    <label className=" form-control-label">
                                      Time Zone
                                    </label>
                                  </div>

                                  <div className="col-12 col-md-8">
                                    <TimezoneSelect
                                      className="form-control"
                                      style={{ width: "50px" }}
                                      value={this.state.timezone}
                                      onChange={this.timezone}
                                    />
                                  </div>
                                </div>
                                {this.validator.message(
                                  "Time Zone",
                                  this.state.timezone,
                                  "required"
                                )}
                              </div>
                            </div>
                          </div>

                          <hr></hr>

                          <div className="row business_reg_box">
                            <div className="col-md-6 p-0">
                              <div className="col-md-12">
                                <div className="row form-group">
                                  <div className="col col-md-4">
                                    <label className=" form-control-label">
                                      FSSAI number
                                    </label>
                                  </div>
                                  <div className="col-12 col-md-8">
                                    <input
                                      type="text"
                                      id="text-input"
                                      name="business_fssai_number"
                                      value={this.state.business_fssai_number}
                                      onChange={this.onChange}
                                      placeholder=""
                                      className="form-control"
                                    />
                                  </div>
                                  {this.validator.message(
                                    "FSSAI Number",
                                    this.state.business_fssai_number,
                                    "required|whitespace|min:10|max:16"
                                  )}
                                </div>
                              </div>

                              <div className="col-md-12">
                                <div className="row form-group">
                                  <div className="col col-md-4">
                                    <label className=" form-control-label">
                                      FSSAI Form
                                    </label>
                                  </div>
                                  <div className="col-12 col-md-8">
                                    {/* {this.state.business_fssai_form && <img src={this.state.business_fssai_form} />} */}

                                    <Iframe
                                      url={this.state.business_fssai_form}
                                      width="50%"
                                      height="50%"
                                      id="myId"
                                      className="myClassname"
                                      display="initial"
                                      position="relative"
                                    />
                                    <FileUploader
                                      accept="file/*"
                                      name="business_fssai_form"
                                      randomizeFilename
                                      storageRef={firebase
                                        .storage()
                                        .ref("images")}
                                      onUploadStart={
                                        this.handleFrontImageUploadStart
                                      }
                                      onUploadError={this.handleUploadError}
                                      onUploadSuccess={
                                        this.handlebusinessformSuccess
                                      }
                                      onProgress={this.handleProgress}
                                    />
                                  </div>
                                  {this.validator.message(
                                    "FSSAI Form",
                                    this.state.business_fssai_form,
                                    "required"
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <hr></hr>

                          <div className="row business_reg_box">
                            <div className="col-md-6 p-0">
                              <div className="col-md-12">
                                <div className="row form-group">
                                  <div className="col col-md-4">
                                    <label className=" form-control-label">
                                      Gst Number
                                    </label>
                                  </div>
                                  <div className="col-12 col-md-8">
                                    <input
                                      type="text"
                                      id="text-input"
                                      name="business_gst_number"
                                      value={this.state.business_gst_number}
                                      onChange={this.onChange}
                                      placeholder=""
                                      className="form-control"
                                    />
                                  </div>
                                  {this.validator.message(
                                    "GST Number",
                                    this.state.business_gst_number,
                                    "required|whitespace|min:10|max:20"
                                  )}
                                </div>
                                <div className="row form-group">
                                  <div className="col col-md-4">
                                    <label className=" form-control-label">
                                      GST Value
                                    </label>
                                  </div>
                                  <div className="col-12 col-md-8">
                                    <input
                                      type="number"
                                      id="text-input"
                                      name="business_gst_value"
                                      value={this.state.business_gst_value}
                                      onChange={this.onChange}
                                      placeholder=""
                                      pattern="\d+"
                                      className="form-control"
                                    />
                                  </div>
                                  {this.validator.message(
                                    "GST Value",
                                    this.state.business_gst_value,
                                    "required"
                                  )}
                                </div>

                                <div className="row form-group">
                                  <div className="col col-md-4">
                                    <label className=" form-control-label">
                                      CGST Value
                                    </label>
                                  </div>
                                  <div className="col-12 col-md-8">
                                    <input
                                      type="number"
                                      id="text-input"
                                      name="business_cgst_value"
                                      value={this.state.business_cgst_value}
                                      onChange={this.onChange}
                                      placeholder=""
                                      pattern="\d+"
                                      className="form-control"
                                    />
                                  </div>
                                  {this.validator.message(
                                    "GST Value",
                                    this.state.business_cgst_value,
                                    "required"
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <hr></hr>

                          <div className="row business_reg_box">
                            <div className="col-md-6 p-0">
                              <div className="col-md-12">
                                <p className="font-18 m-b-20">
                                  BANKING DETAILS
                                </p>
                              </div>

                              <div className="col-md-12">
                                <div className="row form-group">
                                  <div className="col col-md-4">
                                    <label className=" form-control-label">
                                      Account Name
                                    </label>
                                  </div>
                                  <div className="col-12 col-md-8">
                                    <input
                                      type="text"
                                      id="text-input"
                                      name="business_account_name"
                                      value={this.state.business_account_name}
                                      onChange={this.onChange}
                                      placeholder=""
                                      className="form-control"
                                    />
                                  </div>
                                  {this.validator.message(
                                    "Account Name",
                                    this.state.business_account_name,
                                    "required|whitespace|min:2|max:16"
                                  )}
                                </div>
                              </div>

                              <div className="col-md-12">
                                <div className="row form-group">
                                  <div className="col col-md-4">
                                    <label className=" form-control-label">
                                      Account Number
                                    </label>
                                  </div>
                                  <div className="col-12 col-md-8">
                                    <input
                                      type="text"
                                      id="text-input"
                                      name="business_account_number"
                                      value={this.state.business_account_number}
                                      onChange={this.onChange}
                                      placeholder=""
                                      className="form-control"
                                    />
                                  </div>
                                  {this.validator.message(
                                    "Account Number",
                                    this.state.business_account_number,
                                    "required|whitespace|min:10|max:16"
                                  )}
                                </div>
                              </div>

                              <div className="col-md-12">
                                <div className="row form-group">
                                  <div className="col col-md-4">
                                    <label className=" form-control-label">
                                      IFSC CODE
                                    </label>
                                  </div>
                                  <div className="col-12 col-md-8">
                                    <input
                                      type="text"
                                      id="text-input"
                                      name="business_ifsc_code"
                                      value={this.state.business_ifsc_code}
                                      onChange={this.onChange}
                                      placeholder=""
                                      className="form-control"
                                    />
                                  </div>
                                  {this.validator.message(
                                    "IFSC Code",
                                    this.state.business_ifsc_code,
                                    "required|whitespace|min:10|max:16"
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <hr></hr>

                          <div className="row business_reg_box">
                            <div className="col-md-12 p-0 text-center">
                              <Link to="/BusinessList">
                                <button
                                  type="button"
                                  className="btn close_button"
                                >
                                  Close
                                </button>
                              </Link>
                              <button className="btn save_button" type="submit">
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditBusiness;
