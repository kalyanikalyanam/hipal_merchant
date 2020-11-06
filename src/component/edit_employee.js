import React from "react";
import firebase from '../config';
import Sidebar from './sidebar';
import Header from './header';
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import {Form} from 'reactstrap';
import {Link} from "react-router-dom";


class EditEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            created_on: new Date().toLocaleString(),

            employee_name:'',
            employee_username:'',
            employee_password:'',
            employee_position:'',
            employee_division:'',
            employee_employement_type:'',
            employee_emailaddress:'',
            employee_mobile_number:'',
            employee_photo:'',
            employee_special_password:'',


            employee_dateofbirth:'',
            employee_bloodgroup:'',
            employee_address:'',
            employee_emergency_contact_number:'',
            employee_adharcard:'',

            employee_account_number:'',
            employee_ifsc_code:'',
            employee_upi_id:'',











            employer_sevice_message: "",
            validError:false,
            mobile_message: '',
            email_message:'',
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
        this.employeeRoleList();
        this.employeePositionsList();
        this.employeeList();
  
           
       }

      

       employeeList=()=>{

        const {employeeId} = this.props.match.params;
        this.setState({loading: true});
        var ref = firebase
            .database()
            .ref(`merchaant_employees/${employeeId}`);

            ref.on('value', snapshot => {
                var employee = snapshot.val();
    
                // console.log(categories)
    
                this.setState({
                   
                       
                    employee_unique_id: employee.employee_unique_id,
                    created_on: employee.created_on,
                
                
                
                    employee_name: employee.employee_name,
                    employee_username: employee.employee_username,
                    employee_password: employee.employee_password,
                    employee_position: employee.employee_position,
                    employee_division: employee.employee_division,
                    employee_employement_type: employee.employee_employement_type,
                    employee_emailaddress: employee.employee_emailaddress,
                    employee_mobile_number: employee.employee_mobile_number,
                    employee_photo: employee.employee_photo,
                    employee_special_password: employee.employee_special_password,
                
                
                
                    employee_dateofbirth: employee.employee_dateofbirth,
                    employee_bloodgroup: employee.employee_bloodgroup,
                    employee_address: employee.employee_address,
                    employee_emergency_contact_number: employee.employee_emergency_contact_number,
                    employee_adharcard: employee.employee_adharcard,
                
                
                
                    employee_account_number: employee.employee_account_number,
                    employee_ifsc_code: employee.employee_ifsc_code,
                    employee_upi_id: employee.employee_upi_id,
                   });
        });



    }
    employeePositionsList=()=>{
        var sessionId = sessionStorage.getItem("RoleId");
        var businessId = sessionStorage.getItem("businessId");
        this.setState({loading: true});
        var ref = firebase
            .database()
            .ref("merchaant_employees_positions/").orderByChild("sessionId").equalTo(sessionId);

        ref.on('value', snapshot => {
            const data = [];
            snapshot.forEach(childSnapShot => {

                const GSTData = {
                    employeePositionId: childSnapShot.key .toString(),
                       
                        employee_position: childSnapShot.val().employee_position,
                        employee_details: childSnapShot.val().employee_details,
                        employee_task_list: childSnapShot.val().employee_task_list,
                        employee_position_document: childSnapShot.val().iteemployee_position_documentm_image,
                        sessionId: childSnapShot.val().sessionId,
                        businessId: childSnapShot.val().businessId,


                        


                };

                data.push(GSTData);
            });

            let sortedKeys = data.filter((res) => {
                return res.businessId === businessId;
              });
            this.setState({employeePositionsList: sortedKeys, countPage: data.length, loading: false});
            console.log(this.state.employeePositionsList);
    
        });


    }

    // employeeRoleList=()=>{
    //     this.setState({loading: true});
    //     var ref = firebase
    //         .database()
    //         .ref("merchaant_employee_userroles/");

    //     ref.on('value', snapshot => {
    //         const data = [];
    //         snapshot.forEach(childSnapShot => {

    //             const GSTData = {
    //                 employeeuserroleId: childSnapShot.key .toString(),




                  
    //         created_on:childSnapShot.val().created_on,



    //         employee_name:childSnapShot.val().employee_name,
          
    //         employee_position:childSnapShot.val().employee_position,
          
    //         employee_mobile_number:childSnapShot.val().employee_mobile_number,
    //         // UserPermissions:childSnapShot.val().UserPermissions,


    //         see_all_orders:childSnapShot.val().see_all_orders,
    //         generate_billing:childSnapShot.val().generate_billing,
    //         can_add_item_discounts:childSnapShot.val().can_add_item_discounts,
    //         access_settings_page:childSnapShot.val().access_settings_page,
    //         only_delivery_assigned_values:childSnapShot.val().only_delivery_assigned_values,
    //         permission_type_4:childSnapShot.val().permission_type_4,

                       
                      
                       


                        


    //             };

    //             data.push(GSTData);
    //         });

    //         this.setState({employee_userroleList: data, countPage: data.length, loading: false});
    //         console.log(this.state.employee_userroleList);
    
    //     });



    // }
  
   
  
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
            const {employeeId}=this.props.match.params;
            var sessionId = sessionStorage.getItem("RoleId");
            var username = sessionStorage.getItem("username");
            var businessId = sessionStorage.getItem("businessId");

            let dbCon = firebase.database().ref(`/merchaant_employees/${employeeId}`);
                var key=(Math.round((new Date().getTime() / 1000))); 
            
              
           dbCon.update ({
              
           
            created_on:this.state.created_on,



            employee_name:this.state.employee_name,
            employee_username:this.state.employee_username,
            employee_password:this.state.employee_password,
            employee_position:this.state.employee_position,
            employee_division:this.state.employee_division,
            employee_employement_type:this.state.employee_employement_type,
            employee_emailaddress:this.state.employee_emailaddress,
            employee_mobile_number:this.state.employee_mobile_number,
            employee_photo:this.state.employee_photo,
            employee_special_password:this.state.employee_special_password,



            employee_dateofbirth:this.state.employee_dateofbirth,
            employee_bloodgroup:this.state.employee_bloodgroup,
            employee_address:this.state.employee_address,
            employee_emergency_contact_number:this.state.employee_emergency_contact_number,
            employee_adharcard:this.state.employee_adharcard,



            employee_account_number:this.state.employee_account_number,
            employee_ifsc_code:this.state.employee_ifsc_code,
            employee_upi_id:this.state.employee_upi_id,

          
            
            sessionId:sessionId,
            username:username,
            businessId:businessId,   
           
        
             });
             window.location.href="/AllEmployees";
             // this
             //     .props
             //     .history
             //     .push("/AllEmployees");
            }
           
 else {
            this
                .validator
                .showMessages();
            this.forceUpdate();
          }
      };
    

    


  

      onChange = (event) => {

        this.setState({
            [event.target.name]: event.target.value
        });
    };
  
    employeemailChange  = (e) => {
        this.setState({
            employee_emailaddress: e.target.value
        });
        if(this.state.validError!=true){
           
            
            var ref = firebase
            .database()
            .ref('merchaant_employees/').orderByChild("employee_emailaddress").equalTo(e.target.value);
            ref.on('value', snapshot => {
                var  user_exist = snapshot.numChildren();
                console.log(user_exist);
           
            if(user_exist>0 && this.state.validError!=true){
               
               
                this.setState({email_message: "Email already exist",validError:false});

            }
          
            else
            {
                this.setState({email_message: "",validError:true});
               
            }
           
        })
    }
       
    };


    employeemobileChange  = (e) => {
        this.setState({
            employee_mobile_number: e.target.value
        });
        if(this.state.validError!=true){
           
            
            var ref = firebase
            .database()
            .ref('merchaant_employees/').orderByChild("employee_mobile_number").equalTo(e.target.value);
            ref.on('value', snapshot => {
                var  user_exist = snapshot.numChildren();
                console.log(user_exist);
           
            if(user_exist>0 && this.state.validError!=true){
               
               
                this.setState({mobile_message: "Number already exist",validError:false});

            }
          
            else
            {
                this.setState({mobile_message: "",validError:true});
               
            }
           
        })
    }
       
    };


    render() {

    
        return (
            // <div className="modal fade" id="add_employee" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true">
            <div className="modal-dialog modal-sm hipal_pop" role="document">
            <div className="modal-content">
            
            
            <div className="modal-header">
            <h5 className="modal-title" id="smallmodalLabel">Edit Employee 
            </h5>
            </div>
            <Form onSubmit={this.handleSubmit}>
            
            {" "}
                                                                    {this.state.employer_sevice_message}
            
            <div className="modal-body product_edit">
            
            {" "}
                                                                    {this.state.employer_sevice_message}
            
            <div className="col-12 w-100-row">
            <div className="row form-group">
            <div className="col col-md-4">
            <label className=" form-control-label">Employee Name</label>
            </div>
            <div className="col-12 col-md-6">
            <input type="text" id="text-input" 
             name="employee_name"
             value={this.state.employee_name}
             onChange={this.onChange}
            placeholder="" className="form-control edit_product"/>
            {this .validator.message("Name", this.state.employee_name, "required|whitespace|min:2|max:70")}
            
            </div>
            </div>
            </div>
            
            
            
            <div className="col-12 w-100-row">
            <div className="row form-group">
            <div className="col col-md-4">
            <label className=" form-control-label">Username</label>
            </div>
            <div className="col-12 col-md-6">
            <input type="text" id="text-input" 
             name="employee_username"
             value={this.state.employee_username}
             onChange={this.onChange}
            placeholder="" className="form-control edit_product"/>
            {this .validator.message("UserName", this.state.employee_username, "required|whitespace|min:2|max:70")}
            </div>
            </div>
            </div>
            
            
            
            <div className="col-12 w-100-row">
            <div className="row form-group">
            <div className="col col-md-4">
            <label className=" form-control-label">Password</label>
            </div>
            <div className="col-12 col-md-6">
            <input type="password" id="text-input" 
             name="employee_password"
             value={this.state.employee_password}
             onChange={this.onChange}
            placeholder="" className="form-control edit_product"/>
            {this .validator.message("Password", this.state.employee_password,  "required|passwordvalid|min:6|max:30")}
            </div>
            </div>
            </div>
            
            
            <div className="col-12 w-100-row">
            <div className="row form-group">
            <div className="col col-md-4">
            <label className=" form-control-label">Position</label>
            </div>
            <div className="col-12 col-md-6">
            <select
                                                                    className="form-control edit_product"
                                                                    name="employee_position"
                                                                    onChange={this.onChange}>
                                                                    <option>Select Position</option>
                                                                    {this.state.employeePositionsList && this
                                                                        .state
                                                                        .employeePositionsList
                                                                        .map((data, index) => {
            
                                                                            return (
                                                                                <option value={data.employee_position} key={index} selected={data.employee_position == this.state.employee_position}>{data.employee_position}</option>
                                                                               
                                                                            )
            
                                                                        })}
            
                                                                </select>
                                                                {this .validator.message("Position", this.state.employee_position, "required")}
            {/* <select name="select" id="select" className="form-control edit_product">
            <option value="0">Owner</option>
            </select> */}
            
            
            </div>
            </div>
            </div>
            
            <div className="col-12 w-100-row">
            <div className="row form-group">
            <div className="col col-md-4">
            <label className=" form-control-label">Division</label>
            </div>
            <div className="col-12 col-md-6">
            <input type="text" id="text-input" 
             name="employee_division"
             value={this.state.employee_division}
             onChange={this.onChange}
            placeholder="" className="form-control edit_product"/>
            {this .validator.message("Division", this.state.employee_division, "required|whitespace|min:2|max:70")}
            </div>
            </div>
            </div>
            
            
            <div className="col-12 w-100-row">
            <div className="row form-group">
            <div className="col col-md-4">
            <label className=" form-control-label">Employment Type</label>
            </div>
            <div className="col-12 col-md-6">
            <input type="text" id="text-input"  name="employee_employement_type"
             value={this.state.employee_employement_type}
             onChange={this.onChange}
            placeholder="" className="form-control edit_product"/>
            {this .validator.message("Employment Type", this.state.employee_employement_type, "required|whitespace|min:2|max:70")}
            </div>
            </div>
            </div>
            
            <div className="col-12 w-100-row">
            <div className="row form-group">
            <div className="col col-md-4">
            <label className=" form-control-label">Email Address</label>
            </div>
            <div className="col-12 col-md-6">
            <input type="text" id="text-input" 
            name="employee_emailaddress"
            value={this.state.employee_emailaddress}
            onChange={this.employeemailChange}
            placeholder="" className="form-control edit_product"/>
            {this .validator.message("Email ", this.state.employee_emailaddress, "required|email|min:6|max:70")}
            <div className="text-danger">
                                                                    {" "}
                                                                    {this.state.email_message}
                                                                    </div>
            
            </div>
            </div>
            </div>
            
            <div className="col-12 w-100-row">
            <div className="row form-group">
            <div className="col col-md-4">
            <label className=" form-control-label">Mobile Number</label>
            </div>
            <div className="col-12 col-md-6">
            <input type="number" id="text-input"
            name="employee_mobile_number"
            value={this.state.employee_mobile_number}
            onChange={this.employeemobileChange}
            placeholder="" className="form-control edit_product"/>
            {this .validator.message("Mobile Number", this.state.employee_mobile_number, "required|whitespace|min:10|max:10")}
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
            <label className=" form-control-label">Photo</label>
            </div>
            <div className="col-12 col-md-6">
            
            
            
            {this.state.employee_photo && <img src={this.state.employee_photo} />}
                                                             <FileUploader
                                                            accept="image/*"
                                                            name="employee_photo"
                                                            randomizeFilename
                                                            storageRef={firebase
                                                            .storage()
                                                            .ref("images")}
                                                            onUploadStart={this.handleFrontImageUploadStart}
                                                            onUploadError={this.handleUploadError}
                                                            onUploadSuccess={this.handleEmployeePhotoSuccess}
                                                            onProgress={this.handleProgress}/>
            
            
            
                {this .validator.message(" Photo", this.state.employee_photo, "required")}
            
            
            {/* <div className="upload_img upload_small">
             <div className="form-group">
                <div className="img_show product_img_small"><img id="img-upload"/></div>
                   <div className="input-group">
                        <span className="input-group-btn">
                            <span className="btn btn-default btn-file">
                                Upload Image<input type="file" id="imgInp"/>
                            </span>
                        </span>
                        <input type="text" className="form-control" readonly=""/>
                    </div>
                    
                </div></div> */}
            
            </div>
            </div>
            </div>
            
            
            <div className="col-12 w-100-row">
            <div className="row form-group">
            <div className="col col-md-4">
            <label className=" form-control-label">Special Password</label>
            </div>
            <div className="col-12 col-md-6">
            <input type="password" id="text-input" 
            name="employee_special_password"
            value={this.state.employee_special_password}
            onChange={this.onChange}
            placeholder="" className="form-control edit_product"/>
            {this .validator.message("Special Password", this.state.employee_special_password,  "required|passwordvalid|min:6|max:30")}
            
            </div>
            </div>
            </div>
            
            <div className="col-12 w-100-row">
            <h2 className="bdrbtm">Personal</h2>
            </div>
            
            <div className="col-12 w-100-row">
            <div className="row form-group">
            <div className="col col-md-4">
            <label className=" form-control-label">D.O.B</label>
            </div>
            <div className="col-12 col-md-6">
            
            <input type="date" id="text-input" 
            name="employee_dateofbirth"
            value={this.state.employee_dateofbirth}
            onChange={this.onChange}
            placeholder="" className="form-control edit_product"/>
            {this .validator.message("Date Of Birth", this.state.employee_dateofbirth, "required")}
            
            
            
            {/* <div className="pull-left m-r-5">
            <select name="select" id="select" className="form-control edit_product">
            <option value="0">DD</option>
            </select>
            </div>
            
            
            <div className="pull-left m-r-5">
            <select name="select" id="select" className="form-control edit_product">
            <option value="0">MM</option>
            </select>
            </div>
            
            <div className="pull-left">
            <select name="select" id="select" className="form-control edit_product">
            <option value="0">YYYY</option>
            </select>
            </div> */}
            
            
            
            </div>
            </div>
            </div>
            
            <div className="col-12 w-100-row">
            <div className="row form-group">
            <div className="col col-md-4">
            <label className=" form-control-label">Blood group</label>
            </div>
            <div className="col-12 col-md-6">
            <select 
            name="employee_bloodgroup"
            value={this.state.employee_bloodgroup}
            onChange={this.onChange}
            id="select" className="form-control edit_product">
                <option value="Select">Select Blood Group</option>
            <option value="A Positive">A Positive</option>
            <option value="B Positive">B Positive</option>
            <option value="O Positive">O Positive</option>
            <option value="A Negative">A Negative</option>
            <option value="B Negative">B Negative</option>
            <option value="O Negative">O Negative</option>
            <option value="AB Negative">AB Negative</option>
            <option value="AB Positive">AB Positive</option>
            </select>
            {this .validator.message("Blood Group", this.state.employee_bloodgroup, "required")}
            </div>
            </div>
            </div>
            
            
            <div className="col-12 w-100-row">
            <div className="row form-group">
            <div className="col col-md-4">
            <label className=" form-control-label">Address </label>
            </div>
            <div className="col-12 col-md-6">
            <textarea 
            name="employee_address"
            value={this.state.employee_address}
            onChange={this.onChange}
            id="textarea-input" rows="3" placeholder="" className="form-control edit_product"></textarea>
            {this .validator.message("Employee Address", this.state.employee_address, "required|whitespace|min:2|max:70")}
            
            </div>
            </div>
            </div>
            
            <div className="col-12 w-100-row">
            <div className="row form-group">
            <div className="col col-md-4">
            <label className=" form-control-label">Emergency contact </label>
            </div>
            <div className="col-12 col-md-6">
            <input type="text" id="text-input"name="employee_emergency_contact_number"
            value={this.state.employee_emergency_contact_number}
            onChange={this.onChange}
            placeholder="" className="form-control edit_product"/>
            {this .validator.message("Emergency Contact Number", this.state.employee_emergency_contact_number, "required|whitespace|min:10|max:10")}
            
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
            <label className=" form-control-label">Adhar card </label>
            </div>
            <div className="col-12 col-md-6">
            
            
            
            {this.state.employee_adharcard && <img src={this.state.employee_adharcard} />}
                                                             <FileUploader
                                                            accept="image/*"
                                                            name="employee_adharcard"
                                                            randomizeFilename
                                                            storageRef={firebase
                                                            .storage()
                                                            .ref("images")}
                                                            onUploadStart={this.handleFrontImageUploadStart}
                                                            onUploadError={this.handleUploadError}
                                                            onUploadSuccess={this.handleAdharPhotoSuccess}
                                                            onProgress={this.handleProgress}/>
            
            
            
                {this .validator.message(" AdharCard Photo", this.state.employee_adharcard, "required")}
            
            
            {/* <div className="upload_img upload_small">
             <div className="form-group">
                <div className="img_show product_img_small"><img id="img-upload"/></div>
                   <div className="input-group">
                        <span className="input-group-btn">
                            <span className="btn btn-default btn-file">
                                Upload Image<input type="file" id="imgInp"/>
                            </span>
                        </span>
                        <input type="text" className="form-control" readonly=""/>
                    </div>
                    
                </div></div> */}
            
            
            </div>
            </div>
            </div>
            
            <div className="col-12 w-100-row">
            <h2 className="bdrbtm">Banking </h2>
            </div>
            
            <div className="col-12 w-100-row">
            <div className="row form-group">
            <div className="col col-md-4">
            <label className=" form-control-label">ACC NUMBER</label>
            </div>
            <div className="col-12 col-md-6">
            <input type="number" id="text-input" 
            name="employee_account_number"
            value={this.state.employee_account_number}
            onChange={this.onChange}
            placeholder="" className="form-control edit_product"/>
            {this .validator.message("Account Number", this.state.employee_account_number, "required|whitespace|min:10|max:16")}
            
            </div>
            </div>
            </div>
            
            <div className="col-12 w-100-row">
            <div className="row form-group">
            <div className="col col-md-4">
            <label className=" form-control-label">IFSC CODE </label>
            </div>
            <div className="col-12 col-md-6">
            <input type="text" id="text-input" 
            name="employee_ifsc_code"
            value={this.state.employee_ifsc_code}
            onChange={this.onChange}
            placeholder="" className="form-control edit_product"/>
            {this .validator.message("IFSC Code", this.state.employee_ifsc_code, "required|whitespace|min:10|max:16")}
            </div>
            </div>
            </div>
            
            <div className="col-12 w-100-row">
            <div className="row form-group">
            <div className="col col-md-4">
            <label className=" form-control-label">UPI ID</label>
            </div>
            <div className="col-12 col-md-6">
            <input type="text" id="text-input"name="employee_upi_id"
            value={this.state.employee_upi_id}
            onChange={this.onChange}placeholder="" className="form-control edit_product"/>
            {this .validator.message("UPI ID", this.state.employee_upi_id, "required|whitespace|min:10|max:16")}
            
            </div>
            </div>
            </div>
            
            
            
            
            
            
            
            
            
            </div>
            
            
            
            <div className="modal-footer">
                <Link to="/AllEmployees">
            <button type="button" className="btn close_btn" data-dismiss="modal">Close</button>
            </Link>
            <button type="submit" className="btn save_btn">Save</button>
            </div>
            
            </Form>
            </div>
            </div>
            // </div>
                                                                                               
        );
    }
}

export default EditEmployee;
