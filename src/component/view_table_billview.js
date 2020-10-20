import React from "react";
import firebase from '../config';
import Sidebar from './sidebar';
import Header from './header';
class ViewTableBillView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

         
        };
    }
  

    render() {
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
<img src="images/icon/profile.jpg"/>
</span>
<span className="profile_data">
<p className="name">Krisha Kola</p>
<p>krishna.kola@gmail.com</p>
</span>
</div>


</div>
</div>

</div>


</div>
       
</div>


<div className="row mt-30">
<div className="col-md-4 view_table_arrow"><img src="images/icon/view_t-b_a.svg"/>View Table</div>
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
<div className="col-md-12  m-b-15 add_button_orange"><span>ADD</span>
</div>
<div className="col-md-12">
<span>
<div className="waiter_dropdown">		
<div className="dropdown">
<button className="btn dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
<span>
<img src="images/filter_icon.png"/>
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
<span className="bnt con_cart_btn">Confirm cart</span>
<span className="btn cancel_btn">Cancel</span>
</div>

<div className="col-md-12 menu_category_block p-0">
<div className="category_menu_search">
<span className="cate_menu">
<a href="#" className="current">Menu</a> / <a href="#">Category 1</a> / <a href="#">Category 2</a>
</span>
<span className="cate_search">
<input type="text" placeholder="Search"/>
<a href="#" className="search_icon"><i className="fas fa-search"></i></a>
</span>
</div>


<div className="cate_images_blk">

<div className="row">

<div className="col-md-4 mb-15">
<div className="cate_img_box">
<img src="images/category_img.png"/>
<p> CATEGORY 1</p>
</div>
</div>

<div className="col-md-4 mb-15">
<div className="cate_img_box">
<img src="images/category_img.png"/>
<p> CATEGORY 2</p>
</div>
</div>

<div className="col-md-4 mb-15">
<div className="cate_img_box">
<img src="images/category_img.png"/>
<p> CATEGORY 3</p>
</div>
</div>

<div className="col-md-4 mb-15">
<div className="cate_img_box">
<img src="images/category_img.png"/>
<p> CATEGORY 4</p>
</div>
</div>

<div className="col-md-4 mb-15">
<div className="cate_img_box">
<img src="images/category_img.png"/>
<p> CATEGORY 5</p>
</div>
</div>

<div className="col-md-4 mb-15">
<div className="cate_img_box">
<img src="images/category_img.png"/>
<p> CATEGORY 6</p>
</div>
</div>

<div className="col-md-4 mb-15">
<div className="cate_img_box">
<img src="images/category_img.png"/>
<p> CATEGORY 7</p>
</div>
</div>

<div className="col-md-4 mb-15">
<div className="cate_img_box">
<img src="images/category_img.png"/>
<p> CATEGORY 8</p>
</div>
</div>

<div className="col-md-4 mb-15">
<div className="cate_img_box">
<img src="images/category_img.png"/>
<p> CATEGORY 9</p>
</div>
</div>




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



<div className="col-lg-5 righ_pangap">

<div className="order_btns view_t_page">

<span className="btn view_ord"><a href="/ViewTables">Cart View</a></span> 
<span className="btn add_ord"><a href="/ViewTableBillView">Bill View<div className="red_dot2"></div></a></span>
</div>


<div className="bill_box">

<div className="order_id_view col-md-12 m-t-20 p-b-20">
Order ID  <span>2133456</span>
</div>

<div className="order_details_box1 col-12">

<div className="data">
<p>
<span className="left">
Wed, May 27, 2020<br></br>
09:23:45 AM<br></br>
Order ID : 45635453462
</span>

<span className="right">
Table 7A<br></br>
S. Varun<br></br>
Copy : 0
</span>

</p>
</div>

<div className="data m-t-20">
<div className="bill_row_item b">
<div className="left_item">Item</div>
<div className="mid_item">Qty</div>
<div className="right_item">Price</div>
</div>

<div className="bill_row_item">
<div className="left_item">Item name 1</div>
<div className="mid_item">1</div>
<div className="right_item">599</div>
</div>

<div className="bill_row_item">
<div className="left_item">Item name 2</div>
<div className="mid_item">1</div>
<div className="right_item">599</div>
</div>

<div className="bill_row_item">
<div className="left_item">Item name 3</div>
<div className="mid_item">1</div>
<div className="right_item">599</div>
</div>





</div>

<div className="data m-t-20">

<div className="bill_row_item b">
<div className="left_item w-65">Subtotal</div>
<div className="right_item w-35">₹ 1197</div>
</div>

<div className="bill_row_item b">
<div className="left_item w-65">Offer</div>
<div className="right_item w-35">-100</div>
</div>

<div className="bill_row_item b">
<div className="left_item w-65">Extra charges</div>
<div className="right_item w-35">-</div>
</div>


<div className="bill_row_item b">
<div className="left_item w-65">Packaging charges</div>
<div className="right_item w-35">-</div>
</div>

<div className="bill_row_item b m-t-20">
<div className="left_item w-65">Total</div>
<div className="right_item w-35">₹ 1097</div>
</div>

</div>



<div className="data m-t-20 bdr_g-5">
<p>
<span className="left">
Settled <br></br>
Cash ( Rs 500)<br></br>
Card ( Rs 597)
</span>

<span className="right">
Settled by<br></br>
R. Raju
</span>

</p>
</div>

<div className="order_btns w-100-row view_t_page  m-t-20">
<span className="btn add_ord kot"><a href="bill_print.html" target="_blank">Save/ Print</a></span>
<span className="btn view_ord"><a href="#">Save</a></span> 
<span className="btn add_ord kot in"><a href="#">Copy-Print</a></span>
</div>

</div>
</div>













</div>


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

export default ViewTableBillView;
