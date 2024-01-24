import React, {useState, useEffect } from 'react';
import axios from 'axios';


export default function  AllCustomer() {

    const [customers, setCustomers] = useState([]);
    useEffect(()=>{
      function getCustomer() {
        axios.get("http://localhost:8070/customer/").then((res)=>{
            setCustomers(res.data)
        }).catch((err)=>{
            alert(err.message);
       })
     }
     getCustomer();
    }, [])
    return(
        <div>
           <h1>All Customer</h1>
        </div>
    )
}