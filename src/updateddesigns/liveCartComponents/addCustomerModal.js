import { db } from "../../config";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { dispatchContext, tableContext } from "./contexts";
import * as actions from "./actionTypes";
import InputField from "./inputField";

const AddCustomerModal = ({ tableData }) => {
  const [occupency, setOccupancy] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [customerslist, setCustomerslist] = useState({});

  const dispatch = useContext(dispatchContext);

  const table = useContext(tableContext);
  const fields = useRef();
  const { handleSubmit, register, reset } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {
    // let flag = false;
    // Object.keys(data).forEach((key) => {
    //   console.log(key);
    //   if (key !== "occupency" && data[key] !== "") {
    //     flag = true;
    //   }
    // });
    // if (!flag) alert("Please enter at least 1 customer");
    // else {
    //   console.log(data);
    // }

    let customer_list = [];
    for (var key in data) {
      if (key !== "occupency") {
        customers.forEach((customer) => {
          if (data[key] === customer.name) {
            customer_list.push(customer);
          }
        });
      }
      setCustomerslist(customer_list);
      console.log(customer_list);
    }
    console.log(data);
    dispatch({
      type: actions.CustomerList,
      value: customer_list,
      status: "occupied",
    });

    db.collection("tables").doc(table.id).update({
      status: "occupied",
      customers: customer_list,
    });
  };
  const onChange = (data) => {
    setOccupancy(data.occupency);
  };

  const handleKeyDown = (e) => {
    if (
      !(
        (e.keyCode > 95 && e.keyCode < 106) ||
        (e.keyCode > 47 && e.keyCode < 58) ||
        e.keyCode == 8
      )
    ) {
      return false;
    }
  };
  const getCustomers = async () => {
    const businessId = sessionStorage.getItem("businessId");
    const snapshot = await db
      .collection("customers")
      .where("businessId", "==", businessId)
      .get();
    let data = [];
    snapshot.forEach((childSnapshot) => {
      const customer = {
        created_on: childSnapshot.data().created_on,
        email: childSnapshot.data().customer_email,
        name: childSnapshot.data().customer_name,
        notes: childSnapshot.data().customer_notes,
        phone: childSnapshot.data().customer_phonenumber,
        username: childSnapshot.data().username,
      };
      data.push(customer);
    });
    setCustomers(data);
  };
  useEffect(() => {
    reset({ occupency: 0 });
    getCustomers();
  }, []);
  useEffect(() => {
    fields.current = [];
    for (var i = 0; i < occupency; i++) {
      const field = (
        <InputField customers={customers} i={i} key={i} register={register} />
      );
      fields.current.push(field);
    }
  }, [occupency]);
  const close = () => {
    dispatch({
      type: actions.ADDCUSTOMERHIDE,
    });
  };
  return (
    <div
      className="modal-dialog modal-sm hipal_pop"
      width="200px"
      role="document"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">
            Add table to Table {tableData && tableData.table_name}
          </h5>
        </div>
        <div className="modal-body">
          <div className="col-12 w-100-row ocupeny_no m-t-10">
            Occupancy
            <span>
              <input
                onKeyDown={handleKeyDown}
                type="number"
                name="occupency"
                min="0"
                max={tableData && tableData.table_capacity.split(" ")[0]}
                ref={register}
                onChange={handleSubmit(onChange)}
              />
            </span>
          </div>
          {fields.current}
        </div>
        <div className="modal-footer">
          <button onClick={close} className="btn close_btn">
            Close
          </button>
          <button onClick={handleSubmit(onSubmit)} className="btn save_btn">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerModal;
