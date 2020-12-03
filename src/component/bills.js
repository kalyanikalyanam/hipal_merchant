import React from "react";
import firebase from "../config";
import Sidebar from "./sidebar";
import Header from "./header";
import swal from "sweetalert";
import * as moment from "moment";
import { Link } from "react-router-dom";
class Bills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.deleteItem = this.deleteItem.bind(this);
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

    this.billsList();
  }
  billsList = async () => {
    var businessId = sessionStorage.getItem("businessId");

    this.setState({ loading: true });
    firebase
      .firestore()
      .collection("bills")

      .where("businessId", "==", businessId)
      // .where("date", "<=", Date.parse("December 2, 2020"))
      .get()
      .then((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          console.log(childSnapShot.data().date);
          const GSTData = {
            billid: childSnapShot.id,

            billId: childSnapShot.data().billId,

            bill: childSnapShot.data().bill,
            // created_on: childSnapShot.data().created_on,
            date: childSnapShot.data().date,

            PaymentDetails: childSnapShot.data().PaymentDetails,
            orderId: childSnapShot.data().orderId,
            employee: childSnapShot.data().employee,
            tablename: childSnapShot.data().tablename,

            businessId: childSnapShot.data().businessId,
            sessionId: childSnapShot.data().sessionId,
          };

          data.push(GSTData);
        });
        console.log(data);
        this.setState({
          billsList: data,
          countPage: data.length,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
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
        var playersRef = firebase.firestore().collection("/bills").doc(id);
        playersRef.delete();
      } else {
      }
    });
  };

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
                    <div className="col-md-12 p-0">
                      <div className="category_upload_image">
                        <h1>Bill View</h1>
                        <div className="upload_img_block add_menu">
                          <div className="row">
                            <div className="col-md-12 p-0 bills_table">
                              <div className="table-responsive table-data">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <td>S.no</td>
                                      <td>BILL ID</td>
                                      <td>Order Id</td>

                                      <td>Settled By</td>
                                      <td>Amount</td>
                                      <td>Date</td>
                                      <td>Timing</td>

                                      {sessionStorage.getItem("role") ==
                                        "Merchant" ||
                                      sessionStorage.getItem("viewbill") ==
                                        "Yes" ? (
                                        <td>Actions </td>
                                      ) : (
                                        ""
                                      )}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {this.state.billsList &&
                                      this.state.billsList
                                        // .filter((bill) => {
                                        //   console.log(bill.date);
                                        //   console.log(
                                        //     Date.parse("December 2, 2020")
                                        //   );
                                        //   if (!bill.date) return false;
                                        //   return (
                                        //     bill.date <=
                                        //       Date.parse("December 2, 2020") &&
                                        //     bill.date >=
                                        //       Date.parse("December 1, 2020")
                                        //   );
                                        // })
                                        .map((bill, index) => {
                                          console.log(new Date(bill.date));
                                          let subTotal = 0,
                                            discount = 0,
                                            tax = 0;
                                          bill.bill &&
                                            bill.bill.forEach((item) => {
                                              subTotal += parseFloat(
                                                item.price * item.quantity
                                              );
                                              discount += parseFloat(
                                                ((item.price * item.discount) /
                                                  100) *
                                                  item.quantity
                                              );
                                              tax += parseFloat(
                                                ((item.price * item.tax) /
                                                  100) *
                                                  item.quantity
                                              );
                                            });

                                          let total = subTotal + tax - discount;
                                          let temp = total;
                                          total += (total * 2.5) / 100;
                                          total += (temp * 2.5) / 100;

                                          return (
                                            <tr key={index}>
                                              <td>{index + 1}</td>
                                              <td>{bill.billId}</td>
                                              <td>{bill.orderId}</td>

                                              <td>{bill.employee}</td>
                                              <td>Rs {Math.round(total)}</td>
                                              <td className="bill_date">
                                                {moment(bill.date)
                                                  .locale("en")
                                                  .format("DD-MM-YYYY")}
                                              </td>
                                              <td>
                                                {" "}
                                                {moment(bill.date)
                                                  .locale("en")
                                                  .format("HH:mm:ss")}
                                              </td>

                                              {sessionStorage.getItem("role") ==
                                                "Merchant" ||
                                              sessionStorage.getItem(
                                                "viewbill"
                                              ) == "Yes" ? (
                                                <td>
                                                  <Link
                                                    to={`/ViewBill/${bill.billid}`}
                                                  >
                                                    <span className="btn view_order_btn_td">
                                                      View Bill
                                                    </span>
                                                  </Link>
                                                  {/* <img
                                                    src="/images/icon/delete_cross.svg"
                                                    onClick={this.deleteItem.bind(
                                                      this,
                                                      bill.billid
                                                    )}
                                                    className="edit_delete"
                                                  /> */}
                                                </td>
                                              ) : (
                                                ""
                                              )}
                                            </tr>
                                          );
                                        })}
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
          </div>
        </div>
      </>
    );
  }
}

export default Bills;
