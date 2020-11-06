import React from "react";
import firebase from '../config';
import Sidebar from './sidebar';
import Header from './header';
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import {Form} from 'reactstrap';
import {Link} from "react-router-dom";


class EditFloor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            created_on: new Date().toLocaleString(),
            table_name:'',
            table_capacity:"",
            table_floor:"",
            
            table_icon:'',
            table_notes:'',
            

           

            table_qrcode:'',
            status:"Vacant",
         
         
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
        var businessId = sessionStorage.getItem("businessId");
        if (sessionId) {
          //console.log(sessionId);
    
          firebase
            .database()
            .ref("merchant_users/" + sessionId)
            .on("value", (snapshot) => {
              var Users = snapshot.val();
              //console.log(Users);
              sessionStorage.setItem("username", Users.user_name);
              sessionStorage.setItem("email", Users.email_id);
    
              this.setState({
                userRole: Users.Role,
                loading: false,
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

        this.floorList();
  
  
           
       }

     
    floorList=()=>{

        const {floorId} = this.props.match.params;
        this.setState({loading: true});
        var ref = firebase
            .database()
            .ref(`floors/${floorId}`);

            ref.on('value', snapshot => {
                var floor = snapshot.val();
    
                // console.log(categories)
    
                this.setState({
                   
                       
                    floor_capacity: floor.floor_capacity,
                    floor_name: floor.floor_name,
                    floor_notes: floor.floor_notes,

                        
                   });
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

    handleTableIconSuccess = (filename) => {

        firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(url => this.setState({table_icon: url}));
    };

    handleAdharPhotoSuccess = (filename) => {

        firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(url => this.setState({employee_adharcard: url}));
    };



    

 
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
            const {floorId}=this.props.match.params;
            var sessionId = sessionStorage.getItem("RoleId");
            var businessId = sessionStorage.getItem("businessId");
            var username = sessionStorage.getItem("username");

            let dbCon = firebase.database().ref(`/floors/${floorId}`);
                var key=(Math.round((new Date().getTime() / 1000))); 
            
              
           dbCon.update ({
              
                created_on:this.state.created_on,

                floor_capacity:this.state.floor_capacity,
                floor_name:this.state.floor_name,
                floor_notes:this.state.floor_notes,
                
              
                sessionId:sessionId,
                username:username,
                businessId:businessId,
               
           
        
             });
             window.location.href="/FloorList";
             // this
             //     .props
             //     .history
             //     .push("/AllEmploTablesListees");
            }
           
 else {
            this
                .validator
                .showMessages();
            this.forceUpdate();
          }
      };
    
      floornameChange  = (e) => {
        this.setState({
            floor_name: e.target.value
        });
        if(this.state.validError!=true){
           
            
            var ref = firebase
            .database()
            .ref('floors/').orderByChild("floor_name").equalTo(e.target.value);
            ref.on('value', snapshot => {
                var  user_exist = snapshot.numChildren();
                console.log(user_exist);
           
            if(user_exist>0 && this.state.validError!=true){
               
               
                this.setState({mobile_message: "Floor Name already exist",validError:false});

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
            <>
        {/* <div className="modal fade" id="edit_floor" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true"> */}
<div className="modal-dialog modal-sm hipal_pop" role="document">
<div className="modal-content">


<div className="modal-header">
<h5 className="modal-title" id="smallmodalLabel">Add  Floor
</h5></div>

<Form onSubmit={this.handleSubmit}>
<div className="modal-body product_edit">


<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Floor Name</label>
</div>
<div className="col-12 col-md-6">
<input type="text" id="text-input" 
 name="floor_name"
 value={this.state.floor_name}
 onChange={this.floornameChange}
placeholder="First Floor" className="form-control edit_product"/>
</div>
{this .validator.message("Floor Name", this.state.floor_name, "required|whitespace|min:2|max:70")}
</div>
</div>


<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Capacity</label>
</div>
<div className="col-12 col-md-6">
<select 
 name="floor_capacity"
 value={this.state.floor_capacity}
 onChange={this.onChange}
id="select" className="form-control edit_product">
<option value="0">Select Capacity</option>
<option value="60 Members">60 Members</option>
<option value="80 Members">80 Members</option>
<option value="100 Members">100 Members</option>
</select>
</div>
{this .validator.message("Capacity", this.state.floor_capacity, "required")}
</div>
</div>


<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Notes</label>
</div>
<div className="col-12 col-md-6">
<textarea 
 name="floor_notes"
 value={this.state.floor_notes}
 onChange={this.onChange}
id="textarea-input" rows="3" placeholder="Table on first floor with window view" className="form-control edit_product"></textarea>


</div>

{this .validator.message("Floor Name", this.state.floor_notes, "required|whitespace|min:2|max:150")}
</div>
</div>




</div>



<div className="modal-footer">
    <Link to="/FloorList">
<button type="button" className="btn close_btn" data-dismiss="modal">Close</button>
</Link>
<button type="submit" className="btn save_btn">Save</button>
</div>
</Form>

</div>
</div>
{/* </div> */}



          </>
              
                                                                                               
        );
    }
}

export default EditFloor;
