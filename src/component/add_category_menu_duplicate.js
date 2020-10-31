import React from "react";
import firebase from '../config';
import Sidebar from './sidebar';
import Header from './header';
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import {Form} from 'reactstrap';
import {Link} from "react-router-dom";
class AddCategoryMenuDuplicate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item_category:'',
            item_sub_category:'',
            item_categoty_list:'', 
            display_category:false,
            employer_sevice_message: "",
            validError:false,
            mobile_message: '',
            avatar: "",
            isUploading: false,
            progress: 0,
            avatarURL: "",
            filenames: [],
           uploadProgress: 0,
           color: '#1569a8',
           active: false,
           status:'select',
         
        };


// this.explore=this.explore.bind(this);
        this.onChange = this
        .onChange
        .bind(this);
    this.validator = new SimpleReactValidator({
        className: "text-danger",
        validators: {
            passwordvalid: {
                message: "The :attribute must be at least 6 and at most 30 with 1 numeric,1 special charac" +
                        "ter and 1 alphabet.",
                rule: function (val, params, validator) {
                    // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
                    // params.indexOf(val) === -1
                    return (validator.helpers.testRegex(val, /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{6,30}$/i) && params.indexOf(val) === -1);
                }
            },
            passwordMismatch: {
                message: "confirm password must match with password field.",
                rule: function (val, params, validator) {
                    return document
                        .getElementById("password_input")
                        .value === val
                        ? true
                        : false;
                }
            },
            whitespace: {
                message: "The :attribute not allowed first whitespace   characters.",
                rule: function (val, params, validator) {
                    // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
                    // params.indexOf(val) === -1
                    return (validator.helpers.testRegex(val, /[^\s\\]/) && params.indexOf(val) === -1);
                }
            },
            specialChar: {
                message: "The :attribute not allowed special   characters.",
                rule: function (val, params, validator) {
                    // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
                    // params.indexOf(val) === -1
                    return (validator.helpers.testRegex(val, /^[ A-Za-z0-9_@./#&+-]*$/i) && params.indexOf(val) === -1);
                }
            },
            specialCharText: {
                message: "The :attribute may only contain letters, dot and spaces.",
                rule: function (val, params, validator) {
                    // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
                    // params.indexOf(val) === -1
                    return (validator.helpers.testRegex(val, /^[ A-Za-z_@./#&+-]*$/i) && params.indexOf(val) === -1);
                }
            },

            zip: {
                message: "Invalid Pin Code",
                rule: function (val, params, validator) {
                    // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
                    // params.indexOf(val) === -1
                    return (validator.helpers.testRegex(val, /^(\d{5}(\d{4})?)?$/i) && params.indexOf(val) === -1);
                }
            },
            website: {
                message: "The Url should be example.com ",
                rule: function (val, params, validator) {
                    // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
                    // params.indexOf(val) === -1
                    return (validator.helpers.testRegex(val, /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g) && params.indexOf(val) === -1);
                }
            },
            Fax: {
                message: "Invalid fax number ",
                rule: function (val, params, validator) {
                    return (validator.helpers.testRegex(val, /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i) && params.indexOf(val) === -1);
                }
            }
        }
    });
}
    



    componentDidMount() {
        this.setState({ loading: true });
        var sessionId = sessionStorage.getItem("RoleId");
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
        }

        this.itemCategoryList();
        this.itemMenuList();
           
       }

       itemCategoryList() {
        this.setState({loading: true});
        var ref = firebase
            .database()
            .ref("duplicate/");
            // .orderByChild('parent_category_select').equalTo('No');

        ref.on('value', snapshot => {
            const data = [];
            snapshot.forEach(childSnapShot => {

                const GSTData = {
                    categoryId: childSnapShot
                        .key
                        .toString(),
                       
                      
                        name:childSnapShot.val().name,
                        photo:childSnapShot.val().photo,
                        color:childSnapShot.val().color,
                        created_on: childSnapShot.val().created_on,


                };

                data.push(GSTData);
            });

            this.setState({CategoryList: data, countPage: data.length, loading: false});
            console.log(this.state.CategoryList);
    
        });
    }

    itemMenuList=()=>{

        this.setState({loading: true});
        var ref = firebase
            .database()
            .ref("merchant_menu_items/");

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

                data.push(GSTData);
            });

            this.setState({itemMenuList: data, countPage: data.length, loading: false});
            console.log(this.state.itemMenuList);
    
        });


    }


    handleUploadStart = () => this.setState({isUploading: true, uploadProgress: 0});
    
    handleFrontImageUploadStart = () => this.setState({isUploading: true, uploadProgress: 0, avatarURL: ''});
    handleProgress = progress => this.setState({uploadProgress: progress});

    handleUploadError = error => {
        this.setState({
            isUploading: false
            // Todo: handle error
        });
        console.error(error);
    };

    handleItemPhotoSuccess = (filename) => {

        firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(url => this.setState({photo: url}));
    };

explore=(e)=>{
e.preventDefault();
console.log(e.target);
this.setState({
    display_category:true,
})
}
       handleSubmit = (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
          
            var sessionId = sessionStorage.getItem("RoleId");
            var username = sessionStorage.getItem("username");
     
                let dbCon = firebase
                .database()
                .ref('/duplicate');
            
              
            dbCon.push({
               


                name:this.state.name,
               
               photo:this.state.photo,
                color:this.state.color,

                sessionId:sessionId,
                username:username,

               
           
        
             });
    
            // this
            //     .props
            //     .history
            //     .push("/AddCategoryMenuDuplicate");
               
                window.location.href="/AddCategoryMenuDuplicate";
        } else {
            this
                .validator
                .showMessages();
            this.forceUpdate();
        }

    };

    CategoryChange  = (e) => {
        this.setState({
            name: e.target.value
        });
        if(this.state.validError!=true){
           
            
            var ref = firebase
            .database()
            .ref('items_categories/').orderByChild("name").equalTo(e.target.value);
            ref.on('value', snapshot => {
                var  user_exist = snapshot.numChildren();
                console.log(user_exist);
           
            if(user_exist>0 && this.state.validError!=true){
               
               
                this.setState({name_message: " Category Name already exist",validError:false});

            }
          
            else
            {
                this.setState({name_message: "",validError:true});
               
            }
           
        })
    }
       
    };

    handleChange  = (e) => {
        this.setState({
            oldColor: this.state.color,
            color: e.target.value,
            active: !this.state.active,
          });
        }

      onChange = (event) => {

        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        return (
            <>
               <Form onSubmit={this.handleSubmit}>
           <div class="page-wrapper">
   

  <Sidebar/>
   <div class="page-container">

      <Header/>
       <div class="main-content">
           <div class="section__content">
           
           
           
   
           
<div class="container-fluid">

<div class="row">
<div class="col-md-12 p-0">
<div class="search_profile">
<div class="row">
<div class="col-md-8">
<div class="search_top">
<a href="#" class="search_icon"><i class="fas fa-search"></i></a>       
<input class="search_input" type="text" name="" placeholder="Search..."/>
</div>
</div>

<div class="col-md-4 ">
<div class="profile_user">
<span class="usericon">
<img src="images/icon/profile.jpg"/>
</span>
<span class="profile_data">
<p class="name">{sessionStorage.getItem("username")}</p>
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
<Link to="/AddItemMenu">
<span class="btn add_categoty_menu">Items</span>
</Link>
<Link to="/AddCategoryMenu">
<span class="btn add_categoty_menu"><span className="active"></span>Category</span>
</Link>
<span class="btn add_categoty_menu">coupon</span>
</div>
</div>


<div class="row mt-30">
<div class="col-md-12 p-0">
<div class="orders_menu">
<ul>
<li><a href="#" class="activemenu">Add category</a></li>
<li><a href="#">View category</a></li>
</ul>
</div>
</div>			
</div>




<div class="row mt-30">
<div class="col-md-6 p-0">

<div class="category_form">

<div class="row form-group">
<div class="col col-md-4">
<label class=" form-control-label"> name</label>
</div>
<div class="col-12 col-md-8">
<input type="text"
  name="name"
  onChange={this.CategoryChange}
  value={this.state.name}
placeholder="Main course" class="form-control"/>
</div>
{this .validator.message("Category Name", this.state.name, "required|whitespace|min:2|max:70")}
<div className="text-danger">
                                                        {" "}
                                                        {this.state.name_message}
                                                        </div>
</div>

<div class="row form-group">
<div class="col col-md-4">
<label class="form-control-label">Parent category</label>
</div>
<div class="col-12 col-md-8">
<select name="parent_category_select" id="select" 
     value={this.state.parent_category_select}
     onChange={this.onChange}
    className="form-control">
          <option value="select">select</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
    </select>
    </div>
    {this.validator.message("Parent Ctaegory ", this.state.parent_category_select, "required")}
</div>
{this.state.parent_category_select=="Yes"
?
<div class="row form-group">
<div class="col col-md-4">
<label class=" form-control-label">Select parent 
category</label>
</div>
<div class="col-12 col-md-8">
<button type="button" class="btn btn-secondary mb-1" data-toggle="modal" data-target="#add_parent_category">
Choose
</button>
</div>
</div>
:
''
 }



</div>
</div>			
</div>





<div class="row mt-30">
<div class="col-md-12 p-0">
<div class="category_upload_image">
<h1>Upload Image</h1>
<div class="upload_img_block">


<div class="row">
<div class="col-md-3">


{this.state.photo && <img src={this.state.photo} />}
                                                 <FileUploader
                                                accept="image/*"
                                                name="photo"
                                                randomizeFilename
                                                storageRef={firebase
                                                .storage()
                                                .ref("images")}
                                                onUploadStart={this.handleFrontImageUploadStart}
                                                onUploadError={this.handleUploadError}
                                                onUploadSuccess={this.handleItemPhotoSuccess}
                                                onProgress={this.handleProgress}/>


</div>
{this
                                                                .validator
                                                                .message("photo", this.state.photo, "required")}
<div class="col-md-1 or"><span>AND</span></div>
<div class="col-md-8">

<div class="colored_block">
<div class="row">

<div class="col-md-3">
<div class="color-box" style={{ background: this.state.color }}>
<label className="color-selector">
     
        {/* <span>{this.state.color}</span> */}
        <input
          type="color"
          value={this.state.color}
          onChange={this.handleChange}
          className="hidden"
         />
           
      </label>

</div>
</div>
{this
                                                                .validator
                                                                .message("color", this.state.color, "required")}







</div></div>




</div>
</div>





</div>


</div>
</div>			
</div>




<div class="row mt-30">

<div class="col-md-12 p-0">
<div class="category_upload_image">
<h1>Items</h1>

<div class="upload_img_block addproducts">
<h2>0 Items 

    <span class="additems btn"><button type="button" data-toggle="modal" data-target="#add_items">Add Items </button></span>
   
    </h2>



  









</div>


</div>
</div>			
</div>

<button type="submit" className="btn save_btn_menu">Save
                                                    </button>
</div>
</div>
</div>


</div>   
</div>



    <div class="modal fade" id="add_parent_category" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true">
<div class="modal-dialog modal-sm hipal_pop" role="document">
<div class="modal-content">


<div class="modal-header">
<h5 class="modal-title" id="smallmodalLabel">Choose Parent Category
</h5></div>


<div class="modal-body product_edit">



<div class="col-12 w-100-row">

<div class="row">

<div class="col col-md-6 font-15">
Menu : <Link to="#">Maincourse</Link> / 
<Link to="#">Parent</Link>
</div>

<div class="col col-md-6 text-center">
<img src="images/icon/back_arrow_left_o.svg"/>
</div>

</div>
</div>





<div class="col-12 w-100-row">
<div class="row">


<div class="row">
{this.state.CategoryList && this.state.CategoryList.map((category,index) => {
return (
<div class="col-md-4 mb-15 text-center" key={index}>
<div class="cate_img_box  shadow_box" style={{background:category.color}}>
     

<img class="img_empty2" src={category.parent_photo}></img>

<p> {category.parent_category}</p>                  
</div>

{category.sub_name=="No"?
''
:
<button class="btn m-t-10 btn_explore">Explore</button>

}
</div>
)})}


</div>



</div>
</div>




</div>



<div class="modal-footer">
<button type="button" class="btn save_btn">Add here</button>
</div>


</div>
</div>
</div>


<div class="modal fade" id="add_items" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true">
<div class="modal-dialog modal-sm hipal_pop additempop" role="document">
<div class="modal-content">


<div class="modal-header">
<h5 class="modal-title" id="smallmodalLabel">Add Item in Category(name)
</h5><span class="black_font">12 Iteams added</span></div>


<div class="modal-body product_edit">





<div class="col-12 bdr_bottom_gray pb-15 mb-15">
<div class="row">
<div class="col col-md-5 font-18">
Search by name / ID
</div>
<div class="col col-md-7 bill_id_settle pl-0">
<div class="form-group">
<span class="pull-left"><input type="text" id="text-input" name="text-input" placeholder="T1" class="form-control edit_product"/></span>
<span class="btn pull-left add_btn_pop_orange bg_green addmode_pad ml-5">Go</span>
<span class="btn pull-right pad-back">Back</span>
</div>
</div>
</div>
</div>







<div class="col-12 w-100-row">


<div class="row add-Items_scroll">



{this.state.itemMenuList && this.state.itemMenuList.map((item,index) => {
return (
<div class="col-md-6 product_box" key={index}>
<div class="product_box_item">
<div class="product_item_row m-b-20">
<div class="left">
<div class="img_box">
    {item.advance=="Yes"?
<span class="star_yellow"><img src="images/icon/star_rate_ye.svg"/></span>
:''
}
<img src={item.item_image}/>
</div>
</div>
<div class="right">
<p><span class="item_recipe">
{item.item_type=="Veg"?
    <span class="dot veg"></span>
    :
    <span class="dot non-veg"></span>
}

    </span>
    {item.extra=="Yes"?
    <>
{item.bestsellertag=="Yes"?
<span class="btn best_seller">BESTSELLER</span>
:''
}
{item.healthytag=="Yes"?
<span class="btn best_seller">HEALTHY</span>
:''
}
</>
:''
}
</p>
<p class="item_name">{item.item_name}</p>
<p class="price">₹ {item.item_price}.00</p>
</div>

</div>

<div class="product_item_row">
<div class="left">
<span class="btn remove_btn pull-left bg_green">Add</span>
</div>

</div>


</div>
</div>

)})}






</div>




</div>




</div>



<div class="modal-footer">
<button type="button" class="btn save_btn">Add Items</button>
</div>


</div>
</div>
</div>


</Form>
    </>
        );
    }
}

export default AddCategoryMenuDuplicate;
