import React from "react";
import firebase from '../config';
import Sidebar from '../component/sidebar';
import Header from '../component/header';
import {Link} from "react-router-dom";
class CategorySettings extends React.Component {
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
    <div class="col-md-12 p-0">
    <div class="category_upload_image w-100-row">
    
    
    <h1 class="pull-left w-100-row">
    Your Menu
    </h1>
    
    
    
    
    
    
    
    <div class="w-100-row col-md-12 m-t-20">
    
    
    
    <div class="row">
    <div class="col-md-9">
    
    <div class="col-md-12 w-100-row p-0">
    
    <h3 class="main_course_head">Main Course <i class="fa fa-caret-down" aria-hidden="true"></i></h3>
    
    <div class="pull-right">
    <span class="settings_round"><img src="/images/icon/settings_normal.svg"/> Settings</span>
    
    <span class="button_box">
    <div class="dropdown">
      <button class="btn active dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
       Active
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#">Action</a>
        <a class="dropdown-item" href="#">Another action</a>
        <a class="dropdown-item" href="#">Something else here</a>
      </div>
    </div>
    </span>
    
    
    </div>
    
    </div>
    
    <div class="col-md-12 p-0 w-100-row m-t-20">
    
    <div class="store_settings_row">
    <div class="box"><img src="/images/category_img.png"/></div>
    <div class="box product_head">Veg seaser Salad</div>
    <div class="box"><span class="veg"><i class="fa fa-circle" aria-hidden="true"></i> Veg</span></div>
    <div class="box price">Rs.180</div>
    <div class="box discount">0%<span>Discount</span></div>
    <div class="box"><span class="activetime">12:00pm - 8:00pm</span></div>
    
    <div class="box">
    <div class="dropdown">
      <button class="btn activebutton dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
       Active
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#">Inactive</a>
       </div>
    </div>
    
    </div>
    
    </div>
    
    
    <div class="store_settings_row">
    <div class="box"><img src="/images/category_img.png"/></div>
    <div class="box product_head">Veg seaser Salad</div>
    <div class="box"><span class="veg"><i class="fa fa-circle" aria-hidden="true"></i> Veg</span></div>
    <div class="box price">Rs.180</div>
    <div class="box discount">0%<span>Discount</span></div>
    <div class="box"><span class="activetime">12:00pm - 8:00pm</span></div>
    
    <div class="box">
    <div class="dropdown">
      <button class="btn activebutton dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
       Active
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#">Inactive</a>
       </div>
    </div>
    
    </div>
    
    </div>
    
    
    
    <div class="store_settings_row">
    <div class="box"><img src="/images/category_img.png"/></div>
    <div class="box product_head">Veg seaser Salad</div>
    <div class="box"><span class="veg"><i class="fa fa-circle" aria-hidden="true"></i> Veg</span></div>
    <div class="box price">Rs.180</div>
    <div class="box discount">0%<span>Discount</span></div>
    <div class="box"><span class="activetime">12:00pm - 8:00pm</span></div>
    
    <div class="box">
    <div class="dropdown">
      <button class="btn activebutton dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
       Active
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#">Inactive</a>
       </div>
    </div>
    
    </div>
    
    </div>
    
    
    
    </div>
    
    <div class="col-md-12 p-0 w-100-row m-t-20">
    
    <div class="w-100-row">
    
    <div class="iteams_in_row">
    <div class="box"><img src="/images/category_img.png"/></div>
    <div class="box product_head">Pasta (14)</div>
    
    <div class="box">
    <div class="dropdown">
      <button class="btn activebutton-green dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
       Active
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#">Inactive</a>
       </div>
    </div>
    
    </div>
    
    <div class="box">
    <span class="settings_round"><img src="/images/icon/settings_normal.svg"/> Settings</span>
    </div>
    
    
    </div>
    
    </div>
    
    
    <div class="w-100-row">
    
    <div class="iteams_in_row">
    <div class="box"><img src="/images/category_img.png"/></div>
    <div class="box product_head">Pasta (14)</div>
    
    <div class="box">
    <div class="dropdown">
      <button class="btn activebutton-green dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
       Active
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#">Inactive</a>
       </div>
    </div>
    
    </div>
    
    <div class="box">
    <span class="settings_round"><img src="/images/icon/settings_normal.svg"/> Settings</span>
    </div>
    
    
    </div>
    
    </div>
    
    <div class="w-100-row">
    
    <div class="iteams_in_row">
    <div class="box"><img src="/images/category_img.png"/></div>
    <div class="box product_head">Pasta (14)</div>
    
    <div class="box">
    <div class="dropdown">
      <button class="btn activebutton-green dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
       Active
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#">Inactive</a>
       </div>
    </div>
    
    </div>
    
    <div class="box">
    <span class="settings_round"><img src="/images/icon/settings_normal.svg"/> Settings</span>
    </div>
    
    
    </div>
    
    
    
    
    
    </div>
    </div>
    
    
    <div class="col-md-12 w-100-row p-0 m-t-20">
    
    <h3 class="main_course_head">Pizza <i class="fa fa-caret-down" aria-hidden="true"></i></h3>
    
    <div class="pull-right">
    <span class="settings_round"><img src="/images/icon/settings_normal.svg"/> Settings</span>
    
    <span class="button_box">
    <div class="dropdown">
      <button class="btn closed dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      close
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#">Active</a>
    
      </div>
    </div>
    </span>
    
    
    </div>
    
    </div>
    
    <div class="col-md-12 p-0 w-100-row m-t-20">
    
    <div class="store_settings_row">
    <div class="box"><img src="/images/category_img.png"/></div>
    <div class="box product_head">Veg seaser Salad</div>
    <div class="box"><span class="veg"><i class="fa fa-circle" aria-hidden="true"></i> Veg</span></div>
    <div class="box price">Rs.180</div>
    <div class="box discount">0%<span>Discount</span></div>
    <div class="box"><span class="activetime">12:00pm - 8:00pm</span></div>
    
    <div class="box">
    <div class="dropdown">
      <button class="btn activebutton dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
       Active
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#">Inactive</a>
       </div>
    </div>
    
    </div>
    
    </div>
    
    
    <div class="store_settings_row">
    <div class="box"><img src="/images/category_img.png"/></div>
    <div class="box product_head">Veg seaser Salad</div>
    <div class="box"><span class="nonveg"><i class="fa fa-circle" aria-hidden="true"></i> Nonveg</span></div>
    <div class="box price">Rs.180</div>
    <div class="box discount">0%<span>Discount</span></div>
    <div class="box"><span class="activetime">12:00pm - 8:00pm</span></div>
    
    <div class="box">
    <div class="dropdown">
      <button class="btn activebutton dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
       Active
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#">Inactive</a>
       </div>
    </div>
    
    </div>
    
    </div>
    
    
    
    <div class="store_settings_row">
    <div class="box"><img src="/images/category_img.png"/></div>
    <div class="box product_head">Veg seaser Salad</div>
    <div class="box"><span class="veg"><i class="fa fa-circle" aria-hidden="true"></i> Veg</span></div>
    <div class="box price">Rs.180</div>
    <div class="box discount">0%<span>Discount</span></div>
    <div class="box"><span class="activetime">12:00pm - 8:00pm</span></div>
    
    <div class="box">
    <div class="dropdown">
      <button class="btn activebutton dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
       Active
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#">Inactive</a>
       </div>
    </div>
    
    </div>
    
    </div>
    
    
    
    </div>
    
    
    
    </div>
    
    
    <div class="col-md-3">
    <div class="categories_box">
    <p>Categories</p>
    <ul>
    <li><a href="#">1. Main Course <i class="fa fa-caret-down" aria-hidden="true"></i></a></li>
    <li><a href="#">2. Desserts</a></li>
    <li><a href="#">3. Fast Food <i class="fa fa-caret-down" aria-hidden="true"></i></a></li>
    <div class="sub_menu">
    <li><a href="#">3.1 Pizza</a></li>
    <li><a href="#">3.1 Pasta</a></li>
    <li><a href="#">3.1 Buns</a></li>
    </div>
    <li><a href="#">4. Lorem Ispum</a></li>
    <li><a href="#">5. Lorem Ispum</a></li>
    <li><a href="#">6. Lorem Ispum</a></li>
    </ul>
    
    
    </div>
    
    
    </div>
    
    
    </div>
    
    <hr>
    
    </hr>
    
    
    
    
    
    
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

export default CategorySettings;
