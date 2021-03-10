// import React from "react";
// import { Link } from "react-router-dom";
// import { Form } from "reactstrap";
// import firebase from "../config";
// import SimpleReactValidator from "simple-react-validator";

// class EmployeeLogin extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email_id: "",
//       password: "",
//       error: null,
//       employer_sevice_message: "",
//       showLoading: false,
//     };
//     this.validator = new SimpleReactValidator({
//       className: "text-danger",
//       validators: {
//         passwordvalid: {
//           message:
//             "The :attribute must be at least 6 and at most 30 with 1 numeric,1 special charac" +
//             "ter and 1 alphabet.",
//           rule: function (val, params, validator) {
//             // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
//             // params.indexOf(val) === -1
//             return (
//               validator.helpers.testRegex(
//                 val,
//                 /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{6,30}$/i
//               ) && params.indexOf(val) === -1
//             );
//           },
//         },
//         passwordMismatch: {
//           message: "confirm password must match with password field.",
//           rule: function (val, params, validator) {
//             return document.getElementById("password_input").value === val
//               ? true
//               : false;
//           },
//         },
//       },
//     });
//   }

//   componentWillMount() {
//     document.getElementById("root").className = "h-100";
//   }
//   componentWillUnmount() {
//     document.getElementById("root").className = "";
//   }

//   // handleSubmit = (event) => {
//   //     event.preventDefault();

//   //     if (this.validator.allValid()) {

//   //         const {email_id, password} = this.state;

//   //         firebase
//   //             .auth()
//   //             .signInWithEmailAndPassword(email_id, password)
//   //             .then((result) => {
//   //                 console.log(result);

//   //                 var user = result.user;
//   //                 console.log(user.uid);

//   //                 var ref = firebase
//   //                 .database()
//   //                 .ref(`merchant_users/${user.uid}`);
//   //                 ref.on('value', snapshot => {
//   //                     var gstData = snapshot.val();
//   //                     console.log(gstData);
//   //   if (user.emailVerified == true) {
//   handleSubmit = (event) => {
//     event.preventDefault();

//     if (this.validator.allValid()) {
//       const { email, password } = this.state;

//       firebase
//         .auth()
//         .signInWithEmailAndPassword(email, password)
//         .then((result) => {
//           console.log(result);
//           var user = result.user;
//           console.log(user.uid);
//           firebase
//             .firestore()
//             .collection("merchant_users")
//             .doc(user.uid)

//             .get()
//             .then((snapshot) => {
//               var data = [];

//               var gstData = snapshot.data();
//               console.log(gstData);

//               // if(user.emailVerified==true){
//               // if(gstData.status == "Active"){
//               console.log(user.uid);

//               sessionStorage.setItem("RoleId", user.uid);
//               sessionStorage.setItem("EmployeeUsername", gstData.employee_name);
//               sessionStorage.setItem("EmployeeEmaiId", gstData.email_id);
//               sessionStorage.setItem("SeeAllorders", gstData.see_all_orders);
//               sessionStorage.setItem(
//                 "GenerateBilling",
//                 gstData.generate_billing
//               );
//               sessionStorage.setItem("BasicAnalytics", gstData.basic_analytics);
//               sessionStorage.setItem(
//                 "PermissionType4",
//                 gstData.permission_type_4
//               );
//               sessionStorage.setItem(
//                 "ViewBillsHistory",
//                 gstData.view_bills_history
//               );
//               sessionStorage.setItem(
//                 "AddEditNewStaffAccounts",
//                 gstData.add_edit_new_staff_accounts
//               );
//               sessionStorage.setItem("SalesView", gstData.sales_view);
//               sessionStorage.setItem("CustomerView", gstData.customer_view);
//               sessionStorage.setItem(
//                 "CustomerDataEdit",
//                 gstData.customer_data_edit
//               );
//               sessionStorage.setItem(
//                 "AccessSettingsPage",
//                 gstData.access_settings_page
//               );
//               sessionStorage.setItem("CanSettle", gstData.can_settle);
//               sessionStorage.setItem(
//                 "OnlyDeliveryAssignedValues",
//                 gstData.only_delivery_assigned_values
//               );
//               sessionStorage.setItem(
//                 "CanAddItemDiscounts",
//                 gstData.can_add_item_discounts
//               );
//               sessionStorage.setItem(
//                 "StaffPerformance",
//                 gstData.staff_performance
//               );
//               sessionStorage.setItem(
//                 "DeleteKotGeneratedOfItem",
//                 gstData.delete_kot_generated_of_item
//               );
//               sessionStorage.setItem("EditOrder", gstData.edit_order);
//               sessionStorage.setItem("AddTables", gstData.add_tables);

//               this.props.history.push("/Dashboard");

//               // }else{
//               //     this.setState({employer_sevice_message: "Your Account is InActive"});
//               // }
//               // }else{
//               //     this.setState({employer_sevice_message: "your email id is not verified. please verify your email"});

//               // }
//             });
//         })
//         .catch((error) => {
//           this.setState({ error });
//           console.log(this.state.error);
//           this.setState({ employer_sevice_message: this.state.error.message });
//         });
//     } else {
//       this.validator.showMessages();
//       this.forceUpdate();
//     }
//   };
//   onChange = (event) => {
//     this.setState({
//       [event.target.name]: event.target.value,
//     });
//   };

//   render() {
//     const { email_id, password, error } = this.state;

//     return (
//       <div className="page-wrapper login_register_box">
//         <div className="row h-100">
//           <div className="col-md-5 h-100">
//             <div className="logo_login">
//               <img src="images/icon/logo.svg" />
//             </div>
//           </div>
//           <div className="col-md-7 h-100">
//             <div className="box_login_register h-100 col-12">
//               <div className="login_signup_box">
//                 <div className="login_regi_row col-12 m-b-50">
//                   <span className="btn active">Login</span>
//                   <a href="/Register">
//                     <span className="btn">Register</span>
//                   </a>
//                 </div>
//                 <Form onSubmit={this.handleSubmit}>
//                   <div className="form-group">
//                     <div className="col-12">
//                       <label className=" form-control-label">Business ID</label>
//                     </div>
//                     <div className="col-12">
//                       <input
//                         type="business_id"
//                         name="business_id"
//                         value={this.state.business_id}
//                         onChange={this.onChange}
//                         placeholder=""
//                         title="Please enter you Business Id"
//                         className="form-control"
//                       />
//                       {this.validator.message(
//                         "Business Id",
//                         this.state.business_id,
//                         "required|min:6|max:70"
//                       )}
//                     </div>
//                   </div>
//                   <div className="form-group">
//                     <div className="col-12">
//                       <label className=" form-control-label">Username</label>
//                     </div>
//                     <div className="col-12">
//                       <input
//                         type="email"
//                         id="username"
//                         name="email_id"
//                         value={email_id}
//                         onChange={this.onChange}
//                         placeholder=""
//                         title="Please enter you username"
//                         className="form-control"
//                       />
//                       {this.validator.message(
//                         "Email",
//                         this.state.email_id,
//                         "required|email|min:6|max:70"
//                       )}
//                     </div>
//                   </div>
//                   <div className="form-group">
//                     <div className="col-12">
//                       <label className=" form-control-label">Password</label>
//                     </div>
//                     <div className="col-12">
//                       <input
//                         type="Password"
//                         name="password"
//                         value={password}
//                         onChange={this.onChange}
//                         title="Please enter your password"
//                         placeholder=""
//                         id="password_input"
//                         className="form-control"
//                       />
//                       {this.validator.message(
//                         "Password",
//                         this.state.password,
//                         "required|passwordvalid|min:6|max:30"
//                       )}
//                     </div>
//                   </div>
//                   <div className="form-group col-12 m-t-30">
//                     <button className="btn login_btn_menu">Login</button>
//                     <div className="btn ">
//                       Login As <a href="/">Owner</a>{" "}
//                     </div>
//                     {this.state.employer_sevice_message ? (
//                       <div className="alert alert-warning" role="alert">
//                         {this.state.employer_sevice_message}
//                       </div>
//                     ) : (
//                       ""
//                     )}{" "}
//                   </div>
//                 </Form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default EmployeeLogin;

import React from "react";
import { Link } from "react-router-dom";
import { Form } from "reactstrap";
import firebase from "../config";
import SimpleReactValidator from "simple-react-validator";

class EmployeeLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null,
      employer_sevice_message: "",
      showLoading: false,
    };
    this.validator = new SimpleReactValidator({
      className: "text-danger",
      validators: {
        passwordvalid: {
          message:
            "The :attribute must be at least 6 and at most 30 with 1 numeric,1 special charac" +
            "ter and 1 alphabet.",
          rule: function (val, params, validator) {
            // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
            // params.indexOf(val) === -1
            return (
              validator.helpers.testRegex(
                val,
                /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{6,30}$/i
              ) && params.indexOf(val) === -1
            );
          },
        },
        passwordMismatch: {
          message: "confirm password must match with password field.",
          rule: function (val, params, validator) {
            return document.getElementById("password_input").value === val
              ? true
              : false;
          },
        },
      },
    });
  }
  componentWillMount() {
    document.getElementById("root").className = "h-100";
  }
  componentWillUnmount() {
    document.getElementById("root").className = "";
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.validator.allValid()) {
      const { email, password } = this.state;

      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          console.log(result);
          var user = result.user;
          console.log(user.uid);
          firebase
            .firestore()
            .collection("merchant_users")
            .doc(user.uid)

            .get()
            .then((snapshot) => {
              var data = [];

              var gstData = snapshot.data();
              console.log(gstData);
              //   if (user.emailVerified == true) {
              // if (gstData.status == "Active") {
              console.log(user.uid);
              sessionStorage.setItem("RoleId", user.uid);
              sessionStorage.setItem("username", gstData.user_name);
              sessionStorage.setItem("role", gstData.role);
              sessionStorage.setItem("emai", gstData.email_id);
              sessionStorage.setItem("businessId", gstData.businessId);
              sessionStorage.setItem(
                "viewcustomersdetails",
                gstData.viewcustomersdetails
              );
              sessionStorage.setItem(
                "deleteeditcustomers",
                gstData.deleteeditcustomers
              );
              sessionStorage.setItem(
                "chatwithcustomers",
                gstData.chatwithcustomers
              );

              sessionStorage.setItem("addemployees", gstData.addemployees);
              sessionStorage.setItem(
                "vieweditdeleteemployees",
                gstData.vieweditdeleteemployees
              );

              sessionStorage.setItem("categories", gstData.categories);
              sessionStorage.setItem("items", gstData.items);

              sessionStorage.setItem("addtables", gstData.addtables);
              sessionStorage.setItem(
                "editdeletetables",
                gstData.editdeletetables
              );

              sessionStorage.setItem("addfloors", gstData.addfloors);
              sessionStorage.setItem(
                "editdeletefloors",
                gstData.editdeletefloors
              );
              sessionStorage.setItem("settings", gstData.settings);

              sessionStorage.setItem("viewbill", gstData.viewbill);
              sessionStorage.setItem("settle", gstData.settle);
              sessionStorage.setItem(
                "additemdiscount",
                gstData.additemdiscount
              );

              sessionStorage.setItem(
                "deleteitemafterkot",
                gstData.deleteitemafterkot
              );

              this.props.history.push("/Dashboard");
              // } else {
              //   this.setState({
              //     employer_sevice_message: "Your Account is InActive",
              //   });
              // }
              //   } else {
              //     this.setState({
              //       employer_sevice_message:
              //         "your email id is not verified. please verify your email",
              //     });
              //   }
            });
        })
        .catch((error) => {
          this.setState({ error });
          console.log(this.state.error);
          this.setState({ employer_sevice_message: this.state.error.message });
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const { email, password, error } = this.state;
    return (
      <div className="page-wrapper login_register_box">
        <div className="row h-100">
          <div className="col-md-5 h-100">
            <div className="logo_login">
              <img src="images/icon/logo.svg" />
            </div>
          </div>
          <div className="col-md-7 h-100">
            <div className="box_login_register h-100 col-12">
              <div className="login_signup_box">
                <div className="login_regi_row col-12 m-b-50">
                  <span className="btn active">Login</span>
                  <a href="/Register">
                    <span className="btn">Register</span>
                  </a>
                </div>
                <Form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <div className="col-12">
                      <label className=" form-control-label">Username</label>
                    </div>
                    <div className="col-12">
                      <input
                        type="email"
                        id="username"
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        placeholder=""
                        title="Please enter you username"
                        className="form-control"
                      />
                      {this.validator.message(
                        "Email",
                        this.state.email,
                        "required|email|min:6|max:70"
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-12">
                      <label className=" form-control-label">Password</label>
                    </div>
                    <div className="col-12">
                      <input
                        type="Password"
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        title="Please enter your password"
                        placeholder=""
                        id="password_input"
                        className="form-control"
                      />
                      {this.validator.message(
                        "Password",
                        this.state.password,
                        "required|passwordvalid|min:6|max:30"
                      )}
                    </div>
                  </div>
                  <div className="form-group col-12 m-t-30">
                    <button className="btn login_btn_menu">Login</button>
                    <div className="btn ">
                      Login As <a href="/"> Owner</a>
                    </div>
                    {this.state.employer_sevice_message ? (
                      <div className="alert alert-warning" role="alert">
                        {this.state.employer_sevice_message}
                      </div>
                    ) : (
                      ""
                    )}{" "}
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeeLogin;
