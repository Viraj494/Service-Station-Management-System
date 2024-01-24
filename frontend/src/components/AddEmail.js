import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
// import './AddEmail.css';

export default function AddEmail() {
  const [email, setEmail] = useState("");
  // const [msg,setMsg] = useState("");
  // const [error,setError] = useState("");

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
     backgroundPosition: 'center center',
     // backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      
  }}>
    <div className="text-white" > 
    <div>
      <form className="Login" onSubmit={handleSubmit}>
      <h4>RESET PASSWORD</h4>
      
      <p>Enter your email address to reset your password</p>

      
      <h7>Email Address</h7> 
        <input
          type="email"
          class="input-lg form-control"
          name="email1"
          id="email1"
          placeholder="Add email"
          // onChange={(e) =>setEmail(e.target.value)}
          // value={Data.email}
          autoComplete="off"
          required
        />
       
    
       <Link to="/Check">
            <button>send</button>
            </Link>


      </form>
    </div>
    </div>
    </div>
   
  );
}
