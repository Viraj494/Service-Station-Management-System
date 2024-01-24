import React, {useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import './stylesheet.css';
import Header from '../components/Header';

export default function AddSupplier(){

    const [name, setName] = useState("");
    const [suppId, setSuppId] = useState("");
    const [mobile, setMobile] = useState(""); 
    const [product, setProduct] = useState("");
    const [company, setCompany] = useState(""); 

    function sendData(e){
        e.preventDefault();

        const newSupplier ={
            name,
            suppId,
            mobile,
            product,
            company

        }
       axios.post("http://localhost:8070/supplier/addsup", newSupplier).then(()=>{
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Supplier Added',
            showConfirmButton: false,
            timer: 15000
          })

       }).catch((err)=>{
        alert(err)
       })
    }

    return(
        
        <div className="mb-3 text-white ">
            
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
            <h1 id="t1">Suppliers</h1><br></br>
            <form onSubmit={sendData}>
            
            <div class="mb-3">
                <label for="name" class="form-label" id="t2">Name</label>
                <input type="text" class="form-control" required id="name" aria-describedby="emailHelp" onChange={(e)=>{
                    setName(e.target.value);
                }}/>
            </div>
            <div class="mb-3">
                <label for="vno" class="form-label" id="t2">Supplier ID</label>
                <input type="text" class="form-control" required id="vno" aria-describedby="emailHelp" onChange={(e)=>{
                    setSuppId(e.target.value);
                }}/>
            </div>
            <div class="mb-3">
                <label for="vtype" class="form-label" id="t2">mobile Number</label>
                <input type="text" class="form-control" required id="vtype" aria-describedby="emailHelp" onChange={(e)=>{
                    setMobile(e.target.value);
                }}/>
            </div>
            <div class="mb-3">
                <label for="vno" class="form-label" id="t2">Product</label>
                <input type="text" class="form-control" required id="vno" aria-describedby="emailHelp" onChange={(e)=>{
                    setProduct(e.target.value);
                }}/>
            </div>
            <div class="mb-3">
                <label for="vtype" class="form-label" id="t2">company</label>
                <input type="text" class="form-control" required id="vtype" aria-describedby="emailHelp" onChange={(e)=>{
                    setCompany(e.target.value);
                }}/>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            
        </form>
        </div>
        </div>
        </div>
    )

}