import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

class Navbar extends Component {

  logout = event => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("fbToken");
    localStorage.removeItem("googleToken");
    this.props.clearState()
  };

  render() {
    let user = localStorage.getItem("jwtToken");
    let fbUser = localStorage.getItem("fbToken");
    let googleUser = localStorage.getItem("googleToken");
    let loginLogout;
    let navbarBrand;
    let signup;
    if (user || fbUser || googleUser) {
      loginLogout = (
        <NavLink to="/">
          <div className="navbar-right-div btn btn-outline-warning logout" onClick={this.logout}>
            Logout
          </div>
        </NavLink>
      );
      navbarBrand = (
        <NavLink to="/home">
          <div className="navbar-brand">Budgey</div>
        </NavLink>
      );
    } else {
      loginLogout = (
        <NavLink to="/login">
          <div className="navbar-right-div btn btn-outline-warning login">Login</div>
        </NavLink>
      );
      signup = (
        <NavLink to="/signup">
          <div className="navbar-right-div btn btn-outline-warning login">Signup</div>
        </NavLink>
      );
      navbarBrand = (
        <NavLink to="/">
          <div className="navbar-brand">Budgey</div>
        </NavLink>
      );
    }
    return (
      <nav className="navbar justify-content-between mb-3">
        {navbarBrand}
        <div className="navbar justify-content-between">
          {signup}
          {loginLogout}
        </div>
      </nav>
    );
  }
}

export default Navbar;
