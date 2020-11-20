import React from "react";
import firebase from "../config";
import Sidebar from "./sidebar";
import Header from "./header";
import swal from "sweetalert";
class Bills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.deleteItem = this.deleteItem.bind(this);
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
      var businessId = sessionStorage.getItem("businessId");
      firebase
        .firestore()
        .collection("/businessdetails")
        .doc(businessId)
        .get()
        .then((snapshot) => {
          var business = snapshot.data();
          console.log(business);
          sessionStorage.setItem("BusinessName", business.business_name);
          sessionStorage.setItem("BusinessLogo", business.business_logo);
        });
    }

    this.billsList();
  }
  billsList = async () => {
    var businessId = sessionStorage.getItem("businessId");

    this.setState({ loading: true });
    firebase
      .firestore()
      .collection("bills")

      .where("businessId", "==", businessId)
      .get()
      .then((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          const GSTData = {
            billid: childSnapShot.id,
            billAmount: childSnapShot.data().billAmount,
            billId: childSnapShot.data().billId,
            billTiming: childSnapShot.data().billTiming,
            paymentMethod: childSnapShot.data().paymentMethod,

            settle_by: childSnapShot.data().settle_by,
            table: childSnapShot.data().table,

            businessId: childSnapShot.data().businessId,
            sessionId: childSnapShot.data().sessionId,
          };

          data.push(GSTData);
        });
        this.setState({
          billsList: data,
          countPage: data.length,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  deleteItem = (id) => {
    swal({
      title: "Are you sure?",
      text: "Do your really want to remove?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        console.log(id);
        var playersRef = firebase.firestore().collection("/bills").doc(id);
        playersRef.delete();
      } else {
      }
    });
  };
  render() {
    return (
      <div className="page-wrapper">
        <Sidebar />

        {/* <!-- PAGE CONTAINER--> */}
        <div className="page-container">
          <Header />

          {/* <header className="header-desktop">
			
			<div className="logo_hipal">
                <a href="#">
                    <img src="/images/icon/logo.svg" alt="Hipal Admin" />
                </a>
            </div>
			
			
			Welcome Back Varun
            </header> */}
          {/* <!-- HEADER DESKTOP--> */}

          {/* <!-- MAIN CONTENT--> */}
          <div className="main-content">
            <div className="section__content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12 p-0">
                    <div className="search_profile">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="company_name_box">
                            <div className="company_iocn">
                              <img
                                src={sessionStorage.getItem("BusinessLogo")}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                }}
                              />
                            </div>
                            <div className="company_details">
                              <p className="name">
                                {sessionStorage.getItem("BusinessName")}{" "}
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
                          {/* <div className="search_top">
                            <a href="#" className="search_icon">
                              <i className="fas fa-search"></i>
                            </a>
                            <input
                              className="search_input"
                              type="text"
                              name=""
                              placeholder="Search..."
                            />
                          </div> */}
                        </div>
                        <div className="col-md-3 ">
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
                      <h1>Bill View</h1>
                      <div className="upload_img_block add_menu">
                        <div className="row">
                          <div className="col-md-12 p-0 bills_table">
                            <div className="table-responsive table-data">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <td>S.no</td>
                                    <td>BILL ID</td>
                                    {/* <td>Date</td> */}
                                    <td>Settled By</td>
                                    <td>Amount</td>
                                    {/* <td>Order Id</td>
                                    <td>Timing</td>
                                    <td>Photo</td> */}
                                    {/* <td>Actions</td> */}
                                  </tr>
                                </thead>
                                <tbody>
                                  {this.state.billsList &&
                                    this.state.billsList.map((bill, index) => {
                                      return (
                                        <tr key={index}>
                                          <td>{index + 1}</td>
                                          <td>{bill.billId}</td>
                                          {/* <td className="bill_date">
                                            12/06/202
                                          </td> */}
                                          <td>{bill.settle_by}</td>
                                          <td>Rs {bill.billAmount}</td>
                                          {/* <td>{bill.order}</td>
                                          <td>13:34</td> */}
                                          {/* <td>
                                            <img
                                              src="/images/bill_image.png"
                                              className="bill_img"
                                            />
                                          </td> */}
                                          <td>
                                            {/* <img
                                              src="/images/icon/edit_icon_blue.svg"
                                              className="edit_delete"
                                            /> */}
                                            {/* <img
                                              onClick={this.deleteItem.bind(
                                                this,
                                                bill.billid
                                              )}
                                              src="/images/icon/delete_cross.svg"
                                              className="edit_delete"
                                            /> */}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                </tbody>
                              </table>
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

export default Bills;
