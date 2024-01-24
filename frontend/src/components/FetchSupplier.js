import { Axios } from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './stylesheet.css';
import jsPDF from "jspdf";
import 'jspdf-autotable';
import Swal from 'sweetalert2';
import Header from '../components/Header';

const FetchSupplier = () => {

    const [suppliers, setSuppliers] = useState(null)
    const [deleteSupp, setSuppDelete] = useState("");
    const [Search, setSearch] = useState("");

    useEffect(()=>{
        const showSup = async ()=>{
            const response = await fetch('http://localhost:8070/supplier/getsup')
            const json = await response.json()

            if(response.ok){
              setSuppliers(json)
            }
        }
        showSup()
    }, [])

    const deleteSupplier=async (id) => {
      try {
        await axios.delete(`http://localhost:8070/supplier/deletesup/${id}`);
        setSuppDelete(suppliers.filter((item) => item.id !== id));
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Supplier Removed',
          showConfirmButton: false,
          timer: 15000
        })
        window.location.reload(); 
        //data deleted after that page will refresh automatically
      } catch (error) {
        alert('Error deleting data', error);
        console.log(error);
      }
    };

    const DownloadPdf=()=>{
      const doc = new jsPDF()
      doc.text("Suppliers", 90,10)
      doc.autoTable({
        suppliers:suppliers.map(col=>({...col,datakey:col.field})),
        body:suppliers
      })
      doc.save('Suppliers.pdf')
    }

  
    return(

      
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
        <Link to='/addsup' className='btn btn-success'>+ Add Supplier</Link>
        <form className="f1">
              <input type="text" placeholder="   Search Suppliers" className="i1" onChange={(e)=> setSearch(e.target.value)}></input>
        </form>
            
                <table class="table">
                <thead>
                  <tr>
                    <th scope="col" id="t2">Name</th>
                    <th scope="col" id="t2">supplier ID</th>
                    <th scope="col" id="t2">Mobile No</th>
                    <th scope="col" id="t2">Product</th>
                    <th scope="col" id="t2">Company</th>
                  </tr>
                </thead>
                <tbody>
                {suppliers && suppliers.filter((supplier)=>{
                  return Search.toLowerCase() === ''
                  ? supplier
                  : supplier.name.toLowerCase().includes(Search);
                }).map((supplier)=>(
                  <tr>
                    <td id="t2">{supplier.name}</td>
                    <td id="t2">{supplier.suppId}</td>
                    <td id="t2">{supplier.mobile}</td>
                    <td id="t2">{supplier.product}</td>
                    <td id="t2">{supplier.company}</td>
                    <div class="d-grid gap-2 d-md-block">
                        <Link to={`/updatesup/${supplier._id}`} class="btn btn-warning"><i className="fas fa-edit"></i>Edit</Link>&nbsp;
                        <button class="btn btn-danger" onClick={()=>deleteSupplier(supplier._id)}>Delete</button>
                    </div>
                  </tr>))}
                </tbody>
                <br></br>
              <button class="btn btn-primary" onClick={DownloadPdf}>Generate Supplier Report</button>
              </table>
             
            
        </div>
        </div>
    )
}

export default FetchSupplier;