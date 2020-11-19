import React, { useContext, useRef } from "react";
import OrderItem from "./orderItem";
import { dispatchContext, orderContext, tableContext } from "./contexts";
import * as actions from "./actionTypes";
import { FormCheck } from "react-bootstrap";
import { db } from "../../config";

const Orders = () => {
  const orderList = useContext(orderContext);
  const dispatch = useContext(dispatchContext);
  const table = useContext(tableContext);
  const orderId = useRef();

  const totalPrice = useRef();
  const totalDiscount = useRef();
  const handleKOT = () => {
    dispatch({
      type: actions.KOTORDER,
    });
  };
  const check = () => {
    let flag = true;
    orderList.forEach((cart) => {
      cart.forEach((item) => {
        if (!item.kot) flag = false;
      });
    });
    return flag;
  };
  const handleBillThis = () => {
    if (check()) {
      dispatch({
        type: actions.SENDTOBILL,
        id: orderList.id,
        orderDiscount: totalDiscount.current,
        orderPrice: totalPrice.current,
      });
      let orders = {
        orderTiming: new Date().toLocaleString(),
        orderId: orderList.id,
        orderDiscount: totalDiscount.current,
        orderPrice: totalPrice.current,
        tableName: table.table_name,
        businessId: table.businessId,
      };
      const res = db.collection("orders").add(orders);
    } else {
      alert("All items must be KOT or removed from the order");
    }
  };
  totalDiscount.current = 0;
  totalPrice.current = 0;
  orderId.current = Math.round(new Date().getTime() / 10000);
  return (
    <div className="order_id_cart_box col-md-12 m-t-20">
      <p className="order_id_cart">Order ID {orderList.id} </p>
      <div className="cart_scroll_box">
        {orderList &&
          orderList.map((cart, index) => {
            totalDiscount.current += cart.cartDiscount;
            totalPrice.current += cart.cartPrice;
            return (
              <OrderItem
                cart={cart}
                key={index}
                cartNo={index + 1}
                index={index}
              />
            );
          })}
      </div>
      <div className="cart1_box col-md-12">
        <div className="expand_menu_cart">
          <span>
            <img src="/images/icon/downarrow_cartexapand.png" />
          </span>
        </div>
        <div className="cart_scroll">
          <div className="cart_total_row">
            <p>
              <span className="left discount">10% Applied</span>{" "}
              <span className="right discount">₹ 00</span>
            </p>
            <p>
              <span className="left">Extra Charges</span>{" "}
              <span className="right">0</span>
            </p>
            <p>
              <span className="left tax">Tax & Charges</span>{" "}
              <span className="right">₹ 00</span>
            </p>
            <p>
              <span className="left discount">Discount (free delivery)</span>{" "}
              <span className="right discount">₹ {totalDiscount.current}</span>
            </p>
            <p className="m-t-15">
              <span className="left grandtotal_font">Grand Total</span>{" "}
              <span className="right grand_font">
                {" "}
                ₹
                {parseFloat(totalPrice.current - totalDiscount.current).toFixed(
                  2
                )}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="w-100-row kotsettle_btn">
        <span className="btn add_ord " onClick={handleKOT}>
          <a href="#" data-toggle="modal" data-target="#add_edit_position">
            KOT For All
          </a>
        </span>
        <span className="btn view_ord">
          <a href="#" onClick={handleBillThis}>
            BillThis
          </a>
        </span>
      </div>
    </div>
  );
};

export default Orders;
