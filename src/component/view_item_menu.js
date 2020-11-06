import React from "react";
import firebase from '../config';
import Sidebar from './sidebar';
import Header from './header';
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import {Form} from 'reactstrap';
import {Link} from "react-router-dom";
import "react-responsive-modal/styles.css";

class ViewItemMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            open1: false,
            created_on: new Date().toLocaleString(),
        item_id:'',
        item_name:'',
        item_description:'',
        item_halal:'',
        item_image:'',
        item_points:'',

        station_name:'',
        item_restaurant_id:'',
        item_type:'',
        // item_hash_tags:'',


        item_hash_tags:[],
        input: '',
        bestrecommendation:'UnSelect',

        item_price:'',
        item_tax:'',


        category:'',
        sub_category:'',


        employer_sevice_message: "",
        validError:false,
        mobile_message: '',
        name_message:'',
        avatar: "",
        isUploading: false,
        progress: 0,
        avatarURL: "",
        filenames: [],
       
        uploadProgress: 0,
        downloadURLs: [],
       


      

        advance:'',
        carbs:'',
        protien:'',
        fat:'',
        item_video:'',
        item_multiple_image:'',


        extra:'',
        healthytag:'',
        bestsellertag:'',
     
     
        recommendations: [
        {
            recommenditem: "",
           
           
        }
    ],


    portions_details: [
        {
            name: "",
           
            price: "",
           
        }
    ],


//     printer_details:[
// {
//     printer_name:'',
// }
//     ]

      
};

 
}
    
    componentDidMount() {
        this.setState({ loading: true });
        var sessionId = sessionStorage.getItem("RoleId");
        var businessId = sessionStorage.getItem("businessId");
        if(sessionId){
           
      console.log(sessionId);
        
            firebase
                .database().ref('merchant_users/' + sessionId).on('value', snapshot => {
             var Users = snapshot.val();
             console.log(Users);
             sessionStorage.setItem("username", Users.user_name);
             sessionStorage.setItem("email", Users.email_id);
           
            this.setState({
              userRole:Users.Role,loading: false
                
                
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
           
           
        this.itemMenuList();
     
        
      }


      itemMenuList=()=>{


        var sessionId = sessionStorage.getItem("RoleId");
        var businessId = sessionStorage.getItem("businessId");
        this.setState({loading: true});
        var ref = firebase
            .database()
            .ref("merchant_menu_items/").orderByChild("businessId").equalTo(businessId);
            

        ref.on('value', snapshot => {
            const data = [];
            snapshot.forEach(childSnapShot => {

                const GSTData = {
                    itemmenuid: childSnapShot
                        .key
                        .toString(),
                        item_unique_id:childSnapShot.val().item_unique_id,

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


            sessionId: childSnapShot.val().sessionId,
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
           
            recommendations:childSnapShot.val().recommendations,


            created_on:childSnapShot.val().created_on,


                };

                data.unshift(GSTData);
            });

            // let sortedKeys = data.filter((res) => {
            //     return res.businessId === businessId;
            //   });

            this.setState({itemMenuList: data, countPage: data.length, loading: false});
            console.log(this.state.itemMenuList);
    
        });


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
<div className="col-md-6">
<div className="company_name_box">
<div className="company_iocn"></div>
<div className="company_details">
<p className="name">{sessionStorage.getItem("BusinessName")} </p>
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

<div className="col-lg-7">

<div className="row mt-30">
<div className="col-md-12 p-0">
<Link to="/AddItemMenu">
<span className="btn add_categoty_menu">Items <span className="active"></span></span>
</Link>
<Link to="/AddCategoryMenuDuplicate">
<span className="btn add_categoty_menu">Category</span>
</Link>
<span className="btn add_categoty_menu">Coupon</span>
</div>
</div>

<div className="row mt-30">
<div className="col-md-12 p-0">
<div className="orders_menu">
<ul>
<li><a href="/AddItemMenu">Add Items</a></li>
<li><a href="/ViewItemMenu"  className="activemenu">View Items</a></li>
</ul>
</div>
</div>
</div>




<div className="col-md-12 mt-30 p-0">
<div className="category_menu_search">
<span className="cate_menu">
<a href="view_table.html" className="current">Menu</a> / 
<a href="view_table_1.html">Pizza</a> / 
<a href="view_table_2.html">Chicken Pizza</a>
</span>
<span className="cate_search">
<input type="text" placeholder="Search"/>
<a href="#" className="search_icon"><i className="fas fa-search"></i></a>
</span>
</div>
</div>


<div className="m-t-20 row">
<div className="col-md-12 product_box  mb-0">
<div className="product_box_item p-30">
<div className="product_item_row sub_cate_product">
<div className="left">
<div className="img_box">
<span className="star_yellow"><img src="images/icon/star_rate_ye.svg"/></span>
<img src="images/category_img.png"/>
</div>
</div>
<div className="right">
<p><span className="item_recipe"><span className="dot veg"></span></span>
<span className="btn best_seller">BESTSELLER</span> <span className="btn pull-right outer_edit_btn fill">Edit</span></p>
<p className="item_name pl-0">Caesar Salad</p>
<p className="price  pl-0">₹ 220.00</p>
<p className="small_font-1 mb-0">Item-sub category 1, Item-sub category 2</p>
</div>
</div>
</div>
</div>
</div>


<div className="m-t-20 row">
<div className="col-md-12 product_box mb-0">
<div className="product_box_item p-30">
<div className="product_item_row sub_cate_product">
<div className="left">
<div className="img_box">
<span className="star_yellow"><img src="images/icon/star_rate_ye.svg"/></span>
<img src="images/category_img.png"/>
</div>
</div>
<div className="right">
<p><span className="item_recipe"><span className="dot veg"></span></span>
<span className="btn best_seller">BESTSELLER</span> <span className="btn pull-right outer_edit_btn fill">Edit</span></p>
<p className="item_name pl-0">Caesar Salad</p>
<p className="price  pl-0">₹ 220.00</p>
<p className="small_font-1 mb-0">Item-sub category 1, Item-sub category 2</p>
</div>
</div>
</div>
</div>
</div>




<div className="m-t-20 row">
<div className="col-md-12 product_box  mb-0">
<div className="product_box_item p-30">
<div className="product_item_row sub_cate_product">
<div className="left">
<div className="img_box">
<span className="star_yellow"><img src="images/icon/star_rate_ye.svg"/></span>
<img src="images/category_img.png"/>
</div>
</div>
<div className="right">
<p><span className="item_recipe"><span className="dot veg"></span></span>
<span className="btn best_seller">BESTSELLER</span> <span className="btn pull-right outer_edit_btn fill">Edit</span></p>
<p className="item_name pl-0">Caesar Salad</p>
<p className="price  pl-0">₹ 220.00</p>
<p className="small_font-1 mb-0">Item-sub category 1, Item-sub category 2</p>
</div>
</div>
</div>
</div>
</div>




<div className="m-t-20 row  mb-0">
<div className="col-md-12 product_box mb-0">
<div className="product_box_item p-30">
<div className="product_item_row sub_cate_product">
<div className="left">
<div className="img_box">
<span className="star_yellow"><img src="images/icon/star_rate_ye.svg"/></span>
<img src="images/category_img.png"/>
</div>
</div>
<div className="right">
<p><span className="item_recipe"><span className="dot veg"></span></span>
<span className="btn best_seller">BESTSELLER</span> <span className="btn pull-right outer_edit_btn fill">Edit</span></p>
<p className="item_name pl-0">Caesar Salad</p>
<p className="price  pl-0">₹ 220.00</p>
<p className="small_font-1 mb-0">Item-sub category 1, Item-sub category 2</p>
</div>
</div>
</div>
</div>
</div>



</div>

<div className="col-lg-5">

<div className="recent_itemas_box">

<h1>Recent Items</h1>
{this.state.itemMenuList && this.state.itemMenuList.map((item,index) => {
return (
<div className="m-t-20 row  mb-0"  key={index}>
<div className="col-md-12 product_box mb-0">
<div className="product_box_item">
<div className="product_item_row sub_cate_product">
<div className="left">
<div className="img_box">
{item.advance=="Yes"?

<span className="star_yellow"><img src="images/icon/star_rate_ye.svg"/></span>
:
''
}
<img src={item.item_image}/>
</div>
</div>
<div className="right">
<p><span className="item_recipe"><span className="dot veg"></span></span>
<span className="btn best_seller">BESTSELLER</span> <span className="btn pull-right outer_edit_btn fill">Edit</span></p>
<p className="item_name pl-0">{item.item_name}</p>
<p className="price  pl-0">₹ {item.item_price}.00</p>
<p className="small_font-1 mb-0">Item-sub category 1, Item-sub category 2</p>
</div>
</div>
</div>
</div>
</div>
)})}

{/* <div className="m-t-20 row  mb-0">
<div className="col-md-12 product_box mb-0">
<div className="product_box_item">
<div className="product_item_row sub_cate_product">
<div className="left">
<div className="img_box">
<span className="star_yellow"><img src="images/icon/star_rate_ye.svg"/></span>
<img src="images/category_img.png"/>
</div>
</div>
<div className="right">
<p><span className="item_recipe"><span className="dot veg"></span></span>
<span className="btn best_seller">BESTSELLER</span> <span className="btn pull-right outer_edit_btn fill">Edit</span></p>
<p className="item_name pl-0">Caesar Salad</p>
<p className="price  pl-0">₹ 220.00</p>
<p className="small_font-1 mb-0">Item-sub category 1, Item-sub category 2</p>
</div>
</div>
</div>
</div>
</div>


<div className="m-t-20 row  mb-0">
<div className="col-md-12 product_box mb-0">
<div className="product_box_item">
<div className="product_item_row sub_cate_product">
<div className="left">
<div className="img_box">
<span className="star_yellow"><img src="images/icon/star_rate_ye.svg"/></span>
<img src="images/category_img.png"/>
</div>
</div>
<div className="right">
<p><span className="item_recipe"><span className="dot veg"></span></span>
<span className="btn best_seller">BESTSELLER</span> <span className="btn pull-right outer_edit_btn fill">Edit</span></p>
<p className="item_name pl-0">Caesar Salad</p>
<p className="price  pl-0">₹ 220.00</p>
<p className="small_font-1 mb-0">Item-sub category 1, Item-sub category 2</p>
</div>
</div>
</div>
</div>
</div>


<div className="m-t-20 row  mb-0">
<div className="col-md-12 product_box mb-0">
<div className="product_box_item">
<div className="product_item_row sub_cate_product">
<div className="left">
<div className="img_box">
<span className="star_yellow"><img src="images/icon/star_rate_ye.svg"/></span>
<img src="images/category_img.png"/>
</div>
</div>
<div className="right">
<p><span className="item_recipe"><span className="dot veg"></span></span>
<span className="btn best_seller">BESTSELLER</span> <span className="btn pull-right outer_edit_btn fill">Edit</span></p>
<p className="item_name pl-0">Caesar Salad</p>
<p className="price  pl-0">₹ 220.00</p>
<p className="small_font-1 mb-0">Item-sub category 1, Item-sub category 2</p>
</div>
</div>
</div>
</div>
</div> */}


</div>



</div>




</div>










</div>
</div>
</div>


</div>   
</div>



    </>


        );
    }
}

export default ViewItemMenu;
