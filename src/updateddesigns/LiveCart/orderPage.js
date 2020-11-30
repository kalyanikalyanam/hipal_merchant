import React, { useContext, useEffect, useState } from "react";
import { dispatchContext, tableContext } from "./contexts";
import OrderItem from './orderItem'

const Orders = () => {
  const [orderList, setOrderList] = useState()
  const [total, setTotal] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [tax, setTax] = useState(0)
  const [kotNum, setKotNum] = useState(0);
  const [id, setId] = useState()
  const [cartId, setCartId] = useState()

  const dbRef = useContext(tableContext);
  const dispatch = useContext(dispatchContext)

  const handleKOTCart = async () => {
    let table = await dbRef.get()
    let arr = []
    var order = table.data().orders
    for(var i = 0; i < order.length; i++){
      let it = order[i]
      if(it.status === "NotKot") arr.push(it)
      it.status = "cooking"
    }
    dispatch({
      type: "KOTModalShow",
      items: arr 
    })
    await dbRef.update({
      orders: order
    })
  };


  useEffect(() => {
    let unsubscribe
    const getOrders = async () => {
      if (dbRef) {
        const table = await dbRef.get()
        setOrderList(table.data().orders)
        setId(table.data().orderId)
        setCartId(table.data().liveCartId)
        unsubscribe = dbRef.onSnapshot(table => {
          setOrderList(table.data().orders)
          setId(table.data().orderId)
          setCartId(table.data().liveCartId)
        })
      }
    }
    getOrders()
    return unsubscribe
  }, [dbRef])
  useEffect(() => {
    if(orderList){
      let total = 0, discount = 0, tax = 0, kot = 0
      orderList.forEach(item => {
        if (item.status !== 'NotKot') {
          kot++
        }
        total += item.price * item.quantity
        discount += item.price * item.discount / 100 * item.quantity
        tax += item.tax * item.price / 100 * item.quantity
      })
      setKotNum(kot)
      setTotal(parseFloat(total).toFixed(2))
      setDiscount(parseFloat(discount).toFixed(2))
      setTax(parseFloat(tax).toFixed(2))
    }
  }, [orderList])


  const check = () => {
    let flag = true
    orderList.forEach((item) => {
      if (item.status === "NotKot") flag = false
    })
    return flag
  }

  const handleBillThis = async () => {
    if(!check()){
      alert("All Items must have Kot")
    } else {
      let table = await dbRef.get()    
      let billItem = table.data().bill
      if(!billItem) billItem = []
      if(billItem.length === 0) {
        var id = Math.floor(Math.random() * 100000000)
        dbRef.update({
          billId: id
        })
      }
      let orders = table.data().orders
      billItem.push(...orders)
      dbRef.update({
        orders: [],
        bill: billItem
      })
      dispatch({
        type: "setBillPage",
        select: 3 
      })
    }
  }

  return (
    <div className="order_id_cart_box col-md-12 m-t-20">
      <p className="order_id_cart">Order ID {id && id} </p>
      <div className="cart_scroll_box">
        <div className="cart2_box col-md-12 m-t-20">
          <span className="ribbon_cart">
            {kotNum}/{orderList && orderList.length}
          </span>
          <div className="cart2_row">
            <div className="cart_head">
              Cart {1} ID:{cartId && cartId}
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
                 index={index}
                 dbRef={dbRef}
                 key={index}
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
              <span className="left">Extra Charges</span>{" "}
              <span className="right">0</span>
            </p>
            <p>
              <span className="left tax">Tax & Charges</span>{" "}
              <span className="right">₹ {parseFloat(tax).toFixed(2)}</span>
            </p>
            <p>
              <span className="left discount">Discount (free delivery)</span>{" "}
              <span className="right discount">₹ {parseFloat(discount).toFixed(2)}</span>
            </p>
            <p className="m-t-15">
              <span className="left grandtotal_font">Grand Total</span>{" "}
              <span className="right grand_font">
                {" "}
                ₹{parseFloat(total - parseFloat(discount) + parseFloat(tax)).toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="w-100-row kotsettle_btn">
        <span className="btn add_ord " onClick={handleKOTCart}>
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
