import React, { useContext, useEffect, useRef, useState } from 'react'
import {useForm} from 'react-hook-form'
import {dispatchContext} from './contexts'
import * as actions from './actionTypes'

const AddCustomerModal = ({tableData}) => {
    const [occupency, setOccupancy] = useState(0)
    const dispatch = useContext(dispatchContext)
    const fields = useRef()
    const {handleSubmit, register, reset} = useForm({
        mode: "onChange"
    })
    const onSubmit = (data) => {
        console.log(data)
    }
    const onChange = (data) => {
        setOccupancy(data.occupency)
    }

    const handleKeyDown = (e) => {
        if (!((e.keyCode > 95 && e.keyCode < 106)
            || (e.keyCode > 47 && e.keyCode < 58)
            || e.keyCode == 8)) {
            return false;
        }
    }
    useEffect(()=> {
        reset({occupency: 0})
    }, [])
    useEffect(() => {
        fields.current = []
        for(var i = 0; i < occupency; i++){
            const field = (
                <div key={i} className="col-12 w-100-row">
                    <div className="w-10 no">{`${i + 1}`}</div>
                    <div className="w-45 field">
                        <div className="form-group">
                            <input 
                                ref={register} 
                                type="text" 
                                name={`customer ${i}`} 
                                className="form-control" 
                                key={1} 
                                placeholder="Name"
                            />
                        </div>
                    </div>
                    <div className="w-45 field">
                        <div className="form-group">
                            <input 
                                ref={register} 
                                type="text" 
                                name={`customer ${i}`} 
                                className="form-control" 
                                key={1} 
                                placeholder="Number"
                            />
                        </div>
                    </div>
                </div>
            )
            fields.current.push(field)
        }
    }, [occupency])
    const close = () => {
        dispatch({
            type: actions.ADDCUSTOMERHIDE 
        })
    }
    return (
        <div className="modal-dialog modal-sm hipal_pop" width="200px" role="document">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Add table to Table {tableData && tableData.table_name}</h5>
                </div>
                <div className="modal-body">
                    <div className="col-12 w-100-row ocupeny_no m-t-10">
                        Occupancy
                    <span>
                        <input onKeyDown={handleKeyDown} type="number" name="occupency" min="0" max={tableData && tableData.table_capacity.split(' ')[0]} ref={register} onChange={handleSubmit(onChange)} />
                    </span>
                </div>
                {fields.current}
                </div>
                <div className="modal-footer">
                    <button onClick={close} className="btn close_btn">Close</button>
                    <button type="submit" className="btn save_btn">Save</button>
                </div>
            </div></form>
        </div>
    )
}

export default AddCustomerModal