import React, { useContext, useEffect, useState } from 'react'
import { dispatchContext, stateContext, tableContext } from '../LiveCart/contexts'
import BillPage from './billPage'
import LiveCartPage from './LiveCartPage'
import OrderPage from './orderPage'

const RightSideBar = () => {
    const dbRef = useContext(tableContext)
    const dispatch = useContext(dispatchContext)
    const [items,setItems] = useState(0)
    useEffect(() => {
        if (dbRef) {
            const getData = async () => {
                const table = await dbRef.get()
                setItems(table.data().liveCart.length)
                dbRef.onSnapshot(table => {
                    setItems(table.data().liveCart.length)
                })
            }
            getData()
        }
    }, [])
    const state = useContext(stateContext)
    const billSelect = (num) => {
        dispatch({
            type: "setBillPage",
            select: num
        })
    }
    const activeClass = (num) => {
        return num === state.setBillPage ? 'btn active_item' : 'btn'
    }
    const toShow = state.setBillPage === 1 ? 
            <LiveCartPage /> : state.setBillPage === 2 ? 
                <OrderPage /> : <BillPage />
    return (
        <div className="col-lg-5 righ_pangap cart_box_width_2">
            <div className="btns_livecart col-md-12">
                <span className="width" onClick={(e) => { billSelect(1) }} >
                    <span className="activedot red">{items && items}</span>
                    <a href="#" className={activeClass(1)}>Live Cart</a>
                </span>
                <span className="width" onClick={(e) => { billSelect(2) }}>
                    <a href="#" className={activeClass(2)}> Order</a>
                </span>
                <span className="width" onClick={(e) => { billSelect(3) }}>
                    <a href="#" className={activeClass(3)}>Bill</a>
                </span>
            </div>
            {toShow}
        </div>
    )
}

export default RightSideBar