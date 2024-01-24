import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import './StyleSheet1.css';
import Header from "./CustomerHeader";

export default function EditVehicle(){
    const [vehicle, setVehicle] = useState({});
    const [loading, setLoading] = useState(true);
    const [regNo, setRegNo] = useState("");
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [engC, setEngC] = useState("");
    const [mileage, setMileage] = useState("");
    const params = useParams();
    const userId = params.id;

    useEffect(() => {
        async function Getid(){
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:8070/vehicle/getvehicle/${userId}`)

                setVehicle(res.data);
                console.log(res.data);
                setRegNo(res.data.regNo);
                setMake(res.data.make);
                setModel(res.data.model);
                setEngC(res.data.engC);
                setMileage(res.data.mileage);

               
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
        const updatedvehicle = {
            regNo,
            make,
            model,
            engC,
            mileage
        }
        axios.put(`http://localhost:8070/vehicle/updatevehicle/${userId}`, updatedvehicle)
            .then(() => {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Vehicle Updated',
                    showConfirmButton: true,
                    timer: 15000
                  })
            })
            .catch((err) => {
                alert(err);
                });
                }

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
                    <h1 id="t1">Edit your Vehicle</h1><br></br>

                        {loading ? (
                            <div>Loading...</div>

                        ) : (vehicle && Object.keys(vehicle).length !== 0 ? (

                            <form onSubmit={handleSubmit}>
                
                                <div className="mb-3">
                                    <label for="name" className="form-label" id="t3">Registration Number</label>
                                    <input type="text" className="form-control" id="name" placeholder={vehicle.vehicle.regNo}
                                        value={vehicle.name} onChange={(e) => setRegNo(e.target.value)} />
                                </div>
                
                                <div className="mb-3">
                                    <label for="age" className="form-label" id="t3">Make</label>
                                    <input type="text" className="form-control" id="age" placeholder={vehicle.vehicle.make}
                                        value={vehicle.vNo} onChange={(e) => setMake(e.target.value)} />
                                </div>
                
                                <div className="mb-3">
                                    <label for="gender" className="form-label" id="t3">Model</label>
                                    <input type="text" className="form-control" id="gender" placeholder={vehicle.vehicle.model}
                                        value={vehicle.vType} onChange={(e) => setModel(e.target.value)} />
                                </div>

                                <div className="mb-3">
                                    <label for="age" className="form-label" id="t3">Engine Capacity</label>
                                    <input type="number" className="form-control" id="age" placeholder={vehicle.vehicle.engC}
                                        value={vehicle.vNo} onChange={(e) => setEngC(e.target.value)} />
                                </div>
                
                                <div className="mb-3">
                                    <label for="gender" className="form-label" id="t3">Mileage</label>
                                    <input type="number" className="form-control" id="gender" placeholder={vehicle.vehicle.mileage}
                                        value={vehicle.vType} onChange={(e) => setMileage(e.target.value)} />
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