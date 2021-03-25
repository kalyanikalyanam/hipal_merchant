//list of buisnesses
// a merchant can add multiple businesses
import React from "react";
import firebase from "../config";
import BusinessSidebar from "./business_list_sidebar";
import Header from "./../component/header";
import { Link } from "react-router-dom";
class BusinessList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.businessId = this.businessId.bind(this);
  }
  componentDidMount() {
    this.setState({ loading: true });
    var sessionId = sessionStorage.getItem("RoleId");
    if (sessionId) {
      console.log(sessionId);

      firebase
        .firestore()
        .collection("/merchant_users")
        .doc(sessionId)
        .get()
        .then((snapshot) => {
          var Users = snapshot.data();
          console.log(Users);
          sessionStorage.setItem("username", Users.user_name);
          sessionStorage.setItem("email", Users.email_id);

          this.setState({
            userRole: Users.Role,
            loading: false,
          });
        });
    }

    this.businessDetailsList();
  }

  businessId = (id) => {
    console.log(id);

    //  this.setState({businessId:
    //    id})

    sessionStorage.setItem("businessId", id);
    console.log(id);
  };

  businessDetailsList = () => {
    var sessionId = sessionStorage.getItem("RoleId");
    // var businessId = sessionStorage.getItem("businessId");
    this.setState({ loading: true });
    var ref = firebase
      .firestore()
      .collection("businessdetails/")
      .where("sessionId", "==", sessionId)
      // .where("businessId", "==", businessId)
      .get()

      .then((snapshot) => {
        const data = [];
        snapshot.forEach((childSnapShot) => {
          const GSTData = {
            businessId: childSnapShot.id,

            business_automatic_id: childSnapShot.data().business_automatic_id,
            created_on: childSnapShot.data().created_on,

            created_on: childSnapShot.data().created_on,

            business_owners_name: childSnapShot.data().business_owners_name,
            business_name: childSnapShot.data().business_name,
            business_legal_name: childSnapShot.data().business_legal_name,
            business_nick_name: childSnapShot.data().business_nick_name,
            // business_automatic_id: childSnapShot.data().business_automatic_id,

            business_email: childSnapShot.data().business_email,
            business_secondary_email: childSnapShot.data()
              .business_secondary_email,
            business_phone_number: childSnapShot.data().business_phone_number,
            business_address: childSnapShot.data().business_address,
            business_logo: childSnapShot.data().business_logo,

            business_currency: childSnapShot.data().business_currency,
            // business_timezone: childSnapShot.data().business_timezone,
            business_timezone_from: childSnapShot.data().business_timezone_from,
            business_timezone_to: childSnapShot.data().business_timezone_to,

            business_fssai_number: childSnapShot.data().business_fssai_number,
            business_fssai_form: childSnapShot.data().business_fssai_form,

            business_gst_number: childSnapShot.data().business_gst_number,
            business_gst_value: childSnapShot.data().business_gst_value,
            business_cgst_value: childSnapShot.data().business_cgst_value,

            business_account_name: childSnapShot.data().business_account_name,
            business_account_number: childSnapShot.data()
              .business_account_number,
            business_ifsc_code: childSnapShot.data().business_ifsc_code,

            status: childSnapShot.data().status,

            sessionId: childSnapShot.data().sessionId,
            username: childSnapShot.data().username,
          };

          data.push(GSTData);
        });

        this.setState({
          businessDetailsList: data,
          countPage: data.length,
          loading: false,
        });
        console.log(this.state.businessDetailsList);
      });
  };

  render() {
    return (
      <div className="page-wrapper">
        <BusinessSidebar />
        <div className="page-container">
          <Header />

          <div className="main-content">
            <div className="section__content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12 p-0">
                    <div className="search_profile">
                      <div className="row">
                        <div className="col-md-8">
                          <div className="search_top">
                            <a href="#" className="search_icon">
                              <i className="fas fa-search"></i>
                            </a>
                            <input
                              className="search_input"
                              type="text"
                              name=""
                              id="myInput1"
                              placeholder="Search..."
                            />
                          </div>
                        </div>

                        <div className="col-md-4 ">
                          <div className="profile_user">
                            <span className="usericon">
                              <img src="/images/icon/profile.jpg" />
                            </span>
                            <span className="profile_data">
                              <p className="name">
                                {sessionStorage.getItem("username")}
                              </p>
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
                        <div className="row business_reg_box" id="myDIV1">
                          {this.state.businessDetailsList &&
                            this.state.businessDetailsList.map(
                              (business, index) => {
                                return (
                                  <>
                                    {business.status == "Active" ? (
                                      <div className="col-md-6" key={index}>
                                        <div className="business_register">
                                          <div className="w-100-row">
                                            <span className="left_box">
                                              <h2>{business.business_name}</h2>
                                              <p className="cafe_loction">
                                                Cafe 2 Sankipuri
                                              </p>
                                              <p className="cafe_address">
                                                {business.business_address}
                                              </p>
                                              <p className="cafe_timings">
                                                Timings : 9 am to 11 pm
                                              </p>

                                              <Link to="/Dashboard">
                                                {/* <Link to={`/Dashboard/${business.businessId}`} > */}
                                                <button
                                                  className="btn visit_button m-t-30"
                                                  onClick={this.businessId.bind(
                                                    this,
                                                    business.businessId
                                                  )}
                                                >
                                                  Visit
                                                </button>
                                              </Link>
                                            </span>

                                            <span className="right_box">
                                              <Link
                                                to={`/AddEditBusiness/${business.businessId}`}
                                                data={business.businessId}
                                              >
                                                <img
                                                  src="/images/icon/edit_icon_blue.svg"
                                                  className="edit_delete"
                                                />
                                              </Link>
                                              <div className="img_box">
                                                <img
                                                  src={business.business_logo}
                                                />
                                              </div>

                                              <button className="btn activated_button  m-t-30">
                                                Activated
                                              </button>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="col-md-6" key={index}>
                                        <div className="business_register">
                                          <div className="w-100-row">
                                            <span className="left_box">
                                              <h2>{business.business_name}</h2>
                                              <p className="cafe_loction">
                                                Cafe 2 Sankipuri
                                              </p>
                                              <p className="cafe_address">
                                                12, Sainikpuri, Kapra,
                                                Secunderabad, Telangana 500094
                                              </p>
                                              <p className="cafe_timings">
                                                Timings :{" "}
                                                {
                                                  business.business_timezone_from
                                                }{" "}
                                                am to{" "}
                                                {business.business_timezone_to}{" "}
                                                pm
                                              </p>

                                              <button className="btn m-t-30 non_btn"></button>
                                            </span>

                                            <span className="right_box">
                                              <Link
                                                to={`/EditBusiness/${business.businessId}`}
                                                on
                                              >
                                                <img
                                                  src="/images/icon/edit_icon_blue.svg"
                                                  className="edit_delete"
                                                />
                                              </Link>
                                              <div className="img_box">
                                                <img
                                                  src={business.business_logo}
                                                />
                                              </div>

                                              <button className="btn pending_button  m-t-30">
                                                Pending
                                              </button>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </>
                                );
                              }
                            )}

                          <div className="col-md-6">
                            <div className="business_register pad-30">
                              <div className="w-100-row text-center add_busi_icon">
                                <Link to="/AddEditBusiness">
                                  <p>
                                    <img src="/images/icon/add_business_icon.svg" />
                                  </p>
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
