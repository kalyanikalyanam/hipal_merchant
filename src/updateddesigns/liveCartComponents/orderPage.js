import React, { useContext, useRef} from 'react'
import OrderItem from './orderItem'
import {dispatchContext, orderContext} from './contexts'
import * as actions from './actionTypes'

const Orders = () => {
    const orderList = useContext(orderContext)
    const dispatch = useContext(dispatchContext)
    const orderId = useRef()
    const totalPrice = useRef()
    const totalDiscount= useRef()
    const handleKOT = () => {
        dispatch({
            type: actions.SENDTOBILL,
            orderId: orderId.current,
            orderDiscount: totalDiscount.current,
            orderPrice: totalPrice.current
        })
    }
    const handleCancel = () => {
        dispatch({
            type: actions.REMALLORDER
        })
    }
    totalDiscount.current = 0
    totalPrice.current = 0
    orderId.current=(Math.round((new Date().getTime() / 10000)));
    return (
    <div className="order_id_cart_box col-md-12 m-t-20">
            <p className="order_id_cart">Order ID {orderId.current} </p>
            <div className="cart_scroll_box">
                {orderList && orderList.map((cart, index) => {
                    totalDiscount.current += cart.cartDiscount
                    totalPrice.current += cart.cartPrice
                    return(
                            <OrderItem cart={cart} key={index} cartNo={index + 1} index={index} />
                    )
                })}
            </div> 
            <div className="cart1_box col-md-12">
                <div className="expand_menu_cart"><span><img src="/images/icon/downarrow_cartexapand.png" /></span></div>
                    <div className="cart_scroll">
                        <div className="cart_total_row">
                            <p><span className="left discount">10% Applied</span> <span className="right discount">₹ 00</span></p>
                            <p><span className="left">Extra Charges</span> <span className="right">0</span></p>
                            <p><span className="left tax">Tax & Charges</span> <span className="right">₹ 00</span></p>
                            <p><span className="left discount">Discount (free delivery)</span> <span className="right discount">₹ {totalDiscount.current}</span></p>
                            <p className="m-t-15"><span className="left grandtotal_font">Grand Total</span> <span className="right grand_font"> ₹{totalPrice.current-totalDiscount.current }.00</span></p>
                        </div>
                    </div>
                </div>
            <div className="w-100-row kotsettle_btn">
                <span className="btn add_ord " onClick={handleKOT}>
                    <a href="#" data-toggle="modal" data-target="#add_edit_position">KOT</a>
                </span>
                <span className="btn view_ord">
                    <a href="#" onClick={handleCancel}>
                        Cancel</a>
                </span>
            </div>
        </div>
    )
}

export default Orders