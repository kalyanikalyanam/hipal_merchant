import React, { useEffect, useState } from "react";
import { db } from "../../config";

const HistoryView = () => {
  const [kotItems, setKotItems] = useState();
  useEffect(() => {
    let unsubscribe;
    const businessId = sessionStorage.getItem("businessId");
    console.log(businessId);
    const getData = async () => {
      let start = new Date();
      start.setHours(0, 0, 0, 0);
      let end = new Date();
      end.setHours(23, 59, 59, 999);
      const ref = db
        .collection("kotItems")
        .where("businessId", "==", businessId);
      try {
        const querySnapshot = await ref.get();
        let kotItems = [];
        querySnapshot.forEach((doc) => {
          kotItems.push({ id: doc.id, ...doc.data() });
        });
        kotItems.filter(
          (item) => item.createdOn > start && item.createdOn < end
        );
        setKotItems(kotItems);
      } catch (e) {
        console.log(e);
      }
      unsubscribe = ref.onSnapshot((querySnapshot) => {
        let kotItems = [];
        querySnapshot.forEach((doc) => {
          kotItems.push({ id: doc.id, ...doc.data() });
        });
        kotItems.filter(
          (item) => item.createdOn > start && item.createdOn < end
        );
        setKotItems(kotItems);
      });
    };
    getData();
  }, []);

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
      {kotItems &&
        kotItems.map((kot, index) => {
          let ready = 0;
          kot.items.forEach((item) => {
            if (item.status === "Done") {
              ready++;
            }
          });
          const [date, time] = dateString(new Date(kot.createdOn));
          return (
            <>
              <div className="kot-table_row bg-trans  p-10">
                <span className="bg text-left">- 12/07/2021 -</span>
              </div>

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
                  <span>{kot.status}</span>
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
                    data-toggle="modal"
                    data-target="#view_table"
                  >
                    View
                  </span>
                </div>
              </div>

              {/* <div
                className="modal fade"
                id="view_table"
                tabindex="-1"
                role="dialog"
                aria-labelledby="smallmodalLabel"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-sm kot_table_pop"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-body">
                      <div className="col-12 w-100-row kot_head">
                        Table: 07A <span data-dismiss="modal">X</span>
                      </div>

                      <div className="col-12 w-100-row kot_waiter">
                        Waiter: Varun S
                      </div>

                      <div className="col-12 w-100-row kot_date">
                        Items{" "}
                        <span>
                          {date}| {time}
                        </span>
                      </div>

                      <div className="col-12 w-100-row bdr-top1">
                        <div className="w-10 no">
                          <span className="check-icon">
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </span>
                        </div>

                        <div className="w-80 table_kotdata">
                          <h5>Pepporoni Pizza(Large)</h5>
                          <p>+ Cheese Burst</p>
                          <p>+ Mushrooms</p>
                          <p>+ Green Peppers</p>
                        </div>
                        <div className="w-10 text-right">
                          x<span className="big_font">1</span>
                        </div>
                      </div>

                      <div className="col-12 w-100-row bdr-top1">
                        <div className="w-10 no">
                          <span className="check-icon">
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </span>
                        </div>

                        <div className="w-80 table_kotdata">
                          <h5>Pepporoni Pizza(Large)</h5>
                        </div>
                        <div className="w-10 text-right">
                          x<span className="big_font">2</span>
                        </div>
                      </div>

                      <div className="col-12 w-100-row bdr-top1">
                        <div className="col-12 p-0 text-center">
                          <button type="button" className="btn btn_print_kot">
                            Print
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </>
          );
        })}
    </div>
  );
};

export default HistoryView;
