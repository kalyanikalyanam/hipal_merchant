import React from "react";
import firebase from '../config';
import Sidebar from './sidebar';
import Header from './header';
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import {Form} from 'reactstrap';
import {Link} from "react-router-dom";
import swal from 'sweetalert';
class FloorList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            created_on: new Date().toLocaleString(),

         
         
        };



        this.onChange = this
        .onChange
        .bind(this);

        this.deleteItem = this
        .deleteItem
        .bind(this);

        this.viewFloor = this
        .viewFloor
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

        this.floorsList();
      
           
       }

       floorsList=()=>{

        this.setState({loading: true});
        var ref = firebase
            .database()
            .ref("floors/");

        ref.on('value', snapshot => {
            const data = [];
            snapshot.forEach(childSnapShot => {

                const GSTData = {
                    floorId: childSnapShot.key .toString(),
                       
                    floor_capacity: childSnapShot.val().floor_capacity,
                    floor_name: childSnapShot.val().floor_name,
                    floor_notes: childSnapShot.val().floor_notes,
                       
                        


                };

                data.push(GSTData);
            });

            this.setState({floorsList: data, countPage: data.length, loading: false});
            console.log(this.state.floorsList);
    
        });


    }

    viewFloor= id=> {
        const {floorTd} = this.props.match.params;
        console.log(floorTd);
  
        var ref = firebase
            .database()
            .ref(`floors/${id}`);
  
        ref.on('value', snapshot => {
            var userData = snapshot.val();
            console.log(userData)
            this.setState({
              floor_capacity: userData.floor_capacity,
                    floor_name: userData.floor_name,
                    floor_notes: userData.floor_notes,
  
             
            });
            //console.log(this.state.pageTitle);
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

    handleEmployeePhotoSuccess = (filename) => {

        firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(url => this.setState({employee_photo: url}));
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
          
            var sessionId = sessionStorage.getItem("RoleId");
            var username = sessionStorage.getItem("username");

            let dbCon = firebase
                .database()
                .ref('/floors');
                var key=(Math.round((new Date().getTime() / 1000))); 
            
              
            dbCon.push({
              
                created_on:this.state.created_on,



                floor_capacity:this.state.floor_capacity,
                floor_name:this.state.floor_name,
                floor_notes:this.state.floor_notes,
               



              
              
                
                sessionId:sessionId,
                username:username,

               
           
        
             });
           

             window.location.href="/FloorList";
            // this
            //     .props
            //     .history
            //     .push("/AllEmployees");
        } else {
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




    deleteItem = id => {
        swal({title: "Are you sure?", text: "Do your really want to remove?", icon: "warning", buttons: true, dangerMode: true}).then(willDelete => {
            if (willDelete) {
        console.log(id);
        var playersRef = firebase
            .database()
            .ref(`/floors/${id}`);
        playersRef.remove();
            }else{
    
            }
    });
    };

      onChange = (event) => {

        this.setState({
            [event.target.name]: event.target.value
        });
    };
  

    render() {
        return (
            <>
            <div className="page-wrapper">
   

         <Sidebar/>
    
            {/* <!-- PAGE CONTAINER--> */}
            <div className="page-container">
                <Header/>
       
                {/* <header className="header-desktop">
                
                <div className="logo_hipal">
                    <a href="#">
                        <img src="/images/icon/logo.svg" alt="Hipal Admin" />
                    </a>
                </div>
                
                
                Welcome Back Varun
                </header> */}
                {/* <!-- HEADER DESKTOP--> */}
    
                {/* <!-- MAIN CONTENT--> */}
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
    <input className="search_input" type="text" name="" id="myInput" placeholder="Search..."/>
    </div>
    </div>
    
    <div className="col-md-4 ">
    <div className="profile_user">
    <span className="usericon">
    <img src="/images/icon/profile.jpg"/>
    </span>
    <span className="profile_data">
    <p className="name"> {sessionStorage.getItem("username")}</p>
    <p>{sessionStorage.getItem("email")}</p>
    </span>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    
    
    
    <div className="row mt-30">
    
    <div className="col-md-5 p-0">
    <div className="overview-wrap">
    <div className="order_btns">
    <button type="button"  data-toggle="modal" data-target="#add_floor">
    <span className="btn add_ord m-l-0">
   <img src="/images/icon/add_plus_icon_w.svg"/> 

  


    ADD Floors
    </span>
    </button>
    
  
    </div>
    </div>
    </div>
            
            
    <div className="col-md-7 p-0">
    <div className="track_box">
    
    
    <div className="track_ord_block">
    <div className="track_bg">
    <div className="track-50">
    <form>
    <div className="input-group">
    <input type="text" className="form-control" placeholder="Track here"/>
    
    </div>
    </form>
    </div>
    <div className="track-50 line-tack">
    <span><img src="/images/icon/green_order_prepare.svg"/></span>Order is being prepared
    </div>
    </div>
    </div>
    </div>
    </div>
                        
    </div>
    
    
    <div className="row mt-30">
    <div className="col-md-12 p-0">
    <div className="orders_menu">
    <ul>
    <li><a href="/FloorList" className="activemenu">Floors</a></li>

<li><a href="/TablesList">Tables</a></li>

    
    
    </ul>
    </div>
    </div>			
    </div>
    
    
    
    
    <div className="row mt-30">
    <div className="col-md-12 p-0 employes_table">
    
    <div className="table-responsive table-data">
    <table className="table">
    <thead>
    
    <tr>
    <td>S.no</td>
    <td>Floor Name</td>
    <td>Capacity</td>
    <td>Actions</td>
    
   
    </tr>
    
    </thead>
    <tbody id="myTable">
    {this.state.floorsList && this.state.floorsList.map((floor,index) => {
return (
    
<tr key={index}> 
<td>{index+1}</td>
    
   
    <td>{floor.floor_name}</td>
    <td>{floor.floor_capacity}</td>
   
  

    
    <td> 
    <Link to={`/EditFloor/${floor.floorId}`}>
        <img src="images/icon/edit_icon_blue.svg" className="edit_delete"/>
        </Link>

     <img src="images/icon/delete_cross.svg" onClick={this.deleteItem.bind(this, floor.floorId)} className="edit_delete"/>
     <button type="button"  data-toggle="modal" data-target="#view_floor">
     <span className="btn view_order_btn_td" onClick={this.viewFloor.bind(this, floor.floorId)}>View Table</span>
     </button>
     </td>
    </tr>
    
   
)})}
    
    
    
    
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


    <div className="modal fade" id="add_floor" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true">
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
<button type="button" className="btn close_btn" data-dismiss="modal">Close</button>
<button type="submit" className="btn save_btn">Save</button>
</div>
</Form>

</div>
</div>
</div>


 


<div className="modal fade" id="view_floor" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true">
<div className="modal-dialog modal-sm hipal_pop" role="document">
<div className="modal-content">


<div className="modal-header">
<h5 className="modal-title" id="smallmodalLabel">View  Floor
</h5></div>


<div className="modal-body product_edit">


<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Floor Name</label>
</div>
<div className="col-12 col-md-6">
{this.state.floor_name}
</div>
</div>
</div>


<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Capacity</label>
</div>
<div className="col-12 col-md-6">
{this.state.floor_capacity}
</div>
</div>
</div>


<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Notes</label>
</div>
<div className="col-12 col-md-6">
{this.state.floor_notes}
</div>
</div>
</div>




</div>



<div className="modal-footer">
<button type="button" className="btn close_btn" data-dismiss="modal">Close</button>

</div>

</div>
</div>
</div>

    </>
              
                                                                                               
        );
    }
}

export default FloorList;