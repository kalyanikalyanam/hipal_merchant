import React, { useContext } from 'react'
import {useForm} from 'react-hook-form'
import {dispatchContext, modalContext} from './contexts'
import * as actions from './actionTypes'


const ModalForm = () => {
    const {register, handleSubmit, errors} = useForm()
    const dispatch = useContext(dispatchContext)
    const item= useContext(modalContext)
    const onClose = () => {
        dispatch({
            type: actions.CLOSEMODEL
        })
    }
    const onSubmit = (data) => {
        item.quantity = data.quantity
        dispatch({
            type: actions.ADDLIVE,
            item: item 
        })
    }

    return (
        <div className="modal-dialog modal-sm hipal_pop" role="document">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="smallmodallabel">edit item deatils
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
                                        <option value="0">select</option>
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
                                        <option value="0">select</option>
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
                                        <option value="0">select</option>
                                        <option value="active">active</option>
                                        <option value="inactive">inactive</option>
                                    </select>
                                </div>
                            </div>
                        </div>


                        <div className="col-12 w-100-row">
                            <div className="row form-group">
                                <div className="col col-md-4">
                                    <label className=" form-control-label">instructions</label>
                                </div>
                                <div className="col-12 col-md-6">
                                    <textarea
                                        name="item_instructions"
                                        id="textarea-input" rows="3" placeholder="enter text here" className="form-control edit_product"
                                        ref={register}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn close_btn" onClick={onClose}>close </button>
                        <button type="submit" className="btn save_btn">save</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ModalForm