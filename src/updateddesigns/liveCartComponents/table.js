import React, { useEffect, useState, useContext, useCallback } from "react";
import firebase from "../../config";
import { dispatchContext, tableContext } from "./contexts";
import * as actions from "./actionTypes";

const Table = ({table}) => {
  const [employees, setEmployees] = useState([]);
  const dispatch = useContext(dispatchContext)
  const handleAdvancedOption = () => {
    dispatch({
      type: actions.ADVACEDOPTIONSSHOW,
    });
  };
  const handleAddCutomer = () => {
    dispatch({
      type: actions.ADDCUSTOMERSHOW,
    });
  };
  const onChange = (e) => {
    const val = e.target.value;
    dispatch({
      type: actions.ADDEmployee,
      value: val,
    });
  };

  const employeeList = async () => {
    var businessId = sessionStorage.getItem("businessId");
    await firebase
      .firestore()
      .collection("merchant_users")
      // .where("sessionId", "==", sessionId)
      .where("businessId", "==", businessId)

      .get()
      .then((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          const GSTData = {
            employeeId: childSnapShot.id,

            employee_unique_id: childSnapShot.data().employee_unique_id,
            created_on: childSnapShot.data().created_on,

            employee_name: childSnapShot.data().employee_name,
            user_name: childSnapShot.data().user_name,
            password: childSnapShot.data().password,
            employee_position: childSnapShot.data().employee_position,
            employee_division: childSnapShot.data().employee_division,
            employee_employement_type: childSnapShot.data()
              .employee_employement_type,
            email_id: childSnapShot.data().email_id,
            contact_number: childSnapShot.data().contact_number,
            photo: childSnapShot.data().photo,
            employee_special_password: childSnapShot.data()
              .employee_special_password,

            employee_dateofbirth: childSnapShot.data().employee_dateofbirth,
            employee_bloodgroup: childSnapShot.data().employee_bloodgroup,
            employee_address: childSnapShot.data().employee_address,
            employee_emergency_contact_number: childSnapShot.data()
              .employee_emergency_contact_number,
            employee_adharcard: childSnapShot.data().employee_adharcard,

            employee_account_number: childSnapShot.data()
              .employee_account_number,
            employee_ifsc_code: childSnapShot.data().employee_ifsc_code,
            employee_upi_id: childSnapShot.data().employee_upi_id,

            sessionId: childSnapShot.data().sessionId,
            businessId: childSnapShot.data().businessId,
          };

          data.push(GSTData);
        });
        setEmployees(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    employeeList();
    console.log(table)
  }, []);

  return (
    <div className="col-md-7">
      <div className="staff_box row">
        <div className="col-md-3">
          <div className="kot_box">
            <div className="cookhead">{table ? table.status : null}</div>
            <div className="table_small">
              <div className="people_row">
                <span className="top fill"></span>
                <span className="top fill"></span>
              </div>
              <div className="table_no">{table? table.table_name : null}</div>
              <div className="people_row">
                <span className="bottom nonfille"></span>
                <span className="bottom fill"></span>
              </div>
            </div>
            <div className="time">
              <span>2:02</span>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="names_options" onClick={handleAddCutomer}>
            <a href="#" className="active_btn">
              <img src="/images/icon/icon_users_w.png" />
              Customers Names
            </a>
          </div>
          <div className="names_options m-t-20" onClick={handleAdvancedOption}>
            <a href="#">
              <img src="/images/icon/icon_settings.svg" />
              Advanced Options
            </a>
          </div>
        </div>
        <div className="col-md-4">
          <div className="chooseemp_dropdown">
            <select className="form-control" onClick={onChange}>
              <option value={null}>Choose Employee</option>
              {employees &&
                employees.map((data, index) => {
                  return (
                    <option value={data.employee_name} key={index}>
                      {data.employee_name}
                    </option>
                  );
                })}
              {/* <option>Employee 1</option>
              <option>Employee 2</option>
              <option>Employee 3</option>
              <option>Employee 4</option> */}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
