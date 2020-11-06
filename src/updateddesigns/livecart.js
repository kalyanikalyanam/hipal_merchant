import React from "react";
import firebase from '../config';
import Sidebar from '../component/sidebar';
import Header from '../component/header';
import {Link} from "react-router-dom";


class LiveCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liveCartItems: '',
            orderItems: ''
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        var sessionId = sessionStorage.getItem("RoleId");
        var businessId = sessionStorage.getItem("businessId");
        if (sessionId && businessId) {
            firebase
                .database()
                .ref("merchant_users/" + sessionId)
                .on("value", (snapshot) => {
                    var Users = snapshot.val();
                    sessionStorage.setItem("username", Users.user_name);
                    sessionStorage.setItem("email", Users.email_id);

                    this.setState({
                        userRole: Users.Role,
                        loading: false,
                    });
                });

            firebase
                .database().ref('merchaant_business_details/' + businessId).on('value', snapshot => {
                    var business = snapshot.val();
                    sessionStorage.setItem("BusinessId", business.businessId);
                    sessionStorage.setItem("BusinessName", business.business_name);
                    sessionStorage.setItem("BusinessLogo", business.business_logo);
                    this.setState({

                    });

                });
        }
        this.cartView();
        this.itemsDetails();
        this.tableList();
    }

    cartView() {
        this.setState({loading: false});

        var cartItems = JSON.parse(localStorage.getItem('cartItems'));

        this.setState({
            cartList: cartItems,
            cartCount: cartItems
            ? cartItems.length
            : 0,
            loading: true
        });
    }
    deleteItem = (val) => {
        var cartItems = JSON.parse(localStorage.getItem('cartItems'));
        for (var i = 0; i < cartItems.length; i++) {
            if (cartItems[i]['itemId'] == val) {
                console.log(val);
                cartItems.splice(i, 1);

                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                this.cartView();
            }
        }
    };
    itemsDetails() {
        this.setState({loading: false});
        var ref = firebase
            .database()
            .ref('merchant_menu_items');
        ref.on('value', snapshot => {
            const data = [];
            console.log(snapshot.val());
            snapshot.forEach(childSnapShot => {

                const Products = {
                    itemId: childSnapShot
                    .key
                    .toString(),
                    item_id:childSnapShot.val().item_id,
                    item_name:childSnapShot.val().item_name,
                    item_description:childSnapShot.val().item_description,
                    item_halal:childSnapShot.val().item_halal,
                    item_image:childSnapShot.val().item_image,
                    item_points:childSnapShot.val().item_points,

                    station_name:childSnapShot.val().station_name,
                    item_restaurant_id:childSnapShot.val().item_restaurant_id,
                    item_type:childSnapShot.val().item_type,
                    item_hash_tags:childSnapShot.val().item_hash_tags,
                    item_price:childSnapShot.val().item_price,
                    item_tax:childSnapShot.val().item_tax,

                    category:childSnapShot.val().category,
                    sub_category:childSnapShot.val().sub_category,


                    sessionId:childSnapShot.val().sessionId,
                    status: childSnapShot.val().status,
                    username:childSnapShot.val().username,



                    portions:childSnapShot.val().portions,
                    portions_details:childSnapShot.val().portions_details,



                    advance:childSnapShot.val().advance,
                    carbs:childSnapShot.val().carbs,
                    protien:childSnapShot.val().protien,
                    fat:childSnapShot.val().fat,
                    item_video:childSnapShot.val().item_video,
                    item_multiple_image:childSnapShot.val().downloadURLs,


                    extra:childSnapShot.val().extra,
                    healthytag:childSnapShot.val().healthytag,
                    bestsellertag:childSnapShot.val().bestsellertag,


                    recommend:childSnapShot.val().recommend,
                    // recommenditem:childSnapShot.val(). recommenditem,
                    recommendations:childSnapShot.val().recommendations,


                    created_on:childSnapShot.val().created_on,
                };

                data.push(Products);
            });

            this.setState({itemList: data, loading: true});
            console.log(this.state.itemList);

        });

    }

    tableList() {
        const {tableId} = this.props.match.params;
        console.log(tableId);

        var ref = firebase
            .database()
            .ref(`tables_with_floors/${tableId}`);
        ref.on('value', snapshot => {
            var userData = snapshot.val();
            console.log(userData)
            this.setState({
                table_name:userData.table_name,
                table_capacity:userData.table_capacity,
                table_floor:userData.table_floor,
                table_icon:userData.table_icon,
                table_notes:userData.table_notes,
                table_qrcode:userData.table_qrcode,
                status:userData.status,


            });
            //console.log(this.state.pageTitle);
        });

    }


    render() {
        var orderId=(Math.round((new Date().getTime() / 10000)));
        var CartId=(Math.round((new Date().getTime() / 1000)));
        // var Discount = "";
        let totalPrice = 0;
        return (

            <div className="page-wrapper">


                <Sidebar/>
                <div className="page-container">

                    <Header/>
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
                                                            <p className="open">OPEN <i className="fa fa-circle" aria-hidden="true"></i></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="search_top">
                                                        <a href="#" className="search_icon"><i className="fas fa-search"></i></a>
                                                        <input className="search_input" type="text" name="" placeholder="Search..."/>
                                                    </div>
                                                </div>
                                                <div className="col-md-3 ">
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
                                                                <div className="table_no">{this.state.table_name}</div>
                                                                <div className="people_row">
                                                                    <span className="bottom nonfille"></span>
                                                                    <span className="bottom fill"></span>
                                                                </div>

                                                            </div>
                                                            <div className="time"><span>2:02</span></div>
                                                        </div>


                                                    </div>
                                                    <div className="col-md-5">

                                                        <div className="names_options"><a href="#" className="active_btn">
                                                            <img src="/images/icon/icon_users_w.png"/>
                                                            Customers Names</a></div>
                                                        <div className="names_options m-t-20"><a href="#">
                                                            <img src="/images/icon/icon_settings.svg"/>
                                                            Advanced Options</a></div>

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
                                                </div></div>

                                            <div className="col-md-5 p-r-0">
                                                <div className="user_love_box">
                                                    <div className="visit_row">
                                                        <span>116<br></br><span className="sub">Visits</span></span>
                                                        <span>Loves<br></br><span className="sub">Chicken Past</span></span>
                                                        <span>LvL<br></br><span className="sub">D</span></span>
                                                    </div>

                                                    <div className="loves_row">
                                                        <span><img src="/images/icon/love_icon.png"/></span>
                                                        <span>Chicken White Past..</span>
                                                        <span>
                                                            <img src="/images/icon/icon_1.png" className="one"/>
                                                            <img src="/images/icon/icon_2.png" className="two"/>
                                                            <img src="/images/icon/icon_3.png" className="three"/>
                                                        </span>
                                                        <span>9.9</span>
                                                    </div>

                                                    <div className="loves_row">
                                                        <span><img src="/images/icon/love_icon.png"/></span>
                                                        <span>Chicken White Past..</span>
                                                        <span>
                                                            <img src="/images/icon/icon_1.png" className="one"/>
                                                            <img src="/images/icon/icon_2.png" className="two"/>
                                                            <img src="/images/icon/icon_3.png" className="three"/>
                                                        </span>
                                                        <span>9.9</span>
                                                    </div>

                                                    <div className="knowmore_loves">
                                                        Know more
                                                    </div>



                                                </div>
                                            </div>

                                        </div>

                                        <div className="row m-t-20">
                                            <div className="col-md-12 menu_category_block">

                                                <div className="category_menu_search">
                                                    <span className="cate_menu">
                                                        <a href="#" className="current">Menu</a> <i className="fa fa-caret-right" aria-hidden="true"></i>
                                                        <a href="#">Category 1</a> <i className="fa fa-caret-right" aria-hidden="true"></i>
                                                        <a href="#">Category 2</a>
                                                    </span>
                                                    <span className="cate_search">
                                                        <input type="text"  id="myInput1" placeholder="Search"/>
                                                        <a href="#" className="search_icon"><i className="fas fa-search"></i></a>
                                                    </span>
                                                    <span className="livecart_box">Items in Live Cart <span className="number">{this.state.cartCount}</span></span>
                                                </div>
                                                <div className="cate_images_blk">
                                                    <div className="row" id="myDIV1">
                                                        {this.state.itemList &&this.state.itemList.map((item, index) => {
                                                            return (
                                                                <div className="col-md-4 mb-15" key={index}>
                                                                        <div className="cate_img_box item">
                                                                            <div className="item_name">
                                                                                <span>{item.item_name}</span>
                                                                                <span className="item_diff ">
                                                                                    {item.item_type=="Veg"?
                                                                                        <span className="veg"></span>
                                                                                        :
                                                                                        <span className="nonveg"></span>
                                                                                    }
                                                                                    {item.item_type=="Egg"?
                                                                                        <span className="egg"></span>
                                                                                        :''
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                            <div className="price">₹ {item.item_price}</div>
                                                                        </div>
                                                                </div>

                                                            )})}
                                                    </div>


                                                </div>

                                            </div>


                                        </div>




                                    </div>

                                    <div className="col-lg-5 righ_pangap cart_box_width_2">

                                        <div className="btns_livecart col-md-12">
                                            <span className="width"><span className="activedot red">{this.state.cartCount}</span><a href="/LiveCart"  className="btn active_item">Live Cart</a></span>
                                            <span className="width"><a href="/Order"  className="btn"> Order</a></span>
                                            <span className="width"><a href="/Bill"  className="btn">Bill</a></span>
                                        </div>

                                        {this.state.cartList&&this.state.cartList.length >0
                                            ? (
                                                <div className="order_id_cart_box col-md-12 m-t-20">
                                                    <p className="order_id_cart">Order ID:  <span>{orderId}</span></p>
                                                    <div className="cart_scroll_box">
                                                        <div className="cart2_box col-md-12 m-t-20 active_box">
                                                            <span className="ribbon_cart">{this.state.cartCount}</span>
                                                            <div className="cart2_row">
                                                                <div className="cart_head">
                                                                    <span>Cart 1 ID : {CartId}</span>
                                                                </div>
                                                                <div className="kot_box livecart_head">
                                                                    Live Cart
                                                                </div>
                                                            </div>
                                                            <div className="cart_scroll no_height">
                                                                {this.state.cartList && this
                                                                        .state
                                                                        .cartList
                                                                        .map((item, index) => {
                                                                            var price = ((item.quantity) * (item.item_price));
                                                                            totalPrice += (price);
                                                                            return (
                                                                                <div className="cart2_row" key={index}>
                                                                                    <div className="box_1">
                                                                                        <p>{index+1}.  {item.item_name}</p>
                                                                                        <Link to={`/SingleItempage/${item.itemId}`}>
                                                                                            <div className="w-100-row m-b-10">
                                                                                                <div className="edit" data-toggle="modal" data-target="#edit_product">Edit</div>
                                                                                            </div>
                                                                                        </Link>
                                                                                        <p className="offer_applied">10% Off Applied</p>
                                                                                    </div>

                                                                                    <div className="box_2">
                                                                                        <span>x{item.quantity}</span>
                                                                                    </div>


                                                                                    <div className="box_3">
                                                                                        <span> {parseFloat((item.quantity) * (item.item_price)).toFixed(2)}</span>
                                                                                        <span>00:03 min <br></br>last update</span>
                                                                                    </div>


                                                                                    <div className="box_4">
                                                                                        <span onClick={() => this.deleteItem(item.itemId)}
                                                                                            id={item.itemId}><img src="/images/icon/cross_red.png"/></span>
                                                                                    </div>

                                                                                </div>
                                                                            )})}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="cart1_box col-md-12">
                                                        <div className="expand_menu_cart"><span><img src="/images/icon/downarrow_cartexapand.png"/></span></div>
                                                        <div className="cart_scroll">
                                                            <div className="cart_total_row">
                                                                <p><span className="left discount">10% Applied</span> <span className="right discount">₹ 00</span></p>
                                                                <p><span className="left">Extra Charges</span> <span className="right">0</span></p>
                                                                <p><span className="left tax">Tax & Charges</span> <span className="right">₹  00</span></p>
                                                                <p><span className="left discount">Discount (free delivery)</span> <span className="right discount">₹ 00</span></p>
                                                                <p className="m-t-15"><span className="left grandtotal_font">Grand Total</span> <span className="right grand_font"> ₹ {totalPrice}.00</span></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-100-row kotsettle_btn">
                                                        <span className="btn add_ord kot cancel">
                                                            <a href="#">
                                                                Cancel</a></span>
                                                        <span className="btn view_ord"><a href="#"  data-toggle="modal" data-target="#add_edit_position">Settle</a> </span>
                                                    </div>
                                                    <singleItemForm />
                                                </div>
                                            )
                                            :
                                            ''
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
