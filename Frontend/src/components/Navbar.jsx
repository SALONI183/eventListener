import React from "react";
import "../Pages/LandingPage.css"; 
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav">
      <img className="logo" src={logo} alt="CNNCT Logo" />
      <Link to="/signup">
        <button className="nav-btn">Sign up free</button>
      </Link>
    </div>
  );
};

export default Navbar;
