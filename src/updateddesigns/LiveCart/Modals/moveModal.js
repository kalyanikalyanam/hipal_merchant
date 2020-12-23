import React, { useEffect, useState, useContext } from "react";
import { db } from "../../../config";
import { useForm } from "react-hook-form";
import { dispatchContext, tableContext } from "../contexts";

const MoveModal = () => {
  const dbRef = useContext(tableContext);
  const dispatch = useContext(dispatchContext);

  const [selectedTable, setSelectedTable] = useState();
  const [tableData, setTableData] = useState();
  const [currentTable, setCurrentTable] = useState();
  const [tables, setTables] = useState();

  const { handleSubmit, register, getValues, errors, setError } = useForm();
  useEffect(() => {
    const getCurrentTable = async () => {
      const current_table = await dbRef.get();
      setCurrentTable({ ...current_table.data(), id: current_table.id });
    };
    getCurrentTable();
  }, []);
  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await db
        .collection("tables")
        .where("businessId", "==", sessionStorage.getItem("businessId"))
        .get();
      let tables = [];
      querySnapshot.forEach((table) => {
        if (currentTable.id !== table.id)
          tables.push({ ...table.data(), id: table.id });
      });
      tables = tables.filter((table) => {
        if (table.orders.length > 0) return false;
        if (table.status !== "Vacant") return false;
        return true;
      });
      setTables(tables);
    };
    if (currentTable) getData();
  }, [currentTable]);

  const handleSelect = async () => {
    if (!getValues("move_to")) {
      setSelectedTable(null);
      return;
    }
    setSelectedTable(getValues("move_to"));
    if (getValues("move_to")) {
      const selectedTable = await db
        .collection("tables")
        .doc(getValues("move_to"))
        .get();
      setTableData(selectedTable.data());
    }
  };
  const selectedTableRender = tableData && (
    <div className="customers_merge">
      <div className="left">
        <span>{tableData.customers ? tableData.customers.length : "0"}</span>
        Customers
      </div>
      <div className="right">
        <span>14</span>Orders
      </div>
    </div>
  );
  const handleClose = () => {
    dispatch({
      type: "MoveModalHide",
    });
  };
  const handleSave = async (values) => {
    if (values.move_to === "0") {
      setError("move_to", {
        type: "manual",
        message: "Table must be selected",
      });
      return;
    }
    const dbRef = db.collection("tables").doc(values.move_to);
    const table = await dbRef.get();
    let newTable = table.data();
    const kotItem = {};
    currentTable.orders.forEach((item) => {
      if (item.status !== "NotKot") {
        if (!kotItem[item.kotId]) {
          kotItem[item.kotId] = [item.orderPageId];
        } else {
          kotItem[item.kotId].push(item.orderPageId);
        }
      }
    });

    const data = {
      currentEmployee: currentTable.currentEmployee,
      billId: currentTable.billId === null ? "" : currentTable.billId,
      orderId: currentTable.orderId || "",
      liveCartId: currentTable.liveCartId || "",
      liveCart: currentTable.liveCart,
      orders: currentTable.orders,
      bill: currentTable.bill,
      occupency: currentTable.occupency || "",
      customers: currentTable.customers || [],
    };
    newTable = { ...newTable, ...data };
    console.log(currentTable);
    console.log(table.data());
    Object.keys(kotItem).forEach((key) => {
      const kotRef = db.collection("kotItems").doc(key);
      kotRef.update({
        tableName: table.data().table_name,
        tableId: values.move_to,
      });
    });
    await dbRef.update(newTable);
    await db.collection("tables").doc(currentTable.id).update({
      currentEmployee: "",
      billId: "",
      orderId: "",
      liveCartId: "",
      liveCart: [],
      orders: [],
      bill: [],
      occupency: "",
      customers: [],
    });
  };
  return (
    <div className="modal-dialog modal-sm hipal_pop" role="document">
      <form onSubmit={handleSubmit(handleSave)}>
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
                    value={`${currentTable && currentTable.table_name}`}
                    name="current_table"
                    ref={register}
                    placeholder={`Table ${
                      currentTable && currentTable.table_name
                    }`}
                    className="form-control edit_product"
                    readOnly
                  />
                  <div className="customers_merge">
                    <div className="left">
                      <span>
                        {" "}
                        {currentTable &&
                          currentTable.customers &&
                          currentTable.customers.length}
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
                    name="move_to"
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
                  {errors.move_to && <div>{errors.move_to.message}</div>}
                  {selectedTableRender}
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
            <button type="submit" className="btn save_btn">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MoveModal;
