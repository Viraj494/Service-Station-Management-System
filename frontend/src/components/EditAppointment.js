import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from "./CustomerHeader";

export default function EditAppointment(){
    const [vehicles, setVehicles] = useState("");
    const [services, setServices] = useState([]);
    const [appointment, setAppointment] = useState({});
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [vehicle, setVehicle] = useState("");
    const [service, setService] = useState(""); 
    const [date, setDate] = useState("");
    const [time, setTime] = useState(""); 
    const params = useParams();
    const userId = params.id;

    useEffect(() => {
        async function Getid(){
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:8070/appointment/getapp/${userId}`)

                setAppointment(res.data);
                console.log(res.data);
                setName(res.data.name);
                setVehicle(res.data.vehicle);
                setService(res.data.service);
                setDate(res.data.date);
                setTime(res.data.time);
               
                setLoading(false);
            } catch (err) {
                setLoading(false);
                alert(err.message);
            }
        }
        Getid();
    }, [userId])

    function handleSubmit(e) {
        e.preventDefault();
        const updatedAppointment = {
            name,
            vehicle,
            service,
            date,
            time
        }
        axios.put(`http://localhost:8070/appointment/updateapp/${userId}`, updatedAppointment)
            .then(() => {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Appointment Updated',
                    showConfirmButton: false,
                    timer: 15000
                  })
            })
            .catch((err) => {
                alert(err);
                });
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

                return (
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
                        <h1 id="t1">Update Your Appointment</h1>
                      
                        {loading ? (
                            <div>Loading...</div>

                        ) : (appointment && Object.keys(appointment).length !== 0 ? (

                            <form onSubmit={handleSubmit}>
                
                                <div className="mb-3">
                                    <label for="name" className="form-label" id="t2">Name</label>
                                    <input type="text" className="form-control" id="name" placeholder={appointment.appointment.name}
                                        value={appointment.name} onChange={(e) => setName(e.target.value)} />
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

                                <div className="mb-3">
                                    <label for="age" className="form-label" id="t2">Date</label>
                                    <input type="date" className="form-control" id="age" placeholder={appointment.appointment.date}
                                        value={appointment.vNo} onChange={(e) => setDate(e.target.value)} />
                                </div>
                
                                <div className="mb-3">
                                    <label for="gender" className="form-label" id="t2">Time</label>
                                    <input type="time" className="form-control" id="gender" placeholder={appointment.appointment.time}
                                        value={appointment.vType} onChange={(e) => setTime(e.target.value)} />
                                </div>
                
                                <button type="submit" className="btn btn-primary">Update</button>
                
                            </form>
                            ) : (
            <div>Loading...</div>
        ))}
            </div>
            </div>
)
}