import React, { useContext, useState } from 'react'
import {useForm} from 'react-hook-form'
import {dispatchContext} from './contexts'
import * as actions from './actionTypes'
import LoginForm from './login'

const ModalForm = (props) => {
    const {register, handleSubmit, errors, reset} = useForm()
    const [item, setItem] = useState(props.item) 
    const {authenticated, setAuthenticated} = useState(false)
    const dispatch = useContext(dispatchContext)
    const handleRadioChange = (e) => {

    }
    const onClose = () => {
        dispatch({
            type: actions.CLOSEMODEL
        })
    }
    const onSubmit = (data) => {
        const items = JSON.parse(JSON.stringify(item))
        if(data.portion){
            items.price= parseInt(data.portion)
        } else {
            items.price = parseInt(items.item_price)
        }
        items.quantity = data.quantity
        items.discount = items.price * data.item_discount / 100
        items.status = data.item_status
        items.item_instructions = data.instructions
        console.log(items)
        dispatch({
            type: actions.ADDLIVE,
            item: items 
        })
    }
    const portions = item && item.portions === 'Yes' ?             
        <div className="col-12 w-100-row">
            <div className="row form-group">
                <div className="col col-md-4">
                    <label className=" form-control-label">Portion</label>
                </div>
                <div className="col-12 col-md-6">{item.portions_details.map((portion, index) => {
                    return (
                        <label className="container_check" key={index}>
                            {portion.name}
                            <input 
                                type="radio" 
                                name="portion" 
                                ref={register} 
                                value={portion.price} 
                            />
                            <span className='checkmark'></span>
                        </label>
                    )
                })}
                </div>
            </div>
        </div>
    : null
    return (
        <div className="modal-dialog modal-sm hipal_pop" role="document">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="smallmodallabel">edit item details
                                </h5>
                    </div>
                    <div className="modal-body product_edit">
                        <div className="col-12 w-100-row">
                            <h1>{item && item.item_name} </h1>
                        </div>
                        <div className="col-12 w-100-row">
                            <div className="row form-group">
                                <div className="col col-md-4">
                                    <label className=" form-control-label">quantity</label>
                                </div>
                                <div className="col-12 col-md-6">
                                    <select
                                        name="quantity"
                                        id="select" className="form-control edit_product"
                                        ref={register}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 w-100-row">
                            <div className="row form-group">
                                <div className="col col-md-4">
                                    <label className=" form-control-label">add item discount</label>
                                </div>
                                <div className="col-12 col-md-6">
                                    <select
                                        name="item_discount"
                                        className="form-control edit_product"
                                        ref={register}
                                    >
                                        <option value="0">0%</option>
                                        <option value="10">10%</option>
                                        <option value="15">15%</option>
                                        <option value="20">20%</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 w-100-row">
                            <div className="row form-group">
                                <div className="col col-md-4">
                                    <label className=" form-control-label">status</label>
                                </div>
                                <div className="col-12 col-md-6">
                                    <select
                                        name="item_status"
                                        className="form-control edit_product"
                                        ref={register}
                                    >
                                        <option value="inactive">inactive</option>
                                        <option value="active">active</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                                <LoginForm />
                                {item && item.portions === 'Yes' ? portions : null}

                        <div className="col-12 w-100-row">
                            <div className="row form-group">
                                <div className="col col-md-4">
                                    <label className=" form-control-label">instructions</label>
                                </div>
                                <div className="col-12 col-md-6">
                                    <textarea
                                        name="item_instructions"
                                        rows="3" placeholder="enter text here" className="form-control edit_product"
                                        ref={register}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn close_btn" onClick={onClose}>close </button>
                        <button type="submit" className="btn save_btn" disabled={authenticated} authenticate={setAuthenticated}>save</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ModalForm