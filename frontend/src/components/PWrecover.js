import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function PWrecover() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("api/sendPasswordRecoveryEmail", { email }).then((res) => {
      console.log(res);
    });
  };

  return (
    <div style={{ 
      backgroundImage: `url(${process.env.PUBLIC_URL + '../background.gif'})`, 
      backgroundSize: 'cover',
      minHeight: '150vh',
      backgroundRepeat: 'no-repeat',
     
      
  }}>
   
   <div className="text-white" >
    <form  classname="Login" method="post" id="passwordForm" onSubmit={handleSubmit}>
      <h4>CHANGE PASSWORD</h4>
      <p>Use the form below to change your password. Your new password must be the different from your previous password.</p>
    
        
        <input
          type="password"
          class="input-lg form-control"
          name="password1"
          id="password1"
          placeholder="New Password"
          autoComplete="off"
          required
        />
        <div class="row">
          <div class="col-sm-6">
            <span id="8char" class="glyphicon glyphicon-remove" style={{ color: "#FF0004" }}>
              8 Characters Long
            </span>
            <br />
            <span id="ucase" class="glyphicon glyphicon-remove" style={{ color: "#FF0004" }}>
              One Uppercase Letter
            </span>
          </div>
          <div class="col-sm-6">
            <span id="lcase" class="glyphicon glyphicon-remove" style={{ color: "#FF0004" }}>
              One Lowercase Letter
            </span>
            <br />
            <span id="num" class="glyphicon glyphicon-remove" style={{ color: "#FF0004" }}>
              One Number
            </span>
          </div>
        </div>
        <input
          type="password"
          class="input-lg form-control"
          name="password2"
          id="password2"
          placeholder="Repeat Password"
          autoComplete="off"
          required
        />
       
        <Link to="/login">
        <button type="submit" class="col-xs-12 btn btn-primary btn-load btn-lg" data-loading-text="Changing Password...">
          Change Password
        </button>
      </Link>
      </form>
    </div>
    </div>
 
  );
}
