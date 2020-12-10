import React ,{useState, useEffect, useContext} from 'react'
import {db} from '../../../config'
import {useForm} from 'react-hook-form'
import { dispatchContext, tableContext } from '../contexts'

const MergeModal = () => {
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
            console.log(currentTable.id)
            querySnapshot.forEach(table => {
                if(currentTable.id !== table.id)
                    tables.push({...table.data(), id: table.id})
            })
            setTables(tables)
        }
        if(currentTable) getData()
    }, [currentTable])
    
    const handleSelect = async () => {
        if(!getValues("merge_with")){
            setSelectedTable(null)
            return
        }
        setSelectedTable(getValues("merge_with"))
        if(getValues("merge_with")){
            const selectedTable = await db.collection("tables").doc(getValues("merge_with")).get()
            setTableData({...selectedTable.data(), id: selectedTable.id})
        }
    }
    const handleClose = () => {
        dispatch({
            type: "MergeModalHide"
        })
    }
    const onSubmit = async (data) => {
        if(data.merge_with === "0"){
            setError("merge_with", {
                type: "manual",
                message: "Value Must be selected"
            })
            return
        }
        const thisTable = await dbRef.get()
        const mergingTable = await db.collection("tables").doc(selectedTable).get()

        const liveCart1 = thisTable.data().liveCart
        const liveCart2 = mergingTable.data().liveCart
        const orders1 = thisTable.data().orders
        const orders2 = mergingTable.data().orders
        const bill1 = thisTable.data().bill
        const bill2 = mergingTable.data().bill

        const liveCartId = thisTable.data().liveCartId 
        const orderId = thisTable.data().orderId
        const billId = thisTable.data().billId
        bill1.push(...bill2)
        orders1.push(...orders2)
        liveCart1.push(...liveCart2)
        let newTableData = {
            status: `Merge ${thisTable.data().table_name} ${mergingTable.data().table_name}` ,
            // bill: bill1,
            // orders:orders1,
            // liveCart: liveCart1 
        }
        // liveCartId && (newTableData.liveCartId = liveCartId )
        // orderId && (newTableData.orderId = orderId)
        // billId && (newTableData.billId = orderId)

        dbRef.update(newTableData)
        db.collection("tables").doc(selectedTable).update(newTableData)
        dispatch({
            type: "MergeModalHide"
        })
    }
    const selectedTableRender = tableData && 
      <div className="customers_merge">
        <div className="left">
          <span>{tableData.customers ? tableData.customers.length : "0"}</span>Customers
        </div>
        <div className="right">
          <span>14</span>Orders
        </div>
      </div>
    return (
        <div className="modal-dialog modal-sm hipal_pop" role="document">
            <div className="modal-content">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="smallmodalLabel">
                            Merge
          </h5>
                    </div>
                    <div className="modal-body product_edit">
                        <div className="col-12 w-100-row">
                            <div className="row form-group">
                                <div className="col col-md-4">
                                    <label className=" form-control-label">Billing Table</label>
                                </div>
                                <div className="col-12 col-md-8">
                                    <div className="bill_table">
                                        Table {currentTable && currentTable.table_name}
                                    </div>
                                    <div className="customers_merge bill_merge">
                                        <div className="left">
                                            <span>
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
                                    <label className=" form-control-label">Current Table</label>
                                </div>
                                <div className="col-12 col-md-6">
                                    <input
                                        type="text"
                                        value={`${currentTable && currentTable.table_name}`}
                                        name="current_table"
                                        ref={register}
                                        placeholder={`Table ${currentTable && currentTable.table_name}`}
                                        className="form-control edit_product"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 w-100-row">
                            <div className="row form-group">
                                <div className="col col-md-4">
                                    <label className=" form-control-label">Merge with</label>
                                </div>
                                <div className="col-12 col-md-6">
                                    <select
                                        name="merge_with"
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
                                    {errors.merge_with && <div style={{color: 'red'}}>{errors.merge_with.message}</div>}
                                    {selectedTableRender}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn close_btn" onClick={handleClose}>
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

export default MergeModal