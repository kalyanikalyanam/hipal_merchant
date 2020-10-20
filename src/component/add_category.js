import React from "react";
import firebase from '../config';
import Sidebar from './sidebar';
import Header from './header';
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import {Form} from 'reactstrap';
import {Link} from "react-router-dom";
class AddCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category:'',
          
            categoty_list:[],

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
            .then(url => this.setState({category_photo: url}));
    };


       handleSubmit = (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
          
            var sessionId = sessionStorage.getItem("RoleId");
            var username = sessionStorage.getItem("username");

            let dbCon = firebase
                .database()
                .ref('/categories');
            
              
            dbCon.push({
               


                category:this.state.category,
              

                category_photo:this.state.category_photo,
                
                sessionId:sessionId,
                username:username,

               
           
        
             });
             window.location.href="/AddCategory";
            // this
            //     .props
            //     .history
            //     .push("/AddCategory");
        } else {
            this
                .validator
                .showMessages();
            this.forceUpdate();
        }

    };

    itemCategoryChange  = (e) => {
        this.setState({
            category: e.target.value
        });
        if(this.state.validError!=true){
           
            
            var ref = firebase
            .database()
            .ref('categories/').orderByChild("category").equalTo(e.target.value);
            ref.on('value', snapshot => {
                var  user_exist = snapshot.numChildren();
                console.log(user_exist);
           
            if(user_exist>0 && this.state.validError!=true){
               
               
                this.setState({mobile_message: "Category Name already exist",validError:false});

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
    <div className="col-md-12 p-0">
    <Link to="/AddItemMenu">
    <span className="btn add_categoty_menu"> items 
    </span>
    </Link>
    <Link to="/AddCategory">
    <span className="btn add_categoty_menu"><span className="active"></span> Category</span>
    </Link>
    <Link to="/AddSubCategory">
    <span className="btn add_categoty_menu"> Sub Category 
    </span>
    </Link>
    <span className="btn add_categoty_menu"> coupon</span>
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
    
    <Form onSubmit={this.handleSubmit}>
    
    
    <div className="row mt-30">
    <div className="col-md-6 p-0">
    
    <div className="category_form">



    
    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Category name</label>
    </div>
    <div className="col-12 col-md-8">
    <input type="text"
    name="item_category"
    onChange={this.itemCategoryChange}
    value={this.state.category}
     placeholder=""
      className="form-control"/>
    </div>

    {this .validator.message("Category", this.state.category, "required|whitespace|min:2|max:70")}
    <div className="text-danger">
                                                        {" "}
                                                        {this.state.mobile_message}
                                                        </div>
    </div>




    
    {/* <div className="row form-group">
    <div className="col col-md-4">
    <label className="form-control-label">Sub category</label>
    </div>
    <div className="col-12 col-md-8">


  


    <select name="item_sub_category" id="select" 
     value={this.state.item_sub_category}
     onChange={this.onChange}
    className="form-control">
          <option value="select">select</option>
    <option value="Yes">Yes</option>
    <option value="NO">NO</option>
    </select>


    
    </div>

    {this .validator.message("Sub Category Item Name", this.state.item_sub_category, "required")}
    </div> */}


    {/* {this.state.item_sub_category=="Yes"?
    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Select parent 
    category</label>
    </div>
    <div className="col-12 col-md-8">
   

<select
                                                         className="form-control"
                                                        name="item_categoty_list"
                                                        onChange={this.onChange}>
                                                        <option>Select Item Type</option>
                                                        {this.state.itemCategoryList && this
                                                            .state
                                                            .itemCategoryList
                                                            .map((data, index) => {

                                                                return (
                                                                    <option value={data.item_category} key={index}>{data.item_category}</option>
                                                                )

                                                            })}

                                                    </select>
    </div>
    {this .validator.message("Category List", this.state.item_categoty_list, "required")}

    </div>
    :
    ''
            } */}




    
    
    </div>
    </div>			
    </div>
    
  
    
    <div className="row mt-30">
    <div className="col-md-12 p-0">
    <div className="category_upload_image">
    <h1>Upload Image</h1>
    <div className="upload_img_block">
    
    
    <div className="row">
    <div className="col-md-3">
    


{this.state.category_photo && <img src={this.state.category_photo} />}
                                                 <FileUploader
                                                accept="image/*"
                                                name="category_photo"
                                                randomizeFilename
                                                storageRef={firebase
                                                .storage()
                                                .ref("images")}
                                                onUploadStart={this.handleFrontImageUploadStart}
                                                onUploadError={this.handleUploadError}
                                                onUploadSuccess={this.handleItemPhotoSuccess}
                                                onProgress={this.handleProgress}/>
    </div>


    {this .validator.message("Category Photo", this.state.category_photo, "required")}

  
    </div>
    
    
    
    
    
    </div>
    
    
    </div>
    </div>			
    </div>
    
    
      
    <div className="form-group">
    <button type="submit" className="btn save_btn_menu">Save
                                                    </button>

    
    
    </div>
    
    
    

    
    </Form>
    </div>
    </div>
    </div>
    
    
    </div>   
    </div>
               
        );
    }
}

export default AddCategory;
