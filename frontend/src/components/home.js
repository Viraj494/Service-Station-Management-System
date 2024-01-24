import React, { useState } from "react";
import './stylesheet.css';
import { Link } from "react-router-dom";
import Header from "./CustomerHeader";

export default function Home() {
  return (
    
    <div>

      <div style={{ 
        backgroundImage: `url(${process.env.PUBLIC_URL + '../background.gif'})`, 
        backgroundSize: 'cover',
        minHeight: '100vh',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        
    }}>
      <Header/>
    <h1 id="tx1">Hello There !! Welcome Back</h1>
    <h1 id="tx2">Tell us how do you want to continue ?</h1>

    <div className="btn-co">
      <Link to='/profile' className='btn btn-primary'>User Profile</Link>&nbsp;&nbsp;
      <Link to='/addapp' className='btn btn-primary'>Reserve a time</Link>&nbsp;&nbsp;
      <Link to='/inadd' className='btn btn-primary'>Report a problem</Link>&nbsp;&nbsp;
      <Link to='/addvehicle' className='btn btn-primary'>Add your vehicle</Link>&nbsp;&nbsp;
    </div>
    
    </div>
    </div>
  );
}
