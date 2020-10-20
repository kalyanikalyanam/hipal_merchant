import React from "react";
import firebase from '../config';
import Sidebar from './sidebar';
import Header from './header';
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import {Form} from 'reactstrap';
import {Link} from "react-router-dom";
import swal from 'sweetalert';
class AllEmployeePositions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            created_on: new Date().toLocaleString(),
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
         
        };



        this.onChange = this
        .onChange
        .bind(this);

        this.deleteItem = this
        .deleteItem
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

        this.employeePositionsList();
           
       }

       employeePositionsList=()=>{

        this.setState({loading: true});
        var ref = firebase
            .database()
            .ref("merchaant_employees_positions/");

        ref.on('value', snapshot => {
            const data = [];
            snapshot.forEach(childSnapShot => {

                const GSTData = {
                    employeePositionId: childSnapShot.key .toString(),
                       
                        employee_position: childSnapShot.val().employee_position,
                        employee_details: childSnapShot.val().employee_details,
                        employee_task_list: childSnapShot.val().employee_task_list,
                        employee_position_document: childSnapShot.val().iteemployee_position_documentm_image,
                       

 };

                data.push(GSTData);
            });

            this.setState({employeePositionsList: data, countPage: data.length, loading: false});
            console.log(this.state.employeePositionsList);
    
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
            .then(url => this.setState({employee_position_document: url}));
    };


       handleSubmit = (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
          
            var sessionId = sessionStorage.getItem("RoleId");
            var username = sessionStorage.getItem("username");

            let dbCon = firebase
                .database()
                .ref('/merchaant_employees_positions');
            
              
            dbCon.push({
               

                created_on:this.state.created_on,
                employee_position:this.state.employee_position,
                employee_details:this.state.employee_details,
                employee_task_list:this.state.employee_task_list,

                employee_position_document:this.state.employee_position_document,

                

                
                sessionId:sessionId,
                username:username,

               
           
        
             });
             this.setState({
                employer_sevice_message:"Data Added",
                employee_position:'',
                employee_details:'',
                employee_task_list:'',
                employee_position_document:'',
             })
window.location.href="/AllEmployeePositions";

            // this
            //     .props
            //     .history
            //     .push("/AllEmployeePositions");
        } else {
            this
                .validator
                .showMessages();
            this.forceUpdate();
        }

    };

    employeePositionChange  = (e) => {
        this.setState({
            employee_position: e.target.value
        });
        if(this.state.validError!=true){
           
            
            var ref = firebase
            .database()
            .ref('merchaant_employees_positions/').orderByChild("employee_position").equalTo(e.target.value);
            ref.on('value', snapshot => {
                var  user_exist = snapshot.numChildren();
                console.log(user_exist);
           
            if(user_exist>0 && this.state.validError!=true){
               
               
                this.setState({mobile_message: "POsition Name already exist",validError:false});

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
            .ref(`/merchaant_employees_positions/${id}`);
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
<p className="name">{sessionStorage.getItem("username")} </p>
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
<button type="button"  data-toggle="modal" data-target="#add_employee_position">
<span className="btn add_ord m-l-0"><img src="/images/icon/add_plus_icon_w.svg"/>
Add Employee Position</span>
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
<li><a href="/AllEmployees">Employees</a></li>

<li><a href="/AllEmployeePositions"   className="activemenu">Positions</a></li>

<li><a href="/AllEmplopyesRoles" >User roles</a></li>




</ul>
</div>
</div>			
</div>




<div className="row mt-30">
<div className="col-md-12 p-0 employes_table user_position">

<div className="table-responsive table-data">
<table className="table">
<thead>

<tr>
<td>S.no</td>
<td>Position</td>
<td>Details</td> 
<td>Actions</td>
</tr>

</thead>
<tbody  id="myTable">

{this.state.employeePositionsList && this.state.employeePositionsList.map((employee_position,index) => {
return (
    
<tr key={index}> 
<td>{index+1}</td>
<td>{employee_position.employee_position}</td>
<td>{employee_position.employee_details}</td>
<td>
<Link to={`/EditEmployeePosition/${employee_position.employeePositionId}`}>
    <img src="/images/icon/edit_icon_blue.svg" className="edit_delete"/> 
    </Link>

<img src="/images/icon/delete_cross.svg"  onClick={this.deleteItem.bind(this, employee_position.employeePositionId)} className="edit_delete"/></td>
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
  <div className="modal fade" id="add_employee_position" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true">
  <div className="modal-dialog modal-sm hipal_pop" role="document">
  <div className="modal-content">
  
  
  <div className="modal-header">
  <h5 className="modal-title" id="smallmodalLabel">Add Employee Position 
  </h5>
  </div>
  <Form onSubmit={this.handleSubmit}>
  {" "}
                                                        {this.state.employer_sevice_message}

  
  
  <div className="modal-body product_edit">
  
  
  
  
  
  <div className="col-12 w-100-row">
  <div className="row form-group">
  <div className="col col-md-4">
  <label className=" form-control-label">Position</label>
  </div>
  <div className="col-12 col-md-6">
  <input type="text" id="text-input" name="employee_position"
      value={this.state.employee_position}
      onChange={this.employeePositionChange}
   placeholder="Accounts" className="form-control edit_product"/>
   {this .validator.message("Position", this.state.employee_position, "required|whitespace|min:2|max:70")}
   <div className="text-danger">
                                                        {" "}
                                                        {this.state.mobile_message}
                                                        </div>
  </div>
  
  </div>
  </div>
  
  <div className="col-12 w-100-row">
  <div className="row form-group">
  <div className="col col-md-4">
  <label className=" form-control-label">Details</label>
  </div>
  <div className="col-12 col-md-6">
  <textarea name="employee_details"
      value={this.state.employee_details}
      onChange={this.onChange} id="textarea-input" rows="3" placeholder="Does the accounting work" className="form-control edit_product"></textarea>
    {this .validator.message("Details", this.state.employee_details, "required|whitespace|min:2|max:70")}
  </div>


  </div>
  </div>
  
  
  <div className="col-12 w-100-row">
  <div className="row form-group">
  <div className="col col-md-4">
  <label className=" form-control-label">Task List</label>
  </div>
  <div className="col-12 col-md-6">
  <textarea 
  name="employee_task_list"
  value={this.state.employee_task_list}
  onChange={this.onChange}
  
  id="textarea-input" rows="3" placeholder="Detailed Task List " className="form-control edit_product"></textarea>
    {this .validator.message("Task List", this.state.employee_task_list, "required|whitespace|min:2|max:70")}
  </div>

  </div>
  </div>
  
  
  <div className="col-12 w-100-row">
  <div className="row form-group">
  <div className="col col-md-4">
  <label className=" form-control-label">Documentation</label>
  </div>
  <div className="col-12 col-md-6">
  
  
  {/* <div className="upload_img upload_small">
   <div className="form-group">
      <div className="img_show product_img_small"><img id="img-upload"/></div>
         <div className="input-group">
              <span className="input-group-btn">
                  <span className="btn btn-default btn-file">
                      Upload PDF or Word File <input type="file" id="imgInp"/>
                  </span>
              </span>
              <input type="text" className="form-control" readonly=""/>
          </div>
          
      </div></div> */}

      

                                                 <FileUploader
                                                accept="files/*"
                                                name="employee_position_document"
                                                randomizeFilename
                                                storageRef={firebase
                                                .storage()
                                                .ref("images")}
                                                onUploadStart={this.handleFrontImageUploadStart}
                                                onUploadError={this.handleUploadError}
                                                onUploadSuccess={this.handleItemPhotoSuccess}
                                                onProgress={this.handleProgress}/>
                                                {this .validator.message("Document", this.state.employee_position_document, "required")}
  
  
  </div>
  

  </div>
  </div>
  
  
  
  
  </div>
  
  
  
  <div className="modal-footer">
      <Link to="/AllEmployeePositions">
  <button type="button" className="btn close_btn" data-dismiss="modal">Cancel</button>
  </Link>
  <button type="submit" className="btn save_btn">Save</button>
  </div>
  </Form>
  
  </div>
  </div>
  </div>
            </>  
                                                                                               
        );
    }
}



export default AllEmployeePositions;
