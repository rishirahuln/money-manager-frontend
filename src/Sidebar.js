import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <div className="sidebar-brand d-flex align-items-center justify-content-center">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">Money Manager</div>
      </div>

      <hr className="sidebar-divider my-0" />

      <li className="nav-item active">
        <Link to={"/portal/dashboard"} className="nav-link">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </Link>
      </li>

      <hr className="sidebar-divider" />

      <li className="nav-item">
        <Link to={"/portal/home"} className="nav-link collapsed">
          <i className="fas fa-fw fa-cog"></i>
          <span>Home</span>
        </Link>
      </li>
    </ul>
  );
}

export default Sidebar;
