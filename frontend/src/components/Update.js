import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import Header from "./CustomerHeader";

export default function UpdateInq() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [inquiries, setInquirie] = useState("");
  const [howhelp, setHowHelp] = useState("");

  useEffect(function () {
    function getInq() {
      axios.get("http://localhost:8070/inquirie/inget/" + id).then((res) => {
          if (res.data) {
            setName(res.data.name || "");
            setEmail(res.data.email || "");
            setMobileNumber(res.data.mobileNumber || "");
            setInquirie(res.data.inquiries || "");
            setHowHelp(res.data.howhelp || "");

            /*console.log(res.data);
            console.log(res.data.name);
            console.log(res.data.email);*/
          }
        })
        .catch(function (err) {
          // alert("data not fetched");
          // alert(err);
          Swal.fire({
            title: "Error!",
            text: "Data not fetched",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"
        })
        });
    }
    getInq();
  }, [id]);

  function updateData(e) {
    e.preventDefault();

    if (!name || !email || !mobileNumber || !inquiries || !howhelp) {
      alert("Please fill all required fields.");
      return;
    }

    const updatedinquirie = {
      name,
      email,
      mobileNumber,
      inquiries,
      howhelp,
    };
    console.log(updatedinquirie);
    axios
      .put("http://localhost:8070/inquirie/inupdate/" + id, updatedinquirie)
      .then(function () {
        //alert("Inquirie details updated.");
        Swal.fire({
          title: "Success!",
          text: "Inquiry details updated.",
          icon: 'success',
          confirmButtonText: "OK",
          type: "success"
      });
      })
      .catch(function () {
        //alert("Inquirie details not updated.");
        Swal.fire({
          title: "Success!",
          text: "Inquiry details not updated.",
          icon: 'success',
          confirmButtonText: "OK",
          type: "success"
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

    <Header />
    <div className="container text-white">
    <form className="form1">
      <h3 className="topic1">Edit Details</h3><br></br>
  <div className="mb-3">
    <div className="lbl"><label for="exampleInputEmail1" className="form-label">Customer name</label></div>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={name} onChange={(event) => setName(event.target.value)}/>
  </div>

  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Email</label>
    <input type="text" className="form-control" id="exampleInputPassword1" value={email} onChange={(event) => setEmail(event.target.value)}/>
  </div>

  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">mobile Number</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(event) => setMobileNumber(event.target.value)}/>
  </div>

  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Inquiry</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(event) => setInquirie(event.target.value)}/>
  </div>

  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">How help</label>
    <input type="text" className="form-control" id="exampleInputPassword1" onChange={(event) => setHowHelp(event.target.value)}/>
  </div>
  
  <button type="submit" className="btn btn-primary"  onClick={updateData}>Update</button>
</form>      
    </div>
    </div>
  );
}