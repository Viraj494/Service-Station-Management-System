import React from "react";
import { Link } from "react-router-dom";

function customerHeader() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "#040430"}}>
    <div className="container-fluid">
      <a className="navbar-brand" href="/add">
        <img src="../slogo.png" alt="AdminHeaderLogo" width="128" height="55" />
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto">
        <li className="nav-item">
            <Link
              to="/home"
              className="nav-link active"
              aria-current="page"
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/getvehicle"
              className="nav-link active"
              aria-current="page"
            >
              Vehicles
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/getapp"
              className="nav-link active"
              aria-current="page"
            >
              Appointments
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/add"
              className="nav-link active"
              aria-current="page"
            >
             
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/cd"
              className="nav-link active"
              aria-current="page"
            >
              Cards and Payments
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/in"
              className="nav-link active"
              aria-current="page"
            >
              Inquiries
            </Link>
          </li>
        </ul>
        <div className="d-flex align-items-center">
          <Link to='/' className="btn btn-danger">Logout</Link>
        </div>
      </div>
    </div>
  </nav>
  );
}

export default customerHeader;