import React, { useContext, useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import {db} from "../../config";
import { dispatchContext } from "../LiveCart/contexts";

const Table = ({dbRef})=> {
  const [employees, setEmployees] = useState([]);
  const [table, setTable] = useState(null)
  const dispatch = useContext(dispatchContext)

  const {handleSubmit, reset, register, setValue} = useForm()

  useEffect(() => {
    var unsubscribe
    var businessId = sessionStorage.getItem("businessId");
    return unsubscribe
  }, []);

  useEffect(() => {
    var unsubscribe
    const tableData = async () => {
      if (dbRef) {
        const table = await dbRef.get()
        setTable(table.data())
        const role = sessionStorage.getItem("role")
        const id = sessionStorage.getItem("RoleId")
        const businessId = sessionStorage.getItem("businessId")
        const querySnapshot = await db.collection('merchant_users').where('businessId', '==', businessId).get()
        let employees = []
        querySnapshot.forEach(doc => employees.push({
          id: doc.id,
          employee_name: doc.data().employee_name,
          role: doc.data().role
        }))

        db
          .collection('merchant_users')
          .where("businessId", "==", businessId)
          .onSnapshot(querySnapshot =>{
            let employees = []
            querySnapshot.forEach(doc => employees.push({
                employee_name: doc.data().employee_name,
                role: doc.data().role,
                id: doc.id
              })
            )
            setEmployees(employees)
          })
      
        const ref = await db
          .collection('merchant_users')
          .doc(id)
          .get()
        let user = {}
        if (role === "Merchant") {
          user.employee_name = ref.data().user_name
          user.role = ref.data().role
          user.id = ref.id
          employees.push(user)
        } 
        else {
          user.employee_name = ref.data().employee_name
          user.role = ref.data().role
          user.id = ref.id
        }
        setEmployees(employees)
        setValue('employee', user.employee_name)
        if(table.data().currentEmployee === ""){
          dbRef.update({
            currentEmployee: user.employee_name
          })
        }
        unsubscribe = dbRef.onSnapshot(async (table) => {
          setTable(table.data())
          let currentEmployee = table.data().currentEmployee
          console.log(currentEmployee)
          if(currentEmployee === ''){
            const ref = await db
              .collection('merchant_users')
              .doc(id)
              .get()
            let user = {}
            if (role === "Merchant") {
              user.employee_name = ref.data().user_name
              user.role = ref.data().role
              user.id = ref.id
            } 
            else {
              user.employee_name = ref.data().employee_name
              user.role = ref.data().role
              user.id = ref.id
            }
            currentEmployee = user.employee_name
            dbRef.update({
              currentEmployee: user.employee_name
            })
          }
          setValue('employee', currentEmployee)
        })
      }
    }
    tableData()
    return unsubscribe
  }, [dbRef])

  const onChange = (data) => {
    dbRef.update({
      currentEmployee: data.employee
    })
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
