import React, {useState} from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import './StyleSheet1.css';
import Header from "./CustomerHeader";

export default function AddVehicle(){

    const [regNo, setRegNo] = useState("");
    const [make, setMake] = useState("");
    const [model, setModel] = useState(""); 
    const [engC, setEngC] = useState("");
    const [mileage, setMileage] = useState(""); 
    const [fuel, setFuel] = useState(""); 

    function sendData(e){
        e.preventDefault();

        const newvehicle ={
            regNo,
            make,
            model,
            engC,
            mileage,
            fuel

        }
       axios.post("http://localhost:8070/vehicle/addvehicle", newvehicle).then(()=>{
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Vehicle Added',
            showConfirmButton: true,
            timer: 15000
          })
       }).catch((err)=>{
        alert(err)
       })
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
            <h1 id="t1">Add New Vehicle</h1><br></br>
            <form onSubmit={sendData}>
            <div class="mb-3">
                <label for="name" class="form-label" id="t3">Registration Number</label>
                <input type="text" required class="form-control" id="name" aria-describedby="emailHelp" onChange={(e)=>{
                    setRegNo(e.target.value);
                }}/>
            </div>
            <div class="mb-3">
                <label for="vno" class="form-label" id="t3">make</label>
                <input type="text" class="form-control" required id="vno" aria-describedby="emailHelp" onChange={(e)=>{
                    setMake(e.target.value);
                }}/>
            </div>
            <div class="mb-3">
                <label for="vtype" class="form-label" required id="t3">model</label>
                <input type="text" class="form-control" id="vtype" aria-describedby="emailHelp" onChange={(e)=>{
                    setModel(e.target.value);
                }}/>
            </div>
            <div class="mb-3">
                <label for="vtype" class="form-label" id="t3">Engine Capacity</label>
                <input type="number" class="form-control" id="vtype" required aria-describedby="emailHelp" onChange={(e)=>{
                    setEngC(e.target.value);
                }}/>
            </div>
            <div class="mb-3">
                <label for="vtype" class="form-label" id="t3">Mileage</label>
                <input type="number" class="form-control" id="vtype" required aria-describedby="emailHelp" onChange={(e)=>{
                    setMileage(e.target.value);
                }}/>
            </div>
            <div class="mb-3">
                <label for="vno" class="form-label" id="t2">Fuel Type</label>
                <div class="dropdown">
                <select  class="btn btn-secondary dropdown-toggle" required onChange={(e)=>{
                    setFuel(e.target.value)
                }}>
                    <option value="select">Select one</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                </select>

            </div>
            </div>
            <button type="submit" class="btn btn-primary">Add vehicle</button>
        </form>
        </div>
        </div>
    )

}