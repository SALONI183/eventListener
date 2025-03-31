import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Sidebar.css";
import timeIcon from "../assets/time.png";
import linkIcon from "../assets/link.png";
import settingIcon from "../assets/setting.png";
import bookingIcon from "../assets/bookings.png";
import plusBtn from "../assets/plus-btn.png";
import face from "../assets/face-one.png";
import { useNavigate } from "react-router-dom"; 

const Sidebar = () => {

  const navigate = useNavigate();
  return (
    <div className="sidebar-container">
      <div className="sidebar-logo">
        <img className="side-logo" src={logo} alt="Logo" />
      </div>
      <div className="list">
        <ul className="list-links">
          <Link className="items" to="/dashboard/events">
            <img src={linkIcon} alt="Events" className="sidebar-icon" /> &nbsp;
            Events
          </Link>
          <Link className="items" to="/dashboard/bookings">
            <img src={bookingIcon} alt="Bookings" className="sidebar-icon" />{" "}
            Bookings
          </Link>
          <Link className="items" to="/dashboard/availability">
            <img src={timeIcon} alt="Availability" className="sidebar-icon" />{" "}
            Availability
          </Link>
          <Link className="items" to="/dashboard/settings">
            <img src={settingIcon} alt="Settings" className="sidebar-icon" />{" "}
            Settings
          </Link>
        </ul>
        <button className="create-btn" onClick={() => navigate("/dashboard/events/create")}>
        <img src={plusBtn} alt="" />
        Create
      </button>
      </div>
     
      <button className="profile-btn"><img src={face} alt="" />sarthak pal</button>
    </div>
  );
};

export default Sidebar;
