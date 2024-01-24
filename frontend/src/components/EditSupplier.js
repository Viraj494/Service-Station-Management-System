import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../components/Header';

export default function EditSupplierd(){
    const [supplier, setSupplier] = useState({});
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [suppId, setSuppId] = useState("");
    const [mobile, setMobile] = useState(""); 
    const [product, setProduct] = useState("");
    const [company, setCompany] = useState(""); 
    const params = useParams();
    const userId = params.id;

    useEffect(() => {
        async function Getid(){
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:8070/supplier/getsup/${userId}`)

                setSupplier(res.data);
                console.log(res.data);
                setName(res.data.Name);
                setSuppId(res.data.suppId);
                setMobile(res.data.mobile_number);
                setProduct(res.data.product);
                setCompany(res.data.company);
               
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
        const updatedSupplier = {
            name,
            suppId,
            mobile,
            product,
            company
        }
        axios.put(`http://localhost:8070/supplier/updatesup/${userId}`, updatedSupplier)
            .then(() => {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Supplier Updated',
                    showConfirmButton: false,
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
                        <Header/>

                    <div className="container">
                        <br></br>
                        <h1 id="t1">Update supplier</h1>
                      
                        {loading ? (
                            <div>Loading...</div>

                        ) : (supplier && Object.keys(supplier).length !== 0 ? (

                            <form onSubmit={handleSubmit}>
                
                                <div className="mb-3">
                                    <label for="name" className="form-label" id="t2">Name</label>
                                    <input type="text" className="form-control" required id="name" placeholder={supplier.supplier.name}
                                        value={supplier.name} onChange={(e) => setName(e.target.value)} />
                                </div>
                
                                <div className="mb-3">
                                    <label for="age" className="form-label" id="t2">Supplier ID</label>
                                    <input type="text" className="form-control" required id="age" placeholder={supplier.supplier.suppId}
                                        value={supplier.vNo} onChange={(e) => setSuppId(e.target.value)} />
                                </div>
                
                                <div className="mb-3">
                                    <label for="gender" className="form-label" id="t2">Mobile No</label>
                                    <input type="text" className="form-control" required id="gender" placeholder={supplier.supplier.mobile}
                                        value={supplier.vType} onChange={(e) => setMobile(e.target.value)} />
                                </div>

                                <div className="mb-3">
                                    <label for="age" className="form-label" id="t2">Product</label>
                                    <input type="text" className="form-control" required id="age" placeholder={supplier.supplier.product}
                                        value={supplier.vNo} onChange={(e) => setProduct(e.target.value)} />
                                </div>
                
                                <div className="mb-3">
                                    <label for="gender" className="form-label" id="t2">Company</label>
                                    <input type="text" className="form-control" required id="gender" placeholder={supplier.supplier.company}
                                        value={supplier.vType} onChange={(e) => setCompany(e.target.value)} />
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