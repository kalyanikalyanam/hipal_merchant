import React, { useContext, useEffect, useState } from 'react'
import {dispatchContext} from './contexts'
import * as actions from './actionTypes'

const LiveCartItem = ({item, index, onChange}) => {
    const dispatch = useContext(dispatchContext)
    const [quantity, setQuantity] = useState(item.quantity)
    useEffect(() => {
        onChange()
    } ,[quantity])
    const onIncrease = () => {
        const newQ = item.quantity
        setQuantity(newQ + 1)  
        item.quantity += 1
    }
    const onDecrease= () => {
        if(item.quantity <= 1){
            return
        }
        const newQ = item.quantity
        setQuantity(newQ - 1)  
        item.quantity -= 1
    }
    const deleteItem = () => {
        console.log("here")
        dispatch({
            type: actions.REMLIVE,
            itemId: item.id 
        })
    }    
    const handleEdit = () => {
        console.log(item)
        dispatch({
            type: actions.OPENMODEL,
            item,
            editMode: true,
            id: item.id,
            formOrder: true 
        })
    }
    return (item &&
        <div className="cart2_row cart_graybg" key={index}>
            <div className="cart_controls">
                <img src="/images/icon/close_black.png" alt="remove" onClick={deleteItem} />
                <img src="/images/icon/Edit_black.png" alt="edit" onClick={handleEdit} />
            </div>
            <div className="box_1 cart_tab_head">
                <p>{index + 1}.  {item.item_name} {item.portion ? (`(${item.portion})`) : ''}</p>
            </div>

            <div className="box_2 cart_tab_width">
            <table className="cart_tab">
                <tbody>
                    <tr>
                    <td onClick={onDecrease}>-</td>
                    <td style={{background: '#fd8a36', color: '#fff'}} >x{item.quantity}</td>
                    <td onClick={onIncrease}>+</td></tr>
                </tbody>
            </table>
            <p className="last_update">00:03 min last update</p>
            {/* <span>
                <label>x</label>
                <input type="number" onKeyDown={handleKeyDown} min="1" value={item.quantity} onChange={onChangeq} style={{ width: "100%" }} />
            </span> */}
            </div>
            <div className="box_3 cart_tab_price">
                <span> {parseFloat((item.quantity) * (item.price)).toFixed(2)}</span>
                <p className="offer_applied">10% off Applied</p>
            </div>

        </div>
    )
}
export default LiveCartItem