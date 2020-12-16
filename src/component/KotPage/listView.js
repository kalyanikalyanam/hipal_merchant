import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const ListView = ({ kots }) => {
  const [modalShow, setModalShow] = useState(false);
  const [kotItems, setKotItems] = useState([]);
  const [modalKot, setModalKot] = useState({});
  useEffect(() => {
    let start = new Date();
    start.setHours(0, 0, 0, 0);
    let end = new Date();
    end.setHours(23, 59, 59, 999);
    let kotItems = kots;
    kotItems.filter((item) => item.createdOn > start && item.createdOn < end);
    setKotItems(kotItems);
  }, [kots]);

  const openModal = (kot) => {
    setModalKot(kot);
    setModalShow(true);
  };

  const closeModal = () => {
    setModalKot({});
    setModalShow(false);
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
          kotItems.map((kot, index) => {
            let ready = 0;
            kot.items.forEach((item) => {
              if (item.status === "Done") {
                ready++;
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
        <div class="modal-content">
          <div class="modal-body">
            <div class="col-12 w-100-row kot_head">
              Table: {modalKot.tableName}
              <span onClick={closeModal}>X</span>
            </div>
            <div class="col-12 w-100-row kot_waiter">
              Waiter: {modalKot.employee}
            </div>
            <div class="col-12 w-100-row kot_date">
              Items <span>21/07/2021 | 12.20pm</span>
            </div>
            {modalKot.items &&
              modalKot.items.map((item) => {
                return (
                  <>
                    <div class="col-12 w-100-row bdr-top1">
                      <div class="w-10 no">
                        <span class="check-icon">
                          <i class="fa fa-check" aria-hidden="true"></i>
                        </span>
                      </div>
                      <div class="w-80 table_kotdata">
                        <h5>{item.name}</h5>
                      </div>
                      <div class="w-10 text-right">
                        x<span class="big_font">1</span>
                      </div>
                    </div>
                    {item.instructions && item.instructions !== "" && (
                      <div class="col-12 w-100-row p-0">
                        <div class="w-10 no pb-10">
                          <i
                            class="fa fa-info-circle info-circle"
                            aria-hidden="true"
                          ></i>
                        </div>
                        <div class="w-90 color_black">
                          (Make the pizza little spicy)
                        </div>
                      </div>
                    )}
                  </>
                );
              })}
            <div class="col-12 w-100-row bdr-top1">
              <div class="col-12 p-0 text-center">
                <button type="button" class="btn btn_print_kot">
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
