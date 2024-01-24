import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './StyleSheet1.css';

import { reactLocalStorage } from 'reactjs-localstorage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const change = (e) => {
    if (e.target.id === 'email') {
      setEmail(e.target.value);
    } else if (e.target.id === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8070/customer/login', { email, password }).then((res) => {
          if(res.data.status=="Login Success"){
     
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.customer));
          reactLocalStorage.setObject("userName", [email]);
          Swal.fire({
            title: 'Success!',
            text: 'Login successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
            type: 'success',
          });
          window.location = '/homepg';
          }else {Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid username or password!',
          });}
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid username or password!',
      });
    }
  };


  return (
    <div style={{ 
      backgroundImage: `url(${process.env.PUBLIC_URL + '../background.gif'})`, 
      backgroundSize: 'cover',
      minHeight: '100vh',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      
  }}>
    <div id='f3'>
    <div className="container shadow-lg p-3 mb-5  rounded" style={{background:"#04052e"}}>

    <div className="text-white">
    <form className="Login" onSubmit={handleSubmit}>
      <h2>Login</h2><br></br><br></br>
      <label>Email</label><br></br>
      <input type="email" id="email" className="form-control" onChange={change} value={email} required/><br></br><br></br>

      <label>Password</label><br></br>
      <input type="password" id="password" className="form-control" onChange={change} value={password} required/><br></br>
      
      <button type="submit" className="btn btn-success">Login</button>&nbsp;&nbsp;<br></br><br></br>

      <h6>Do not have an account?</h6>&nbsp;&nbsp;
      <a href="/add">Sign up</a>&nbsp;&nbsp;
      <h6>or connect via</h6>&nbsp;&nbsp;

      <div className="login-buttons">
        <a href="/auth/google">
        <span class="fa-stack fa-2x" style={{color:"red"}}>
  <i class="fa fa-circle fa-stack-2x"></i>
  <i class="fa fa-google fa-stack-1x fa-inverse"></i>
</span>
          {/* <img src="/Google.png" alt="Google Login" style={{ width: '60px', height: '20px' }} /> */}
        </a>

        <a href="/auth/facebook">
        <span class="fa-stack fa-2x">
  <i class="fa fa-circle fa-stack-2x"></i>
  <i class="fa fa-facebook fa-stack-1x fa-inverse"></i>
</span>
          {/* <img src="/Facebook.png" alt="Facebook Login" style={{ width: '60px', height: '20px' }} /> */}
        </a>

        <a href="/auth/twitter">
        <span class="fa-stack fa-2x"  style={{color:"#1DA1F2"}}>
  <i class="fa fa-circle fa-stack-2x"></i>
  <i class="fa fa-twitter fa-stack-1x fa-inverse"></i>
</span>
          {/* <img src="/twitter.png" alt="Twitter Login" style={{ width: '60px', height: '20px' }} /> */}
        </a>
      </div>
    </form>
    </div>
    </div>
    </div>
    </div>
  
  );
};

export default Login;
