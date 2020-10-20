import React from "react";
import firebase from '../config';
import Sidebar from './sidebar';
import Header from './header';
import {Link, withRouter} from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import {Form} from 'reactstrap';
import CartView from "./cart_view";
class MainSubCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          employer_sevice_message:'',
          table_name:'',
                    table_capacity:'',
                    table_floor:'',

                    table_icon:'',
                    table_notes:'',

                  table_qrcode:'',
                  status:'',
                  created_on: new Date().toLocaleString(),

                  customer_name:'',
                  customer_number:'',
        };
    
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
    


componentDidMount(){
    const {plpID}=this.props.match.params;
    this.itensDetails(plpID);
    this.cartView();
}


cartView() {
  this.setState({loading: false});

  var cartItems = JSON.parse(localStorage.getItem('cartItems'));

  this.setState({
      cartList: cartItems,
      cartCount: cartItems
          ? cartItems.length
          : 0,
      loading: true
  });

}

componentWillReceiveProps(nextProps, prevState) {
    console.log(nextProps);
    const {plpID}=nextProps.match.params;
    this.itensDetails(plpID);
   
}
    itensDetails(plpID) {
       
        this.setState({loading: false});
    console.log(plpID);
        var ref = firebase
            .database()
            .ref(`merchant_menu_items`).orderByChild("category").equalTo(plpID);
       

        ref.on('value', snapshot => {
            const data = [];
             console.log(snapshot.val());

            snapshot.forEach(childSnapShot => {

                const Products = {
                    itemId: childSnapShot
                        .key
                        .toString(),
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
            
            
                        sessionId:childSnapShot.val().sessionId,
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
                        // recommenditem:childSnapShot.val(). recommenditem,
                        recommendations:childSnapShot.val().recommendations,
            
            
                        created_on:childSnapShot.val().created_on,
                };

                data.push(Products);
            });

            this.setState({itemList: data, loading: true});
            console.log(this.state.itemList);

        });

    }





    render() {
        return (
          
  
            <div className="col-md-12 menu_category_block p-0">
            <div className="category_menu_search">
            <span className="cate_menu">
            <a href="view_table.html">Menu</a> / 
            <a href="view_table_1.html"  className="current">Category 1</a> / 
            <a href="view_table_2.html">Category 2</a>
            </span>
            <span className="cate_search">
            <input type="text" placeholder="Search"/>
            <a href="#" className="search_icon"><i className="fas fa-search"></i></a>
            </span>
            </div>
            
            
            <div className="cate_images_blk">
            
            <div className="row">
            {this.state.itemList&&this.state.itemList.map((data, index) => {
        
        return (
            <div className="col-md-4 mb-15"  key={index}>
             
            <div className="cate_img_box"style={{background:"#fd0606"}}>
            <Link to={`/MainItems/${data.sub_category}`}>
            <img src={data.item_image} className="img_empty"/>
        <p> {data.sub_category}</p>
        </Link>
            </div>
          
            </div>
        )})
        
            }
            
           
            
            
            </div>
            
            
            <div cl="row">
            <div className="pagi_nation w-100">
            <a href="#" className="activepage">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            </div>
            </div>
            
            </div>
            
            
            
            
            </div>
  
  
 
               
        );
    }
}



export default MainSubCategory;


