import React, { useContext, useEffect, useState } from "react";
import { db } from "../../config";
import BillItem from "./billItem";
import {
  dispatchContext,
  tableContext,
  balanceContext,
  stateContext,
} from "./contexts";

const BillPage = () => {
  const [businessId, setBusinessId] = useState();
  const [businessLogo, setBusinessLogo] = useState();
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [table, setTable] = useState();
  const [gst, setGst] = useState(0);
  const [cGst, setCgst] = useState(0);
  const [gstNum, setGstNum] = useState(0);
  const [businessAddress, setBusinessAddress] = useState();

  const balance = useContext(balanceContext);
  const dispatch = useContext(dispatchContext);
  const dbRef = useContext(tableContext);
  const state = useContext(stateContext);

  useEffect(() => {
    const businessId = sessionStorage.getItem("businessId");
    setBusinessLogo(sessionStorage.getItem("BusinessLogo"));
    setBusinessId(businessId);
  }, []);

  useEffect(() => {
    var unsubscribe;
    const getGST = async () => {
      const snapshot = await db
        .collection("businessdetails")
        .doc(businessId)
        .get();
      setCgst(snapshot.data().business_cgst_value);
      setGst(snapshot.data().business_gst_value);
      setGstNum(snapshot.data().business_gst_number);
      setBusinessAddress(snapshot.data().business_address);
      unsubscribe = db
        .collection("businessdetails")
        .doc(businessId)
        .onSnapshot((snapshot) => {
          setCgst(snapshot.data().business_cgst_value);
          setGst(snapshot.data().business_gst_value);
          setGstNum(snapshot.data().business_gst_number);
          setBusinessAddress(snapshot.data().business_address);
        });
    };
    if (businessId) getGST();
    return unsubscribe;
  }, [businessId]);
  useEffect(() => {
    let unsubscribe;
    const getTable = async () => {
      const table = await dbRef.get();
      setTable(table.data());

      unsubscribe = dbRef.onSnapshot((table) => {
        setTable(table.data());
      });
    };
    getTable();
    return unsubscribe;
  }, [dbRef]);
  useEffect(() => {
    if (table) {
      let bill = table.bill;
      let subTotal = 0,
        discount = 0,
        tax = 0;
      if (!bill) bill = [];
      bill.forEach((item) => {
        subTotal += item.price * item.quantity;
        discount += ((item.price * item.discount) / 100) * item.quantity;
        tax += ((item.price * item.tax) / 100) * item.quantity;
      });
      let totalDiscount = 0;
      totalDiscount =
        (subTotal * parseFloat(table.total_discount || 0).toFixed(2) || "0") /
        100;
      setSubTotal(subTotal);
      setTax(tax);
      setDiscount(discount);
      setTotalDiscount(totalDiscount);
    }
  }, [table]);

  useEffect(() => {
    let total = subTotal + tax - discount - totalDiscount;
    let temp = total;
    total += (total * gst) / 100;
    total += (temp * cGst) / 100;
    setTotal(total);
    dispatch({
      type: "SetBalance",
      balance: {
        balance: Math.round(total),
        total: Math.round(total),
        gst,
        cGst,
      },
    });
  }, [subTotal, tax, discount, gst, cGst]);
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
  const handleSettle = async () => {
    if (table.bill.length === 0) {
      alert("no Items in the bill");
      return;
    }
    if (table.status.split(" ")[0] === "Merge") {
      return;
    }
    if (balance.balance != 0) {
      alert("Balance Must be 0 before Settling");
    } else {
      console.log(table);
      const bill = {
        bill: table.bill,
        employee: table.currentEmployee,
        PaymentDetails: state.details,
        billId: table.billId,
        orderId: table.orderId,
        customers: table.customers,
        tablename: table.table_name,
        tableTotalDiscount: table.total_discount
          ? table.total_discount
          : "0.00",
        businessId: businessId,
        gst: gst,
        cgst: cGst,
        address: businessAddress,
        logo: businessLogo,
        gstNumber: gstNum,
        date: Date.now(),
      };
      if (bill.customers.length === 0) {
        const ref = await db
          .collection("settings_default_customers")
          .where("businessId", "==", businessId)
          .limit(1)
          .get();
        ref.forEach((doc) => {
          bill.customers.push({
            name: doc.data().customer_name,
            phone: doc.data().customer_phonenumber,
          });
        });
      }
      await db.collection("bills").add(bill);

      dispatch({
        type: "BillViewModalShow",
        data: {
          table: table,
          employee: table.currentEmployee,
          total,
          subTotal,
          discount,
          tax,
          gst,
          cGst,
          isSettle: true,
          gstNum,
          businessAddress,
        },
      });
      await dbRef.update({
        bill: [],
        liveCart: [],
        order: [],
        customers: [],
        status: "Vacant",
        occupency: 0,
        currentEmployee: "",
        billId: null,
        orderId: null,
        liveCartId: null,
        total_discount: "0.00",
      });
      dispatch({
        type: "setBillPage",
        select: 1,
      });
    }
  };

  const handleBIllView = () => {
    dispatch({
      type: "BillViewModalShow",
      data: {
        table: table,
        employee: table.currentEmployee,
        total,
        subTotal,
        discount,
        tax,
        gst,
        cGst,
        gstNum,
        businessAddress,
        isSettle: false,
        occupency: 0,
      },
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
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + AmPm;
    return strTime;
  };

  const billItems =
    table && table.bill && table.bill.length !== 0
      ? table.bill.map((item, index) => {
          return <BillItem item={item} key={index} />;
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
                  {table && table.billId}
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  <img
                    src={businessLogo && businessLogo}
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
                  {businessAddress && businessAddress}
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
                          {table ? table.table_name : null}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ textAlign: "left", padding: "3px 10px" }}>
                          {formatAMPM(new Date())}
                        </td>
                        <td style={{ textAlign: "right", padding: "3px 10px" }}>
                          {table && table.currentEmployee}
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
                  Order ID : {table && table.orderId}
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
                          ₹ {subTotal && subTotal}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ textAlign: "left", padding: "3px 10px" }}>
                          Total Discount(
                          {parseFloat(
                            (table && table.total_discount) || 0
                          ).toFixed(2) || "0"}
                          %)
                          {/* ({table && table.total_discount}%) */}
                        </td>
                        <td style={{ textAlign: "right", padding: "3px 10px" }}>
                          ₹ {totalDiscount && totalDiscount}
                        </td>
                      </tr>

                      <tr>
                        <td style={{ textAlign: "left", padding: "3px 10px" }}>
                          Discount
                        </td>
                        <td style={{ textAlign: "right", padding: "3px 10px" }}>
                          {discount ? discount : `-`}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ textAlign: "left", padding: "3px 10px" }}>
                          Extra charges
                        </td>
                        <td style={{ textAlign: "right", padding: "3px 10px" }}>
                          {tax ? tax : `-`}
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
                          {cGst && cGst}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ textAlign: "left", padding: "3px 10px" }}>
                          SGST
                        </td>
                        <td style={{ textAlign: "right", padding: "5px 10px" }}>
                          {gst && gst}
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
                  GSTIN - {gstNum}
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
        <div className="w-100-row kotsettle_btn">
          <span className="btn add_ord ">
            <a
              href="#"
              type="button"
              data-dismiss="modal"
              onClick={handleBIllView}
            >
              Bill View
            </a>
          </span>
          <span className="btn view_ord" onClick={handleSettle}>
            <a href="#">Settle</a>
          </span>
        </div>
      </div>
    </>
  );
};
export default BillPage;
