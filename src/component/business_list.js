import React from "react";
import firebase from '../config';
import Sidebar from './sidebar';
import Header from './header';
import { Link } from "react-router-dom";
class BusinessList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.businessId = this.businessId.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true });
        var sessionId = sessionStorage.getItem("RoleId");
        if(sessionId){
            firebase
                .database().ref('merchant_users/' + sessionId).on('value', snapshot => {
                    var Users = snapshot.val();
                    console.log(Users);
                    sessionStorage.setItem("username", Users.user_name);
                    sessionStorage.setItem("email", Users.email_id);

                    this.setState({
                        userRole:Users.Role,
                        loading: false
                    });
                });
            this.businessDetailsList();
        }

    }

    businessId = (id) =>{
        console.log(id);
        sessionStorage.setItem("businessId", id);
        console.log(id);

    }

    businessDetailsList = () => {
        var sessionId = sessionStorage.getItem("RoleId");
        this.setState({loading: true});
        var ref = firebase
            .database()
            .ref("merchaant_business_details/").orderByChild("sessionId").equalTo(sessionId)

        ref.on('value', snapshot => {
            const data = [];
            snapshot.forEach(childSnapShot => {
                const GSTData = {
                    businessId: childSnapShot.key .toString(),
                    business_automatic_id: childSnapShot.val().business_automatic_id,
                    created_on: childSnapShot.val().created_on,



                    created_on: childSnapShot.val().created_on,



                    business_owners_name: childSnapShot.val().business_owners_name,
                    business_name: childSnapShot.val().business_name,
                    business_legal_name: childSnapShot.val().business_legal_name,
                    business_nick_name: childSnapShot.val().business_nick_name,
                    // business_automatic_id: childSnapShot.val().business_automatic_id,


                    business_email: childSnapShot.val().business_email,
                    business_secondary_email: childSnapShot.val().business_secondary_email,
                    business_phone_number: childSnapShot.val().business_phone_number,

                    business_logo: childSnapShot.val().business_logo,


                    business_currency: childSnapShot.val().business_currency,
                    // business_timezone: childSnapShot.val().business_timezone,
                    business_timezone_from:childSnapShot.val().business_timezone_from,
                    business_timezone_to:childSnapShot.val().business_timezone_to,

                    business_fssai_number: childSnapShot.val().business_fssai_number,
                    business_fssai_form: childSnapShot.val().business_fssai_form,
                    business_account_name: childSnapShot.val().business_account_name,
                    business_account_number: childSnapShot.val().business_account_number,
                    business_ifsc_code: childSnapShot.val().business_ifsc_code,
                    status: childSnapShot.val().status,
                    sessionId: childSnapShot.val().sessionId,
                    username: childSnapShot.val().username,
                };

                data.push(GSTData);
            });
            this.setState({businessDetailsList: data, countPage: data.length, loading: false});
            console.log(this.state.businessDetailsList);
        });


    }

    render() {
        return (
            <div className="page-wrapper">


                <aside className="menu-sidebar d-none d-lg-block">

                    <div className="menu-sidebar__content js-scrollbar1">
                        <nav className="navbar-sidebar">
                            <ul className="list-unstyled navbar__list">

                                {/* <li><a href="#" className="home">Home</a></li>
                <li><a href="/Tables" className="oders">Orders</a></li>
                <li><a href="/AllCustomers" className="customers">Customers</a></li>
                <li><a href="/AddItemMenu"  className="resturent">My Restaurent</a></li>
                <li><a href="/AllEmployees"  className="employees">Employees</a></li>
                <li><a href="/AllMessages"  className="messages">Messages</a></li>
                <li><a href="#"  className="bills">Bills</a></li>
                <li><a href="TablesList"  className="tabels">Tabels</a></li> */}
                                <li><a href="#" className="settings">Settings</a></li>










                            </ul>
                        </nav>
                    </div>
                </aside>
                <div className="page-container">

                    <Header/>

                    <div className="main-content">
                        <div className="section__content">





                            <div className="container-fluid">

                                <div className="row">
                                    <div className="col-md-12 p-0">
                                        <div className="search_profile">
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <div className="search_top">
                                                        <a href="#" className="search_icon"><i className="fas fa-search"></i></a>
                                                        <input className="search_input" type="text" name="" id="myInput1" placeholder="Search..."/>
                                                    </div>
                                                </div>

                                                <div className="col-md-4 ">
                                                    <div className="profile_user">
                                                        <span className="usericon">
                                                            <img src="/images/icon/profile.jpg"/>
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
                                    <div className="col-md-12 p-0">
                                        <div className="category_upload_image">
                                            <h1>My Business </h1>
                                            <div className="upload_img_block add_menu">

                                                <div className="row business_reg_box" id="myDIV1" >



                                                    {this.state.businessDetailsList && this.state.businessDetailsList.map((business,index) => {
                                                        return (
                                                            <>
                                                                {business.status=="Active"
                                                                    ?

                                                                        <div className="col-md-6" key={index} >

                                                                            <div className="business_register">

                                                                                <div className="w-100-row">

                                                                                    <span className="left_box">
                                                                                        <h2>{business.business_name}</h2>
                                                                                        <p className="cafe_loction">Cafe 2 Sankipuri</p>
                                                                                        <p className="cafe_address">12, Sainikpuri, Kapra, Secunderabad, Telangana 500094</p>
                                                                                        <p className="cafe_timings">Timings : {business.business_timezone_from} am to {business.business_timezone_to} pm</p>

                                                                                        <Link to="/Dashboard">
                                                                                            {/* <Link to={`/Dashboard/${business.businessId}`} > */}
                                                                                            <button className="btn visit_button m-t-30"  onClick={
                                                                                                this.businessId.bind(this, business.businessId)
                                                                                                } >Visit</button>
                                                                                        </Link>
                                                                                    </span>


                                                                                    <span className="right_box">
                                                                                        <Link to={`/EditBusiness/${business.businessId}`}>
                                                                                            <img src="/images/icon/edit_icon_blue.svg" className="edit_delete"/>
                                                                                        </Link>
                                                                                        <div className="img_box">
                                                                                            <img src={business.business_logo}/>
                                                                                        </div>

                                                                                        <button className="btn activated_button  m-t-30">Activated</button>

                                                                                    </span>



                                                                                </div>


                                                                            </div>


                                                                        </div>


                                                                        :




                                                                        <div className="col-md-6" key={index}>


                                                                            <div className="business_register">

                                                                                <div className="w-100-row">

                                                                                    <span className="left_box">
                                                                                        <h2>{business.business_name}</h2>
                                                                                        <p className="cafe_loction">Cafe 2 Sankipuri</p>
                                                                                        <p className="cafe_address">12, Sainikpuri, Kapra, Secunderabad, Telangana 500094</p>
                                                                                        <p className="cafe_timings">Timings : {business.business_timezone_from} am to {business.business_timezone_to} pm</p>

                                                                                        <button className="btn m-t-30 non_btn"></button>


                                                                                    </span>


                                                                                    <span className="right_box">
                                                                                        <Link to={`/EditBusiness/${business.businessId}`} on>
                                                                                            <img src="/images/icon/edit_icon_blue.svg" className="edit_delete"/>
                                                                                        </Link>
                                                                                        <div className="img_box">
                                                                                            <img src={business.business_logo}/>
                                                                                        </div>

                                                                                        <button className="btn pending_button  m-t-30">Pending</button>

                                                                                    </span>



                                                                                </div>


                                                                            </div>


                                                                        </div>
                                                                }
                                                            </>

                                                        )})}


                                                    <div className="col-md-6">

                                                        <div className="business_register pad-30">


                                                            <div className="w-100-row text-center add_busi_icon">
                                                                <Link to="/AddBusiness">
                                                                    <p><img src="/images/icon/add_business_icon.svg"/></p>
                                                                    <p>Add a new business</p>

                                                                </Link>
                                                            </div>


                                                        </div>


                                                    </div>




                                                </div>



                                            </div>


                                        </div>
                                    </div>
                                </div>





                            </div>
                        </div>
                    </div>


                </div>
            </div>




        );
    }
}

export default BusinessList;
