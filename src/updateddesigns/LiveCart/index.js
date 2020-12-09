import React, {useEffect, useReducer, useState} from 'react'
import Header from '../../component/header'
import Sidebar from '../../component/sidebar'
import { db } from '../../config'
import {reducer, initState} from './reducer'
import  Table from './table' 
import {tableContext, dispatchContext, stateContext, balanceContext} from './contexts'
import {Modal as BootstrapModal} from 'react-bootstrap'
import AdvancedOptions from './Modals/advancedOptions'
import RightSideBar from './rightSidebar'
import BottomComp from './bottomComp'

import EditModal from './Modals/editModal'
import AddCustomerModal from './Modals/addCustomerModal'
import AddCustomerForm from './Modals/addCustomerFormModal'
import KotModal from './Modals/kotModal'
import BillModal from './Modals/billModal'
import MoveModal from './Modals/moveModal'
import Loader from '../../component/Loader'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import MergeModal from './Modals/mergeModal'
import SwapModal from './Modals/swapModal'

const MainPage = (props) => {
    const [reducerState, dispatch] = useReducer(reducer, initState)i:w
    const [userData, setUserData] = useState("")
    const [dbRef, setDbRef] = useState(null)
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        const dbr= db.collection("tables").doc(props.match.params.tableId)
        const userData = {
            businessLogo: sessionStorage.getItem("BusinessLogo"),
            email: sessionStorage.getItem("email"),
            username: sessionStorage.getItem("username"),
            businessName: sessionStorage.getItem("BusinessName")
        }
        setDbRef(dbr)
        setUserData(userData)
        setLoading(false)
    }, [])

    return (<>{!loading ? 
        <>
            <ToastContainer limit={5}
            />
        <dispatchContext.Provider value={dispatch}><stateContext.Provider value={reducerState}>
            <tableContext.Provider value={dbRef}><balanceContext.Provider value={reducerState.balance}>
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
                                                                src={userData.businessLogo && userData.businessLogo}
                                                                style={{
                                                                    width: "100%",
                                                                    height: "100%",
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="company_details">
                                                            <p className="name">
                                                                {userData && userData.businessName}
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
                                                                {userData && userData.username}
                                                            </p>
                                                            <p>
                                                                {userData && userData.email}
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
                                            <Table tableId={props.match.params.tableId} dbRef={dbRef} />
                                            {/* <Info /> */}
                                        </div>

                                        <BottomComp />
                                    </div>
                                    <RightSideBar />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modals */}
                <BootstrapModal 
                    show={reducerState.advacedOptionModal}
                    onHide={() => {
                        dispatch({
                            type: 'AdvanceOptionsModalHide'
                        })
                    }}
                >
                    <AdvancedOptions />
                </BootstrapModal>
                <BootstrapModal 
                    show={reducerState.editModal}
                    onHide={() => {
                        dispatch({
                            type: 'EditModalHide'
                        })
                    }}
                >
                    <EditModal item={reducerState.editModalItem} dbRef={dbRef}  edit={reducerState.edit} />
                </BootstrapModal>
                <BootstrapModal 
                    show={reducerState.customerToTableModal}
                    onHide={() => {
                        dispatch({
                            type: 'CustomerToTableModalHide'
                        })
                    }}

                >
                    <AddCustomerModal dbRef={dbRef} />
                </BootstrapModal>
                <BootstrapModal show={reducerState.addUserModal}>
                    <AddCustomerForm />
                </BootstrapModal>
                <BootstrapModal 
                    show={reducerState.kotModal} 
                    onHide={() => {
                        dispatch({
                            type: 'KOTModalHide'
                        })
                    }}
                >
                    <KotModal data={reducerState.kotItems} />
                </BootstrapModal>
                <BootstrapModal 
                    show={reducerState.billViewModal}
                    onHide={() => {
                        dispatch({
                            type: 'BillViewModalHide'
                        })
                    }}
                >
                    <BillModal data={reducerState.billData} />
                </BootstrapModal>
                <BootstrapModal 
                    show={reducerState.moveModal}
                    onHide={() => {
                        dispatch({
                            type: 'MoveModalHide'
                        })
                    }}
                >
                    <MoveModal />
                </BootstrapModal>
                <BootstrapModal 
                    show={reducerState.mergeModal}
                    onHide={() => {
                        dispatch({
                            type: 'MergeModalHide'
                        })
                    }}
                >
                <MergeModal />
                </BootstrapModal>
                <BootstrapModal 
                    show={reducerState.swapModal}
                    onHide={() => {
                        dispatch({
                            type: 'SwapModalHide'
                        })
                    }}
                >
                    <SwapModal />
                </BootstrapModal>
            </balanceContext.Provider>
            </tableContext.Provider></stateContext.Provider></dispatchContext.Provider></>
        : <Loader /> }
        </>
    )
}

export default MainPage 