import React from "react";
import firebase from '../config';
import Sidebar from './sidebar';
import Header from './header';
class Home extends React.Component {
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
                {/* <button className="btn btn-secondary mb-1" data-toggle="modal" data-target="#filters">
Filters
</button><br/>

<button type="button" className="btn btn-secondary mb-1" data-toggle="modal" data-target="#upload_carousel">
Upload carousel
</button><br/>

<button type="button" className="btn btn-secondary mb-1" data-toggle="modal" data-target="#view_table">
View Table
</button><br/>
<button type="button" className="btn btn-secondary mb-1" data-toggle="modal" data-target="#settlement">
Settlement
</button><br/>


<button type="button" className="btn btn-secondary mb-1" data-toggle="modal" data-target="#apply_coupon">
Apply Coupon
</button> */}

    
    </div>
    </div>
                   
    </div>
     </div>

    

<div className="modal fade" id="filters" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true">
<div className="modal-dialog modal-sm hipal_pop" role="document">
<div className="modal-content">


<div className="modal-header">
<h5 className="modal-title" id="smallmodalLabel">Filters
</h5>

<span><button className="color_red">Reset filters</button></span>

</div>


<div className="modal-body product_edit">


<div className="col-12 w-100-row p-30_filter">Search by </div>

<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Bill ID</label>
</div>
<div className="col-12 col-md-6">
<input type="text" id="text-input" name="text-input" placeholder="" className="form-control edit_product"/>
</div>
</div>
</div>

<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Order ID</label>
</div>
<div className="col-12 col-md-6">
<input type="text" id="text-input" name="text-input" placeholder="" className="form-control edit_product"/>
</div>
</div>
</div>

<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Cart ID</label>
</div>
<div className="col-12 col-md-6">

<input type="text" id="text-input" name="text-input" placeholder="" className="form-control edit_product"/>

</div>
</div>
</div>

<div className="col-12 w-100-row"><hr></hr></div>

<div className="col-12 w-100-row p-30_filter">Advanced filter</div>


<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Date</label>
</div>

<div className="col-12 col-md-6">
<input type="text" id="text-input" name="text-input" placeholder="DD/MM/YYYY" className="form-control edit_product"/>
</div>

</div>
</div>


<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Time</label>
</div>
<div className="col-12 col-md-7">

<div className="row">

<div className="col-md-6">
<label className=" form-control-label pull-left">From</label>
<span className=" pull-left small_filed"><input type="text" id="text-input" name="text-input" placeholder="10 AM" className="form-control edit_product"/></span>
</div>


<div className="col-md-6">
<label className=" form-control-label  pull-left">To</label>
<span className="small_filed  pull-left"><input type="text" id="text-input" name="text-input" placeholder="12 AM" className="form-control edit_product"/></span>
</div>



</div></div>
</div>
</div>



<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Day</label>
</div>
<div className="col-12 col-md-6">
<select name="select" id="select" className="form-control edit_product">
<option value="0">Drop Down</option>

</select>
</div>
</div>
</div>





<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Amount</label>
</div>
<div className="col-12 col-md-6">
<input type="text" id="text-input" name="text-input" placeholder="" className="form-control edit_product"/>
</div>
</div>
</div>



<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Customer name</label>
</div>
<div className="col-12 col-md-6">
<input type="text" id="text-input" name="text-input" placeholder="" className="form-control edit_product"/>
</div>
</div>
</div>







</div>



<div className="modal-footer">
<button type="button" className="btn save_btn">Save</button>
</div>


</div>
</div>
</div>






<div className="modal fade" id="upload_carousel" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true">
<div className="modal-dialog modal-sm hipal_pop" role="document">
<div className="modal-content">


<div className="modal-header">
<h5 className="modal-title" id="smallmodalLabel">Upload carousel
</h5></div>


<div className="modal-body upload_carosel">





<div className="col-12 w-100-row line_bdr_bottom">
<div className="row">
<div className="col col-md-5 font-18">
<div className="upload_img upload_small p-0">
 <div className="form-group">
<div className="img_show product_img_small"><img id="img-upload"/></div>
</div>
</div>
</div>
<div className="col col-md-6 bill_id_settle">
<div className="form-group">

<span className="pull-left m-b-20">
<div className="input-group">
<span className="input-group-btn">
<span className="btn btn_explore btn-default btn-file">
Upload <input type="file" id="imgInp"/>
</span>
</span>
<input className="no-display" type="text" className="form-control" readonly=""/>
</div>
</span>


<span className="pull-left m-b-20"><input type="text" id="text-input" name="text-input" placeholder="Link" className="form-control edit_product"/></span>


<span className="pull-left m-b-20">
<button className="btn add_btn_pop_orange addmode_pad">Submit</button>
</span>

</div>
</div>
</div>
</div>



<div className="col-12 w-100-row line_bdr_bottom">
<div className="row">
<div className="col col-md-5 font-18">
<div className="upload_img upload_small p-0">
 <div className="form-group">
<div className="img_show product_img_small"><img id="img-upload"/></div>
</div>
</div>
</div>
<div className="col col-md-6 bill_id_settle">
<div className="form-group">

<span className="pull-left m-b-20">
<div className="input-group">
<span className="input-group-btn">
<span className="btn btn_explore btn-default btn-file">
Upload <input type="file" id="imgInp"/>
</span>
</span>
<input className="no-display" type="text" className="form-control" readonly=""/>
</div>
</span>


<span className="pull-left m-b-20"><input type="text" id="text-input" name="text-input" placeholder="Link" className="form-control edit_product"/></span>


<span className="pull-left m-b-20">
<button className="btn add_btn_pop_orange addmode_pad">Submit</button>
</span>

</div>
</div>
</div>
</div>



<div className="col-12 w-100-row line_bdr_bottom">
<div className="row">
<div className="col col-md-5 font-18">
<div className="upload_img upload_small p-0">
 <div className="form-group">
<div className="img_show product_img_small"><img id="img-upload"/></div>
</div>
</div>
</div>
<div className="col col-md-6 bill_id_settle">
<div className="form-group">

<span className="pull-left m-b-20">
<div className="input-group">
<span className="input-group-btn">
<span className="btn btn_explore btn-default btn-file">
Upload <input type="file" id="imgInp"/>
</span>
</span>
<input className="no-display" type="text" className="form-control" readonly=""/>
</div>
</span>


<span className="pull-left m-b-20"><input type="text" id="text-input" name="text-input" placeholder="Link" className="form-control edit_product"/></span>


<span className="pull-left m-b-20">
<button className="btn add_btn_pop_orange addmode_pad">Submit</button>
</span>

</div>
</div>
</div>
</div>







</div>



<div className="modal-footer">
<button type="button" className="btn save_btn">Add Items</button>
</div>


</div>
</div>
</div>



<div className="modal fade" id="view_table" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true">
<div className="modal-dialog modal-sm hipal_pop" role="document">
<div className="modal-content">


<div className="modal-header">
<h5 className="modal-title" id="smallmodalLabel">View Table 
</h5></div>


<div className="modal-body product_edit">


<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Table Name</label>
</div>
<div className="col-12 col-md-6">
Tabel 07
</div>
</div>
</div>


<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Capacity</label>
</div>
<div className="col-12 col-md-6">
05
</div>
</div>
</div>

<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Icon</label>
</div>
<div className="col-12 col-md-6">
<img src="images/icon/table_2_orange.svg" className="h-50_pixel"/>
</div>
</div>
</div>
<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Floor</label>
</div>
<div className="col-12 col-md-6">
2nd Floor
</div>
</div>
</div>

<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Notes</label>
</div>
<div className="col-12 col-md-6">
Table on first floor with window view
</div>
</div>
</div>

<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">QR</label>
</div>
<div className="col-12 col-md-8">

<span className="pop_qr">
<img src="images/icon/QR_1.svg"/>
</span>

<span className="pull-left m-t-30 ml-30">
<p><button className="btn add_btn_pop_orange addmode_pad qr_btn">Print</button></p>
<p><button className="btn add_btn_pop_orange addmode_pad qr_btn m-t-20">Download</button></p>

</span>



</div>
</div>
</div>





</div>


<div className="modal-footer">
<button type="button" className="btn close_btn" data-dismiss="modal">Close</button>
<button type="button" className="btn save_btn">Create</button>
</div>

</div>
</div>
</div>



<div className="modal fade" id="settlement" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true">
<div className="modal-dialog modal-sm hipal_pop settle" role="document">
<div className="modal-content">


<div className="modal-header">
<h5 className="modal-title" id="smallmodalLabel">Settlement
</h5>
<div className="pull-right w-300 set_person">
<div className="row form-group">
<div className="col col-md-5">
<label className=" form-control-label">Settle by</label>
</div>
<div className="col-12 col-md-7">
<select name="select" id="select" className="form-control settle">
<option value="0">Varun</option>
<option value="1">Raju</option>
<option value="2">Krishna</option>
<option value="3">Rani</option>
</select>
</div>
</div>
</div>
</div>


<div className="modal-body product_edit">





<div className="col-12 w-100-row">
<div className="row">
<div className="col col-md-5 bill_price">
Rs 499.00
</div>
<div className="col col-md-7 bill_id_settle">
Bill ID : 150315395123 <span className="btn pull-right add_btn_pop_orange addmode_pad">Add mode</span>
</div>
</div>
</div>

<div className="col-12 w-100-row">
<div className="row">
<div className="col-md-6">

<div className="pay_box_block">

<div className="box_payment">
<p className="price">Rs 120</p>
<p className="img"><img src="images/icon/cash_icon.png"/></p>
<p className="price_head">Cash</p>
</div>


<div className="box_payment">
<p className="price">Rs 120</p>
<p className="img"><img src="images/icon/card_icon.png"/></p>
<p className="price_head">Card</p>
</div>





<div className="box_payment">
<p className="price">Rs 120</p>
<p className="img"><img src="images/icon/hipla_credits.png"/></p>
<p className="price_head">Hipal
Credits</p>
</div>



<div className="box_payment">
<p className="price">Rs 120</p>
<p className="img"><img src="images/icon/employee_icon_pay.png"/></p>
<p className="price_head">Employee</p>
</div>



<div className="box_payment">
<p className="price">Rs 120</p>
<p className="img"><img src="images/icon/cheqe_cion.png"/></p>
<p className="price_head">Cheque</p>
</div>



<div className="box_payment selected">
<span className="active">
<span className="dotsmall"></span>
</span>
<p className="price">Rs 120</p>
<p className="img"><img src="images/icon/upi_W.png"/></p>
<p className="price_head">UPI</p>
</div>



<div className="box_payment">




<p className="price">Rs 120</p>
<p className="img"><img src="images/icon/pending_icon.png"/></p>
<p className="price_head">Pending</p>
</div>



<div className="box_payment">
<p className="price"></p>
<p className="img"><img src="images/icon/tip_icon.png"/></p>
<p className="price_head">Tip</p>
</div>



</div>


</div>
<div className="col-md-6">
<div className="h-100 pay_mode_bg">

<p>Choose the mode of payment</p>


<div className="row form-group user_roles_check">
<label className="container_check"><img src="images/icon/paytm.png"/>
  <input type="checkbox"/>
  <span className="checkmark"></span>
</label>
</div>

<div className="row form-group user_roles_check">
<label className="container_check"><img src="images/icon/g-pay.png"/>
  <input type="checkbox"/>
  <span className="checkmark"></span>
</label>
</div>

<div className="row form-group user_roles_check">
<label className="container_check"><img src="images/icon/pnonepay.png"/>
  <input type="checkbox"/>
  <span className="checkmark"></span>
</label>
</div>

<div className="row form-group user_roles_check">
<label className="container_check"> <img src="images/icon/bhim.png"/>
  <input type="checkbox"/>
  <span className="checkmark"></span>
</label>
</div>

<div className="row form-group user_roles_check">
<label className="container_check"> <img src="images/icon/amezonpay.png"/>
  <input type="checkbox"/>
  <span className="checkmark"></span>
</label>
</div>

<div className="row form-group user_roles_check">
<label className="container_check"> <img src="images/icon/freecharge.png"/>
  <input type="checkbox"/>
  <span className="checkmark"></span>
</label>
</div>

<div className="row form-group user_roles_check">
<label className="container_check">Others
  <input type="checkbox"/>
  <span className="checkmark"></span>
</label>
</div>


</div>

</div>
</div>
</div>


<div className="col-12 w-100-row bill_price">
Balance (120) 
</div>

</div>



<div className="modal-footer">
<button type="button" className="btn close_btn" data-dismiss="modal">Cancel</button>
<button type="button" className="btn save_btn">Save</button>
</div>


</div>
</div>
</div>

<div className="modal fade" id="apply_coupon" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true">
<div className="modal-dialog modal-sm hipal_pop" role="document">
<div className="modal-content">


<div className="modal-header">
<h5 className="modal-title" id="smallmodalLabel">Apply Coupon 
</h5>
</div>


<div className="modal-body product_edit">

<div className="discount_price"><span>Rs 2750.82</span> Rs 2750.82</div>


<div className="col-12 w-100-row m-t-20">
<h4>Reedem Users Credits </h4>
</div>

<div className="col-12 w-100-row">
<div className="col-md-12">
<div className="w-40">
<div className="form-group">
<select name="select" id="select" className="form-control edit_product">
<option value="0">9703371164</option>
</select>
</div></div>
<div className="w-40 coupon_user">
<span>Rishabh Hurshan<br></br>has <span className="number">11203</span> points</span>
<span className="offer_coupon">12%OFF</span>
</div>
<div className="w-20">
<span className="btn add_btn_pop_orange">Apply</span>
</div>
</div></div>

<div className="col-12 w-100-row specil_didc_row">
<div className="col-md-12">
<span className="special_discount pull-left m-r-25">Special Discount </span>
<span className="pull-left  m-r-25">
<div className="form-group">
<select name="select" id="select" className="form-control edit_product">
<option value="0">10%</option>
</select>
</div>
</span>
<span className="offfer_applied_pop pull-left line_40">Discount Applied</span>

</div></div>



<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Username</label>
</div>
<div className="col-12 col-md-6">
<input type="text" id="text-input" name="text-input" placeholder="" className="form-control edit_product"/>
</div>
</div>
</div>


<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Password</label>
</div>
<div className="col-12 col-md-6">
<input type="password" id="text-input" name="text-input" placeholder="******" className="form-control edit_product"/>

<p className="error">Username / Password is incorrect</p>



</div>
</div>
</div>


<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Reason</label>
</div>
<div className="col-12 col-md-6">
<textarea name="textarea-input" id="textarea-input" rows="3" placeholder="" className="form-control edit_product"></textarea>
<p><span className="btn con-btn-pop">Confirm</span></p>
</div>
</div>
</div>


<div className="col-12 w-100-row specil_didc_row">

<div className="col-md-12 w-100-row">
<div className="w-45">
<span className="offer_code">NEW-USER10%</span>
<p className="applicable">Applicable</p>
</div>
<div className="w-30 coupon_off_details">
10% OFF to All New Customers 
</div>
<div className="w-25">
<span className="btn add_btn_pop_orange pull-right">Apply</span>
</div>
</div>

<div className="col-md-12 w-100-row">
<div className="w-45">
<span className="offer_code">NEW-USER10%</span>
<p className="applicable">Applicable</p>
</div>
<div className="w-30 coupon_off_details">
10% OFF to All New Customers 
</div>
<div className="w-25">
<span className="btn add_btn_pop_orange pull-right">Apply</span>
</div>
</div>

</div>




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

export default Home;
