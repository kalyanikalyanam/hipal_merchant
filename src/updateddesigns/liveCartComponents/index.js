import React, { useEffect, useState, useReducer } from 'react'
import firebase from '../../config'
import Modal from 'react-modal'

import Header from '../../component/header'
import Sidebar from '../../component/sidebar';
import Table from './table'
import Info from './info'
import Menu from './menu'
import LeftSidebar from './leftSidebar';
import ModalForm from './ModalForm'
import {dispatchContext, liveCartContext, modalContext, orderContext} from './contexts'
import reducer from './reducer'

Modal.setAppElement(document.getElementById('root'));
const customStyles = {
  content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
  }
};

const initState = {
    liveCart: [],
    order: [],
    bill: [],
    show: false,
    modalItem: {}
}

const LiveCartPage = (props) => {
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({})
    const [reducerState, dispatch] = useReducer(reducer, initState)
    const getUserdata = async () => {
        var sessionid = sessionStorage.getItem("roleId");
        var businessid = sessionStorage.getItem("businessId");
        if (sessionid && businessid) {
            const ref = await firebase.database().ref('merchant_users/' + sessionid)
            const snapshot = await ref.on('value')
            var users = snapshot.val();
            sessionStorage.setitem("username", users.user_name);
            sessionStorage.setitem("email", users.email_id);
            setState({
                ...state,
                userrole: users.role,
                loading: false,
            });

            const businessRef = await firebase.database().ref('merchant_bussiness_details/' + businessid).on()
            const Bsnapshot = await businessRef.on("value")
            var business = Bsnapshot.val();
            sessionStorage.setitem("businessId", business.businessid);
            sessionStorage.setitem("businessName", business.business_name);
            sessionStorage.setitem("businessLogo", business.business_logo);
        }
    }

    useEffect(() => {
        setLoading(true)
        getUserdata()
        setLoading(false)
    }, [])
    return(
        <dispatchContext.Provider value={dispatch}>
            <liveCartContext.Provider value={reducerState.liveCart}>
                <orderContext.Provider value={reducerState.order}>
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
                                                            <div className="company_iocn"></div>
                                                            <div className="company_details">
                                                                <p className="name">The Coffee Cup Sanikpuri </p>
                                                                <p className="open">OPEN <i className="fa fa-circle" aria-hidden="true"></i></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="search_top">
                                                            <a href="#" className="search_icon"><i className="fas fa-search"></i></a>
                                                            <input className="search_input" type="text" name="" placeholder="Search..." />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 ">
                                                        <div className="profile_user">
                                                            <span className="usericon">
                                                                <img src="/images/icon/profile.jpg" />
                                                            </span>
                                                            <span className="profile_data">
                                                                <p className="name">{sessionStorage.getItem("username")}</p>
                                                                <p>{sessionStorage.getItem("email")}</p>
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
                                                <Table tableId={props.match.params.params} />
                                                <Info />
                                            </div>
                                            <Menu businessId={sessionStorage.getItem("businessId")} />
                                        </div>
                                        <LeftSidebar />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </orderContext.Provider>
            </liveCartContext.Provider>
            <modalContext.Provider value={reducerState.modalItem}>
                <Modal isOpen={reducerState.show} style={customStyles}>
                    <ModalForm item={reducerState.modalItem} />
                </Modal>
            </modalContext.Provider>
        </dispatchContext.Provider>
    )
}

export default LiveCartPage