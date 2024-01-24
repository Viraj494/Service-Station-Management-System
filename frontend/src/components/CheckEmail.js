import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';



<Link to="/">
            <button>Done</button>
            </Link>


export default function CheckEmail() {
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
     // backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      
  }}>
    <div className="text-white" >
      <div>
        <form className="Login" onSubmit={handleSubmit}>
          <h4>CHECK YOUR EMAIL</h4>

          <h6>We have sent you a password recover message to your email.</h6>

          <Link to="/PWrecover">
            <button>Done</button>
            </Link>

          <p>Don't get the message?</p>
          <a href="/Rpw">Try another email address</a>
        </form>
      
    </div>
    </div>
    </div>
  );
}
