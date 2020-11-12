import React, { useRef,useContext, useState, useCallback }from 'react'
import LiveCartItem from './LiveCartItem'
import {liveCartContext, dispatchContext} from './contexts'
import * as actions from './actionTypes'


const LiveCartPage = () => {
    const totalPrice = useRef()
    const totalDiscount = useRef()
    const cartId= useRef()
    const cartList=useContext(liveCartContext)
    const dispatch = useContext(dispatchContext)
    const [, updateState] = useState()
    const forceUpdate = useCallback(() =>  updateState({}), [])
    const handleCancel = () => {
        dispatch({
            type: actions.REMALLLIVE
        })
    }
    const onChange = () => {
        forceUpdate()
    }
    const handleSettle = () => {
        dispatch({
            type: actions.SENDTOORDER,
            cartId: cartId.current,
            cartDiscount: totalDiscount.current,
            cartPrice: totalPrice.current,
            id: Date.now().toString()
        })
    }
    totalPrice.current = 0
    totalDiscount.current = 0 
    cartId.current=(Math.round((new Date().getTime() / 10000)));
    return (
        <div className="order_id_cart_box col-md-12 m-t-20">
            <div className="cart_scroll_box">
                <div className="cart2_box col-md-12 m-t-20 active_box">
                    <span className="ribbon_cart">{cartList ? cartList.length: "0"}</span>
                    <div className="cart2_row">
                        <div className="cart_head">
                            <span>Cart ID : {cartId.current}</span>
                        </div>
                        <div className="kot_box livecart_head">
                            Live Cart
                        </div>
                    </div>
                    <div className="cart_scroll no_height">
                    {cartList && cartList.map((item, index) => {
                        const price = parseInt((item.quantity) * (item.price))
                        totalPrice.current += (price)
                        totalDiscount.current += (item.discount * item.quantity)
                        return(<LiveCartItem item={item} index={index} key={index} onChange={onChange}/>)
                    })}
                    </div>
                </div>
            </div>
            <div className="cart1_box col-md-12">
                <div className="expand_menu_cart"><span><img src="/images/icon/downarrow_cartexapand.png" /></span></div>
                <div className="cart_scroll">
                    <div className="cart_total_row">
                        <p className="m-t-15"><span className="left grandtotal_font">Grand Total</span> <span className="right grand_font"> ₹{parseFloat(totalPrice.current - totalDiscount.current).toFixed(2)}</span></p>
                    </div>
                </div>
            </div>
            <div className="w-100-row kotsettle_btn">
                <span className="btn add_ord kot cancel">
                    <a href="#" onClick={handleCancel}>
                        Cancel</a></span>
                <span className="btn view_ord" onClick ={handleSettle}><a href="#" data-toggle="modal" data-target="#add_edit_position">Settle</a> </span>
            </div>
        </div>
    )
}
export default LiveCartPage 