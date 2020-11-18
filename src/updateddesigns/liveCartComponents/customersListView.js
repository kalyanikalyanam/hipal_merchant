import firebase from "../../config";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { dispatchContext, tableContext } from "./contexts";
import * as actions from "./actionTypes";
import { db } from "../../config";
const CustomerListView = ({ tableData }) => {
  const dispatch = useContext(dispatchContext);
  const { handleSubmit, register, reset } = useForm();
  const table = useContext(tableContext);
  const [state, setState] = useState({ tableList: [] });
  const [swab, setSwab] = useState(null);
  const handleClose = () => {
    dispatch({
      type: "swapModalHide",
    });
  };
  const getTabledata = async () => {
    var businessId = sessionStorage.getItem("businessId");
    const snapshot = await firebase
      .firestore()
      .collection("tables")
      .where("businessId", "==", businessId)
      .where("status", "==", "Vacant")
      //   .where("status", "==", "occupied")
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
        customers: childSnapShot.data().customers,
      };
      data.push(GSTData);
    });
    setState({ tableList: data });
  };

  useEffect(() => {
    reset({
      current_table: tableData ? tableData.table_name : null,

      swab_with: 0,
    });
    getTabledata();
  }, []);

  return (
    <div className="chooseemp_dropdown">
      <select className="form-control" onClick={onChange}>
        {/* <option>Choose Employee</option> */}
        {customers &&
          customers.map((data, index) => {
            return (
              <option value={data.name} key={index}>
                {data.name}
              </option>
            );
          })}
        {/* <option>Employee 1</option>
              <option>Employee 2</option>
              <option>Employee 3</option>
              <option>Employee 4</option> */}
      </select>
    </div>
  );
};

export default CustomerListView;
