//dashboard
import React from "react";
import firebase, { db } from "../config";
import Sidebar from "./sidebar";
import Header from "./header";
import swal from "sweetalert";
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
  }

  render() {
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
                    <div className="col-md-12 p-0 text-right">
                      <span className="register_details_box">
                        Registration Details
                      </span>
                    </div>
                  </div>

                  <div className="row mt-30">
                    <div className="col-md-7 p-0 text-left dash_board">
                      <h4>
                        Good Afternoon <span>Varun</span>
                      </h4>
                      <p>It’s so great to see you back again.</p>
                    </div>

                    <div className="col-md-5 p-0 text-right">
                      <span className="register_details_box downlod_report">
                        Download Report
                      </span>
                    </div>
                  </div>

                  <div className="row mt-30">
                    <div className="col-md-12 p-0 text-left dash_board">
                      <h5>
                        We are <span className="open">OPen</span> , here is the
                        summary for <span className="date">23/07/2020 </span>
                      </h5>
                    </div>
                  </div>

                  <div className="row mt-30">
                    <div className="col-md-12 p-0">
                      <div className="category_upload_image w-100-row p-30">
                        <div className="row">
                          <div className="col-md-3">
                            <div className="sales_reports_data w-100-row">
                              <div className="sale_report">
                                <div className="sales_head">Total Orders</div>
                                <div className="sales_counts">
                                  <span className="number">242</span>
                                  <span className="sales_position up">
                                    <span>
                                      <i
                                        className="fa fa-caret-up"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                    (+12%)
                                  </span>
                                </div>
                              </div>

                              <div className="sale_report">
                                <div className="sales_head">New Customers</div>
                                <div className="sales_counts">
                                  <span className="number">150</span>
                                  <span className="sales_position down">
                                    <span>
                                      <i
                                        className="fa fa-caret-down"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                    (+12%)
                                  </span>
                                </div>
                              </div>

                              <div className="sale_report">
                                <div className="sales_head">
                                  Total Transactions
                                </div>
                                <div className="sales_counts">
                                  <span className="number">412</span>
                                  <span className="sales_position up">
                                    <span>
                                      <i
                                        className="fa fa-caret-up"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                    (+12%)
                                  </span>
                                </div>
                              </div>

                              <div className="sale_report">
                                <div className="sales_head">
                                  Current Balance
                                </div>
                                <div className="sales_counts">
                                  <span className="number up">₹ 12000</span>
                                  <span className="sales_position">
                                    <span>
                                      <i
                                        className="fa fa-caret-up"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                    (+12%)
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-1"></div>

                          <div className="col-md-8">
                            <div className="sales_reports_graph">
                              <div className="indication_row">
                                <div className="left_box">
                                  <span>
                                    <i
                                      className="fa fa-circle"
                                      aria-hidden="true"
                                    ></i>{" "}
                                    Revenue
                                  </span>
                                  <span>
                                    <i
                                      className="fa fa-circle"
                                      aria-hidden="true"
                                    ></i>{" "}
                                    Profit
                                  </span>
                                </div>
                                <div className="right_box">
                                  <select
                                    name="select"
                                    id="select"
                                    className="form-control green_border"
                                  >
                                    <option value="0">Today</option>
                                  </select>
                                </div>
                              </div>

                              <div className="au-card-inner">
                                <canvas id="sales-chart"></canvas>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-30">
                    <div className="col-md-12 p-0">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="category_upload_image w-100-row p-30 audience_count">
                            <div className="sales_reports_data w-100-row">
                              <h6>Audience</h6>

                              <div className="sale_report">
                                <div className="sales_head">Total Orders</div>
                                <div className="sales_counts">
                                  <span className="number">242</span>
                                  <span className="sales_position up">
                                    <span>
                                      <i
                                        className="fa fa-caret-up"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                    (+12%)
                                  </span>
                                </div>
                              </div>

                              <div className="sale_report">
                                <div className="sales_head">New Customers</div>
                                <div className="sales_counts">
                                  <span className="number">150</span>
                                  <span className="sales_position down">
                                    <span>
                                      <i
                                        className="fa fa-caret-down"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                    (+12%)
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-8">
                          <div className="category_upload_image w-100-row p-30 orders_count">
                            <div className="sales_reports_data w-100-row">
                              <h6>Orders</h6>

                              <div className="sale_report">
                                <div className="sales_head">Total Orders</div>
                                <div className="sales_counts">
                                  <span className="number">242</span>
                                  <span className="sales_position up">
                                    <span>
                                      <i
                                        className="fa fa-caret-up"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                    (+12%)
                                  </span>
                                </div>
                              </div>

                              <div className="sale_report">
                                <div className="sales_head">New Customers</div>
                                <div className="sales_counts">
                                  <span className="number">150</span>
                                  <span className="sales_position down">
                                    <span>
                                      <i
                                        className="fa fa-caret-down"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                    (+12%)
                                  </span>
                                </div>
                              </div>

                              <div className="sale_report">
                                <div className="sales_head">
                                  Total Transactions
                                </div>
                                <div className="sales_counts">
                                  <span className="number">412</span>
                                  <span className="sales_position up">
                                    <span>
                                      <i
                                        className="fa fa-caret-up"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                    (+12%)
                                  </span>
                                </div>
                              </div>

                              <div className="sale_report">
                                <div className="sales_head">
                                  Current Balance
                                </div>
                                <div className="sales_counts">
                                  <span className="number">₹ 12000</span>
                                  <span className="sales_position up">
                                    <span>
                                      <i
                                        className="fa fa-caret-up"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                    (+12%)
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-30">
                    <div className="col-md-12 p-0">
                      <div className="row">
                        <div className="col-md-7">
                          <div className="category_upload_image w-100-row p-30 dashboard_box">
                            <div className="w-100-row">
                              <h6>Customer notifications</h6>

                              <p className="data">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit.....
                              </p>

                              <p className="data">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit.....
                              </p>

                              <p className="data">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit.....
                              </p>

                              <p className="data">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit.....
                              </p>

                              <p className="data">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit.....
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-5">
                          <div className="category_upload_image w-100-row p-30 dashboard_box">
                            <div className="w-100-row">
                              <h6>Top selling items</h6>

                              <div className="top_sellingbox">
                                <div className="left_item">
                                  <span className="number_count">1</span>
                                  <span>
                                    <p className="head">Pizza Margherita</p>
                                    <p className="name">Pizza</p>
                                  </span>
                                </div>
                                <div className="right_item">12</div>
                              </div>

                              <div className="top_sellingbox">
                                <div className="left_item">
                                  <span className="number_count">1</span>
                                  <span>
                                    <p className="head">Pizza Margherita</p>
                                    <p className="name">Pizza</p>
                                  </span>
                                </div>
                                <div className="right_item">12</div>
                              </div>

                              <div className="top_sellingbox">
                                <div className="left_item">
                                  <span className="number_count">1</span>
                                  <span>
                                    <p className="head">Pizza Margherita</p>
                                    <p className="name">Pizza</p>
                                  </span>
                                </div>
                                <div className="right_item">12</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-30">
                    <div className="col-md-12 p-0">
                      <div className="category_upload_image w-100-row p-30 dashboard_box">
                        <h6>Quick messages</h6>

                        <div className="col-md-12 p-0 employes_table message_table">
                          <div className="table-responsive table-data">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    Rishabh Hurshan{" "}
                                    <span className="msg_count">2</span>
                                  </td>
                                  <td>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit.....
                                  </td>
                                  <td>
                                    <img
                                      src="images/icon/cross_red.png"
                                      className="edit_delete"
                                    />
                                  </td>
                                </tr>

                                <tr>
                                  <td>
                                    Rishabh Hurshan{" "}
                                    <span className="msg_count">3</span>
                                  </td>
                                  <td>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit.....
                                  </td>
                                  <td>
                                    <img
                                      src="images/icon/cross_red.png"
                                      className="edit_delete"
                                    />
                                  </td>
                                </tr>

                                <tr>
                                  <td>
                                    Rishabh Hurshan{" "}
                                    <span className="msg_count">4</span>
                                  </td>
                                  <td>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit.....
                                  </td>
                                  <td>
                                    <img
                                      src="images/icon/cross_red.png"
                                      className="edit_delete"
                                    />
                                  </td>
                                </tr>
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
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
