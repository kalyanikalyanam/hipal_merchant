import React, { useEffect, useState, useContext } from 'react'
import {db} from '../../../config'
import {useForm} from 'react-hook-form'
import { dispatchContext, tableContext } from '../contexts'

const SwapModal = () => {
    const dbRef = useContext(tableContext)
    const dispatch = useContext(dispatchContext)

    const [selectedTable, setSelectedTable] = useState()
    const [tableData, setTableData] = useState()
    const [currentTable, setCurrentTable] = useState()
    const [tables, setTables] = useState()

    const {handleSubmit, register, getValues, errors, setError} = useForm()
    useEffect(() => {
        const getCurrentTable = async () => {
            const current_table = await dbRef.get()
            setCurrentTable({...current_table.data(), id: current_table.id})
        }
        getCurrentTable()
    }, [])
    useEffect(() => {
        const getData = async () => {
            const querySnapshot = await db
                .collection("tables")
                .where("businessId", "==", sessionStorage.getItem("businessId"))
                .get()
            const tables = []
            querySnapshot.forEach(table => {
                if(currentTable.id !== table.id)
                    tables.push({...table.data(), id: table.id})
            })
            setTables(tables)
        }
        if(currentTable) getData()
    }, [currentTable])

    const handleSelect = async () => {
        if(!getValues("swap_with")){
            setSelectedTable(null)
            return
        }
        setSelectedTable(getValues("swap_with"))
        if(getValues("swap_with")){
            const selectedTable = await db.collection("tables").doc(getValues("swap_with")).get()
            setTableData(selectedTable.data())
        }
    }
    const selectedTableRender = tableData ? (
      <div className="col col-md-4">
        <div className="table_no_box">{`Table ${tableData.table_name}`}</div>
        <p className="swab_box2">
          Customers <span>{tableData.customers ? tableData.customers.length : "0"}</span>
        </p>
        <p className="swab_box2">
          Orders <span>14</span>
        </p>
      </div>
    ) : (
      <div className="col col-md-4">
        <div className="table_no_box colorbox"></div>
      </div>
    )
    const handleClose = () => {
        dispatch({
            type: "SwapModalHide"
        })
    }
    const onSubmit = (data) => {
        console.log(data)
        if(data.swap_with === "0"){
            setError("swap_with", {
                type: "manual",
                message: "Table must be selected"
            })
            return
        }
    } 
    return (
        <div className="modal-dialog modal-sm hipal_pop" role="document">
            <div className="modal-content">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="smallmodalLabel">
                            Swap
                        </h5>
                    </div>
                    <div className="modal-body product_edit">
                        <div className="col-12 w-100-row">
                            <div className="row form-group">
                                <div className="col col-md-4">
                                    <div className="table_no_box">
                                        Table {currentTable && currentTable.table_name}
                                    </div>
                                    <p className="swab_box2">
                                        Customers{" "}
                                        <span>
                                            {" "}
                                            {currentTable && currentTable.length}
                                        </span>
                                    </p>
                                    <p className="swab_box2">
                                        Orders <span>14</span>
                                    </p>
                                </div>
                                <div className="col col-md-4">
                                    <label className=" form-control-label">
                                        <img src="/images/icon/left_single_arrow.png" />
                                    </label>
                                </div>
                                {selectedTableRender}
                            </div>
                        </div>
                        <div className="col-12 w-100-row">
                            <div className="row form-group">
                                <div className="col col-md-4">
                                    <label className=" form-control-label">Current Table</label>
                                </div>
                                <div className="col-12 col-md-6">
                                    <input
                                        type="text"
                                        value={`${currentTable && currentTable.table_name}`}
                                        name="current_table"
                                        ref={register}
                                        placeholder={`Table ${tableData && tableData.table_name}`}
                                        className="form-control edit_product"
                                        readOnly
                                    />
                                    <div className="customers_merge">
                                        <div className="left">
                                            <span>
                                                {" "}
                                                {currentTable && currentTable.customers && currentTable.customers.length}
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
                                    <label className=" form-control-label">Swap with</label>
                                </div>
                                <div className="col-12 col-md-6">
                                    <select
                                        name="swap_with"
                                        ref={register}
                                        className="form-control edit_product"
                                        onChange={handleSelect}
                                    >
                                        <option value={0}>Select</option>
                                        {tables &&
                                            tables.map((table, index) => (
                                                <option
                                                    value={table.id}
                                                    key={index}
                                                >{`Table ${table.table_name}`}</option>
                                            ))}
                                    </select>
                                    {errors.swap_with && <div style={{color: 'red'}}>{errors.swap_with.message}</div>}
                                    <div className="customers_merge">
                                        <div className="left" />
                                        <div className="right" />
                                    </div>
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
                            type="submit"
                            className="btn save_btn"
                        >
                            Save
          </button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default SwapModal