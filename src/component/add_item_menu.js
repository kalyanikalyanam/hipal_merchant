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
import AddItemType from './add_item_type';
import AddStation from './add_station';
class AddItemMenu extends React.Component {
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
currentCategory: [{}],
      
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
           
           
        this.itemTypeList();
      
      
        this.stationList();
        this.itemMenuList();
          this.itemCategoryList();
        
      }


      itemMenuList=()=>{
        var sessionId = sessionStorage.getItem("RoleId");
        var businessId = sessionStorage.getItem("businessId");
        this.setState({loading: true});
        var ref = firebase
            .database()
            .ref("merchant_menu_items/").orderByChild("sessionId").equalTo(sessionId);

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
           
            item_type:childSnapShot.val().item_type,
            item_hash_tags:childSnapShot.val().item_hash_tags,
            item_price:childSnapShot.val().item_price,
            item_tax:childSnapShot.val().item_tax,

          


            sessionId: childSnapShot.val().sessionId,
            businessId: childSnapShot.val().businessId,
            
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
            sessionId: childSnapShot .val().sessionId,
            businessId: childSnapShot.val().businessId,
            categoryId:this.state.categoryId,

                };

                data.push(GSTData);
            });

            let sortedKeys = data.filter((res) => {
                return res.businessId === businessId;
              });

            this.setState({itemMenuList: sortedKeys, countPage: data.length, loading: false});
            console.log(this.state.itemMenuList);
    
        });


    }

    

    itemTypeList() {
        var sessionId = sessionStorage.getItem("RoleId");
        var businessId = sessionStorage.getItem("businessId");
        this.setState({loading: true});
        var ref = firebase
            .database()
            .ref("ItemType/").orderByChild("sessionId").equalTo(sessionId);

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
                        businessId: childSnapShot
                        .val()
                        .businessId,
                        sessionId: childSnapShot
                        .val()
                        .sessionId,


                };

                data.push(GSTData);
            });

            let sortedKeys = data.filter((res) => {
                return res.businessId === businessId;
              });

            this.setState({itemTypeList: sortedKeys, countPage: data.length, loading: false});
            console.log(this.state.itemTypeList);
    
        });
    }



  

   
    // itemCategoryList() {
    //     this.setState({ loading: true });
    //     var ref = firebase
    //       .database()
    //       .ref("dummy/")
    //       .orderByChild("sessionId")
    //       .equalTo(sessionStorage.getItem("RoleId"));
    
    //     ref.on("value", (snapshot) => {
    //       const data = [];
    //       snapshot.forEach((childSnapShot) => {
    //         const GSTData = {
    //           categoryId: childSnapShot.key.toString(),
    //           name: childSnapShot.val().name,
    //           isParent: childSnapShot.val().isParent,
    //           photo: childSnapShot.val().photo,
    //           color: childSnapShot.val().color,
    //           created_on: childSnapShot.val().created_on,
    //           parentId: childSnapShot.val().parentId,
    //           sessionId: childSnapShot.val().sessionId,
    //           username: childSnapShot.val().username,
              
    //         };
    
    //         data.push(GSTData);
    //       });
    //       let sortedKeys = data.filter((res) => {
    //         return res.parentId === "";
    //       });
    
    //       this.setState({
    //         CategoryList: sortedKeys,
    //         countPage: data.length,
    //         loading: false,
    //       });
    
    //       this.setState({
    //         currentCategory: [
    //           {
    //             id: "",
    //             name: "categories",
    //           },
    //         ],
    //       });
    //     });
    //   }
    //   explore = (e, name) => {
    //     e.preventDefault();
    //     let { id } = e.target;
    
    //     let exp = firebase
    //       .database()
    //       .ref("/dummy")
    //       .orderByChild("sessionId")
    //       .equalTo(sessionStorage.getItem("RoleId"));
    //     console.log("id", id, "name", name);
    //     exp.on("value", async (snapshot) => {
    //       const data = [];
    //       snapshot.forEach((childSnapShot) => {
    //         const GSTData = {
    //           categoryId: childSnapShot.key.toString(),
    
    //           name: childSnapShot.val().name,
    //           isParent: childSnapShot.val().isParent,
    //           photo: childSnapShot.val().photo,
    //           color: childSnapShot.val().color,
    //           created_on: childSnapShot.val().created_on,
    //           parentId: childSnapShot.val().parentId,
    //           sessionId: childSnapShot.val().sessionId,
    //           username: childSnapShot.val().username,
    //         };
    //         data.push(GSTData);
    //       });
    //       let sortedKeys = data.filter((res) => {
    //         return res.parentId === id;
    //       });
    //       this.setState({
    //         CategoryList: sortedKeys,
    //         countPage: data.length,
    //         loading: false,
    //       });
    //       let arr = this.state.currentCategory;
    //       for (let i = 0; i < this.state.currentCategory.length; i++) {
    //         console.log(arr);
    //         console.log(arr[i]);
    //         if (arr[i].id === id) {
    //           arr = arr.slice(0, i);
    //           break;
    //         }
    //       }
    //       console.log(arr);
    
    //       arr.push({
    //         id: id,
    //         name: name,
    //       });
    //       await this.setState({ currentCategory: arr });
    //       console.log(this.state.currentCategory);
    //     });
    //   };
    


    itemCategoryList() {

        var sessionId = sessionStorage.getItem("RoleId");
        var businessId = sessionStorage.getItem("businessId");
        this.setState({ loading: true });
        var ref = firebase
          .database()
          .ref("dummy/")
          .orderByChild("businessId")
          .equalTo(businessId);
    
        ref.on("value", (snapshot) => {
          const data = [];
          snapshot.forEach((childSnapShot) => {
            const GSTData = {
              categoryId: childSnapShot.key.toString(),
              name: childSnapShot.val().name,
              isParent: childSnapShot.val().isParent,
              photo: childSnapShot.val().photo,
              color: childSnapShot.val().color,
              created_on: childSnapShot.val().created_on,
              parentId: childSnapShot.val().parentId,
              sessionId: childSnapShot.val().sessionId,
              username: childSnapShot.val().username,
              businessId: childSnapShot
              .val()
              .businessId,
            
            };
    
            data.push(GSTData);
          });
          let sortedKeys = data.filter((res) => {
            return res.parentId === "";
          });
    
          this.setState({
            CategoryList: sortedKeys,
            countPage: data.length,
            loading: false,
          });
    
          this.setState({
            currentCategory: [
              {
                id: "",
                name: "categories",
              },
            ],
          });
        });
      }
      explore = (e, name) => {
        var sessionId = sessionStorage.getItem("RoleId");
        var businessId = sessionStorage.getItem("businessId");
        e.preventDefault();
        let { id } = e.target;
    
        let exp = firebase
          .database()
          .ref("/dummy")
          .orderByChild("businessId")
          .equalTo(businessId);
        console.log("id", id, "name", name);
        exp.on("value", async (snapshot) => {
          const data = [];
          snapshot.forEach((childSnapShot) => {
            const GSTData = {
              categoryId: childSnapShot.key.toString(),
    
              name: childSnapShot.val().name,
              isParent: childSnapShot.val().isParent,
              photo: childSnapShot.val().photo,
              color: childSnapShot.val().color,
              created_on: childSnapShot.val().created_on,
              parentId: childSnapShot.val().parentId,
              sessionId: childSnapShot.val().sessionId,
              username: childSnapShot.val().username,
            };
            data.push(GSTData);
          });
          let sortedKeys = data.filter((res) => {
            return res.parentId === id;
          });
          this.setState({
            CategoryList: sortedKeys,
            countPage: data.length,
            loading: false,
          });
          let arr = this.state.currentCategory;
          for (let i = 0; i < this.state.currentCategory.length; i++) {
            console.log(arr);
            console.log(arr[i]);
            if (arr[i].id === id) {
              arr = arr.slice(0, i);
              break;
            }
          }
          console.log(arr);
    
          arr.push({
            id: id,
            name: name,
          });
          await this.setState({ currentCategory: arr });
          console.log(this.state.currentCategory);
        });
      };


    stationList() {
        var sessionId = sessionStorage.getItem("RoleId");
        var businessId = sessionStorage.getItem("businessId");

        this.setState({loading: true});
        var ref = firebase
            .database()
            .ref("settings_station/").orderByChild("sessionId").equalTo(sessionId);

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
                        businessId: childSnapShot
                        .val()
                        .businessId,
                        sessionId: childSnapShot
                        .val()
                        .sessionId,
                        

                        
                };

                data.push(GSTData);
            });
            let sortedKeys = data.filter((res) => {
                return res.businessId === businessId;
              });
            this.setState({stationList: sortedKeys, countPage: data.length, loading: false});
            console.log(this.state.stationList);
    
        });
    }
    selectcategory =async (id,name) =>{
        console.log(id);
        // let arr = this.state.currentCategory;
        // let k =1;
        //   for (let i = 0; i < this.state.currentCategory.length; i++) {
        //     console.log(arr);
        //     console.log(arr[i]);
        //     if (arr[i].id === id) {
        //       arr = arr.slice(0, i);
        //       break;
        //     }
        //   }
         this.setState({parentName:name})
        //   console.log(arr);
    
        //   arr.push({
        //     id: id,
        //     name: name,
        //   });
        //   await this.setState({ currentCategory: arr });
        //   console.log(this.state.currentCategory);
        await this.setState({
            parentId:id,
        })
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


  
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
          
            var sessionId = sessionStorage.getItem("RoleId");
            var username = sessionStorage.getItem("username");
            var businessId = sessionStorage.getItem("businessId");
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
                // item_restaurant_id:this.state.item_restaurant_id,
                item_type:this.state.item_type,
                item_hash_tags:this.state.item_hash_tags,
                item_price:this.state.item_price,
                item_tax:this.state.item_tax,

           
                categoryId:this.state.parentId,


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
                
              
           
                businessId:businessId,







            });
            // window.location.href="/ViewItemMenu";
            this
                .props
                .history
                .push("/ViewItemMenu");
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
    <Link to="/AddCategoryMenuDuplicate">
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
<li><a href="/AddItemMenu" className="activemenu">Add Items</a></li>
<li><a href="/ViewItemMenu">View Items</a></li>
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




    </div>





    <div className="col-md-6">
    

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

{/* <Link to="/AddStation"></Link> */}
<div onClick={this.onOpenModal1} className="btn add_btn_pop_orange addmode_pad m-t-15">
Add Station</div>

{/* </button> */}
</div>
{this .validator.message("Station Name", this.state.station_name, "required")}
</div>



    
    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Business ID</label>
    </div>
    <div className="col-12 col-md-8">


    <input 
   
     value={ sessionStorage.getItem("businessId")} className="form-control"/>

 
    </div>
   
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
  
                                                    {/* <Link to="/AddItemType"></Link> */}
<div onClick={this.onOpenModal}  className="btn add_btn_pop_orange addmode_pad m-t-15">
Type Your own</div>

   
    </div>
    {this.validator.message("Item Type", this.state.item_type, "required")}
    </div>




    
    <div className="row form-group">
    <div className="col col-md-4">
    <label className=" form-control-label">Hash Tags</label>
    </div>
    <div className="col-12 col-md-8">
    <ul className="hashtags"  style={styles.container}>
          {this.state.item_hash_tags.map((item, i) => 
            <li key={i}  onClick={this.handleRemoveItem(i)}>
              {item}
           {/* (x) */}
            </li>
          )}
            <input

style={styles.input}
value={this.state.input}
onChange={this.handleInputChange}
onKeyDown={this.handleInputKeyDown} />
</ul>
        {/* <input type="text" name="item_hash_tags" onChange={this.onChange} value={this.state.item_hash_tags} className="form-control"/> */}
       
        <div>Press <b>Ctrl</b> To Enter the Hash Tag</div>
        </div>
      
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

    <div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Add to Catagory</label>
</div>
<div className="col-12 col-md-8 menu_cate_links">
<span> 
    {/* <a href="#">Menu</a>/<a href="#">MainCourse</a> */}

    <div
                  className='breadcrumbs'
                  style={{ fontSize: "12px", display: "flex" }}
                >
                  {this.state.currentCategory.map((i, index) => (
                    <p
                      style={{ marginLeft: "3px" }}
                      id={i.id}
                      
                    >
                      {" "}
                      &gt; {i.name}{" "}
                    </p>
                  ))}
                  <p>
                  <p
                      style={{ marginLeft: "3px" }}
                                      
                    >
                      {" "}
                      &gt; {this.state.parentName}{" "}
                    </p>
                  </p>
                </div>
    
    </span>
</div>
</div>

<div className="row form-group">
<div className="col col-md-12">
{/* <button type="button" className="btn btn-secondary mb-1" data-toggle="modal" data-target="#choose_category">
Choose Category
</button> */}
<span className="pull-right addmore_btn" data-toggle="modal" data-target="#choose_category">Choose Catagory</span>
</div>
</div>
    
    
    
  
    
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
{/* <select
                                                      className="form-control edit_product"
                                                        name="printer_name"
                                                        // value={printer_details.printer_name}
                                                        onChange={this.handleprinterShareholderNameChange(idx)}>
                                                        <option>Select Printer ID</option>
                                                        {this.state.printeridList && this
                                                            .state
                                                            .printeridList
                                                            .map((data, index) => {

                                                                return (
                                                                    <option value={data.printer_id}  id={data} key={index}>{data.printer_id}</option>
                                                                )

                                                            })}

                                                    </select> */}
<select name="recommenditem" value={recommendations.recommenditem} onChange={this.handleShareholderNameChange(idx)} id="select" className="form-control">
<option value="select">select Item</option>


    {this.state.itemMenuList && this
                                                            .state
                                                            .itemMenuList
                                                            .map((data, index) => {

                                                                return (
                                                                    <option value={data.item_name}  id={data} key={index}>{data.item_name}</option>
                                                                )

                                                            })}
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























    {open
                    ?  <Modal open={open} onClose={this.onCloseModal}>
                          
                                    <AddItemType onClose={this.onCloseModal}/>

                        </Modal>
                    : ''}
                        {open1
                    ?  <Modal open={open1} onClose={this.onCloseModal1}>
                          
                                    <AddStation onClose={this.onCloseModal1}/>

                        </Modal>
                    : ''}




    </div>


    <div
            className='modal fade'
            id='choose_category'
            tabindex='-1'
            role='dialog'
            aria-labelledby='smallmodalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog modal-sm hipal_pop' role='document'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='smallmodalLabel'>
                    Choose Parent Category
                  </h5>
                </div>
                {/* <div
                  className='breadcrumbs'
                  style={{ fontSize: "12px", display: "flex" }}
                >
                  {this.state.currentCategory.map((i, index) => (
                    <p
                      style={{ marginLeft: "3px" }}
                      id={i.id}
                      onClick={(e) => {
                        this.explore(e, i.name);
                      }}
                    >
                      {" "}
                      &gt; {i.name}{" "}
                    </p>
                  ))}
                </div> */}

                <div className='modal-body product_edit'>
                

<div className="col-12 w-100-row">
<div className="row">
<div className="col col-md-5 font-18">
Search by name
</div>
<div className="col col-md-7 bill_id_settle">
<div className="form-group">
<span className="pull-left"><input type="text" id="text-input" name="text-input" placeholder="T1" className="form-control edit_product"/></span>
<span className="btn pull-right add_btn_pop_orange bg_green addmode_pad">Go</span>
</div>
</div>
</div>
</div>



<div className="col-12 w-100-row">

<div className="row">

<div className="col col-md-12 font-15">
Menu :   <Link to="">  <div
                  className='breadcrumbs'
                  style={{ fontSize: "15px", display: "flex" }}
                >
                  {this.state.currentCategory.map((i, index) => (
                  <p
                      style={{ marginLeft: "3px" }}
                      id={i.id}
                      onClick={(e) => {
                        this.explore(e, i.name);
                      }}
                    >
                      {" "}
                      &gt; {i.name}{" "}
                    </p>
                   
                  ))}
                </div>
                </Link>
</div>

{/* <div className="col col-md-6 text-center">
<img src="images/icon/back_arrow_left_o.svg"/>
</div> */}

</div>
</div>

                  <div className='col-12 w-100-row'>
                    <div className='row'>
                      <div className='row'>
                        {this.state.CategoryList &&
                          this.state.CategoryList.map((category, index) => {
                            return (
                              <div
                              id={category.categoryId}
                              onClick={
                                    this.selectcategory.bind(this, category.categoryId,category.name)
                                }
                                
                         
                                className='col-md-4 mb-15 text-center'
                                key={index}
                              >
                                <div
                                  className='cate_img_box  shadow_box'
                                  style={{ background: category.color }}
                                >
                                  <img
                                    className='img_empty2'
                                    src={category.photo}
                                  ></img>

                                  <p> {category.name}</p>
                                </div>

                                {category.isParent === true ? (
                                  <button
                                    className='btn m-t-10 btn_explore'
                                    // data-toggle='modal'
                                    // data-target='#add_parent_category'
                                    id={category.categoryId}
                                    onClick={(e) => {
                                      this.explore(e, category.name);
                                    }}
                                  >
                                    Explore
                                  </button>
                                ) : null}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='modal-footer'>
                  <button type='button' className='btn save_btn' data-dismiss="modal">
                    Add here
                  </button>
                </div>
              </div>
            </div>
          </div>

    </>


        );
    }
}

export default AddItemMenu;
