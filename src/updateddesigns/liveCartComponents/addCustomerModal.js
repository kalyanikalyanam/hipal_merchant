import { db } from "../../config";
import React, { useContext, useDebugValue, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { dispatchContext, tableContext, CustomerListContext } from "./contexts";
import * as actions from "./actionTypes";
import InputField from "./inputField";

const AddCustomerModal = ({ tableData }) => {
  const [occupency, setOccupancy] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [customerslist, setCustomerslist] = useState({});
  const [customernamenumber, setCustomernamenumber] = useState({});
  const dispatch = useContext(dispatchContext);
  const CustomerList = useContext(CustomerListContext);
  const table = useContext(tableContext);
  const fields = useRef();
  const { handleSubmit, register, reset,setValue } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {
    let customer_list = [];
    for (var key in data) {
      if (key !== "occupency") {
        customers.forEach((customer) => {
          if (data[key] === customer.name) {
            customer_list.push(customer);
          }
        });
      }
    }
    setCustomerslist(customer_list);
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
    setOccupancy(parseInt(data.occupency));
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
    if(CustomerList){
      if (CustomerList.length === 0) {
        reset({ occupency: 0 });
        setOccupancy(0)
      }
      else {
        reset({ occupency: CustomerList.length });
        setOccupancy(parseInt(CustomerList.length))
      }
    }
    getCustomers()
  }, [])
  useEffect(() => {
    let newFields = []
    for (var i = 0; i < occupency; i++) {
      const field = (
        <InputField customers={customers} i={i} key={i} register={register} />
      );
      newFields.push(field);
    }
    fields.current = newFields
  }, [occupency]);

  useEffect(() => {
    if (CustomerList && CustomerList.length !== 0) {
      let customers = {};
      for (var i = 0; i < CustomerList.length; i++) {
        let newcustomers = {
          ...customers,
          [`customer-number-${i}`]: CustomerList[i].phone,
          [`customer-name-${i}`]: CustomerList[i].name,
        };
        customers = newcustomers;
      }
      setCustomernamenumber({ ...customers });
    }
  }, [fields.current])
  useEffect(() => {
    
    Object.keys(customernamenumber).forEach(key => {
      setValue(key, customernamenumber[key])
    })
    console.log({occupency, ...customernamenumber})
  }, [customernamenumber])

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
