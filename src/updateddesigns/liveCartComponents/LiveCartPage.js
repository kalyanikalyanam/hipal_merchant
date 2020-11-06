import React, { useRef,useContext } from 'react'
import LiveCartItem from './LiveCartItem'
import {liveCartContext} from './contexts'


const LiveCartPage = () => {
    const totalPrice = useRef(0)
    const cartList=useContext(liveCartContext)
    return (
        <div className="order_id_cart_box col-md-12 m-t-20">
            <p className="order_id_cart">Order ID:  <span>2</span></p>
            <div className="cart_scroll_box">
                <div className="cart2_box col-md-12 m-t-20 active_box">
                    <span className="ribbon_cart">{cartList ? cartList.length: "0"}</span>
                    <div className="cart2_row">
                        <div className="cart_head">
                            <span>Cart 1 ID : 123345 </span>
                        </div>
                        <div className="kot_box livecart_head">
                            Live Cart
                        </div>
                    </div>
                    <div className="cart_scroll no_height">
                    {cartList && cartList.map((item, index) => {
                        const price = ((item.quantity) * (item.price))
                        totalPrice.current += (price)
                        return(<LiveCartItem item={item} index={index} key={index}/>)
                    })}
                    </div>
                </div>
            </div>
            <div className="cart1_box col-md-12">
                <div className="expand_menu_cart"><span><img src="/images/icon/downarrow_cartexapand.png" /></span></div>
                <div className="cart_scroll">
                    <div className="cart_total_row">
                        <p><span className="left discount">10% Applied</span> <span className="right discount">₹ 00</span></p>
                        <p><span className="left">Extra Charges</span> <span className="right">0</span></p>
                        <p><span className="left tax">Tax & Charges</span> <span className="right">₹  00</span></p>
                        <p><span className="left discount">Discount (free delivery)</span> <span className="right discount">₹ 00</span></p>
                        <p className="m-t-15"><span className="left grandtotal_font">Grand Total</span> <span className="right grand_font"> ₹{totalPrice.current}.00</span></p>
                    </div>
                </div>
            </div>
            <div className="w-100-row kotsettle_btn">
                <span className="btn add_ord kot cancel">
                    <a href="#">
                        Cancel</a></span>
                <span className="btn view_ord"><a href="#" data-toggle="modal" data-target="#add_edit_position">Settle</a> </span>
            </div>
        </div>
    )
}
export default LiveCartPage 