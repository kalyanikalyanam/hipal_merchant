import { registerVersion } from "firebase";
import React, { useContext, useState } from "react";
import Autosuggest from "react-autosuggest";
import { dispatchContext } from "./contexts";

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getSuggestionName(suggestion) {
  return suggestion.name;
}

function getSuggestionNumber(suggestion) {
  return suggestion.phone;
}

function renderSuggestion(suggestion) {
  return (
    <span>
      {suggestion.name} - {suggestion.phone}
    </span>
  );
}

const InputField = ({ customers, i, update, register }) => {
  const dispatch = useContext(dispatchContext);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [nameSuggestions, setNameSuggestions] = useState([]);
  const [numberSuggestions, setNumberSuggestions] = useState([]);

  const [error, setError] = useState(null);

  const getSugestions = (value) => {
    const escapedValue = escapeRegexCharacters(value.trim());
    const regex = new RegExp("^" + escapedValue, "i");
    return customers.filter(
      (customer) => regex.test(customer.name) || regex.test(customer.phone)
    );
  };

  const onNameChange = (e, { newValue }) => {
    setName(newValue);
  };
  const onNumberChange = (e, { newValue }) => {
    setNumber(newValue);
  };

  const checkName = async () => {
    var flag = false;
    await customers.forEach((customer) => {
      if (customer.name === name) {
        flag = true;
      }
    });
    if (!flag) setError("");
    else setError(null);
  };
  const checkNum = () => {
    var flag = false;
    customers.forEach((customer) => {
      if (customer.phone === number) {
        flag = true;
      }
    });
    if (!flag) setError("");
    else setError(null);
  };

  const inputPropsName = {
    type: "text",
    name: `customer-name-${i}`,
    placeholder: "Name",
    className: "form-control",
    onChange: onNameChange,
    value: name,
    autoComplete: "none",
    ref: register,
    onBlur: () => {
      checkName();
    },
  };
  const inputPropsNumber = {
    type: "text",
    name: `customer-number-${i}`,
    placeholder: "Number",
    className: "form-control",
    onChange: onNumberChange,
    value: number,
    autoComplete: "none",
    ref: register,
    onBlur: () => {
      checkNum();
    },
  };
  const namefetch = ({ value }) => {
    setNameSuggestions(getSugestions(value));
  };
  const nameclear = () => {
    setNameSuggestions([]);
  };
  const nameselect = (event, { suggestion }) => {
    setNumber(suggestion.phone);
  };

  const numberfetch = ({ value }) => {
    setNumberSuggestions(getSugestions(value));
  };
  const numberclear = () => {
    setNumberSuggestions([]);
  };
  const numberselect = (event, { suggestion }) => {
    setName(suggestion.name);
  };
  const handleAdd = () => {
    console.log(update);
    dispatch({
      type: "addUserModal",
      info: {
        name,
        number,
        update,
      },
    });
  };
  const onNotExits =
    error === null ? null : (
      <div>
        <button onClick={handleAdd}>Add User</button>
      </div>
    );
  return (
    <div key={i} className="col-12 w-100-row">
      {error && <div>{error}</div>}
      <div className="w-10 no">{`${i + 1}`}</div>
      <div className="w-45 field">
        <div className="form-group">
          <Autosuggest
            suggestions={nameSuggestions}
            onSuggestionsFetchRequested={namefetch}
            onSuggestionsClearRequested={nameclear}
            onSuggestionSelected={nameselect}
            getSuggestionValue={getSuggestionName}
            renderSuggestion={renderSuggestion}
            inputProps={inputPropsName}
          />
        </div>
      </div>
      <div className="w-45 field">
        <div className="form-group">
          <Autosuggest
            suggestions={numberSuggestions}
            onSuggestionsFetchRequested={numberfetch}
            onSuggestionsClearRequested={numberclear}
            onSuggestionSelected={numberselect}
            getSuggestionValue={getSuggestionNumber}
            renderSuggestion={renderSuggestion}
            inputProps={inputPropsNumber}
          />
        </div>
      </div>
      <div className="w-45 field">
        <div className="form-group">{onNotExits}</div>
      </div>
    </div>
  );
};

export default InputField;
