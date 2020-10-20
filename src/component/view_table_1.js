import React from "react";
import firebase from '../config';
import Sidebar from './sidebar';
import Header from './header';
import {Link, withRouter} from "react-router-dom";
import CartView from './cart_view';
class ViewTables1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

          productList: [],
            loading: true,
            plpID:'',
            date: new Date().toLocaleString()
        };
    }
  
  //   componentWillMount() {
   
  //     this.setState({loading: true});
  //     var ref = firebase
  //         .database()
  //         .ref("sub_categories/");

  //     ref.on('value', snapshot => {
  //         const data = [];
  //         snapshot.forEach(childSnapShot => {

  //             const GSTData = {
  //                 subcategoryId: childSnapShot
  //                     .key
  //                     .toString(),
  //                     category: childSnapShot
  //                     .val()
  //                     .category,
  //                     sub_category_photo:childSnapShot
  //                     .val().sub_category_photo,
  //                     created_on: childSnapShot
  //                     .val()
  //                     .created_on,
  //                     sub_category: childSnapShot
  //                     .val()
  //                     .sub_category,
                     


  //             };

  //             data.push(GSTData);
  //         });

  //         this.setState({subcategoryList: data, countPage: data.length, loading: false});
  //         console.log(this.state.subcategoryList);
  
  //     });


  // }


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
            .ref(`merchant_menu_items`).orderByChild("category").equalTo(plpID);
       

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
customerList=()=>{
this.setState({loading: true});
var ref = firebase
   .database()
   .ref("Customer_with _tablename/").limitToLast(1);

ref.on('value', snapshot => {
   const data = [];
   snapshot.forEach(childSnapShot => {

       const GSTData = {
           customerId: childSnapShot
               .key
               .toString(),
               customer_name: childSnapShot
               .val()
               .customer_name,
               customer_number:childSnapShot
               .val().customer_number,
               table_name:childSnapShot
               .val().table_name,
               created_on: childSnapShot
               .val()
               .created_on,


       };

       data.push(GSTData);
   });

   this.setState({customerList: data, countPage: data.length, loading: false});
   console.log(this.state.customerList);

});
}

    render() {
        const {plpID}=this.props.match.params;
        return (
          <>
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
    <div className="col-md-8">
    
    <div className="search_top">
    
    
        <a href="#" className="search_icon"><i className="fas fa-search"></i></a>       
        <input className="search_input" type="text" name="" placeholder="Search..."/>
             
    
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
    {/* <div className="col-md-4 view_table_arrow"><img src="/images/icon/view_t-b_a.svg"/>View Table</div> */}
    <a href="/Tables">
  <div className="col-md-4 view_table_arrow"> <img src="/images/icon/view_t-b_a.svg"/>View Table</div></a>
    <div className="col-md-8 table_heading_view">Table 07A</div>
    </div>
    
    <div className="row mt-30">
    
    <div className="col-lg-7">
    
    <div className="row">
    
    <div className="marge_table_btns mb-20">
    <span>Move</span>
    <span>Merge</span>
    <span>Swap</span>
    </div>
    
    <div className="people_box col-md-12 mb-20">
    <div className="row">
    <div className="col-md-7 p-0">
    <ol className="people_list">
    <li>John Doe</li>
    <li>Lina Doe</li>
    <li>Willam Doe</li>
    </ol>
    </div>
    
    <div className="col-md-5">
    <div className="col-md-12  m-b-15 add_button_orange" data-toggle="modal" data-target="#add_customer"><span>ADD</span>
    </div>
    <div className="col-md-12">
    <span>
    <div className="waiter_dropdown">		
    <div className="dropdown">
      <button className="btn dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
        <span>
        <img src="/images/filter_icon.png"/>
        </span>Choose Waiter
        <span className="caret"></span>
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
        <li><a href="#" data-value="Floor 1">Waiter 1</a></li>
        <li><a href="#" data-value="Floor 2">Waiter 2</a></li>
        <li><a href="#" data-value="Floor 3">Waiter 3</a></li>
        <li><a href="#" data-value="Floor 4">Waiter 4</a></li>
      </ul>
    </div>
    </div>
    </span></div>
    
    </div>
    
    
    </div></div>
    
    
    <div className="col-md-12 confirm_cancel_cart mb-20 p-0">
    <span className="bnt con_cart_btn">Confirm cart <span className="cart_no">{this.state.cartCount}</span></span>
    <span className="btn cancel_btn">Cancel</span>
    </div>
    
    <div className="col-md-12 menu_category_block p-0">
    <div className="category_menu_search">
    <span className="cate_menu">
    <a href="#">Menu</a> / 
    <a href="#">{plpID}</a> 
    {/* <a href="view_table_2.html"  className="current">Category 2</a> */}
    </span>

{/* <div className="breadcrumb-area">

<div className="container-fluid">

    <div className="breadcrumb-content">

        <ul>

            <li>
                <Link to="#">Main</Link>
            </li>

            <li className="active">{plpID}</li>

        </ul>

    </div>

</div>

</div> */}
    <span className="cate_search">
    <input type="text" placeholder="Search"/>
    <a href="#" className="search_icon"><i className="fas fa-search"></i></a>
    </span>
    </div>
    
    
    <div className="cate_images_blk">
    
    <div className="row">
    {this.state.itemList&&this.state.itemList.map((data, index) => {

return (
    <div className="col-md-4 mb-15"  key={index}>
     
    <div className="cate_img_box"style={{background:"#fd0606"}}>
    <Link to={`/ViewTables2/${data.sub_category}`}>
    <img src={data.item_image} className="img_empty"/>
<p> {data.sub_category}</p>
</Link>
    </div>
  
    </div>
)})

    }
    
   
    
    
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
    
    
    </div>
            
            
                    
    </div>
    
    
    
   
  <CartView/>
    
    </div></div>
    
    
    
    
    
    </div>
    
    
    
    
    
    
    
    </div>
                   
    
    
    
    
    
    
    
                   </div>
                
                
                </div>
               
                <div className="modal fade" id="add_customer" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true">
<div className="modal-dialog modal-sm hipal_pop" role="document">
<div className="modal-content">
<div className="modal-header">
<h5 className="modal-title" id="smallmodalLabel">Add Customer to Table 07A</h5>
</div>
<div className="modal-body">
<div className="col-12 w-100-row ocupeny_no m-t-10">Occupancy <span>03</span></div>
<div className="col-12 w-100-row">
<div className="w-10 no">01</div>
<div className="w-45 field">
<div className="form-group">
<input type="text" id="text-input" name="text-input" placeholder="Name" className="form-control"/>
</div>
</div>
<div className="w-45 field">
<div className="form-group">
<input type="text" id="text-input" name="text-input" placeholder="Number" className="form-control"/>
</div>
</div>
</div>
<div className="col-12 w-100-row">
<div className="w-10 no">02</div>
<div className="w-45 field">
<div className="form-group">
<input type="text" id="text-input" name="text-input" placeholder="Name" className="form-control"/>
</div>
</div>
<div className="w-45 field">
<div className="form-group">
<input type="text" id="text-input" name="text-input" placeholder="Number" className="form-control"/>
</div>
</div>
</div>
<div className="col-12 w-100-row">
<div className="w-10 no">03</div>
<div className="w-45 field">
<div className="form-group">
<input type="text" id="text-input" name="text-input" placeholder="Name" className="form-control"/>
</div>
</div>
<div className="w-45 field">
<div className="form-group">
<input type="text" id="text-input" name="text-input" placeholder="Number" className="form-control"/>
</div>
</div>
</div>
<div className="col-12 w-100-row text-center"><span className="btn add_btn_pop_orange">ADD</span></div>
</div>



<div className="modal-footer">
<button type="button" className="btn close_btn" data-dismiss="modal">Close </button>
<button type="button" className="btn save_btn">Save</button>
</div>


</div>
</div>
</div>
           
           </>
           
               
        );
    }
}

export default ViewTables1;
