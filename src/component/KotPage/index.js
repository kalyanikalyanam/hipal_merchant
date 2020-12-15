import React, { useEffect, useState } from 'react'
import Sidebar from '../sidebar'
import Header from '../header'

import ListView from './listView'
import CardView from './cardView'
import HistoryView from './historyView'
import { db } from '../../config'

const stations = [
    { name: "Station 1"},
    { name: "Station 2"},
    { name: "Station 3"},
    { name: "Station 4"},
]
const KOTPage = () => {
    const [station, setStation] = useState(1)
    const [view, setView] = useState(1)
    const [kots, setKots] = useState()
    useEffect(() => {
        const businessId = sessionStorage.getItem("businessId")
        let unsubscribe
        const getItems = async () => {
            const ref = db
                .collection("kotItems")
                .where('businessId' , "==" ,businessId)
            const data = await ref.get()
            let kots = []
            data.forEach(doc => {
                kots.push({id: doc.id, ...doc.data()})
            })
            setKots(kots)
            unsubscribe = ref.onSnapshot(data => {
                let kots = []
                data.forEach(doc => {
                    kots.push({ id: doc.id, ...doc.data() })
                })
                setKots(kots)
            })
        }
        getItems()
        return unsubscribe
    } ,[])

    const viewPage = view === 1 ? <CardView kots={kots ? kots: [] }/> : 
                     view === 2 ? <ListView kots={kots ? kots : []} /> : <HistoryView />

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
                                                        <div className="company_iocn"></div>
                                                        <div className="company_details">
                                                            <p className="name">The Coffee Cup Sanikpuri </p>
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
                                                            <p className="name">Krisha Kola</p>
                                                            <p>krishna.kola@gmail.com</p>
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
                                                {stations && stations.map((sta, index) => (
                                                    <li >
                                                        <a 
                                                            style={{cursor:'pointer'}} 
                                                            className={
                                                                station === index + 1 ?
                                                                    'activemenu' :
                                                                    null
                                                            }
                                                            onClick={() => setStation(index + 1)}
                                                        >
                                                            {sta.name}
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
                                                    style={{cursor: 'poitner'}}
                                                    className={view === 3 ? 'activemenu' : null}
                                                    onClick={() => setView(3)}
                                                >
                                                    History
                                                </a>
                                            </span>
                                            <span className="btns">
                                                <a 
                                                    style={{cursor: 'pointer'}}
                                                    className = {view === 1 ? 'activemenu' : null} 
                                                    onClick={() => {
                                                        if(view === 1) setView(2)
                                                        else setView(1)
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

                                <div className="row m-t-30 m-b-30">
                                    {viewPage}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default KOTPage