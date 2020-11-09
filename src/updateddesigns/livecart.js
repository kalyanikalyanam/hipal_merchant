import React from "react";
import firebase from "../config";
import Sidebar from "../component/sidebar";
import Header from "../component/header";
import { Link } from "react-router-dom";
class LiveCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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

      var tableId = sessionStorage.getItem("tableId");
      var table = firebase
        .firestore()
        .collection("tables")
        .doc(tableId)
        .get()
        .then((snapshot) => {
          var table = snapshot.data();
          console.log(table);
          sessionStorage.setItem("TableName", table.table_name);
          sessionStorage.setItem("TableStatus", table.status);
        });
    }

    this.cartView();
    this.itemsDetails();
  }

  cartView() {
    this.setState({ loading: false });

    var cartItems = JSON.parse(localStorage.getItem("cartItems"));

    this.setState({
      cartList: cartItems,
      cartCount: cartItems ? cartItems.length : 0,
      loading: true,
    });
  }

  deleteItem = (val) => {
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
    for (var i = 0; i < cartItems.length; i++) {
      if (cartItems[i]["itemId"] == val) {
        console.log(val);
        cartItems.splice(i, 1);

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        this.cartView();
      }
    }
  };
  itemsDetails = async () => {
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");

    this.setState({ loading: true });
    await firebase
      .firestore()
      .collection("menuitems")
      .where("sessionId", "==", sessionId)
      .where("businessId", "==", businessId)
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
            categoryId: this.state.categoryId,
          };

          data.push(GSTData);
        });
        this.setState({
          itemList: data,
          countPage: data.length,
          loading: false,
        });
        // console.log(itemTypeList);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   itemsDetails() {
  //     this.setState({ loading: false });

  //     var ref = firebase.database().ref("merchant_menu_items");

  //     ref.on("value", (snapshot) => {
  //       const data = [];
  //       console.log(snapshot.val());

  //       snapshot.forEach((childSnapShot) => {
  //         const Products = {
  //           itemId: childSnapShot.key.toString(),
  //           item_id: childSnapShot.val().item_id,
  //           item_name: childSnapShot.val().item_name,
  //           item_description: childSnapShot.val().item_description,
  //           item_halal: childSnapShot.val().item_halal,
  //           item_image: childSnapShot.val().item_image,
  //           item_points: childSnapShot.val().item_points,

  //           station_name: childSnapShot.val().station_name,
  //           item_restaurant_id: childSnapShot.val().item_restaurant_id,
  //           item_type: childSnapShot.val().item_type,
  //           item_hash_tags: childSnapShot.val().item_hash_tags,
  //           item_price: childSnapShot.val().item_price,
  //           item_tax: childSnapShot.val().item_tax,

  //           category: childSnapShot.val().category,
  //           sub_category: childSnapShot.val().sub_category,

  //           sessionId: childSnapShot.val().sessionId,
  //           status: childSnapShot.val().status,
  //           username: childSnapShot.val().username,

  //           portions: childSnapShot.val().portions,
  //           portions_details: childSnapShot.val().portions_details,

  //           advance: childSnapShot.val().advance,
  //           carbs: childSnapShot.val().carbs,
  //           protien: childSnapShot.val().protien,
  //           fat: childSnapShot.val().fat,
  //           item_video: childSnapShot.val().item_video,
  //           item_multiple_image: childSnapShot.val().downloadURLs,

  //           extra: childSnapShot.val().extra,
  //           healthytag: childSnapShot.val().healthytag,
  //           bestsellertag: childSnapShot.val().bestsellertag,

  //           recommend: childSnapShot.val().recommend,
  //           // recommenditem:childSnapShot.val(). recommenditem,
  //           recommendations: childSnapShot.val().recommendations,

  //           created_on: childSnapShot.val().created_on,
  //         };

  //         data.push(Products);
  //       });

  //       this.setState({ itemList: data, loading: true });
  //       console.log(this.state.itemList);
  //     });
  //   }

  //   tableList() {
  //     const { tableId } = this.props.match.params;
  //     console.log(tableId);

  //     var ref = firebase.database().ref(`tables/${tableId}`);

  //     ref.on("value", (snapshot) => {
  //       var userData = snapshot.val();
  //       console.log(userData);
  //       this.setState({
  //         table_name: userData.table_name,
  //         table_capacity: userData.table_capacity,
  //         table_floor: userData.table_floor,
  //         table_icon: userData.table_icon,
  //         table_notes: userData.table_notes,
  //         table_qrcode: userData.table_qrcode,
  //         status: userData.status,
  //       });
  //       //console.log(this.state.pageTitle);
  //     });
  //   }

  render() {
    var orderId = Math.round(new Date().getTime() / 10000);
    var CartId = Math.round(new Date().getTime() / 1000);
    // var Discount = "";
    let totalPrice = 0;
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
                  <div className="col-lg-7 cart_box_width_1">
                    <div className="row">
                      <div className="col-md-7">
                        <div className="staff_box row">
                          <div className="col-md-3">
                            <div className="kot_box">
                              <div className="cookhead">Cooking</div>
                              <div className="table_small">
                                <div className="people_row">
                                  <span className="top fill"></span>
                                  <span className="top fill"></span>
                                </div>
                                <div className="table_no">
                                  {sessionStorage.getItem("TableName")}
                                </div>
                                <div className="people_row">
                                  <span className="bottom nonfille"></span>
                                  <span className="bottom fill"></span>
                                </div>
                              </div>
                              <div className="time">
                                <span>2:02</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-5">
                            <div className="names_options">
                              <a href="#" className="active_btn">
                                <img src="/images/icon/icon_users_w.png" />
                                Customers Names
                              </a>
                            </div>
                            <div className="names_options m-t-20">
                              <a href="#">
                                <img src="/images/icon/icon_settings.svg" />
                                Advanced Options
                              </a>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="chooseemp_dropdown">
                              <select className="form-control">
                                <option>Choose Employee</option>
                                <option>Employee 1</option>
                                <option>Employee 2</option>
                                <option>Employee 3</option>
                                <option>Employee 4</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-5 p-r-0">
                        <div className="user_love_box">
                          <div className="visit_row">
                            <span>
                              116<br></br>
                              <span className="sub">Visits</span>
                            </span>
                            <span>
                              Loves<br></br>
                              <span className="sub">Chicken Past</span>
                            </span>
                            <span>
                              LvL<br></br>
                              <span className="sub">D</span>
                            </span>
                          </div>

                          <div className="loves_row">
                            <span>
                              <img src="/images/icon/love_icon.png" />
                            </span>
                            <span>Chicken White Past..</span>
                            <span>
                              <img
                                src="/images/icon/icon_1.png"
                                className="one"
                              />
                              <img
                                src="/images/icon/icon_2.png"
                                className="two"
                              />
                              <img
                                src="/images/icon/icon_3.png"
                                className="three"
                              />
                            </span>
                            <span>9.9</span>
                          </div>

                          <div className="loves_row">
                            <span>
                              <img src="/images/icon/love_icon.png" />
                            </span>
                            <span>Chicken White Past..</span>
                            <span>
                              <img
                                src="/images/icon/icon_1.png"
                                className="one"
                              />
                              <img
                                src="/images/icon/icon_2.png"
                                className="two"
                              />
                              <img
                                src="/images/icon/icon_3.png"
                                className="three"
                              />
                            </span>
                            <span>9.9</span>
                          </div>

                          <div className="knowmore_loves">Know more</div>
                        </div>
                      </div>
                    </div>

                    <div className="row m-t-20">
                      <div className="col-md-12 menu_category_block">
                        <div className="category_menu_search">
                          <span className="cate_menu">
                            <a href="#" className="current">
                              Menu
                            </a>{" "}
                            <i
                              className="fa fa-caret-right"
                              aria-hidden="true"
                            ></i>
                            <a href="#">Category 1</a>{" "}
                            <i
                              className="fa fa-caret-right"
                              aria-hidden="true"
                            ></i>
                            <a href="#">Category 2</a>
                          </span>

                          <span className="cate_search">
                            <input
                              type="text"
                              id="myInput1"
                              placeholder="Search"
                            />
                            <a href="#" className="search_icon">
                              <i className="fas fa-search"></i>
                            </a>
                          </span>

                          <span className="livecart_box">
                            Iteams in Live Cart{" "}
                            <span className="number">
                              {this.state.cartCount}
                            </span>
                          </span>
                        </div>

                        <div className="cate_images_blk">
                          <div className="row" id="myDIV1">
                            {/* <div className="col-md-4 mb-15">
<div className="cate_img_box" style={{background:"#74b9ff"}}>
<img src="/images/category_img.png"/>
<p> CATEGORY 1</p>
</div>
</div>

<div className="col-md-4 mb-15">
<div className="cate_img_box" style={{background:"#fd79a8"}}>
<img src="/images/category_img.png"/>
<p> CATEGORY 2</p>
</div>
</div>

<div className="col-md-4 mb-15">
<div className="cate_img_box" style={{background:"#fdcb6e"}}>
<img src="/images/category_img.png"/>
<p> CATEGORY 3</p>
</div>
</div>

<div className="col-md-4 mb-15">
<div className="cate_img_box" style={{background:"#55efc4"}}>
<img src="/images/category_img.png"/>
<p> CATEGORY 4</p>
</div>
</div>

<div className="col-md-4 mb-15">
<div className="cate_img_box" style={{background:"#73e278"}}>
<img src="/images/category_img.png"/>
<p> CATEGORY 5</p>
</div>
</div>

<div className="col-md-4 mb-15">
<div className="cate_img_box no_pro_img" style={{background:"#a29bfe"}}>

<p> CATEGORY 6</p>
</div>
</div> */}

                            {/* <div className="col-md-4 mb-15">
<div className="cate_img_box item">
<div className="item_name">
<span>Chicken Tenders</span>
<span className="item_diff ">
<span className="veg"></span>
</span>
</div>
<div className="price">₹ 299</div>
</div>
</div>

<div className="col-md-4 mb-15">
<div className="cate_img_box item">
<div className="item_name">
<span>Chicken Tenders</span>
<span className="item_diff ">
<span className="nonveg"></span>
</span>
</div>
<div className="price">₹ 299</div>
</div>
</div> */}
                            {this.state.itemList &&
                              this.state.itemList.map((item, index) => {
                                return (
                                  <div className="col-md-4 mb-15" key={index}>
                                    <Link to={`/SingleItempage/${item.itemId}`}>
                                      <div className="cate_img_box item">
                                        <div className="item_name">
                                          <span>{item.item_name}</span>
                                          <span className="item_diff ">
                                            {item.item_type == "Veg" ? (
                                              <span className="veg"></span>
                                            ) : (
                                              <span className="nonveg"></span>
                                            )}
                                            {item.item_type == "Egg" ? (
                                              <span className="egg"></span>
                                            ) : (
                                              ""
                                            )}
                                          </span>
                                        </div>
                                        <div className="price">
                                          ₹ {item.item_price}
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-5 righ_pangap cart_box_width_2">
                    <div className="btns_livecart col-md-12">
                      <span className="width">
                        <span className="activedot red">
                          {this.state.cartCount}
                        </span>
                        <a href="/LiveCart" className="btn active_item">
                          Live Cart
                        </a>
                      </span>
                      <span className="width">
                        <a href="/Order" className="btn">
                          {" "}
                          Order
                        </a>
                      </span>
                      <span className="width">
                        <a href="/Bill" className="btn">
                          Bill
                        </a>
                      </span>
                    </div>

                    {
                      this.state.cartList && this.state.cartList.length > 0 ? (
                        <div className="order_id_cart_box col-md-12 m-t-20">
                          <p className="order_id_cart">
                            Order ID: <span>{orderId}</span>
                          </p>

                          <div className="cart_scroll_box">
                            <div className="cart2_box col-md-12 m-t-20 active_box">
                              <span className="ribbon_cart">
                                {this.state.cartCount}
                              </span>
                              <div className="cart2_row">
                                <div className="cart_head">
                                  <span>Cart 1 ID : {CartId}</span>
                                </div>
                                <div className="kot_box livecart_head">
                                  Live Cart
                                </div>
                              </div>

                              <div className="cart_scroll no_height">
                                {this.state.cartList &&
                                  this.state.cartList.map((item, index) => {
                                    var price = item.quantity * item.item_price;
                                    totalPrice += price;
                                    return (
                                      <div className="cart2_row" key={index}>
                                        <div className="box_1">
                                          <p>
                                            {index + 1}. {item.item_name}
                                          </p>
                                          <Link
                                            to={`/SingleItempage/${item.itemId}`}
                                          >
                                            <div className="w-100-row m-b-10">
                                              <div
                                                className="edit"
                                                data-toggle="modal"
                                                data-target="#edit_product"
                                              >
                                                Edit
                                              </div>
                                            </div>
                                          </Link>
                                          <p className="offer_applied">
                                            10% Off Applied
                                          </p>
                                        </div>

                                        <div className="box_2">
                                          <span>x{item.quantity}</span>
                                        </div>

                                        <div className="box_3">
                                          <span>
                                            {" "}
                                            {parseFloat(
                                              item.quantity * item.item_price
                                            ).toFixed(2)}
                                          </span>
                                          <span>
                                            00:03 min <br></br>last update
                                          </span>
                                        </div>

                                        <div className="box_4">
                                          <span
                                            onClick={() =>
                                              this.deleteItem(item.itemId)
                                            }
                                            id={item.itemId}
                                          >
                                            <img src="/images/icon/cross_red.png" />
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  })}

                                {/* <div className="cart2_row">
<div className="box_1">
<p>1.  Veg Cesar Salad</p>

<div className="w-100-row m-b-10">
<div className="edit" data-toggle="modal" data-target="#edit_product">Edit</div> 
</div> 

<p className="offer_applied">10% Off Applied</p>   
</div>

<div className="box_2">
<span>x2</span>
</div>


<div className="box_3">
<span>299</span>
<span>00:03 min <br></br>last update</span>
</div>


<div className="box_4">
<span><img src="/images/icon/cross_red.png"/></span>
</div>

</div> */}
                              </div>
                            </div>
                          </div>

                          <div className="cart1_box col-md-12">
                            <div className="expand_menu_cart">
                              <span>
                                <img src="/images/icon/downarrow_cartexapand.png" />
                              </span>
                            </div>

                            <div className="cart_scroll">
                              <div className="cart_total_row">
                                <p>
                                  <span className="left discount">
                                    10% Applied
                                  </span>{" "}
                                  <span className="right discount">₹ 00</span>
                                </p>

                                <p>
                                  <span className="left">Extra Charges</span>{" "}
                                  <span className="right">0</span>
                                </p>
                                <p>
                                  <span className="left tax">
                                    Tax & Charges
                                  </span>{" "}
                                  <span className="right">₹ 00</span>
                                </p>
                                <p>
                                  <span className="left discount">
                                    Discount (free delivery)
                                  </span>{" "}
                                  <span className="right discount">₹ 00</span>
                                </p>

                                <p className="m-t-15">
                                  <span className="left grandtotal_font">
                                    Grand Total
                                  </span>{" "}
                                  <span className="right grand_font">
                                    {" "}
                                    ₹ {totalPrice}.00
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="w-100-row kotsettle_btn">
                            <span className="btn add_ord kot cancel">
                              <a href="#">Cancel</a>
                            </span>

                            <span className="btn view_ord">
                              <a
                                href="#"
                                data-toggle="modal"
                                data-target="#add_edit_position"
                              >
                                Settle
                              </a>{" "}
                            </span>
                          </div>
                        </div>
                      ) : (
                        ""
                      )
                      // <h5 className="text_center">Your Cart (0) (in case cart is empty)</h5>
                    }
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

export default LiveCart;
