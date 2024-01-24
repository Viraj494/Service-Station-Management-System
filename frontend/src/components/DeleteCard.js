import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import Header from "./CustomerHeader";

export default function DeleteCard(){
    const [card, setCard] = useState({});
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const userId = params.id;

    useEffect(() => {
        async function Getid(){
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:8070/card/cdget/${userId}`)

                setCard(res.data);
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
        axios.delete(`http://localhost:8070/card/cddelete/${userId}`)
            .then(() => {
               

               Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Delete Successful',
                showConfirmButton: false,
                timer: 1500
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
                        <div>

<div className="col-lg-9-mt-2 mb-2 p-3 pt-4 text-white">
                <h1 style={{ textAlign: "left" ,paddingLeft:"90px" }}>Delete Card</h1>
            </div>
                    <div className="container">
                        
                        {loading ? (
                            <div>Loading...</div>


                        ) : (card && Object.keys(card).length !== 0 ? (
                            <div className="container shadow-lg p-3 mb-5  rounded text-white " style={{background:"#04052e"}}>
                            <form onSubmit={handleDelete}>
                
                                <div className="mb-3 text-white">
                                    <label for="name" className="form-label">Card Type: {card.card.type}</label>
                                </div>
                
                                <div className="mb-3 text-white">
                                    <label for="age" className="form-label">Card Number: {card.card.num}</label>
                                </div>
                
                                <div className="mb-3 text-white">
                                    <label for="gender" className="form-label">Card Expire Date: {card.card.expireDate}</label>
                                </div>
                
                                <button type="submit" className="btn btn-danger">Delete</button>
                
                            </form>
                            </div>
                            ) : (
            <div>Loading...</div>
        ))}
            </div>
            </div>
            </div>
)
}
