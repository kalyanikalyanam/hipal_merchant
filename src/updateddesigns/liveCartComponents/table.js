<<<<<<< HEAD
import React, { useEffect, useState, useContext } from "react";
import firebase from "../../config";
import { dispatchContext } from "./contexts";
import * as actions from "./actionTypes";
=======
import React, { useEffect, useState, useContext } from 'react'
import firebase from '../../config'
import {dispatchContext} from './contexts'
import * as actions from './actionTypes'
>>>>>>> 724c2aab5b97fe1d86ebdd9949a7d6480e6b8494

const Table = ({ tableId }) => {
  const [state, setState] = useState({});
  const dispatch = useContext(dispatchContext);
  const getData = async () => {
    const ref = firebase.database().ref("tables_with_floors/" + tableId);
    ref.on("value", (snapshot) => {
      const tableData = snapshot.val();
      setState(tableData);
      dispatch({
        type: actions.ADDTABLEDATA,
        table: tableData,
      });
    });
  };
  useEffect(() => {
    getData();
  }, []);

<<<<<<< HEAD
  return (
    <div className="col-md-7">
      <div className="staff_box row">
        <div className="col-md-3">
          <div className="kot_box">
            <div className="cookhead">Cooking</div>
            <div className="table_small">
              <div className="people_row">
                <span className="top fill"></span>
                <span className="top fill"></span>
              </div>
              <div className="table_no">{state ? state.table_name : null}</div>
              <div className="people_row">
                <span className="bottom nonfille"></span>
                <span className="bottom fill"></span>
              </div>
            </div>
            <div className="time">
              <span>2:02</span>
=======
const Table = ({tableId}) => {
    const [state, setState] = useState({})
    const dispatch = useContext(dispatchContext)
    const getData = async () => {
        const ref = firebase.database().ref('tables_with_floors/' + tableId)
        ref.on('value',snapshot => {
            const tableData = snapshot.val()
            setState(tableData)
            dispatch({
                type: actions.ADDTABLEDATA,
                table: tableData
            })
        })
    }
    useEffect(() => {
        getData()
    },[])
    
    return (
        <div className="col-md-7">
            <div className="staff_box row">
                <div className="col-md-3">
                    <div className="kot_box">
                        <div className="cookhead">Cooking</div>
                        <div className="table_small">
                            <div className="people_row">
                                <span className="top fill"></span>
                                <span className="top fill"></span>
                            </div>
                            <div className="table_no">{state ? state.table_name : null}</div>
                            <div className="people_row">
                                <span className="bottom nonfille"></span>
                                <span className="bottom fill"></span>
                            </div>

                        </div>
                        <div className="time"><span>2:02</span></div>
                    </div>


                </div>
                <div className="col-md-5">

                    <div className="names_options"><a href="#" className="active_btn">
                        <img src="/images/icon/icon_users_w.png" />
                                                            Customers Names</a></div>
                    <div className="names_options m-t-20"><a href="#">
                        <img src="/images/icon/icon_settings.svg" />
                                                            Advanced Options</a></div>

                </div>
                <div className="col-md-4">
                    <div className="chooseemp_dropdown">
                        <select className="form-control">
                            <option>Choose Employee</option>
                            <option>Employee 1</option>
                            <option>Employee 2</option>
                            <option>Employee 3</option>
                            <option>Employee 4</option>
                        </select>
                    </div>
                </div>
>>>>>>> 724c2aab5b97fe1d86ebdd9949a7d6480e6b8494
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="names_options">
            <a href="#" className="active_btn">
              <img src="/images/icon/icon_users_w.png" />
              Customers Names
            </a>
          </div>
          <div className="names_options m-t-20">
            <a href="#">
              <img src="/images/icon/icon_settings.svg" />
              Advanced Options
            </a>
          </div>
        </div>
        <div className="col-md-4">
          <div className="chooseemp_dropdown">
            <select className="form-control">
              <option>Choose Employee</option>
              <option>Employee 1</option>
              <option>Employee 2</option>
              <option>Employee 3</option>
              <option>Employee 4</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
