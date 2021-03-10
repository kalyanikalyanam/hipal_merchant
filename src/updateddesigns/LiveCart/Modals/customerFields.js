import React, { useState } from 'react'
import AutoSuggest from 'react-autosuggest'

const CustomerFields = ({index, register, customers, customer}) => {
    const [nameSuggestions, setNameSuggestion] = useState([])
    const [numberSuggestions, setNumberSuggestion] = useState([])
    const [name, setName] = useState(customer && customer.name)
    const [number, setNumber] = useState(customer && customer.phone)
    const handleNameChange = (e, {newValue}) => {
        setName(newValue)
    }
    const handleNumberChange = (e, {newValue}) => {
        setNumber(newValue)
    }

    const escapeRegexCharacters = (str) => {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    }
    const getSuggestions = (value) => {
        const escapedValue = escapeRegexCharacters(value)
        const regex = new RegExp('^' + escapedValue, 'i')
        return customers.filter(customer => regex.test(customer.name) || regex.test(customer.phone))
    }

    const onNameSuggestionsFetched = ({value}) => {
        setNameSuggestion(getSuggestions(value))
    }
    const onNumberSuggestionsFetched = ({value}) => {
        setNumberSuggestion(getSuggestions(value))
    }

    const handleNameSuggestionSelected = (e, {suggestion}) => {
        setName(suggestion.name)
    }
    const handleNumberSuggestionSelected = (e, {suggestion}) => {
        setNumber(suggestion.phone)
    }

    const handleNameSuggestionClear = () => {
        setNameSuggestion([])
    }
    const handleNumberSuggestionClear = () => {
        setNumberSuggestion([])
    }

    const renderSuggetion = (suggestion) => (
        <span>`${suggestion.name} - ${suggestion.phone}`</span>
    )
    const getNameSuggestionValue = (suggestion) => {
        return suggestion.name
    }
    const getNumberSuggestionValue = (suggestion) => {
        return suggestion.phone
    }


    const nameProps = {
        autoComplete: "none",
        placeholder: "Name",
        value: name,
        className: 'form-control',
        onChange: handleNameChange,
        name: `${index + 1} customerName`,
        ref: register,
    }
    const numberProps = {
        autoComplete: "none",
        placeholder: "Number",
        value: number,
        className: 'form-control',
        onChange: handleNumberChange,
        name: `${index + 1} customerNumber`,
        ref: register
    }
    
    return (
        <div className="col-12 w-100-row">
            <div className="w-10 no">{`${index + 1}`}
                <div className="w-45 field">
                    <div className="form-group">
                        <AutoSuggest
                            suggestions={nameSuggestions}
                            onSuggestionsFetchRequested={onNameSuggestionsFetched}
                            onSuggestionsClearRequested={handleNameSuggestionClear}
                            onSuggestionSelected={handleNameSuggestionSelected}
                            inputProps={nameProps}
                            getSuggestionValue={getNameSuggestionValue}
                            renderSuggestion={renderSuggetion}
                            inputProps={nameProps}
                        />
                    </div>
                </div>
                <div className="w-45 field">
                    <div className="form-group">
                        <AutoSuggest
                            suggestions={numberSuggestions}
                            onSuggestionsFetchRequested={onNumberSuggestionsFetched}
                            onSuggestionsClearRequested={handleNumberSuggestionClear}
                            onSuggestionSelected={handleNumberSuggestionSelected}
                            getSuggestionValue={getNumberSuggestionValue}
                            renderSuggestion={renderSuggetion}
                            inputProps={numberProps}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerFields 