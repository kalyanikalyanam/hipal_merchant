import React from "react";
import firebase from "../config";
import Sidebar from "./sidebar";
import Header from "./header";
import swal from "sweetalert";
import * as moment from "moment";
import { Link } from "react-router-dom";
class ViewBill extends React.Component {
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
    document.body.style.backgroundColor = "#ccc";
    this.viewBill();
  }

  viewBill = async () => {
    const { billid } = this.props.match.params;
    console.log(billid);

    var ref = await firebase
      .firestore()
      .collection("bills")
      .doc(billid)
      .get()

      .then((snapshot) => {
        var userData = snapshot.data();
        console.log(userData);
        this.setState({
          billId: userData.billId,
          PaymentDetails: userData.PaymentDetails,
          date: userData.date,
          time: userData.time,
          settle_by: userData.employee,
          table: userData.table,
          billItems: userData.bill,
          orderId: userData.orderId,
          businessId: userData.businessId,
          sessionId: userData.sessionId,
          payable: userData.payable,

          grandTotal: userData.grandTotal,
        });
        console.log(this.state.billItems);
      });
  };

  render() {
    return (
      <>
        <div className="print_bill">
          <table width="100%">
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
                12, Sainikpuri, Kapra,<br></br> Secunderabad, Telangana 500094
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

            <tr>
              <td
                style={{
                  textAlign: "center",
                  padding: "10px",
                  color: "#000000",
                  borderBottom: "1px dashed rgba(0, 0, 0, 0.5)",
                }}
              >
                <table width="100%">
                  <tr>
                    <td style={{ textAlign: "left", padding: "3px 30px" }}>
                      {this.state.date}
                    </td>
                    <td style={{ textAlign: "right", padding: "3px 30px" }}>
                      {this.state.table}
                    </td>
                  </tr>

                  <tr>
                    <td style={{ textAlign: "left", padding: "3px 30px" }}>
                      {this.state.time}
                    </td>
                    <td style={{ textAlign: "right", padding: "3px 30px" }}>
                      {this.state.settle_by}
                    </td>
                  </tr>

                  <tr>
                    <td style={{ textAlign: "left", padding: "3px 30px" }}>
                      Order ID :{this.state.orderId}
                    </td>
                    <td style={{ textAlign: "right", padding: "3px 30px" }}>
                      Copy : 1
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td
                style={{
                  textAlign: "center",
                  padding: "10px",
                  color: "#000000",
                  borderBottom: " 1px dashed rgba(0, 0, 0, 0.5)",
                }}
              >
                <table width="100%">
                  <tr>
                    <td
                      style={{
                        textAlign: "left",
                        padding: "5px 30px 10px 30px",
                      }}
                    >
                      <b>Item</b>
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "5px 30px 10px 30px",
                      }}
                    >
                      <b>Qty</b>
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        padding: "5px 30px 10px 30px",
                      }}
                    >
                      <b>Price</b>
                    </td>
                  </tr>
                  {this.state.billItems &&
                    this.state.billItems.map((item, index) => {
                      var totalAmount = 0;
                      let total = item.price * item.quantity;
                      totalAmount += total;
                      var totalTax = 0;
                      let totaltax =
                        ((item.tax * item.price) / 100) * item.quantity;
                      totalTax += totaltax;
                      var totalOffer = 0;
                      let totaloffer =
                        ((item.price * item.discount) / 100) * item.quantity;
                      totalOffer += totaloffer;

                      return (
                        <tr key={index}>
                          <td
                            style={{ textAlign: "left", padding: "3px 30px" }}
                          >
                            {item.name}
                          </td>
                          <td
                            style={{ textAlign: "center", padding: "3px 30px" }}
                          >
                            {item.quantity}
                          </td>
                          <td
                            style={{ textAlign: "right", padding: "3px 30px" }}
                          >
                            {parseFloat(total).toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                </table>
              </td>
            </tr>

            <tr>
              <td
                style={{
                  textAlign: "center",
                  padding: "10px",
                  color: "#000000",
                  borderBottom: "1px dashed rgba(0, 0, 0, 0.5)",
                }}
              >
                <table width="100%">
                  <tr>
                    <td style={{ textAlign: "left", padding: "3px 30px" }}>
                      Subtotal
                    </td>
                    <td style={{ textAlign: "right", padding: "3px 30px" }}>
                      ₹ {this.state.billAmount}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", padding: "3px 30px" }}>
                      Offer
                    </td>
                    <td style={{ textAlign: "right", padding: "3px 30px" }}>
                      {/* {parseFloat(totalOffer).toFixed(2)} */}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", padding: "3px 30px" }}>
                      Extra charges
                    </td>
                    <td style={{ textAlign: "right", padding: "3px 30px" }}>
                      {/* {parseFloat(totalTax).toFixed(2)} */}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", padding: "3px 30px" }}>
                      Packaging charges
                    </td>
                    <td style={{ textAlign: "right", padding: "3px 30px" }}>
                      -
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", padding: "3px 30px" }}>
                      GST
                    </td>
                    <td style={{ textAlign: "right", padding: "5px 30px" }}>
                      2.5
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", padding: "3px 30px" }}>
                      CGST
                    </td>
                    <td style={{ textAlign: "right", padding: "3px 30px" }}>
                      2.5
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td
                style={{
                  textAlign: "center",
                  padding: "10px",
                  color: "#000000",
                  borderBottom: "1px dashed rgba(0, 0, 0, 0.5)",
                }}
              >
                <table width="100%">
                  <tr>
                    <td style={{ textalign: "left", padding: "5px 30px" }}>
                      <b>Total</b>
                    </td>
                    <td style={{ textalign: "right", padding: "5px 30px" }}>
                      <b>₹ {this.state.grandTotal}</b>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textalign: "left", padding: "5px 30px" }}>
                      <b>Payable</b>
                    </td>
                    <td style={{ textalign: "right", padding: "5px 30px" }}>
                      <b>₹ {this.state.payable}</b>
                    </td>
                  </tr>
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
          </table>
        </div>
        <div className="row business_reg_box">
          <div className="col-md-12 p-0 text-center">
            <Link to="/Bills">
              <button className="btn save_button mr-ml-5 bg_red">Close</button>
            </Link>
            {/* <button className="btn save_button mr-ml-5">Print Copy</button>
            <button className="btn save_button mr-ml-5">Save</button> */}
          </div>
        </div>
      </>
    );
  }
}

export default ViewBill;
