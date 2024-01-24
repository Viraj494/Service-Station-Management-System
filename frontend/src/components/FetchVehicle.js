import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import './StyleSheet1.css';
import Header from "./CustomerHeader";

const FetchVehicle = () => {

    const [vehicles, setVehicles] = useState(null);
    const [deletevehicle, setdeletevehicle] = useState("");
    const [Search, setSearch] = useState("");

    useEffect(()=>{
        const showvehi = async ()=>{
            const response = await fetch('http://localhost:8070/vehicle/getvehicle')
            const json = await response.json()

            if(response.ok){
                setVehicles(json)
            }
        }
        showvehi()
    }, [])

    const deleteVehicle=async (id) => {
      try {
        await axios.delete(`http://localhost:8070/vehicle/deletevehicle/${id}`);
        setdeletevehicle(vehicles.filter((item) => item.id !== id));
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Vehicle Removed',
          showConfirmButton: true,
          timer: 15000
        })
        window.location.reload(); 
      } catch (error) {
        alert('Error deleting data', error);
        console.log(error);
      }
    };

    return(
      

      <div style={{ 
        backgroundImage: `url(${process.env.PUBLIC_URL + '../background.gif'})`, 
        backgroundSize: 'cover',
        minHeight: '100vh',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        
    }}>
        <Header/>
        <div className="container">
          <br></br>
            <h1 id="t1">My Vehicles</h1><br></br>

            <Link to="/addvehicle"  class="btn btn-success">+ Add Vehicle</Link>
            <form className="f1">
              <input type="text" placeholder="   Search vehicles" className="i1" onChange={(e)=> setSearch(e.target.value)}></input>
            </form><br></br>
                <table class="table">
                <thead>
                  <tr>
                    <th scope="col" id="t3">Registration Number</th>
                    <th scope="col" id="t3">Make</th>
                    <th scope="col" id="t3">Model</th>
                    <th scope="col" id="t3">Engine Capacity</th>
                    <th scope="col" id="t3">Mileage</th>
                    <th scope="col" id="t3">Fuel type</th>
                  </tr>
                </thead>
                <tbody>
                {vehicles && vehicles.filter((vehicle)=>{
                  return Search.toLowerCase() === ''
                  ? vehicle
                  : vehicle.regNo.toLowerCase().includes(Search);
                }).map((vehicle)=>(
                  <tr>
                    <td id="t3">{vehicle.regNo}</td>
                    <td id="t3">{vehicle.make}</td>
                    <td id="t3">{vehicle.model}</td>
                    <td id="t3">{vehicle.engC}</td>
                    <td id="t3">{vehicle.mileage}</td>
                    <td id="t3">{vehicle.fuel}</td>
                    <div class="d-grid gap-2 d-md-block">
                        <Link to={`/getvehicle/${vehicle._id}`} class="btn btn-primary">Options</Link>&nbsp;
                        <Link to={`/updatevehicle/${vehicle._id}`} class="btn btn-warning">Edit</Link>&nbsp;
                        <button class="btn btn-danger" onClick={()=>deleteVehicle(vehicle._id)}>Delete</button>
                    </div>
                  </tr>))}
                </tbody>
              </table>
            
        </div>
        </div>
    )
}

export default FetchVehicle;