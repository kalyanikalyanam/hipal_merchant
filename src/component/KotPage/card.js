import React, { useEffect, useState } from 'react'
import { db } from '../../config'


const Card = ({kot}) => {
    const [items, setItmes] = useState()
    const [table, setTable] = useState()
    useEffect(() => {
        var unsubscribe
        const getTable = async () => {
            const table = await db
                          .collection('table')
                          .doc(kot.tableId)
                          .get()

            setTable({...table.data(),id: table.id})
            unsubscribe = db
                            .collection('table')
                            .doc(kot.tableId)
                            .onSnapshot(table => setTable({...table.data(), id: table.id}))
        }
        getTable()
        return unsubscribe
    }, [kot])

    return (
        <div className="box-kot">
            <div className="kot-card">
                <div className="headrow">
                    <h1>
                        {`${kot && kot.type}`}
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
                    <span>Table {kot && kot.tableName}</span>
                    <span>0:44</span>
                </div>

                <div className="waiterrow">Waiter: {table && table.employee}</div>

                <div className="iteamsrow-gray">
                    <span>Items</span>
                    <span>0/2</span>
                </div>

                <div className="iteamsrow">
                    <div className="w-15">
                        <i className="far fa-square"></i>
                    </div>
                    <div className="w-70">
                        <h5>Pepporoni Pizza(Large)</h5>
                        <p>+ Cheese Burst</p>
                        <p>+ Mushrooms</p>
                        <p>+ Green Peppers</p>
                    </div>
                    <div className="w-15 text-right">
                        x<span className="bigfont">2</span>
                    </div>
                </div>

                <div className="iteamsrow">
                    <div className="w-15">
                        <i className="far fa-square"></i>
                    </div>
                    <div className="w-70">
                        <h5>Loaded Nachos(full)</h5>
                    </div>
                    <div className="w-15 text-right">
                        x<span className="bigfont">2</span>
                    </div>
                </div>

                <div className="iteamsrow text-center">
                    <button type="button" className="btn">
                        Served
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card