import React from "react";
import firebase from '../config';
import Sidebar from './sidebar';
import Header from './header';
import {Link} from "react-router-dom";
class CartView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          cartList: [],
         
        };
    }
    componentDidMount(){
    
      this.cartView();
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

    render() {

      var orderId=(Math.round((new Date().getTime() / 10000)));
      var CartId=(Math.round((new Date().getTime() / 1000)));
      // var Discount = "";
      let totalPrice = 0;

        return (
       
         <>
    
          {this.state.cartList&&this.state.cartList.length >0
            ? (
    
    <div className="col-lg-5 righ_pangap">
    
    <div className="order_btns view_t_page">
    {/* <span className="btn view_ord"><a href="ViewTables">Cart View</a></span> 
  <span className="btn add_ord"><a href="/ViewTableBillView">Bill View</a></span>
  
    */}
      <span className="btn view_ord"><a href="#">Cart View</a></span> 
  <span className="btn add_ord"><a href="#">Bill View</a></span>
   
    </div>
    
    <div className="order_id_view col-md-12 m-t-20">
    Order ID  <span>{orderId}</span>
    </div>

                  
                                                        
    <div className="live_cart_box col-md-12 m-t-20" >
    <div className="live_cart_row">
    <span className="live_class_head">Live Cart</span>
    <span className="live_cart_id">CART ID : {CartId}</span>
    </div>
    {this.state.cartList && this
                                                    .state
                                                    .cartList
                                                    .map((item, index) => {
                                                      // var price = ((item.quantity) * (item.item_price));
                                                      // totalPrice += (price);
                                                      
                                                      return (


                                                      
    
    <div className="live_cart_row" key={index}>
    <div className="left">
    <p>{index+1}.  {item.item_name}</p>
    <p><span className="edit" data-toggle="modal" data-target="#edit_product">Edit</span> 

    <span className="delete" onClick={() => this.deleteItem(item.itemId)}
     id={item.itemId}>
    <img src="/images/icon/delete_cross.svg"/>
    </span>
    
    
    </p>  
    <p className="offer_applied">{item.item_discount}% Off Applied</p>                   
    </div>
                                                      <div className="mid">x{item.quantity}</div>
    <div className="right">
    <span>₹   {parseFloat((item.quantity) * (item.item_price)).toFixed(2)}</span>
    <span>00:03 min last update</span>
    </div>
    </div>
       )})}
    
    {/* <div className="live_cart_row">
    <div className="left">
    <p>2.  Veg Cesar Salad</p>
    <p><span className="edit" data-toggle="modal" data-target="#edit_product">Edit</span> <span className="delete">
    <img src="/images/icon/delete_cross.svg"/>
    </span></p>  
    <p className="offer_applied">10% Off Applied</p>                   
    </div>
    <div className="mid">x2</div>
    <div className="right">
    <span>₹ 299</span>
    <span>00:03 min last update</span>
    </div>
    </div> */}
    
    
    
    </div>
                                                 
     
    
    
     <div className="cart2_box col-md-12 m-t-20">
    
    <div className="cart2_row">
    <div className="cart_head">
    <span>Cart 1</span>
    <span>CART ID : {CartId}</span>
    </div>
    <div className="kot_box">
    <span className="btn">KOT</span>
    </div>
    </div>
    {this.state.cartList && this
                                                    .state
                                                    .cartList
                                                    .map((item, index) => {
                                                      // var price = ((item.quantity) * (item.item_price));
                                                      // totalPrice += (price);
                                                      
                                                      return (

    
    <div className="cart2_row">
    
    <div className="box_1">
    <p>{index+1}.  {item.item_name}</p>
    
    <div className="w-100-row m-b-10">
    <div className="kot"><button>KOT</button></div> 
    <div className="edit" data-toggle="modal" data-target="#edit_product">Edit</div> 
    </div> 
     
    <p className="offer_applied">{item.item_discount}% Off Applied</p>   
    </div>
    
    <div className="box_2">
    <span>x{item.quantity}</span>
    </div>
    
    
    <div className="box_3">
    <span>₹  {parseFloat((item.quantity) * (item.item_price)).toFixed(2)}</span>
    <span>00:03 min last update</span>
    </div>
    
    
    <div className="box_4">
    <span><img src="/images/icon/cross_red.png"/></span>
    </div>
    
    </div>
     )})}
    
    {/* <div className="cart2_row">
    
    <div className="box_1">
    <p>1.  Veg Cesar Salad</p>
    
    <div className="w-100-row m-b-10">
    <div className="waiter_dropdown cook_dropdown">		
    <div className="dropdown">
      <button className="btn dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
        <span>
        <img src="/images/filter_icon.png"/>
        </span>Cooking
        <span className="caret"></span>
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
        <li><a href="#" data-value="Floor 1">Cooking</a></li>
        <li><a href="#" data-value="Floor 2">Ready</a></li>
      </ul>
    </div>
    </div>
    <div className="edit" data-toggle="modal" data-target="#edit_product">Edit</div> 
    
    </div>
    
    
     
    <p className="offer_applied">10% Off Applied</p>   
    </div>
    
    <div className="box_2">
    <span>x2</span>
    </div>
    
    
    <div className="box_3">
    <span>₹ 299</span>
    <span>00:03 min last update</span>
    </div>
    
    
    <div className="box_4">
    <span><img src="/images/icon/cross_red.png"/></span>
    </div>
    
    </div> */}
    
    </div> 
    
    
    
    <div className="cart1_box col-md-12 m-t-20">
    
    <div className="cart1_row">
    <div className="cart_head">
    <span>Cart 2</span>
    <span className="cart_id">CART ID : {CartId}</span>
    </div>
    
    </div>
    {this.state.cartList && this
                                                    .state
                                                    .cartList
                                                    .map((item, index) => {
                                                      var price = ((item.quantity) * (item.item_price));
                                                      totalPrice += (price);
                                                   
                                                      return (

    <div className="cart2_row mb-0">
    <div className="box_1">
    <p>{index+1}.  {item.item_name}</p>
     </div>
    <div className="box_2">
    <span>x{item.quantity}</span>
    </div>
    </div>
                                                      )})}
    
    <div className="cart_total_row">
    <p><span className="btn apply_coupon">Apply Coupon</span></p>
    <p><span className="left">Sub Total</span> <span className="right"> ₹ {totalPrice}.00</span></p>
    <p><span className="left">Extra Charges</span> <span className="right">0</span></p>
    <p><span className="left tax">Tax & Charges</span> <span className="right">₹  00</span></p>
    <p><span className="left discount">Discount (Free delivery)</span> <span className="right discount">₹ 00</span></p>
    
    <p className="m-t-15"><span className="left">Grand Total</span> <span className="right grand_font"> ₹ {totalPrice}.00</span></p>
    
    </div>
    
    <div className="order_btns w-100-row view_t_page  m-t-20">
    
    <span className="btn add_ord kot">
    <a href="#">
    KOT</a></span>
    
    <span className="btn view_ord"><a href="view_table_billview.html">Settle</a> </span>
    </div>
    
    
    
    </div>
    
    
    
    
    
    
    
    </div>
    
    
    )
    : 
    ''
    // <h5 className="text_center">Your Cart (0) (in case cart is empty)</h5>
}
               </>
        );
    }
}

export default CartView;
