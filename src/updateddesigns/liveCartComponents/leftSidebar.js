import React, {useContext, useState} from 'react'
import {liveCartContext, dispatchContext} from './contexts'

import LiveCartPage from './LiveCartPage'
import OrderPage from './orderPage'
import BillPage from './billPage'
import * as actions from './actionTypes'

const LeftSidebar = () => {
    const [selected, setSelected] = useState(1)
    const cartList = useContext(liveCartContext)
    const dispatch = useContext(dispatchContext)
    const billPageshow =(e) => {
        dispatch({
            type: actions.BILLPAGESHOW 
        })
        setSelected(3)
    }
    const billPageHide = (num, e) => {
        dispatch({
            type: actions.BILLPAGEHIDE
        })
        setSelected(num)
    }
    const page = selected === 1 ? <LiveCartPage /> : selected === 2 ? <OrderPage /> :   <BillPage /> 
    const activeClass = (num) => (
        selected === num ? 'btn active_item' : 'btn'
    )
    return(
        <div className="col-lg-5 righ_pangap cart_box_width_2">
            <div className="btns_livecart col-md-12">
                <span className="width" onClick={(e) => { billPageHide(1, e) }} >
                    <span className="activedot red">{cartList.length}</span>
                    <a href="#" className={activeClass(1)}>Live Cart</a>
                </span>
                <span className="width" onClick={(e) => { billPageHide(2, e) }}>
                    <a href="#" className={activeClass(2)}> Order</a>
                </span>
                <span className="width" onClick={(e) => { billPageshow(e) }}>
                    <a href="#" className={activeClass(3)}>Bill</a>
                </span>
            </div>
            {page}
        </div>
    )
}

export default LeftSidebar 