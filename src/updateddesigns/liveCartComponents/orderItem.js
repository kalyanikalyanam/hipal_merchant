import React from 'react'


const OrderItem = ({item}) => {
    return(
        <div>
            <div><span>{item.name}</span></div>
        </div>
    )
}

export default OrderItem