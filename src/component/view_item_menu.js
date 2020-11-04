import React from "react";
import firebase from '../config';
import Sidebar from './sidebar';
import Header from './header';
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import {Form} from 'reactstrap';
import {Link} from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
// import Modal from 'react-responsive-modal';
// import AddItemType from './add_item_type';
// import AddStation from './add_station';
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

  this.handleInputChange = this.handleInputChange.bind(this);
  this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
  this.handleRemoveItem = this.handleRemoveItem.bind(this);
         
      
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
           
           
        this.itemTypeList();
        this.restautantList();
        this.categoryList();
        this.stationList();
        this.itemMenuList();
          
        
      }


      itemMenuList=()=>{

        this.setState({loading: true});
        var ref = firebase
            .database()
            .ref("merchant_menu_items/").limitToLast(4);

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

    

    itemTypeList() {
        this.setState({loading: true});
        var ref = firebase
            .database()
            .ref("ItemType/");

        ref.on('value', snapshot => {
            const data = [];
            snapshot.forEach(childSnapShot => {

                const GSTData = {
                    itemtypeId: childSnapShot
                        .key
                        .toString(),
                        item_type: childSnapShot
                        .val()
                        .item_type,
                      
                        created_on: childSnapShot
                        .val()
                        .created_on,


                };

                data.push(GSTData);
            });

            this.setState({itemTypeList: data, countPage: data.length, loading: false});
            console.log(this.state.itemTypeList);
    
        });
    }



    restautantList() {
        this.setState({loading: true});
        var ref = firebase
            .database()
            .ref("restaurant_details/");

        ref.on('value', snapshot => {
            const data = [];
            snapshot.forEach(childSnapShot => {

                const GSTData = {
                    restaurantId: childSnapShot
                        .key
                        .toString(),
                        restaurant_name: childSnapShot
                        .val()
                        .restaurant_name,
                        restaurant_address: childSnapShot
                        .val()
                        .restaurant_address,
                        restaurant_phoneno: childSnapShot
                        .val()
                        .restaurant_phoneno,
                        restaurant_id: childSnapShot
                        .val()
                        .restaurant_id,
                        restaurant_owner: childSnapShot
                        .val()
                        .restaurant_owner,
                        is_this_a_branch_of_another_restaurant: childSnapShot
                        .val()
                        .is_this_a_branch_of_another_restaurant,
                        created_on: childSnapShot
                        .val()
                        .created_on,


                };

                data.push(GSTData);
            });

            this.setState({restautantList: data, countPage: data.length, loading: false});
            console.log(this.state.restautantList);
    
        });
    }


    categoryList() {
        this.setState({loading: true});
        var ref = firebase
            .database()
            .ref("categories/");

        ref.on('value', snapshot => {
            const data = [];
            snapshot.forEach(childSnapShot => {

                const GSTData = {
                    categoryId: childSnapShot
                        .key
                        .toString(),
                        category: childSnapShot
                        .val()
                        .category,
                        category_photo: childSnapShot
                        .val()
                        .category_photo,
                        
                      
                        created_on: childSnapShot
                        .val()
                        .created_on,


                };

                data.push(GSTData);
            });

            this.setState({categoryList: data, countPage: data.length, loading: false});
            console.log(this.state.categoryList);
    
        });
    }

    stationList() {
        this.setState({loading: true});
        var ref = firebase
            .database()
            .ref("station/");

        ref.on('value', snapshot => {
            const data = [];
            snapshot.forEach(childSnapShot => {

                const GSTData = {
                    stationId: childSnapShot
                        .key
                        .toString(),
                        station_name: childSnapShot
                        .val()
                        .station_name,
                        // printer_details: childSnapShot
                        // .val()
                        // .printer_details,
                        
                      
                     


                };

                data.push(GSTData);
            });

            this.setState({stationList: data, countPage: data.length, loading: false});
            console.log(this.state.stationList);
    
        });
    }

    onOpenModal = () => {

        this.setState({open: true});
    };
    onOpenModal1 = () => {

        this.setState({open1: true});
    };

    onCloseModal = () => {
        this.setState({open: false});
    };
    onCloseModal1 = () => {
        this.setState({open1: false});
    };


handleInputChange(evt) {
  this.setState({ input: evt.target.value });
}


handleInputKeyDown(evt) {
  if ( evt.keyCode === 17) {
    const {value} = evt.target;
    
    this.setState(state => ({
        item_hash_tags: [...state.item_hash_tags, value],
      input: ''
    }));
  }

  if ( this.state.item_hash_tags.length && evt.keyCode === 8 && !this.state.input.length ) {
    this.setState(state => ({
        item_hash_tags: state.item_hash_tags.slice(0, state.item_hash_tags.length - 1)
    }));
  }
}

handleRemoveItem(index) {
  return () => {
    this.setState(state => ({
        item_hash_tags: state.item_hash_tags.filter((item, i) => i !== index)
    }));
  }
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
            .then(url => this.setState({item_image: url}));
    };
    handleItemVideoSuccess = (filename) => {

        firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(url => this.setState({item_video: url}));
    };

    handleUploadSuccess = async filename => {
        const downloadURL = await firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL();

        this.setState(oldState => ({
            filenames: [
                ...oldState.filenames,
                filename
            ],
            downloadURLs: [
                ...oldState.downloadURLs,
                downloadURL
            ],
            uploadProgress: 100,
            isUploading: false
        }));
    };





    onChange = (event) => {

        this.setState({
            [event.target.name]: event.target.value
        });
    };

  
    itemNameChange  = (e) => {
        this.setState({
            item_name: e.target.value
        });
        if(this.state.validError!=true){
           
            
            var ref = firebase
            .database()
            .ref('merchant_menu_items/').orderByChild("item_name").equalTo(e.target.value);
            ref.on('value', snapshot => {
                var  user_exist = snapshot.numChildren();
                console.log(user_exist);
           
            if(user_exist>0 && this.state.validError!=true){
               
               
                this.setState({name_message: "Item Name already exist",validError:false});

            }
          
            else
            {
                this.setState({name_message: "",validError:true});
               
            }
           
        })
    }
       
    };


    handleRemoveShareholder = idx => () => {
        this.setState({
            recommendations: this
                .state
                .recommendations
                .filter((s, sidx) => idx !== sidx)
        });
    };

    handleShareholderNameChange = (idx) => evt => {
        const recommendations = this
            .state
            .recommendations
            .map((recommendations, sidx) => {
                if (idx !== sidx) 
                    return recommendations;
                return {
                    ...recommendations,
                    [evt.target.name]: evt.target.value
                };
            });

        this.setState({recommendations: recommendations});
    };

    

    handleAddShareholder = () => {
        this.setState({
            recommendations: this
                .state
                .recommendations
                .concat([
                    {
                        recommenditem: ""
                    }
                ])
        });
    };


    handlePortionRemoveShareholder = idx => () => {
        this.setState({
            portions_details: this
                .state
                .portions_details
                .filter((s, sidx) => idx !== sidx)
        });
    };

    handlePortionShareholderNameChange = (idx) => evt => {
        const portions_details = this
            .state
            .portions_details
            .map((portions_details, sidx) => {
                if (idx !== sidx) 
                    return portions_details;
                return {
                    ...portions_details,
                    [evt.target.name]: evt.target.value
                };
            });

        this.setState({portions_details: portions_details});
    };

   
    handlePortionAddShareholder = () => {
        this.setState({
            portions_details: this
                .state
                .portions_details
                .concat([
                    {
                        price: ""
                    }
                ])
        });
    };





    // handleprinterRemoveShareholder = idx => () => {
    //     this.setState({
    //         printer_details: this
    //             .state
    //             .printer_details
    //             .filter((s, sidx) => idx !== sidx)
    //     });
    // };

    // handleprinterShareholderNameChange = (idx) => evt => {
    //     const printer_details = this
    //         .state
    //         .printer_details
    //         .map((printer_details, sidx) => {
    //             if (idx !== sidx) 
    //                 return printer_details;
    //             return {
    //                 ...printer_details,
    //                 [evt.target.name]: evt.target.value
    //             };
    //         });

    //     this.setState({printer_details: printer_details});
    // };

   
    // handleprinterAddShareholder = () => {
    //     this.setState({
    //         printer_details: this
    //             .state
    //             .printer_details
    //             .concat([
    //                 {
    //                     printer_name: ""
    //                 }
    //             ])
    //     });
    // };







    setCategoryName = (e) => {
        console.log(e.target.value);

        let selectedCategoryName = e.target.value;

        var ref = firebase
            .database()
            .ref("sub_categories")
            .orderByChild("category")
            .equalTo(selectedCategoryName);

        ref.on('value', snapshot => {

            const data = [];

            snapshot.forEach(childSnapShot => {

                const GSTList = {
                    subCategoryId: childSnapShot
                        .key
                        .toString(),
                    sub_category: childSnapShot
                        .val()
                        .sub_category
                };

                data.push(GSTList);
            });

            this.setState({subcategoryList: data, category: selectedCategoryName, loading: false});
            console.log(this.state.subcategoryList);
        });

    };

  
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
          
            var sessionId = sessionStorage.getItem("RoleId");
            var username = sessionStorage.getItem("username");

            let dbCon = firebase
                .database()
                .ref('/merchant_menu_items');
                var key=(Math.round((new Date().getTime() / 1000)));
              
            dbCon.push({
               item_unique_id:key,

                item_id:this.state.item_id,
                item_name:this.state.item_name,
                item_description:this.state.item_description,
                item_halal:this.state.item_halal,
                item_image:this.state.item_image,
                item_points:this.state.item_points,

                station_name:this.state.station_name,
                item_restaurant_id:this.state.item_restaurant_id,
                item_type:this.state.item_type,
                item_hash_tags:this.state.item_hash_tags,
                item_price:this.state.item_price,
                item_tax:this.state.item_tax,

            //    category:this.state.category,
            //    sub_category:this.state.sub_category,


                sessionId: sessionId,
                status: this.state.status,
                username:username,



                portions:this.state.portions,
                portions_details:this.state.portions_details,



                advance:this.state.advance,
                carbs:this.state.carbs,
                protien:this.state.protien,
                fat:this.state.fat,
                item_video:this.state.item_video,
                item_multiple_image:this.state.downloadURLs,


                extra:this.state.extra,
                healthytag:this.state.healthytag,
                bestsellertag:this.state.bestsellertag,


                recommend:this.state.recommend,
                // recommenditem:this.state. recommenditem,
                recommendations:this.state.recommendations,


                created_on:this.state.created_on,
                bestrecommendation:'UnSelect',
                
                // carbs:'',
                // protien:'',
                // fat:'',
                // item_video:'',
                // item_multiple_image:'',
           
        







            });
            window.location.href="/AddItemMenu";
            // this
            //     .props
            //     .history
            //     .push("/Orders");
        } else {
            this
                .validator
                .showMessages();
            this.forceUpdate();
        }

    };

    itemidChange  = (e) => {
        this.setState({
            item_id: e.target.value
        });
        if(this.state.validError!=true){
           
            
            var ref = firebase
            .database()
            .ref('merchant_menu_items/').orderByChild("item_id").equalTo(e.target.value);
            ref.on('value', snapshot => {
                var  user_exist = snapshot.numChildren();
                console.log(user_exist);
           
            if(user_exist>0 && this.state.validError!=true){
               
               
                this.setState({mobile_message: "Item Id already exist",validError:false});

            }
          
            else
            {
                this.setState({mobile_message: "",validError:true});
               
            }
           
        })
    }
       
    };

    // stationSubmit = (event) => {
    //     event.preventDefault();
    //     if (this.validator.allValid()) {
          
    //         var sessionId = sessionStorage.getItem("RoleId");
    //         var username = sessionStorage.getItem("username");

    //         let dbCon = firebase
    //             .database()
    //             .ref('/station');
               
              
    //         dbCon.push({
              


    //             sessionId: sessionId,
    //             status: this.state.status,
    //             username:username,



    //             station_name:this.state.station_name,
    //             printer_details:this.state.printer_details,



               

    //         });
    //         window.location.href="/AddItemMenu";
          
    //     } else {
    //         this
    //             .validator
    //             .showMessages();
    //         this.forceUpdate();
    //     }

    // };


    render() {
        const {open,open1 } = this.state;
        const styles = {
            container: {
              border: '1px solid #ddd',
              padding: '5px',
              borderRadius: '5px',
            },
      
            // item_hash_tags: {
            //   display: 'inline-block',
            //   padding: '2px',
            //   border: '1px solid blue',
            //   fontFamily: 'Helvetica, sans-serif',
            //   borderRadius: '5px',
            //   marginRight: '5px',
            //   cursor: 'pointer'
            // },
      
            input: {
              outline: 'none',
              border: 'none',
              fontSize: '14px',
              fontFamily: 'Helvetica, sans-serif'
            }
          };
 
        
        return (
           
               
<>
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
<div class="col-md-6">
<div class="company_name_box">
<div class="company_iocn"></div>
<div class="company_details">
<p class="name">The Coffee Cup Sanikpuri </p>
<p class="open">OPEN <i class="fa fa-circle" aria-hidden="true"></i></p>
</div>
</div>
</div>
<div class="col-md-3">
<div class="search_top">
<a href="#" class="search_icon"><i class="fas fa-search"></i></a>       
<input class="search_input" type="text" name="" placeholder="Search..."/>
</div>
</div>
<div class="col-md-3 ">
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

<div class="col-lg-7">

<div class="row mt-30">
<div class="col-md-12 p-0">
<Link to="/AddItemMenu">
<span class="btn add_categoty_menu">Items <span class="active"></span></span>
</Link>
<Link to="/AddCategoryMenuDuplicate">
<span class="btn add_categoty_menu">Category</span>
</Link>
<span class="btn add_categoty_menu">Coupon</span>
</div>
</div>

<div class="row mt-30">
<div class="col-md-12 p-0">
<div class="orders_menu">
<ul>
<li><a href="/AddItemMenu">Add Items</a></li>
<li><a href="/ViewItemMenu"  class="activemenu">View Items</a></li>
</ul>
</div>
</div>
</div>




<div class="col-md-12 mt-30 p-0">
<div class="category_menu_search">
<span class="cate_menu">
<a href="view_table.html" class="current">Menu</a> / 
<a href="view_table_1.html">Pizza</a> / 
<a href="view_table_2.html">Chicken Pizza</a>
</span>
<span class="cate_search">
<input type="text" placeholder="Search"/>
<a href="#" class="search_icon"><i class="fas fa-search"></i></a>
</span>
</div>
</div>


<div class="m-t-20 row">
<div class="col-md-12 product_box  mb-0">
<div class="product_box_item p-30">
<div class="product_item_row sub_cate_product">
<div class="left">
<div class="img_box">
<span class="star_yellow"><img src="images/icon/star_rate_ye.svg"/></span>
<img src="images/category_img.png"/>
</div>
</div>
<div class="right">
<p><span class="item_recipe"><span class="dot veg"></span></span>
<span class="btn best_seller">BESTSELLER</span> <span class="btn pull-right outer_edit_btn fill">Edit</span></p>
<p class="item_name pl-0">Caesar Salad</p>
<p class="price  pl-0">₹ 220.00</p>
<p class="small_font-1 mb-0">Item-sub category 1, Item-sub category 2</p>
</div>
</div>
</div>
</div>
</div>


<div class="m-t-20 row">
<div class="col-md-12 product_box mb-0">
<div class="product_box_item p-30">
<div class="product_item_row sub_cate_product">
<div class="left">
<div class="img_box">
<span class="star_yellow"><img src="images/icon/star_rate_ye.svg"/></span>
<img src="images/category_img.png"/>
</div>
</div>
<div class="right">
<p><span class="item_recipe"><span class="dot veg"></span></span>
<span class="btn best_seller">BESTSELLER</span> <span class="btn pull-right outer_edit_btn fill">Edit</span></p>
<p class="item_name pl-0">Caesar Salad</p>
<p class="price  pl-0">₹ 220.00</p>
<p class="small_font-1 mb-0">Item-sub category 1, Item-sub category 2</p>
</div>
</div>
</div>
</div>
</div>




<div class="m-t-20 row">
<div class="col-md-12 product_box  mb-0">
<div class="product_box_item p-30">
<div class="product_item_row sub_cate_product">
<div class="left">
<div class="img_box">
<span class="star_yellow"><img src="images/icon/star_rate_ye.svg"/></span>
<img src="images/category_img.png"/>
</div>
</div>
<div class="right">
<p><span class="item_recipe"><span class="dot veg"></span></span>
<span class="btn best_seller">BESTSELLER</span> <span class="btn pull-right outer_edit_btn fill">Edit</span></p>
<p class="item_name pl-0">Caesar Salad</p>
<p class="price  pl-0">₹ 220.00</p>
<p class="small_font-1 mb-0">Item-sub category 1, Item-sub category 2</p>
</div>
</div>
</div>
</div>
</div>




<div class="m-t-20 row  mb-0">
<div class="col-md-12 product_box mb-0">
<div class="product_box_item p-30">
<div class="product_item_row sub_cate_product">
<div class="left">
<div class="img_box">
<span class="star_yellow"><img src="images/icon/star_rate_ye.svg"/></span>
<img src="images/category_img.png"/>
</div>
</div>
<div class="right">
<p><span class="item_recipe"><span class="dot veg"></span></span>
<span class="btn best_seller">BESTSELLER</span> <span class="btn pull-right outer_edit_btn fill">Edit</span></p>
<p class="item_name pl-0">Caesar Salad</p>
<p class="price  pl-0">₹ 220.00</p>
<p class="small_font-1 mb-0">Item-sub category 1, Item-sub category 2</p>
</div>
</div>
</div>
</div>
</div>



</div>

<div class="col-lg-5">

<div class="recent_itemas_box">

<h1>Recent Items</h1>
{this.state.itemMenuList && this.state.itemMenuList.map((item,index) => {
return (
<div class="m-t-20 row  mb-0"  key={index}>
<div class="col-md-12 product_box mb-0">
<div class="product_box_item">
<div class="product_item_row sub_cate_product">
<div class="left">
<div class="img_box">
{item.advance=="Yes"?

<span class="star_yellow"><img src="images/icon/star_rate_ye.svg"/></span>
:
''
}
<img src={item.item_image}/>
</div>
</div>
<div class="right">
<p><span class="item_recipe"><span class="dot veg"></span></span>
<span class="btn best_seller">BESTSELLER</span> <span class="btn pull-right outer_edit_btn fill">Edit</span></p>
<p class="item_name pl-0">{item.item_name}</p>
<p class="price  pl-0">₹ {item.item_price}.00</p>
<p class="small_font-1 mb-0">Item-sub category 1, Item-sub category 2</p>
</div>
</div>
</div>
</div>
</div>
)})}

{/* <div class="m-t-20 row  mb-0">
<div class="col-md-12 product_box mb-0">
<div class="product_box_item">
<div class="product_item_row sub_cate_product">
<div class="left">
<div class="img_box">
<span class="star_yellow"><img src="images/icon/star_rate_ye.svg"/></span>
<img src="images/category_img.png"/>
</div>
</div>
<div class="right">
<p><span class="item_recipe"><span class="dot veg"></span></span>
<span class="btn best_seller">BESTSELLER</span> <span class="btn pull-right outer_edit_btn fill">Edit</span></p>
<p class="item_name pl-0">Caesar Salad</p>
<p class="price  pl-0">₹ 220.00</p>
<p class="small_font-1 mb-0">Item-sub category 1, Item-sub category 2</p>
</div>
</div>
</div>
</div>
</div>


<div class="m-t-20 row  mb-0">
<div class="col-md-12 product_box mb-0">
<div class="product_box_item">
<div class="product_item_row sub_cate_product">
<div class="left">
<div class="img_box">
<span class="star_yellow"><img src="images/icon/star_rate_ye.svg"/></span>
<img src="images/category_img.png"/>
</div>
</div>
<div class="right">
<p><span class="item_recipe"><span class="dot veg"></span></span>
<span class="btn best_seller">BESTSELLER</span> <span class="btn pull-right outer_edit_btn fill">Edit</span></p>
<p class="item_name pl-0">Caesar Salad</p>
<p class="price  pl-0">₹ 220.00</p>
<p class="small_font-1 mb-0">Item-sub category 1, Item-sub category 2</p>
</div>
</div>
</div>
</div>
</div>


<div class="m-t-20 row  mb-0">
<div class="col-md-12 product_box mb-0">
<div class="product_box_item">
<div class="product_item_row sub_cate_product">
<div class="left">
<div class="img_box">
<span class="star_yellow"><img src="images/icon/star_rate_ye.svg"/></span>
<img src="images/category_img.png"/>
</div>
</div>
<div class="right">
<p><span class="item_recipe"><span class="dot veg"></span></span>
<span class="btn best_seller">BESTSELLER</span> <span class="btn pull-right outer_edit_btn fill">Edit</span></p>
<p class="item_name pl-0">Caesar Salad</p>
<p class="price  pl-0">₹ 220.00</p>
<p class="small_font-1 mb-0">Item-sub category 1, Item-sub category 2</p>
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
