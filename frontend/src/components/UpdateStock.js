import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../components/Header';

export default function UpdateStock(){
    const [stock, setStock] = useState({});
    const [loading, setLoading] = useState(true);

    let [item, setItem] = useState("");
    const [quantity,setQuantity] = useState("");
    const [unitPrice,setUnitPrice] = useState("");
    const [expireDate,setExpireDate] = useState("");
    const [supplier,setSupplier] = useState("");
    const [payment,setpayment] = useState("");



    const params = useParams();
    const userId = params.id;

    useEffect(() => {
        async function Getid(){
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:8070/stock/stget/${userId}`)
                setStock(res.data.stock);
                console.log(res.data);

                setItem(res.data.stock.item);
                setQuantity(res.data.stock.quantity);
                setUnitPrice(res.data.stock.unitPrice);
                setExpireDate(res.data.stock.expireDate);
                setSupplier(res.data.stock.supplier);
                setpayment(res.data.stock.supplier);

                
               
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
        const updatedStock = {
            item,
            quantity,
            unitPrice,
            expireDate,
            supplier,
            payment
        }
        axios.put(`http://localhost:8070/stock/stupdate/${userId}`, updatedStock)
            .then(() => {
              Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Stock Updated',
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
        minHeight: '140vh',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        
    }}>
<Header/>
<div className="col-lg-9-mt-2 mb-2 p-3 pt-4 text-white">
            <h1 style={{ textAlign: "left" ,paddingLeft:"90px" }}>Update Stock</h1>
        </div>
        
    <div className="container shadow-lg p-3 mb-5  rounded" style={{background:"#04052e"}}>

            {loading ? (
                <div>Loading...</div>
            ) : (
              <form onSubmit={handleSubmit}>
              <div className="mb-3 text-white ">
    <label for="item" className="form-label">Item</label>
    <input type="text" className="form-control ml-2 mr-5" id="fullname"placeholder="Enter item Name"
    value={item}
    required onChange={(e)=>{

        setItem(e.target.value);
    }}/>

  </div>
  

  <div class="row g-3">



  <div className="col mb-3 text-white">
    <label for="quantity" className="form-label">Quantity</label>
    <input type="text" className="form-control" id="nic"placeholder="Enter Quantity"
    value={quantity}
     required onChange={(e)=>{

        setQuantity(e.target.value);
    }}/>
    
  </div>
  </div>


  <div className="col mb-3 text-white">
  <label className="form-label">Payment</label>
  <div className="form-check">
    <input type="radio" className="form-check-input" id="cash" name="payment" value="cash" requierd onChange={(e) => {
      setpayment(e.target.value);
    }}/>
    <label className="form-check-label" htmlFor="cash">Cash</label>
  </div>
  <div className="form-check">
    <input type="radio" className="form-check-input" id="card" name="payment" value="card" required onChange={(e) => {
      setpayment(e.target.value);
    }}/>
    <label className="form-check-label" htmlFor="card">Card</label>
  </div>
</div>




  <div class="row g-3"> 
  
  <div className="col mb-3 text-white">
    <label for="unitPrice" className="form-label">UnitPrice</label>
    <input type="text" className="form-control" id="age"placeholder="Enter UnitPrice"
    value={unitPrice}
     required onChange={(e)=>{

        setUnitPrice(e.target.value);
    }}/>
    
  </div>




<div className="col mb-3 text-white">
  <label htmlFor="bday" className="form-label">Expire Day</label>
  <input type="date" className="form-control" id="bday" placeholder="Enter Expire Day"
  value={expireDate}
    required onChange={(e)=>{
      setExpireDate(e.target.value);
    }}
  />
</div>
</div>
<div className="col mb-3 text-white">
    <label for="supplier" className="form-label">Supplier</label>
    <input type="text" className="form-control" id="nic"placeholder="Enter Supplier"
    value={supplier}
     required onChange={(e)=>{

        setSupplier(e.target.value);
    }}/>
    
  </div>

                            
                                            <button type="submit" className="btn btn-primary">Update</button>
                            
                                        </form>
            )}
        </div>
        </div>
    );
}
