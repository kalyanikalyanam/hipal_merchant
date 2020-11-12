import React, { useContext } from 'react'
import * as actions from './actionTypes'
import {dispatchContext} from './contexts'

const OrderItem = ({cart, index, cartNo}) => {
    const dispatch = useContext(dispatchContext)
    const handleKOTCart = () => {
        dispatch({
            type: actions.KOTCART,
            cart
        })    
    }
    const handleKOTItem = (item) => {
        dispatch({
            type:actions.KOTITEM,
            item,
            cart
        })
    }
    const select = <div>
        <select name="status">
            <option value="cooking">Cooking</option>
            <option value="delivery">Delivery</option>
            <option value="delivered">Delivered</option>
        </select>
    </div>
    return(
        <div className="cart2_box col-md-12 m-t-20">
            <span className="ribbon_cart">
                {cartNo ? cartNo : 0}/5
            </span>
            <div className="cart2_row">
                <div className="cart_head">
                    Cart {index + 1} ID:{cart.cartId}
                </div>
            <div className="kot_box" onClick={handleKOTCart}>
                <span className="btn kot">KOT</span>
            </div>
            </div>
            <div className="cart_scroll no_hieght">
            {cart && cart.map((item, index) => {
                return(
                    <div className="cart2_row" key={index}> 
                        <div className="box_1 new_size">
                            <p>{index + 1}. {item.item_name}</p>
                            <div className="w-100-row m-b-10">
                                <div className="edit" data-toggle="modal" data-target="#edit_product">Edit</div>
                                {!item.kot ? <div className="kot" onClick={() => {handleKOTItem(item)}}>KOT</div> : select}
                            </div>
                            <p className="offer_applied">10% Off Applied</p>
                        </div>
                        <div className="box_2">
                            <span>x{item.quantity}</span>
                        </div>
                        <div className="box_3">
                            <span>{item.price * item.quantity - (item.discount*item.quantity)}</span>
                            <span>00:03 min <br/>last update</span>
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}
export default OrderItem