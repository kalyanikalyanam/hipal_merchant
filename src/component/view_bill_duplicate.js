import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../config";
import * as moment from "moment";
const ViewBill = (props) => {
  const [loading, setLoading] = useState(false);
  const [billId, setBillId] = useState();
  const [logo, setLogo] = useState();
  const [address, setAddress] = useState();
  const [date, setDate] = useState();
  const [tablename, setTablename] = useState();
  const [billItems, setBillItems] = useState();
  const [orderId, setOrderId] = useState();

  const [settle_by, setSettle_by] = useState();

  const [paymentDetails, setPaymentDetails] = useState();

  const [gst, setGst] = useState(0);
  const [cGst, setCgst] = useState(0);
  const [gstNum, setGstNum] = useState();

  const [total, setTotal] = useState(0);
  const [subTotal, , setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);

  useEffect(() => {
    document.body.style.backgroundColor = "#ccc";
    const viewBills = () => {
      setLoading(true);

      // const { billid } = this.props.match.params;
      // console.log(billid);
      db.collection("bills")
        .doc(props.match.params.billid)
        .get()
        .then((snapshot) => {
          setBillId(snapshot.data().billId);
          setLogo(snapshot.data().logo);
          setAddress(snapshot.data().address);
          setDate(snapshot.data().date);
          setTablename(snapshot.data().tablename);
          setBillItems(snapshot.data().bill);
          setOrderId(snapshot.data().orderId);
          setCgst(snapshot.data().cgst);
          setGst(snapshot.data().gst);
          setGstNum(snapshot.data().gstNum);
          setPaymentDetails(snapshot.data().paymentDetails);
          setSettle_by(snapshot.data().employee);
        });
      console.log();
      console.log(billItems);
      let subTotal = 0,
        discount = 0,
        tax = 0;
      billItems &&
        billItems.forEach((item) => {
          subTotal += item.price * item.quantity;
          discount += ((item.price * item.discount) / 100) * item.quantity;
          tax += ((item.price * item.tax) / 100) * item.quantity;
        });
      let total = subTotal + tax - discount;
      let temp = total;
      total += (total * gst) / 100;
      total += (temp * cGst) / 100;

      setTotal(total);
      setSubTotal(subTotal);
      setDiscount(discount);
      setTax(tax);
    };

    viewBills();
  }, []);

  // viewBill = async () => {
  //   const { billid } = this.props.match.params;
  //   console.log(billid);

  //   var ref = await firebase
  //     .firestore()
  //     .collection("bills")
  //     .doc(billid)
  //     .get()

  //     .then((snapshot) => {
  //       var userData = snapshot.data();
  //       console.log(userData);
  //       this.setState({
  //         billId: userData.billId,
  //         PaymentDetails: userData.PaymentDetails,

  //         date: userData.date,
  //         settle_by: userData.employee,
  //         tablename: userData.tablename,
  //         billItems: userData.bill,
  //         orderId: userData.orderId,
  //         businessId: userData.businessId,
  //         sessionId: userData.sessionId,
  //         gst: userData.gst,
  //         cgst: userData.cgst,
  //         address: userData.address,
  //         gstNumber: userData.gstNumber,
  //         logo: userData.logo,
  //         grandTotal: userData.grandTotal,
  //       });
  //       console.log();
  //       console.log(billItems);
  //       let subTotal = 0,
  //         discount = 0,
  //         tax = 0;
  //       userData.bill.forEach((item) => {
  //         subTotal += item.price * item.quantity;
  //         discount += ((item.price * item.discount) / 100) * item.quantity;
  //         tax += ((item.price * item.tax) / 100) * item.quantity;
  //       });
  //       let total = subTotal + tax - discount;
  //       let temp = total;
  //       total += (total * gst) / 100;
  //       total += (temp * cgst) / 100;
  //       this.setState({
  //         total,
  //         subTotal,
  //         discount,
  //         tax,
  //       });
  //     });
  // };

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
              <b style={{ paddingRight: "10px" }}>BILL ID</b> {billId}
            </td>
          </tr>

          <tr>
            <td style={{ textAlign: "center", padding: "10px" }}>
              <img src={logo} style={{ maxWidth: "150px" }} />
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
              {address}
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
                    {moment(date).locale("en").format("DD-MM-YYYY")}
                  </td>
                  <td style={{ textAlign: "right", padding: "3px 30px" }}>
                    {tablename}
                  </td>
                </tr>

                <tr>
                  <td style={{ textAlign: "left", padding: "3px 30px" }}>
                    {moment(date).locale("en").format("HH:mm:ss")}
                  </td>
                  <td style={{ textAlign: "right", padding: "3px 30px" }}>
                    {settle_by}
                  </td>
                </tr>

                <tr>
                  <td style={{ textAlign: "left", padding: "3px 30px" }}>
                    Order ID :{orderId}
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
                {billItems &&
                  billItems.map((item, index) => {
                    console.log(item);

                    return (
                      <tr key={index}>
                        <td style={{ textAlign: "left", padding: "3px 30px" }}>
                          {item.name}
                        </td>
                        <td
                          style={{ textAlign: "center", padding: "3px 30px" }}
                        >
                          {item.quantity}
                        </td>
                        <td style={{ textAlign: "right", padding: "3px 30px" }}>
                          {parseFloat(item.price * item.quantity).toFixed(2)}
                          {item.discount > 0 ? (
                            <>{`(Discount  ${parseFloat(item.discount)} %)`}</>
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
                    ₹ {subTotal}
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left", padding: "3px 30px" }}>
                    Discount
                  </td>
                  <td style={{ textAlign: "right", padding: "3px 30px" }}>
                    {discount}
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left", padding: "3px 30px" }}>
                    Extra charges
                  </td>
                  <td style={{ textAlign: "right", padding: "3px 30px" }}>
                    {tax}
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left", padding: "3px 30px" }}>
                    Packaging charges
                  </td>
                  <td style={{ textAlign: "right", padding: "3px 30px" }}>-</td>
                </tr>

                <tr>
                  <td style={{ textAlign: "left", padding: "3px 30px" }}>
                    CGST
                  </td>
                  <td style={{ textAlign: "right", padding: "3px 30px" }}>
                    {cGst}
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left", padding: "3px 30px" }}>
                    SGST
                  </td>
                  <td style={{ textAlign: "right", padding: "5px 30px" }}>
                    {gst}
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
                    <b>₹ {parseFloat(total).toFixed(2)}</b>
                  </td>
                </tr>
                <tr>
                  <td style={{ textalign: "left", padding: "5px 30px" }}>
                    <b>Payable</b>
                  </td>
                  <td style={{ textalign: "right", padding: "5px 30px" }}>
                    <b>₹ {Math.round(total)}</b>
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
              {gstNum}
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
              <b style={{ paddingRight: "10px" }}>BILL ID</b> {billId}
            </td>
          </tr>

          <tr>
            <td style={{ textAlign: "center", padding: "10px" }}>
              <img src={logo} style={{ maxWidth: "150px" }} />
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
              {address}
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
                    {moment(date).locale("en").format("DD-MM-YYYY")}
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      padding: "3px 30px",
                      color: "#000000",
                    }}
                  >
                    {tablename}
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
                    {moment(date).locale("en").format("HH:mm:ss")}
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      padding: "3px 30px",
                      color: "#000000",
                    }}
                  >
                    {settle_by}
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
                    Order ID :{orderId}
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
                {billItems &&
                  billItems.map((item, index) => {
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
                            <>{`(Discount  ${parseFloat(item.discount)} %)`}</>
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
                    ₹ {subTotal}
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
                    {discount}
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
                    {tax}
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
                    {cGst}
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
                    {gst}
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
                    <b>₹ {parseFloat(total).toFixed(2)}</b>
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
                    <b>₹ {Math.round(total)}</b>
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
              {gstNum}
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
                    {billItems &&
                      billItems.map((bill, index) => {
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
};

export default ViewBill;
