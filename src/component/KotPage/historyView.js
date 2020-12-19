import React, { useEffect, useRef, useState } from "react";
import {Modal} from 'react-bootstrap'
import { useReactToPrint } from 'react-to-print'

const HistoryView = ({kots, station}) => {
  const [kotItems, setKotItems] = useState([]);
  const [dateItems, setDateItems] = useState([])
  const [selectedStation, setSelectedStation] = useState("")
  const [modalShow, setModalShow] = useState(false)
  const [modalItem, setModalItem] = useState(null)
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })

  useEffect(() => {
    let kotItems = kots
    kotItems = kots.filter(kot => kot.status === 'served')
    const groups = kotItems.reduce((groups, kot) => {
      const date = new Date(kot.createdOn).toISOString().split('T')[0]
      if(!groups[date]){
        groups[date] =[]
      }
      groups[date].push(kot)
      return groups
    }, {})

    const groupedArrays = Object.keys(groups).map(date => {
      return {
        date,
        kots: groups[date]
      }
    })
    setDateItems(groupedArrays)
    setKotItems(kotItems)
  }, [kots]);

  useEffect(() => {
    if (station !== "" && kotItems.length > 0) {
      setSelectedStation(station)
    }
  }, [station, kotItems])

  const handleModalHide = () => {
    setModalShow(false)
    setTimeout(() => {
      setModalItem(null)
    }, [200])
  }

  const handleModalShow = (item) => {
    console.log(item)
    setModalItem(item)
    setModalShow(true)
  }

  const dateString = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let AmPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return [`${day}-${month}-${year}`, `${hours}:${minutes} ${AmPm}`];
  };
  return (
    <div className="col-md-12 p-0">
      <div className="kot-table_row head">
        <div className="databox td1"></div>
        <div className="databox td2">Order Type History</div>
        <div className="databox td3">Table No</div>
        <div className="databox td4">Table status</div>
        <div className="databox td5 big">Date & Time</div>
        <div className="databox td6 small">Station no</div>
        <div className="databox td7">Order ID</div>
        <div className="databox td8">View Order</div>
      </div>
      {dateItems && dateItems.map((kotItems, index) => {
        return (
          <div key={index}>
            <div className="kot-table-row bg-trans">
              {kotItems.date}
              {kotItems.kots
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
                  const [date, time] = dateString(new Date(kot.createdOn));
                  return (
                    <div key={index}>
                      <div className="kot-table_row">
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
                          <span className='served-color'>{kot.status}</span>
                        </div>
                        <div className="databox td5 big">
                          {" "}
                          {date} | {time}
                        </div>
                        <div className="databox td6 small">Station</div>
                        <div className="databox td7">{kot.orderId}</div>
                        <div className="databox td8">
                          <span
                            className="btn view_order_btn_td padd_kot"
                            onClick={() => {
                              handleModalShow(kot)
                            }}
                          >
                            View
                  </span>
                        </div>
                      </div>

                      {}
                    </div>
                  );
                })}
            </div>

          </div>
        )
      })}
      
      <Modal show={modalShow} onHide={handleModalHide}>
        {modalItem &&
          <div className="modal-content">
            <div className="modal-body" ref={componentRef}>
              <div className="col-12 w-100-row kot_head">
                Table: {modalItem.tableName} 
                <span  
                  onClick={handleModalHide}
                >
                  X
                </span>
              </div>

              <div className="col-12 w-100-row kot_waiter">
                Waiter: {modalItem.employee}
              </div>

              <div className="col-12 w-100-row kot_date">
                Items{" "}
                <span>
                {modalItem.createdOn && dateString(new Date(modalItem.createdOn))[0] + ' | ' + dateString(new Date(modalItem.createdOn))[1]}
                  </span>
              </div>

            {modalItem.items &&
              modalItem.items
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
                .map((item, index) => {
                  return (
                    <div className="col-12 w-100-row bdr-top1" key={index}>
                      <div className="w-10 no">
                        <span className="check-icon">
                          <i className="fa fa-check" aria-hidden="true"></i>
                        </span>
                      </div>

                      <div className="w-80 table_kotdata">
                        <h5>{item.name}</h5>
                      </div>
                      <div className="w-10 text-right">
                        x<span className="big_font">{item.quantity}</span>
                      </div>
                    </div>
                  )
                })
            }
              <div className="col-12 w-100-row bdr-top1">
                <div className="col-12 p-0 text-center">
                  <button 
                    type="button" 
                    className="btn btn_print_kot"
                    onClick={handlePrint}
                  >
                    Print
                          </button>
                </div>
              </div>
            </div>
          </div>
      }
      </Modal>
    </div>
  );
};

export default HistoryView;
