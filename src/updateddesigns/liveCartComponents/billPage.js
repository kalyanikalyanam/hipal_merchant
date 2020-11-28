import React, { useContext, useEffect, useState } from "react";
import { db } from "../../config";
import BillItem from "./billItem";
import {
  BalanceContext,
  billContext,
  dispatchContext,
  EmployeeContext,
  tableContext,
  billPageContext,
  orderContext,
} from "./contexts";
import * as actions from "./actionTypes";
import { Toast } from "reactstrap";
const BillPage = () => {
  const [businessLogo, setBusinessLogo] = useState();
  const [total, setTotal] = useState(0);
  const [gst] = useState(8.75);
  const [cGst] = useState(8.75);
  const dispatch = useContext(dispatchContext);
  const table = useContext(tableContext);
  const balance = useContext(BalanceContext);
  const bill = useContext(billContext);
  const employee = useContext(EmployeeContext);
  const order = useContext(orderContext);
  const handleSettle = async () => {
    let newBillPage = bill;
    newBillPage.id = bill.id;
    newBillPage.bill = bill;
    newBillPage.totalPrice = total;
    newBillPage.employee = employee;
    newBillPage.gst = gst;
    newBillPage.cGst = cGst;
    console.log(newBillPage);
    let orderId = [];

    let billItems = [];
    newBillPage.bill.forEach((order) => {
      orderId.push(order.id);
      order.forEach((cart) => {
        cart.forEach((item) => {
          console.log(item);
          billItems.push(item);
        });
      });
    });

    let Bill = {
      settle_by: employee,
      billId: bill.id,
      billAmount: total,
      billTiming: new Date().toLocaleString(),
      table: table.table_name,
      businessId: table.businessId,
      billItems,
      orderId,
    };
    dispatch({
      type: "billModalShow",
      isSettle: true,
      bill: newBillPage,
    });
    try {
      const temp = table.status.split(" ");
      var Table2;
      console.log(temp);
      if (temp[0] === "Table") {
        Table2 = temp[4];
        db.collection("tables")
          .where("businessId", "==", table.businessId)
          .where("table_name", "==", Table2)
          .limit(1)
          .get()
          .then((query) => {
            const thing = query.docs[0];

            thing.ref.update({
              status: "Vacant",
              customers: [],
            });
          });
      }
      await db.collection("bills").add(Bill);
      db.collection("tables").doc(table.id).update({
        status: "Vacant",
        customers: [],
        occupency: "0",
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    setBusinessLogo(sessionStorage.getItem("BusinessLogo"));
    let Total = bill.totalPrice;
    let temp = 0

    Total += bill.totalPrice * gst / 100
    temp = bill.totalPrice * cGst / 100
    Total += temp
    setTotal(Total);
    dispatch({
      type: actions.SETBILLID,
      billId: bill.id,
      bill: bill,
      total: Math.round(Total),
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

  const handleBIllView = (data) => {
    console.log(bill);
    let newBillPage = bill;
    newBillPage.id = bill.id;
    newBillPage.bill = bill;
    newBillPage.totalPrice = total;
    newBillPage.employee = employee;
    newBillPage.gst = gst;
    newBillPage.cGst = cGst;

    dispatch({
      type: "billModalShow",
      isSettle: false,
      bill: newBillPage,
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
  const billItems =
    bill && bill.length !== 0
      ? bill.map((item, index) => {
          return (
            <BillItem
              item={item}
              key={index}
            />
          );
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
                  {bill && bill.id}
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
                        <td style={{textAlign: "left", padding:"3px 10px"}}>Order ID: {bill.orderId}</td>     </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center", padding: "10px", color: "#000000", borderBottom: "1px dashed rgba(0, 0,0, 0.5)" }}>
                  <table width="100%">
                    <tbody>
                      <tr>
                        <td style={{ textAlign: 'left', padding: '5px 10px 10px 10px' }}><b>Item</b></td>
                        <td style={{ textAlign: 'center', padding: '5px 10px 10px 10px' }}><b>Qty</b></td>
                        <td style={{ textAlign: 'right', padding: '5px 10px 10px 10px' }}><b>Price</b></td>
                        <td>
                        </td>
                      </tr>
                      {billItems}
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr >
                  <td style={{textAlign: "center", padding:"10px", color: "#000000", bottomBorder: "1px dashed rgba(0, 0, 0, 0.5)"}}>
                  <table width="100%">
                    <tbody>
                      <tr>
                        <td style={{ textAlign: 'left', padding: '3px 10px' }}>Subtotal</td>
                        <td style={{ textAlign: 'right', padding: '3px 10px' }}>₹ {bill.totalPrice}</td>
                      </tr>
                      <tr>
                        <td style={{ textAlign: 'left', padding: '3px 10px' }}>Offer</td>
                        <td style={{ textAlign: 'right', padding: '3px 10px' }}>-{bill.totalDiscount}</td>
                      </tr>
                      <tr>
                        <td style={{ textAlign: 'left', padding: '3px 10px' }}>Extra charges</td>
                        <td style={{ textAlign: 'right', padding: '3px 10px' }}>-</td>
                      </tr>
                      <tr>
                        <td style={{ textAlign: 'left', padding: '3px 10px' }}>Packaging charges</td>
                        <td style={{ textAlign: 'right', padding: '3px 10px' }}>-</td>
                      </tr>
                      <tr>
                        <td style={{ textAlign: 'left', padding: '3px 10px' }}>GST</td>
                        <td style={{ textAlign: 'right', padding: '5px 10px' }}>8.75</td>
                      </tr>
                      <tr>
                        <td style={{ textAlign: 'left', padding: '3px 10px' }}>CGST</td>
                        <td style={{ textAlign: 'right', padding: '3px 10px' }}>8.75</td>
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
                          <b>₹ {parseFloat(total).toFixed(2)}</b>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ textAlign: "left", padding: "5px 10px" }}>
                          <b>Payable</b>
                        </td>
                        <td style={{ textAlign: "right", padding: "5px 10px" }}>
                          <b>₹ {Math.round(total)}</b>
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
            {/* <a href="#" data-toggle="modal" data-target="#add_edit_position" >
              Bill View
            </a> */}
            <a
              href="#"
              type="button"
              data-dismiss="modal"
              onClick={handleBIllView}
            >
              Bill View
            </a>
          </span>
          {sessionStorage.getItem("role") == "Merchant" ||
          sessionStorage.getItem("settle") == "Yes" ? (
            <>
              {balance === 0 && bill.length !== 0 ? (
                <span className="btn view_ord" onClick={handleSettle}>
                  <a href="#">Settle</a>
                </span>
              ) : (
                <span className="btn view_ord">
                  <a href="#">Settle</a>
                </span>
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
export default BillPage;
