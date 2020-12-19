import React, { useEffect, useState } from "react";
import {db} from '../../config'
import { Modal } from "react-bootstrap";


const getDate = (time) => {
  const date = new Date(time)
  let hours = date.getHours()
  let minutes = "0" + date.getMinutes()
  let day = date.getDay()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  let ampm = hours >= 12 ? 'pm' : 'am'
  hours %= 12
  return `${day}/${month}/${year} | ${hours}.${minutes.substr(-2)}${ampm}`

}
const ListView = ({ kots, station}) => {
  const [modalShow, setModalShow] = useState(false);
  const [kotItems, setKotItems] = useState([]);
  const [modalKot, setModalKot] = useState({});
  const [selectedStation, setSelectedStation] = useState('')

  useEffect(() => {
    let kotItems = kots;
    console.log("here")
    kotItems = kotItems.filter(kot => kot.status !== 'served')
    setKotItems(kotItems);
    if(station !== "")setSelectedStation(station)
  }, [kots]);

  useEffect(() => {
    if (station !== "" && kotItems.length > 0) {
      console.log("here1")
      setSelectedStation(station)
    }
  }, [kots, station])

  const handleCheck = async (it, kot) => {
    let flag = false
    let newKot = kot
    let newItems = newKot.items
    if (it.status === 'served') {
      flag = true
      newItems.forEach(item => {
        if (item.id === it.id) {
          item.status = "cooking"
        }
      })
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
  }

  const onAllServed = (kot) => {
    let newKot = kot
    newKot.status = 'served'
    setTimeout(() => {
      db.collection('kotItems').doc(kot.id).update(newKot)
      setModalShow(false)
      setModalKot({})
    }, [2000])
  }

  const openModal = (kot) => {
    console.log(kot)
    setModalKot(kot);
    setModalShow(true);
  };

  const closeModal = () => {
    setModalShow(false);
    setTimeout(() =>setModalKot({}), [200]) 
  };

  return (
    <>
      <div className="col-md-12 p-0">
        <div className="kot-table_row head">
          <div className="databox td1"></div>
          <div className="databox td2">Order Type</div>
          <div className="databox td3">Table No</div>
          <div className="databox td4">Table status</div>
          <div className="databox td5">Last Update</div>
          <div className="databox td6">Fulfilment Status</div>
          <div className="databox td7">Order ID</div>
          <div className="databox td8">View Order</div>
        </div>

        <div className="kot-table_row bg-trans  p-10">
          <span className="bg text-left">- New -</span>
        </div>

        {kotItems &&
          kotItems
          .filter(kot => {
            let items = kot.items.filter(item => {
              let flag = false
              item.station.forEach(sta => {
                if (sta === selectedStation) flag = true
              })
              return flag
            })
            return items.length > 0
          })
          .map((kot, index) => {
            let ready = 0;
            kot.items.forEach((item) => {
              if (item.status === "served") {
                ready++;
              }
              if (ready === kot.items.length) {
                onAllServed(kot)
              }
            });
            return (
              <div className="kot-table_row" key={index}>
                <div className="databox td1">
                  <span>
                    <i
                      className="fa fa-circle dinein_color"
                      aria-hidden="true"
                    ></i>
                  </span>
                </div>
                <div className="databox td2">{kot.type}</div>
                <div className="databox td3">Table {kot.tableName}</div>
                <div className="databox td4">
                  <span>
                    {ready === kot.items.length ? (
                      <span className="served-color">Served</span>
                    ) : (
                      "Cooking"
                    )}
                  </span>
                </div>
                <div className="databox td5">6 Mins</div>
                <div className="databox td6">{`${ready} / ${kot.items.length}`}</div>
                <div className="databox td7">{kot.orderId}</div>
                <div className="databox td8">
                  <span
                    className="btn view_order_btn_td padd_kot"
                    onClick={() => {
                      openModal(kot);
                    }}
                  >
                    View
                  </span>
                </div>
              </div>
            );
          })}
      </div>
      <Modal show={modalShow} onHide={closeModal}>
        <div className="modal-content">
          <div className="modal-body">
            <div className="col-12 w-100-row kot_head">
              Table: {modalKot.tableName}
              <span onClick={closeModal}>X</span>
            </div>
            <div className="col-12 w-100-row kot_waiter">
              Waiter: {modalKot.employee}
            </div>
            <div className="col-12 w-100-row kot_date">
              Items <span>{getDate(modalKot.createdOn)}</span>
            </div>
            {modalKot.items &&
              modalKot.items
              .filter(item => {
                let flag = false
                item.station.forEach(sta => {
                  if (selectedStation === "") flag = true
                  else if (sta == selectedStation) {
                    flag = true
                  }
                })
                return flag
              })
              .map((item) => {
                return (
                  <div key={item.orderPageId}>
                    <div className="col-12 w-100-row bdr-top1" >
                      <div className="w-10 no">
                        <span className="check-icon">
                          <i 
                            className={item.status === "served" ? 'fa fa-check' : 'fa fa'} 
                            onClick={() => handleCheck(item, modalKot)}
                            aria-hidden="true"></i>
                        </span>
                      </div>
                      <div className="w-80 table_kotdata">
                        <h5>{item.name}</h5>
                      </div>
                      <div className="w-10 text-right">
                        x<span className="big_font">1</span>
                      </div>
                    </div>
                    {item.instructions && item.instructions !== "" && (
                      <div className="col-12 w-100-row p-0">
                        <div className="w-10 no pb-10">
                          <i
                            className="fa fa-info-circle info-circle"
                            aria-hidden="true"
                          ></i>
                        </div>
                        <div className="w-90 color_black">
                          (Make the pizza little spicy)
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            <div className="col-12 w-100-row bdr-top1">
              <div className="col-12 p-0 text-center">
                <button type="button" className="btn btn_print_kot">
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ListView;
