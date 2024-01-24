
import React,{useState} from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';

 function AddService(){
  
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [subServices, setSubServices] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [availability, setAvailability] = useState('');
  const navigate = useNavigate();
  

  function sendData(e){
    e.preventDefault();

      const newService = {
    
        name, 
        category, 
        subServices,
        price,
        description,
        availability,   
      }

    console.log(newService);

    axios.post("http://localhost:8070/services/addService",newService).then(()=>{
      //alert("Service Added")

      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Service Added Succesfully',
        showConfirmButton: false,
        timer: 2500
      })

      
        navigate("/getService");
    

    }).catch((err)=>{
      alert(err)
    })
   
  }

 return(

    

    <div style={{ 
        backgroundImage: `url(${process.env.PUBLIC_URL + '../background.gif'})`, 
        backgroundSize: 'cover',
        minHeight: '150vh',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',  }}>

      
      <Header/>
      <div className="col-lg-9-mt-2 mb-2 p-3 pt-4 text-white">
          <h1 style={{ textAlign: "left" ,paddingLeft:"90px" }}>Add New Service</h1>
      </div>
            
      <div className="container shadow-lg p-3 mb-5  rounded" style={{background:"#04052e"}}>

        <form onSubmit={sendData}>

          <div className="mb-3 text-white ">
              <label htmlFor="name" className="form-label">Service Name</label>
              <input type="text" className="form-control ml-2 mr-5" id="name"placeholder="Enter Full Name"
              required onChange={(e)=>{

                setName(e.target.value);
              }}/>

          </div>

          <div className="mb-3 text-white">
            <label htmlFor="category" className="form-label">Service category</label>
              <select id="category" className="form-select" required onChange={(e) => setCategory(e.target.value)}>
                <option selected>Choose Category</option>
                <option>Periodic Maintenance</option>
                <option>Repairing</option>
                <option>Detailing</option>
                <option>Standard Package</option>
                <option>Premium Package</option>
                <option>Luxury Package</option>
               
              </select>
          </div>

         
          <div className="mb-3 text-white">
            <label htmlFor="subservices" className="form-label">Sub Services</label>
              <textarea className="form-control" id="subservices" placeholder="If it is a  package enter Services"
             required onChange={(e)=>{
                  setSubServices(e.target.value);
                }}
              />
          </div>

          <div className="mb-3 text-white">
            <label htmlFor="description" className="form-label">Description</label>
              <textarea className="form-control" id="description" placeholder="Enter description"
                required onChange={(e)=>{
                  setDescription(e.target.value);
                }}
              />
          </div>

          <div className="mb-3 text-white">
            <label htmlFor="basicSalary" className="form-label">Price (LKR)</label>
            <div className="input-group">
              <span className="input-group-text">LKR</span>
              <input type="number" className="form-control" id="basicSalary" placeholder="Enter Basic Salary"
                required onChange={(e)=>{
                  setPrice(e.target.value);
                }}
              />
          </div>
        </div>

        <div className="mb-3 text-white">
            <label htmlFor="availability" className="form-label">Availability</label>
              <select id="availability" className="form-select" required onChange={(e) => setAvailability(e.target.value)}>
                <option selected>Choose Availability</option>
                <option >Yes</option>
                <option>No</option>
                
              </select>
              
          </div>

            <button type="submit" className="btn btn-primary btn-lg">Submit</button>
  
        </form>

      </div>
    </div>

    )
}
export default AddService;


//const categoriesWithSubservices = ["Premium Package", "Standard Package", "Luxuary Package"];








