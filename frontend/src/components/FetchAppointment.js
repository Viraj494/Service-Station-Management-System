import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './stylesheet.css';
import jsPDF from "jspdf";
import 'jspdf-autotable';
import Swal from 'sweetalert2';
import Header from "./CustomerHeader";


const FetchAppointment = () => {

    const [appointments, setAppointments] = useState(null)
    const [deleteapp, setdeleteapp] = useState("");
    const [Search, setSearch] = useState("");

    useEffect(()=>{
        const showapp = async ()=>{
            const response = await fetch('http://localhost:8070/appointment/getapp')
            const json = await response.json()

            if(response.ok){
              setAppointments(json)
            }
        }
        showapp()
    }, [])

    const deleteAppointment=async (id) => {
      try {
        await axios.delete(`http://localhost:8070/appointment/deleteapp/${id}`);
        setdeleteapp(appointments.filter((item) => item.id !== id));
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'appointment Removed',
          showConfirmButton: true,
          timer: 15000
        })
        window.location.reload(); 
        //data deleted after that page will refresh automatically
      } catch (error) {
        alert('Error deleting data', error);
        console.log(error);
      }
    };

    const DownloadPdf=()=>{
      const doc = new jsPDF()
      doc.text("appointments", 90,10)
      doc.autoTable({
        appointments:appointments.map(col=>({...col,datakey:col.field})),
        body:appointments
      })
      doc.save('appointments.pdf')
    }

  
    return(

      
          <div style={{ 
            backgroundImage: `url(${process.env.PUBLIC_URL + '../background.gif'})`, 
            backgroundSize: 'cover',
            minHeight: '100vh',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
        
    }}>
      <Header />      
      
        <div className="container">
        <br></br>
            <h1 id="t1">My Appointments</h1><br></br>
        <Link to='/addapp' className='btn btn-success'>+ Add appointment</Link>
        <form className="f1">
              <input type="text" placeholder="   Search appointments" className="i1" onChange={(e)=> setSearch(e.target.value)}></input>
        </form>
            
                <table class="table">
                <thead>
                  <tr>
                    <th scope="col" id="t2">Name</th>
                    <th scope="col" id="t2">Vehicle</th>
                    <th scope="col" id="t2">Services No</th>
                    <th scope="col" id="t2">Date</th>
                    <th scope="col" id="t2">Time</th>
                  </tr>
                </thead>
                <tbody>
                {appointments && appointments.filter((appointment)=>{
                  return Search.toLowerCase() === ''
                  ? appointment
                  : appointment.name.toLowerCase().includes(Search);
                }).map((appointment)=>(
                  <tr>
                    <td id="t2">{appointment.name}</td>
                    <td id="t2">{appointment.vehicle}</td>
                    <td id="t2">{appointment.service}</td>
                    <td id="t2">{appointment.date}</td>
                    <td id="t2">{appointment.time}</td>
                    <div class="d-grid gap-2 d-md-block">
                        <Link to={`/updateapp/${appointment._id}`} class="btn btn-warning"><i className="fas fa-edit"></i>Edit</Link>&nbsp;
                        <button class="btn btn-danger" onClick={()=>deleteAppointment(appointment._id)}>Delete</button>
                    </div>
                  </tr>))}
                </tbody>
                <br></br>
              <button class="btn btn-primary" onClick={DownloadPdf}>Get appointment Report</button>
              </table>
             
            
        </div>
        </div>
    )
}

export default FetchAppointment;