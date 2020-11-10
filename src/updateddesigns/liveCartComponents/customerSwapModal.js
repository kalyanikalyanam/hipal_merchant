import firebase from '../../config'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {dispatchContext} from './contexts'

const CustomerSwapModal= ({tableData}) => {
    const dispatch = useContext(dispatchContext)
    const { handleSubmit, register, reset } = useForm()
    const [state, setState] = useState({ tableList: [] })
    const [swab, setSwab] = useState(null)
    const handleClose = () => {
        dispatch({
            type: 'swapModalHide'
        })
    }
    const getTabledata = async () => {
        var businessId = sessionStorage.getItem("businessId")
        const snapshot = await firebase.firestore().collection('tables').where('businessId', '==', businessId).get()
        var data = [];
        snapshot.forEach(childSnapShot => {
            const GSTData = {
                tableId: childSnapShot.id,
                table_name: childSnapShot.data().table_name,
                table_capacity: childSnapShot.data().table_capacity,
                table_floor: childSnapShot.data().table_floor,
                table_icon: childSnapShot.data().table_icon,
                table_notes: childSnapShot.data().table_notes,
                table_qrcode: childSnapShot.data().table_qrcode,
                status: childSnapShot.data().status,
            }
            data.push(GSTData);
        });
        setState({ tableList: data });
    }
    const handleChange = (data) => {
        if (!data.swab_with && data.swab_with === 0) {
            setSwab(null)
        }
        else {
            setSwab(data.swab_with)
        }
    }
    useEffect(() => {
        reset({ current_table: tableData ? tableData.table_name : null, swab_with: 0 })
        getTabledata()
    }, [])
    const swapBox = swab && swab != 0 ?
        <div className="col col-md-4">
            <div className="table_no_box">
                {`Table ${swab}`}
            </div>
            <p className="swab_box2">Customers <span>+3</span></p>
            <p className="swab_box2">Orders <span>14</span></p>
        </div> :
        <div className="col col-md-4">
            <div className="table_no_box colorbox">
            </div>
        </div>
    return (
        <div className="modal-dialog modal-sm hipal_pop" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="smallmodalLabel">Swap
              </h5>
                </div>
                <div className="modal-body product_edit">
                    <div className="col-12 w-100-row">
                        <div className="row form-group">
                            <div className="col col-md-4">
                                <div className="table_no_box">
                                    Table {tableData && tableData.table_name}
                                </div>
                                <p className="swab_box2">Customers <span>+3</span></p>
                                <p className="swab_box2">Orders <span>14</span></p>
                            </div>
                            <div className="col col-md-4">
                                <label className=" form-control-label">
                                    <img src="/images/icon/left_single_arrow.png" />
                                </label>
                            </div>
                            {swapBox}
                        </div>
                    </div>
                    <div className="col-12 w-100-row">
                        <div className="row form-group">
                            <div className="col col-md-4">
                                <label className=" form-control-label">Current Table</label>
                            </div>
                            <div className="col-12 col-md-6">
                                <input type="text" name="current_table" ref={register} placeholder={`Table ${tableData && tableData.table_name}`} className="form-control edit_product" disabled />
                                <div className="customers_merge">
                                    <div className="left"><span>3+</span>Customers</div>
                                    <div className="right"><span>14</span>Orders</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 w-100-row">
                        <div className="row form-group">
                            <div className="col col-md-4">
                                <label className=" form-control-label">Swap with</label>
                            </div>
                            <div className="col-12 col-md-6">
                                <select name="swab_with" ref={register} className="form-control edit_product" onChange={handleSubmit(handleChange)}>
                                    <option value={0}>Select</option>
                                    {state.tableList && state.tableList.map((table, index) => (
                                        <option value={table.table_name} key={index}>{`Table ${table.table_name}`}</option>
                                    ))}
                                </select>
                                <div className="customers_merge">
                                    <div className="left" />
                                    <div className="right" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn close_btn" data-dismiss="modal" onClick={handleClose}>Close</button>
                    <button type="button" className="btn save_btn">Save</button>
                </div>
            </div>
        </div>
    )
}

export default CustomerSwapModal