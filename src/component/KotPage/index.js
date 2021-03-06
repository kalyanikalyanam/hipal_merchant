import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar";
import Header from "../header";

import ListView from "./listView";
import CardView from "./cardView";
import HistoryView from "./historyView";
import { db } from "../../config";

const KOTPage = () => {
  const [stations, setStations] = useState(null);
  const [station, setStation] = useState(1);
  const [view, setView] = useState(1);
  const [kots, setKots] = useState();
  useEffect(() => {
    const businessId = sessionStorage.getItem("businessId");
    let unsubscribe;
    const getItems = async () => {
      const ref = db
        .collection("kotItems")
        .where("businessId", "==", businessId);
      const data = await ref.get();
      let kots = [];
      data.forEach((doc) => {
        kots.push({ id: doc.id, ...doc.data() });
      });
      setKots(kots);
      unsubscribe = ref.onSnapshot((data) => {
        let kots = [];
        data.forEach((doc) => {
          kots.push({ id: doc.id, ...doc.data() });
        });
        setKots(kots);
      });
    };
    const getStations = async () => {
      const querySnapshot = await db
        .collection("settings_station")
        .where("businessId", "==", businessId)
        .get();
      let stations = [];
      querySnapshot.forEach((doc) =>
        stations.push({ id: doc.id, ...doc.data() })
      );
      setStations(stations);
      setStation(stations[0].station_name);
    };
    getItems();
    getStations();
    return unsubscribe;
  }, []);

  const viewPage =
    view === 1 ? (
      <CardView kots={kots ? kots : []} station={station || ""} />
    ) : view === 2 ? (
      <ListView kots={kots ? kots : []} station={station || ""} />
    ) : (
      <HistoryView kots={kots ? kots : []} station={station || ""} />
    );

  return (
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
                          <div className="company_iocn">
                            <img
                              src={sessionStorage.getItem("BusinessLogo")}
                              style={{
                                width: "100%",
                                height: "100%",
                              }}
                            />
                          </div>
                          <div className="company_details">
                            <p className="name">
                              {sessionStorage.getItem("BusinessName")}
                            </p>
                            <p className="open">
                              OPEN{" "}
                              <i
                                className="fa fa-circle"
                                aria-hidden="true"
                              ></i>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        {/* <div className="search_top">
                          <a href="#" className="search_icon">
                            <i className="fas fa-search"></i>
                          </a>
                          <input
                            className="search_input"
                            type="text"
                            name=""
                            placeholder="Search..."
                          />
                        </div> */}
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
                        stations.map((sta, index) => (
                          <li key={index}>
                            <a
                              style={{ cursor: "pointer" }}
                              className={
                                station === sta.station_name
                                  ? "activemenu"
                                  : null
                              }
                              onClick={() => setStation(sta.station_name)}
                            >
                              {sta.station_name}
                            </a>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>

                <div className="col-md-4 p-0">
                  <div className="kot_btns">
                    <span className="btns">
                      <a
                        style={{ cursor: "poitner" }}
                        className={view === 3 ? "activemenu" : null}
                        onClick={() => setView(3)}
                      >
                        History
                      </a>
                    </span>
                    <span className="btns">
                      <a
                        style={{ cursor: "pointer" }}
                        className={view === 1 ? "activemenu" : null}
                        onClick={() => {
                          if (view === 1) setView(2);
                          else setView(1);
                        }}
                      >
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
                    <span>
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
                    </span>
                  </div>
                </div>
              </div>
              <div className="row m-t-30 m-b-30">{viewPage}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KOTPage;
