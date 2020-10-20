import React from "react";
import firebase from '../config';
import Sidebar from './sidebar';
import Header from './header';
import {Checkbox} from 'react-icheck';
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import {Form} from 'reactstrap';
import {Link} from "react-router-dom";
import swal from 'sweetalert';
class AllEmplopyesRoles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            created_on: new Date().toLocaleString(),

            employee_name:'',
           
            employee_position:'',
        
            employee_mobile_number:'',
           
            see_all_orders:'',
            generate_billing:'',
            basic_analytics:'',
            permission_type_4:'',
            view_bills_history:'',
            add_edit_new_staff_accounts:'',
            sales_view:'',
            customer_view:'',
            customer_data_edit:'',
            access_settings_page:'',
            access_display_kitchen_display:'',
            can_settle:'',
            only_delivery_assigned_values:'',
            can_add_item_discounts:'',
            staff_performance:'',
            delete_kot_generated_of_item:'',
            edit_order:'',
            add_tables:'',
            
            
            




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

        //    UserPermissions:[],
         
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
        this.employeeList();
        this.employee_userroleList();
           
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

    employeeList=()=>{

        this.setState({loading: true});
        var ref = firebase
            .database()
            .ref("merchant_users/").orderByChild("role").equalTo("Employee");


        ref.on('value', snapshot => {
            const data = [];
            snapshot.forEach(childSnapShot => {

                const GSTData = {
                    employeeId: childSnapShot.key .toString(),




                    employee_unique_id: childSnapShot.val().employee_unique_id,
                    created_on: childSnapShot.val().created_on,
                
                
                
                    employee_name: childSnapShot.val().employee_name,
                    employee_username: childSnapShot.val().employee_username,
                    employee_password: childSnapShot.val().employee_password,
                    employee_position: childSnapShot.val().employee_position,
                    employee_division: childSnapShot.val().employee_division,
                    employee_employement_type: childSnapShot.val().employee_employement_type,
                    employee_emailaddress: childSnapShot.val().employee_emailaddress,
                    employee_mobile_number: childSnapShot.val().employee_mobile_number,
                    employee_photo: childSnapShot.val().employee_photo,
                    employee_special_password: childSnapShot.val().employee_special_password,
                
                
                
                    employee_dateofbirth: childSnapShot.val().employee_dateofbirth,
                    employee_bloodgroup: childSnapShot.val().employee_bloodgroup,
                    employee_address: childSnapShot.val().employee_address,
                    employee_emergency_contact_number: childSnapShot.val().employee_emergency_contact_number,
                    employee_adharcard: childSnapShot.val().employee_adharcard,
                
                
                
                    employee_account_number: childSnapShot.val().employee_account_number,
                    employee_ifsc_code: childSnapShot.val().employee_ifsc_code,
                    employee_upi_id: childSnapShot.val().employee_upi_id,
    
                       
                      
                       


                        


                };

                data.push(GSTData);
            });

            this.setState({employeeList: data, countPage: data.length, loading: false});
            console.log(this.state.employeeList);
    
        });


    }

    employee_userroleList=()=>{
        this.setState({loading: true});
        var ref = firebase
            .database()
            .ref("merchaant_employee_userroles/");

        ref.on('value', snapshot => {
            const data = [];
            snapshot.forEach(childSnapShot => {

                const GSTData = {
                    employeeuserroleId: childSnapShot.key .toString(),




                  
            created_on:childSnapShot.val().created_on,



            employee_name:childSnapShot.val().employee_name,
          
            employee_position:childSnapShot.val().employee_position,
          
            employee_mobile_number:childSnapShot.val().employee_mobile_number,
            // UserPermissions:childSnapShot.val().UserPermissions,


            see_all_orders:childSnapShot.val().see_all_orders,
          generate_billing:childSnapShot.val().generate_billing,
          basic_analytics:childSnapShot.val().basic_analytics,
          permission_type_4:childSnapShot.val().permission_type_4,
          view_bills_history:childSnapShot.val().view_bills_history,
          add_edit_new_staff_accounts:childSnapShot.val().add_edit_new_staff_accounts,
          sales_view:childSnapShot.val().sales_view,
          customer_view:childSnapShot.val().customer_view,
          customer_data_edit:childSnapShot.val().customer_data_edit,
          access_settings_page:childSnapShot.val().access_settings_page,
          access_display_kitchen_display:childSnapShot.val().access_display_kitchen_display,
          can_settle:childSnapShot.val().can_settle,
          only_delivery_assigned_values:childSnapShot.val().only_delivery_assigned_values,
          can_add_item_discounts:childSnapShot.val().can_add_item_discounts,
          staff_performance:childSnapShot.val().staff_performance,
          delete_kot_generated_of_item:childSnapShot.val().delete_kot_generated_of_item,
          edit_order:childSnapShot.val().edit_order,
          add_tables:childSnapShot.val().add_tables,

                       
                      
                       


                        


                };

                data.push(GSTData);
            });

            this.setState({employee_userroleList: data, countPage: data.length, loading: false});
            console.log(this.state.employee_userroleList);
    
        });



    }
  

       handleSubmit = (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
          
            var sessionId = sessionStorage.getItem("RoleId");
            var username = sessionStorage.getItem("username");

            let dbCon = firebase
                .database()
                .ref('/merchaant_employee_userroles');
               
            
              
            dbCon.push({
            
                created_on:this.state.created_on,



                employee_name:this.state.employee_name,
              
                employee_position:this.state.employee_position,
              
                employee_mobile_number:this.state.employee_mobile_number,
                // UserPermissions:this.state.UserPermissions,


                see_all_orders:this.state.see_all_orders,
                generate_billing:this.state.generate_billing,
                basic_analytics:this.state.basic_analytics,
                permission_type_4:this.state.permission_type_4,
                view_bills_history:this.state.view_bills_history,
                add_edit_new_staff_accounts:this.state.add_edit_new_staff_accounts,
                sales_view:this.state.sales_view,
                customer_view:this.state.customer_view,
                customer_data_edit:this.state.customer_data_edit,
                access_settings_page:this.state.access_settings_page,
                access_display_kitchen_display:this.state.access_display_kitchen_display,
                can_settle:this.state.can_settle,
                only_delivery_assigned_values:this.state.only_delivery_assigned_values,
                can_add_item_discounts:this.state.can_add_item_discounts,
                staff_performance:this.state.staff_performance,
                delete_kot_generated_of_item:this.state.delete_kot_generated_of_item,
                edit_order:this.state.edit_order,
                add_tables:this.state.add_tables,
                
                

              
                
                sessionId:sessionId,
                username:username,

               
           
        
             });
            
window.location.href="/AllEmplopyesRoles";
             
            // this
            //     .props
            //     .history
            //     .push("/AllEmplopyesRoles");
        } else {
            this
                .validator
                .showMessages();
            this.forceUpdate();
        }

    };

   



    deleteItem = id => {
        swal({title: "Are you sure?", text: "Do your really want to remove?", icon: "warning", buttons: true, dangerMode: true}).then(willDelete => {
            if (willDelete) {
        console.log(id);
        var playersRef = firebase
            .database()
            .ref(`/merchaant_employee_userroles/${id}`);
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


    // handleChange(e) {
    //     // current array of options
    //     const UserPermissions = this.state.UserPermissions
    //     let index
    
    //     // check if the check box is checked or unchecked
    //     if (e.target.checked) {
    //       // add the numerical value of the checkbox to options array
    //       UserPermissions.push(+e.target.value)
    //     } else {
    //       // or remove the value from the unchecked checkbox from the array
    //       index = UserPermissions.indexOf(+e.target.value)
    //       UserPermissions.splice(index, 1)
    //     }
    
    //     // update the state with the new array of options
    //     this.setState({ UserPermissions: UserPermissions })
    //   }

    // window.location.href 

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
    <button type="button"  data-toggle="modal" data-target="#add_employee_role">
    <span className="btn add_ord m-l-0"><img src="/images/icon/add_plus_icon_w.svg"/>Add User Roles</span>
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

<li><a href="/AllEmployeePositions">Positions</a></li>

<li><a href="/AllEmplopyesRoles"  className="activemenu">User roles</a></li>


    
    </ul>
    </div>
    </div>			
    </div>
    
    
    
    
    <div className="row mt-30">
    <div className="col-md-12 p-0 employes_table user_roles">
    
    <div className="table-responsive table-data">
    <table className="table">
    <thead>
    
    <tr>
    <td>S.no</td>
    <td>Employee Name</td>
    <td>Mobile Number</td> 
    <td>Position</td> 
    {/* <td>Permissions</td>  */}
    <td>Actions</td>
    </tr>
    
    </thead>
    <tbody id="myTable">
    
    
    {this.state.employee_userroleList && this.state.employee_userroleList.map((employee_userrole,index) => {
return (
    
<tr key={index}> 
<td>{index+1}</td>
    <td>{employee_userrole.employee_name}</td>
    <td>{employee_userrole.employee_mobile_number}</td>
    <td>{employee_userrole.employee_position}</td>
    {/* <td>Generate Billing</td> */}
    <td>
    <Link to={`/EditEmployeeRole/${employee_userrole.employeeuserroleId}`}>
        <img src="/images/icon/edit_icon_blue.svg" className="edit_delete"/> 
</Link>
    <img src="/images/icon/delete_cross.svg"  onClick={this.deleteItem.bind(this, employee_userrole.employeeuserroleId)} className="edit_delete"/></td>
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



    <div className="modal fade" id="add_employee_role" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true">
<div className="modal-dialog modal-sm hipal_pop" role="document">
<div className="modal-content">
<div className="modal-header">
<h5 className="modal-title" id="smallmodalLabel">Add  User Roles
</h5>
</div>


<Form onSubmit={this.handleSubmit}>
<div className="modal-body product_edit">
<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Employee Name</label>
</div>
<div className="col-12 col-md-6">


<select
                                                        className="form-control edit_product"
                                                        name="employee_name"
                                                        onChange={this.onChange}>
                                                        <option>Select Name</option>
                                                        {this.state.employeeList && this
                                                            .state
                                                            .employeeList
                                                            .map((data, index) => {

                                                                return (
                                                                    <option value={data.employee_name} key={index}>{data.employee_name}</option>
                                                                )

                                                            })}

                                                    </select>
                                                    {this .validator.message("Name", this.state.employee_name, "required")}

{/* <select name="select" id="select" className="form-control edit_product">
<option value="0">Type to choose</option>
</select> */}
</div>
</div>
</div>
<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Mobile Number</label>
</div>
<div className="col-12 col-md-6">
<select
                                                        className="form-control edit_product"
                                                        name="employee_mobile_number"
                                                        onChange={this.onChange}>
                                                        <option>Select Mobile Number</option>
                                                        {this.state.employeeList && this
                                                            .state
                                                            .employeeList
                                                            .map((data, index) => {

                                                                return (
                                                                    <option value={data.employee_mobile_number} key={index}>{data.employee_mobile_number}</option>
                                                                )

                                                            })}

                                                    </select>
                                                    {this .validator.message("Mobile Number", this.state.employee_mobile_number, "required")}


{/* <select name="select" id="select" className="form-control edit_product">
<option value="0">Choose from drop down</option>
</select> */}
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
                                                                    <option value={data.employee_position} key={index}>{data.employee_position}</option>
                                                                )

                                                            })}

                                                    </select>
                                                     {this .validator.message("Position", this.state.employee_position, "required")}

{/* <select name="select" id="select" className="form-control edit_product">
<option value="0">Choose from drop down</option>
</select> */}
</div>
</div>
</div>
<div className="col-12 w-100-row">
<h3>Give Permissions</h3>
</div>
<div className="col-12 w-100-row">
<div className="row form-group user_roles_check">





<div className="col col-md-6">
<label >See All Orders
</label>
</div>
<div className="col col-md-6">

<label>
                                                                    <input
                                                                        type="radio"
                                                                        name="see_all_orders"
                                                                        value="Yes"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.see_all_orders === 'Yes'}/>Yes
                                                                </label>
                                                                <label  style={{paddingLeft:'20px'}}>
                                                                    <input
                                                                   
                                                                        type="radio"
                                                                        name="see_all_orders"
                                                                        value="No"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.see_all_orders === 'No'}/>No
                                                                </label>
                                                                {this .validator.message("See All Orders", this.state.see_all_orders, "required")}
                                                                </div>
                                                                
 


<div className="col col-md-6">
<label >Generate Billing
</label>
</div>
<div className="col col-md-6">
<label>
                                                                    <input
                                                                        type="radio"
                                                                        name="generate_billing"
                                                                        value="Yes"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.generate_billing === 'Yes'}/>Yes
                                                                </label>
                                                                <label  style={{paddingLeft:'20px'}}>
                                                                    <input
                                                                        type="radio"
                                                                        name="generate_billing"
                                                                        value="No"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.generate_billing === 'No'}/>No
                                                                </label>
                                                                {this .validator.message("Generate Billing", this.state.generate_billing, "required")}
                                                                </div>








                                                                <div className="col col-md-6">
<label >Basic Analytics
</label>
</div>
<div className="col col-md-6">
<label>
                                                                    <input
                                                                        type="radio"
                                                                        name="basic_analytics"
                                                                        value="Yes"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.basic_analytics === 'Yes'}/>Yes
                                                                </label>
                                                                <label  style={{paddingLeft:'20px'}}>
                                                                    <input
                                                                        type="radio"
                                                                        name="basic_analytics"
                                                                        value="No"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.basic_analytics === 'No'}/>No
                                                                </label>
                                                                {this .validator.message("Basic Analytics", this.state.basic_analytics, "required")}
                                                                </div>


                                                                <div className="col col-md-6">
<label >Permission type 4 
</label>
</div>
<div className="col col-md-6">
<label>
                                                                    <input
                                                                        type="radio"
                                                                        name="permission_type_4"
                                                                        value="Yes"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.permission_type_4 === 'Yes'}/>Yes
                                                                </label>
                                                                <label  style={{paddingLeft:'20px'}}>
                                                                    <input
                                                                        type="radio"
                                                                        name="permission_type_4"
                                                                        value="No"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.permission_type_4 === 'No'}/>No
                                                                </label>
                                                                {this .validator.message("Permission type 4 ", this.state.permission_type_4, "required")}
                                                                </div>




                                                                <div className="col col-md-6">

                                                                <label >View Bills History 
</label>
</div>
<div className="col col-md-6">
<label>
                                                                    <input
                                                                        type="radio"
                                                                        name="view_bills_history"
                                                                        value="Yes"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.view_bills_history === 'Yes'}/>Yes
                                                                </label>
                                                                <label  style={{paddingLeft:'20px'}}>
                                                                    <input
                                                                        type="radio"
                                                                        name="view_bills_history"
                                                                        value="No"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.view_bills_history === 'No'}/>No
                                                                </label>
                                                                {this .validator.message("View Bills History ", this.state.view_bills_history, "required")}
                                                                </div>






                                                                <div className="col col-md-6">

<label >Add & Edit New Staff Accounts 
</label>
</div>
<div className="col col-md-6">
<label>
    <input
        type="radio"
        name="add_edit_new_staff_accounts"
        value="Yes"
        onChange={this.onChange}
        checked={this.state.add_edit_new_staff_accounts === 'Yes'}/>Yes
</label>
<label  style={{paddingLeft:'20px'}}>
    <input
        type="radio"
        name="add_edit_new_staff_accounts"
        value="No"
        onChange={this.onChange}
        checked={this.state.add_edit_new_staff_accounts === 'No'}/>No
</label>
{this .validator.message("Add & Edit New Staff Accounts ", this.state.add_edit_new_staff_accounts, "required")}
</div>





<div className="col col-md-6">

<label >Sales View 
</label>
</div>
<div className="col col-md-6">
<label>
    <input
        type="radio"
        name="sales_view"
        value="Yes"
        onChange={this.onChange}
        checked={this.state.sales_view === 'Yes'}/>Yes
</label>
<label  style={{paddingLeft:'20px'}}>
    <input
        type="radio"
        name="sales_view"
        value="No"
        onChange={this.onChange}
        checked={this.state.sales_view === 'No'}/>No
</label>
{this .validator.message("Sales View ", this.state.sales_view, "required")}
</div>




<div className="col col-md-6">

<label >Customer View 
</label>
</div>
<div className="col col-md-6">
<label>
    <input
        type="radio"
        name="customer_view"
        value="Yes"
        onChange={this.onChange}
        checked={this.state.customer_view === 'Yes'}/>Yes
</label>
<label  style={{paddingLeft:'20px'}}>
    <input
        type="radio"
        name="customer_view"
        value="No"
        onChange={this.onChange}
        checked={this.state.customer_view === 'No'}/>No
</label>
{this .validator.message("Customer View ", this.state.customer_view, "required")}
</div>





<div className="col col-md-6">

<label >Customer Data Edit 
</label>
</div>
<div className="col col-md-6">
<label>
    <input
        type="radio"
        name="customer_data_edit"
        value="Yes"
        onChange={this.onChange}
        checked={this.state.customer_data_edit=== 'Yes'}/>Yes
</label>
<label  style={{paddingLeft:'20px'}}>
    <input
        type="radio"
        name="customer_data_edit"
        value="No"
        onChange={this.onChange}
        checked={this.state.customer_data_edit === 'No'}/>No
</label>
{this .validator.message("Customer Data Edit ", this.state.customer_data_edit, "required")}
</div>


<div className="col col-md-6">
<label >Access Settings Page
</label>
</div>
<div className="col col-md-6">
<label>
                                                                    <input
                                                                        type="radio"
                                                                        name="access_settings_page"
                                                                        value="Yes"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.access_settings_page === 'Yes'}/>Yes
                                                                </label>
                                                                <label  style={{paddingLeft:'20px'}}>
                                                                    <input
                                                                        type="radio"
                                                                        name="access_settings_page"
                                                                        value="No"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.access_settings_page === 'No'}/>No
                                                                </label>
                                                                {this .validator.message("Access Settings Page", this.state.access_settings_page, "required")}
                                                                </div>





                                                                <div className="col col-md-6">
<label >Access Display Kitchen Display
</label>
</div>
<div className="col col-md-6">
<label>
                                                                    <input
                                                                        type="radio"
                                                                        name="access_display_kitchen_display"
                                                                        value="Yes"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.access_display_kitchen_display === 'Yes'}/>Yes
                                                                </label>
                                                                <label  style={{paddingLeft:'20px'}}>
                                                                    <input
                                                                        type="radio"
                                                                        name="access_display_kitchen_display"
                                                                        value="No"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.access_display_kitchen_display === 'No'}/>No
                                                                </label>
                                                                {this .validator.message("Access Display Kitchen Display", this.state.access_display_kitchen_display, "required")}
                                                                </div>





                                                                <div className="col col-md-6">
<label >Can Settle
</label>
</div>
<div className="col col-md-6">
<label>
                                                                    <input
                                                                        type="radio"
                                                                        name="can_settle"
                                                                        value="Yes"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.can_settle === 'Yes'}/>Yes
                                                                </label>
                                                                <label  style={{paddingLeft:'20px'}}>
                                                                    <input
                                                                        type="radio"
                                                                        name="can_settle"
                                                                        value="No"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.can_settle === 'No'}/>No
                                                                </label>
                                                                {this .validator.message("Can Settle", this.state.can_settle, "required")}
                                                                </div>





                                                                <div className="col col-md-6">
<label >Only Delivery Assigened Orders
    </label>
</div>
<div className="col col-md-6">
<label>
                                                                    <input
                                                                        type="radio"
                                                                        name="only_delivery_assigned_values"
                                                                        value="Yes"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.only_delivery_assigned_values === 'Yes'}/>Yes
                                                                </label>
                                                                <label  style={{paddingLeft:'20px'}}>
                                                                    <input
                                                                        type="radio"
                                                                        name="only_delivery_assigned_values"
                                                                        value="No"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.only_delivery_assigned_values === 'No'}/>No
                                                                </label>
                                                                {this .validator.message("Only Delivery Assigened Orders", this.state.only_delivery_assigned_values, "required")}
                                                                </div>

                                                              

                                                                <div className="col col-md-6">
<label >Can add item discounts (Special Password)
</label>
</div>
<div className="col col-md-6">
<label>
                                                                    <input
                                                                        type="radio"
                                                                        name="can_add_item_discounts"
                                                                        value="Yes"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.can_add_item_discounts === 'Yes'}/>Yes
                                                                </label>
                                                                <label  style={{paddingLeft:'20px'}}>
                                                                    <input
                                                                        type="radio"
                                                                        name="can_add_item_discounts"
                                                                        value="No"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.can_add_item_discounts === 'No'}/>No
                                                                </label>
                                                                {this .validator.message("Can add item discounts", this.state.can_add_item_discounts, "required")}
                                                                </div>

                                                                
                                                                <div className="col col-md-6">
<label >Staff Performance
</label>
</div>
<div className="col col-md-6">
<label>
                                                                    <input
                                                                        type="radio"
                                                                        name="staff_performance"
                                                                        value="Yes"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.staff_performance === 'Yes'}/>Yes
                                                                </label>
                                                                <label  style={{paddingLeft:'20px'}}>
                                                                    <input
                                                                        type="radio"
                                                                        name="staff_performance"
                                                                        value="No"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.staff_performance === 'No'}/>No
                                                                </label>
                                                                {this .validator.message("Staff Performance", this.state.staff_performance, "required")}
                                                                </div>

                                                                <div className="col col-md-6">
<label >Delete KOT Generated of Item(Special Password)
</label>
</div>
<div className="col col-md-6">
<label>
                                                                    <input
                                                                        type="radio"
                                                                        name="delete_kot_generated_of_item"
                                                                        value="Yes"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.delete_kot_generated_of_item === 'Yes'}/>Yes
                                                                </label>
                                                                <label  style={{paddingLeft:'20px'}}>
                                                                    <input
                                                                        type="radio"
                                                                        name="delete_kot_generated_of_item"
                                                                        value="No"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.delete_kot_generated_of_item === 'No'}/>No
                                                                </label>
                                                                {this .validator.message("Delete Kot Generated Of item", this.state.delete_kot_generated_of_item, "required")}
                                                                </div>




                                                                <div className="col col-md-6">
<label >Edit Order
</label>
</div>
<div className="col col-md-6">
<label>
                                                                    <input
                                                                        type="radio"
                                                                        name="edit_order"
                                                                        value="Yes"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.edit_order === 'Yes'}/>Yes
                                                                </label>
                                                                <label  style={{paddingLeft:'20px'}}>
                                                                    <input
                                                                        type="radio"
                                                                        name="edit_order"
                                                                        value="No"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.edit_order === 'No'}/>No
                                                                </label>
                                                                {this .validator.message("Edit Order", this.state.edit_order, "required")}
                                                                </div>


                                                                <div className="col col-md-6">
<label >Add Tables
</label>
</div>
<div className="col col-md-6">
<label>
                                                                    <input
                                                                        type="radio"
                                                                        name="add_tables"
                                                                        value="Yes"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.add_tables === 'Yes'}/>Yes
                                                                </label>
                                                                <label  style={{paddingLeft:'20px'}}>
                                                                    <input
                                                                        type="radio"
                                                                        name="add_tables"
                                                                        value="No"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.add_tables === 'No'}/>No
                                                                </label>
                                                                {this .validator.message("Add Tables", this.state.add_tables, "required")}
                                                                </div>



{/* <div className="col col-md-6">
<label className="container_check not_assign">Generate Billing
<input type="checkbox"  name="UserPermissions"onChange={this.handleChange.bind(this)} value="Generate Billing"/>
  <span className="checkmark"></span>
</label>
</div> */}


{/* <div className="col col-md-6">
<label className="container_check">Basic Analytics
  <input type="checkbox"/>
  <span className="checkmark"></span>
</label>
</div>

<div className="col col-md-6">
<label className="container_check not_assign">Permission type 4  
  <input type="checkbox"/>
  <span className="checkmark"></span>
</label>
</div>

<div className="col col-md-6">
<label className="container_check">View Bills History
  <input type="checkbox"/>
  <span className="checkmark"></span>
</label>
</div>

<div className="col col-md-6">
<label className="container_check">Add & Edit New Staff Accounts
  <input type="checkbox"/>
  <span className="checkmark"></span>
</label>
</div>

<div className="col col-md-6">
<label className="container_check">Sales view
  <input type="checkbox"/>
  <span className="checkmark"></span>
</label>
</div>

<div className="col col-md-6">
<label className="container_check">Customer View
  <input type="checkbox"/>
  <span className="checkmark"></span>
</label>
</div>

<div className="col col-md-6">
<label className="container_check">Customer Data Edit
  <input type="checkbox"/>
  <span className="checkmark"></span>
</label>
</div>

<div className="col col-md-6">
<label className="container_check not_assign">Access Settings Page
  <input type="checkbox"/>
  <span className="checkmark"></span>
</label>
</div>

<div className="col col-md-6">
<label className="container_check">Access display kitchen display
  <input type="checkbox"/>
  <span className="checkmark"></span>
</label>
</div>

<div className="col col-md-6">
<label className="container_check">Can Settle
  <input type="checkbox"/>
  <span className="checkmark"></span>
</label>
</div>

<div className="col col-md-6">
<label className="container_check not_assign">Only Delivery Assigened Orders
  <input type="checkbox"/>
  <span className="checkmark"></span>
</label>
</div>

<div className="col col-md-6">
<label className="container_check not_assign">Can add item discounts (Special Password)
  <input type="checkbox"/>
  <span className="checkmark"></span>
</label>
</div>

<div className="col col-md-6">
<label className="container_check">Staff Performace
  <input type="checkbox"/>
  <span className="checkmark"></span>
</label>
</div>

<div className="col col-md-6">
<label className="container_check">Delete KOT Generated of Item (Special Password)
  <input type="checkbox"/>
  <span className="checkmark"></span>
</label>
</div>

<div className="col col-md-6">
<label className="container_check">Edit Order
  <input type="checkbox"/>
  <span className="checkmark"></span>
</label>
</div>

<div className="col col-md-6">
<label className="container_check">Add Tabels
  <input type="checkbox"/>
  <span className="checkmark"></span>
</label>
</div> */}



</div></div>






</div>



<div className="modal-footer">
<button type="button" className="btn close_btn" data-dismiss="modal">Close </button>
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

export default AllEmplopyesRoles;
