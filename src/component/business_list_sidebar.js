//there is two sidebars in this module one is business sidebar and one is inside business sidebar
import React from "react";
import firebase from "../config";
import { Link, withRouter } from "react-router-dom";
import swal from "sweetalert";
class BusinessSidebar extends React.Component {
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
        <div className="menu-sidebar__content js-scrollbar1">
          <nav className="navbar-sidebar">
            <ul className="list-unstyled navbar__list">
              <li
                className={this.isPathActive("/BusinessList") ? "active" : null}
              >
                <Link to="/BusinessList" className="settings">
                  Business List
                </Link>
              </li>
              <li>
                <Link to="#" className="settings" onClick={this.logout}>
                  Logout
                </Link>
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

export default withRouter(BusinessSidebar);
