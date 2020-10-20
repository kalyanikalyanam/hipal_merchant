import React from "react";
import firebase from '../config';
import Sidebar from './sidebar';
import Header from './header';
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import {Form} from 'reactstrap';
import {Link} from "react-router-dom";
import swal from 'sweetalert';
class SingleItempage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employee_position:'',
            employee_details:'',
            employee_task_list:'',
            employee_position_document:'',

            employer_sevice_message: "",
            validError:false,
            mobile_message: '',
            avatar: "",
            isUploading: false,
            progress: 0,
            avatarURL: "",
            filenames: [],
           uploadProgress: 0,

           employeePositionsList:[],
           portions_details: [
            {
                name: "",
               
                price: "",
               
            }
        ],
        created_on: new Date().toLocaleString(),
        };



        // this.onChange = this
        // .onChange
        // .bind(this);

        // this.deleteItem = this
        // .deleteItem
        // .bind(this);
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

        this.itemList();
           
       }

       itemList() {

        const {itemId} = this.props.match.params;
        console.log(itemId);
        this.setState({loading: false});
        var ref = firebase
            .database()
            .ref(`merchant_menu_items/${itemId}`);

        ref.on('value', snapshot => {
            var items = snapshot.val();

            this.setState({
                item_id:items.item_id,
                item_name:items.item_name,
                item_description:items.item_description,
                item_halal:items.item_halal,
                item_image:items.item_image,
                item_points:items.item_points,
    
                station_name:items.station_name,
                item_restaurant_id:items.item_restaurant_id,
                item_type:items.item_type,
                item_hash_tags:items.item_hash_tags,
                item_price:items.item_price,
                item_tax:items.item_tax,
    
               category:items.category,
               sub_category:items.sub_category,
    
    
                sessionId:items.sessionId,
                status: items.status,
                username:items.username,
    
    
    
                portions:items.portions,
                portions_details:items.portions_details,
    
    
    
                advance:items.advance,
                carbs:items.carbs,
                protien:items.protien,
                fat:items.fat,
                item_video:items.item_video,
                item_multiple_image:items.downloadURLs,
    
    
                extra:items.extra,
                healthytag:items.healthytag,
                bestsellertag:items.bestsellertag,
    
    
                recommend:items.recommend,
                // recommenditem:items. recommenditem,
                recommendations:items.recommendations,
    
    
                created_on:items.created_on,

               

            
            });

        });

    }

    handleSubmit = (event) => {
        event.preventDefault();
        var cartItems = JSON.parse(localStorage.getItem('cartItems'))||[];
        const {itemId} = this.props.match.params;
        

           
        var newItem =true;
       
        if (cartItems == null || cartItems == "") {

            newItem = true;
            console.log(newItem);
        } else {

            for (var i = 0; i < cartItems.length; i++) {
                if (cartItems[i]['itemId'] == itemId &&  newItem == true) {
                  
                    alert("The Item is already added to cart.");
                    newItem = false;
                    console.log(newItem);
                  
                } 

            }
        }
        if (newItem) {
            console.log(newItem);
            alert("Item addded to cart!.");
            var data = {
                itemId: itemId,
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

               category:this.state.category,
               sub_category:this.state.sub_category,


            
                status: this.state.status,
              



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


                quantity: this.state.quantity,
                item_discount:this.state.item_discount,
                
                item_status: this.state.item_status,
                item_instructions: this.state.item_instructions,

                created_on:this.state.created_on,

                
            }

            cartItems.push(data);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }

        this
            .props
            .history
            .goBack();

    
    

    };
        


    


   
      onChange = (event) => {

        this.setState({
            [event.target.name]: event.target.value
        });
    };
    render() {
        const {itemId} = this.props.match.params;
        return (
         
<>




<div className="modal-dialog modal-sm hipal_pop" role="document">
<Form onSubmit={this.handleSubmit}>
<div className="modal-content">


<div className="modal-header">
<h5 className="modal-title" id="smallmodalLabel">EDIT Item DEATILS 
</h5>
</div>


<div className="modal-body product_edit">


<div className="col-12 w-100-row">
<h1>{this.state.item_name} </h1>
</div>




<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Quantity</label>
</div>
<div className="col-12 col-md-6">
<select 
  name="quantity"
  onChange={this.onChange}
  value={this.state.quantity}
id="select" className="form-control edit_product">
<option value="0">select</option>
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
<option value="5">5</option>
<option value="6">6</option>
<option value="7">7</option>
<option value="8">8</option>
<option value="9">9</option>
<option value="10">10</option>
<option value="11">11</option>
<option value="12">12</option>
</select>
</div>

{this.validator.message("Quantity", this.state.quantity, "required")}
</div>
</div>

<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Add Item Discount</label>
</div>
<div className="col-12 col-md-6">
<select 
 name="item_discount"
 onChange={this.onChange}
 value={this.state.item_discount}
id="select" className="form-control edit_product">
    <option value="0">select</option>
<option value="10">10%</option>
<option value="15">15%</option>
<option value="20">20%</option>
</select>
</div>
{this.validator.message("Discount", this.state.item_discount, "required")}
</div>
</div>


{/* <div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Username</label>
</div>
<div className="col-12 col-md-6">
<input type="text" id="text-input" name="text-input" placeholder="" className="form-control edit_product"/>
</div>
</div>
</div>


<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className="form-control-label">Password</label>
</div>
<div className="col-12 col-md-6">
<input type="password" id="text-input" name="text-input" placeholder="******" className="form-control edit_product"/>

<p className="error">Username / Password is incorrect</p>

<p><span className="btn con-btn-pop">Confirm</span><span className="offfer_applied_pop">Discount Applied</span></p>

</div>
</div>
</div> */}


{/* <div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className="form-control-label">Portion</label>
</div>
{this.state.portions=="Yes"?

<>
{this
                                                                .state
                                                                .portions_details&&this
                                                                .state
                                                                .portions_details
                                                                // .slice(0, this.state.desired_Machines)
                                                                .map((portions_details, idx) => (
<div className="col-12 col-md-6"  key={idx}>


    

<label className="container_check">{portions_details.name}
  <input type="checkbox" checked="checked"/>
  <span className="checkmark"></span>
</label>


<label className="container_check">Half
  <input type="checkbox"/>
  <span className="checkmark"></span>
</label>


<label className="container_check">Full
  <input type="checkbox"/>
  <span className="checkmark"></span>
</label>

</div>
  ))}
</>
:
''
}


</div></div> */}





<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Status</label>
</div>
<div className="col-12 col-md-6">
<select 
 name="item_status"
 onChange={this.onChange}
 value={this.state.item_status}
id="select" className="form-control edit_product">
    <option value="0">select</option>
<option value="Active">Active</option>
<option value="Inactive">Inactive</option>
</select>
</div>
{this.validator.message("Status", this.state.item_status, "required")}
</div>
</div>


<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Instructions</label>
</div>
<div className="col-12 col-md-6">
<textarea
 name="item_instructions"
 onChange={this.onChange}
 value={this.state.item_instructions}
id="textarea-input" rows="3" placeholder="Enter text here" className="form-control edit_product"></textarea>


</div>

{this .validator.message("Item Instructions", this.state.item_instructions, "required|whitespace|min:2|max:70")}
</div>
</div>




</div>



<div className="modal-footer">
<button type="button" className="btn close_btn" data-dismiss="modal">Close </button>
<button type="submit" className="btn save_btn">Save</button>
</div>


</div>
</Form>
</div>

           
            </>  
                                                                                               
        );
    }
}



export default SingleItempage;
