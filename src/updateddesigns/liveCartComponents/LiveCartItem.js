import React, { useContext, useEffect } from 'react'
import {dispatchContext} from './contexts'
import * as actions from './actionTypes'

const LiveCartItem = ({item, index}) => {
    const dispatch = useContext(dispatchContext)
    const deleteitem = (itemId) => {
        console.log("here")
        dispatch({
            type: actions.REMLIVE,
            itemId
        })
    }
    return (item &&
        <div className="cart2_row" key={index}>
            <div className="box_1">
                <p>{index + 1}.  {item.item_name}</p>
                <div className="w-100-row m-b-10">
                    <div className="edit" data-toggle="modal" data-target="#edit_product">edit</div>
                </div>
                <p className="offer_applied">10% off applied</p>
            </div>

            <div className="box_2">
                <span>x{item.quantity}</span>
            </div>
            <div className="box_3">
                <span> {parseFloat((item.quantity) * (item.item_price)).toFixed(2)}</span>
                <span>00:03 min <br></br>last update</span>
            </div>
            <div className="box_4">
                <span onClick={() => deleteitem(item.item_id)}
                    id={item.itemid}><img src="/images/icon/cross_red.png" /></span>
            </div>

        </div>
    )
}
export default LiveCartItem