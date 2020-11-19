import { db } from "../../config";
import React, { useEffect, useState, useRef, useContext } from "react";
import { tableContext, dispatchContext, billPageContext } from "./contexts";
import BillItem from "./billItem";
import * as actions from "./actionTypes";

const BillModal = ({ data }) => {
  const [businessLogo, setBusinessLogo] = useState();
  const [isSettle, setIsSettle] = useState(false);
  const [bill, setBill] = useState();
  const dispatch = useContext(dispatchContext);
  const billPage = useContext(billPageContext);
  const tableData = useContext(tableContext);
  const [employee, setEmployee] = useState();
  const billIdRef = useRef();
  const grandTotal = useRef(0.0);
  const table = useContext(tableContext);
  billIdRef.current = Math.round(new Date().getTime() / 10000);
  useEffect(() => {
    setBill(data.bill.bill);
    setEmployee(data.bill.employee);
    setIsSettle(data.isSettle);
    setBusinessLogo(sessionStorage.getItem("BusinessLogo"));
  }, []);
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
  const handleClose = () => {
    dispatch({
      type: "billModalHide",
    });
  };
  const handleSettle = async () => {
    let bill = {
      settle_by: employee,
      billId: billPage.billId,
      billAmount: billPage.totalPrice,
      billTiming: new Date().toLocaleString(),
      table: tableData.table_name,
      businessId: tableData.businessId,
    };
    try {
      const temp = tableData.status.split(" ");
      var Table2;
      console.log(temp);
      if (temp[0] === "Table") {
        Table2 = temp[4];
        db.collection("tables")
          .where("businessId", "==", tableData.businessId)
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
      const res = await db.collection("bills").add(bill);
      db.collection("tables").doc(tableData.id).update({
        status: "Vacant",
        customers: [],
        occupency: "0",
      });

      console.log(res);
    } catch (e) {
      console.log(e);
    }
    dispatch({
      type: "reset",
    });
  };
  const billItems =
    bill && bill.length !== 0
      ? bill.map((order, index) => {
          return <BillItem order={order} key={index} />;
        })
      : noItem;
  return (
    <>
      <button onClick={handleClose}>close</button>
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
      </div>{" "}
      {isSettle && (
        <div className="w-100-row kotsettle_btn">
          <span className="btn add_ord ">
            <a href="#" data-toggle="modal" data-target="#add_edit_position">
              Print Bill
            </a>
          </span>
          <span className="btn view_ord" onClick={handleSettle}>
            Settle
          </span>
        </div>
      )}
    </>
  );
};

export default BillModal;
