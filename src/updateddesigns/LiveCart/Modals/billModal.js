import React, { useEffect, useState, useRef, useContext } from "react";
import { dispatchContext } from "../contexts";
import BillItemModal from "../billItemModal";
import { useReactToPrint } from "react-to-print";
import BillItem from "../billItem";
const BillModal = React.forwardRef(({ data }, ref) => {
  const dispatch = useContext(dispatchContext);
  const [businessLogo, setBusinessLogo] = useState();

  useEffect(() => {
    setBusinessLogo(sessionStorage.getItem("BusinessLogo"));
  }, []);
  const handleClose = () => {
    console.log("here");
    dispatch({
      type: "BillViewModalHide",
    });
  };
  const date = () => {
    let today = new Date(Date.now());
    let options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return today.toLocaleDateString("en-US", options).toString();
  };
  const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var AmPm = hours >= 12 ? "Pm" : "Am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + AmPm;
    return strTime;
  };
  const noItem = (
    <tr>
      <td
        style={{
          textAlign: "center",
          padding: "10px",
          paddingBottom: "0px",
          color: "#000000",
          borderBottom: "1px rgba(0, 0, 0, 0.5)",
        }}
      >
        No Items Yet
      </td>
    </tr>
  );
  const billItems =
    data && data.table && data.table.bill && data.table.bill.length !== 0
      ? data.table.bill.map((item, index) => {
          return <BillItemModal item={item} key={index} />;
        })
      : noItem;
  const billItems1 =
    data && data.table && data.table.bill && data.table.bill.length !== 0
      ? data.table.bill.map((item, index) => {
          return <BillItem item={item} key={index} />;
        })
      : noItem;
  return (
    // <div width="100%" ref={ref}>
    <div className="order_id_cart_box col-md-12 m-t-20 bg-w m-b-20">
      <div className="width-100 bill_scroll">
        <span className="btn view_ord" onClick={handleClose}>
          <b>X</b>
        </span>
        <div style={{ display: "none" }}>
          <div className="print_bill" ref={ref}>
            <table width="100%">
              <tbody>
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      color: "#000000",
                      borderBottom: "1px solid rgba(0, 0, 0, 0.5)",
                      fontSize: "30px",
                    }}
                  >
                    <b style={{ paddingRight: "10px" }}>BILL ID</b>{" "}
                    {/* {data && data.billId} */}
                    <b>{data && data.table && data.table.billId}</b>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      fontSize: "32px",
                    }}
                  >
                    <img
                      src={businessLogo}
                      style={{ maxWidth: "150px", fontSize: "32px" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      color: "#000000",
                      fontSize: "32px",
                    }}
                  >
                    <b> {data && data.businessAddress}</b>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      color: "#000000",
                      fontSize: "32px",
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
                      borderBottom: "1px dashed rgba(0, 0, 0, 0.5)",
                      fontSize: "32px",
                    }}
                  >
                    <table width="100%">
                      <tbody>
                        <tr>
                          <td
                            style={{
                              textAlign: "left",
                              padding: "3px 10px",
                              fontSize: "32px",
                              color: "#000000",
                            }}
                          >
                            <b> {date()}</b>
                          </td>
                          <td
                            style={{
                              textAlign: "right",
                              padding: "3px 10px",
                              fontSize: "32px",
                              color: "#000000",
                            }}
                          >
                            <b>
                              {" "}
                              {data && data.table
                                ? data.table.table_name
                                : null}
                            </b>
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              textAlign: "left",
                              padding: "3px 10px",
                              fontSize: "32px",
                              color: "#000000",
                            }}
                          >
                            <b>{formatAMPM(new Date())}</b>
                          </td>
                          <td
                            style={{
                              textAlign: "right",
                              padding: "3px 10px",
                              fontSize: "32px",
                              color: "#000000",
                            }}
                          >
                            <b> {data && data.employee}</b>
                          </td>
                        </tr>
                        {/* <td
                      style={{
                        textAlign: "left",
                        padding: "3px 10px",
                        fontSize: "32px",
                      }}
                    >
                      Copy : 1
                    </td>{" "} */}
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    color: "#000000",
                    borderBottom: "1px rgba(0, 0, 0, 0.5)",
                    fontSize: "32px",
                  }}
                >
                  <td
                    style={{
                      textAlign: "left",
                      padding: "3px 10px",
                      fontSize: "32px",
                      color: "#000000",
                    }}
                  >
                    <b>Order ID : {data && data.table && data.table.orderId}</b>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      color: "#000000",
                      borderBottom: "1px dashed rgba(0, 0,0, 0.5)",
                      fontSize: "32px",
                    }}
                  >
                    <table width="100%">
                      <tbody>
                        <tr>
                          <td
                            style={{
                              textAlign: "left",
                              padding: "5px 10px 10px 10px",
                              fontSize: "33px",
                              color: "#000000",
                            }}
                          >
                            <b>Item</b>
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              padding: "5px 10px 10px 10px",
                              fontSize: "33px",
                              color: "#000000",
                            }}
                          >
                            <b>Qty</b>
                          </td>
                          <td
                            style={{
                              textAlign: "right",
                              padding: "5px 10px 10px 10px",
                              fontSize: "33px",
                              color: "#000000",
                            }}
                          >
                            <b>Price</b>
                          </td>
                          <td></td>
                        </tr>
                        {billItems}
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
                      bottomBorder: "1px dashed rgba(0, 0, 0, 0.5)",
                      fontSize: "32px",
                    }}
                  >
                    <table width="100%">
                      <tbody>
                        <tr>
                          <td
                            style={{
                              textAlign: "left",
                              padding: "3px 10px",
                              fontSize: "32px",
                              color: "#000000",
                            }}
                          >
                            <b>Subtotal</b>
                          </td>
                          <td
                            style={{
                              textAlign: "right",
                              padding: "3px 10px",
                              fontSize: "32px",
                              color: "#000000",
                            }}
                          >
                            <b> ₹ {data && data.subTotal}</b>
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              textAlign: "left",
                              padding: "3px 10px",
                              fontSize: "32px",
                              color: "#000000",
                            }}
                          >
                            <b>
                              Total Discount ({" "}
                              {parseFloat(
                                (data && data.table.total_discount) || 0
                              ).toFixed(2) || "0"}
                              % )
                            </b>
                          </td>
                          <td
                            style={{
                              textAlign: "right",
                              padding: "3px 10px",
                              fontSize: "32px",
                              color: "#000000",
                            }}
                          >
                            <b>
                              {" "}
                              {/* {data && data.table.total_discount}% */}₹
                              {((data &&
                                data.subTotal *
                                  parseFloat(
                                    (data && data.table.total_discount) || 0
                                  ).toFixed(2)) ||
                                "0") / 100}
                            </b>
                          </td>
                        </tr>

                        <tr>
                          <td
                            style={{
                              textAlign: "left",
                              padding: "3px 10px",
                              fontSize: "33px",
                              color: "#000000",
                            }}
                          >
                            <b style={{ fontSize: "33px" }}>Discount</b>
                          </td>
                          <td
                            style={{
                              textAlign: "right",
                              padding: "3px 10px",
                              fontSize: "33px",
                              color: "#000000",
                            }}
                          >
                            <b> {data ? data.discount : `-`}</b>
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              textAlign: "left",
                              padding: "3px 10px",
                              fontSize: "32px",
                              color: "#000000",
                            }}
                          >
                            <b> Extra charges</b>
                          </td>
                          <td
                            style={{
                              textAlign: "right",
                              padding: "3px 10px",
                              fontSize: "32px",
                              color: "#000000",
                            }}
                          >
                            <b>{data ? data.tax : `-`}</b>
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              textAlign: "left",
                              padding: "3px 10px",
                              fontSize: "32px",
                              color: "#000000",
                            }}
                          >
                            <b>Packaging charges</b>
                          </td>
                          <td
                            style={{
                              textAlign: "right",
                              padding: "3px 10px",
                              fontSize: "32px",
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
                              padding: "3px 10px",
                              fontSize: "32px",
                              color: "#000000",
                            }}
                          >
                            <b> CGST</b>
                          </td>
                          <td
                            style={{
                              textAlign: "right",
                              padding: "3px 10px",
                              fontSize: "32px",
                              color: "#000000",
                            }}
                          >
                            <b> {data && data.cGst}</b>
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              textAlign: "left",
                              padding: "3px 10px",
                              fontSize: "32px",
                              color: "#000000",
                            }}
                          >
                            <b> SGST</b>
                          </td>
                          <td
                            style={{
                              textAlign: "right",
                              padding: "5px 10px",
                              fontSize: "32px",
                              color: "#000000",
                            }}
                          >
                            <b>{data && data.gst}</b>
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
                      paddingTop: "0px",
                      color: "#000000",
                      borderBottom: "1px dashed rgba(0, 0, 0, 0.5)",
                      fontSize: "32px",
                    }}
                  >
                    <table width="100%">
                      <tbody>
                        <tr>
                          <td
                            style={{
                              textAlign: "left",
                              padding: "5px 10px",
                              fontSize: "32px",
                              color: "#000000",
                            }}
                          >
                            <b>Grand Total</b>
                          </td>
                          <td
                            style={{
                              textAlign: "right",
                              padding: "5px 10px",
                              fontSize: "32px",
                              color: "#000000",
                            }}
                          >
                            <b>₹ {data && parseFloat(data.total).toFixed(2)}</b>
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              textAlign: "left",
                              padding: "5px 10px",
                              fontSize: "32px",
                              color: "#000000",
                            }}
                          >
                            <b>Payable</b>
                          </td>
                          <td
                            style={{
                              textAlign: "right",
                              padding: "5px 10px",
                              fontSize: "32px",
                              color: "#000000",
                            }}
                          >
                            <b>₹ {data && Math.round(data.total)}</b>
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
                      fontSize: "32px",
                    }}
                  >
                    <b>GSTIN - {data && data.gstNum}</b>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      color: "#000000",
                      fontSize: "32px",
                    }}
                  >
                    <b>- Thank you! -</b>
                  </td>
                </tr>
              </tbody>
            </table>{" "}
          </div>
        </div>

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
                {data && data.table && data.table.billId}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "10px" }}>
                <img src={businessLogo} style={{ maxWidth: "150px" }} />
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
                {data && data.businessAddress}
              </td>
            </tr>
            <tr
              style={{
                textAlign: "center",
                padding: "10px",
                color: "#000000",
                borderBottom: "1px solid rgba(0, 0, 0, 0.5)",
              }}
            >
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
                  borderBottom: "1px dashed rgba(0, 0, 0, 0.5)",
                }}
              >
                <table width="100%">
                  <tbody>
                    <tr>
                      <td style={{ textAlign: "left", padding: "3px 10px" }}>
                        {date()}
                      </td>
                      <td style={{ textAlign: "right", padding: "3px 10px" }}>
                        {data && data.table ? data.table.table_name : null}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "3px 10px" }}>
                        {formatAMPM(new Date())}
                      </td>
                      <td style={{ textAlign: "right", padding: "3px 10px" }}>
                        {data && data.employee}
                      </td>
                    </tr>
                    {/* <td style={{ textAlign: "left", padding: "3px 10px" }}>
                        Copy : 1
                      </td>{" "} */}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr
              style={{
                textAlign: "center",
                padding: "10px",
                color: "#000000",
                borderBottom: "1px rgba(0, 0, 0, 0.5)",
              }}
            >
              <td style={{ textAlign: "left", padding: "3px 10px" }}>
                Order ID : {data && data.table && data.table.orderId}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  padding: "10px",
                  color: "#000000",
                  borderBottom: "1px dashed rgba(0, 0,0, 0.5)",
                }}
              >
                <table width="100%">
                  <tbody>
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          padding: "5px 10px 10px 10px",
                        }}
                      >
                        <b>Item</b>
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          padding: "5px 10px 10px 10px",
                        }}
                      >
                        <b>Qty</b>
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          padding: "5px 10px 10px 10px",
                        }}
                      >
                        <b>Price</b>
                      </td>
                      <td></td>
                    </tr>
                    {billItems1}
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
                  bottomBorder: "1px dashed rgba(0, 0, 0, 0.5)",
                }}
              >
                <table width="100%">
                  <tbody>
                    <tr>
                      <td style={{ textAlign: "left", padding: "3px 10px" }}>
                        Subtotal
                      </td>
                      <td style={{ textAlign: "right", padding: "3px 10px" }}>
                        ₹{data && data.subTotal}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "3px 10px" }}>
                        Total Discount (
                        {parseFloat(
                          (data && data.table.total_discount) || 0
                        ).toFixed(2) || "0"}
                        %)
                      </td>
                      <td style={{ textAlign: "right", padding: "3px 10px" }}>
                        ₹
                        {((data &&
                          data.subTotal *
                            parseFloat(
                              (data && data.table.total_discount) || 0
                            ).toFixed(2)) ||
                          "0") / 100}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "3px 10px" }}>
                        Discount
                      </td>
                      <td style={{ textAlign: "right", padding: "3px 10px" }}>
                        {data ? data.discount : `-`}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "3px 10px" }}>
                        Extra charges
                      </td>
                      <td style={{ textAlign: "right", padding: "3px 10px" }}>
                        {data ? data.tax : `-`}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "3px 10px" }}>
                        Packaging charges
                      </td>
                      <td style={{ textAlign: "right", padding: "3px 10px" }}>
                        -
                      </td>
                    </tr>

                    <tr>
                      <td style={{ textAlign: "left", padding: "3px 10px" }}>
                        CGST
                      </td>
                      <td style={{ textAlign: "right", padding: "3px 10px" }}>
                        {data && data.cGst}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "3px 10px" }}>
                        SGST
                      </td>
                      <td style={{ textAlign: "right", padding: "5px 10px" }}>
                        {data && data.gst}
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
                  paddingTop: "0px",
                  color: "#000000",
                  borderBottom: "1px dashed rgba(0, 0, 0, 0.5)",
                }}
              >
                <table width="100%">
                  <tbody>
                    <tr>
                      <td style={{ textAlign: "left", padding: "5px 10px" }}>
                        <b>Grand Total</b>
                      </td>
                      <td style={{ textAlign: "right", padding: "5px 10px" }}>
                        <b>₹ {data && parseFloat(data.total).toFixed(2)}</b>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", padding: "5px 10px" }}>
                        <b>Payable</b>
                      </td>
                      <td style={{ textAlign: "right", padding: "5px 10px" }}>
                        <b>₹ {data && Math.round(data.total)}</b>
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
                GSTIN - {data && data.gstNum}
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
          </tbody>
        </table>
      </div>
      {/* </div> */}
    </div>
  );
});

const Print = ({ data }) => {
  const componentRef = useRef();
  const [isSettle, setIsSettle] = useState(false);
  const dispatch = useContext(dispatchContext);
  useEffect(() => {
    setIsSettle(data.isSettle);
  }, []);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handleClose = () => {
    dispatch({
      type: "BillViewModalHide",
    });
  };
  return (
    <>
      <BillModal data={data} ref={componentRef} />
      {isSettle && (
        <div className="w-100-row kotsettle_btn">
          <span className="btn add_ord" onClick={handlePrint}>
            <a href="#" data-toggle="modal" data-target="#add_edit_position">
              Print Bill
            </a>
          </span>
          <span className="btn view_ord" onClick={handleClose}>
            Cancel
          </span>
        </div>
      )}
    </>
  );
};

export default Print;
