import React, { useContext, useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import {dispatchContext, modalContext} from './contexts'
import * as actions from './actionTypes'
import LoginForm from './login'

const ModalForm = (props) => {
    const {register, handleSubmit, errors, reset} = useForm()
    const [item, setItem] = useState(props.item) 
    const {editMode}  = useContext(modalContext)
    const dispatch = useContext(dispatchContext)
    const [authenticated, setAuthenticated] = useState(false)
    useEffect(() => {
        console.log(props.formOrder)
        reset({
            quantity: item.quantity ? item.quantity : 1, 
            status: item.status,
            portion: item.portion,
            discount: item.discount ? item.discount : 0
        })
    }, [])
    const onClose = () => {
        dispatch({
            type: actions.CLOSEMODEL
        })
    }
    const onSubmit = (data) => {
        if(data.item_discount !== "0" && !authenticated){
            alert('Login to add discount')
            return
        }
        const items = JSON.parse(JSON.stringify(item))
        if(data.portion){
            items.portion = data.portion
            var temp = 0
            item.portions_details.forEach(portion=> {
                if(portion.name === data.portion){
                    temp = portion.price
                }
            });
            if(temp !== 0) items.price = temp
            else items.price = items.item_price
        } else {
            items.price = parseInt(items.item_price)
        }
        items.quantity = parseInt(data.quantity)
        items.discount = items.price * data.item_discount / 100
        items.status = data.item_status
        items.item_instructions = data.instructions
        dispatch({
            type: actions.ADDLIVE,
            item: items, 
            edit: editMode,
            id: Date.now().toString()
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
                                value={portion.name} 
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
                                    <input
                                        name="quantity"
                                        className="form-control edit_product"
                                        ref={register} min="1" max="12"
                                        type="number"
                                    />
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
                        {!authenticated && <LoginForm auth={setAuthenticated}/>}
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
                        <button type="submit" className={`btn save_btn`}>save</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ModalForm