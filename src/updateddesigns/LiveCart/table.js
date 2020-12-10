import React, { useContext, useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import {db} from "../../config";
import { tableContext, dispatchContext } from "../LiveCart/contexts";

const Table = ({dbRef})=> {
  const [employees, setEmployees] = useState([]);
  const [table, setTable] = useState(null)
  const dispatch = useContext(dispatchContext)

  const {handleSubmit, reset, register} = useForm()

  useEffect(() => {
    var businessId = sessionStorage.getItem("businessId");
    const employeeList = async () => {
      try {
        const querySnapshot = await db.collection("merchant_users").where("businessId", "==", businessId).get()
        let employees = []
        querySnapshot.forEach(doc => employees.push({...doc.data(), id: doc.id}))
        setEmployees(employees)
      }
      catch (e) {
        console.log(e)
      }
    }
    var unsubscribe = db.collection("merchant_users").where("businessId", "==", businessId).onSnapshot(querySnapshot => {
        let employees = []
        querySnapshot.forEach(doc => employees.push({...doc.data(), id: doc.id}))
        setEmployees(employees)
    })
    employeeList();
    return unsubscribe
  }, []);

  useEffect(() => {
    const tableData = async () => {
      var unsubscribe
      if (dbRef) {
        const table = await dbRef.get()
        setTable(table.data())
        console.log(table.data())
        reset({ employee: table.data().currentEmployee })
        unsubscribe = dbRef.onSnapshot(table => {
          setTable(table.data())
        })
      }
    }
    tableData()
  }, [dbRef])

  const onChange = (data) => {
    try{
      dbRef.update({
      currentEmployee: data.employee 
    })
  }
  catch(e){
    console.log(e)
  }
  }

  const handleCustomers = () => {
    dispatch({
      type: "CustomerToTableModalShow"
    })
  }
  const handleAdvancedOption = () => {
    dispatch({
      type:"AdvanceOptionsModalShow"
    })
  }
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
          <div className="names_options">
            <a href="#" className="active_btn" onClick={handleCustomers}>
              <img src="/images/icon/icon_users_w.png"  />
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
            <select className="form-control" onClick={handleSubmit(onChange)} ref={register} name="employee" >
              <option value="">Choose Employee</option>
            {employees &&
                employees.map((data, index) => {
                  return (
                    <option value={data.employee_name} key={index}>
                      {data.employee_name}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
