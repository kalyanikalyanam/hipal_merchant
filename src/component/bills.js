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
      .get()
      .then((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          const GSTData = {
            billid: childSnapShot.id,
            // billAmount: childSnapShot.data().billAmount,
            billId: childSnapShot.data().billId,
            billTiming: childSnapShot.data().billTiming,
            bill: childSnapShot.data().bill,

            paymentMethod: childSnapShot.data().paymentMethod,
            orderId: childSnapShot.data().orderId,
            employee: childSnapShot.data().employee,
            table: childSnapShot.data().table,

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
                                      <td>Date</td>
                                      <td>Settled By</td>
                                      <td>Amount</td>
                                      <td>Order Id</td>
                                      <td>Timing</td>
                                      {/* <td>Photo</td> */}

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
                                      this.state.billsList.map(
                                        (bill, index) => {
                                          let total = 0;

                                          bill.bill.forEach(
                                            (item) => (total += item.price)
                                          );

                                          return (
                                            <tr key={index}>
                                              <td>{index + 1}</td>
                                              <td>{bill.billId}</td>
                                              <td className="bill_date">
                                                {moment(bill.billTiming)
                                                  .locale("en")
                                                  .format("DD-MM-YYYY")}{" "}
                                              </td>
                                              <td>{bill.employee}</td>
                                              <td>Rs {total}</td>
                                              <td>{bill.orderId}</td>
                                              <td>
                                                {moment(bill.billTiming)
                                                  .locale("en")
                                                  .format("HH:mm")}
                                              </td>
                                              {/* <td>
                                            <img
                                              src="/images/bill_image.png"
                                              className="bill_img"
                                            />
                                          </td> */}

                                              {/* <button
                                                  type="button"
                                                  data-toggle="modal"
                                                  data-target="#view_bill"
                                                >
                                                  <span
                                                    className="btn view_order_btn_td"
                                                    // onClick={this.viewBill.bind(
                                                    //   this,
                                                    //   bill.billid
                                                    // )}
                                                  >
                                                    View Bill
                                                  </span>
                                                </button> */}
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
                                                </td>
                                              ) : (
                                                ""
                                              )}
                                              {/* <img
                                              src="/images/icon/edit_icon_blue.svg"
                                              className="edit_delete"
                                            /> */}
                                              {/* <img
                                              onClick={this.deleteItem.bind(
                                                this,
                                                bill.billid
                                              )}
                                              src="/images/icon/delete_cross.svg"
                                              className="edit_delete"
                                            /> */}
                                            </tr>
                                          );
                                        }
                                      )}
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
        <div
          className="modal fade"
          id="view_bill"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="smallmodalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-sm hipal_pop" role="document">
            <table width="100%" style={{ display: "table" }}>
              <tbody>
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      color: "#000000",
                      borderBottom: "1px solid rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <b style={{ paddingRight: "10px" }}>BILL ID</b>{" "}
                    {this.state.billId}
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    <img
                      src={sessionStorage.getItem("BusinessLogo")}
                      style={{ maxWidth: "150px" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      color: "#000000",
                    }}
                  >
                    12, Sainikpuri, Kapra,
                    <br /> Secunderabad, Telangana 500094
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      color: "#000000",
                    }}
                  >
                    <b>DINE IN</b>
                  </td>
                </tr>
                <tr style={{ padding: "0px" }}>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      paddingBottom: "0px",
                      color: "#000000",
                      borderBottom: "1px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <table width="100%">
                      <tbody>
                        <tr>
                          <td
                            style={{ textAlign: "left", padding: "3px 10px" }}
                          >
                            {}
                          </td>
                          <td
                            style={{ textAlign: "right", padding: "3px 10px" }}
                          >
                            {this.state.table_name}
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{ textAlign: "left", padding: "3px 10px" }}
                          >
                            09:23:45 AM
                          </td>
                          <td
                            style={{ textAlign: "right", padding: "3px 10px" }}
                          >
                            {this.state.settle_by}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                {this.state.settle_by}
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      paddingTop: "0px",
                      color: "#000000",
                      borderBottom: "1px dashed rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <table width="100%">
                      <tbody>
                        <tr>
                          <td
                            style={{ textAlign: "left", padding: "5px 10px" }}
                          >
                            <b>Grand Total</b>
                          </td>
                          <td
                            style={{ textAlign: "right", padding: "5px 10px" }}
                          >
                            <b>₹ {this.state.billAmount}</b>
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{ textAlign: "left", padding: "5px 10px" }}
                          >
                            <b>Payable</b>
                          </td>
                          <td
                            style={{ textAlign: "right", padding: "5px 10px" }}
                          >
                            <b>
                              ₹{" "}
                              {this.state.billAmount &&
                                Math.round(this.state.billAmount)}
                            </b>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      color: "#000000",
                    }}
                  >
                    - Thank you! -
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      color: "#000000",
                    }}
                  >
                    GSTIN - 456AEW453462
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default Bills;
