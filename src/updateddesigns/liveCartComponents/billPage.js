import React, { useContext, useRef, useEffect } from 'react'
import BillItem from './billItem'
import {billContext, dispatchContext, tableContext} from './contexts'
import * as actions from './actionTypes'
const BillPage = () => {
    const billIdRef= useRef() 
    const grandTotal= useRef(0) 
    const dispatch = useContext(dispatchContext)
    const table = useContext(tableContext)
    const bill = useContext(billContext)
    useEffect(() => {
        billIdRef.current = (Math.round((new Date().getTime() / 10000)))
        dispatch({
            type: actions.SETBILLID,
            billId: billIdRef.current
        })
    }, [])
    const handlePrice = (price) => {
        grandTotal.current += price
    }
    const noItem = (
        <tr>
            <td style={{ textAlign: 'center', padding: '10px', paddingBottom: '0px',color: '#000000', borderBottom: '1px rgba(0, 0, 0, 0.5)' }}>
                No Items Yet
            </td>
        </tr>
    )
    const date = () => {
        let today = new Date(Date.now())
        let options = {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'}
        return today.toLocaleDateString('en-US',options).toString()
        
    }
    const billItems =bill && bill.length !== 0 ? 
        bill.map((order, index) => {
            return(
                <BillItem order={order} handlePrice={handlePrice} key={index} />
            )
        }) : (noItem) 
    return(
        <div className="order_id_cart_box col-md-12 m-t-20 bg-w m-b-20">
                <div className="width-100 bill_scroll">
                    <table width="100%" style={{display: 'table'}}>
                        <tbody><tr>
                            <td style={{ textAlign: 'center', padding: '10px', color: '#000000', borderBottom: '1px solid rgba(0, 0, 0, 0.5)' }}><b style={{ paddingRight: '10px' }}>BILL ID</b>  {billIdRef.current}</td>
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
                            <tr style={{padding: '0px'}}>
                                <td style={{ textAlign: 'center', padding: '10px', paddingBottom: '0px',color: '#000000', borderBottom: '1px rgba(0, 0, 0, 0.5)' }}>
                                    <table width="100%">
                                        <tbody><tr>
                                            <td style={{ textAlign: 'left', padding: '3px 10px' }}>{date()}</td>
                                            <td style={{ textAlign: 'right', padding: '3px 10px' }}>{table ? table.table_name : null}</td>
                                        </tr>
                                            <tr>
                                                <td style={{ textAlign: 'left', padding: '3px 10px' }}>09:23:45 AM</td>
                                                <td style={{ textAlign: 'right', padding: '3px 10px' }}>S. Varun</td>
                                            </tr>
                                        </tbody></table>
                                </td>
                            </tr>
                            {billItems}
                            <tr>
                                <td style={{ textAlign: 'center', padding: '10px',paddingTop: '0px', color: '#000000', borderBottom: '1px dashed rgba(0, 0, 0, 0.5)' }}>
                                <table width="100%">
                                    <tbody>
                                    <tr>
                                        <td style={{ textAlign: 'left', padding: '5px 10px'}}><b>Grand Total</b></td>
                                        <td style={{ textAlign: 'right', padding: '5px 10px' }}><b>₹ {grandTotal.current}</b></td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'left', padding: '5px 10px'}}><b>Payable</b></td>
                                        <td style={{ textAlign: 'right', padding: '5px 10px' }}><b>₹ {grandTotal.current}</b></td>
                                    </tr>
                                    </tbody>
                                </table>
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
export default BillPage