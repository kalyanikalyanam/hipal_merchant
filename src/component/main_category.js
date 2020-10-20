import React from "react";
import firebase from '../config';
import Sidebar from './sidebar';
import Header from './header';
import {Link, withRouter} from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import {Form} from 'reactstrap';
import CartView from "./cart_view";
class MainCategory extends React.Component {
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
    

    componentWillMount() {
   
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
                        category_photo:childSnapShot
                        .val().category_photo,
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
	
	




    render() {
        return (
          
  
 <div className="col-md-12 menu_category_block p-0">
  <div className="category_menu_search">
  <span className="cate_menu">
  <a href="view_table.html" className="current">Menu</a> / 
  <a href="view_table_1.html">Category 1</a> / 
  <a href="view_table_2.html">Category 2</a>
  </span>
  <span className="cate_search">
  <input type="text" placeholder="Search"/>
  <a href="#" className="search_icon"><i className="fas fa-search"></i></a>
  </span>
  </div>
  
  
  <div className="cate_images_blk">
  
  <div className="row">


  

{this
                                                .state
                                                .categoryList&&this.state.categoryList
                                                .map((data, index) => {

                                                    return (
  <div className="col-md-4 mb-15"  key={index}>
      <Link to={`/ViewTables1/${data.category}`}>
  <div className="cate_img_box"style={{background:"#fd0606"}}>

  <img src="/images/category_img.png"/>
  
  <p> {data.category}</p>
                                           
  </div>
  </Link>
  </div>
          
         )

        })}
 
  
  
  
  
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



export default MainCategory;


