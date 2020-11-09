import React from "react";
import { Link } from "react-router-dom";
import firebase from "../config";
import Sidebar from "./sidebar";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({ loading: true });
    var sessionId = sessionStorage.getItem("RoleId");
    if (sessionId) {
      console.log(sessionId);

      firebase
        .firestore()
        .collection("/merchant_users")
        .doc(sessionId)
        .get()
        .then((snapshot) => {
          var Users = snapshot.data();
          console.log(Users);
          sessionStorage.setItem("username", Users.user_name);
          sessionStorage.setItem("email", Users.email_id);

          this.setState({
            userRole: Users.Role,
            loading: false,
          });
        });
    }
  }

  render() {
    return (
      <header className="header-desktop">
        <div className="logo_hipal">
          <a href="#">
            <img src="/images/icon/logo.svg" alt="Hipal Admin" />
          </a>
        </div>
        Welcome Back {sessionStorage.getItem("username")}
      </header>
    );
  }
}

export default Header;
