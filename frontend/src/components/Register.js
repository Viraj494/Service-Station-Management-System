import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'font-awesome/css/font-awesome.min.css';
import './StyleSheet1.css';

export default function Register() {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");



  function sendData(e) {
    e.preventDefault();

    const newCustomer = {
      name,
      mobileNumber,
      email,
      address,
      password,
    };

    axios
      .post("http://localhost:8070/customer/add", newCustomer)
      .then(() => {

        setName("");
        setMobileNumber("");
        setEmail("");
        setAddress("");
        setPassword("");

       // alert("Customer added successfully");
       Swal.fire({
        title: "Success!",
        text: "Customer added successfully.",
        icon: 'success',
        confirmButtonText: "OK",
        type: "success"
    }).then((result) => 
    { if (result.isConfirmed)
       {  window.location.href = '/login'; } 
      });
      
       

      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.response.data.msg,
          icon: 'error',
          confirmButtonText: "OK",
          type: "error"
      });
        
      });
  }

  return (
    <div style={{ 
      backgroundImage: `url(${process.env.PUBLIC_URL + '../background.gif'})`, 
      backgroundSize: 'cover',
      minHeight: '150vh',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      
      
  }}>
 
    <div className="container" id="f3">
    <div className="text-white">
    <div className="container shadow-lg p-3 mb-5  rounded" style={{background:"#04052e"}}>
    
      <form onSubmit={sendData}>
        
      <h4>SIGN UP NOW</h4>
      
      <p>Please fill the details and create account.</p>

        <div className="mb-3">
          <label htmlFor="exampleInputName" className="text-white">
            Customer Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName"
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputMobileNumber" className="text-white">
            Mobile Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="exampleInputMobileNumber"
            onChange={(e) => {
              setMobileNumber(e.target.value);
            }}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="text-white">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputAddress" className="text-white">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputAddress"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="text-white">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>
         <button className="btn btn-success" style={{marginBottom:"20px"}}>Sign up</button> 
         

        <h6>Already have an account?</h6>
        <a href="/login">Login here</a>
        <h6>or connect via</h6>
       

       
        <div className="login-buttons">
  <a href="/auth/google">
  <span class="fa-stack fa-2x" style={{color:"red"}}>
  <i class="fa fa-circle fa-stack-2x"></i>
  <i class="fa fa-google fa-stack-1x fa-inverse"></i>
</span>
    {/* <img src="/Google.png" alt="Google Login" style={{ width: '60px', height: '20px' }} /> */}
  </a>

  <a href="/auth/facebook">
    {/* <img src="/Facebook.png" alt="Facebook Login" style={{ width: '60px', height: '20px' }} /> */}
    <span class="fa-stack fa-2x">
  <i class="fa fa-circle fa-stack-2x"></i>
  <i class="fa fa-facebook fa-stack-1x fa-inverse"></i>
</span>
  </a>

  <a href="/auth/twitter">
    {/* <img src="/twitter.png" alt="Twitter Login" style={{ width: '60px', height: '20px' }} /> */}
    <span class="fa-stack fa-2x"  style={{color:"#1DA1F2"}}>
  <i class="fa fa-circle fa-stack-2x"></i>
  <i class="fa fa-twitter fa-stack-1x fa-inverse"></i>
</span>
  </a>
</div>


      </form>
      </div>
      <br/><br/><br/><br/><br/><br/>
   
    <br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
    </div>
    </div>
  );
}
