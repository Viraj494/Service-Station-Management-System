import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import jsPDF from "jspdf";
import 'jspdf-autotable';
import './StyleSheet1.css';
import Header from "./CustomerHeader";

export default function ViewVehicle(){
    const [vehicle, setVehicle] = useState({});
    const [vehicles, setVehicles] = useState(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const userId = params.id;

    useEffect(() => {
        async function Getid(){
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:8070/vehicle/getvehicle/${userId}`)

                setVehicle(res.data);
                console.log(res.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                alert(err.message);
            }
        }
        Getid();
    }, [userId])

    const DownloadPdf=()=>{
        const doc = new jsPDF()

        doc.setFillColor("#072b52");
        doc.rect(0, 0, 210, 297, "F");
        doc.addImage(process.env.PUBLIC_URL + '../slogo.png', "PNG", 70, 20, 70, 20);

        doc.setFontSize(22);
        doc.setTextColor("#ffffff");

        doc.text("Vehicle Identity Card", 70,60)
        doc.text("Registration No : ", 50,90)
        doc.text("Make : ", 50,100)
        doc.text("Model : ", 50,110)
        doc.text("Engine Capacity : ", 50,120)
        doc.text(vehicle.vehicle.regNo , 125,90)
        doc.text(vehicle.vehicle.make , 125,100)
        doc.text(vehicle.vehicle.model , 125,110)
        doc.text(vehicle.vehicle.engC , 125,120)

        doc.addImage(process.env.PUBLIC_URL + '../QR.png', "PNG", 80, 155, 50, 50);
        doc.text(vehicle.vehicle._id , 55,220)
        doc.addImage(process.env.PUBLIC_URL + '../desc.PNG', "PNG", 55, 240, 100, 20);

        doc.setLineWidth(1.5);
        doc.setDrawColor("#ffffff");
        doc.line(10, 10, 10, 287); 
        doc.line(10, 10, 200, 10); 
        doc.line(200, 10, 200, 287); 
        doc.line(10, 287, 200, 287); 

        doc.save(`${vehicle.vehicle.regNo}.pdf`)
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

                    <div className="f2">
                        <br></br><br></br><br></br>
                        <h3 id="t1">Vehicle Information</h3>
                        <br></br>
                        {loading ? (
                            <div>Loading...</div>


                        ) : (vehicle && Object.keys(vehicle).length !== 0 ? (
                            
                            <form id="f1">
                
                                <div className="mb-3">
                                    <label for="name" className="form-label" id="t2">Registration Number: </label>&nbsp;&nbsp;<div id="t3">{vehicle.vehicle.regNo}</div>
                                </div>
                                <div className="mb-3">
                                    <label for="age" className="form-label" id="t2">Make: </label>&nbsp;&nbsp;<div id="t3">{vehicle.vehicle.make}</div>
                                </div>
                
                                <div className="mb-3">
                                    <label for="gender" className="form-label" id="t2">Model: </label>&nbsp;&nbsp;<div id="t3">{vehicle.vehicle.model}</div>
                                </div>

                                <div className="mb-3">
                                    <label for="age" className="form-label" id="t2">Engine Capacity: </label>&nbsp;&nbsp;<div id="t3">{vehicle.vehicle.engC}</div>
                                </div>
                                <br></br>
                
                                <button type="submit" class="btn btn-primary" onClick={DownloadPdf}>Download Vehicle ID</button>
                
                            </form>
                            ) : (
            <div>Loading...</div>
        ))}
            </div>
            </div>
)
}