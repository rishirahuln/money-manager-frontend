import React from "react";
import { useNavigate } from "react-router-dom";
import { config } from "./config";

function Topbar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem(`${config.storage_key}`);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <ul className="navbar-nav ml-auto">
        <div className="topbar-divider d-none d-sm-block"></div>
        <button onClick={logout} className="btn btn-danger mr-3">
          Logout
        </button>
      </ul>
    </nav>
  );
}

export default Topbar;
