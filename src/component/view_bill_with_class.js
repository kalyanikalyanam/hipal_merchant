import React from "react";
import firebase from "../config";
import { Link } from "react-router-dom";
import * as moment from "moment";
import ReactToPrint from "react-to-print";
class ViewBill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({ loading: true });

    document.body.style.backgroundColor = "#ccc";
    this.viewBill();
  }

  viewBill = () => {
    const { billid } = this.props.match.params;
    console.log(billid);

    firebase
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
          settle_by: userData.employee,
          tablename: userData.tablename,
          billItems: userData.bill,
          orderId: userData.orderId,
          businessId: userData.businessId,
          sessionId: userData.sessionId,
          gst: userData.gst,
          cgst: userData.cgst,
          address: userData.address,
          gstNumber: userData.gstNumber,
          logo: userData.logo,
          grandTotal: userData.grandTotal,
        });
        console.log();
        console.log(this.state.billItems);
        let subTotal = 0,
          discount = 0,
          tax = 0;
        userData.bill.forEach((item) => {
          subTotal += item.price * item.quantity;
          discount += ((item.price * item.discount) / 100) * item.quantity;
          tax += ((item.price * item.tax) / 100) * item.quantity;
        });
        let total = subTotal + tax - discount;
        let temp = total;
        total += (total * this.state.gst) / 100;
        total += (temp * this.state.cgst) / 100;
        this.setState({
          total,
          subTotal,
          discount,
          tax,
        });
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
                  // src={sessionStorage.getItem("BusinessLogo")}
                  src={this.state.logo}
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
                {this.state.address}
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
                      {moment(this.state.date)
                        .locale("en")
                        .format("DD-MM-YYYY")}
                    </td>
                    <td style={{ textAlign: "right", padding: "3px 30px" }}>
                      {this.state.tablename}
                    </td>
                  </tr>

                  <tr>
                    <td style={{ textAlign: "left", padding: "3px 30px" }}>
                      {moment(this.state.date).locale("en").format("HH:mm:ss")}
                    </td>
                    <td style={{ textAlign: "right", padding: "3px 30px" }}>
                      {this.state.settle_by}
                    </td>
                  </tr>

                  <tr>
                    <td style={{ textAlign: "left", padding: "3px 30px" }}>
                      Order ID :{this.state.orderId}
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
                      console.log(item);

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
                            {parseFloat(item.price * item.quantity).toFixed(2)}
                            {item.discount > 0 ? (
                              <>{`(Discount  ${parseFloat(
                                item.discount
                              )} %)`}</>
                            ) : null}
                            {item.discount > 0 ? (
                              <>
                                {`(Discount ₹ ${parseFloat(
                                  ((item.price * item.discount) / 100) *
                                    item.quantity
                                ).toFixed(2)} )`}
                              </>
                            ) : null}
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
                      ₹ {this.state.subTotal}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", padding: "3px 30px" }}>
                      Discount
                    </td>
                    <td style={{ textAlign: "right", padding: "3px 30px" }}>
                      {this.state.discount}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", padding: "3px 30px" }}>
                      Extra charges
                    </td>
                    <td style={{ textAlign: "right", padding: "3px 30px" }}>
                      {this.state.tax}
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
                      CGST
                    </td>
                    <td style={{ textAlign: "right", padding: "3px 30px" }}>
                      {this.state.cgst}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", padding: "3px 30px" }}>
                      SGST
                    </td>
                    <td style={{ textAlign: "right", padding: "5px 30px" }}>
                      {this.state.gst}
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
                      <b>₹ {parseFloat(this.state.total).toFixed(2)}</b>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textalign: "left", padding: "5px 30px" }}>
                      <b>Payable</b>
                    </td>
                    <td style={{ textalign: "right", padding: "5px 30px" }}>
                      <b>₹ {Math.round(this.state.total)}</b>
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
                {this.state.gstNumber}
                {/* {sessionStorage.getItem("BusinessGSTNumber")} */}
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
          </table>

          <table width="100%" style={{ display: "none" }}>
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
                  // src={sessionStorage.getItem("BusinessLogo")}
                  src={this.state.logo}
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
                {this.state.address}
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
                    <td
                      style={{
                        textAlign: "left",
                        padding: "3px 30px",
                        color: "#000000",
                      }}
                    >
                      {moment(this.state.date)
                        .locale("en")
                        .format("DD-MM-YYYY")}
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        padding: "3px 30px",
                        color: "#000000",
                      }}
                    >
                      {this.state.tablename}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style={{
                        textAlign: "left",
                        padding: "3px 30px",
                        color: "#000000",
                      }}
                    >
                      {moment(this.state.date).locale("en").format("HH:mm:ss")}
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        padding: "3px 30px",
                        color: "#000000",
                      }}
                    >
                      {this.state.settle_by}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style={{
                        textAlign: "left",
                        padding: "3px 30px",
                        color: "#000000",
                      }}
                    >
                      Order ID :{this.state.orderId}
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
                        color: "#000000",
                      }}
                    >
                      <b>Qty</b>
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        padding: "5px 30px 10px 30px",
                        color: "#000000",
                      }}
                    >
                      <b>Price</b>
                    </td>
                  </tr>
                  {this.state.billItems &&
                    this.state.billItems.map((item, index) => {
                      console.log(item);

                      return (
                        <tr key={index}>
                          <td
                            style={{
                              textAlign: "left",
                              padding: "3px 30px",
                              color: "#000000",
                            }}
                          >
                            {item.name}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              padding: "3px 30px",
                              color: "#000000",
                            }}
                          >
                            {item.quantity}
                          </td>
                          <td
                            style={{
                              textAlign: "right",
                              padding: "3px 30px",
                              color: "#000000",
                            }}
                          >
                            {parseFloat(item.price * item.quantity).toFixed(2)}
                            {item.discount > 0 ? (
                              <>{`(Discount  ${parseFloat(
                                item.discount
                              )} %)`}</>
                            ) : null}
                            {item.discount > 0 ? (
                              <>
                                {`(Discount ₹ ${parseFloat(
                                  ((item.price * item.discount) / 100) *
                                    item.quantity
                                ).toFixed(2)} )`}
                              </>
                            ) : null}
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
                    <td
                      style={{
                        textAlign: "left",
                        padding: "3px 30px",
                        color: "#000000",
                      }}
                    >
                      Subtotal
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        padding: "3px 30px",
                        color: "#000000",
                      }}
                    >
                      ₹ {this.state.subTotal}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        textAlign: "left",
                        padding: "3px 30px",
                        color: "#000000",
                      }}
                    >
                      Discount
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        padding: "3px 30px",
                        color: "#000000",
                      }}
                    >
                      {this.state.discount}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        textAlign: "left",
                        padding: "3px 30px",
                        color: "#000000",
                      }}
                    >
                      Extra charges
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        padding: "3px 30px",
                        color: "#000000",
                      }}
                    >
                      {this.state.tax}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        textAlign: "left",
                        padding: "3px 30px",
                        color: "#000000",
                      }}
                    >
                      Packaging charges
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        padding: "3px 30px",
                        color: "#000000",
                      }}
                    >
                      -
                    </td>
                  </tr>

                  <tr>
                    <td
                      style={{
                        textAlign: "left",
                        padding: "3px 30px",
                        color: "#000000",
                      }}
                    >
                      CGST
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        padding: "3px 30px",
                        color: "#000000",
                      }}
                    >
                      {this.state.cgst}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        textAlign: "left",
                        padding: "3px 30px",
                        color: "#000000",
                      }}
                    >
                      SGST
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        padding: "5px 30px",
                        color: "#000000",
                      }}
                    >
                      {this.state.gst}
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
                    <td
                      style={{
                        textalign: "left",
                        padding: "5px 30px",
                        color: "#000000",
                      }}
                    >
                      <b>Total</b>
                    </td>
                    <td
                      style={{
                        textalign: "right",
                        padding: "5px 30px",
                        color: "#000000",
                      }}
                    >
                      <b>₹ {parseFloat(this.state.total).toFixed(2)}</b>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        textalign: "left",
                        padding: "5px 30px",
                        color: "#000000",
                      }}
                    >
                      <b>Payable</b>
                    </td>
                    <td
                      style={{
                        textalign: "right",
                        padding: "5px 30px",
                        color: "#000000",
                      }}
                    >
                      <b>₹ {Math.round(this.state.total)}</b>
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
                {this.state.gstNumber}
                {/* {sessionStorage.getItem("BusinessGSTNumber")} */}
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
          </table>

          <div className="upload_img_block add_menu">
            <div className="row">
              <div className="col-md-12 p-0 bills_table">
                <div className="table-responsive table-data">
                  <table className="table">
                    <thead>
                      <tr>
                        <td>S.no</td>

                        <td>Item Name</td>
                        <td>Discount</td>

                        <td>Reason</td>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.billItems &&
                        this.state.billItems.map((bill, index) => {
                          if (bill.discountReasons != null) {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{bill.name}</td>
                                <td>{bill.discount}%</td>

                                <td>{bill.discountReasons}</td>
                              </tr>
                            );
                          } else {
                          }
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row business_reg_box">
          <div className="col-md-12 p-0 text-center">
            <Link to="/Bills">
              <button className="btn save_button mr-ml-5 bg_red">Close</button>
            </Link>
            <button className="btn save_button mr-ml-5">Print Copy</button>
          </div>
        </div>
      </>
    );
  }
}

class Example extends React.Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => <a href="#">Print this out!</a>}
          content={() => this.componentRef}
        />
        <ViewBill ref={(el) => (this.componentRef = el)} {...this.props} />
      </div>
    );
  }
}

export default Example;
