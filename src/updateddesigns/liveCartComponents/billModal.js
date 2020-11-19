import React, { useEffect, useState, useRef, useContext } from 'react'
import {tableContext, dispatchContext} from './contexts'
import BillItem from './billItem'

const BillModal = ({data}) => {
    const [businessLogo, setBusinessLogo] = useState();
    const [isSettle, setIsSettle] = useState(false)
    const [bill, setBill] = useState()
    const dispatch = useContext(dispatchContext)
    const [employee, setEmployee] = useState()
    const billIdRef = useRef();
    const grandTotal = useRef(0.0);
    const table = useContext(tableContext);
    billIdRef.current = Math.round(new Date().getTime() / 10000);
    useEffect(() => {
        setBill(data.bill.bill)
        setEmployee(data.bill.employee)
        setIsSettle(data.isSettle)
        setBusinessLogo(sessionStorage.getItem("BusinessLogo"));
    }, [])
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
          type: 'billModalHide'
      })
  }
  const handleSettle = () => {
      dispatch({
          type: 'billModalHide'
      })
  }
  const billItems =
    bill && bill.length !== 0
      ? bill.map((order, index) => {
          return <BillItem order={order} key={index} />;
        })
      : noItem;
   return (
        <>
          <table width="100%" style={{ display: "table" }}>
          <button onClick={handleClose}>close</button>
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
        {isSettle && <div className="w-100-row kotsettle_btn">
          <span className="btn add_ord ">
            <a href="#" data-toggle="modal" data-target="#add_edit_position">
                Print Bill
            </a>
          </span>
          <span className="btn view_ord" onClick={handleSettle}>
                  Settle
          </span>
        </div>}
    </>

   ) 
}

export default BillModal