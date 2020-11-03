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
                            
    // <li className={this.isPathActive('/Home') ? 'active' : null}><Link to="/Home" className="home"> Home</Link></li>

    // <li className={this.isPathActive('/Tables') ? 'active' : null}><Link to="/Tables" className="oders">Orders</Link></li>

    //   <li className={this.isPathActive('/AddItemMenu') ? 'active' : null}><Link to="/AddItemMenu" className="bills">Menu</Link></li>

    // <li><Link to="#" className="customers">Customers</Link></li>

    // <li><Link to="#"  className="employees">My Restaurent</Link></li>
    // <li><Link to="/TablesList"  className="employees">Tables</Link></li>


    


    // <li className={this.isPathActive('/AllEmployees') ? 'active' : null}><Link to="/AllEmployees" className="employees">Employees</Link></li>
    

    // <li><Link to="#"  className="messages">Messages</Link></li>

    // <li className={this.isPathActive('/Bills') ? 'active' : null}><Link to="/Bills" className="bills">Bills</Link></li>
   

    // <li><Link to="#" className="settings">Settings</Link></li>
    
                            
                            
                            
    
                            
                   
                            
                        
                            
    //                     </ul>
    //                 </nav>
    //             </div>
    //         </aside>



    <aside className="menu-sidebar d-none d-lg-block">
          				  
            <div className="menu-sidebar__content js-scrollbar1">
                <nav className="navbar-sidebar">
                    <ul className="list-unstyled navbar__list">
                        
<li><Link to="/Dashboard" className="home">Home</Link></li>
<li><Link to="/Table" className="oders">Orders</Link></li>
<li><Link to="/AllCustomers" className="customers">Customers</Link></li>
<li><Link to="/AddItemMenu"  className="resturent">Menu</Link></li>
<li><Link to="#"  className="resturent">My Restaurent</Link></li>
<li><Link to="/AllEmployees"  className="employees">Employees</Link></li>
<li><Link to="/AllMessages"  className="messages">Messages</Link></li>
<li><Link to="/Bills"  className="bills">Bills</Link></li>
<li><Link to="/TablesList"  className="tabels">Tabels</Link></li>
<li><Link to="/Settings" className="settings">Settings</Link></li>
<li><Link to="/BusinessList" className="settings">Business List</Link></li>

						
						
						
						
                        
               
						
					
						
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
