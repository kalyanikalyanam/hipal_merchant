import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { db } from "../config";
import { useReactToPrint } from "react-to-print";
import * as moment from "moment";

const ViewBill = React.forwardRef((props, ref) => {
  const [loading, setLoading] = useState(false);

  const [state, setState] = useState({});

  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [subTotalWithDiscount, setSubTotalWithDiscount] = useState(0);
  const [tax, setTax] = useState(0);

  useEffect(() => {
    document.body.style.backgroundColor = "#ccc";
    const viewBills = async () => {
      setLoading(true);

      const snapshot = await db
        .collection("bills")
        .doc(props.match.params.billid)
        .get();

      setState({ ...snapshot.data() });
    };

    viewBills();
  }, []);
  useEffect(() => {
    let subTotal = 0,
      discount = 0,
      tax = 0;
    state &&
      state.bill &&
      state.bill.forEach((item) => {
        subTotal += item.price * item.quantity;
        discount += ((item.price * item.discount) / 100) * item.quantity;
        tax += parseFloat(
          ((item.price - (item.price * item.discount) / 100) *
            item.quantity *
            item.tax) /
            100
        );
        // tax += ((item.price * item.tax) / 100) * item.quantity;
      });
    let subTotalWithDiscount = 0;
    subTotalWithDiscount = subTotal - discount;
    let totalDiscount = 0;
    totalDiscount =
      (subTotalWithDiscount *
        parseFloat(state.tableTotalDiscount || 0).toFixed(2) || "0") / 100;
    let total = subTotalWithDiscount + tax - totalDiscount;
    let temp = total;
    total += (total * state.gst) / 100;
    total += (temp * state.cgst) / 100;

    setSubTotal(subTotal);
    setTax(tax);
    setDiscount(discount);

    setTotal(total);
    setTotalDiscount(totalDiscount);
    setSubTotalWithDiscount(subTotalWithDiscount);
    console.log(subTotal);
  }, [state]);

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
              <b style={{ paddingRight: "10px" }}>BILL ID</b> {state.billId}
            </td>
          </tr>

          <tr>
            <td style={{ textAlign: "center", padding: "10px" }}>
              <img src={state.logo} style={{ maxWidth: "150px" }} />
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
              {state.address}
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
                    {moment(state.date).locale("en").format("DD-MM-YYYY")}
                  </td>
                  <td style={{ textAlign: "right", padding: "3px 30px" }}>
                    {state.tablename}
                  </td>
                </tr>

                <tr>
                  <td style={{ textAlign: "left", padding: "3px 30px" }}>
                    {moment(state.date).locale("en").format("HH:mm:ss")}
                  </td>
                  <td style={{ textAlign: "right", padding: "3px 30px" }}>
                    {state.employee}
                  </td>
                </tr>

                <tr>
                  <td style={{ textAlign: "left", padding: "3px 30px" }}>
                    Order ID :{state.orderId}
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
                {state &&
                  state.bill &&
                  state.bill.map((item, index) => {
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
                    ₹ {subTotalWithDiscount}
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left", padding: "3px 30px" }}>
                    Total Discount({" "}
                    {parseFloat(state.tableTotalDiscount || 0).toFixed(2) ||
                      "0"}
                    %)
                  </td>
                  <td style={{ textAlign: "right", padding: "3px 30px" }}>
                    ₹ {totalDiscount}
                  </td>
                </tr>

                {/* <tr>
                  <td style={{ textAlign: "left", padding: "3px 30px" }}>
                    Discount
                  </td>
                  <td style={{ textAlign: "right", padding: "3px 30px" }}>
                    {discount}
                  </td>
                </tr> */}
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
                    {state.cgst}
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left", padding: "3px 30px" }}>
                    SGST
                  </td>
                  <td style={{ textAlign: "right", padding: "5px 30px" }}>
                    {state.gst}
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
              GSTIN - {state.gstNumber}
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
        <div style={{ display: "none" }}>
          <div className="print_bill" ref={ref}>
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
                  <b style={{ paddingRight: "10px", color: "#000000" }}>
                    BILL ID
                  </b>{" "}
                  {state.billId}
                </td>
              </tr>

              <tr>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  <img src={state.logo} style={{ maxWidth: "150px" }} />
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
                  {state.address}
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
                        {moment(state.date).locale("en").format("DD-MM-YYYY")}
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          padding: "3px 30px",
                          color: "#000000",
                        }}
                      >
                        {state.tablename}
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
                        {moment(state.date).locale("en").format("HH:mm:ss")}
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          padding: "3px 30px",
                          color: "#000000",
                        }}
                      >
                        {state.employee}
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
                        Order ID :{state.orderId}
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
                          color: "#000000",
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
                    {state &&
                      state.bill &&
                      state.bill.map((item, index) => {
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
                              {parseFloat(item.price * item.quantity).toFixed(
                                2
                              )}
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
                        ₹ {subTotalWithDiscount}
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
                        Total Discount( ({state.tableTotalDiscount}%))
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          padding: "3px 30px",
                          color: "#000000",
                        }}
                      >
                        ₹ {totalDiscount}
                      </td>
                    </tr>

                    {/* <tr>
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
                    </tr> */}
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
                        {state.cgst}
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
                        {state.gst}
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
                  GSTIN - {state.gstNumber}
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
          </div>
        </div>

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
                    {state &&
                      state.bill &&
                      state.bill.map((bill, index) => {
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
    </>
  );
});

const Print = (props) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <ViewBill ref={componentRef} {...props} />

      <div className="row business_reg_box">
        <div className="col-md-12 p-0 text-center">
          <Link to="/Bills">
            <button className="btn save_button mr-ml-5 bg_red">Close</button>
          </Link>
          <button className="btn save_button mr-ml-5" onClick={handlePrint}>
            Print Copy
          </button>
        </div>
      </div>
    </>
  );
};

export default Print;
