import React from 'react'

const billPage = () => {
    return(
        <div className="order_id_cart_box col-md-12 m-t-20 bg-w m-b-20">
            <div className="width-100 bill_scroll">
                <table width="100%">
                    <tbody><tr>
                        <td style={{ textAlign: 'center', padding: '10px', color: '#000000', borderBottom: '1px solid rgba(0, 0, 0, 0.5)' }}><b style={{ paddingRight: '10px' }}>BILL ID</b>  2133456</td>
                    </tr>
                        <tr>
                            <td style={{ textAlign: 'center', padding: '10px' }}>
                                <img src="/images/logo_coffe_cup.png" />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center', padding: '10px', color: '#000000' }}>
                                12, Sainikpuri, Kapra,<br /> Secunderabad, Telangana 500094</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center', padding: '10px', color: '#000000' }}><b>DINE IN</b></td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center', padding: '10px', color: '#000000', borderBottom: '1px dashed rgba(0, 0, 0, 0.5)' }}>
                                <table width="100%">
                                    <tbody><tr>
                                        <td style={{ textAlign: 'left', padding: '3px 10px' }}>Wed, May 27, 2020</td>
                                        <td style={{ textAlign: 'right', padding: '3px 10px' }}>Table 7A</td>
                                    </tr>
                                        <tr>
                                            <td style={{ textAlign: 'left', padding: '3px 10px' }}>09:23:45 AM</td>
                                            <td style={{ textAlign: 'right', padding: '3px 10px' }}>S. Varun</td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'left', padding: '3px 10px' }}>Order ID : 45635453462</td>
                                            <td style={{ textAlign: 'right', padding: '3px 10px' }}>Copy : 1</td>
                                        </tr>
                                    </tbody></table>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center', padding: '10px', color: '#000000', borderBottom: '1px dashed rgba(0, 0, 0, 0.5)' }}>
                                <table width="100%">
                                    <tbody><tr>
                                        <td style={{ textAlign: 'left', padding: '5px 10px 10px 10px' }}><b>Item</b></td>
                                        <td style={{ textAlign: 'center', padding: '5px 10px 10px 10px' }}><b>Qty</b></td>
                                        <td style={{ textAlign: 'right', padding: '5px 10px 10px 10px' }}><b>Price</b></td><td>
                                        </td></tr>
                                        <tr>
                                            <td style={{ textAlign: 'left', padding: '3px 10px' }}>Item 1</td>
                                            <td style={{ textAlign: 'center', padding: '3px 10px' }}>1</td>
                                            <td style={{ textAlign: 'right', padding: '3px 10px' }}>399.00</td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'left', padding: '3px 30px' }}>Item 2</td>
                                            <td style={{ textAlign: 'center', padding: '3px 30px' }}>1</td>
                                            <td style={{ textAlign: 'right', padding: '3px 30px' }}>499.00</td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'left', padding: '3px 10px' }}>Item 1</td>
                                            <td style={{ textAlign: 'center', padding: '3px 10px' }}>1</td>
                                            <td style={{ textAlign: 'right', padding: '3px 10px' }}>599.00</td>
                                        </tr>
                                    </tbody></table>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center', padding: '10px', color: '#000000', borderBottom: '1px dashed rgba(0, 0, 0, 0.5)' }}>
                                <table width="100%">
                                    <tbody><tr>
                                        <td style={{ textAlign: 'left', padding: '3px 10px' }}>Subtotal</td>
                                        <td style={{ textAlign: 'right', padding: '3px 10px' }}>₹ 1197</td>
                                    </tr>
                                        <tr>
                                            <td style={{ textAlign: 'left', padding: '3px 10px' }}>Offer</td>
                                            <td style={{ textAlign: 'right', padding: '3px 10px' }}>-100</td>
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
                            <td style={{ textAlign: 'center', padding: '10px', color: '#000000', borderBottom: '1px dashed rgba(0, 0, 0, 0.5)' }}>
                                <table width="100%">
                                    <tbody><tr>
                                        <td style={{ textAlign: 'left', padding: '5px 10px' }}><b>Total</b></td>
                                        <td style={{ textAlign: 'right', padding: '5px 10px' }}><b>₹ 1097.58</b></td>
                                    </tr>
                                        <tr>
                                            <td style={{ textAlign: 'left', padding: '5px 10px' }}><b>Grand Total</b></td>
                                            <td style={{ textAlign: 'right', padding: '5px 10px' }}><b>₹ 1098</b></td>
                                        </tr>
                                    </tbody></table>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center', padding: '10px', color: '#000000' }}>
                                - Thank you! -
                </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center', padding: '10px', color: '#000000' }}>
                                GSTIN - 456AEW453462
                </td>
                        </tr>
                    </tbody></table>
            </div>
        </div>
    )
}
export default billPage