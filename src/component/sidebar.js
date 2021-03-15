//sidebar inside the business page
import React from "react";
import firebase from "../config";
import { Link, withRouter } from "react-router-dom";
import swal from "sweetalert";
import { Scrollbars } from "react-custom-scrollbars";
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
      <aside className="menu-sidebar d-none d-lg-block">
        <Scrollbars height={100} autoHide={1000}>
          <div className="menu-sidebar__content js-scrollbar1">
            <nav className="navbar-sidebar">
              <ul className="list-unstyled navbar__list">
                <li
                  className={this.isPathActive("/Dashboard") ? "active" : null}
                >
                  <Link to="/Dashboard" className="home">
                    Dashboard
                  </Link>
                </li>
                <li className={this.isPathActive("/Table") ? "active" : null}>
                  <Link to="/Table" className="oders">
                    Orders
                  </Link>
                </li>
                {sessionStorage.getItem("role") == "Merchant" ||
                sessionStorage.getItem("customers") == "Read" ||
                sessionStorage.getItem("customers") == "Read&Write" ? (
                  <li
                    className={
                      this.isPathActive("/AllCustomers") ? "active" : null
                    }
                  >
                    <Link to="/AllCustomers" className="customers">
                      Customers
                    </Link>
                  </li>
                ) : (
                  ""
                )}

                <li
                  className={
                    this.isPathActive("/ViewItemMenu") ? "active" : null
                  }
                >
                  <Link to="/ViewItemMenu" className="resturent">
                    My Restaurant
                  </Link>
                </li>
                <li
                  className={
                    this.isPathActive("/AllEmployees") ? "active" : null
                  }
                >
                  <Link to="/AllEmployees" className="employees">
                    Employees
                  </Link>
                </li>
                <li
                  className={
                    this.isPathActive("/AllMessages") ? "active" : null
                  }
                >
                  <Link to="/AllMessages" className="messages">
                    Messages
                  </Link>
                </li>
                <li
                  className={this.isPathActive("/Dashboard") ? "active" : null}
                >
                  <Link to="/Bills" className="bills">
                    Bills
                  </Link>
                </li>
                <li className={this.isPathActive("/Bills") ? "active" : null}>
                  <Link to="/TablesList" className="tabels">
                    Tables
                  </Link>
                </li>
                <li className={this.isPathActive("/KOT") ? "active" : null}>
                  <Link to="/KOT" className="tabels">
                    KOT
                  </Link>
                </li>
                {sessionStorage.getItem("role") == "Merchant" ||
                sessionStorage.getItem("settings") == "Yes" ? (
                  <li
                    className={this.isPathActive("/Settings") ? "active" : null}
                  >
                    <Link to="/Settings" className="settings">
                      Settings
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                {sessionStorage.getItem("role") == "Merchant" ? (
                  <li
                    className={
                      this.isPathActive("/BusinessList") ? "active" : null
                    }
                  >
                    <Link to="/BusinessList" className="settings">
                      Business List
                    </Link>
                  </li>
                ) : (
                  ""
                )}

                <li>
                  <Link to="#" className="settings" onClick={this.logout}>
                    Logout
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </Scrollbars>
      </aside>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Sidebar);
