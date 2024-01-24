import React from "react";
import { Link } from "react-router-dom";
import './stylesheet.css';

function WelcomeHeader() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "#040430"}}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="../slogo.png" alt="Logo" width="180" height="55" />
        </a>
        <div id="wh1">
        <Link to="/login" className="btn btn-success">Check In</Link>
        </div>
        <div className="collapse navbar-collapse" id="navbarNav">
          
        </div>
      </div>
      <style>
        {`
          .nav-link {
            margin: 0 10px;
            font-size: 18px;
          }

          .nav-link:hover {
            background-color: #040430 !important;
            color: #fff;
            border-radius: 20px;
          }
        `}
      </style>
    </nav>
  );
}

export default WelcomeHeader;
