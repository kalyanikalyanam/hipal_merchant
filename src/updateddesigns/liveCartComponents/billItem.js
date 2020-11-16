import React, { useEffect, useState, useRef } from 'react'

const BillItem = ({order}) => {
    const [gst] = useState(8.75)
    const [cGst] = useState(8.75)
    const total = useRef(0)
    const discount = useRef(0)
    const getTotal = () => {
        let totalPrice = order.orderPrice
        let temp = totalPrice
        totalPrice += totalPrice * gst / 100
        totalPrice += temp *cGst / 100
        total.current = totalPrice 
        discount.current = totalPrice - order.discount 
    }
    useEffect(() => {
        getTotal()
    } , [])
    const style = {
        borderBottom:'1px dashed rgb(0, 0, 0, 0.5)',
    }
    const items = order && order.length !== 0 ? order.map((cart, cartIndex) => {
        return(
            cart.map((item, itemIndex) =>{
            return(
            <tr key={`${cartIndex}-${itemIndex}`}>
                <td style={{ textAlign: 'left', padding: '3px 10px' }}>{item.item_name}</td>
                <td style={{ textAlign: 'center', padding: '3px 10px' }}>{item.quantity}</td>
                <td style={{ textAlign: 'right', padding: '3px 10px' }}>{item.quantity* item.price}</td>
            </tr>
        )}) 
    )}) : null 
    return(
        <tr> 
            <td style={{ textAlign: 'center',  color: '#000000', width: '100%', padding: '0px 10px 0px 10px'}}>
                <table width="100%">
                <tbody widht="100%">
                    <tr style={{ width: '100%' }}>
                        <td style={style}> 
                            <table width="100%">
                                <tbody>
                                    <tr>
                                        <td style={{ textAlign: 'left', padding: '3px 10px' }}>Order ID : {order.id}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style={style}> 
                            <table width="100%">
                                <tbody>
                                        <tr>
                                            <td style={{ textAlign: 'left', padding: '5px 10px 10px 10px' }}><b>Item</b></td>
                                            <td style={{ textAlign: 'center', padding: '5px 10px 10px 10px' }}><b>Qty</b></td>
                                            <td style={{ textAlign: 'right', padding: '5px 10px 10px 10px' }}><b>Price</b></td><td>
                                            </td>
                                        </tr>
                                        {items}
                                </tbody></table>
                        </td>
                    </tr>
                    <tr>
                        <td style={style}> 
                            <table width="100%">
                                <tbody><tr>
                                    <td style={{ textAlign: 'left', padding: '3px 10px' }}>Subtotal</td>
                                    <td style={{ textAlign: 'right', padding: '3px 10px' }}>₹ {order.orderPrice}</td>
                                </tr>
                                    <tr>
                                        <td style={{ textAlign: 'left', padding: '3px 10px' }}>Offer</td>
                                        <td style={{ textAlign: 'right', padding: '3px 10px' }}>-{order.orderDiscount}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'left', padding: '3px 10px' }}>Extra charges</td>
                                        <td style={{ textAlign: 'right', padding: '3px 10px' }}>-</td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'left', padding: '3px 10px' }}>Packaging charges</td>
                                        <td style={{ textAlign: 'right', padding: '3px 10px' }}>-</td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'left', padding: '3px 10px' }}>GST</td>
                                        <td style={{ textAlign: 'right', padding: '5px 10px' }}>8.75</td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'left', padding: '3px 10px' }}>CGST</td>
                                        <td style={{ textAlign: 'right', padding: '3px 10px' }}>8.75</td>
                                    </tr>
                                </tbody></table>
                        </td>
                    </tr>
                    <tr>
                        <td> 
                            <table width="100%">
                                <tbody>
                                    <tr> 
                                        <td style={{ textAlign: 'left', padding: '5px 10px' }}><b>Total</b></td>
                                        <td style={{ textAlign: 'right', padding: '5px 10px' }}><b>₹ {total.current.toFixed(2)}</b></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
                </table>
            </td>
        </tr>
    )
}

export default BillItem