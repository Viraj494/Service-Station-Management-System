
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
//import AdminHeader from "./AdminHeader";

export default function DeleteService(){
    const [services, setServices] = useState({});
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const userId = params.id;
    const navigate = useNavigate();

    useEffect(() => {
        async function Getid(){
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:8070/services/getService/${userId}`)

                setServices(res.data);
                console.log(res.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                alert(err.message);
            }
        }
        Getid();
    }, [userId])

    function handleDelete(e) {
        e.preventDefault();

        var del = window.confirm("Are you sure you want to delete?");
    



        
               if(del){
                        axios.delete(`http://localhost:8070/services/deleteService/${userId}`)
                        .then(() => {
                        // alert("Employee data deleted");
            
                        
            
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: 'Successfully deleted',
                            showConfirmButton: false,
                            timer: 2500
                        })
                        navigate("/getService");
                        })
                        .catch((err) => {
                            alert(err);
                            });
                            }
             }

                return (

                    <div style={{ 
                        backgroundImage: `url(${process.env.PUBLIC_URL + '../background.gif'})`, 
                        backgroundSize: 'cover',
                        minHeight: '150vh',
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                        backgroundAttachment: 'fixed',  }}>

               
           
            <div  className="col-lg-9-mt-2 mb-2 p-3 pt-4 text-white">
                
                <h1 style={{ textAlign: "left" ,paddingLeft:"90px" }}>Delete Service</h1>
            </div>
                    <div className="container">
                        
                        {loading ? (
                            <div>Loading...</div>


                        ) : (services && Object.keys(services).length !== 0 ? (
                            <div className="container shadow-lg p-3 mb-5  rounded text-white " style={{background:"#04052e"}}>
                            <form onSubmit={handleDelete}>
                
                                <div className="mb-3 text-white">
                                    <label for="name" className="form-label">Service  Name: {services.services.name}</label>
                                </div>
                
                                <div className="mb-3 text-white">
                                    <label for="age" className="form-label">Service price: {services.services.price}</label>
                                </div>
                
                                <div className="mb-3 text-white">
                                    <label for="gender" className="form-label">Service category : {services.services.category}</label>
                                </div>
                
                                <button type="submit" className="btn btn-danger">Delete</button>
                
                            </form>
                                </div>
                                ) : (
                                <div>Loading...</div>
                                )
                            )
                        }
                 </div>
            </div>
               
);
}