import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import Header from "./CustomerHeader";

export default function Inquiries() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [inquiries, setInquirie] = useState("");
  const [howhelp, setHowHelp] = useState("");

  function sendData(e) {
    e.preventDefault();

    const newInquirie = {
      name,
      email,
      mobileNumber,
      inquiries,
      howhelp,
    };

    axios
      .post("http://localhost:8070/inquirie/inadd", newInquirie)
      .then(() => {
        // alert("Added your inquiry successfully");
        Swal.fire({
          title: "Success!",
          text: "Added your inquiry successfully.",
          icon: 'success',
          confirmButtonText: "OK",
          type: "success"
      });
        setName("");
        setEmail("");
        setMobileNumber("");
        setInquirie("");
        setHowHelp("");
      })
      .catch((err) => {
        alert(err.message);
        
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
    <Header />
    <div className="col-lg-9-mt-2 p-2 pt-4  pb-2 text-white">
                <h1 style={{ textAlign: "left" ,paddingLeft:"90px" }}>Add Inquiry</h1>
            </div>
    <div className="container shadow-lg p-3  mb-5 text-white  rounded" style={{background:"#04052e"}}>
      <div className="container">
        <form onSubmit={sendData}>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Customer Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="mb-3 text-white">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control text-black"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div id="emailHelp" className="form-text text-white">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3 text-white">
            <label htmlFor="exampleInputMobileNumber" className="form-label">
              Mobile Number
            </label>
            <input
              type="tel"
              className="form-control"
              id="exampleInputMobileNumber"
              
              onChange={(e) => {
                setMobileNumber(e.target.value);
              }}
            />
          </div>
          <div className="mb-3 text-white">
            <label htmlFor="exampleInputAddress" className="form-label">
              Inquiry
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputAddress"
          
              onChange={(e) => {
                setInquirie(e.target.value);
              }}
            />
          </div>
          <div className="mb-3 text-white">
            <label htmlFor="exampleInputPassword1" className="form-label">
              How can we help
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              
              onChange={(e) => {
                setHowHelp(e.target.value);
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
    </div>
  );
}
