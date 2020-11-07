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
    const billPageshow =() => {
        dispatch({
            type: actions.BILLPAGESHOW 
        })
        setSelected(3)
    }
    const billPageHide = (num) => {
        dispatch({
            type: actions.BILLPAGEHIDE
        })
        setSelected(num)
    }
    const page = selected === 1 ? <LiveCartPage /> : selected === 2 ? <OrderPage /> :   <BillPage /> 
    return(
        <div className="col-lg-5 righ_pangap cart_box_width_2">
            <div className="btns_livecart col-md-12">
                <span className="width" onClick={() => {billPageHide(1) }} ><span className="activedot red">{cartList.length}</span><a href="#" className="btn active_item">Live Cart</a></span>
                <span className="width" onClick={() => {billPageHide(2)}}><a href="#" className="btn"> Order</a></span>
                <span className="width" onClick={() => {billPageshow()}}><a href="#" className="btn">Bill</a></span>
            </div>
            {page}
        </div>
    )
}

export default LeftSidebar 