import React, { useContext, useEffect, useState } from 'react'
import {db} from '../../../config'
import { useForm } from 'react-hook-form'
import CustomerFields from './customerFields'
import { dispatchContext, tableContext } from '../contexts'

const CustomerModal = () => {
    const dbRef = useContext(tableContext)
    const dispatch = useContext(dispatchContext)
    
    const [occupency, setOccupency] = useState(0)
    const [table, setTable] = useState()
    const [customers, setCustomers] = useState()

    const {handleSubmit, register, setValue, getValues} = useForm({
        mode: "onBlur",
    })
    const [fields, setFields] = useState(null)

    useEffect(() => {
        const getCustomers = async () => {
            const businessId = sessionStorage.getItem("businessId");
            const snapshot = await db
                .collection("customers")
                .where("businessId", "==", businessId)
                .get();
            let customers = []
            snapshot.forEach(childSnapshot => {
                const customer = {
                    id: childSnapshot.id,
                    email: childSnapshot.data().customer_email,
                    name: childSnapshot.data().customer_name,
                    phone: childSnapshot.data().customer_phonenumber,
                    username: childSnapshot.data().username,
                }
                customers.push(customer)
            })
            setCustomers(customers)

            db
                .collection("customers")
                .where("businessId", "==", businessId)
                .onSnapshot(snapshot =>{
                    let customers = []
                    console.log("here")
                    snapshot.forEach(childSnapshot => {
                        const customer = {
                            id: childSnapshot.id,
                            email: childSnapshot.data().customer_email,
                            name: childSnapshot.data().customer_name,
                            phone: childSnapshot.data().customer_phonenumber,
                            username: childSnapshot.data().username,
                        }
                        customers.push(customer)
                    })
                    setCustomers(customers)
                })
        }
        const getOccupency = async () => {
            let table= await dbRef.get()
            setTable(table.data())
            setOccupency(table.data().occupency)
        }
        getCustomers()
        getOccupency()
        let unsubscribe = dbRef.onSnapshot(table => {
            setTable(table.data())
            setOccupency(table.data().occupency)
        })
        return unsubscribe
    }, [])
    

    useEffect(() => {
        setValue("occupency", occupency)

        let fields = []
        for(var i = 0; i < occupency; i++){
            var field = (
                <div key={i}>
                    <CustomerFields
                        index={i}
                        register={register}
                        customers ={customers}
                    />
                </div>
            )
            fields.push(field)
        }
        setFields(fields)
    }, [occupency])
   

    const handleKeyDown = (e) => {
        if (
            !(
                (e.keyCode > 95 && e.keyCode < 106) ||
                (e.keyCode > 47 && e.keyCode < 58) ||
                e.keyCode == 8
            )
        ) {
            return false;
        }
    };
    const handleClose = () => {
        dispatch({
            type: "CustomerToTableModalHide",
        });
    }
    const handleSave = (data) => {
        console.log(data)
    }
    
    return (
        <form onSubmit={handleSubmit(handleSave)}>
            <div className="modal-dialog modal-sm hipal_pop" width="200px" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Add table to Table {table && table.table_name}
                        </h5>
                    </div>
                    <div className="modal-body">
                        <div className="col-12 w-100-row ocupeny_no m-t-10">
                            Occupancy
                        <span>
                                <input
                                    onKeyDown={handleKeyDown}
                                    type="number"
                                    name="occupency"
                                    min="0"
                                    max={table && table.table_capacity.split(" ")[0]}
                                    ref={register}
                                    onChange={() => { setOccupency(getValues("occupency")) }}
                                />
                            </span>
                        </div>
                        {fields && fields}
                    </div>
                    <div className="modal-footer">
                        <button onClick={handleClose} className="btn close_btn">
                            Close
                    </button>
                        <button className="btn save_btn" type="submit">
                            Save
                    </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CustomerModal 