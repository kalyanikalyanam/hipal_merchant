import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { dispatchContext, tableContext } from "./contexts";
import firebase from "../../config";
import * as actions from "./actionTypes";
import { db } from "../../config";
const CustomerMoveModal = ({ tableData }) => {
  const dispatch = useContext(dispatchContext);
  const { handleSubmit, register, reset } = useForm();
  const [state, setState] = useState({ tableList: [] });
  const table = useContext(tableContext);
  const [merge, setMerge] = useState(0);
  const handleClose = () => {
    dispatch({
      type: "mergeModalHide",
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
    if (!data.merge_with && data.merge_with === 0) {
      setMerge(null);
    } else {
      let merge_table;
      state.tableList.forEach((table) => {
        if (table.table_name === data.merge_with) {
          merge_table = table;
        }
      });
      setMerge(merge_table);
    }
  };
  const onSubmit = (data) => {
    dispatch({
      type: actions.CustomerList,
      value: null,
      status: `Table ${data.current_table} Merge With ${data.merge_with}`,
    });

    db.collection("tables")
      .doc(table.id)
      .update({
        status: `Table ${data.current_table} Merge With ${data.merge_with}`,
        // customers: customer_list,
      });
    db.collection("tables")
      .doc(merge.tableId)
      .update({
        status: `Table ${data.current_table} Merge With ${data.merge_with}`,
      });

    console.log(merge);
    console.log(data);
  };
  useEffect(() => {
    reset({
      current_table: tableData ? tableData.table_name : null,
      merge_with: 0,
    });
    getTabledata();
  }, []);
  const customerMerge =
    merge && merge != 0 ? (
      <div className="customers_merge">
        <div className="left">
          <span>{merge.customers ? merge.customers.length : "0"}</span>Customers
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
                  Table {tableData && tableData.table_name}
                </div>
                <div className="customers_merge bill_merge">
                  <div className="left">
                    <span>
                      {tableData.customers && tableData.customers.length}
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
                  value={`${tableData && tableData.table_name}`}
                  name="current_table"
                  ref={register}
                  placeholder={`Table ${tableData && tableData.table_name}`}
                  className="form-control edit_product"
                />
                {/* <div className="customers_merge">
                  <div className="left">
                    <span>3+</span>Customers
                  </div>
                  <div className="right">
                    <span>14</span>Orders
                  </div>
                </div> */}
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
                {customerMerge}
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn close_btn" onClick={handleClose}>
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
