
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';

export default function UpdateService(){
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [subServices, setSubServices] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [availability, setAvailability] = useState("")
    const navigate = useNavigate();

    const params = useParams();
    const userId = params.id;

    useEffect(() => {
        async function Getid(){
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:8070/services/getService/${userId}`)
                setServices(res.data.services);
                console.log(res.data);

                setName(res.data.services.name);
                setCategory(res.data.services.category);
                if(res.data.services.subServices){
                  setSubServices(res.data.services.subServices);                 
                }else{
                  setSubServices('-');                  
                }
                
                console.log("sub "+res.data.services.subServices);
                setDescription(res.data.services.description);
                setPrice(res.data.services.price);
                setAvailability(res.data.services.availability);
                
               
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
        const updatedService = {
            name, 
            category, 
            subServices,
            description,
            price,
            availability
          
        }
        axios.put(`http://localhost:8070/services/updateService/${userId}`, updatedService)
            .then(() => {
               // alert("service data updated");

                Swal.fire({
                  position: 'top-center',
                  icon: 'success',
                  title: 'Service Updated Succesfully',
                  showConfirmButton: false,
                  timer: 2500
                })
                
                  navigate("/getService");
            })
            .catch((err) => {
                alert(err);
            });
    }

    return (
      <div style={{ 
        backgroundImage: `url(${process.env.PUBLIC_URL + '../background.gif'})`, 
        backgroundSize: 'cover',
        minHeight: '140vh',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        
    }}>

<Header/>
    <div className="col-lg-9-mt-2 mb-2 p-3 pt-4 text-white">
            <h1 style={{ textAlign: "left" ,paddingLeft:"90px" }}>Update Service</h1>
        </div>
        
    <div className="container shadow-lg p-3 mb-5  rounded" style={{background:"#04052e"}}>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <form onSubmit={handleSubmit}>

                <div className="mb-3 text-white ">
                    <label for="name" className="form-label">Service Name</label>
                    <input type="text" className="form-control ml-2 mr-5" id="name"placeholder="Enter Full Name"
                    value={name} required onChange={(e)=>{
      
                      setName(e.target.value);
                    }}/>
      
                </div>
      
                <div className="mb-3 text-white">
                  <label for="category" class="form-label">Service category</label>
                    <select id="category" class="form-select" required onChange={(e) => setCategory(e.target.value)}>
                      <option selected>Choose Category</option>
                      <option>Periodic Maintenance</option>
                      <option>Repairing</option>
                      <option>Detailing</option>
                      <option>Standard Package</option>
                      <option>Premium Package</option>
                      <option>Luxuary Package</option>
                    </select>
                </div>
      
                <div className="mb-3 text-white">
                  <label htmlFor="services" className="form-label">Sub Services</label>
                    <textarea className="form-control" id="services" placeholder="If it is a  package enter Services"
                     value={subServices} required onChange={(e)=>{
                      setSubServices(e.target.value);
                      }}
                    />
                </div>
      
                <div className="mb-3 text-white">
                  <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" placeholder="Enter description"
                      value={description} required onChange={(e)=>{
                        setDescription(e.target.value);
                      }}
                    />
                </div>
      
                <div className="mb-3 text-white">
                  <label htmlFor="basicSalary" className="form-label">Price (LKR)</label>
                  <div className="input-group">
                    <span className="input-group-text">LKR</span>
                    <input type="text" className="form-control" id="basicSalary" placeholder="Enter Basic Salary"
                     value={price} required onChange={(e)=>{
                        setPrice(e.target.value);
                      }}
                    />
                </div>
              </div>
      
              <div className="mb-3 text-white">
                  <label for="availability" className="form-label">Availability</label>
                    <select id="availability" class="form-select" required onChange={(e) => setAvailability(e.target.value)}>
                      <option selected>Choose Availability</option>
                      <option>Yes</option>
                      <option>No</option>
                      
                    </select>
                    
                </div>
      
      

      
                  <button type="submit" className="btn btn-primary btn-lg">Update</button>
        
      
              </form>
            )}
        </div>
        </div>
    );
}






































