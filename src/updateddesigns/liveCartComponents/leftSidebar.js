import React, {useContext, useState} from 'react'
import LiveCartPage from './LiveCartPage'
import {liveCartContext} from './contexts'

const LeftSidebar = () => {
    const [selected, setSelected] = useState(1)
    const cartList = useContext(liveCartContext)
    const page = selected === 1 ? <LiveCartPage /> : selected === 2 ? <div>orders</div> : <div>bills</div>
    return(
        <div className="col-lg-5 righ_pangap cart_box_width_2">
            <div className="btns_livecart col-md-12">
                <span className="width" onClick={() => {setSelected(1)}} ><span className="activedot red">{cartList.length}</span><a href="#" className="btn active_item">Live Cart</a></span>
                <span className="width" onClick={() => {setSelected(2)}}><a href="#" className="btn"> Order</a></span>
                <span className="width" onClick={() => {setSelected(3)}}><a href="#" className="btn">Bill</a></span>
            </div>
            {page}
        </div>
    )
}

export default LeftSidebar 