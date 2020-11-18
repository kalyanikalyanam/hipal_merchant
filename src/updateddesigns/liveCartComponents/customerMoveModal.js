import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { dispatchContext, tableContext, CustomerListContext } from "./contexts";
import firebase from "../../config";
import * as actions from "./actionTypes";
import { db } from "../../config";

const CustomerMoveModal = ({ tableData }) => {
  const dispatch = useContext(dispatchContext);
  const { handleSubmit, register, reset } = useForm();
  const table = useContext(tableContext);
  const CustomerList = useContext(CustomerListContext);
  const [state, setState] = useState({ tableList: [] });
  const [move, setMove] = useState(0);
  const handleClose = () => {
    dispatch({
      type: "moveModalHide",
    });
  };
  const getTabledata = async () => {
    var businessId = sessionStorage.getItem("businessId");
    const snapshot = await firebase
      .firestore()
      .collection("tables")
      .where("businessId", "==", businessId)
      .where("status", "==", "Vacant")
      .get();
    var data = [];
    snapshot.forEach((childSnapShot) => {
      const GSTData = {
        tableId: childSnapShot.id,
        table_name: childSnapShot.data().table_name,
        table_capacity: childSnapShot.data().table_capacity,
        table_floor: childSnapShot.data().table_floor,
        table_icon: childSnapShot.data().table_icon,
        table_notes: childSnapShot.data().table_notes,
        table_qrcode: childSnapShot.data().table_qrcode,
        status: childSnapShot.data().status,
      };
      data.push(GSTData);
    });
    setState({ tableList: data });
  };

  const handleChange = (data) => {
    if (!data.move_with && data.move_with === 0) {
      setMove(null);
    } else {
      let move_table;
      state.tableList.forEach((table) => {
        if (table.table_name === data.move_with) {
          move_table = table;
        }
      });
      setMove(move_table);
    }
  };
  const onSubmit = (data) => {
    dispatch({
      type: actions.CustomerList,
      value: null,
      status: `Table ${data.current_table} move To ${data.move_with}`,
    });

    db.collection("tables")
      .doc(table.id)
      .update({
        status: `Table ${data.current_table} move To ${data.move_with}`,
        // customers: customer_list,
      });
    db.collection("tables")
      .doc(move.tableId)
      .update({
        status: `Table ${data.current_table} move To ${data.move_with}`,
      });

    console.log(move);
    console.log(data);
  };
  useEffect(() => {
    reset({
      current_table: tableData ? tableData.table_name : null,
      move_with: 0,
    });
    getTabledata();
  }, []);
  const customerMove =
    move && move != 0 ? (
      <div className="customers_merge">
        <div className="left">
          <span>{move.customers ? move.customers.length : "0"}</span>
          Customers
        </div>
        <div className="right">
          <span>14</span>Orders
        </div>
      </div>
    ) : null;
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
                  value={`${tableData && tableData.table_name}`}
                  name="current_table"
                  ref={register}
                  placeholder={`Table ${tableData && tableData.table_name}`}
                  className="form-control edit_product"
                />
                <div className="customers_merge">
                  <div className="left">
                    <span>
                      {" "}
                      {CustomerList && CustomerList.length}
                      {/* {tableData.customers && tableData.customers.length} */}
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
  );
};

export default CustomerMoveModal;
