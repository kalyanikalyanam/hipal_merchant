import React from "react";
import firebase from '../config';
import Sidebar from './sidebar';
import Header from './header';
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import {Form} from 'reactstrap';
import {Link} from "react-router-dom";
class AddItemMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

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
   
        const styles = {
            container: {
              border: '1px solid #ddd',
              padding: '5px',
              borderRadius: '5px',
            },
      
            item_hash_tags: {
              display: 'inline-block',
              padding: '2px',
              border: '1px solid blue',
              fontFamily: 'Helvetica, sans-serif',
              borderRadius: '5px',
              marginRight: '5px',
              cursor: 'pointer'
            },
      
            input: {
              outline: 'none',
              border: 'none',
              fontSize: '14px',
              fontFamily: 'Helvetica, sans-serif'
            }
          };
 
        
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
    
    
    
    {/* <div className="row mt-30">
    <div className="col-md-12 p-0">
    <Link to="/AddItemMenu">
    <span className="btn add_categoty_menu">Add items <span className="active"></span>
    </span>
    </Link>
    <Link to="/AddCategory">
    <span className="btn add_categoty_menu">Add Category</span>
    </Link>
    <span className="btn add_categoty_menu">Add coupon</span>
    </div>
    </div> */}


<div className="row mt-30">
    <div className="col-md-12 p-0">
    <Link to="/AddItemMenu">
    <span className="btn add_categoty_menu"> <span className="active"></span> items 
    </span>
    </Link>
    <Link to="/AddCategoryMenu">
    <span className="btn add_categoty_menu">Category</span>
    </Link>
    {/* <Link to="/AddCategory">
    <span className="btn add_categoty_menu">Category</span>
    </Link> */}
    {/* <Link to="/AddSubCategory">
    <span className="btn add_categoty_menu"> Sub Category</span>
    </Link> */}
    <span className="btn add_categoty_menu"> coupon</span>
    </div>
    </div>
    
   

    <Form onSubmit={this.handleSubmit}>

    <div className="row mt-30">

<div className="col-md-7 p-0">
<div className="orders_menu">
<ul>
<li><a href="#" className="activemenu">Add Items</a></li>
<li><a href="#">View Items</a></li>
</ul>
</div>

</div>


<div className="col-md-5 p-0">
<div className="form-group">
<button type="submit" className="btn save_btn_menu">Save
                                                    </button>
{/* <div className="btn save_btn_menu">Save</div> */}
</div>
</div>
		
		
		

					
</div>
    
  
    
    <div className="row mt-30">
    <div className="col-md-12 p-0">
    <div className="category_upload_image">
        
    <h1>Item Primary Info</h1>
    <div className="upload_img_block add_menu">



    
    <div className="row">
    <div className="col-md-6">



    
    
    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Item ID</label>
    </div>
    <div className="col-12 col-md-8">
    <input type="text" id="text-input" name="item_id" value={this.state.item_id}   placeholder="IT10002345"    onChange={this.itemidChange}  className="form-control"/>
    
    </div>
    {this .validator.message("Item Id", this.state.item_id, "required|whitespace|min:10|max:10")}
    <div className="text-danger">
                                                        {" "}
                                                        {this.state.mobile_message}
                                                        </div>
    </div>






    
    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Item Name</label>
    </div>
    <div className="col-12 col-md-8">
    <input type="text" 
     name="item_name"
     onChange={this.itemNameChange}
     value={this.state.item_name}
     placeholder="Item Name" className="form-control"/>
    </div>
    {this .validator.message("Item Name", this.state.item_name, "required|whitespace|min:2|max:70")}
 <div className="text-danger">
                                                        {" "}
                                                        {this.state.name_message}
                                                        </div>
    </div>






    
    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Item Description</label>
    </div>
    <div className="col-12 col-md-8">
    
    
    <textarea 
     name="item_description"
     onChange={this.onChange}
     value={this.state.item_description}
     rows="3" placeholder="Enter text here" className="form-control"></textarea>
                                                   
    
    </div>
    {this .validator.message("Item Description", this.state.item_description, "required|whitespace|min:2|max:70")}
    </div>




    
    
    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Halal</label>
    </div>
    <div className="col-12 col-md-8">
    <select name="item_halal" id="select" 
     value={this.state.item_halal}
     onChange={this.onChange}
    className="form-control">
          <option value="select">select</option>
    <option value="Yes">Yes</option>
    <option value="NO">NO</option>
    </select>
    </div>
    {this.validator.message("Halal", this.state.item_halal, "required")}
    </div>




    
    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">images</label>
    </div>
    <div className="col-12 col-md-8">
    
    
{this.state.item_image && <img src={this.state.item_image} />}
                                                 <FileUploader
                                                accept="image/*"
                                                name="item_image"
                                                randomizeFilename
                                                storageRef={firebase
                                                .storage()
                                                .ref("images")}
                                                onUploadStart={this.handleFrontImageUploadStart}
                                                onUploadError={this.handleUploadError}
                                                onUploadSuccess={this.handleItemPhotoSuccess}
                                                onProgress={this.handleProgress}/>
    
    
    
    
    
    </div>
    {this.validator.message("Image", this.state.item_image, "required")}
    </div>


    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Add Points</label>
    </div>
    <div className="col-12 col-md-8">
    <input type="number" 
     name="item_points"
     onChange={this.onChange}
     value={this.state.item_points}
     placeholder="34+" className="form-control"/>
    </div>
    {this .validator.message("Item Points", this.state.item_points, "required|min:1|max:3")}
 
    </div>



    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Status</label>
    </div>
    <div className="col-12 col-md-8">
     <select name="status" onChange={this.onChange} value={this.state.status} className="form-control">
        <option value="select">select</option>
        <option value="Active">Active</option>
        <option value="InActive">InActive</option>
      
        </select>

    </div>
    {this .validator.message("status", this.state.status, "required")}
 
    </div>


  {/* <select name="item_hash_tags" onChange={this.onChange} value={this.state.item_hash_tags} className="form-control">
        <option value="select">select</option>
        <option value="Spicy">Spicy</option>
        <option value="Soupy">Soupy</option>
        <option value="Cheesy">Cheesy</option>
        </select> */}



    </div>





    <div className="col-md-6">
    
    {/* <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Kitchen Section</label>
    </div>
    <div className="col-12 col-md-8">
    <input type="text" 
    name="station_name"
     onChange={this.onChange}
     value={this.state.station_name} placeholder="K1-1" className="form-control"/>
    </div>
    {this .validator.message("Item Kitchen Section", this.state.station_name, "required|whitespace|min:2|max:70")}
    </div> */}
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Station Name</label>
</div>
<div className="col-12 col-md-8">
<select
                                                        className="form-control pro-edt-select form-control-primary"
                                                        name="station_name"
                                                        onChange={this.onChange}>
                                                        <option>Select Station Name</option>
                                                        {this.state.stationList && this
                                                            .state
                                                            .stationList
                                                            .map((data, index) => {

                                                                return (
                                                                    <option value={data.station_name} key={index}>{data.station_name}</option>
                                                                )

                                                            })}

                                                    </select>
{/* <select name="select" id="select" className="form-control">
<option value="0">Kitchen</option>
</select> */}
{/* <button type="button" data-toggle="modal" data-target="#add_station"> */}

<Link to="/AddStation">
<div className="btn add_btn_pop_orange addmode_pad m-t-15">
Add Station</div>
</Link>
{/* </button> */}
</div>
{this .validator.message("Station Name", this.state.station_name, "required")}
</div>



    
    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Restaurant ID</label>
    </div>
    <div className="col-12 col-md-8">


    <select
                                                       className="form-control"
                                                        name="item_restaurant_id"
                                                        onChange={this.onChange}>
                                                        <option>Select Restaurant  ID</option>
                                                        {this.state.restautantList && this
                                                            .state
                                                            .restautantList
                                                            .map((data, index) => {

                                                                return (
                                                                    <option value={data.restaurant_id} key={index}>{data.restaurant_id}({data.restaurant_name})</option>
                                                                )

                                                            })}

                                                    </select>

 
    </div>
    {this.validator.message("Restaurant Id", this.state.item_restaurant_id, "required")}
    </div>
    

  





    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Item Type</label>
    </div>
    <div className="col-12 col-md-8">

    <select
                                                        className="form-control pro-edt-select form-control-primary"
                                                        name="item_type"
                                                        onChange={this.onChange}>
                                                        <option>Select Item Type</option>
                                                        {this.state.itemTypeList && this
                                                            .state
                                                            .itemTypeList
                                                            .map((data, index) => {

                                                                return (
                                                                    <option value={data.item_type} key={index}>{data.item_type}</option>
                                                                )

                                                            })}

                                                    </select>
  
   
    </div>
    {this.validator.message("Item Type", this.state.item_type, "required")}
    </div>




    
    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Hash Tags</label>
    </div>
    <div className="col-12 col-md-8">
    <ul style={styles.container}>
          {this.state.item_hash_tags.map((item, i) => 
            <li key={i} style={styles.item_hash_tags} onClick={this.handleRemoveItem(i)}>
              {item}
              <span>(x)</span>
            </li>
          )}
            <input

style={styles.input}
value={this.state.input}
onChange={this.handleInputChange}
onKeyDown={this.handleInputKeyDown} />
</ul>
        {/* <input type="text" name="item_hash_tags" onChange={this.onChange} value={this.state.item_hash_tags} className="form-control"/> */}
       
        
        </div>
        <div>Press CTRL</div>
        {this.validator.message("hash Tags", this.state.item_hash_tags, "required")}

    </div>




    
    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Price</label>
    </div>
    <div className="col-12 col-md-8">
    <input type="number" 
    name="item_price"
     onChange={this.onChange}
     value={this.state.item_price} placeholder="Price" className="form-control"/>
    </div>
    {this.validator.message("Price", this.state.item_price, "required")}
    </div>



    
    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Tax</label>
    </div>
    <div className="col-12 col-md-8">
     <input type="number" 
    name="item_tax"
     onChange={this.onChange}
     value={this.state.item_tax} placeholder="Tax in %" className="form-control"/>
    </div>
    {this.validator.message("Tax", this.state.item_tax, "required")}
    </div>
    
    {/* <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Choose 
    Category</label>
    </div>
    <div className="col-12 col-md-8">
    <select
                                                        className="form-control pro-edt-select form-control-primary"
                                                        name="category"
                                                        onChange={this.setCategoryName}>
                                                        <option>Select Category</option>
                                                        {this.state.categoryList && this
                                                            .state
                                                            .categoryList
                                                            .map((data, index) => {

                                                                return (
                                                                    <option value={data.category} key={index}>{data.category}</option>
                                                                )

                                                            })}

                                                    </select>
                                                    {this.validator.message("category", this.state.category, "required")}
    
  
    
    </div>
    </div> */}
    {/* <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Choose Sub
    Category</label>
    </div>
    <div className="col-12 col-md-8">
    <select
                                                        className="form-control pro-edt-select form-control-primary"
                                                        name="sub_category"
                                                        onChange={this.onChange}>
                                                        <option>Select Sub Category</option>
                                                        {this.state.subcategoryList && this
                                                            .state
                                                            .subcategoryList
                                                            .map((data, index) => {

                                                                return (
                                                                    <option value={data.sub_category} key={index}>{data.sub_category}</option>
                                                                )

                                                            })}

                                                    </select>
                                                    
                                                    {this.validator.message("Sub Category", this.state.sub_category, "required")}
    
   
    </div>
    </div> */}
    
  
    
    </div>
    </div>
    
    
    
    </div>
    
    
    </div>
    </div>			
    </div>





    
<div className="row mt-30">
<div className="col-md-12 p-0">
<div className="category_upload_image">
<h1>Portions

<span className="head_drop">
<select 
name="portions"
onChange={this.onChange}
value={this.state.portions}
id="select" className="form-control edit_portion">
<option value="0">select</option>
<option value="Yes">Yes</option>
<option value="No">No</option>
</select></span>
</h1>
{this.state.portions=="Yes"
?

<div className="upload_img_block add_menu">

{this
                                                                .state
                                                                .portions_details&&this
                                                                .state
                                                                .portions_details
                                                                // .slice(0, this.state.desired_Machines)
                                                                .map((portions_details, idx) => (
                                                                  
<div className="row m-t-20" key={idx}>



<div className="col-md-3">

<label className=" form-control-label">{idx+1}. Portions </label>
</div>
<div className="col-md-3">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label"> Name</label>
</div>
<div className="col-12 col-md-8">
<input type="text" id="text-input" 
 name="name"
 value={portions_details.name}
 onChange={this.handlePortionShareholderNameChange(idx)}
 placeholder="Full" className="form-control"/>
</div>
</div>
</div>


<div className="col-md-3">
<div className="row form-group">
<div className="col-md-4">
<label className=" form-control-label pull-right">Price</label>
</div>
<div className="col-12 col-md-8">
<input type="text" id="text-input" 
 name="price"
 value={portions_details.price}
 onChange={this.handlePortionShareholderNameChange(idx)}
 placeholder="200" className="form-control"/>
</div>
</div>
</div>



{idx != 0
    ?
<button
type="button" onClick={this.handlePortionRemoveShareholder(idx)}
className="btn btn-danger m-r-10">Remove
</button>
    : ''}


<button
type="button" onClick={this.handlePortionAddShareholder}
className="btn create_add_more_btn m-r-10">Add More 
</button>
</div>

))}





</div>
:
''

}




</div>
</div>			
</div>


  
    
    
    <div className="row mt-30">
    <div className="col-md-12 p-0">
    <div className="category_upload_image">


    <h1>Advance
    <span className="head_drop">
<select 
name="advance"
onChange={this.onChange}
value={this.state.advance}
id="select" className="form-control edit_portion">
<option value="0">select</option>
<option value="Yes">Yes</option>
<option value="No">No</option>
</select></span>
    </h1>






    {/* <span>
    <label>
                                                                    <input
                                                                        type="radio"
                                                                        name="advance"
                                                                        value="Yes"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.advance === 'Yes'}/>Yes
                                                                </label>
                                                                <label>
                                                                    <input
                                                                        type="radio"
                                                                        name="advance"
                                                                        value="No"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.advance === 'No'}/>No
                                                                </label>
                                                                </span> */}
                                                                {this.validator.message("advance", this.state.advance, "required")}



{this.state.advance=="Yes"?



<div className="upload_img_block add_menu">
    
<div className="row diet_row">
<div className="col-md-4">
<span>Carbs</span>
<span>
<select name="carbs"   onChange={this.onChange} value={this.state.carbs}  id="select" className="form-control">
<option value="select">select</option>
<option value="320">320</option>
</select></span>
</div>
{this.validator.message("carbs", this.state.carbs, "required")}
<div className="col-md-4">
<span>Protien</span>
<span>
<select name="protien"   onChange={this.onChange} value={this.state.protien} id="select" className="form-control">
<option value="select">select</option>
<option value="320">320</option>
</select></span>

</div>
{this.validator.message("protien", this.state.protien, "required")}
<div className="col-md-4">
<span>Fat</span>
<span>
<select  name="fat"   onChange={this.onChange} value={this.state.fat} id="select" className="form-control">
<option value="select">select</option>
<option value="320">320</option>
</select></span>
</div>

{this.validator.message("fat", this.state.fat, "required")}
</div>


<div className="row m-t-20">

<div className="col-md-5">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Add Intro <br></br>
Video/ GIF</label>
</div>
<div className="col-12 col-md-8">

{this.state.item_video && <video controls   width="80%" height="80%" src={this.state.item_video} />}
                                                 <FileUploader
                                                accept="video/*"
                                                name="item_video"
                                                randomizeFilename
                                                storageRef={firebase
                                                .storage()
                                                .ref("images")}
                                                onUploadStart={this.handleFrontImageUploadStart}
                                                onUploadError={this.handleUploadError}
                                                onUploadSuccess={this.handleItemVideoSuccess}
                                                onProgress={this.handleProgress}/>
</div>


{/* {this.validator.message("Video", this.state.item_video, "required")} */}
</div>


</div>




<div className="col-md-7">
<div className="row form-group">
<div className="col col-md-3">
<label className=" form-control-label">Add Image</label>
</div>
<div className="col-12 col-md-9">

{/* <div className="upload_img upload_small">
 <div className="form-group">
    <div className="img_show product_img_small"><img id="img-upload"/></div>
       <div className="input-group">
            <span className="input-group-btn">
                <span className="btn btn-default btn-file">
                    Upload An Image <input type="file" id="imgInp"/>
                </span>
            </span>
            <input type="text" className="form-control" readonly=""/>
        </div>
        
    </div>
    </div>
    
    <div className="upload_img upload_small">
 <div className="form-group">
    <div className="img_show product_img_small"><img id="img-upload"/></div>
       <div className="input-group">
            <span className="input-group-btn">
                <span className="btn btn-default btn-file">
                    Upload An Image <input type="file" id="imgInp"/>
                </span>
            </span>
            <input type="text" className="form-control" readonly=""/>
        </div>
        
    </div>
    </div>
    
    <div className="upload_img upload_small">
 <div className="form-group">
    <div className="img_show product_img_small"><img id="img-upload"/></div>
       <div className="input-group">
            <span className="input-group-btn">
                <span className="btn btn-default btn-file">
                    Upload An Image <input type="file" id="imgInp"/>
                </span>
            </span>
            <input type="text" className="form-control" readonly=""/>
        </div>
        
    </div>
    </div> */}



{this.state.isUploading && <p>Filenames: {this
                                                                            .state
                                                                            .filenames
                                                                            .join(", ")}</p>}
                                                                  
                                                                    <div>
                                                                        {this
                                                                            .state
                                                                            .downloadURLs&&this.state.downloadURLs
                                                                            .map((downloadURL, i) => {
                                                                                return <img
                                                                                    key={i}
                                                                                    src={downloadURL}
                                                                                    style={{
                                                                                    height: "200px",
                                                                                    width: "200px",
                                                                                    marginRight:"5px"
                                                                                }}/>;
                                                                            })}
                                                                    </div>
                                                                    <FileUploader
                                                                        accept="image/*"
                                                                        name="image-uploader-multiple"
                                                                        randomizeFilename
                                                                        storageRef={firebase
                                                                        .storage()
                                                                        .ref("images")}
                                                                        onUploadStart={this.handleUploadStart}
                                                                        onUploadError={this.handleUploadError}
                                                                        onUploadSuccess={this.handleUploadSuccess}
                                                                        onProgress={this.handleProgress}
                                                                        multiple/> 


{this
                                                                        .validator
                                                                        .message("Multiple Image", this.state.downloadURLs, "required|min:3|max:3")}







</div>


</div>
</div>

</div>


</div>





:''
}



    
    
    </div>
    </div>			
    </div>
    
    </Form>
    
    
    <div className="row mt-30">
    <div className="col-md-12 p-0">
    <div className="category_upload_image">
    <h1>Recommendation

    <span className="head_drop">
<select 
name="recommend"
onChange={this.onChange}
value={this.state.recommend}
id="select" className="form-control edit_portion">
<option value="0">select</option>
<option value="Yes">Yes</option>
<option value="No">No</option>
</select></span>
    </h1>

    {/* <span>
    <label>
                                                                    <input
                                                                        type="radio"
                                                                        name="recommend"
                                                                        value="Yes"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.recommend === 'Yes'}/>Yes
                                                                </label>
                                                                <label>
                                                                    <input
                                                                        type="radio"
                                                                        name="recommend"
                                                                        value="No"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.recommend === 'No'}/>No
                                                                </label>
                                                                </span> */}
                                                                {this.validator.message("Recommendation", this.state.recommend, "required")}


{this.state.recommend=="Yes"?

<div className="upload_img_block add_menu">
    
<div className="row">
<div className="col-md-6">


{this
                                                            .state
                                                            .recommendations
                                                            // .slice(0, this.state.desired_Machines)
                                                            .map((recommendations, idx) => (
                                                               
<div className="row form-group" key={idx}>
<div className="col col-md-4">
<label className=" form-control-label">Item {idx+1}</label>
</div>
<div className="col-12 col-md-8">
<select name="recommenditem" value={recommendations.recommenditem} onChange={this.handleShareholderNameChange(idx)} id="select" className="form-control">
<option value="select">select</option>
    <option value="item1">item1</option>
    <option value="item2">item2</option>
</select>
</div>

{this.validator.message("Recommendation", recommendations.recommenditem, "required")}


{idx != 0
    ?
<button
type="button" onClick={this.handleRemoveShareholder(idx)}
className="btn btn-danger m-r-10">Remove
</button>
    : ''}


<button
type="button" onClick={this.handleAddShareholder}
className="btn create_add_more_btn m-r-10">Add More 
</button>

</div>
))}
 

</div>


</div>



</div>

:

''
}

   
    
    
    </div>
    </div>			
    </div>
    
    
    
    
    <div className="row mt-30">
    <div className="col-md-12 p-0">
    <div className="category_upload_image">
    <h1>Extra
    <span className="head_drop">
<select 
name="extra"
onChange={this.onChange}
value={this.state.extra}
id="select" className="form-control edit_portion">
<option value="0">select</option>
<option value="Yes">Yes</option>
<option value="No">No</option>
</select></span>

    </h1>

  {this.state.extra=="Yes"?

<div className="upload_img_block add_menu">
    
<div className="row">
<div className="col-md-6">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Bestseller tag</label>
</div>
<div className="col-12 col-md-8">
<select name="bestsellertag" onChange={this.onChange} value={this.state.bestsellertag} id="select" className="form-control">


<option value="0">select</option>
<option value="Yes">Yes</option>
<option value="No">No</option>
</select>
</div>
{this.validator.message("Bestseller Tag", this.state.bestsellertag, "required")}
</div>

<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Healthy tag</label>
</div>
<div className="col-12 col-md-8">
<select name="healthytag" onChange={this.onChange} value={this.state.healthytag} id="select" className="form-control">
<option value="0">select</option>
<option value="Yes">Yes</option>
<option value="No">No</option>
</select>
</div>
{this.validator.message("Healthy tag", this.state.healthytag, "required")}
</div>
</div>
</div>



</div>
:''



  }

   
    
    
    </div>
    </div>			
    </div>
    
    
    
    
    </div>
    </div>
    </div>
    
    
    </div>   


























    </div>


{/* 
    <div className="modal fade" id="add_station" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true">
<div className="modal-dialog modal-sm hipal_pop" role="document">
<div className="modal-content">


<div className="modal-header">
<h5 className="modal-title" id="smallmodalLabel">Add Station
</h5></div>
<Form onSubmit={this.stationSubmit}>

<div className="modal-body product_edit">


<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Station name</label>
</div>
<div className="col-12 col-md-6">
<input type="text" id="text-input" 
name="station_name" onChange={this.onChange} value={this.state.station_name}
placeholder="BAR" className="form-control edit_product"/>
</div>
{this.validator.message("Station Name", this.state.station_name, "required")}
</div>
</div>





<div className="col-12 w-100-row">
{this
                                                                .state
                                                                .printer_details
                                                                // .slice(0, this.state.desired_Machines)
                                                                .map((printer_details, idx) => (
                                                                 

<div className="row form-group" key={idx}>
<div className="col col-md-4">
<label className=" form-control-label">Select Printer {idx+1} :</label>
</div>
<div className="col-12 col-md-6">

<select 
  name="printer_name"
  value={printer_details.printer_name}
  onChange={this.handleprinterShareholderNameChange(idx)}
id="select" className="form-control edit_product">
<option value="0">Select Printer :</option>
<option value="0">1st Floor</option>
<option value="0">2nd Floor</option>
<option value="0">3rd Floor</option>
</select>


</div>




{idx != 0
    ?
<button
type="button" onClick={this.handleprinterRemoveShareholder(idx)}
className="btn btn-danger m-r-10">Remove
</button>
    : ''}


<button
type="button" onClick={this.handleprinterAddShareholder}
className="btn create_add_more_btn m-r-10">Add More 
</button>

</div>
))}
</div>








</div>



<div className="modal-footer">
<button type="submit" className="btn save_btn">Save</button>
</div>

</Form>
</div>
</div>
</div> */}






    </>


        );
    }
}

export default AddItemMenu;
