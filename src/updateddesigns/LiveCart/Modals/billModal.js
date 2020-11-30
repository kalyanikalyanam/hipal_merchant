import React, { useEffect, useState, useRef, useContext } from "react";
import { dispatchContext,} from "../contexts";
import BillItem from "../billItem";
import { useReactToPrint } from "react-to-print";

const BillModal = React.forwardRef(({ data }, ref) => {
  const dispatch = useContext(dispatchContext)
  const [businessLogo, setBusinessLogo] = useState();
  useEffect(() => {
    setBusinessLogo(sessionStorage.getItem("BusinessLogo"))
  }, [])
  const handleClose = () => {
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
                  }}
                >
                  <b style={{ paddingRight: "10px" }}>BILL ID</b>{" "}
                  {data && data.table && data.table.bill.billId }
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
                          09:23:45 AM
                        </td>
                        <td style={{ textAlign: "right", padding: "3px 10px" }}>
                          {data && data.employee}
                        </td>
                      </tr>
                          <td
                            style={{ textAlign: "left", padding: "3px 10px" }}
                          >
                           Copy : 1 
                          </td>{" "}
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr style = {{textAlign: "center",padding:"10px", color: "#000000", borderBottom: "1px rgba(0, 0, 0, 0.5)"}}>
                  <td style ={{textAlign: "left", padding: "3px 10px"}}>Order ID : {data && data.table && data.table.orderId}</td>
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
                  }}
                >
                  <table width="100%">
                    <tbody>
                      <tr>
                        <td style={{ textAlign: "left", padding: "3px 10px" }}>
                          Subtotal
                        </td>
                        <td style={{ textAlign: "right", padding: "3px 10px" }}>
                          ₹ {data && data.subTotal}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ textAlign: "left", padding: "3px 10px" }}>
                          Offer
                        </td>
                        <td style={{ textAlign: "right", padding: "3px 10px" }}>
                          -{data && data.totalDiscount}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ textAlign: "left", padding: "3px 10px" }}>
                          Extra charges
                        </td>
                        <td style={{ textAlign: "right", padding: "3px 10px" }}>
                          -
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
                          GST
                        </td>
                        <td style={{ textAlign: "right", padding: "5px 10px" }}>
                          8.75
                        </td>
                      </tr>
                      <tr>
                        <td style={{ textAlign: "left", padding: "3px 10px" }}>
                          CGST
                        </td>
                        <td style={{ textAlign: "right", padding: "3px 10px" }}>
                          8.75
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
  const handleClose = () => {
    dispatch({
      type: "BillViewModalHide",
    });
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
    <div onClick={handleClose}>
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
      </div>
    </>
  );
};

export default Print;
