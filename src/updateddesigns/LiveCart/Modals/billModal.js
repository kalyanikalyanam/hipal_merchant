import React, { useEffect, useState, useRef, useContext } from "react";
import { dispatchContext } from "../contexts";
import BillItem from "../billItem";
import ReactToPrint, { useReactToPrint } from "react-to-print";

const BillModal = React.forwardRef(({ data }, ref) => {
  const dispatch = useContext(dispatchContext);
  const [businessLogo, setBusinessLogo] = useState();
  useEffect(() => {
    setBusinessLogo(sessionStorage.getItem("BusinessLogo"));
  }, []);
  const handleClose = () => {
    console.log("here")
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
          return <BillItem item={item} key={index} />;
        })
      : noItem;
  return (
    <div width="100%" ref={ref}>
      <div className="modal-dialog modal-sm hipal_pop" role="document">
        <button onClick={handleClose}>Close</button>
        <table width="100%" style={{ display: "table" }}>
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
                <b style={{ paddingRight: "10px", fontSize: "30px" }}>
                  BILL ID
                </b>{" "}
                {data && data.table && data.table.bill.billId}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  padding: "10px",
                  fontSize: "30px",
                }}
              >
                <img
                  src={businessLogo}
                  style={{ maxWidth: "150px", fontSize: "30px" }}
                />
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  padding: "10px",
                  color: "#000000",
                  fontSize: "30px",
                }}
              >
                <b>
                  {" "}
                  12, Sainikpuri, Kapra,
                  <br /> Secunderabad, Telangana 500094
                </b>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  padding: "10px",
                  color: "#000000",
                  fontSize: "30px",
                }}
              >
                <b style={{ fontSize: "30px" }}>DINE IN</b>
              </td>
            </tr>
            <tr style={{ padding: "0px", fontSize: "30px" }}>
              <td
                style={{
                  textAlign: "center",
                  padding: "10px",
                  paddingBottom: "0px",
                  color: "#000000",
                  borderBottom: "1px dashed rgba(0, 0, 0, 0.5)",
                  fontSize: "30px",
                }}
              >
                <table width="100%">
                  <tbody>
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          padding: "3px 10px",
                          fontSize: "30px",
                        }}
                      >
                        <b style={{ fontSize: "30px" }}> {date()}</b>
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          padding: "3px 10px",
                          fontSize: "30px",
                        }}
                      >
                        <b style={{ fontSize: "30px" }}>
                          {" "}
                          {data && data.table ? data.table.table_name : null}
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          padding: "3px 10px",
                          fontSize: "30px",
                        }}
                      >
                        09:23:45 AM
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          padding: "3px 10px",
                          fontSize: "30px",
                        }}
                      >
                        {data && data.employee}
                      </td>
                    </tr>
                    {/* <td
                      style={{
                        textAlign: "left",
                        padding: "3px 10px",
                        fontSize: "30px",
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
                fontSize: "30px",
              }}
            >
              <td
                style={{
                  textAlign: "left",
                  padding: "3px 10px",
                  fontSize: "30px",
                }}
              >
                <b style={{ fontSize: "30px" }}>
                  Order ID : {data && data.table && data.table.orderId}
                </b>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  padding: "10px",
                  color: "#000000",
                  borderBottom: "1px dashed rgba(0, 0,0, 0.5)",
                  fontSize: "30px",
                }}
              >
                <table width="100%">
                  <tbody>
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          padding: "5px 10px 10px 10px",
                          fontSize: "30px",
                        }}
                      >
                        <b style={{ fontSize: "30px" }}>Item</b>
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          padding: "5px 10px 10px 10px",
                          fontSize: "30px",
                        }}
                      >
                        <b style={{ fontSize: "30px" }}>Qty</b>
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          padding: "5px 10px 10px 10px",
                          fontSize: "30px",
                        }}
                      >
                        <b style={{ fontSize: "30px" }}>Price</b>
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
                  fontSize: "30px",
                }}
              >
                <table width="100%">
                  <tbody>
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          padding: "3px 10px",
                          fontSize: "30px",
                        }}
                      >
                        <b style={{ fontSize: "30px" }}>Subtotal</b>
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          padding: "3px 10px",
                          fontSize: "30px",
                        }}
                      >
                        <b style={{ fontSize: "30px" }}>
                          {" "}
                          ₹ {data && data.subTotal}
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          padding: "3px 10px",
                          fontSize: "30px",
                        }}
                      >
                        <b style={{ fontSize: "30px" }}>Offer</b>
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          padding: "3px 10px",
                          fontSize: "30px",
                        }}
                      >
                        <b style={{ fontSize: "30px" }}>
                          {" "}
                          -{data ? data.discount : `-`}
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          padding: "3px 10px",
                          fontSize: "30px",
                        }}
                      >
                        <b style={{ fontSize: "30px" }}> Extra charges</b>
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          padding: "3px 10px",
                          fontSize: "30px",
                        }}
                      >
                        -{data ? data.tax : `-`}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          padding: "3px 10px",
                          fontSize: "30px",
                        }}
                      >
                        <b style={{ fontSize: "30px" }}>Packaging charges</b>
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          padding: "3px 10px",
                          fontSize: "30px",
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
                          fontSize: "30px",
                        }}
                      >
                        <b style={{ fontSize: "30px" }}> GST</b>
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          padding: "5px 10px",
                          fontSize: "30px",
                        }}
                      >
                        <b style={{ fontSize: "30px" }}>{data && data.gst}</b>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          padding: "3px 10px",
                          fontSize: "30px",
                        }}
                      >
                        <b style={{ fontSize: "30px" }}> CGST</b>
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          padding: "3px 10px",
                          fontSize: "30px",
                        }}
                      >
                        <b style={{ fontSize: "30px" }}> {data && data.cGst}</b>
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
                  fontSize: "30px",
                }}
              >
                <table width="100%">
                  <tbody>
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          padding: "5px 10px",
                          fontSize: "30px",
                        }}
                      >
                        <b style={{ fontSize: "30px" }}>Grand Total</b>
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          padding: "5px 10px",
                          fontSize: "30px",
                        }}
                      >
                        <b style={{ fontSize: "30px" }}>
                          ₹ {data && parseFloat(data.total).toFixed(2)}
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          padding: "5px 10px",
                          fontSize: "30px",
                        }}
                      >
                        <b style={{ fontSize: "30px" }}>Payable</b>
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          padding: "5px 10px",
                          fontSize: "30px",
                        }}
                      >
                        <b style={{ fontSize: "30px" }}>
                          ₹ {data && Math.round(data.total)}
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
                  fontSize: "30px",
                }}
              >
                <b style={{ fontSize: "30px" }}>- Thank you! -</b>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  padding: "10px",
                  color: "#000000",
                  fontSize: "30px",
                }}
              >
                <b style={{ fontSize: "30px" }}>GSTIN - 456AEW453462</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>{" "}
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
