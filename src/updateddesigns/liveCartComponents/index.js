import React, { useEffect, useState, useReducer, useRef } from "react";
import Modal from "react-modal";
import { db } from "../../config";

import Header from "../../component/header";
import Sidebar from "../../component/sidebar";
import Table from "./table";
import Info from "./info";
import LeftSidebar from "./leftSidebar";
import ModalForm from "./ModalForm";
import {
  dispatchContext,
  liveCartContext,
  modalContext,
  orderContext,
  billContext,
  billPageContext,
  tableContext,
  EmployeeContext,
  CustomerListContext,
  BalanceContext,
} from "./contexts";
import reducer from "./reducer";
import BottomComp from "./BottomComp";
import AddCustomerModal from "./addCustomerModal";
import AdvancedOptionsModal from "./advancedOptionsModal";
import CustomerMoveModal from "./customerMoveModal";
import CustomerMergeModal from "./customerMergeModal";
import CustomerSwapModal from "./customerSwapModal";
import AddCutomerFormModal from "./addCustomerFormModal";
import BillModal from "./billModal";
import KotModal from "./kotModal";
import * as actions from "./actionTypes";
import { updateObject } from "./reducerUtils";

Modal.setAppElement(document.getElementById("root"));
const customStyles2 = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidht: "30%",
    height: "90%",
  },
};
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidht: "30%",
  },
};
const initState = {
  liveCart: [],
  order: [],
  bill: [],
  show: false,
  modalItem: {},
  cardId: {},
  orderId: {},
  billPage: {
    billId: null,
    show: false,
  },
  currentEmployee: null,
  CustomerList: [],
  table: {},
  addCustomerShow: false,
  advancedOptionsShow: false,
  customerMergeModal: false,
  customerSwapModal: false,
  customerMoveModal: false,
  occupency: 0,
  billModal: false,
  addUserModal: false,
  editMode: false,
  formOrder: false,
  userInfo: null,
  billModalData: null,
  kotModal: false,
  kotModalData: null,
  balance: 0,
};
const LiveCartPage = (props) => {
  const init = localStorage.getItem(`${props.match.params.tableId}`)
    ? updateObject(initState, { ...JSON.parse(localStorage.getItem("data")) })
    : initState;

  const [state, setState] = useState({});
  const [businessName, setBusinessName] = useState();
  const [reducerState, dispatch] = useReducer(reducer, init);
  const firstRun = useRef(true);
  const getTableData = () => {
    db.collection("tables")
      .doc(props.match.params.tableId)
      .get()
      .then((snapshot) => {
        const tableData = snapshot.data();
        let table = JSON.parse(JSON.stringify(tableData));
        table.id = props.match.params.tableId;
        setState(table);
        const tableD = {
          table_name: table.table_name,
          status: table.status,
          table_capacity: table.table_capacity,
          id: table.id,
        };
        dispatch({
          type: actions.ADDTABLEDATA,
          table: tableD,
        });
      });
  };

  useEffect(() => {
    var businessName = sessionStorage.getItem("BusinessName");
    setBusinessName(businessName);
    getTableData();
    setState({
      tableList: [],
    });
  }, []);

  useEffect(() => {
    var data;
    const updateDb = async () => {
      data = {
        bill: reducerState.bill,
        order: reducerState.order,
        liveCart: reducerState.liveCart,
        table: reducerState.table,
        occupency: reducerState.occupency,
      };
      localStorage.setItem(
        `${props.match.params.tableId}`,
        JSON.stringify(data)
      );
      await db
        .collection("tables")
        .doc(props.match.params.tableId)
        .update({
          orderStatus: JSON.parse(JSON.stringify(data)),
        });
    };
    updateDb();
  }, [
    reducerState.table,
    reducerState.order,
    reducerState.bill,
    reducerState.liveCart,
    reducerState.occupency,
  ]);
  return (
    <dispatchContext.Provider value={dispatch}>
      <liveCartContext.Provider value={reducerState.liveCart}>
        <orderContext.Provider value={reducerState.order}>
          <billContext.Provider value={reducerState.bill}>
            <billPageContext.Provider value={reducerState.billPage}>
              <tableContext.Provider value={reducerState.table}>
                <EmployeeContext.Provider value={reducerState.currentEmployee}>
                  <CustomerListContext.Provider
                    value={reducerState.CustomerList}
                  >
                    <BalanceContext.Provider value={reducerState.balance}>
                      <div className="page-wrapper">
                        <Sidebar />
                        <div className="page-container">
                          <Header />
                          <div className="main-content">
                            <div className="section__content">
                              <div className="row">
                                <div className="col-md-12 p-0">
                                  <div className="search_profile">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="company_name_box">
                                          <div className="company_iocn">
                                            <img
                                              src={sessionStorage.getItem(
                                                "BusinessLogo"
                                              )}
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                              }}
                                            />
                                          </div>
                                          <div className="company_details">
                                            <p className="name">
                                              {businessName}
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
                                              {sessionStorage.getItem(
                                                "username"
                                              )}
                                            </p>
                                            <p>
                                              {sessionStorage.getItem("email")}
                                            </p>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row mt-30">
                                <div className="col-lg-7 cart_box_width_1">
                                  <div className="row">
                                    <Table table={reducerState.table} />
                                    <Info />
                                  </div>

                                  <BottomComp />
                                </div>
                                <LeftSidebar />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <modalContext.Provider
                        value={{
                          editMode: reducerState.editMode,
                          formOrder: reducerState.formOrder,
                        }}
                      >
                        <Modal isOpen={reducerState.show} style={customStyles}>
                          <ModalForm
                            item={reducerState.modalItem}
                            formOrder={reducerState.formOrder}
                          />
                        </Modal>
                      </modalContext.Provider>
                      <Modal
                        isOpen={reducerState.addCustomerShow}
                        style={customStyles}
                      >
                        <AddCustomerModal tableData={reducerState.table} />
                      </Modal>
                      <Modal
                        isOpen={reducerState.avancedOptionsShow}
                        style={customStyles}
                      >
                        <AdvancedOptionsModal />
                      </Modal>
                      <Modal
                        isOpen={reducerState.customerMergeModal}
                        style={customStyles}
                      >
                        <CustomerMergeModal tableData={reducerState.table} />
                      </Modal>
                      <Modal
                        isOpen={reducerState.customerSwapModal}
                        style={customStyles}
                      >
                        <CustomerSwapModal tableData={reducerState.table} />
                      </Modal>
                      <Modal
                        isOpen={reducerState.customerMoveModal}
                        style={customStyles}
                      >
                        <CustomerMoveModal
                          tableData={reducerState.table}
                          tables={state.tableList}
                        />
                      </Modal>
                      <Modal isOpen={reducerState.addUserModal}>
                        <AddCutomerFormModal
                          data={reducerState.userInfo}
                          style={customStyles}
                        />
                      </Modal>
                      <Modal
                        isOpen={reducerState.billModal}
                        style={customStyles2}
                      >
                        <BillModal data={reducerState.billModalData} />
                      </Modal>
                      <Modal
                        isOpen={reducerState.kotModal}
                        style={customStyles}
                      >
                        <KotModal data={reducerState.kotModalData} />
                      </Modal>
                    </BalanceContext.Provider>
                  </CustomerListContext.Provider>
                </EmployeeContext.Provider>
              </tableContext.Provider>
            </billPageContext.Provider>
          </billContext.Provider>
        </orderContext.Provider>
      </liveCartContext.Provider>
    </dispatchContext.Provider>
  );
};

export default LiveCartPage;
