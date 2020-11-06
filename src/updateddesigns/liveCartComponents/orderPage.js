import React, { useContext } from 'react'
import {orderContext} from './contexts'

const Orders = () => {
    const orderList = useContext(orderContext)
    return (
        <div>
            <span>Bill Id</span>
            <div>
            </div>
        </div>
    )
}

export default Orders