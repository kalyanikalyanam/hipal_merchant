import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { db } from '../../../config'
import { dispatchContext, tableContext } from '../contexts'
import AutoSuggest from 'react-autosuggest'

const MyAutoSuggest = ({id, customers}) => {
    const escapeRegexCharacter = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const [customerList, setCustomerList] = useState([])
    const [name, setName] = useState('')
    const [nameSuggestions, setNameSuggetions] = useState([])
    const [number, setNumber] = useState('')
    const [numberSuggestions, setNumberSuggestions] = useState([])

    useEffect(() => {
        setCustomerList(customers)
    }, [customers])

    const getSuggestions = value => {
        const escapeValue = escapeRegexCharacter(value.trim())
        if(escapeValue === "") return []

        const regex = new RegExp('^' +  escapeValue, 'i')
        const suggestions = customers.filter(customer => regex.test(customer.name) || regex.test(customer.phone))
        if(suggestions.length === 0){
            return [
                {isAddNew: true}
            ]
        }
    }
    const renderSuggetions = suggestion => {
        if(suggestion.isAddNew){
            return (
                <span>
                    [+] Add New <strong>{name}-{number}</strong>
                </span>
            )
        }
        return <span>{suggestion.name}-{suggestion.phone}</span>
    }

    const handleNameChange = (event, {newValue}) => setName(newValue)
    const handleNumberChange = (event, {newValue}) => setNumber(newValue)
    
    const handleNameFetch = ({value}) => setNameSuggetions(getSuggestions(value))
    const handleNumberFetch = ({value}) => setNumberSuggestions(getSuggestions(value))

    const handleNameClear = () => setName('')
    const handleNumberClear = () => setNumber('')

    const nameSelect = (event, {suggestion}) => setNumber(suggestion.phone)
    const numberSelect = (event, {suggestion}) => setName(suggestion.name)

    const nameValue = suggestion => {
        return suggestion.name 
    }
    const numberValue = suggestion => suggestion.phone

    const nameInputProps = {
        placeholder: "Name",
        value: name,
        onChange: handleNameChange,
    }

    const numberInputProps = {
        placeholder: "Number",
        value: number,
        onChange: handleNumberChange,
    }

    return (
        <div>
            <AutoSuggest
                suggestions={nameSuggestions}
                onSuggestionsFetchRequested={handleNameFetch}
                onSuggestionsClearRequested={handleNameClear}
                onSuggestionSelected={nameSelect}
                getSuggestionValue={nameValue}
                renderSuggestion={renderSuggetions}
                inputProps={nameInputProps}
            />
            <AutoSuggest
                suggestions={numberSuggestions}
                onSuggestionsFetchRequested={handleNumberFetch}
                onSuggestionsClearRequested={handleNumberClear}
                onSuggestionSelected={numberSelect}
                getSuggestionValue={numberValue}
                renderSuggestion={renderSuggetions}
                inputProps={numberInputProps}
            />
        </div>
    )
}
const AddCustomerModal = () => {
    const dispatch = useContext(dispatchContext)
    const dbRef = useContext(tableContext)
    const [fields, setFields] = useState([])
    const [customersList, setCustomersList] = useState()
    const [currentCustomers, setCurrentCustomers] = useState()
    const [occupency, setOccupency] = useState(0)

    const {handleSubmit, getValues, errors, setErrors, register, setValue} = useForm({
        mode: "onBlur"
    })
    useEffect(() => {
        const getCustomers = async () => {
            const querySnapshot=await db 
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

    useEffect(() => {
        let fields = []
        for(let i = 0; i < occupency; i++){
            let field = (
            <div key={i}>
                <MyAutoSuggest customers={customersList} />
            </div>
            )
            fields.push(field)
        }
        setFields(fields)
    }, [occupency])

    const handleBlur = i => {
        const name = getValues(`${i}Name`)
        const number = getValues(`${i}Number`)
    }

    const handleChange = () => {
        if(getValues("occupency") < 0) {
            setValue("occupency", "0")
        }
        setOccupency(getValues("occupency"))
    }

    const onSubmit = (data) => {
        console.log(data)
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
                    {fields && fields}
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