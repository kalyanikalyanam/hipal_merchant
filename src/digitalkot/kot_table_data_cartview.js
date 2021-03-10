import React, { useEffect, useState } from "react";
import { db } from "../config";
import ItemsView from "./itemsView";
import Sidebar from "../component/sidebar";
import Header from "../component/header";

const KOTTableDataCartView = () => {
  const [items, setItems] = useState([]);
  const [stations, setStations] = useState([]);
  useEffect(() => {
    const businessId = sessionStorage.getItem("businessId");
    var unsubscribe;
    const getItems = async () => {
      const ref = db
        .collection("kotItems")
        .where("businessId", "==", businessId);
      const querySnapshot = await ref.get();
      let items = [];
      querySnapshot.forEach((childSnapshot) =>
        items.push({ ...childSnapshot.data() })
      );
      setItems(items);

      unsubscribe = ref.onSnapshot((querySnapshot) => {
        let items = [];
        querySnapshot.forEach((childSnapshot) =>
          items.push({ ...childSnapshot.data() })
        );
        setItems(items);
      });
      console.log(items);
    };
    getItems();
    return unsubscribe;
  }, []);

  useEffect(() => {
    const businessId = sessionStorage.getItem("businessId");
    var unsubscribe1;
    const getStations = async () => {
      const ref = db
        .collection("settings_station")
        .where("businessId", "==", businessId);
      const querySnapshot = await ref.get();
      let stations = [];
      querySnapshot.forEach((childSnapshot) =>
        stations.push({ ...childSnapshot.data() })
      );
      setStations(stations);

      unsubscribe1 = ref.onSnapshot((querySnapshot) => {
        let stations = [];
        querySnapshot.forEach((childSnapshot) =>
          stations.push({ ...childSnapshot.data() })
        );
        setStations(stations);
      });
      console.log(stations);
    };
    getStations();
    return unsubscribe1;
  }, []);

  return (
    <>
      <div className="page-wrapper">
        <Sidebar />
        <div className="page-container">
          <Header />

          <div className="main-content">
            <div className="section__content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12 p-0">
                    <div className="search_profile">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="company_name_box">
                            <div className="company_iocn"></div>
                            <div className="company_details">
                              <p className="name">
                                {sessionStorage.getItem("BusinessName")}{" "}
                              </p>
                              <p className="open">
                                OPEN
                                <i
                                  className="fa fa-circle"
                                  aria-hidden="true"
                                ></i>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="search_top">
                            <a href="#" className="search_icon">
                              <i className="fas fa-search"></i>
                            </a>
                            <input
                              className="search_input"
                              type="text"
                              name=""
                              placeholder="Search..."
                            />
                          </div>
                        </div>
                        <div className="col-md-3 ">
                          <div className="profile_user">
                            <span className="usericon">
                              <img src="/images/icon/profile.jpg" />
                            </span>
                            <span className="profile_data">
                              <p className="name">
                                {sessionStorage.getItem("username")}
                              </p>
                              <p>{sessionStorage.getItem("email")}</p>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mt-30">
                  <div className="col-md-8 p-0">
                    <div className="orders_menu my_menu_link">
                      <ul>
                        {stations &&
                          stations.map((stations) => {
                            return (
                              <li>
                                <a href="#">
                                  {/* className="activemenu" */}
                                  {stations.station_name}
                                </a>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </div>

                  <div className="col-md-4 p-0">
                    <div className="kot_btns">
                      <span className="btns">
                        <a href="#">History</a>
                      </span>
                      <span className="btns">
                        <a href="#" className="activemenu">
                          Card View
                        </a>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="row m-t-30">
                  <div className="col-md-10 p-0">
                    <div className="indicator_restaurent">
                      <span>
                        <i
                          className="fa fa-circle dinein_color"
                          aria-hidden="true"
                        ></i>{" "}
                        Dine in
                      </span>

                      {/* <span>
                        <i
                          className="fa fa-circle takeway_color"
                          aria-hidden="true"
                        ></i>{" "}
                        Take away
                      </span>
                      <span>
                        <i
                          className="fa fa-circle delivery_color"
                          aria-hidden="true"
                        ></i>{" "}
                        Delivery
                      </span> */}
                    </div>
                  </div>
                </div>

                <div className="row m-t-30 m-b-30">
                  <div className="list-kot">
                    {items &&
                      items.map(
                        (item, index) => (
                          <div className="box-kot">
                            <div className="kot-card ">
                              {/* selected */}
                              <div className="headrow">
                                <h1>
                                  {item.type}{" "}
                                  <i
                                    className="fa fa-circle dinein_color"
                                    aria-hidden="true"
                                  ></i>
                                  <span>
                                    <i className="fas fa-ellipsis-v"></i>
                                  </span>
                                </h1>
                              </div>
                              <div className="main-head">
                                <span>Table: {item.tableName}</span>
                                <span>0:44</span>
                              </div>
                              <div className="waiterrow">Waiter: Varun S</div>
                              <div className="iteamsrow-gray">
                                <span>Iteams</span>
                                <span>0/2</span>
                              </div>

                              <div className="iteamsrow">
                                <div className="w-15">
                                  <i className="far fa-square"></i>
                                </div>
                                <div className="w-70">
                                  <h5>Pepporoni Pizza(Large)</h5>
                                  <p>+ Cheese Burst</p>
                                  <p>+ Mushrooms</p>
                                  <p>+ Green Peppers</p>
                                </div>
                                <div className="w-15 text-right">
                                  x<span className="bigfont">2</span>
                                  <img src="/images/icon/info-icon-new.png" />
                                </div>
                              </div>
                              <div className="iteamsrow">
                                <div className="w-15">
                                  <i className="far fa-square"></i>
                                </div>
                                <div className="w-70">
                                  <h5>Loaded Nachos(full)</h5>
                                </div>

                                <div className="w-15 text-right">
                                  x<span className="bigfont">2</span>
                                </div>
                              </div>
                              <div className="iteamsrow text-center">
                                <button
                                  type="button"
                                  className="btn served_kot"
                                >
                                  Served
                                </button>
                              </div>
                            </div>
                          </div>
                        )
                        // <div key={item.id}>{item.name}</div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KOTTableDataCartView;
