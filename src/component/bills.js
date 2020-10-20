import React from "react";
import firebase from '../config';
import Sidebar from './sidebar';
import Header from './header';
class Bills extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

         
        };
    }
  

    render() {
        return (
            <div className="page-wrapper">
   

      <Sidebar/>

        {/* <!-- PAGE CONTAINER--> */}
        <div className="page-container">

            <Header/>
   
            {/* <header className="header-desktop">
			
			<div className="logo_hipal">
                <a href="#">
                    <img src="/images/icon/logo.svg" alt="Hipal Admin" />
                </a>
            </div>
			
			
			Welcome Back Varun
            </header> */}
            {/* <!-- HEADER DESKTOP--> */}

            {/* <!-- MAIN CONTENT--> */}
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
<div className="col-md-12 p-0">
<div className="category_upload_image">
<h1>Bill View</h1>
<div className="upload_img_block add_menu">

<div className="row">

<div className="col-md-12 p-0 bills_table">

<div className="table-responsive table-data">
<table className="table">
<thead>

<tr>
<td>S.no</td>
<td>BILL ID</td>
<td>Date</td> 
<td>Settled By</td> 
<td>Amount</td> 
<td>Order Id</td> 
<td>Timing</td> 
<td>Photo</td> 
<td>Actions</td>
</tr>

</thead>
<tbody>


<tr>
<td>1</td>
<td>Coffee1906001</td>
<td className="bill_date">12/06/202</td>
<td>@Varun</td>
<td>Rs 224</td>
<td>1111233</td>
<td>13:34</td>
<td><img src="/images/bill_image.png" className="bill_img"/></td>
<td><img src="/images/icon/edit_icon_blue.svg" className="edit_delete"/>
 <img src="/images/icon/delete_cross.svg" className="edit_delete"/></td>
</tr>

<tr>
<td>2</td>
<td>Coffee1906001</td>
<td className="bill_date">12/06/202</td>
<td>@Varun</td>
<td>Rs 224</td>
<td>1111233</td>
<td>13:34</td>
<td><img src="/images/bill_image.png" className="bill_img"/></td>
<td><img src="/images/icon/edit_icon_blue.svg" className="edit_delete"/> 
<img src="/images/icon/delete_cross.svg" className="edit_delete"/></td>
</tr>

<tr>
<td>3</td>
<td>Coffee1906001</td>
<td className="bill_date">12/06/202</td>
<td>@Varun</td>
<td>Rs 224</td>
<td>1111233</td>
<td>13:34</td>
<td><img src="/images/bill_image.png" className="bill_img"/></td>
<td><img src="/images/icon/edit_icon_blue.svg" className="edit_delete"/>
     <img src="/images/icon/delete_cross.svg" className="edit_delete"/></td>
</tr>


<tr>
<td>4</td>
<td>Coffee1906001</td>
<td className="bill_date">12/06/202</td>
<td>@Varun</td>
<td>Rs 224</td>
<td>1111233</td>
<td>13:34</td>
<td><img src="/images/bill_image.png" className="bill_img"/></td>
<td><img src="/images/icon/edit_icon_blue.svg" className="edit_delete"/> 
<img src="/images/icon/delete_cross.svg" className="edit_delete"/></td>
</tr>

<tr>
<td>5</td>
<td>Coffee1906001</td>
<td className="bill_date">12/06/202</td>
<td>@Varun</td>
<td>Rs 224</td>
<td>1111233</td>
<td>13:34</td>
<td><img src="/images/bill_image.png" className="bill_img"/></td>
<td><img src="/images/icon/edit_icon_blue.svg" className="edit_delete"/> 
<img src="/images/icon/delete_cross.svg" className="edit_delete"/></td>
</tr>













</tbody>
</table>
</div>


</div>			



</div>



</div>


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

export default Bills;
