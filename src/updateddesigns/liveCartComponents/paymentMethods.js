import React, {useState} from 'react'
import {useForm} from 'react-hook-form'


const BillItem = ({method ,onChange}) => {
    const {handleSubmit, register} = useForm({
        mode: "onChange"
    })
    const [isSelected, setIsSelected] = useState(false)
    const handleClick = (data) => {
        if(!isSelected){
            onChange(data)
        } else {
            let obj = {}
            obj[method] = "0"
            onChange(obj)
        }
        setIsSelected(!isSelected)
        
    }
    const handleChange = (data) =>{
        if(isSelected){
            onChange(data)
        } else {
            let obj = {}
            obj[method] = "0"
            onChange(obj)
        }
    }
    return (
        <div className={`box_payment ${isSelected && "selected"}`} onClick={handleSubmit(handleClick)}>
            <p className="price">
                <input type="number" name={method} min="0" defaultValue={0} ref ={register} onChange={handleSubmit(handleChange)}/>
            </p>
            <p className="img">
                <img src="/images/icon/cash_icon.png" />
            </p>
            <p className="price_head">
                {method}
            </p>
        </div>
    )
}

export default BillItem