import React from "react";
import firebase from "../config";
import Sidebar from "./sidebar";
import Header from "./header";
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import { Form } from "reactstrap";
import { Link } from "react-router-dom";

class EditEmployeeRole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      created_on: new Date().toLocaleString(),
    };

    this.onChange = this.onChange.bind(this);

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
        whitespace: {
          message: "The :attribute not allowed first whitespace   characters.",
          rule: function (val, params, validator) {
            // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
            // params.indexOf(val) === -1
            return (
              validator.helpers.testRegex(val, /[^\s\\]/) &&
              params.indexOf(val) === -1
            );
          },
        },
        specialChar: {
          message: "The :attribute not allowed special   characters.",
          rule: function (val, params, validator) {
            // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
            // params.indexOf(val) === -1
            return (
              validator.helpers.testRegex(val, /^[ A-Za-z0-9_@./#&+-]*$/i) &&
              params.indexOf(val) === -1
            );
          },
        },
        specialCharText: {
          message: "The :attribute may only contain letters, dot and spaces.",
          rule: function (val, params, validator) {
            // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
            // params.indexOf(val) === -1
            return (
              validator.helpers.testRegex(val, /^[ A-Za-z_@./#&+-]*$/i) &&
              params.indexOf(val) === -1
            );
          },
        },

        zip: {
          message: "Invalid Pin Code",
          rule: function (val, params, validator) {
            // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
            // params.indexOf(val) === -1
            return (
              validator.helpers.testRegex(val, /^(\d{5}(\d{4})?)?$/i) &&
              params.indexOf(val) === -1
            );
          },
        },
        website: {
          message: "The Url should be example.com ",
          rule: function (val, params, validator) {
            // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
            // params.indexOf(val) === -1
            return (
              validator.helpers.testRegex(
                val,
                /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
              ) && params.indexOf(val) === -1
            );
          },
        },
        Fax: {
          message: "Invalid fax number ",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(
                val,
                /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i
              ) && params.indexOf(val) === -1
            );
          },
        },
      },
    });
  }

  componentDidMount() {
    this.employeeRoleList();
    this.employeePositionsList();
    this.employeeList();
  }

  employeeRoleList = async () => {
    const { employeeRoleId } = this.props.match.params;
    this.setState({ loading: true });
    var ref = await firebase
      .firestore()
      .collection("/employee_userroles")
      .doc(employeeRoleId)
      .get()

      .then((snapshot) => {
        var employeeRole = snapshot.data();

        // console.log(categories)

        this.setState({
          // created_on:employeeRole.created_on,

          employee_name: employeeRole.employee_name,

          employee_position: employeeRole.employee_position,

          employee_mobile_number: employeeRole.employee_mobile_number,
          // UserPermissions:employeeRole.UserPermissions,

          see_all_orders: employeeRole.see_all_orders,
          generate_billing: employeeRole.generate_billing,
          basic_analytics: employeeRole.basic_analytics,
          permission_type_4: employeeRole.permission_type_4,
          view_bills_history: employeeRole.view_bills_history,
          add_edit_new_staff_accounts: employeeRole.add_edit_new_staff_accounts,
          sales_view: employeeRole.sales_view,
          customer_view: employeeRole.customer_view,
          customer_data_edit: employeeRole.customer_data_edit,
          access_settings_page: employeeRole.access_settings_page,
          access_display_kitchen_display:
            employeeRole.access_display_kitchen_display,
          can_settle: employeeRole.can_settle,
          only_delivery_assigned_values:
            employeeRole.only_delivery_assigned_values,
          can_add_item_discounts: employeeRole.can_add_item_discounts,
          staff_performance: employeeRole.staff_performance,
          delete_kot_generated_of_item:
            employeeRole.delete_kot_generated_of_item,
          edit_order: employeeRole.edit_order,
          add_tables: employeeRole.add_tables,
        });
      });
  };
  employeePositionsList = async () => {
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");

    this.setState({ loading: true });

    await firebase
      .firestore()
      .collection("employee_positions")
      .where("sessionId", "==", sessionId)
      .where("businessId", "==", businessId)
      .get()
      .then((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          const GSTData = {
            employeePositionId: childSnapShot.id,

            employee_position: childSnapShot.data().employee_position,
            employee_details: childSnapShot.data().employee_details,
            employee_task_list: childSnapShot.data().employee_task_list,
            employee_position_document: childSnapShot.data()
              .iteemployee_position_documentm_image,
            sessionId: childSnapShot.data().sessionId,
            businessId: childSnapShot.data().businessId,
          };

          data.push(GSTData);
        });
        this.setState({
          employeePositionsList: data,
          countPage: data.length,
          loading: false,
        });
        // console.log(itemTypeList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  employeeList = async () => {
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");

    this.setState({ loading: true });
    await firebase
      .firestore()
      .collection("merchant_users")
      .where("sessionId", "==", sessionId)
      .where("businessId", "==", businessId)
      .where("role", "==", "Employee")

      .get()
      .then((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          const GSTData = {
            employeeId: childSnapShot.id,

            employee_unique_id: childSnapShot.data().employee_unique_id,
            created_on: childSnapShot.data().created_on,

            employee_name: childSnapShot.data().employee_name,
            user_name: childSnapShot.data().user_name,
            password: childSnapShot.data().password,
            employee_position: childSnapShot.data().employee_position,
            employee_division: childSnapShot.data().employee_division,
            employee_employement_type: childSnapShot.data()
              .employee_employement_type,
            email_id: childSnapShot.data().email_id,
            contact_number: childSnapShot.data().contact_number,
            photo: childSnapShot.data().photo,
            employee_special_password: childSnapShot.data()
              .employee_special_password,

            employee_dateofbirth: childSnapShot.data().employee_dateofbirth,
            employee_bloodgroup: childSnapShot.data().employee_bloodgroup,
            employee_address: childSnapShot.data().employee_address,
            employee_emergency_contact_number: childSnapShot.data()
              .employee_emergency_contact_number,
            employee_adharcard: childSnapShot.data().employee_adharcard,

            employee_account_number: childSnapShot.data()
              .employee_account_number,
            employee_ifsc_code: childSnapShot.data().employee_ifsc_code,
            employee_upi_id: childSnapShot.data().employee_upi_id,

            sessionId: childSnapShot.data().sessionId,
            businessId: childSnapShot.data().businessId,
          };

          data.push(GSTData);
        });
        this.setState({
          employeeList: data,
          countPage: data.length,
          loading: false,
        });
        // console.log(itemTypeList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  setMobilenumber = (e) => {
    var sessionId = sessionStorage.getItem("RoleId");
    var username = sessionStorage.getItem("username");
    var businessId = sessionStorage.getItem("businessId");
    console.log(e.target.value);

    let selectedEmpName = e.target.value;

    var ref = firebase
      .firestore()
      .collection("merchant_users")
      //   .where("sessionId", "==", sessionId)
      .where("businessId", "==", businessId)
      .where("role", "==", "Employee")
      .where("employee_name", "==", selectedEmpName)
      .get()
      .then((snapshot) => {
        const data = [];

        snapshot.forEach((childSnapShot) => {
          const GSTList = {
            employeeMobileNumberId: childSnapShot.id,

            employee_name: childSnapShot.data().employee_name,
            employee_mobile_number: childSnapShot.data().contact_number,
          };

          data.push(GSTList);
        });

        this.setState({
          subcategoryList: data,
          employee_name: selectedEmpName,
          loading: false,
        });
        console.log(this.state.subcategoryList);
      });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.validator.allValid()) {
      const { employeeRoleId } = this.props.match.params;
      var sessionId = sessionStorage.getItem("RoleId");
      var username = sessionStorage.getItem("username");
      var businessId = sessionStorage.getItem("businessId");
      var key = Math.round(new Date().getTime() / 1000);
      let dbCon = await firebase
        .firestore()
        .collection("/employee_userroles")
        .doc(employeeRoleId)

        .update({
          created_on: this.state.created_on,

          employee_name: this.state.employee_name,

          employee_position: this.state.employee_position,

          employee_mobile_number: this.state.employee_mobile_number,
          // UserPermissions:this.state.UserPermissions,

          see_all_orders: this.state.see_all_orders,
          generate_billing: this.state.generate_billing,
          basic_analytics: this.state.basic_analytics,
          permission_type_4: this.state.permission_type_4,
          view_bills_history: this.state.view_bills_history,
          add_edit_new_staff_accounts: this.state.add_edit_new_staff_accounts,
          sales_view: this.state.sales_view,
          customer_view: this.state.customer_view,
          customer_data_edit: this.state.customer_data_edit,
          access_settings_page: this.state.access_settings_page,
          access_display_kitchen_display: this.state
            .access_display_kitchen_display,
          can_settle: this.state.can_settle,
          only_delivery_assigned_values: this.state
            .only_delivery_assigned_values,
          can_add_item_discounts: this.state.can_add_item_discounts,
          staff_performance: this.state.staff_performance,
          delete_kot_generated_of_item: this.state.delete_kot_generated_of_item,
          edit_order: this.state.edit_order,
          add_tables: this.state.add_tables,

          sessionId: sessionId,
          username: username,
          businessId: businessId,
        });
      window.location.href = "/AllEmplopyesRoles";
      // this
      //     .props
      //     .history
      //     .push("/AllEmplopyesRoles");
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
    return (
      // <div className="modal fade" id="add_employee_role" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true">
      <div className="modal-dialog modal-sm hipal_pop" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="smallmodalLabel">
              Edit User Roles
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
                      onChange={this.setMobilenumber}
                    >
                      <option>Select Name</option>
                      {this.state.employeeList &&
                        this.state.employeeList.map((data, index) => {
                          return (
                            <option
                              value={data.employee_name}
                              key={index}
                              selected={
                                data.employee_name == this.state.employee_name
                              }
                            >
                              {data.employee_name}
                            </option>
                          );
                        })}
                    </select>
                    {this.validator.message(
                      "Name",
                      this.state.employee_name,
                      "required"
                    )}

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
                      onChange={this.onChange}
                    >
                      <option>{this.state.employee_mobile_number}</option>
                      {this.state.subcategoryList &&
                        this.state.subcategoryList.map((data, index) => {
                          return (
                            <option
                              value={data.employee_mobile_number}
                              key={index}
                              selected={
                                data.employee_mobile_number ==
                                this.state.employee_mobile_number
                              }
                            >
                              {data.employee_mobile_number}
                            </option>
                          );
                        })}
                    </select>
                    {this.validator.message(
                      "Mobile Number",
                      this.state.employee_mobile_number,
                      "required"
                    )}

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
                      onChange={this.onChange}
                    >
                      <option>Select Position</option>
                      {this.state.employeePositionsList &&
                        this.state.employeePositionsList.map((data, index) => {
                          return (
                            <option
                              value={data.employee_position}
                              key={index}
                              selected={
                                data.employee_position ==
                                this.state.employee_position
                              }
                            >
                              {data.employee_position}
                            </option>
                          );
                        })}
                    </select>
                    {this.validator.message(
                      "Position",
                      this.state.employee_position,
                      "required"
                    )}

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
                    <label>See All Orders</label>
                  </div>
                  <div className="col col-md-6">
                    <label>
                      <input
                        type="radio"
                        name="see_all_orders"
                        value="Yes"
                        onChange={this.onChange}
                        checked={this.state.see_all_orders === "Yes"}
                      />
                      Yes
                    </label>
                    <label style={{ paddingLeft: "20px" }}>
                      <input
                        type="radio"
                        name="see_all_orders"
                        value="No"
                        onChange={this.onChange}
                        checked={this.state.see_all_orders === "No"}
                      />
                      No
                    </label>
                    {this.validator.message(
                      "See All Orders",
                      this.state.see_all_orders,
                      "required"
                    )}
                  </div>

                  <div className="col col-md-6">
                    <label>Generate Billing</label>
                  </div>
                  <div className="col col-md-6">
                    <label>
                      <input
                        type="radio"
                        name="generate_billing"
                        value="Yes"
                        onChange={this.onChange}
                        checked={this.state.generate_billing === "Yes"}
                      />
                      Yes
                    </label>
                    <label style={{ paddingLeft: "20px" }}>
                      <input
                        type="radio"
                        name="generate_billing"
                        value="No"
                        onChange={this.onChange}
                        checked={this.state.generate_billing === "No"}
                      />
                      No
                    </label>
                    {this.validator.message(
                      "Generate Billing",
                      this.state.generate_billing,
                      "required"
                    )}
                  </div>

                  <div className="col col-md-6">
                    <label>Basic Analytics</label>
                  </div>
                  <div className="col col-md-6">
                    <label>
                      <input
                        type="radio"
                        name="basic_analytics"
                        value="Yes"
                        onChange={this.onChange}
                        checked={this.state.basic_analytics === "Yes"}
                      />
                      Yes
                    </label>
                    <label style={{ paddingLeft: "20px" }}>
                      <input
                        type="radio"
                        name="basic_analytics"
                        value="No"
                        onChange={this.onChange}
                        checked={this.state.basic_analytics === "No"}
                      />
                      No
                    </label>
                    {this.validator.message(
                      "Basic Analytics",
                      this.state.basic_analytics,
                      "required"
                    )}
                  </div>

                  <div className="col col-md-6">
                    <label>Permission type 4</label>
                  </div>
                  <div className="col col-md-6">
                    <label>
                      <input
                        type="radio"
                        name="permission_type_4"
                        value="Yes"
                        onChange={this.onChange}
                        checked={this.state.permission_type_4 === "Yes"}
                      />
                      Yes
                    </label>
                    <label style={{ paddingLeft: "20px" }}>
                      <input
                        type="radio"
                        name="permission_type_4"
                        value="No"
                        onChange={this.onChange}
                        checked={this.state.permission_type_4 === "No"}
                      />
                      No
                    </label>
                    {this.validator.message(
                      "Permission type 4 ",
                      this.state.permission_type_4,
                      "required"
                    )}
                  </div>

                  <div className="col col-md-6">
                    <label>View Bills History</label>
                  </div>
                  <div className="col col-md-6">
                    <label>
                      <input
                        type="radio"
                        name="view_bills_history"
                        value="Yes"
                        onChange={this.onChange}
                        checked={this.state.view_bills_history === "Yes"}
                      />
                      Yes
                    </label>
                    <label style={{ paddingLeft: "20px" }}>
                      <input
                        type="radio"
                        name="view_bills_history"
                        value="No"
                        onChange={this.onChange}
                        checked={this.state.view_bills_history === "No"}
                      />
                      No
                    </label>
                    {this.validator.message(
                      "View Bills History ",
                      this.state.view_bills_history,
                      "required"
                    )}
                  </div>

                  <div className="col col-md-6">
                    <label>Add & Edit New Staff Accounts</label>
                  </div>
                  <div className="col col-md-6">
                    <label>
                      <input
                        type="radio"
                        name="add_edit_new_staff_accounts"
                        value="Yes"
                        onChange={this.onChange}
                        checked={
                          this.state.add_edit_new_staff_accounts === "Yes"
                        }
                      />
                      Yes
                    </label>
                    <label style={{ paddingLeft: "20px" }}>
                      <input
                        type="radio"
                        name="add_edit_new_staff_accounts"
                        value="No"
                        onChange={this.onChange}
                        checked={
                          this.state.add_edit_new_staff_accounts === "No"
                        }
                      />
                      No
                    </label>
                    {this.validator.message(
                      "Add & Edit New Staff Accounts ",
                      this.state.add_edit_new_staff_accounts,
                      "required"
                    )}
                  </div>

                  <div className="col col-md-6">
                    <label>Sales View</label>
                  </div>
                  <div className="col col-md-6">
                    <label>
                      <input
                        type="radio"
                        name="sales_view"
                        value="Yes"
                        onChange={this.onChange}
                        checked={this.state.sales_view === "Yes"}
                      />
                      Yes
                    </label>
                    <label style={{ paddingLeft: "20px" }}>
                      <input
                        type="radio"
                        name="sales_view"
                        value="No"
                        onChange={this.onChange}
                        checked={this.state.sales_view === "No"}
                      />
                      No
                    </label>
                    {this.validator.message(
                      "Sales View ",
                      this.state.sales_view,
                      "required"
                    )}
                  </div>

                  <div className="col col-md-6">
                    <label>Customer View</label>
                  </div>
                  <div className="col col-md-6">
                    <label>
                      <input
                        type="radio"
                        name="customer_view"
                        value="Yes"
                        onChange={this.onChange}
                        checked={this.state.customer_view === "Yes"}
                      />
                      Yes
                    </label>
                    <label style={{ paddingLeft: "20px" }}>
                      <input
                        type="radio"
                        name="customer_view"
                        value="No"
                        onChange={this.onChange}
                        checked={this.state.customer_view === "No"}
                      />
                      No
                    </label>
                    {this.validator.message(
                      "Customer View ",
                      this.state.customer_view,
                      "required"
                    )}
                  </div>

                  <div className="col col-md-6">
                    <label>Customer Data Edit</label>
                  </div>
                  <div className="col col-md-6">
                    <label>
                      <input
                        type="radio"
                        name="customer_data_edit"
                        value="Yes"
                        onChange={this.onChange}
                        checked={this.state.customer_data_edit === "Yes"}
                      />
                      Yes
                    </label>
                    <label style={{ paddingLeft: "20px" }}>
                      <input
                        type="radio"
                        name="customer_data_edit"
                        value="No"
                        onChange={this.onChange}
                        checked={this.state.customer_data_edit === "No"}
                      />
                      No
                    </label>
                    {this.validator.message(
                      "Customer Data Edit ",
                      this.state.customer_data_edit,
                      "required"
                    )}
                  </div>

                  <div className="col col-md-6">
                    <label>Access Settings Page</label>
                  </div>
                  <div className="col col-md-6">
                    <label>
                      <input
                        type="radio"
                        name="access_settings_page"
                        value="Yes"
                        onChange={this.onChange}
                        checked={this.state.access_settings_page === "Yes"}
                      />
                      Yes
                    </label>
                    <label style={{ paddingLeft: "20px" }}>
                      <input
                        type="radio"
                        name="access_settings_page"
                        value="No"
                        onChange={this.onChange}
                        checked={this.state.access_settings_page === "No"}
                      />
                      No
                    </label>
                    {this.validator.message(
                      "Access Settings Page",
                      this.state.access_settings_page,
                      "required"
                    )}
                  </div>

                  <div className="col col-md-6">
                    <label>Access Display Kitchen Display</label>
                  </div>
                  <div className="col col-md-6">
                    <label>
                      <input
                        type="radio"
                        name="access_display_kitchen_display"
                        value="Yes"
                        onChange={this.onChange}
                        checked={
                          this.state.access_display_kitchen_display === "Yes"
                        }
                      />
                      Yes
                    </label>
                    <label style={{ paddingLeft: "20px" }}>
                      <input
                        type="radio"
                        name="access_display_kitchen_display"
                        value="No"
                        onChange={this.onChange}
                        checked={
                          this.state.access_display_kitchen_display === "No"
                        }
                      />
                      No
                    </label>
                    {this.validator.message(
                      "Access Display Kitchen Display",
                      this.state.access_display_kitchen_display,
                      "required"
                    )}
                  </div>

                  <div className="col col-md-6">
                    <label>Can Settle</label>
                  </div>
                  <div className="col col-md-6">
                    <label>
                      <input
                        type="radio"
                        name="can_settle"
                        value="Yes"
                        onChange={this.onChange}
                        checked={this.state.can_settle === "Yes"}
                      />
                      Yes
                    </label>
                    <label style={{ paddingLeft: "20px" }}>
                      <input
                        type="radio"
                        name="can_settle"
                        value="No"
                        onChange={this.onChange}
                        checked={this.state.can_settle === "No"}
                      />
                      No
                    </label>
                    {this.validator.message(
                      "Can Settle",
                      this.state.can_settle,
                      "required"
                    )}
                  </div>

                  <div className="col col-md-6">
                    <label>Only Delivery Assigened Orders</label>
                  </div>
                  <div className="col col-md-6">
                    <label>
                      <input
                        type="radio"
                        name="only_delivery_assigned_values"
                        value="Yes"
                        onChange={this.onChange}
                        checked={
                          this.state.only_delivery_assigned_values === "Yes"
                        }
                      />
                      Yes
                    </label>
                    <label style={{ paddingLeft: "20px" }}>
                      <input
                        type="radio"
                        name="only_delivery_assigned_values"
                        value="No"
                        onChange={this.onChange}
                        checked={
                          this.state.only_delivery_assigned_values === "No"
                        }
                      />
                      No
                    </label>
                    {this.validator.message(
                      "Only Delivery Assigened Orders",
                      this.state.only_delivery_assigned_values,
                      "required"
                    )}
                  </div>

                  <div className="col col-md-6">
                    <label>Can add item discounts (Special Password)</label>
                  </div>
                  <div className="col col-md-6">
                    <label>
                      <input
                        type="radio"
                        name="can_add_item_discounts"
                        value="Yes"
                        onChange={this.onChange}
                        checked={this.state.can_add_item_discounts === "Yes"}
                      />
                      Yes
                    </label>
                    <label style={{ paddingLeft: "20px" }}>
                      <input
                        type="radio"
                        name="can_add_item_discounts"
                        value="No"
                        onChange={this.onChange}
                        checked={this.state.can_add_item_discounts === "No"}
                      />
                      No
                    </label>
                    {this.validator.message(
                      "Can add item discounts",
                      this.state.can_add_item_discounts,
                      "required"
                    )}
                  </div>

                  <div className="col col-md-6">
                    <label>Staff Performance</label>
                  </div>
                  <div className="col col-md-6">
                    <label>
                      <input
                        type="radio"
                        name="staff_performance"
                        value="Yes"
                        onChange={this.onChange}
                        checked={this.state.staff_performance === "Yes"}
                      />
                      Yes
                    </label>
                    <label style={{ paddingLeft: "20px" }}>
                      <input
                        type="radio"
                        name="staff_performance"
                        value="No"
                        onChange={this.onChange}
                        checked={this.state.staff_performance === "No"}
                      />
                      No
                    </label>
                    {this.validator.message(
                      "Staff Performance",
                      this.state.staff_performance,
                      "required"
                    )}
                  </div>

                  <div className="col col-md-6">
                    <label>
                      Delete KOT Generated of Item(Special Password)
                    </label>
                  </div>
                  <div className="col col-md-6">
                    <label>
                      <input
                        type="radio"
                        name="delete_kot_generated_of_item"
                        value="Yes"
                        onChange={this.onChange}
                        checked={
                          this.state.delete_kot_generated_of_item === "Yes"
                        }
                      />
                      Yes
                    </label>
                    <label style={{ paddingLeft: "20px" }}>
                      <input
                        type="radio"
                        name="delete_kot_generated_of_item"
                        value="No"
                        onChange={this.onChange}
                        checked={
                          this.state.delete_kot_generated_of_item === "No"
                        }
                      />
                      No
                    </label>
                    {this.validator.message(
                      "Delete Kot Generated Of item",
                      this.state.delete_kot_generated_of_item,
                      "required"
                    )}
                  </div>

                  <div className="col col-md-6">
                    <label>Edit Order</label>
                  </div>
                  <div className="col col-md-6">
                    <label>
                      <input
                        type="radio"
                        name="edit_order"
                        value="Yes"
                        onChange={this.onChange}
                        checked={this.state.edit_order === "Yes"}
                      />
                      Yes
                    </label>
                    <label style={{ paddingLeft: "20px" }}>
                      <input
                        type="radio"
                        name="edit_order"
                        value="No"
                        onChange={this.onChange}
                        checked={this.state.edit_order === "No"}
                      />
                      No
                    </label>
                    {this.validator.message(
                      "Edit Order",
                      this.state.edit_order,
                      "required"
                    )}
                  </div>

                  <div className="col col-md-6">
                    <label>Add Tables</label>
                  </div>
                  <div className="col col-md-6">
                    <label>
                      <input
                        type="radio"
                        name="add_tables"
                        value="Yes"
                        onChange={this.onChange}
                        checked={this.state.add_tables === "Yes"}
                      />
                      Yes
                    </label>
                    <label style={{ paddingLeft: "20px" }}>
                      <input
                        type="radio"
                        name="add_tables"
                        value="No"
                        onChange={this.onChange}
                        checked={this.state.add_tables === "No"}
                      />
                      No
                    </label>
                    {this.validator.message(
                      "Add Tables",
                      this.state.add_tables,
                      "required"
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/AllEmplopyesRoles">
                <button
                  type="button"
                  className="btn close_btn"
                  data-dismiss="modal"
                >
                  Close{" "}
                </button>
              </Link>
              <button type="submit" className="btn save_btn">
                Save
              </button>
            </div>
          </Form>
        </div>
      </div>
      // </div>
    );
  }
}

export default EditEmployeeRole;
