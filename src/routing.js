import React from "react";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

//Auth
import Login1 from "./Auth/login";
import EmployeeLogin from "./Auth/employee_login";
import Register from "./Auth/register";

//Business
import BusinessList from "./Business/business_list";
import AddBusiness from "./Business/add_business";
import EditBusiness from "./Business/edit_business";

//Dashboard it is in the component Folder
import Dashboard from "./component/dashboard";

// OrdersPages(LiveCart)
import Table from "./OrdersPages/tables_view_for_updated_order";
import MainPage from "./OrdersPages/LiveCart/index";

//Customers
import AllCustomers from "./Customers/all_customers";

//Category
import AddCategoryMenuDuplicate from "./category/add_category_menu_duplicate";
import EditCategoryMenu from "./category/edit_category_menu";
import ViewCategoryMenu from "./category/view_category_menu";
import CategoryList from "./category/category_list";
//Item Menu
import AddItemMenu from "./ItemMenu/add_item_menu";
import EditItemMenu from "./ItemMenu/edit_item_menu";
import ViewItemMenu from "./ItemMenu/view_item_menu";
import AddItemType from "./ItemMenu/add_item_type";
import AddStation from "./ItemMenu/add_station";

//Employees
import AllEmployees from "./Employees/all_employes";
import AllEmployeePositions from "./Employees/all_employee_positions";
import AllEmplopyesRoles from "./Employees/all_employee_roles";
import EditEmployeeRole from "./Employees/edit_employee_role";

//Messages
import AllMessages from "./Messages/all_messages";

//Bills
import Bills2 from "./Bills/bills2";
import ViewBill from "./Bills/view_bill";

//Tables
import TablesList from "./Tables/tables_list";

//Floors
import FloorList from "./Floors/floor_List";

//Settings
import Settings from "./component/settings";

//KotPage
import KOT from "./KotPage/index";

import SettingsAddStation from "./settings/settings_add_station";
import SettingsEditStation from "./settings/settings_edit_station";
import AddPrinterId from "./settings/add_printer_id";

import SettingsAddUploadCaurosel from "./settings/settings_add_upload_caurosel";
import SettingsEditUploadCaurosel from "./settings/settings_edit_upload_caurosel";

import SettingsItemsList from "./settings/settings_items_list";

import SettingsAddImageMedia from "./settings/settings_add_media image";
import SettingsEditImageMedia from "./settings/settings_edit_media_page";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      sessionStorage.getItem("RoleId") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: {
              from: props.location,
            },
          }}
        />
      )
    }
  />
);

class Routing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderStatusList: [],
    };
  }

  render() {
    return (
      <Router>
        {/* Auth */}
        <Route exact strict path="/" component={Login1} />
        <Route path="/EmployeeLogin" component={EmployeeLogin} />
        <Route path="/Register" component={Register} />

        {/* Business */}
        <PrivateRoute path="/BusinessList" component={BusinessList} />
        <PrivateRoute path="/AddBusiness" component={AddBusiness} />
        <PrivateRoute
          path="/EditBusiness/:businessId"
          component={EditBusiness}
        />

        {/* Dashboard */}
        <PrivateRoute path="/Dashboard" component={Dashboard} />

        {/* OrdersPages(LiveCart) */}
        <PrivateRoute path="/LiveCart/:tableId" component={MainPage} />
        <PrivateRoute path="/Table" component={Table} />

        {/* Customers */}
        <PrivateRoute path="/AllCustomers" component={AllCustomers} />

        {/* Item Menu */}
        <PrivateRoute path="/ViewItemMenu" component={ViewItemMenu} />
        <PrivateRoute path="/AddItemMenu" component={AddItemMenu} />
        <PrivateRoute
          path="/EditItemMenu/:itemmenuid"
          component={EditItemMenu}
        />
        <PrivateRoute path="/AddItemType" component={AddItemType} />
        <PrivateRoute path="/AddStation" component={AddStation} />

        {/* Category */}
        <PrivateRoute path="/CategoryList" component={CategoryList} />
        <PrivateRoute
          path="/AddCategoryMenuDuplicate"
          component={AddCategoryMenuDuplicate}
        />
        <PrivateRoute
          path="/EditCategoryMenu/:categoryId"
          component={EditCategoryMenu}
        />
        <PrivateRoute
          path="/ViewCategoryMenu/:categoryId"
          component={ViewCategoryMenu}
        />

        {/* Employees */}
        <PrivateRoute path="/AllEmployees" component={AllEmployees} />
        <PrivateRoute
          path="/AllEmployeePositions"
          component={AllEmployeePositions}
        />
        <PrivateRoute path="/AllEmplopyesRoles" component={AllEmplopyesRoles} />
        <PrivateRoute
          path="/EditEmployeeRole/:employeeRoleId"
          component={EditEmployeeRole}
        />

        {/* Messages */}
        <PrivateRoute path="/AllMessages" component={AllMessages} />

        {/* Bills */}
        <PrivateRoute path="/Bills" component={Bills2} />
        <PrivateRoute path="/ViewBill/:billid" component={ViewBill} />

        {/* Tables */}
        <PrivateRoute path="/TablesList" component={TablesList} />

        {/* Floors */}
        <PrivateRoute path="/FloorList" component={FloorList} />

        {/* KotPage */}
        <PrivateRoute path="/KOT" component={KOT} />

        {/* Settings */}
        <PrivateRoute path="/Settings" component={Settings} />
        <PrivateRoute
          path="/SettingsAddStation"
          component={SettingsAddStation}
        />
        <PrivateRoute
          path="/SettingsEditStation/:stationId"
          component={SettingsEditStation}
        />
        <PrivateRoute path="/AddPrinterId" component={AddPrinterId} />
        <PrivateRoute
          path="/SettingsAddUploadCaurosel"
          component={SettingsAddUploadCaurosel}
        />
        <PrivateRoute
          path="/SettingsEditUploadCaurosel/:uploadcauroselIdId"
          component={SettingsEditUploadCaurosel}
        />
        <PrivateRoute path="/SettingsItemsList" component={SettingsItemsList} />
        <PrivateRoute
          path="/SettingsAddImageMedia"
          component={SettingsAddImageMedia}
        />
        <PrivateRoute
          path="/SettingsEditImageMedia/:mediaimageId"
          component={SettingsEditImageMedia}
        />
      </Router>
    );
  }
}

export default Routing;
