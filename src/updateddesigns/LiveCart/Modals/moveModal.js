import React, { useEffect, useState, useContext } from 'react'
import { dispatchContext, tableContext } from '../contexts'

const MergeModal = () => {
    const dbRef = useContext(tableContext)
    const dispatch = useContext(dispatchContext)
    const [table, setTable] = useState()
    useEffect(() => {
        let unsubscribe
        const getTableData = async () => {
        }
        getTableData()
    }, [])
    const handleClose = () => {
        dispatch({
            type: "MoveModalHide"
        })
    }
    return (
        <div className="modal-dialog modal-sm hipal_pop" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="smallmodalLabel">
                        Move
          </h5>
                </div>
                <div className="modal-body product_edit">
                    <div className="col-12 w-100-row">
                        <div className="row form-group">
                            <div className="col col-md-4">
                                <label className=" form-control-label">Current Table</label>
                            </div>
                            <div className="col-12 col-md-6">
                                <input
                                    type="text"
                                    value={`${table && table.table_name}`}
                                    name="current_table"
                                    ref={register}
                                    placeholder={`Table ${tableData && tableData.table_name}`}
                                    className="form-control edit_product"
                                />
                                <div className="customers_merge">
                                    <div className="left">
                                        <span>
                                            {" "}
                                            {table.customers && table.customers.length}
                                        </span>
                    Customers
                  </div>
                                    <div className="right">
                                        <span>14</span>Orders
                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 w-100-row">
                        <div className="row form-group">
                            <div className="col col-md-4">
                                <label className=" form-control-label">Move to</label>
                            </div>
                            <div className="col-12 col-md-6">
                                <select
                                    name="move_with"
                                    ref={register}
                                    className="form-control edit_product"
                                    onChange={handleSubmit(handleChange)}
                                >
                                    <option value={0}>Select</option>
                                    {state.tableList &&
                                        state.tableList.map((table, index) => (
                                            <option
                                                value={table.table_name}
                                                key={index}
                                            >{`Table ${table.table_name}`}</option>
                                        ))}
                                </select>
                                {customerMove}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn close_btn"
                        data-dismiss="modal"
                        onClick={handleClose}
                    >
                        Close
          </button>
                    <button
                        type="button"
                        className="btn save_btn"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Save
          </button>
                </div>
            </div>
        </div>

    )
}

export default MergeModal