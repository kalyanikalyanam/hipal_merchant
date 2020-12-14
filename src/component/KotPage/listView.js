import React, { useEffect, useState } from 'react'
import { db } from '../../config'

const ListView = () => {
    const [kotItems, setKotItems] = useState()
    useEffect(() => {
        let unsubscribe
        const businessId = sessionStorage.getItem("businessId")
        console.log(businessId)
        const getData = async () => {
            let start = new Date()
            start.setHours(0,0,0,0)
            let end = new Date()
            end.setHours(23,59,59,999)
            const ref = db
                .collection("kotItems")
                .where("businessId", "==", businessId)
            try {
                const querySnapshot = await ref.get()
                let kotItems = []
                querySnapshot.forEach(doc => {
                    kotItems.push({ id: doc.id, ...doc.data()})
                })
                kotItems.filter(item => item.createdOn > start && item.createdOn < end)
                setKotItems(kotItems)
            }
            catch (e){
                console.log(e)
            }
            unsubscribe = ref.onSnapshot(querySnapshot => {
                let kotItems = []
                querySnapshot.forEach(doc => {
                    kotItems.push({ id: doc.id, ...doc.data()})
                })
                kotItems.filter(item => item.createdOn > start && item.createdOn < end)
                setKotItems(kotItems)
            })
        }
        getData()
    }, [])
    return (
        <>
            <div className="col-md-12 p-0">
                <div className="kot-table_row head">
                    <div className="databox td1"></div>
                    <div className="databox td2">Order Type</div>
                    <div className="databox td3">Table No</div>
                    <div className="databox td4">Table status</div>
                    <div className="databox td5">Last Update</div>
                    <div className="databox td6">Fulfilment Status</div>
                    <div className="databox td7">Order ID</div>
                    <div className="databox td8">View Order</div>
                </div>

                <div className="kot-table_row bg-trans  p-10">
                    <span className="bg text-left">- New -</span>
                </div>

                {kotItems && kotItems.map((kot, index) => {
                    let ready = 0
                    kot.items.forEach(item => {
                        if (item.status === 'Done') {
                            ready++
                        }
                    })
                    return (
                        <div className="kot-table_row" key={index}>
                            <div className="databox td1">
                                <span>
                                    <i
                                        className="fa fa-circle dinein_color"
                                        aria-hidden="true"
                                    ></i>
                                </span>
                            </div>
                            <div className="databox td2">{kot.type}</div>
                            <div className="databox td3">Table {kot.tableName}</div>
                            <div className="databox td4">
                                <span>{ready === kot.items.length ?
                                    <span className="served-color">Served</span> : 
                                        "Cooking"
                                    }
                                </span>
                            </div>
                            <div className="databox td5">6 Mins</div>
                            <div className="databox td6">{`${ready} / ${kot.items.length}`}</div>
                            <div className="databox td7">{kot.orderId}</div>
                            <div className="databox td8">
                                <span
                                    className="btn view_order_btn_td padd_kot"
                                    data-toggle="modal"
                                    data-target="#view_table"
                                >
                                    View
                        </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default ListView