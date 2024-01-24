import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import Swal from "sweetalert2";
import 'jspdf-autotable';
import Header from '../components/Header';
import 'font-awesome/css/font-awesome.min.css';

const FetchCustomer = () => {
  const [customer, setCustomer] = useState([]);
  const [Search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8070/customer/get")
      .then((res) => {
        console.log(res.data);
        setCustomer(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);


  const print = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFillColor("#072b52");
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, "F");

    doc.setFontSize(15);

    const title = "";
    const headers = [["Name", "Email", "Mobile number","Address"]];

    const data = customer.map(customer => [customer.name, customer.email, customer.mobileNumber,customer.address]);

    let content = {
        startY: 50,
        head: headers,
        body: data
    };

    // Set table color to match background color
  doc.setTextColor("#fff");
  doc.setFillColor("#072b52");
    
    //Add image at the top
  doc.addImage(process.env.PUBLIC_URL + '../slogo.png', "PNG", 70, 20, 70, 20);

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf")
}

 //search for customer
  function handleSearchArea(e) {
    const searchKey = e.currentTarget.value;
    axios
      .get("http://localhost:8070/customer/")
      .then((res) => {
        const filteredData = res.data.filter((customer) =>
       
          customer.name.includes(searchKey)||
          customer.email.includes(searchKey)
          
        )
        setCustomer(filteredData);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  return (
    
    <div style={{ 
      backgroundImage: `url(${process.env.PUBLIC_URL + '../background.gif'})`, 
      backgroundSize: 'cover',
      minHeight: '150vh',
      backgroundRepeat: 'no-repeat',
      
  }}>
    
    <Header/>
    
    <div className="col-lg-9-mt-2 mb-2 p-2 pt-1 text-white">
      <br></br>
      <h1 style={{ textAlign: "left" ,paddingLeft:"20px" }}>All customers</h1>
      &nbsp; &nbsp; &nbsp; &nbsp;

      <input
        className="form control"
        type="search"
        placeholder="Search"
        name="searchQuery"
        onChange={(e)=> setSearch(e.target.value)}
      />

&nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;
    
      
    <button       
        className="btn btn-primary"
        style={{ width: "200px" }}
        onClick={print}
      >
        {" "}
        Report
      </button>
      <div className="container">
     {/* create the table */}
      <table className="table text-white">
        <thead>
          <tr>
            <th scope="col">Customer ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile number</th>
            <th scope="col">Address</th>
            <th scope="col">Password</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customer.filter((customer)=>{
                  return Search.toLowerCase() === ''
                  ? customer
                  : customer.name.toLowerCase().includes(Search);
                }).map((customer) => (
            <tr key={customer._id}>
              <th scope="row">{customer._id}</th>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.mobileNumber}</td>
              <td>{customer.address}</td>
              <td>{customer.password}</td>
              <td>
                <div className="btn-group" role="group">
                  <a className="btn btn-warning" href={`/update/${customer._id}`}>
                    <i className="fa fa-edit"></i>
                    Edit
                  </a>
                  &nbsp;&nbsp;
                  <a className="btn btn-danger" href={`/delete/${customer._id}`}>
                    <i className="fa fa-trash"></i>&nbsp; Delete
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        
      </table>
    </div>
    </div>
    </div>
    
    
   
  );
};

export default FetchCustomer;
