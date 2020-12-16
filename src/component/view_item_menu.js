import React from "react";
import firebase, { db } from "../config";
import Sidebar from "./sidebar";
import Header from "./header";
import { Link } from "react-router-dom";
import "react-responsive-modal/styles.css";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";
const PER_PAGE = 10;
class ViewItemMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      open1: false,
      created_on: new Date().toLocaleString(),
      item_id: "",
      item_name: "",
      item_description: "",
      item_halal: "",
      item_image: "",
      item_points: "",

      station_name: "",
      item_restaurant_id: "",
      item_type: "",
      // item_hash_tags:'',

      item_hash_tags: [],
      input: "",
      bestrecommendation: "UnSelect",

      item_price: "",
      item_tax: "",

      category: "",
      sub_category: "",

      employer_sevice_message: "",
      validError: false,
      mobile_message: "",
      name_message: "",
      avatar: "",
      isUploading: false,
      progress: 0,
      avatarURL: "",
      filenames: [],

      uploadProgress: 0,
      downloadURLs: [],

      advance: "",
      carbs: "",
      protien: "",
      fat: "",
      item_video: "",
      item_multiple_image: "",

      extra: "",
      healthytag: "",
      bestsellertag: "",

      recommendations: [
        {
          recommenditem: "",
        },
      ],

      portions_details: [
        {
          name: "",

          price: "",
        },
      ],
      currentPage: 0,
      //     printer_details:[
      // {
      //     printer_name:'',
      // }
      //     ]
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
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

    this.itemMenuList();
    this.itemMenuList1();
  }

  itemMenuList = async () => {
    var businessId = sessionStorage.getItem("businessId");

    this.setState({ loading: true });
    db.collection("menuitems2")
      .where("businessId", "==", businessId)
      .get()
      .then((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          data.push({ ...childSnapShot.data(), itemmenuid: childSnapShot.id });
        });
        this.setState({
          itemMenuList: data,
          countPage: data.length,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.unsubscribe = db
      .collection("menuitems2")
      .where("businessId", "==", businessId)
      .onSnapshot((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          data.push({ ...childSnapShot.data(), itemmenuid: childSnapShot.id });
        });
        this.setState({
          itemMenuList: data,
          countPage: data.length,
          loading: false,
        });
      });
  };

  // itemMenuList = async () => {
  //   var sessionId = sessionStorage.getItem("RoleId");
  //   var businessId = sessionStorage.getItem("businessId");

  //   this.setState({ loading: true });
  //   await firebase
  //     .firestore()
  //     .collection("menuitems2")
  //     // .where("sessionId", "==", sessionId)
  //     .where("businessId", "==", businessId)
  //     .get()
  //     .then((querySnapshot) => {
  //       var data = [];
  //       querySnapshot.forEach((childSnapShot) => {
  //         const GSTData = {
  //           itemmenuid: childSnapShot.id,
  //           item_unique_id: childSnapShot.data().item_unique_id,

  //           item_id: childSnapShot.data().item_id,
  //           item_name: childSnapShot.data().item_name,
  //           item_description: childSnapShot.data().item_description,
  //           item_halal: childSnapShot.data().item_halal,
  //           item_image: childSnapShot.data().item_image,
  //           item_points: childSnapShot.data().item_points,

  //           station_name: childSnapShot.data().station_name,

  //           item_type: childSnapShot.data().item_type,
  //           item_hash_tags: childSnapShot.data().item_hash_tags,
  //           item_price: childSnapShot.data().item_price,
  //           item_tax: childSnapShot.data().item_tax,

  //           sessionId: childSnapShot.data().sessionId,
  //           businessId: childSnapShot.data().businessId,

  //           status: childSnapShot.data().status,
  //           username: childSnapShot.data().username,

  //           portions: childSnapShot.data().portions,
  //           portions_details: childSnapShot.data().portions_details,

  //           advance: childSnapShot.data().advance,
  //           carbs: childSnapShot.data().carbs,
  //           protien: childSnapShot.data().protien,
  //           fat: childSnapShot.data().fat,
  //           item_video: childSnapShot.data().item_video,
  //           item_multiple_image: childSnapShot.data().downloadURLs,

  //           extra: childSnapShot.data().extra,
  //           healthytag: childSnapShot.data().healthytag,
  //           bestsellertag: childSnapShot.data().bestsellertag,

  //           recommend: childSnapShot.data().recommend,

  //           recommendations: childSnapShot.data().recommendations,

  //           created_on: childSnapShot.data().created_on,
  //           sessionId: childSnapShot.data().sessionId,
  //           businessId: childSnapShot.data().businessId,
  //           categoryId: childSnapShot.data().categoryId,
  //         };

  //         data.push(GSTData);
  //       });
  //       this.setState({
  //         itemMenuList: data,
  //         countPage: data.length,
  //         loading: false,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  itemMenuList1 = async () => {
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");

    this.setState({ loading: true });
    await firebase
      .firestore()
      .collection("menuitems2")
      // .where("sessionId", "==", sessionId)
      .where("businessId", "==", businessId)
      .limit(5)
      .get()
      .then((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          const GSTData = {
            itemmenuid: childSnapShot.id,
            item_unique_id: childSnapShot.data().item_unique_id,

            item_id: childSnapShot.data().item_id,
            item_name: childSnapShot.data().item_name,
            item_description: childSnapShot.data().item_description,
            item_halal: childSnapShot.data().item_halal,
            item_image: childSnapShot.data().item_image,
            item_points: childSnapShot.data().item_points,

            station_name: childSnapShot.data().station_name,

            item_type: childSnapShot.data().item_type,
            item_hash_tags: childSnapShot.data().item_hash_tags,
            item_price: childSnapShot.data().item_price,
            item_tax: childSnapShot.data().item_tax,

            sessionId: childSnapShot.data().sessionId,
            businessId: childSnapShot.data().businessId,

            status: childSnapShot.data().status,
            username: childSnapShot.data().username,

            portions: childSnapShot.data().portions,
            portions_details: childSnapShot.data().portions_details,

            advance: childSnapShot.data().advance,
            carbs: childSnapShot.data().carbs,
            protien: childSnapShot.data().protien,
            fat: childSnapShot.data().fat,
            item_video: childSnapShot.data().item_video,
            item_multiple_image: childSnapShot.data().downloadURLs,

            extra: childSnapShot.data().extra,
            healthytag: childSnapShot.data().healthytag,
            bestsellertag: childSnapShot.data().bestsellertag,

            recommend: childSnapShot.data().recommend,

            recommendations: childSnapShot.data().recommendations,

            created_on: childSnapShot.data().created_on,
            sessionId: childSnapShot.data().sessionId,
            businessId: childSnapShot.data().businessId,
            categoryId: childSnapShot.data().categoryId,
          };

          data.push(GSTData);
        });
        this.setState({
          itemMenuList1: data,
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
        var playersRef = firebase.firestore().collection("/menuitems2").doc(id);
        playersRef.delete();
      } else {
      }
    });
  };
  handlePageClick = ({ selected: selectedPage }) => {
    this.setState({
      currentPage: selectedPage,
    });
  };
  render() {
    const offset = this.state.currentPage * PER_PAGE;

    const currentPageData =
      this.state.itemMenuList &&
      this.state.itemMenuList
        .slice(offset, offset + PER_PAGE)
        .map((item, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.item_name}</td>
              {/* <td>2</td>
                                  <td>0</td> */}
              {/* <td>{category.itemId.length}</td> */}
              {/* <td>{category.color}</td> */}
              {/* <td>ADD</td> */}
              {/* <td>
                                            {" "}
                                            <Link
                                              to={`/ViewCategoryMenu/${category.categoryId}`}
                                            >
                                              click
                                            </Link>
                                          </td> */}
              {sessionStorage.getItem("role") == "Merchant" ||
              sessionStorage.getItem("items") == "Yes" ? (
                <td>
                  <Link to={`/EditItemMenu/${item.itemmenuid}`}>
                    <img
                      src="images/icon/edit_icon_blue.svg"
                      className="edit_delete"
                    />{" "}
                  </Link>
                  {/* <img
                                              src="images/icon/delete_cross.svg"
                                              onClick={this.deleteItem.bind(
                                                this,
                                                item.itemmenuid
                                              )}
                                              className="edit_delete"
                                            /> */}
                </td>
              ) : (
                ""
              )}
            </tr>
          );
        });

    const pageCount = Math.ceil(
      this.state.itemMenuList && this.state.itemMenuList.length / PER_PAGE
    );

    return (
      <>
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
                    <div className="col-lg-7">
                      <div className="row mt-30">
                        <div className="col-md-12 p-0">
                          <Link to="/ViewItemMenu">
                            <span className="btn add_categoty_menu">
                              Items <span className="active"></span>
                            </span>
                          </Link>
                          <Link to="/CategoryList">
                            <span className="btn add_categoty_menu">
                              Category
                            </span>
                          </Link>
                          <span className="btn add_categoty_menu">Coupon</span>
                        </div>
                      </div>

                      <div className="row mt-30">
                        <div className="col-md-12 p-0">
                          <div className="orders_menu">
                            <ul>
                              <li>
                                <a href="/ViewItemMenu" className="activemenu">
                                  View Items
                                </a>
                              </li>
                              {sessionStorage.getItem("role") == "Merchant" ||
                              sessionStorage.getItem("items") == "Yes" ? (
                                <li>
                                  <a href="/AddItemMenu">Add Items</a>
                                </li>
                              ) : (
                                ""
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="row mt-30">
                        <div className="col-md-12 p-0 employes_table view_category_table">
                          <div className="table-responsive table-data">
                            <table className="table">
                              <thead>
                                <tr>
                                  <td>S.no</td>
                                  <td>Item Name</td>
                                  {/* <td>No.Of Parent Catagory</td>
                            <td>No.Sub Catagory</td> */}
                                  {/* <td>Number of Items Number</td> */}
                                  {/* <td>Color</td> */}
                                  {/* <td>Add Item</td> */}
                                  {/* <td>View Category</td> */}
                                  {sessionStorage.getItem("role") ==
                                    "Merchant" ||
                                  sessionStorage.getItem("items") == "Yes" ? (
                                    <td>Actions</td>
                                  ) : (
                                    ""
                                  )}
                                </tr>
                              </thead>
                              <tbody>{currentPageData}</tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={this.handlePageClick.bind(this)}
                        containerClassName={"pagination"}
                        previousLinkClassName={"pagination__link"}
                        nextLinkClassName={"pagination__link"}
                        disabledClassName={"pagination__link--disabled"}
                        activeClassName={"pagination__link--active"}
                      />
                    </div>

                    <div className="col-lg-5">
                      <div className="recent_itemas_box">
                        <h1>Recent Items</h1>
                        {this.state.itemMenuList1 &&
                          this.state.itemMenuList1.map((item, index) => {
                            return (
                              <div className="m-t-20 row  mb-0" key={index}>
                                <div className="col-md-12 product_box mb-0">
                                  <div className="product_box_item">
                                    <div className="product_item_row sub_cate_product">
                                      <div className="left">
                                        <div className="img_box">
                                          {item.advance == "Yes" ? (
                                            <span className="star_yellow">
                                              <img src="images/icon/star_rate_ye.svg" />
                                            </span>
                                          ) : (
                                            ""
                                          )}
                                          <img src={item.item_image} />
                                        </div>
                                      </div>
                                      <div className="right">
                                        <p>
                                          <span className="item_recipe">
                                            {item.item_type == "Veg" ? (
                                              <span className="dot veg"></span>
                                            ) : (
                                              <span className="dot non-veg"></span>
                                            )}
                                          </span>
                                          {item.extra == "Yes" ? (
                                            <>
                                              {item.bestsellertag == "Yes" ? (
                                                <span className="btn best_seller">
                                                  BESTSELLER
                                                </span>
                                              ) : (
                                                ""
                                              )}
                                              {item.healthytag == "Yes" ? (
                                                <span className="btn best_seller">
                                                  HEALTHY
                                                </span>
                                              ) : (
                                                ""
                                              )}
                                            </>
                                          ) : (
                                            ""
                                          )}{" "}
                                          {sessionStorage.getItem("role") ==
                                            "Merchant" ||
                                          sessionStorage.getItem("items") ==
                                            "Yes" ? (
                                            <Link
                                              to={`/EditItemMenu/${item.itemmenuid}`}
                                            >
                                              <span className="btn pull-right outer_edit_btn fill">
                                                Edit
                                              </span>
                                            </Link>
                                          ) : (
                                            ""
                                          )}
                                        </p>
                                        <p className="item_name pl-0">
                                          {item.item_name}
                                        </p>
                                        <p className="price  pl-0">
                                          ₹ {item.item_price}.00
                                        </p>
                                        {/* <p className="small_font-1 mb-0">
                                          Item-sub category 1, Item-sub category
                                          2
                                        </p> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ViewItemMenu;
