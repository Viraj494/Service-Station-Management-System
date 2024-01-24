import React, {useState, useEffect} from "react";
import axios from "axios"; 
import { Link } from "react-router-dom";
import Header from '../components/Header';

//report
import jsPDF from "jspdf";
import "jspdf-autotable";



export default function AllStocks(){

    const [stocks, setStocks] = useState([]);
    

  

    useEffect(()=>{

        function getStocks(){
            axios.get("http://localhost:8070/stock/st").then((res)=>{
               // console.log(res.data);  
               setStocks(res.data);
            }).catch((err)=>{
                alert("err.message");
            })
        }
        getStocks();
        

    },[])

    //search

    function filterData(stocks, searchKey) {
      const result = stocks.filter((stock) => {
        return (
            stock.item.includes(searchKey) ||
            stock.supplier.includes(searchKey) ||
            stock.expireDate.includes(searchKey)||
            stock.payment.includes(searchKey)
            
        );
      });
    
      setStocks(result);
    }
    

   function handleSearchArea  (e){
        const searchKey= e.currentTarget.value;

        axios.get("http://localhost:8070/stock/st").then((res)=>{
            // console.log(res.data);  
          filterData(res.data,searchKey);
         })
    }

    //report 
    function generatePDF(stocks) {
      const doc = new jsPDF();
    
      // Set background color
      doc.setFillColor("#072b52");
      doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, "F");
    
      const tableColumn = ["ID", "Name", "Department", "Email", "Contact Number", "Total Salary","payment"];
      const tableRows = [];
    
      stocks.forEach((stock, index) => {
        const stockData = [
             index + 1,
            stock.item,
            stock.quantity,
            stock.unitPrice,
            stock.expireDate,
            stock.supplier,
            stock.payment
        ];
        tableRows.push(stockData);
      });
    
      // Add image at the top
      doc.addImage(process.env.PUBLIC_URL + '../slogo.png', "PNG", 70, 20, 70, 20);
    
      // Set table color to match background color
      doc.setTextColor("#fff");
      doc.setFillColor("#072b52");
    
      // Add table with data
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 50,
        theme: "grid",
        styles: {
          cellPadding: 0.5,
          fontSize: 10
        }
      });
    
      doc.text("All item Details", 14, 45);
    
      doc.save("all-item Details.pdf");
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

    
   
<div>


    <div className="col-lg-9-mt-2 mb-2 p-3 pt-4 text-white">
                <h1 style={{ textAlign: "left" ,paddingLeft:"90px" }}>Stock Dashboard</h1>
            </div>
            <div style={{textAlign:"right",paddingRight:"100px",paddingBottom:"20px" }}>
  <button className="btn btn-success btn-lg float-right"><a href="/stadd" style={{textDecoration:'none',color:"white"}}>+ Add New Stock</a></button>
</div>

 
<div className="container shadow-lg p-3 mb-5  rounded" style={{background:"#04052e"}}>
        <div className="row pb-3 pt-2">
          
            <div className="col-lg-9-mt-2 mb-2">
                <input className="form-control"
                 type="search"
                 placeholder="Search"
                 name="searchQuery"
                 onChange={handleSearchArea}
                 style={{ width: "200px",height:"25px" 
                 }}>

                 </input>
            </div>
        </div>
        
        
            
                
        <div className="table-responsive">
  <table className="table text-white">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Item</th>
        <th scope="col">Quantity</th>
        <th scope="col">UnitPrice</th>
        <th scope="col">Expire Date</th>
        <th scope="col">Supplier</th>
        <th scope="col">payment</th>

        
      </tr>
    </thead>
    <tbody>
      {stocks.map((stock, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>
            <a href={`/stget/${stock._id}`} style={{ textDecoration: 'none' }}>
              {stock.item}
            </a>
          </td>
          <td>{stock.quantity}</td>
          <td>{stock.unitPrice}</td>
          <td>{stock.expireDate}</td>
          <td>{stock.supplier}</td>
          <td>{stock.payment}</td>
          <td>
            <div className="btn-group" role="group">
              <a className="btn btn-warning" href={`/stupdate/${stock._id}`}>
                <i className="fas fa-edit"></i>&nbsp; Update Details
              </a>
              &nbsp;
              &nbsp;
              <a className="btn btn-danger" href={`/stdelete/${stock._id}`}>
                <i className="fas fa-trash-alt"></i>&nbsp; Delete
              </a> &nbsp; &nbsp;

            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

            
                
    </div>
    <div style={{ textAlign: "center", padding: "10px" }}>

  <button
    className="btn btn-primary btn-lg"
    style={{ marginBottom: "10px" }}
    onClick={() => generatePDF(stocks)}
  >
    <a style={{ textDecoration: "none", color: "white" }}>Stock Report</a>
  </button>
  
  
</div>

    </div>
    </div>
)
 }

