import React from "react";
import firebase from "../config";
import { Link, withRouter } from "react-router-dom";
import swal from "sweetalert";
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  logout = () => {
    swal({
      title: "Are you sure?",
      text: "Do your really want to log out your account?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        firebase
          .auth()
          .signOut()
          .then(
            function () {
              console.log("Logged out!");
              sessionStorage.clear();
            },
            function (error) {
              console.log(error.code);
            }
          );
        sessionStorage.clear();
        window.location.href = "/";
        // this.props.history.push("/");
      } else {
      }
    });
  };
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
              <li>
                <Link to="/Dashboard" className="home">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/Table" className="oders">
                  Orders
                </Link>
              </li>
              {sessionStorage.getItem("role") == "Merchant" ||
              sessionStorage.getItem("customers") == "Read" ||
              sessionStorage.getItem("customers") == "Read&Write" ? (
                <li>
                  <Link to="/AllCustomers" className="customers">
                    Customers
                  </Link>
                </li>
              ) : (
                ""
              )}
              {/* <li>
                <Link to="/AddItemMenu" className="resturent">
                  Menu
                </Link>
              </li> */}
              <li>
                <Link to="/ViewItemMenu" className="resturent">
                  My Restaurant
                </Link>
              </li>
              <li>
                <Link to="/AllEmployees" className="employees">
                  Employees
                </Link>
              </li>
              <li>
                <Link to="/AllMessages" className="messages">
                  Messages
                </Link>
              </li>
              <li>
                <Link to="/Bills" className="bills">
                  Bills
                </Link>
              </li>
              <li>
                <Link to="/TablesList" className="tabels">
                  Tables
                </Link>
              </li>
              {sessionStorage.getItem("role") == "Merchant" ||
              sessionStorage.getItem("settings") == "Yes" ? (
                <li>
                  <Link to="/Settings" className="settings">
                    Settings
                  </Link>
                </li>
              ) : (
                ""
              )}
              {sessionStorage.getItem("role") == "Merchant" ? (
                <li>
                  <Link to="/BusinessList" className="settings">
                    Business List
                  </Link>
                </li>
              ) : (
                ""
              )}
              {/* <li>
                <div className="settings" onClick={this.logout}>
                  Logout
                </div>
              </li> */}
              <li>
                <a href="#" className="settings" onClick={this.logout}>
                  Logout
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Sidebar);
