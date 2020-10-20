import React from "react";
import firebase from '../config';
import Sidebar from './sidebar';
import Header from './header';
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import {Form} from 'reactstrap';
import {Link} from "react-router-dom";
class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item_category:'',
            item_sub_category:'',
            item_categoty_list:'',

            employer_sevice_message: "",
            validError:false,
            mobile_message: '',
            avatar: "",
            isUploading: false,
            progress: 0,
            avatarURL: "",
            filenames: [],
           uploadProgress: 0,
         
        };



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
            .ref("items_categories/");

        ref.on('value', snapshot => {
            const data = [];
            snapshot.forEach(childSnapShot => {

                const GSTData = {
                    itemcategoryId: childSnapShot
                        .key
                        .toString(),
                        item_category: childSnapShot
                        .val()
                        .item_category,
                      
                        created_on: childSnapShot
                        .val()
                        .created_on,


                };

                data.push(GSTData);
            });

            this.setState({itemCategoryList: data, countPage: data.length, loading: false});
            console.log(this.state.itemCategoryList);
    
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
                        item_id: childSnapShot.val().item_id,
                        item_name: childSnapShot.val().item_name,
                        item_description: childSnapShot.val().item_description,
                        item_halal: childSnapShot.val().item_halal,
                        item_image: childSnapShot.val().item_image,
                        item_kitchen_section: childSnapShot.val().item_kitchen_section,
                        item_restaurant_id: childSnapShot.val().item_restaurant_id,
                        item_type: childSnapShot.val().item_type,
                        item_hash_tags: childSnapShot.val().item_hash_tags,
                        item_price: childSnapShot.val().item_price,
                        item_tax: childSnapShot.val().item_tax,



                        sessionId: childSnapShot.val().sessionId,
                        status: childSnapShot.val().status,
                        username: childSnapShot.val().username,



                        carbs: childSnapShot.val().carbs,
                        protien: childSnapShot.val().protien,
                        fat: childSnapShot.val().fat,
                        item_video: childSnapShot.val().item_video,
                         item_multiple_image: childSnapShot.val().item_multiple_image,


                        extra: childSnapShot.val().extra,
                        healthytag: childSnapShot.val().healthytag,
                        bestsellertag: childSnapShot.val().bestsellertag,


                        recommend: childSnapShot.val().recommend,
                        recommendations: childSnapShot.val().recommendations,

                         created_on: childSnapShot.val().created_on,


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
            .then(url => this.setState({item_category_photo: url}));
    };


       handleSubmit = (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
          
            var sessionId = sessionStorage.getItem("RoleId");
            var username = sessionStorage.getItem("username");

            let dbCon = firebase
                .database()
                .ref('/items_categories');
            
              
            dbCon.push({
               


                item_category:this.state.item_category,
                item_sub_category:this.state.item_sub_category,
                item_categoty_list:this.state.item_categoty_list,

                item_category_photo:this.state.item_category_photo,
                
                sessionId:sessionId,
                username:username,

               
           
        
             });
            this
                .props
                .history
                .push("/Orders");
        } else {
            this
                .validator
                .showMessages();
            this.forceUpdate();
        }

    };

    itemCategoryChange  = (e) => {
        this.setState({
            item_category: e.target.value
        });
        if(this.state.validError!=true){
           
            
            var ref = firebase
            .database()
            .ref('items_categories/').orderByChild("item_category").equalTo(e.target.value);
            ref.on('value', snapshot => {
                var  user_exist = snapshot.numChildren();
                console.log(user_exist);
           
            if(user_exist>0 && this.state.validError!=true){
               
               
                this.setState({mobile_message: "Item Category Name already exist",validError:false});

            }
          
            else
            {
                this.setState({mobile_message: "",validError:true});
               
            }
           
        })
    }
       
    };



      onChange = (event) => {

        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        return (
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
    <div className="col-md-12 p-0">
    <span className="btn add_categoty_menu">Add items</span>
    <span className="btn add_categoty_menu">Add Category</span>
    <span className="btn add_categoty_menu">Add coupon</span>
    </div>
    </div>
    
    
    <div className="row mt-30">
    <div className="col-md-12 p-0">
    <div className="orders_menu">
    <ul>
    <li><a href="#" className="activemenu">Add category</a></li>
    <li><a href="#">View category</a></li>
    </ul>
    </div>
    </div>			
    </div>
    
    
    <div className="row mt-30">
    <div className="col-md-12 p-0 employes_table view_category_table">
    
    <div className="table-responsive table-data">
    <table className="table">
    <thead>
    
    <tr>
    <td>S.no</td>
    <td>Category Name</td>
    <td>No.Of Parent Catagory</td> 
    <td>No.Sub Catagory</td> 
    <td>Number of Items Number</td> 
    <td>Color</td> 
    <td>Add Item</td> 
    <td>View Category</td> 
    <td>Actions</td>
    </tr>
    
    </thead>
    <tbody>
    
    
    <tr>
    <td>1</td>
    <td>Pizza</td>
    <td>2</td>
    <td>0</td>
    <td>12</td>
    <td>Color</td>
    <td>ADD</td>
    <td>click</td>
    <td><img src="images/icon/edit_icon_blue.svg" className="edit_delete"/> <img src="images/icon/delete_cross.svg" className="edit_delete"/></td>
    </tr>
    
    
    <tr>
    <td>2</td>
    <td>Pizza</td>
    <td>2</td>
    <td>0</td>
    <td>12</td>
    <td>Color</td>
    <td>ADD</td>
    <td>click</td>
    <td><img src="images/icon/edit_icon_blue.svg" className="edit_delete"/> <img src="images/icon/delete_cross.svg" className="edit_delete"/></td>
    </tr>
    
    
    
    <tr>
    <td>3</td>
    <td>Pizza</td>
    <td>2</td>
    <td>0</td>
    <td>12</td>
    <td>Color</td>
    <td>ADD</td>
    <td>click</td>
    <td><img src="images/icon/edit_icon_blue.svg" className="edit_delete"/> <img src="images/icon/delete_cross.svg" className="edit_delete"/></td>
    </tr>
    
    
    
    <tr>
    <td>4</td>
    <td>Pizza</td>
    <td>2</td>
    <td>0</td>
    <td>12</td>
    <td>Color</td>
    <td>ADD</td>
    <td>click</td>
    <td><img src="images/icon/edit_icon_blue.svg" className="edit_delete"/> <img src="images/icon/delete_cross.svg" className="edit_delete"/></td>
    </tr>
    
    
    
    <tr>
    <td>5</td>
    <td>Pizza</td>
    <td>2</td>
    <td>0</td>
    <td>12</td>
    <td>Color</td>
    <td>ADD</td>
    <td>click</td>
    <td><img src="images/icon/edit_icon_blue.svg" className="edit_delete"/> <img src="images/icon/delete_cross.svg" className="edit_delete"/></td>
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
               
        );
    }
}

export default CategoryList;
