import React, { useEffect, useRef, useState } from "react";
import Timer from "react-compound-timer";
import { db } from "../../config";
import { Modal } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
const CardView = ({ kots, station }) => {
  const [kotItems, setKotItems] = useState([]);
  const [selectedStation, setSelectedStation] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalKot, setModalKot] = useState({});
  const componentRef = useRef();
  const getDate = (time) => {
    const date = new Date(time);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let ampm = hours >= 12 ? "pm" : "am";
    hours %= 12;
    return `${day}/${month}/${year} | ${hours}.${minutes.substr(-2)}${ampm}`;
  };

  useEffect(() => {
    let kotItems = kots;
    kotItems = kotItems.filter((kot) => kot.status !== "served");
    setKotItems(kotItems);
  }, [kots]);

  useEffect(() => {
    if (station !== "" && kotItems.length > 0) {
      setSelectedStation(station);
    }
  }, [station, kotItems]);

  const handleTimerStop = (kot) => {
    const newKot = kot;
    newKot.status = "served";
    setTimeout(() => {
      db.collection("kotItems").doc(kot.id).update(newKot);
    }, [2000]);
  };
  const handleServed = async (kot) => {
    let newKot = kot;
    let newItems = newKot.items;
    newItems.forEach((item) => {
      item.status = "served";
    });
    const ref = db.collection("tables").doc(kot.tableId);

    await db.collection("kotItems").doc(kot.id).update(newKot);

    const table = await ref.get();

    let orders = table.data().orders;
    orders.forEach((item) => {
      if (item.orderPageId === item.orderPageId) {
        item.status = "served";
      }
    });

    ref.update({
      orders,
    });
  };

  const handleCheckMark = async (it, kot) => {
    let flag = false;
    let newKot = kot;
    let newItems = newKot.items;
    if (it.status === "served") {
      flag = true;
      newItems.forEach((item) => {
        if (item.id === it.id) {
          item.status = "cooking";
        }
      });
    } else {
      newItems.forEach((item) => {
        if (item.id === it.id) {
          item.status = "served";
        }
      });
    }

    await db.collection("kotItems").doc(kot.id).update(newKot);

    const ref = db.collection("tables").doc(kot.tableId);

    const table = await ref.get();

    let orders = table.data().orders;
    orders.forEach((item) => {
      if (item.orderPageId === it.orderPageId) {
        if (flag) item.status = "cooking";
        else item.status = "served";
      }
    });
    ref.update({
      orders,
    });
  };

  const openModal = (kot) => {
    setModalKot(kot);
    setModalShow(true);
  };

  const closeModal = () => {
    setModalKot({});
    setModalShow(false);
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div className="list-kot">
        {kotItems &&
          kotItems
            .filter((kot) => {
              let items = kot.items.filter((item) => {
                let flag = false;
                item.station.forEach((sta) => {
                  if (sta === selectedStation) flag = true;
                });
                return flag;
              });
              return items.length > 0;
            })
            .map((kot) => {
              let served = false;
              let ready = 0;
              kot.items.forEach((item) => {
                if (item.status === "served") {
                  ready++;
                }
              });
              if (ready === kot.items.length) {
                served = true;
              }
              return (
                <>
                  <div className="box-kot" key={kot.id}>
                    <div className={served ? "kot-card selected" : "kot-card"}>
                      <div className="headrow">
                        <h1>
                          {kot.type || "DineIn"}{" "}
                          <i
                            className="fa fa-circle dinein_color"
                            aria-hidden="true"
                          >
                            <button
                              type="button"
                              className="btn btn_print_kot"
                              onClick={handlePrint}
                            >
                              Print
                            </button>
                          </i>
                          <span>
                            <i className="fas fa-ellipsis-v"></i>
                          </span>
                        </h1>
                      </div>

                      <div className="main-head">
                        <span>Table: {kot.tableName}</span>
                        <span>
                          <Timer
                            initialTime={Date.now() - kot.createdOn}
                            onStop={() => handleTimerStop(kot)}
                          >
                            {({ start, stop }) => {
                              if (served) stop();
                              return (
                                <React.Fragment>
                                  <Timer.Hours />:
                                  <Timer.Minutes />:
                                  <Timer.Seconds />
                                </React.Fragment>
                              );
                            }}
                          </Timer>
                        </span>
                      </div>

                      <div className="waiterrow">
                        {kot.orderId || `0931280AASD90`}
                      </div>

                      <div className="iteamsrow-gray">
                        <span>Items</span>
                        <span>
                          {ready}/{kot.items.length}
                        </span>
                      </div>
                      {kot.items
                        .filter((item) => {
                          let flag = false;
                          item.station.forEach((sta) => {
                            if (selectedStation === "") flag = true;
                            else if (sta == selectedStation) {
                              flag = true;
                            }
                          });
                          return flag;
                        })
                        .map((item) => {
                          return (
                            <div
                              className={
                                item.status === "served"
                                  ? "iteamsrow checkedrow"
                                  : "iteamsrow"
                              }
                              key={item.id}
                            >
                              <div className="w-15">
                                <i
                                  className={
                                    item.status === "served"
                                      ? "far fa-check-square"
                                      : "far fa-square"
                                  }
                                  onClick={() => handleCheckMark(item, kot)}
                                />
                              </div>
                              <div className="w-70">
                                <h5>{item.name}</h5>
                              </div>
                              <div className="w-15 text-right">
                                x
                                <span className="bigfont">{item.quantity}</span>
                                {item.instructions &&
                                item.instructions !== "" ? (
                                  <img
                                    src="/images/icon/info-icon-new.png"
                                    onClick={() => {
                                      openModal(item);
                                    }}
                                  />
                                ) : null}
                              </div>
                            </div>
                          );
                        })}
                      <div className="iteamsrow text-center">
                        <button
                          type="button"
                          onClick={() => {
                            handleServed(kot);
                          }}
                          className="btn served_kot"
                        >
                          Served
                        </button>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "none" }}>
                    <div className="print_bill" ref={componentRef}>
                      <table width="100%">
                        <tbody>
                          <tr>
                            <td
                              style={{
                                textAlign: "center",
                                padding: "10px",
                                fontSize: "32px",
                                color: "#000000",
                              }}
                            >
                              Dine In
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                textAlign: "center",
                                padding: "10px",
                                color: "#000000",
                                fontSize: "32px",
                              }}
                            >
                              KOT
                            </td>
                          </tr>

                          <tr style={{ padding: "0px" }}>
                            <td
                              style={{
                                textAlign: "center",
                                padding: "10px",
                                paddingBottom: "0px",
                                color: "#000000",
                                borderBottom: "1px dashed rgba(0, 0, 0, 0.5)",
                                fontSize: "32px",
                              }}
                            >
                              <table width="100%">
                                <tbody>
                                  <tr>
                                    <td
                                      style={{
                                        textAlign: "left",
                                        padding: "3px 10px",
                                        fontSize: "32px",
                                        color: "#000000",
                                      }}
                                    >
                                      {getDate(kot.createdOn)}
                                    </td>
                                    <td
                                      style={{
                                        textAlign: "right",
                                        padding: "3px 10px",
                                        fontSize: "32px",
                                        color: "#000000",
                                      }}
                                    >
                                      <b> {kot.tableName}</b>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      style={{
                                        textAlign: "left",
                                        padding: "3px 10px",
                                        fontSize: "32px",
                                        color: "#000000",
                                      }}
                                    >
                                      {kot.setSelectedStation}
                                    </td>
                                    <td
                                      style={{
                                        textAlign: "right",
                                        padding: "3px 10px",
                                        fontSize: "32px",
                                        color: "#000000",
                                      }}
                                    >
                                      {kot.employee}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>

                          <tr>
                            <td
                              style={{
                                textAlign: "center",
                                padding: "10px",
                                color: "#000000",
                                borderBottom: "1px dashed rgba(0, 0,0, 0.5)",
                                fontSize: "32px",
                              }}
                            >
                              <table width="100%">
                                <tbody>
                                  <tr>
                                    <td
                                      style={{
                                        textAlign: "left",
                                        padding: "5px 10px 10px 10px",
                                        fontSize: "33px",
                                        color: "#000000",
                                      }}
                                    >
                                      <b>Item</b>
                                    </td>
                                    <td
                                      style={{
                                        textAlign: "center",
                                        padding: "5px 10px 10px 10px",
                                        fontSize: "33px",
                                        color: "#000000",
                                      }}
                                    >
                                      <b>Qty</b>
                                    </td>

                                    <td></td>
                                  </tr>
                                  {kot.items
                                    .filter((item) => {
                                      let flag = false;
                                      item.station.forEach((sta) => {
                                        if (selectedStation === "") flag = true;
                                        else if (sta == selectedStation) {
                                          flag = true;
                                        }
                                      });
                                      return flag;
                                    })
                                    .map((item) => {
                                      return (
                                        <tr>
                                          <td
                                            style={{
                                              textAlign: "left",
                                              padding: "3px 10px",
                                              fontSize: "35px",
                                              color: "#000000",
                                            }}
                                          >
                                            {item.name}
                                          </td>
                                          <td
                                            style={{
                                              textAlign: "center",
                                              padding: "3px 10px",
                                              fontSize: "30px",
                                              color: "#000000",
                                            }}
                                          >
                                            {item.quantity}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              );
            })}
      </div>

      <Modal show={modalShow} onHide={closeModal}>
        <div className="modal-content">
          <div className="modal-body">
            <div className="col-12 w-100-row kot_head">
              <span onClick={closeModal}>X</span>
            </div>
            <div className="col-12 w-100-row kot_waiter">Item Instructions</div>

            <div className="col-12 w-100-row bdr-top1">
              <div className="w-10 no"></div>
              <div className="w-80 table_kotdata">
                <h5>{modalKot.name}</h5>
              </div>
              <div className="w-10 text-right">
                x<span className="big_font">{modalKot.quantity}</span>
              </div>
            </div>

            <div className="col-12 w-100-row p-0">
              <div className="w-10 no pb-10">
                <i
                  className="fa fa-info-circle info-circle"
                  aria-hidden="true"
                ></i>
              </div>
              <div className="w-90 color_black">{modalKot.instructions}</div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CardView;
