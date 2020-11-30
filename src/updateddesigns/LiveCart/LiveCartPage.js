import React, { useContext, useEffect, useState } from 'react'
import { tableContext } from './contexts'
import LiveCartItem from './LiveCartItem'
import firebase from "../../config";

const LiveCartPage = () => {
    const dbRef = useContext(tableContext)
    const [items, setItems] = useState([])
    const [total, setTotal] = useState(0)
    const [id, setId] = useState()
    const [discount, setDiscount] = useState(0)
    const [tax, setTax] = useState(0)
    useEffect(() => {
        let unsubscribe
        const getData = async () => {
            if (dbRef) {
                const table = await dbRef.get()
                const items = table.data().liveCart
                setId(table.data().liveCartId)
                setItems(items)
                unsubscribe = dbRef.onSnapshot(table => {
                    setItems(table.data().liveCart)
                    setId(table.data().liveCartId)
                })
            }
        }
        getData()
        return unsubscribe
    }, [dbRef])

    useEffect(() => {
        if(items){
            let total = 0, discount = 0,tax = 0
            items.forEach(item => {
                total += item.price * item.quantity
                discount += item.price * item.discount / 100 
                tax += item.tax * item.price / 100
                
            })
            setTotal(parseFloat(total).toFixed(2))
            setDiscount(parseFloat(discount).toFixed(2))
            setTax(parseFloat(tax).toFixed(2))
        }
    } , [items])
    const handleCancel = () => {
        dbRef.update({
            liveCart: []
        })
    }
    const handleSettle = async () => {
        let table = await dbRef.get()    
        if(!table.data().customers || table.data().customers.length === 0){
            alert('Select Customers First')
        } else if (table.data().currentEmployee === ""){
            alert('Select Employee First')
        }
        else {
            let liveCartItems = table.data().liveCart
            let orders = table.data().orders
            if(!orders)  orders = []
            if(orders.length === 0){
                var id = Math.floor(Math.random() * 100000000)
                dbRef.update({
                    orderId: id
                })
            }
            orders.push(...liveCartItems)
            dbRef.update({
                orders, 
                liveCart: []
            })
        }
    }
    return (
        <div className="order_id_cart_box col-md-12 m-t-20">
            <div className="cart_scroll_box">
                <div className="cart2_box col-md-12 m-t-20 active_box">
                    <span className="ribbon_cart">
                        {items ? items.length : "0"}
                    </span>
                    <div className="cart2_row bdr-none">
                        <div className="cart_head">
                            <span>Cart ID : {id ? id : 0}</span>
                        </div>
                        <div className="kot_box livecart_head">Live Cart</div>
                    </div>
                    <div className="cart_scroll no_height">
                        {items &&
                            items.map((item, index) => {
                                return (
                                    <LiveCartItem
                                        item={item}
                                        index={index}
                                        key={index}
                                        dbRef={dbRef}
                                    />
                                );
                            })}
                    </div>
                </div>
            </div>
            <div className="cart1_box col-md-12">
                <div className="expand_menu_cart">
                    <span>
                        <img src="/images/icon/downarrow_cartexapand.png" />
                    </span>
                </div>
                <div className="cart_scroll">
                    <div className="cart_total_row">
                        <p className="m-t-15">
                            <span className="left grandtotal_font">Grand Total</span>{" "}
                            <span className="right grand_font">
                                {" "}
                ₹
                {total ? total - discount : "0"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-100-row kotsettle_btn">
                <span className="btn add_ord kot cancel">
                    <a href="#" onClick={handleCancel}>
                        Cancel
          </a>
                </span>
                <span className="btn view_ord" onClick={handleSettle}>
                    <a href="#" data-toggle="modal" data-target="#add_edit_position">
                        Confirm
          </a>{" "}
                </span>
            </div>
        </div>
    )
}

export default LiveCartPage