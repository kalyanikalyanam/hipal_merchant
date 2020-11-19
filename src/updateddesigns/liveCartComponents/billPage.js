import React, { useContext, useRef, useEffect, useState } from "react";
import BillItem from "./billItem";
import {
  billContext,
  dispatchContext,
  EmployeeContext,
  tableContext,
} from "./contexts";
import * as actions from "./actionTypes";
const BillPage = () => {
  const [businessLogo, setBusinessLogo] = useState();
  const billIdRef = useRef();
  const dispatch = useContext(dispatchContext);
  const table = useContext(tableContext);
  const bill = useContext(billContext);
  const employee = useContext(EmployeeContext);
  const grandTotal = useRef(0.0);
  useEffect(() => {
    setBusinessLogo(sessionStorage.getItem("BusinessLogo"));
    console.log(bill);
    billIdRef.current = Math.round(new Date().getTime() / 10000);
    grandTotal.current = Object.values(bill).reduce(
      (r, { orderPrice }) => r + orderPrice,
      0
    );
    dispatch({
      type: actions.SETBILLID,
      billId: billIdRef.current,
      totalBill: Math.round(grandTotal.current),
      bill: bill,
    });
  }, []);
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
  const billItems =
    bill && bill.length !== 0
      ? bill.map((order, index) => {
          return <BillItem order={order} key={index} />;
        })
      : noItem;
  return (
    <>
      <div className="order_id_cart_box col-md-12 m-t-20 bg-w m-b-20">
        <div className="width-100 bill_scroll">
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
                  {billIdRef.current}
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
                    borderBottom: "1px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <table width="100%">
                    <tbody>
                      <tr>
                        <td style={{ textAlign: "left", padding: "3px 10px" }}>
                          {date()}
                        </td>
                        <td style={{ textAlign: "right", padding: "3px 10px" }}>
                          {table ? table.table_name : null}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ textAlign: "left", padding: "3px 10px" }}>
                          09:23:45 AM
                        </td>
                        <td style={{ textAlign: "right", padding: "3px 10px" }}>
                          {employee}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              {billItems}
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
                          <b>₹ {parseFloat(grandTotal.current).toFixed(2)}</b>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ textAlign: "left", padding: "5px 10px" }}>
                          <b>Payable</b>
                        </td>
                        <td style={{ textAlign: "right", padding: "5px 10px" }}>
                          <b>₹ {Math.round(grandTotal.current)}</b>
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
        <div className="w-100-row kotsettle_btn">
          <span className="btn add_ord ">
            <a href="#" data-toggle="modal" data-target="#add_edit_position">
              Bill View
            </a>
          </span>
          <span className="btn view_ord">
            <a href="#">Settle</a>
          </span>
        </div>
      </div>
    </>
  );
};
export default BillPage;
