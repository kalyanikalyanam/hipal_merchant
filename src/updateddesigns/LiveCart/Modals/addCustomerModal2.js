import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { db } from '../../../config'
import { dispatchContext, tableContext } from '../contexts'

const AddCustomerModal = () => {
    const dispatch = useContext(dispatchContext)
    const dbRef = useContext(tableContext)
    const [customersList, setCustomersList] = useState()
    const [currentCustomers, setCurrentCustomers] = useState()
    const [occupency, setOccupency] = useState(0)

    const {handleSubmit, getValues, errors, setErrors, register, setValue} = useForm({
        mode: "onBlur"
    })
    useEffect(() => {
        const getCustomers = async () => {
            const querySnapshot= await db 
                .collection("customers")
                .where("businessId", "==", sessionStorage.getItem("businessId"))
                .get()
            
            let customersList = []
            querySnapshot.forEach(childSnapshot => {
                customersList.push({...childSnapshot.data(), id: childSnapshot.id})
            })
            setCustomersList(customersList)
        }

        const getCurrentCustomers = async () => {
            let querySnapshot = await dbRef.get()
            const currentCustomers = querySnapshot.data().customers
            const occupency = querySnapshot.data().occupency
            setCurrentCustomers(currentCustomers)
            setOccupency(occupency)
            setValue("occupency", occupency)
        }
        getCustomers()
        getCurrentCustomers()
    }, [])

    const handleChange = () => {
        if(getValues("occupency") < 0) setValue("occupency", "0")
        const occupency = getValues("occupency")
        setOccupency(occupency)
        let fields = []
        for(var i = 0; i < occupency; i++){
            let field = (
            <div>
                <input 
                    ref={register}
                    name={`${i}Name`}
                />
                <input 
                    ref={register}
                    name={`${i}Number`}
                />
            </div>
            )
            fields.push(field)
        }
        console.log(fields)
    }
    const onSubmit = (data) => {
        if(data.occupency === '0'){
            dbRef.update({
                status: "vacant"
            })
        }else {
            dbRef.update({
                status: "occupied"
            })
        }
        dispatch({
            type: "CustomerToTableModalHide"
        })
    }
    const onClose = () => {
        dispatch({
            type: "CustomerToTableModalHide"
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input 
                    placeholder="0"
                    name="occupency"
                    ref={register}
                    type="number"
                    onChange={handleChange}
                    min={0}
                />
                </div>
               <div>
                <button type="submit">Save</button>
                <button onClick={onClose}>Close</button>
               </div>
            </form>
        </div>
    )
}

export default AddCustomerModal