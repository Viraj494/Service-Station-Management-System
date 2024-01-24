import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import Header from '../components/Header';

export default function UpdateCus() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  useEffect(function () {
    function getCus() {
      axios
        .get("http://localhost:8070/customer/get/" + id)
        .then((res) => {
          if (res.data) {
            setName(res.data.customer.name || "");
            setMobileNumber(res.data.customer.mobileNumber || "");
            setEmail(res.data.customer.email || "");
            setAddress(res.data.customer.address || "");
            setPassword(res.data.customer.password || "");
          }
        })
        .catch(function (err) {
          //alert("data not fetched");
          Swal.fire({
            title: "Error!",
            text: "Data not fetched.",
            icon: 'Error',
            confirmButtonText: "OK",
            type: "error"
        });
          alert(err);
        });
    }
    getCus();
  }, [id]);

  function UpdateCus(e) {
    e.preventDefault();

    if (!name || !mobileNumber || !email || !address || !password) {
      // alert("Please fill all required fields.");
      Swal.fire({
        title: "required fields",
        text: "Please fill all required fields.",
        icon: 'success',
        confirmButtonText: "OK",
        type: "success"
    });
      return;
    }

    const updatedcustomer = {
      name,
      mobileNumber,
      email,
      address,
      password,
    };
    console.log(updatedcustomer);
    axios
      .put("http://localhost:8070/customer/update/" + id, updatedcustomer)
      .then(function () {
        // alert("customer details updated.");
        Swal.fire({
          title: "Success!",
          text: "customer details updated.",
          icon: 'success',
          confirmButtonText: "OK",
          type: "success"
      }).then((result) => 
      { if (result.isConfirmed)
         {  window.location.href = '/fecth'; } 
        });
      })
      .catch(function () {
        // alert("customer details not updated.");
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })
      });
  }

  return (
    <div style={{ 
      backgroundImage: `url(${process.env.PUBLIC_URL + '../background.gif'})`, 
      backgroundSize: 'cover',
      minHeight: '150vh',
      backgroundRepeat: 'no-repeat',
      
  }}>
    <Header/>
    <div className="container">
    <div className="text-white">
    <form className="form1" >
      <br></br>
      <h3 className="topic1">Edit Details</h3><br></br>
  <div className="mb-3">
    <div className="lbl"><label for="exampleInputEmail1" className="text-white">Customer name</label></div>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="" value={name} onChange={(event) => setName(event.target.value)}/>
  </div>
  
  
  <div className="mb-3">
    <label for="exampleInputEmail1" className="text-white">Mobile Number</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="" value={mobileNumber} onChange={(event) => setMobileNumber(event.target.value)}/>
  </div>

  <div className="mb-3">
    <label for="exampleInputPassword1" className="text-white">Email</label>
    <input type="text" className="form-control" id="exampleInputPassword1" value={email} onChange={(event) => setEmail(event.target.value)}/>
  </div>

  <div className="mb-3">
    <label for="exampleInputAdress" className="text-white">Address</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={address} onChange={(event) => setAddress(event.target.value)}/>
  </div>

  <div className="mb-3">
    <label for="exampleInputpassword" className="text-white">Password</label>
    <input type="password" className="form-control" id="exampleInputpassword" value={password} onChange={(event) => setPassword(event.target.value)}/>
  </div>

  <button type="submit" className="btn btn-primary"  onClick={UpdateCus}>Update</button> 
 
</form> 
</div> 
</div>    
</div>   
   
  );
}