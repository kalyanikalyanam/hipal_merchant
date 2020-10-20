import React from "react";
import firebase from '../config';
import Sidebar from './sidebar';
import Header from './header';
import {Link} from "react-router-dom";
import CartView from './cart_view';
class MainItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          cartList: [],
         
        };
    }
    componentDidMount(){
      const {plpID}=this.props.match.params;
      this.itensDetails(plpID);
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
  componentWillReceiveProps(nextProps, prevState) {
      console.log(nextProps);
      const {plpID}=nextProps.match.params;
      this.itensDetails(plpID);
     
  }
      itensDetails(plpID) {
         
          this.setState({loading: false});
      console.log(plpID);
          var ref = firebase
              .database()
              .ref(`merchant_menu_items`).orderByChild("sub_category").equalTo(plpID);
         
  
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
  

    render() {
        return (
        
   <div className="col-md-12 menu_category_block p-0">
    <div className="category_menu_search">
    <span className="cate_menu">
    <a href="view_table.html">Menu</a> / 
    <a href="view_table_1.html">Category 1</a> / 
    <a href="view_table_2.html"  className="current">Category 2</a>
    </span>
    <span className="cate_search">
    <input type="text" placeholder="Search"/>
    <a href="#" className="search_icon"><i className="fas fa-search"></i></a>
    </span>
    </div>
    
    
    <div className="cate_images_blk">
    
    <div className="row">

   
    {this.state.itemList&&this.state.itemList.map((item, index) => {

return (
    
    <div className="col-md-4 mb-15"  key={index}>
       <Link to={`/SingleItempage/${item.itemId}`}>
    <div className="cate_img_box item">
    <div className="item_name">
    <span>{item.item_name}</span><br/>
    <span >Add To Cart</span> 
    
    <span className="item_diff ">
    <span className="veg"></span>
   
    </span>
    </div>
    <div className="price">₹ {item.item_price}</div>
    </div>
    </Link>
    </div>
)})}

    
    
    
    
    </div>
    
    
    <div cl="row">
    <div className="pagi_nation w-100">
    <a href="#" className="activepage">1</a>
    <a href="#">2</a>
    <a href="#">3</a>
    </div>
    </div>
    
    </div>
    
    
    
    
    </div>
    
    
  
               
        );
    }
}

export default MainItems;
