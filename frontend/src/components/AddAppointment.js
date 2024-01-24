import React, {useState , useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './stylesheet.css';
import Swal from 'sweetalert2';
import Header from "./CustomerHeader";

export default function AddAppointment(){

    const [name, setName] = useState("");
    const [vehicle, setVehicle] = useState("");
    const [vehicles, setVehicles] = useState("");
    const [services, setServices] = useState([]);
    const [service, setService] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState(""); 

    function sendData(e){
        e.preventDefault();

        const newappointment ={
            name,
            vehicle,
            service,
            date,
            time

        }
       axios.post("http://localhost:8070/appointment/addapp", newappointment).then(()=>{
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Appointment Created',
            showConfirmButton: false,
            timer: 15000
          })
       }).catch((err)=>{
        alert(err)
       })
    }

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

    useEffect(() => {
        axios
          .get('http://localhost:8070/services/getService')
          .then((response) => {
            setServices(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);

      

    return(
        
        <div className="mb-3 text-white ">
            
            <div style={{ 
                backgroundImage: `url(${process.env.PUBLIC_URL + '../background.gif'})`, 
                backgroundSize: 'cover',
                minHeight: '98vh',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
        
    }}>
        <Header />
            <div className="container">
            <br></br>
            <h1 id="t1">New Appointment</h1><br></br>
            <form onSubmit={sendData}>
            
            <div class="mb-3">
                <label for="name" class="form-label" id="t2">Name</label>
                <input type="text" class="form-control" id="name" required aria-describedby="emailHelp" onChange={(e)=>{
                    setName(e.target.value);
                }}/>
            </div>
            <div class="mb-3">
                <label for="vno" class="form-label" id="t2">Vehicle</label>
                <div class="dropdown">
                <select  class="btn btn-secondary dropdown-toggle" required onChange={(e)=>{
                    setVehicle(e.target.value)
                }}>
             
                {vehicles && vehicles.map((vehicle) => (
                    <option value={vehicle.regNo}>{vehicle.regNo}</option>
                ))}
                </select>

            </div>
            </div>
            <div class="mb-3">
                <label for="vno" class="form-label" id="t2">Service</label>
                <div class="dropdown">
                <select  class="btn btn-secondary dropdown-toggle" required onChange={(e)=>{
                    setService(e.target.value)
                }}>
             
                {services && services.map((service) => (
                    <option value={service.name}>{service.name}</option>
                ))}
                </select>

            </div>
            </div>
            <div class="mb-3">
                <label for="vno" class="form-label" id="t2">Date</label>
                <input type="date" class="form-control" required id="vno" aria-describedby="emailHelp" onChange={(e)=>{
                    setDate(e.target.value);
                }}/>
            </div>
            <div class="mb-3">
                <label for="vtype" class="form-label" id="t2">Time</label>
                <input type="time" class="form-control" required id="vtype" aria-describedby="emailHelp" onChange={(e)=>{
                    setTime(e.target.value);
                }}/>
            </div>
            <button type="submit" class="btn btn-primary">Create</button>
            
        </form>
        </div>
        </div>
        </div>
    )

}