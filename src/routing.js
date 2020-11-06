import React from "react";
import firebase from './config';

import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from "react-router-dom";


import BusinessList from './component/business_list';
import AddBusiness from './component/add_business';
import EditBusiness from './component/edit_business';



import Login1 from './component/login';
import EmployeeLogin from './component/employee_login';
import Register from './component/register';

import Orders from './component/orders';



import AddCategoryMenu from './component/add_category_menu';
import AddCategoryMenuDuplicate from './component/add_category_menu_duplicate';
import ViewCategory from './component/view_category';

import AddItemMenu from './component/add_item_menu';
import ViewItemMenu from './component/view_item_menu';
import AddItemType from './component/add_item_type';



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



import FloorList from './component/floor_List';
import EditFloor from './component/edit_floor';

import TablesList from './component/tables_list';
import EditTable from './component/edit_table';

import AddStation from './component/add_station';
import SingleItempage from './component/single_item_page';




import AllCustomers from './component/all_customers';
import EditCustomer from './component/edit_customer';

import Dashboard from './component/dashboard';

import Settings from './component/settings';

import AllMessages from './component/all_messages';

import CategoryList from './component/category_list';


import Table from './updateddesigns/tables_view_for_updated_order';
import Order from './updateddesigns/order';
import LiveCart from './updateddesigns/livecart';
import Bill from './updateddesigns/bill';
import CategorySettings from './updateddesigns/category_settings';
import Settele from './updateddesigns/settele';




import SettingsAddStation from './settings/settings_add_station';
import SettingsEditStation from './settings/settings_edit_station';
import AddPrinterId from './settings/add_printer_id';

import SettingsAddUploadCaurosel from './settings/settings_add_upload_caurosel';
import SettingsEditUploadCaurosel from './settings/settings_edit_upload_caurosel';

import SettingsItemsList from './settings/settings_items_list';

import SettingsAddImageMedia from './settings/settings_add_media image';
import SettingsEditImageMedia from './settings/settings_edit_media_page';


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

               
                 


                 <PrivateRoute path="/AddCategoryMenu" component={AddCategoryMenu}/>


                 <PrivateRoute path="/AddCategoryMenuDuplicate" component={AddCategoryMenuDuplicate}/>
                 <PrivateRoute path="/CategoryList" component={CategoryList}/>
                 <PrivateRoute path="/ViewCategory" component={ViewCategory}/>
                 

             

                 <PrivateRoute path="/AddItemMenu" component={AddItemMenu}/>
                 <PrivateRoute path="/ViewItemMenu" component={ViewItemMenu}/>
                 
                 <PrivateRoute path="/AddItemType" component={AddItemType}/>
                 
                
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


               
               
                 
                 <PrivateRoute path="/AllCustomers" component={AllCustomers}/>
                 <PrivateRoute path="/EditCustomer/:customerId" component={EditCustomer} />


                 
                 <PrivateRoute path="/Dashboard" component={Dashboard}/>

                 <PrivateRoute path="/Settings" component={Settings}/>
                 

                 <PrivateRoute path="/AllMessages" component={AllMessages}/>


                

                 <PrivateRoute path="/Table" component={Table}/>
                 <PrivateRoute path="/Order" component={Order}/>
               
                 <PrivateRoute path="/LiveCart/:tableId" component={LiveCart} />
                 <PrivateRoute path="/Bill" component={Bill}/>
                 <PrivateRoute path="/CategorySettings" component={CategorySettings}/>
                 <PrivateRoute path="/Settele" component={Settele}/>

               

                 <PrivateRoute path="/SettingsAddStation" component={SettingsAddStation}/>
                 <PrivateRoute path="/SettingsEditStation/:stationId" component={SettingsEditStation} />
                 
                 <PrivateRoute path="/AddPrinterId" component={AddPrinterId}/>

                 <PrivateRoute path="/SettingsAddUploadCaurosel" component={SettingsAddUploadCaurosel}/>
                 <PrivateRoute path="/SettingsEditUploadCaurosel/:uploadcauroselIdId" component={SettingsEditUploadCaurosel} />
                 
                 <PrivateRoute path="/SettingsItemsList" component={SettingsItemsList}/>

                 <PrivateRoute path="/SettingsAddImageMedia" component={SettingsAddImageMedia}/>
                 <PrivateRoute path="/SettingsEditImageMedia/:mediaimageId" component={SettingsEditImageMedia} />
                 
                 
                 
                 
            </Router>
        );
    }
}

export default Routing;
