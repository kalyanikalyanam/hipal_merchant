import React, { useContext, useEffect, useRef, useState } from "react";
import OrderItem from "./orderItem";
import { dispatchContext, orderContext, tableContext } from "./contexts";
import * as actions from "./actionTypes";
import { db } from "../../config";

const Orders = () => {
  const orderList = useContext(orderContext);
  const dispatch = useContext(dispatchContext);
  const [total, setTotal] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [kotNum, setKotNum] = useState(0);
  const table = useContext(tableContext);
  const handleKOT = () => {
    dispatch({
      type: actions.KOTCART
    });
  };
  const handleKOTCart = () => {
    dispatch({
      type: actions.KOTCART
    });
  };

  useEffect(() => {
    console.log(orderList)
    setTotal(orderList.totalPrice)
    setDiscount(orderList.totalDiscount)
    let kotTotal = 0
    orderList.forEach(item => {
      if(item.kot) kotTotal++
    })
    setKotNum(kotTotal)
  }, [orderList])
  const check = () => {
    let flag = true;
    orderList.forEach((item) => {
      if (!item.kot) flag = false;
    });
    return flag;
  };
  const handleBillThis = () => {
    if (check()) {
      dispatch({
        type: actions.SENDTOBILL,
      });
    } else {
      alert(" Allitems must be KOT or removed from the order");
    }
  };
  return (
    <div className="order_id_cart_box col-md-12 m-t-20">
      <p className="order_id_cart">Order ID {orderList.id} </p>
      <div className="cart_scroll_box">
        <div className="cart2_box col-md-12 m-t-20">
          <span className="ribbon_cart">
            {kotNum}/{orderList && orderList.length}
          </span>
          <div className="cart2_row">
            <div className="cart_head">
              Cart {1} ID:{orderList.cartId}
            </div>
            <div className="kot_box" onClick={handleKOTCart}>
              <span className="btn kot">KOT</span>
            </div>
          </div>
          {orderList &&
            orderList.map((item, index) => {
              return (
                <OrderItem
                  item={item}
                  key={index}
                  index={index}
                />
              );
            })}
        </div>
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
              <span className="right discount">₹ {parseFloat(discount).toFixed(2)}</span>
            </p>
            <p className="m-t-15">
              <span className="left grandtotal_font">Grand Total</span>{" "}
              <span className="right grand_font">
                {" "}
                ₹{parseFloat(total - discount).toFixed(2)}
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
