import React from "react";
import firebase from './config';

import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from "react-router-dom";


import BusinessList from './component/business_list';
import AddBusiness from './component/add_business';
import EditBusiness from './component/edit_business';

// import Login from "./auth/Login";

import Login1 from './component/login';
import EmployeeLogin from './component/employee_login';
import Register from './component/register';

import Orders from './component/orders';
import Tables from './component/tables';

import ViewTables from './component/view_table';
import ViewTables1 from './component/view_table_1';
import ViewTables2 from './component/view_table_2';
import ViewTableBillView from './component/view_table_billview';


import AddCategoryMenu from './component/add_category_menu';
import ViewCategory from './component/view_category';

import AddItemMenu from './component/add_item_menu';



import AllEmployees from './component/all_employes';
import EditEmployee from './component/edit_employee';

import AllEmployeePositions from './component/all_employee_positions';
import EditEmployeePosition from './component/edit_employee_position';

import AllEmplopyesRoles from './component/all_employee_roles';
import EditEmployeeRole from './component/edit_employee_role';


import Bills from './component/bills';



import Home from './component/home';


import PopupTesting from './component/popuptesting';

import BillPrintPage from './component/bill_print_page';

import AddCategory from './component/add_category';
import AddSubCategory from './component/add_sub_category';

import FloorList from './component/floor_List';
import EditFloor from './component/edit_floor';

import TablesList from './component/tables_list';
import EditTable from './component/edit_table';

import AddStation from './component/add_station';

import SingleItempage from './component/single_item_page';


import MainCategory from './component/main_category';
import MainSubCategory from './component/main_sub_category';
import MainItems from './component/main_items';

import AllCustomers from './component/all_customers';
import EditCustomer from './component/edit_customer';

import Dashboard from './component/dashboard';

import Settings from './component/settings';

import AllMessages from './component/all_messages';

import CategoryList from './component/category_list';

import Order from './updateddesigns/order';
import LiveCart from './updateddesigns/livecart';
import Bill from './updateddesigns/bill';
import CategorySettings from './updateddesigns/category_settings';
import Settele from './updateddesigns/settele';


import Table from './updateddesigns/tables_view_for_updated_order';

import SettingsAddStation from './settings/settings_add_station';
import AddPrinterId from './settings/add_printer_id';


export const PrivateRoute = ({
    component: Component,
    ...rest
}) => (
    <Route
        {...rest}
        render={props => sessionStorage.getItem("RoleId")
        ? (<Component {...props}/>)
        : (<Redirect
            to={{
            pathname: "/",
            state: {
                from: props.location
            }
        }}/>)}/>
);

class Routing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            orderStatusList: []
        };
    }
  

    render() {
        return (
            <Router>
                 {/* <Route exact strict path="/" component={Login}/> */}

                 <Route exact strict path="/" component={Login1}/>
                 <Route path="/EmployeeLogin" component={EmployeeLogin}/>
                 
                 <Route path="/Register" component={Register}/>


                 <PrivateRoute path="/BusinessList" component={BusinessList}/>
                 <PrivateRoute path="/AddBusiness" component={AddBusiness}/>
                 <PrivateRoute path="/EditBusiness/:businessId" component={EditBusiness}/>
                 


                 <PrivateRoute path="/AllEmployees" component={AllEmployees}/>
                 <PrivateRoute path="/EditEmployee/:employeeId" component={EditEmployee}/>
                 

                 <PrivateRoute path="/AllEmployeePositions" component={AllEmployeePositions}/>
                 <PrivateRoute path="/EditEmployeePosition/:employeePositionId" component={EditEmployeePosition}/>


                 <PrivateRoute path="/AllEmplopyesRoles" component={AllEmplopyesRoles}/>
                 <PrivateRoute path="/EditEmployeeRole/:employeeRoleId" component={EditEmployeeRole}/>
                 

                 <PrivateRoute path="/Orders" component={Orders}/>

                 <PrivateRoute path="/Tables" component={Tables}/>
                 {/* <PrivateRoute path="/ViewTables" component={ViewTables}/> */}
                 {/* <PrivateRoute path="/ViewTables1" component={ViewTables1}/> */}
                 {/* <PrivateRoute path="/ViewTables2" component={ViewTables2}/> */}
                 <PrivateRoute path="/ViewTableBillView" component={ViewTableBillView}/>
                 
               
                 <PrivateRoute path="/ViewTables/:tableId" component={ViewTables} />
                 <PrivateRoute path="/ViewTables1/:plpID" component={ViewTables1} />
                 <PrivateRoute path="/ViewTables2/:plpID" component={ViewTables2} />
                 


                 <PrivateRoute path="/AddCategoryMenu" component={AddCategoryMenu}/>
                 <PrivateRoute path="/ViewCategory" component={ViewCategory}/>
                 

                 <PrivateRoute path="/AddCategory" component={AddCategory}/>
                 <PrivateRoute path="/AddSubCategory" component={AddSubCategory}/>

                 <PrivateRoute path="/AddItemMenu" component={AddItemMenu}/>

                
                 <PrivateRoute path="/Bills" component={Bills}/>

               
                
                 <PrivateRoute path="/Home" component={Home}/>
                 <PrivateRoute path="/PopupTesting" component={PopupTesting}/>

                 <PrivateRoute path="/BillPrintPage" component={BillPrintPage}/>


               

                 <PrivateRoute path="/FloorList" component={FloorList}/>
                 <PrivateRoute path="/EditFloor/:floorId" component={EditFloor}/>
                 

                 <PrivateRoute path="/TablesList" component={TablesList}/>
                 <PrivateRoute path="/EditTable/:tableId" component={EditTable}/>



                 
                 <PrivateRoute path="/AddStation" component={AddStation}/>
                 
              
                 <PrivateRoute path="/SingleItempage/:itemId" component={SingleItempage} />


                 <PrivateRoute path="/MainCategory" component={MainCategory}/>
                 <PrivateRoute path="/MainSubCategory" component={MainSubCategory}/>
                 <PrivateRoute path="/MainItems" component={MainItems}/>
               
                 
                 <PrivateRoute path="/AllCustomers" component={AllCustomers}/>
                 <PrivateRoute path="/EditCustomer/:customerId" component={EditCustomer} />


                 
                 <PrivateRoute path="/Dashboard" component={Dashboard}/>

                 <PrivateRoute path="/Settings" component={Settings}/>
                 

                 <PrivateRoute path="/AllMessages" component={AllMessages}/>


                 <PrivateRoute path="/CategoryList" component={CategoryList}/>
                 
                 <PrivateRoute path="/Order" component={Order}/>
                 {/* <PrivateRoute path="/LiveCart" component={LiveCart}/> */}
                 <PrivateRoute path="/LiveCart/:tableId" component={LiveCart} />
                 <PrivateRoute path="/Bill" component={Bill}/>
                 <PrivateRoute path="/CategorySettings" component={CategorySettings}/>
                 <PrivateRoute path="/Settele" component={Settele}/>

                 <PrivateRoute path="/Table" component={Table}/>

                 <PrivateRoute path="/SettingsAddStation" component={SettingsAddStation}/>
                 <PrivateRoute path="/AddPrinterId" component={AddPrinterId}/>

                 
                 
            </Router>
        );
    }
}

export default Routing;