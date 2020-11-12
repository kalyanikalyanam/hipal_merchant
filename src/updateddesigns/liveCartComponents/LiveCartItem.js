import React, { useContext, useEffect, useState } from 'react'
import {dispatchContext} from './contexts'
import * as actions from './actionTypes'

const LiveCartItem = ({item, index, onChange}) => {
    const dispatch = useContext(dispatchContext)
    const [quantity, setQuantity] = useState(item.quantity)
    useEffect(() => {
        onChange()
    } ,[quantity])
    const onChangeq = (e) => {
        setQuantity(e.target.value)
        item.quantity = parseInt(e.target.value)
    }
    const deleteitem = (itemId) => {
        console.log("here")
        dispatch({
            type: actions.REMLIVE,
            itemId
        })
    }    
    const handleEdit = () => {
        console.log(item)
        dispatch({
            type: actions.OPENMODEL,
            item,
            editMode: true,
            id: item.id,
            formOrder: false
        })
    }
    const handleKeyDown = (e) => {
        if (!((e.keyCode > 95 && e.keyCode < 106)
            || (e.keyCode > 47 && e.keyCode < 58)
            || e.keyCode == 8)) {
            return false;
        }
    }
    return (item &&
        <div className="cart2_row" key={index}>
            <div className="box_1">
                <p>{index + 1}.  {item.item_name} {item.portion ? (`(${item.portion})`) : ''}</p>
                <div className="w-100-row m-b-10" onClick={handleEdit}>
                    <div className="edit" data-toggle="modal" data-target="#edit_product">edit</div>
                </div>
                <p className="offer_applied">10% off applied</p>
            </div>

            <div className="box_2">
            <span>
                <label>x</label>
                <input type="number" onKeyDown={handleKeyDown} min="1" value={item.quantity} onChange={onChangeq} style={{ width: "100%" }} />
            </span>
            </div>
            <div className="box_3">
                <span> {parseFloat((item.quantity) * (item.price)).toFixed(2)}</span>
                <span>00:03 min <br></br>last update</span>
            </div>
            <div className="box_4">
                <span onClick={() => deleteitem(item.id)}
                    id={item.itemid}><img src="/images/icon/cross_red.png" alt="close"/></span>
            </div>

        </div>
    )
}
export default LiveCartItem