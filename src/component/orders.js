import React from "react";
import firebase from "../config";
import Sidebar from "./sidebar";
import Header from "./header";
import { Link } from "react-router-dom";
class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    this.orderList();
  }
  orderList = async () => {
    var businessId = sessionStorage.getItem("businessId");

    this.setState({ loading: true });
    firebase
      .firestore()
      .collection("orders")

      .where("businessId", "==", businessId)
      .get()
      .then((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          const GSTData = {
            billid: childSnapShot.id,
            orderTiming: childSnapShot.data().orderTiming,
            orderId: childSnapShot.data().orderId,
            orderDiscount: childSnapShot.data().orderDiscount,
            orderPrice: childSnapShot.data().orderPrice,
            tableName: childSnapShot.data().tableName,

            businessId: childSnapShot.data().businessId,
            sessionId: childSnapShot.data().sessionId,
          };

          data.push(GSTData);
        });
        this.setState({
          orderList: data,
          countPage: data.length,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
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
                  <div className="col-md-5 p-0">
                    <div className="overview-wrap">
                      <div className="order_btns">
                        <Link to="/Orders">
                          <span className="btn view_ord">
                            View Order
                            <span className="red_dot"></span>
                          </span>
                        </Link>
                        <Link to="/Table">
                          <span className="btn add_ord">
                            <img src="images/icon/add_plus_icon_w.svg" /> Add
                            Order
                          </span>
                        </Link>
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
                              <img src="images/icon/green_order_prepare.svg" />
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
                          <a href="#" className="activemenu">
                            All
                          </a>
                        </li>
                        <li>
                          <a href="#">Dine In</a>
                        </li>
                        <li>
                          <a href="#">Delivery</a>
                        </li>
                        <li>
                          <a href="#">Take away</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="row m-t-30 m-b-30">
                  <div className="col-md-12 p-0">
                    <div className="order_data_row head">
                      <div className="databox td_1"></div>
                      <div className="databox td_2"></div>
                      <div className="databox td_3">Order Type</div>
                      <div className="databox td_4">Table No</div>
                      <div className="databox td_5">Amount</div>
                      <div className="databox td_6">Table status</div>
                      <div className="databox td_7">Time from Last Update</div>
                      <div className="databox td_8">Fulfilment Status</div>
                      <div className="databox td_9">Order ID</div>
                      {/* <div className="databox td_10">View Order</div> */}
                    </div>

                    {/* <div className="order_data_row newupdate_head">
                      <span className="bg">New</span>
                      <span className="line"></span>
                    </div> */}

                    {/* <div className="order_data_row data selected">
                      <div className="databox td_1">
                        <span className="order_round_color_dinebox">
                          <img src="images/icon/dine_icon_W.svg" />
                        </span>
                        <span className="order_round_color dineine"></span>
                      </div>
                      <div className="databox td_2">1</div>
                      <div className="databox td_3">
                        <span className="order_type_btn dineine">Dine In</span>
                      </div>
                      <div className="databox td_4">Table 7A</div>
                      <div className="databox td_5">Rs 450</div>
                      <div className="databox td_6">Cooking</div>
                      <div className="databox td_7">6 Mins</div>
                      <div className="databox td_8 color">(2 /2) (3/3)</div>
                      <div className="databox td_9">thecoffee012</div>
                      <div className="databox td_10">
                        <span className="btn view_order_btn_td">
                          View Table
                        </span>
                      </div>
                    </div> */}
                    {this.state.orderList &&
                      this.state.orderList.map((order, index) => {
                        return (
                          <div className="order_data_row data" key={index}>
                            <div className="databox td_1">
                              <span className="order_round_color dineine"></span>
                            </div>
                            <div className="databox td_2">{index + 1}</div>
                            <div className="databox td_3">
                              <span className="order_type_btn dineine">
                                Dine In
                              </span>
                            </div>
                            <div className="databox td_4">
                              Table {order.tableName}
                            </div>
                            <div className="databox td_5">
                              Rs {order.orderPrice}
                            </div>
                            <div className="databox td_6">Cooking</div>
                            <div className="databox td_7">6 Mins</div>
                            <div className="databox td_8 color">
                              (2 /2) (3/3)
                            </div>
                            <div className="databox td_9">{order.orderId}</div>
                            <div className="databox td_10">
                              {/* <span className="btn view_order_btn_td">
                                View Table
                              </span> */}
                            </div>
                          </div>
                        );
                      })}

                    {/* <div className="order_data_row data">
                      <div className="databox td_1">
                        <span className="order_round_color dineine"></span>
                      </div>
                      <div className="databox td_2">1</div>
                      <div className="databox td_3">
                        <span className="order_type_btn dineine">Dine In</span>
                      </div>
                      <div className="databox td_4">Table 7A</div>
                      <div className="databox td_5">Rs 450</div>
                      <div className="databox td_6">Cooking</div>
                      <div className="databox td_7">6 Mins</div>
                      <div className="databox td_8 color">(2 /2) (3/3)</div>
                      <div className="databox td_9">thecoffee012</div>
                      <div className="databox td_10">
                        <span className="btn view_order_btn_td">
                          View Table
                        </span>
                      </div>
                    </div>

                    <div className="order_data_row data">
                      <div className="databox td_1">
                        <span className="order_round_color dineine"></span>
                      </div>
                      <div className="databox td_2">1</div>
                      <div className="databox td_3">
                        <span className="order_type_btn dineine">Dine In</span>
                      </div>
                      <div className="databox td_4">Table 7A</div>
                      <div className="databox td_5">Rs 450</div>
                      <div className="databox td_6">Cooking</div>
                      <div className="databox td_7">6 Mins</div>
                      <div className="databox td_8 color">(2 /2) (3/3)</div>
                      <div className="databox td_9">thecoffee012</div>
                      <div className="databox td_10">
                        <span className="btn view_order_btn_td">
                          View Table
                        </span>
                      </div>
                    </div> */}

                    {/* <div className="order_data_row newupdate_head">
                      <span className="bg">Update</span>
                      <span className="line"></span>
                    </div>

                    <div className="order_data_row data">
                      <div className="databox td_1">
                        <span className="order_round_color dineine"></span>
                      </div>
                      <div className="databox td_2">1</div>
                      <div className="databox td_3">
                        <span className="order_type_btn dineine">Dine In</span>
                      </div>
                      <div className="databox td_4">Table 7A</div>
                      <div className="databox td_5">Rs 450</div>
                      <div className="databox td_6">Cooking</div>
                      <div className="databox td_7">6 Mins</div>
                      <div className="databox td_8 color">(2 /2) (3/3)</div>
                      <div className="databox td_9">thecoffee012</div>
                      <div className="databox td_10">
                        <span className="btn view_order_btn_td">
                          View Table
                        </span>
                      </div>
                    </div>

                    <div className="order_data_row data">
                      <div className="databox td_1">
                        <span className="order_round_color dineine"></span>
                      </div>
                      <div className="databox td_2">1</div>
                      <div className="databox td_3">
                        <span className="order_type_btn dineine">Dine In</span>
                      </div>
                      <div className="databox td_4">Table 7A</div>
                      <div className="databox td_5">Rs 450</div>
                      <div className="databox td_6">Cooking</div>
                      <div className="databox td_7">6 Mins</div>
                      <div className="databox td_8 color">(2 /2) (3/3)</div>
                      <div className="databox td_9">thecoffee012</div>
                      <div className="databox td_10">
                        <span className="btn view_order_btn_td">
                          View Table
                        </span>
                      </div>
                    </div> */}

                    {/* <div className="order_data_row data">
                      <div className="databox td_1">
                        <span className="order_round_color dineine"></span>
                      </div>
                      <div className="databox td_2">1</div>
                      <div className="databox td_3">
                        <span className="order_type_btn dineine">Dine In</span>
                      </div>
                      <div className="databox td_4">Table 7A</div>
                      <div className="databox td_5">Rs 450</div>
                      <div className="databox td_6">Cooking</div>
                      <div className="databox td_7">6 Mins</div>
                      <div className="databox td_8 color">(2 /2) (3/3)</div>
                      <div className="databox td_9">thecoffee012</div>
                      <div className="databox td_10">
                        <span className="btn view_order_btn_td">
                          View Table
                        </span>
                      </div>
                    </div> */}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 p-0">
                    <div className="orders_kitchen">
                      <span>See Instructions</span>
                      <span>1 item KOT</span>
                      <span>1 item cooking</span>
                      <span>2 delivered</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- END MAIN CONTENT-->
                <!-- END PAGE CONTAINER--> */}
        </div>
      </div>
    );
  }
}

export default Orders;
