import React from "react";
import firebase from "../config";
import Sidebar from "./sidebar";
import Header from "./header";
import SimpleReactValidator from "simple-react-validator";

class KOTTableDataHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      created_on: new Date().toLocaleString(),
      employer_sevice_message: "",
      email_message: "",
      mobile_message: "",
    };

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
  }

  render() {
    return (
      <>
        <div
          className="modal fade"
          id="view_table"
          tabindex="-1"
          role="dialog"
          aria-labelledby="smallmodalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-sm kot_table_pop" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className="col-12 w-100-row kot_head">
                  Table: 07A <span data-dismiss="modal">X</span>
                </div>

                <div className="col-12 w-100-row kot_waiter">
                  Waiter: Varun S
                </div>

                <div className="col-12 w-100-row kot_date">
                  Items <span>21/07/2021 | 12.20pm</span>
                </div>

                <div className="col-12 w-100-row bdr-top1">
                  <div className="w-10 no">
                    <span className="check-icon">
                      <i className="fa fa-check" aria-hidden="true"></i>
                    </span>
                  </div>

                  <div className="w-80 table_kotdata">
                    <h5>Pepporoni Pizza(Large)</h5>
                    <p>+ Cheese Burst</p>
                    <p>+ Mushrooms</p>
                    <p>+ Green Peppers</p>
                  </div>
                  <div className="w-10 text-right">
                    x<span className="big_font">1</span>
                  </div>
                </div>

                <div className="col-12 w-100-row bdr-top1">
                  <div className="w-10 no">
                    <span className="check-icon">
                      <i className="fa fa-check" aria-hidden="true"></i>
                    </span>
                  </div>

                  <div className="w-80 table_kotdata">
                    <h5>Pepporoni Pizza(Large)</h5>
                  </div>
                  <div className="w-10 text-right">
                    x<span className="big_font">2</span>
                  </div>
                </div>

                <div className="col-12 w-100-row bdr-top1">
                  <div className="col-12 p-0 text-center">
                    <button type="button" className="btn btn_print_kot">
                      Print
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                              <div className="company_iocn"></div>
                              <div className="company_details">
                                <p className="name">
                                  The Coffee Cup Sanikpuri{" "}
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
                                <p className="name">Krisha Kola</p>
                                <p>krishna.kola@gmail.com</p>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-30">
                    <div className="col-md-8 p-0">
                      <div className="orders_menu my_menu_link">
                        <ul>
                          <li>
                            <a href="#" className="activemenu">
                              All
                            </a>
                          </li>
                          <li>
                            <a href="#">Dine in</a>
                          </li>
                          <li>
                            <a href="#">Take away</a>
                          </li>
                          <li>
                            <a href="#">Delivery</a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="col-md-4 p-0">
                      <div className="kot_btns">
                        <span className="btns">
                          <a href="#" className="activemenu">
                            History
                          </a>
                        </span>
                        <span className="btns">
                          <a href="#">Card View</a>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="row m-t-30">
                    <div className="col-md-10 p-0">
                      <div className="indicator_restaurent">
                        <span>
                          <i
                            className="fa fa-circle dinein_color"
                            aria-hidden="true"
                          ></i>{" "}
                          Dine in
                        </span>
                        <span>
                          <i
                            className="fa fa-circle takeway_color"
                            aria-hidden="true"
                          ></i>{" "}
                          Take away
                        </span>
                        <span>
                          <i
                            className="fa fa-circle delivery_color"
                            aria-hidden="true"
                          ></i>{" "}
                          Delivery
                        </span>
                      </div>
                    </div>

                    <div className="col-md-2 p-0">
                      <span className="cate_search w-100">
                        <input type="text" placeholder="Search" />
                        <a href="#" className="search_icon">
                          <i className="fas fa-search"></i>
                        </a>
                      </span>
                    </div>
                  </div>

                  <div className="row m-t-30 m-b-30">
                    <div className="col-md-12 p-0">
                      <div className="kot-table_row head">
                        <div className="databox td1"></div>
                        <div className="databox td2">Order Type</div>
                        <div className="databox td3">Table No</div>
                        <div className="databox td4">Table status</div>
                        <div className="databox td5 big">Date & Time</div>
                        <div className="databox td6 small">Station no</div>
                        <div className="databox td7">Order ID</div>
                        <div className="databox td8">View Order</div>
                      </div>

                      <div className="kot-table_row bg-trans  p-10">
                        <span className="bg text-left">- 12/07/2021 -</span>
                      </div>

                      <div className="kot-table_row">
                        <div className="databox td1">
                          <span>
                            <i
                              className="fa fa-circle dinein_color"
                              aria-hidden="true"
                            ></i>
                          </span>
                        </div>
                        <div className="databox td2">Dine in</div>
                        <div className="databox td3">Table 7A</div>
                        <div className="databox td4">
                          <span className="served-color">Served</span>
                        </div>
                        <div className="databox td5 big">
                          12/07/2021 | 20:20pm
                        </div>
                        <div className="databox td6 small">Station 1</div>
                        <div className="databox td7">7878727542</div>
                        <div className="databox td8">
                          <span
                            className="btn view_order_btn_td padd_kot"
                            data-toggle="modal"
                            data-target="#view_table"
                          >
                            View
                          </span>
                        </div>
                      </div>

                      <div className="kot-table_row">
                        <div className="databox td1">
                          <span>
                            <i
                              className="fa fa-circle dinein_color"
                              aria-hidden="true"
                            ></i>
                          </span>
                        </div>
                        <div className="databox td2">Dine in</div>
                        <div className="databox td3">Table 7A</div>
                        <div className="databox td4">
                          <span className="served-color">Served</span>
                        </div>
                        <div className="databox td5 big">
                          12/07/2021 | 20:20pm
                        </div>
                        <div className="databox td6 small">Station 1</div>
                        <div className="databox td7">7878727542</div>
                        <div className="databox td8">
                          <span className="btn view_order_btn_td padd_kot">
                            View
                          </span>
                        </div>
                      </div>

                      <div className="kot-table_row">
                        <div className="databox td1">
                          <span>
                            <i
                              className="fa fa-circle takeway_color"
                              aria-hidden="true"
                            ></i>
                          </span>
                        </div>
                        <div className="databox td2">Take away</div>
                        <div className="databox td3">Table 7A</div>
                        <div className="databox td4">
                          <span className="served-color">Served</span>
                        </div>
                        <div className="databox td5 big">
                          12/07/2021 | 20:20pm
                        </div>
                        <div className="databox td6 small">Station 1</div>
                        <div className="databox td7">7878727542</div>
                        <div className="databox td8">
                          <span className="btn view_order_btn_td padd_kot">
                            View
                          </span>
                        </div>
                      </div>

                      <div className="kot-table_row">
                        <div className="databox td1">
                          <span>
                            <i
                              className="fa fa-circle takeway_color"
                              aria-hidden="true"
                            ></i>
                          </span>
                        </div>
                        <div className="databox td2">Take away</div>
                        <div className="databox td3">Table 7A</div>
                        <div className="databox td4">
                          <span className="served-color">Served</span>
                        </div>
                        <div className="databox td5 big">
                          12/07/2021 | 20:20pm
                        </div>
                        <div className="databox td6 small">Station 1</div>
                        <div className="databox td7">7878727542</div>
                        <div className="databox td8">
                          <span className="btn view_order_btn_td padd_kot">
                            View
                          </span>
                        </div>
                      </div>

                      <div className="kot-table_row">
                        <div className="databox td1">
                          <span>
                            <i
                              className="fa fa-circle delivery_color"
                              aria-hidden="true"
                            ></i>
                          </span>
                        </div>
                        <div className="databox td2">Delivery</div>
                        <div className="databox td3">Table 7A</div>
                        <div className="databox td4">
                          <span className="served-color">Served</span>
                        </div>
                        <div className="databox td5 big">
                          12/07/2021 | 20:20pm
                        </div>
                        <div className="databox td6 small">Station 1</div>
                        <div className="databox td7">7878727542</div>
                        <div className="databox td8">
                          <span className="btn view_order_btn_td padd_kot">
                            View
                          </span>
                        </div>
                      </div>

                      <div className="kot-table_row bg-trans  p-10">
                        <span className="bg text-left">- 13/07/2021 -</span>
                      </div>

                      <div className="kot-table_row">
                        <div className="databox td1">
                          <span>
                            <i
                              className="fa fa-circle takeway_color"
                              aria-hidden="true"
                            ></i>
                          </span>
                        </div>
                        <div className="databox td2">Take away</div>
                        <div className="databox td3">Table 7A</div>
                        <div className="databox td4">
                          <span className="served-color">Served</span>
                        </div>
                        <div className="databox td5 big">
                          12/07/2021 | 20:20pm
                        </div>
                        <div className="databox td6 small">Station 1</div>
                        <div className="databox td7">7878727542</div>
                        <div className="databox td8">
                          <span className="btn view_order_btn_td padd_kot">
                            View
                          </span>
                        </div>
                      </div>

                      <div className="kot-table_row">
                        <div className="databox td1">
                          <span>
                            <i
                              className="fa fa-circle takeway_color"
                              aria-hidden="true"
                            ></i>
                          </span>
                        </div>
                        <div className="databox td2">Take away</div>
                        <div className="databox td3">Table 7A</div>
                        <div className="databox td4">
                          <span className="served-color">Served</span>
                        </div>
                        <div className="databox td5 big">
                          12/07/2021 | 20:20pm
                        </div>
                        <div className="databox td6 small">Station 1</div>
                        <div className="databox td7">7878727542</div>
                        <div className="databox td8">
                          <span className="btn view_order_btn_td padd_kot">
                            View
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default KOTTableDataHistory;
