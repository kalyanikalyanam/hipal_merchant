import React from "react";
import firebase from '../config';
import Sidebar from '../component/sidebar';
import Header from '../component/header';
import {Link} from "react-router-dom";
class Bill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

         
        };
    }
  
    componentDidMount() {
      this.setState({ loading: true });
      var sessionId = sessionStorage.getItem("RoleId");
      var businessId = sessionStorage.getItem("businessId");
      if (sessionId) {
        //console.log(sessionId);
  
        firebase
          .database()
          .ref("merchant_users/" + sessionId)
          .on("value", (snapshot) => {
            var Users = snapshot.val();
            //console.log(Users);
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
       console.log(business);
       sessionStorage.setItem("BusinessId", business.businessId);
       sessionStorage.setItem("BusinessName", business.business_name);
       sessionStorage.setItem("BusinessLogo", business.business_logo);
     
      this.setState({
      
          
          
        });
  
        
       
       
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

  
     }
    render() {
        return (
            <div class="page-wrapper">
   

           <Sidebar/>
            <div class="page-container">
       
              <Header/>
                <div class="main-content">
                    <div class="section__content">
                    
                    
                    
            
                    
    <div class="container-fluid">
    
    
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
    
    
    
    
    <div class="row mt-30">
    
    <div class="col-lg-7 cart_box_width_1">
    
    <div class="row">
    
    <div class="col-md-7">
    <div class="staff_box row">
    <div class="col-md-3">
    <div class="kot_box">
    <div class="cookhead">Cooking</div>
    <div class="table_small">
    <div class="people_row">
    <span class="top fill"></span>
    <span class="top fill"></span>
    </div>
    <div class="table_no">   {sessionStorage.getItem("TableName")}</div>
    <div class="people_row">
    <span class="bottom nonfille"></span>
    <span class="bottom fill"></span>
    </div>
    
    </div>
    <div class="time"><span>2:02</span></div>
    </div>
    
    
    </div>
    <div class="col-md-5">
    
    <div class="names_options"><a href="#" class="active_btn">
    <img src="/images/icon/icon_users_w.png"/>
     Customers Names</a></div>
    <div class="names_options m-t-20"><a href="#">
    <img src="/images/icon/icon_settings.svg"/>
     Advanced Options</a></div>
    
    </div>
    <div class="col-md-4">
    <div class="chooseemp_dropdown">
    
    
    <select class="form-control">
    <option>Choose Employee</option>
    <option>Employee 1</option>
    <option>Employee 2</option>
    <option>Employee 3</option>
    <option>Employee 4</option>
    </select>
    
    
    
    
    </div>
    
    </div>
    
    </div></div>
    
    <div class="col-md-5 p-r-0">
    <div class="user_love_box">
    <div class="visit_row">
    <span>116<br></br><span class="sub">Visits</span></span>
    <span>Loves<br></br><span class="sub">Chicken Past</span></span>
    <span>LvL<br></br><span class="sub">D</span></span>
    </div>
    
    <div class="loves_row">
    <span><img src="/images/icon/love_icon.png"/></span>
    <span>Chicken White Past..</span>
    <span>
    <img src="/images/icon/icon_1.png" class="one"/>
    <img src="/images/icon/icon_2.png" class="two"/>
    <img src="/images/icon/icon_3.png" class="three"/>
    </span>
    <span>9.9</span>
    </div>
    
    <div class="loves_row">
    <span><img src="/images/icon/love_icon.png"/></span>
    <span>Chicken White Past..</span>
    <span>
    <img src="/images/icon/icon_1.png" class="one"/>
    <img src="/images/icon/icon_2.png" class="two"/>
    <img src="/images/icon/icon_3.png" class="three"/>
    </span>
    <span>9.9</span>
    </div>
    
    <div class="knowmore_loves">
    Know more
    </div>
    
    
    
    </div>
    </div>
    
    </div>
    
    
    <div class="row m-t-20">
    
    
    <div class="category_upload_image w-100-row hipal_pop settle">
    
    
    <div class="modal-header">
    <h5 class="modal-title" id="smallmodalLabel">Settlement
    </h5>
    <div class="pull-right w-300 set_person">
    <div class="row form-group">
    <div class="col col-md-5">
    <label class=" form-control-label">Settle by</label>
    </div>
    <div class="col-12 col-md-7">
    <select name="select" id="select" class="form-control settle">
    <option value="0">Varun</option>
    <option value="1">Raju</option>
    <option value="2">Krishna</option>
    <option value="3">Rani</option>
    </select>
    </div>
    </div>
    </div>
    </div>
    
    
    
    
    
    
    <div class="upload_img_block add_menu w-100-row">
    
    <div class="modal-body product_edit p-0">
    
    
    
    
    
    <div class="col-12 w-100-row">
    <div class="row">
    <div class="col col-md-5 bill_price">
    Total: Rs 499.00
    </div>
    <div class="col col-md-7 bill_id_settle">
    Bill ID : 150315395123 <span class="btn pull-right add_btn_pop_orange addmode_pad">Add mode</span>
    </div>
    </div>
    </div>
    
    <div class="col-12 w-100-row">
    <div class="row">
    
    <div class="col-md-6">
    
    <div class="pay_box_block">
    
    <div class="box_payment">
    <p class="price"><input type="number" value="120"/></p>
    <p class="img"><img src="/images/icon/cash_icon.png"/></p>
    <p class="price_head">Cash</p>
    </div>
    
    
    <div class="box_payment">
    <p class="price"><input type="number" value="120"/></p>
    <p class="img"><img src="/images/icon/card_icon.png"/></p>
    <p class="price_head">Card</p>
    </div>
    
    
    
    
    
    <div class="box_payment">
    <p class="price"><input type="number" value="120"/></p>
    <p class="img"><img src="/images/icon/hipla_credits.png"/></p>
    <p class="price_head">Hipal
    Credits</p>
    </div>
    
    
    
    <div class="box_payment">
    <p class="price"><input type="number" value="120"/></p>
    <p class="img"><img src="/images/icon/employee_icon_pay.png"/></p>
    <p class="price_head">Employee</p>
    </div>
    
    
    
    <div class="box_payment">
    <p class="price"><input type="number" value="120"/></p>
    <p class="img"><img src="/images/icon/cheqe_cion.png"/></p>
    <p class="price_head">Cheque</p>
    </div>
    
    
    
    <div class="box_payment selected">
    <span class="active">
    <span class="dotsmall"></span>
    </span>
    <p class="price"><input type="number" value="120"/></p>
    <p class="img"><img src="/images/icon/upi_W.png"/></p>
    <p class="price_head">UPI</p>
    </div>
    
    
    
    <div class="box_payment">
    
    <p class="price"><input type="number" value="120"/></p>
    <p class="img"><img src="/images/icon/pending_icon.png"/></p>
    <p class="price_head">Pending</p>
    </div>
    
    
    
    <div class="box_payment">
    <p class="price"><input type="number" value="120"/></p>
    <p class="img"><img src="/images/icon/tip_icon.png"/></p>
    <p class="price_head">Tip</p>
    </div>
    
    
    
    </div>
    
    
    </div>
    
    <div class="col-md-6">
    <div class="w-100-row m-b-30">
    <span class="add_amount">Add Amount</span>
    <span><input type="number" class="add_amount_field" value="" placeholder="Amount here"/></span>
    </div>
    
    
    <div class="pay_mode_bg">
    <p>Choose the mode of payment</p>
    
    
    <div class="row form-group user_roles_check">
    <label class="container_check"><img src="/images/icon/paytm.png"/>
      <input type="checkbox"/>
      <span class="checkmark"></span>
    </label>
    </div>
    
    <div class="row form-group user_roles_check">
    <label class="container_check"><img src="/images/icon/g-pay.png"/>
      <input type="checkbox"/>
      <span class="checkmark"></span>
    </label>
    </div>
    
    <div class="row form-group user_roles_check">
    <label class="container_check"><img src="/images/icon/pnonepay.png"/>
      <input type="checkbox"/>
      <span class="checkmark"></span>
    </label>
    </div>
    
    <div class="row form-group user_roles_check">
    <label class="container_check"> <img src="/images/icon/bhim.png"/>
      <input type="checkbox"/>
      <span class="checkmark"></span>
    </label>
    </div>
    
    <div class="row form-group user_roles_check">
    <label class="container_check"> <img src="/images/icon/amezonpay.png"/>
      <input type="checkbox"/>
      <span class="checkmark"></span>
    </label>
    </div>
    
    <div class="row form-group user_roles_check">
    <label class="container_check"> <img src="/images/icon/freecharge.png"/>
      <input type="checkbox"/>
      <span class="checkmark"></span>
    </label>
    </div>
    
    <div class="row form-group user_roles_check">
    <label class="container_check">Others
      <input type="checkbox"/>
      <span class="checkmark"></span>
    </label>
    </div>
    
    
    </div>
    
    </div>
    </div>
    </div>
    
    
    <div class="col-12 w-100-row bill_price balance text-center">
    Balance (120) 
    
    <div class="modal-footer">
    <button type="button" class="btn close_btn width-150" data-dismiss="modal">Cancel</button>
    <button type="button" class="btn save_btn width-150">Settele</button>
    </div>
    
    
    </div>
    
    </div>
    
    
    </div>
    
    
    </div>
    
    
    
    
    
    </div>
            
    
                    
    
    </div>
    
    
    <div class="col-lg-5 righ_pangap cart_box_width_2">
    
    <div class="btns_livecart col-md-12">
    <span class="width"><span class="activedot"></span><a href="/LiveCart"  class="btn">Live Cart</a></span> 
    <span class="width"><a href="/Order"  class="btn"> Order</a></span>
    <span class="width"><a href="/Bill"  class="btn active_item">Bill</a></span>
    </div>
    
    <div class="order_id_cart_box col-md-12 m-t-20 bg-w m-b-20">
    
    
    
    <div class="width-100 bill_scroll">
    
    
    <table width="100%">
    
    <tbody><tr>
    <td style={{textAlign:"center", padding:"10px", color:"#000000", borderBottom:"1px solid rgba(0, 0, 0, 0.5)"}}><b style={{paddingRight:"10px"}}>BILL ID</b>  2133456</td>
    </tr>
    
    
    <tr>
    <td style={{textAlign:"center",padding:"10px"}}>
    <img src="/images/logo_coffe_cup.png"/>
    </td>
    </tr>
    
    
    
    
    <tr>
    <td style={{textAlign:"center", padding:"10px", color:"#000000"}}>
    12, Sainikpuri, Kapra,<br></br> Secunderabad, Telangana 500094</td>
    </tr>
    
    <tr>
    <td style={{textAlign:"center", padding:"10px", color:"#000000"}}><b>DINE IN</b></td>
    </tr>
    
    <tr>
    
    <td style={{textAlign:"center", padding:"10px", color:"#000000", borderBottom:"1px dashed rgba(0, 0, 0, 0.5)"}}>
    
    <table width="100%">
    
    <tbody><tr>
    <td style={{textAlign:"left", padding:"3px 10px"}}>Wed, May 27, 2020</td>
    <td style={{textAlign:"right", padding:"3px 10px"}}>Table 7A</td>
    </tr>
    
    <tr>
    <td style={{textAlign:"left", padding:"3px 10px"}}>09:23:45 AM</td>
    <td style={{textAlign:"right", padding:"3px 10px"}}>S. Varun</td>
    </tr>
    
    <tr>
    <td style={{textAlign:"left", padding:"3px 10px"}}>Order ID : 45635453462</td>
    <td style={{textAlign:"right", padding:"3px 10px"}}>Copy : 1</td>
    </tr>
    </tbody></table>
    </td>
    
    </tr>
    
    
    <tr>
    
    <td style={{textAlign:"center", padding:"10px", color:"#000000", borderBottom:"1px dashed rgba(0, 0, 0, 0.5)"}}>
    
    <table width="100%">
    
    <tbody><tr>
    <td style={{textAlign:"left", padding:"5px 10px 10px 10px"}}><b>Item</b></td>
    <td style={{textAlign:"center", padding:"5px 10px 10px 10px"}}><b>Qty</b></td>
    <td style={{textAlign:"right", padding:"5px 10px 10px 10px"}}><b>Price</b></td><td>
    </td></tr>
    
    <tr>
    <td style={{textAlign:"left", padding:"3px 10px"}}>Item 1</td>
    <td style={{textAlign:"center", padding:"3px 10px"}}>1</td>
    <td style={{textAlign:"right", padding:"3px 10px"}}>399.00</td>
    </tr>
    
    <tr>
    <td style={{textAlign:"left", padding:"3px 30px"}}>Item 2</td>
    <td style={{textAlign:"center", padding:"3px 30px"}}>1</td>
    <td style={{textAlign:"right", padding:"3px 30px"}}>499.00</td>
    </tr>
    
    <tr>
    <td style={{textAlign:"left", padding:"3px 10px"}}>Item 1</td>
    <td style={{textAlign:"center", padding:"3px 10px"}}>1</td>
    <td style={{textAlign:"right", padding:"3px 10px"}}>599.00</td>
    </tr>
    
    </tbody></table>
    </td>
    
    
    </tr>
    
    
    
    <tr>
    <td style={{textAlign:"center", padding:"10px", color:"#000000", borderBottom:"1px dashed rgba(0, 0, 0, 0.5)"}}>
    
    <table width="100%">
    <tbody><tr>
    <td style={{textAlign:"left", padding:"3px 10px"}}>Subtotal</td>
    <td style={{textalign:"right", padding:"3px 10px"}}>₹ 1197</td>
    </tr>
    <tr>
    <td style={{textAlign:"left", padding:"3px 10px"}}>Offer</td>
    <td style={{textAlign:"right", padding:"3px 10px"}}>-100</td>
    </tr>
    <tr>
    <td style={{textAlign:"left", padding:"3px 10px"}}>Extra charges</td>
    <td style={{textAlign:"right", padding:"3px 10px"}}>-</td>
    </tr>
    <tr>
    <td style={{textAlign:"left", padding:"3px 10px"}}>Packaging charges</td>
    <td style={{textAlign:"right", padding:"3px 10px"}}>-</td>
    </tr>
    <tr>
    <td style={{textAlign:"left", padding:"3px 10px"}}>GST</td>
    <td style={{textAlign:"right", padding:"5px 10px"}}>8.75</td>
    </tr>
    <tr>
    <td style={{textAlign:"left", padding:"3px 10px"}}>CGST</td>
    <td style={{textAlign:"right", padding:"3px 10px"}}>8.75</td>
    </tr>
    </tbody></table>
    
    
    
    </td>
    </tr>
    
    
    
    <tr>
    <td style={{textAlign:"center", padding:"10px", color:"#000000", borderBottom:"1px dashed rgba(0, 0, 0, 0.5)"}}>
    <table width="100%">
    <tbody><tr>
    <td style={{textAlign:"left", padding:"5px 10px"}}><b>Total</b></td>
    <td style={{textAlign:"right",  padding:"5px 10px"}}><b>₹ 1097.58</b></td>
    </tr>
    <tr>
    <td style={{textAlign:"left",  padding:"5px 10px"}}><b>Grand Total</b></td>
    <td style={{textAlign:"right",  padding:"5px 10px"}}><b>₹ 1098</b></td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    
    
    
    <tr>
    <td style={{textAlign:"center", padding:"10px", color:"#000000"}}>
    - Thank you! -
    </td>
    </tr>
    
    <tr>
    <td style={{textAlign:"center", padding:"10px", color:"#000000"}}>
    GSTIN - 456AEW453462
    </td>
    </tr>
    
    
    
    </tbody></table>
    
    </div>
    
    
    
    
    
    
    
    
    
    
    
    
    </div>
    
    <div class="w-100-row kotsettle_btn">
    
    <span class="btn add_ord kot">
    <a href="#">
    Bill View</a></span>
    
    <span class="btn view_ord"><a href="#"  data-toggle="modal" data-target="#add_edit_position">Settle</a> </span>
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

export default Bill;
