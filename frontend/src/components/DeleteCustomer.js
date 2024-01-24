import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import Header from '../components/Header';


export default function DeleteCus() {
  const { id } = useParams();

  useEffect(function () {
    function getCus() {
      
    }
    getCus();
  }, [id]);

  function updateData(e) {
    e.preventDefault();
  
    axios
      .delete("http://localhost:8070/Customer/delete/" + id)
      .then(function () {
        //alert("Customer details deleted.");
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
      })
      .catch(function () {
        // alert("Customer details not deleted.");
        Swal.fire({
          title: "Error!",
          text: "Customer details not deleted.",
          icon: 'Error',
          confirmButtonText: "OK",
          type: "Error"
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
    <Header/>
    <div className="text-white" >
    {/* <div className="container"> */}
      <h2 className="topic1">Delete Customer</h2>
      <p className="topic1">Customer will be delete</p>
      <br />
      <button className="btn btn-danger" onClick={updateData}>
        <i className="fas fa-trash-alt"></i> Delete
      </button>
    </div>
    </div>
    // </div>
  );
}
