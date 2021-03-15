//when we click on the orders link  in the sidebar this page will take action and livecart component pages will take actions
import React from "react";
import firebase, { db } from "../config";
import Sidebar from "../component/sidebar";
import Header from "../component/header";
import { Link } from "react-router-dom";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userRole: "",
      loading: false,
      view_list: null,
    };
    this.handleFloorChange = this.handleFloorChange.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    var sessionName = sessionStorage.getItem("RoleId");
    var businessName = sessionStorage.getItem("BusinessName");
    this.setState({ sessionName, businessName });

    var sessionId = sessionStorage.getItem("RoleId");
    if (sessionId) {
      console.log(sessionId);
      this.setState({ loading: true });
      db.collection("/merchant_users")
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
      db.collection("/businessdetails")
        .doc(businessId)
        .get()
        .then((snapshot) => {
          var business = snapshot.data();
          sessionStorage.setItem("BusinessName", business.business_name);
          sessionStorage.setItem("BusinessLogo", business.business_logo);
          this.floorsList();
          this.tableList();
        });
    }
    this.setState({ loading: false });
  }

  floorsList = async () => {
    this.setState({ loading: true });
    var businessId = sessionStorage.getItem("businessId");
    var ref = await db
      .collection("floors")
      .where("businessId", "==", businessId)
      .get();
    var data = [];
    ref.forEach((childSnapShot) => {
      const GSTData = {
        floorId: childSnapShot.id,
        floor_capacity: childSnapShot.data().floor_capacity,
        floor_name: childSnapShot.data().floor_name,
        floor_notes: childSnapShot.data().floor_notes,
      };
      data.push(GSTData);
    });
    this.setState({ selectedFloor: 1 });
    this.setState({ floorsList: data, countPage: data.length, loading: false });
  };

  tableList = async () => {
    this.setState({ loading: true });
    var businessId = sessionStorage.getItem("businessId");
    console.log(businessId);
    const snapshot = await db
      .collection("tables")
      .where("businessId", "==", businessId)
      .get();
    var data = [];
    snapshot.forEach((childSnapShot) => {
      const GSTData = {
        tableId: childSnapShot.id,
        table_name: childSnapShot.data().table_name,
        table_capacity: childSnapShot.data().table_capacity,
        table_floor: childSnapShot.data().table_floor,
        table_icon: childSnapShot.data().table_icon,
        table_notes: childSnapShot.data().table_notes,
        table_qrcode: childSnapShot.data().table_qrcode,
        status: childSnapShot.data().status,
      };
      data.push(GSTData);
    });
    this.setState({
      tableList: data,
      countPage: data.length,
      loading: false,
      view_list: data,
    });
    console.log(this.state.tableList);
  };
  handleFloorChange(event) {
    const value = event.target.value;
    if (value === "") {
      this.setState({
        filter: null,
      });
    }
    this.setState({
      filter: value,
    });
  }

  render() {
    const floors =
      this.state.floorsList &&
      this.state.floorsList.map((floor, index) => (
        <option value={floor.floor_name} key={index}>
          {floor.floor_name}
        </option>
      ));
    const filtered = this.state.filter
      ? this.state.tableList.filter(
          (table) => table.table_floor === this.state.filter
        )
      : this.state.tableList;
    const tables =
      filtered &&
      filtered.map((table, index) => (
        <div className="table_2 mb-20" key={index + 1}>
          <div className="head_table"></div>
          <Link to={`/LiveCart/${table.tableId}`}>
            <div className="table-design three_people">
              <div className="persons_row">
                <span className="person vacant"></span>
                <span className="person vacant"></span>
                <span className="person vacant"></span>
              </div>
              <div className="persons_data_table">
                <div className="avaliabe_row-tablename">
                  <span className="tablename">{table.table_name}</span>
                </div>
                <div className="avaliabe_row-head">
                  <span className="avalibility">{table.status}</span>
                </div>
                <div className="avaliabe_row vacant"></div>
              </div>
              <div className="persons_row">
                <span className="person down vacant"></span>
                <span className="person down vacant"></span>
                <span className="person down vacant"></span>
              </div>
            </div>
          </Link>
        </div>
      ));
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
                              <p className="name">{this.state.businessName}</p>
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
                  <div className="col-md-5 p-0">
                    <div className="overview-wrap">
                      <div class="order_btns">
                        <Link to="/Orders">
                          <span class="btn view_ord btn-padding">
                            View Order
                          </span>
                        </Link>
                        <Link to="/Table">
                          <span class="btn add_ord btn-padding">
                            <img src="/images/icon/add_plus_icon_w.svg" /> Add
                            Order
                            <span class="red_dot"></span>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-md-7 p-0">
                    <div className="track_box">
                      <div className="track_ord_block track_box_center">
                        <div className="track_bg">
                          <div className="track-50 w-100">
                            <form>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Track here"
                                />
                                <span className="track_a_btn">
                                  <img src="/images/icon/track_arrow_right.svg" />
                                </span>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>

                <div className="row mt-30">
                  <div className="col-md-12 p-0">
                    <div className="orders_menu">
                      <ul>
                        <li>
                          <a href="#" className="activemenu">
                            All
                          </a>
                        </li>
                        <li>
                          <a href="#">Dine In</a>
                        </li>
                        <li>
                          <a href="#">Delivery</a>
                        </li>
                        <li>
                          <a href="#">Take away</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="row m-t-30 m-b-30">
                  <div className="col-md-12">
                    <div className="floor_box">
                      <div className="dropdown">
                        <select name="floor" onChange={this.handleFloorChange}>
                          <option value=""> Choose Floor </option>
                          {floors}
                        </select>
                      </div>
                    </div>
                  </div>

                  {this.state.loading && <div>Loading</div>}
                  {this.state.tableList && tables}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Table;
