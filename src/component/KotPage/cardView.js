import React, { useEffect, useState } from 'react'
import { db } from '../../config'


const CardView = ({kots}) => {
    const [kotItems, setKotItems] = useState([])
    useEffect(() => {
        let start = new Date()
        start.setHours(0, 0, 0, 0)
        let end = new Date()
        end.setHours(23, 59, 59, 999)
        let kotItems = kots
        kotItems.filter(item => item.createdOn > start && item.createdOn < end)
        setKotItems(kotItems)
    }, [kots])

    const handleServed = async (kot) => {
        let newKot = kot
        let newItems = newKot.items
        newItems.forEach(item => {
            item.status = "served"
        })
        await db
            .collection('kotItems')
            .doc(kot.id)
            .update(newKot)
    }
    const handleCheckMark = async (it , kot) => {
        let newKot = kot
        let newItems = newKot.items
        if(it.status === 'served'){
            newItems.forEach(item => {
                if (item.id === it.id) {
                    item.status = "Cooking"
                }
            })
        }
        else {
            newItems.forEach(item => {
                if (item.id === it.id) {
                    item.status = "served"
                }
            })
        }
        await db
            .collection('kotItems')
            .doc(kot.id)
            .update(newKot)
    }
    return (
        <div className="list-kot">
        {kotItems && kotItems.map(kot => {
            let served = false
            let ready = 0
            kot.items.forEach(item => {
                if (item.status === 'served') {
                    ready++
                }
            })
            if(ready === kot.items.length) served = true
            return (
                <div className="box-kot" key={kot.id}>
                    <div className={served ? 'kot-card selected' : 'kot-card'}>
                        <div className="headrow">
                            <h1>
                                {kot.type || "DineIn"}{" "}
                                <i
                                    className="fa fa-circle dinein_color"
                                    aria-hidden="true"
                                ></i>
                                <span>
                                    <i className="fas fa-ellipsis-v"></i>
                                </span>
                            </h1>
                        </div>

                        <div className="main-head">
                            <span>14:35 hours</span>
                            <span>0:44</span>
                        </div>

                        <div className="waiterrow">{kot.orderId || `0931280AASD90`}</div>

                        <div className="iteamsrow-gray">
                            <span>Items</span>
                            <span>{ready}/{kot.items.length}</span>
                        </div>
                        {kot.items.map(item => {
                            return (
                                <div 
                                    className={item.status === "served" ? "iteamsrow checkedrow" : "iteamsrow"} 
                                    key={item.id}
                                >
                                    <div className="w-15">
                                        <i className={item.status === "served" ? 'far fa-check-square' : 'far fa-square'} 
                                            onClick={() => handleCheckMark(item, kot)} 
                                        />
                                    </div>
                                    <div className="w-70">
                                        <h5>{item.name}</h5>
                                    </div>
                                    <div className="w-15 text-right">
                                        x<span className="bigfont">{item.quantity}</span>
                                        {item.instructions && item.instructions !== '' ? <img src="/images/icon/info-icon-new.png" /> : null}
                                    </div>
                                </div>
                            )
                        })}
                        <div className="iteamsrow text-center">
                            <button 
                                type="button" 
                                onClick = {() => {
                                    handleServed(kot)
                                }} 
                                className="btn served_kot"
                            >
                                Served
                            </button>
                        </div>
                    </div>
                </div>
            ) 
        })}
        </div>
    )
}

export default CardView