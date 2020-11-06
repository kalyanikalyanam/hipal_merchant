import React from "react";
import firebase from '../config';
import Sidebar from './sidebar';
import Header from './header';
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import {Form} from 'reactstrap';
import {Link} from "react-router-dom";
import Doc from './DocService';
import PdfContainer from './PdfContainer';
import swal from 'sweetalert';
class TablesList extends React.Component {
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

        this.deleteItem = this
        .deleteItem
        .bind(this);

        this.viewTable = this
        .viewTable
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

        this.floorsList();
      this.tableList();
 
           
       }

       floorsList=()=>{
        var sessionId = sessionStorage.getItem("RoleId");
        var businessId = sessionStorage.getItem("businessId");
        this.setState({loading: true});
        var ref = firebase
            .database()
            .ref("floors/").orderByChild("sessionId").equalTo(sessionId);

        ref.on('value', snapshot => {
            const data = [];
            snapshot.forEach(childSnapShot => {

                const GSTData = {
                    floorId: childSnapShot.key .toString(),
                       
                    floor_capacity: childSnapShot.val().floor_capacity,
                    floor_name: childSnapShot.val().floor_name,
                    floor_notes: childSnapShot.val().floor_notes,
                    sessionId: childSnapShot.val().sessionId,
                    businessId: childSnapShot.val().businessId,
                        


                };

                data.push(GSTData);
            });

            let sortedKeys = data.filter((res) => {
                return res.businessId === businessId;
              });

            this.setState({floorsList: sortedKeys, countPage: data.length, loading: false});
            console.log(this.state.floorsList);
    
        });


    }

    tableList=()=>{
        var sessionId = sessionStorage.getItem("RoleId");
        var businessId = sessionStorage.getItem("businessId");

        this.setState({loading: true});
        var ref = firebase
            .database()
            .ref("tables_with_floors/").orderByChild("sessionId").equalTo(sessionId);

        ref.on('value', snapshot => {
            const data = [];
            snapshot.forEach(childSnapShot => {

                const GSTData = {
                    tableId: childSnapShot.key .toString(),
                       
                    table_name: childSnapShot.val().table_name,
                    table_capacity: childSnapShot.val().table_capacity,
                    table_floor: childSnapShot.val().table_floor,

                    table_icon: childSnapShot.val().table_icon, 
                    table_notes: childSnapShot.val().table_notes,

                  table_qrcode:  childSnapShot.val().table_qrcode,
                  status:childSnapShot.val().status,
                  sessionId: childSnapShot.val().sessionId,
                  businessId: childSnapShot.val().businessId,


                };

                data.push(GSTData);
            });
            let sortedKeys = data.filter((res) => {
                return res.businessId === businessId;
              });

            this.setState({tableList: sortedKeys, countPage: data.length, loading: false});
            console.log(this.state.tableList);
    
        });



    }

    viewTable= id=> {
        const {tableId} = this.props.match.params;
        console.log(tableId);
  
        var ref = firebase
            .database()
            .ref(`tables_with_floors/${id}`);
  
        ref.on('value', snapshot => {
            var userData = snapshot.val();
            console.log(userData)
            this.setState({
              table_name:userData.table_name,
              table_capacity:userData.table_capacity,
              table_floor:userData.table_floor,
              table_icon:userData.table_icon,
              table_notes:userData.table_notes,
              table_qrcode:userData.table_qrcode,
              status:userData.status,
  
             
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
          
            var sessionId = sessionStorage.getItem("RoleId");
            var username = sessionStorage.getItem("username");
            var businessId = sessionStorage.getItem("businessId");
            let dbCon = firebase
                .database()
                .ref('/tables_with_floors');
                var key=(Math.round((new Date().getTime() / 1000))); 
            
              
            dbCon.push({
              
                created_on:this.state.created_on,



                table_name:this.state.table_name,
                table_capacity:this.state.table_capacity,
                table_floor:this.state.table_floor,
                
                table_icon:this.state.table_icon,
                table_notes:this.state.table_notes,
                status:"Vacant",
                

               

                table_qrcode: "https://chart.googleapis.com/chart?cht=qr&chl="+this.state.table_name+"&chs=160x160&chld=L|0",

              
              
                
                sessionId:sessionId,
                username:username,
                businessId:businessId,
               
           
        
             });
           

             window.location.href="/TablesList";
            // this
            //     .props
            //     .history
            //     .push("/AllEmploTablesListees");
        } else {
            this
                .validator
                .showMessages();
            this.forceUpdate();
        }

    };

 


    tablenameChange  = (e) => {
        this.setState({
            table_name: e.target.value
        });
        if(this.state.validError!=true){
           
            
            var ref = firebase
            .database()
            .ref('tables_with_floors/').orderByChild("table_name").equalTo(e.target.value);
            ref.on('value', snapshot => {
                var  user_exist = snapshot.numChildren();
                console.log(user_exist);
           
            if(user_exist>0 && this.state.validError!=true){
               
               
                this.setState({mobile_message: "Table Name already exist",validError:false});

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
            .ref(`/tables_with_floors/${id}`);
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
  
    createPdf = (html) => Doc.createPdf(html);

    render() {

        var qrcode="https://chart.googleapis.com/chart?cht=qr&chl="+this.state.table_name+"&chs=160x160&chld=L|0";

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
                        <img src="images/icon/logo.svg" alt="Hipal Admin" />
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
    
    
    
    <div className="row mt-30">
    
    <div className="col-md-5 p-0">
    <div className="overview-wrap">
    <div className="order_btns">
    <button type="button"  data-toggle="modal" data-target="#add_table">
    <span className="btn add_ord m-l-0">
   <img src="images/icon/add_plus_icon_w.svg"/> 

  


    ADD Tables
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
    <span><img src="images/icon/green_order_prepare.svg"/></span>Order is being prepared
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
    <li><a href="/FloorList">Floors</a></li>

    <li><a href="/TablesList"  className="activemenu">Tables</a></li>

    
    
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
    <td>Table Number</td>
    <td>Table Capacity</td>
    <td>Table floor</td>
    <td>Table Icon</td>
    <td>Actions</td>
    
   
    </tr>
    
    </thead>
    <tbody  id="myTable">
    {this.state.tableList && this.state.tableList.map((table,index) => {
return (
    
<tr key={index}> 
<td>{index+1}</td>
    
   
    <td>{table.table_name}</td>
    <td>{table.table_capacity}</td>
    <td>{table.table_floor}</td>
    <td><img src={table.table_icon} width="15%"/></td>
   
  

    
    <td>
    <Link to={`/EditTable/${table.tableId}`}>
        <img src="images/icon/edit_icon_blue.svg" className="edit_delete"/>
 </Link>
     <img src="images/icon/delete_cross.svg" onClick={this.deleteItem.bind(this, table.tableId)} className="edit_delete"/>
     <button type="button"  data-toggle="modal" data-target="#view_table">

  
     <span className="btn view_order_btn_td" onClick={this.viewTable.bind(this, table.tableId)}>View Table</span></button>
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


   


<div className="modal fade" id="add_table" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true">
<div className="modal-dialog modal-sm hipal_pop" role="document">
<div className="modal-content">

<Form onSubmit={this.handleSubmit}>
<div className="modal-header">
<h5 className="modal-title" id="smallmodalLabel">Add Table 
</h5></div>


<div className="modal-body product_edit">


<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Table Name</label>
</div>
<div className="col-12 col-md-6">
<input type="text" id="text-input" 
 name="table_name"
 value={this.state.table_name}
 onChange={this.tablenameChange}
placeholder="T1" className="form-control edit_product"/>
</div>
{this .validator.message("Table Name", this.state.table_name, "required|whitespace|min:2|max:70")}
</div>
</div>


<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Capacity</label>
</div>
<div className="col-12 col-md-6">
<select 
 name="table_capacity"
//  value={this.state.table_capacity}
 onChange={this.onChange}
id="select" className="form-control edit_product">
<option value={this.state.table_capacity}>Select Capacity</option>
<option value="1 Members">1 Members</option>
<option value="2 Members">2 Members</option>
<option value="3 Members">3 Members</option>
<option value="4 Members">4 Members</option>
<option value="5 Members">5 Members</option>
<option value="6 Members">6 Members</option>
<option value="7 Members">7 Members</option>
<option value="8 Members">8 Members</option>
<option value="9 Members">9 Members</option>
<option value="10 Members">10 Members</option>
</select>
</div>
{this .validator.message("Table Capacity", this.state.table_capacity, "required")}
</div>
</div>

<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Icon</label>
</div>
<div className="col-12 col-md-6">


{this.state.table_icon && <img src={this.state.table_icon} />}
                                                 <FileUploader
                                                accept="image/*"
                                                name="table_icon"
                                                randomizeFilename
                                                storageRef={firebase
                                                .storage()
                                                .ref("images")}
                                                onUploadStart={this.handleFrontImageUploadStart}
                                                onUploadError={this.handleUploadError}
                                                onUploadSuccess={this.handleTableIconSuccess}
                                                onProgress={this.handleProgress}/>
{/* <div className="upload_img upload_small_icn">
 <div className="form-group">
	<div className="img_show icon_small"><img id="img-upload"/></div>
       <div className="input-group">
            <span className="input-group-btn">
                <span className="btn btn-default btn-file">
                    Upload Icon <input type="file" id="imgInp"/>
                </span>
            </span>
            <input type="text" className="form-control" readonly=""/>
        </div>
        
    </div></div> */}



</div>
{this .validator.message("Table Capacity", this.state.table_icon, "required")}
</div>
</div>
<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Floor</label>
</div>
<div className="col-12 col-md-6">
<select
                                                        className="form-control edit_product"
                                                        name="table_floor"
                                                        onChange={this.onChange}>
                                                        <option>Select Floor</option>
                                                        {this.state.floorsList && this
                                                            .state
                                                            .floorsList
                                                            .map((data, index) => {

                                                                return (
                                                                    <option value={data.table_floor} key={index}>{data.floor_name}</option>
                                                                )

                                                            })}

                                                    </select>
</div>
{this .validator.message("Table Floor", this.state.table_floor, "required")}
</div>
</div>

<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Notes</label>
</div>
<div className="col-12 col-md-6">
<textarea 
name="table_notes"
value={this.state.table_notes}
onChange={this.onChange}
id="textarea-input" rows="3" placeholder="Table on first floor with window view" className="form-control edit_product"></textarea>
</div>
{this .validator.message("Table Notes", this.state.table_notes, "required|whitespace|min:2|max:150")}
</div>
</div>

<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">QR</label>
</div>
<div className="col-12 col-md-6">

<span className="pop_qr">
<img src={qrcode}/>
{/* <img src="images/icon/QR_1.svg"/> */}
</span>



</div>
</div>
</div>





</div>



<div className="modal-footer">
<button type="button" className="btn close_btn" data-dismiss="modal">Cancel</button>
<button type="submit" className="btn save_btn">Save</button>
</div>

</Form>
</div>
</div>
</div>




{/* <div className="modal fade" id="edit_table" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true">
<div className="modal-dialog modal-sm hipal_pop" role="document">
<div className="modal-content">

<Form onSubmit={this.TableEditSubmit}>
<div className="modal-header">
<h5 className="modal-title" id="smallmodalLabel">Edit Table
</h5></div>


<div className="modal-body product_edit">


<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Table Name</label>
</div>
<div className="col-12 col-md-6">
<input type="text" id="text-input" 
 name="table_name"
 value={this.state.table_name}
 onChange={this.tablenameChange}
placeholder="T1" className="form-control edit_product"/>
</div>
{this .validator.message("Table Name", this.state.table_name, "required|whitespace|min:2|max:70")}
</div>
</div>


<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Capacity</label>
</div>
<div className="col-12 col-md-6">
<select 
 name="table_capacity"
 value={this.state.table_capacity}
 onChange={this.onChange}
id="select" className="form-control edit_product">
<option value="0">Select Capacity</option>
<option value="1 Members">1 Members</option>
<option value="2 Members">2 Members</option>
<option value="3 Members">3 Members</option>
<option value="4 Members">4 Members</option>
<option value="5 Members">5 Members</option>
<option value="6 Members">6 Members</option>
<option value="7 Members">7 Members</option>
<option value="8 Members">8 Members</option>
<option value="9 Members">9 Members</option>
<option value="10 Members">10 Members</option>
</select>
</div>
{this .validator.message("Table Capacity", this.state.table_capacity, "required")}
</div>
</div>

<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Icon</label>
</div>
<div className="col-12 col-md-6">


{this.state.table_icon && <img src={this.state.table_icon} />}
                                                 <FileUploader
                                                accept="image/*"
                                                name="table_icon"
                                                randomizeFilename
                                                storageRef={firebase
                                                .storage()
                                                .ref("images")}
                                                onUploadStart={this.handleFrontImageUploadStart}
                                                onUploadError={this.handleUploadError}
                                                onUploadSuccess={this.handleTableIconSuccess}
                                                onProgress={this.handleProgress}/>



</div>
{this .validator.message("Table Capacity", this.state.table_icon, "required")}
</div>
</div>
<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Floor</label>
</div>
<div className="col-12 col-md-6">
<select
                                                        className="form-control edit_product"
                                                        name="table_floor"
                                                        onChange={this.onChange}>
                                                        <option>Select Floor</option>
                                                        {this.state.floorsList && this
                                                            .state
                                                            .floorsList
                                                            .map((data, index) => {

                                                                return (
                                                                    <option value={data.floor_name} key={index}>{data.floor_name}</option>
                                                                )

                                                            })}

                                                    </select>
</div>
{this .validator.message("Table Floor", this.state.table_floor, "required")}
</div>
</div>

<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Notes</label>
</div>
<div className="col-12 col-md-6">
<textarea 
name="table_notes"
value={this.state.table_notes}
onChange={this.onChange}
id="textarea-input" rows="3" placeholder="Table on first floor with window view" className="form-control edit_product"></textarea>
</div>
{this .validator.message("Table Notes", this.state.table_notes, "required|whitespace|min:2|max:150")}
</div>
</div>

<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">QR</label>
</div>
<div className="col-12 col-md-6">

<span className="pop_qr">
<img src={qrcode}/>

</span>



</div>
</div>
</div>





</div>



<div className="modal-footer">
<button type="button" className="btn close_btn" data-dismiss="modal">Cancel</button>
<button type="update" className="btn save_btn">Save</button>
</div>

</Form>
</div>
</div>
</div> */}





<div className="modal fade" id="view_table" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true">
<div className="modal-dialog modal-sm hipal_pop" role="document">
<div className="modal-content">


<div className="modal-header">
<h5 className="modal-title" id="smallmodalLabel">View Table 
</h5></div>

<PdfContainer createPdf={this.createPdf}>
<div className="modal-body product_edit">


<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Table Name</label>
</div>
<div className="col-12 col-md-6">
Tabel {this.state.table_name}
</div>
</div>
</div>


<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Capacity</label>
</div>
<div className="col-12 col-md-6">
{this.state.table_capacity}
</div>
</div>
</div>

<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Icon</label>
</div>
<div className="col-12 col-md-6">
<img src={this.state.table_icon} className="h-50_pixel"/>
</div>
</div>
</div>
<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Floor</label>
</div>
<div className="col-12 col-md-6">
{this.state.table_floor}
</div>
</div>
</div>

<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Notes</label>
</div>
<div className="col-12 col-md-6">
{this.state.table_notes}
</div>
</div>
</div>

<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">QR</label>
</div>
<div className="col-12 col-md-8">

<span className="pop_qr">
<img src={this.state.table_qrcode}/>
</span>


{/* <span className="pull-left m-t-30 ml-30">
<p><button className="btn add_btn_pop_orange addmode_pad qr_btn">Print</button></p>
<p><button className="btn add_btn_pop_orange addmode_pad qr_btn m-t-20">Download</button></p>

</span> */}



</div>
</div>
</div>





</div>
</PdfContainer>

<div className="modal-footer">
<button type="button" className="btn close_btn" data-dismiss="modal">Close</button>
{/* <button type="button" className="btn save_btn">Create</button> */}
</div>

</div>
</div>
</div>


    </>
              
                                                                                               
        );
    }
}

export default TablesList;
