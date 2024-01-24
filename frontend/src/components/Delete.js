import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import Header from "./CustomerHeader";

export default function DeleteInq() {
  const { id } = useParams();

  useEffect(function () {
    function getInq() {
      
    }
    getInq();
  }, [id]);

  function updateData(e) {
    e.preventDefault();
  
    axios
      .delete("http://localhost:8070/inquirie/indelete/" + id)
      .then(function () {
        // alert("Inquiry details deleted.");
        Swal.fire({
          title: "Success!",
          text: "Inquiry details deleted.",
          icon: 'success',
          confirmButtonText: "OK",
          type: "success"
      });
      })
      .catch(function () {
        // alert("Inquiry details not deleted.");
        Swal.fire({
          title: "Error!",
          text: "Inquiry details not deleted",
          icon: 'error',
          confirmButtonText: "OK",
          type: "success"
      })
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
      <h3 className="topic1">Delete inquiry</h3>
      <br />
      <button className="btn btn-danger" onClick={updateData}>
        <i className="fas fa-trash-alt"></i> Delete
      </button>
    </div>
    </div>
  );
}
