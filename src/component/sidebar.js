import React from "react";
import firebase from '../config';
import {Link , withRouter} from "react-router-dom";

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

         
        };
    }
  

    render() {
        return (
            
   

    //         <aside className="menu-sidebar d-none d-lg-block">
                                
    //             <div className="menu-sidebar__content js-scrollbar1">
    //                 <nav className="navbar-sidebar">
    //                     <ul className="list-unstyled navbar__list">
                            
    // <li className={this.isPathActive('/Home') ? 'active' : null}><a href="/Home" className="home"> Home</a></li>

    // <li className={this.isPathActive('/Tables') ? 'active' : null}><a href="/Tables" className="oders">Orders</a></li>

    //   <li className={this.isPathActive('/AddItemMenu') ? 'active' : null}><a href="/AddItemMenu" className="bills">Menu</a></li>

    // <li><a href="#" className="customers">Customers</a></li>

    // <li><a href="#"  className="employees">My Restaurent</a></li>
    // <li><a href="/TablesList"  className="employees">Tables</a></li>


    


    // <li className={this.isPathActive('/AllEmployees') ? 'active' : null}><a href="/AllEmployees" className="employees">Employees</a></li>
    

    // <li><a href="#"  className="messages">Messages</a></li>

    // <li className={this.isPathActive('/Bills') ? 'active' : null}><a href="/Bills" className="bills">Bills</a></li>
   

    // <li><a href="#" className="settings">Settings</a></li>
    
                            
                            
                            
    
                            
                   
                            
                        
                            
    //                     </ul>
    //                 </nav>
    //             </div>
    //         </aside>



    <aside className="menu-sidebar d-none d-lg-block">
          				  
            <div className="menu-sidebar__content js-scrollbar1">
                <nav className="navbar-sidebar">
                    <ul className="list-unstyled navbar__list">
                        
<li><a href="#" className="home">Home</a></li>
<li><a href="/Tables" className="oders">Orders</a></li>
<li><a href="/AllCustomers" className="customers">Customers</a></li>
<li><a href="/AddItemMenu"  className="resturent">Menu</a></li>
<li><a href="#"  className="resturent">My Restaurent</a></li>
<li><a href="/AllEmployees"  className="employees">Employees</a></li>
<li><a href="/AllMessages"  className="messages">Messages</a></li>
<li><a href="#"  className="bills">Bills</a></li>
<li><a href="/TablesList"  className="tabels">Tabels</a></li>
<li><a href="/Settings" className="settings">Settings</a></li>
<li><a href="/BusinessList" className="settings">Business List</a></li>

						
						
						
						
                        
               
						
					
						
                    </ul>
                </nav>
            </div>
        </aside>
        
    
           
        );
    }

    isPathActive(path) {
        return this
            .props
            .location
            .pathname
            .startsWith(path);
    }


}

export default withRouter(Sidebar);
