import React, {useState, useEffect} from "react";
import axios from "axios"; 
//import { Link } from "react-router-dom";

//report
import jsPDF from "jspdf";
import "jspdf-autotable";
import Header from '../components/Header';


//const categories = ["Periodic Maintenance", "Repairing", "Detailing", "Extra", "Standard Package","Premium Package","Luxuary Package"];


export default function AllServices(){

    const [services, setServices] = useState([]);

    //filter 

  const [categoryFilter, setCategoryFilter] = useState("");

  const [priceFilter, setPriceFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);

  const categories = ["Periodic Maintenance", "Repairing", "Detailing" , "Standard Package", "Premium Package", "Luxury Package"];

  useEffect(() => {
    axios
      .get('http://localhost:8070/services/getService')
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  

  const handleCategoryFilter = (e) => {
    setCategoryFilter(e.target.value);
  };
  
  const handlePriceFilter = (e) => {
    setPriceFilter(e.target.value);
  };
  
  const handleAvailabilityFilter = (e) => {
    setAvailabilityFilter(e.target.value);
  };
   
  const handleFilterSubmit = (e) => {
    e.preventDefault(); 

    console.log(categoryFilter);
    console.log(priceFilter);
    console.log(availabilityFilter);
 
    axios.get("http://localhost:8070/services/getService").then((res)=>{         
      filterAdvanced(res.data,categoryFilter,priceFilter,availabilityFilter);
    }) 
  };

  
 
  function filterAdvanced(services,cat,price,avail){

    var result = services;

    if(cat){
       
        if(price){
         
          if(avail){
            result = services.filter((service)=>
              service.category.includes(cat) && service.price <= parseInt(price) && service.availability.toLowerCase().includes(avail.toLowerCase())
            )
            
          }else{
            result = services.filter((service)=>
              service.category.includes(cat) && service.price <= parseInt(price)
            )
          }
        }else if(avail){
            result = services.filter((service)=>
              service.category.includes(cat) && service.availability.toLowerCase().includes(avail.toLowerCase())
            )
        }else{
          result = services.filter((service)=>
            service.category.includes(cat)
          )   
          console.log("cat only");         
        }
    }else if(price){     
      if(avail){
        result = services.filter((service)=>
          service.price <= parseInt(price) && service.availability.toLowerCase().includes(avail.toLowerCase())
        )
      }else{
        result = services.filter((service)=>
          service.price <= parseInt(price)
        )            
      }

    }else if(avail){
      result = services.filter((service)=>
        service.availability.toLowerCase().includes(avail.toLowerCase())
      )
    }

    setServices(result);
  }


    //search
    
    function filterData(services,searchKey){
        var result = services.filter((service)=>
        service.name.toLowerCase().includes(searchKey.toLowerCase())
        )
        setServices(result);
    }
   function handleSearchArea(e){
        const searchKey= e.currentTarget.value;

        axios.get("http://localhost:8080/services/getService").then((res)=>{
          filterData(res.data,searchKey);
         })
    }





    //report 
    function generatePDF(services) {

        const doc = new jsPDF();
      
        const tableColumn = ["ID", "Service Name","Category", "Sub Services", "Price", "Availability"];
        const tableRows = [];
      
        services.forEach((service, index) => {
          const serviceData = [
            index + 1,
            service.name,
            service.category,
            service.subServices,
            service.price,
            service.availability
          ];
          tableRows.push(serviceData);
        });
      
        doc.autoTable(tableColumn, tableRows, { startY: 20 });
        doc.text("All Services Details", 14, 15);
        doc.save("all-Services Details.pdf");
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
   
<div>
  


<Header/>
    <div className="col-lg-9-mt-2 mb-2 p-3 pt-4 text-white">
                <h1 style={{ textAlign: "left" ,paddingLeft:"90px" }}>Service Dashboard</h1>
            </div>
            <div style={{textAlign:"right",paddingRight:"100px",paddingBottom:"20px" }}>
  <button className="btn btn-success btn-lg float-right"><a href="/addService" style={{textDecoration:'none',color:"white"}}>+ Add New Service</a></button>
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



            
       
        {/*filtering search results----------------------------------------------------------------------*/}
      
        <div className="filter-container">
          <form onSubmit={handleFilterSubmit} className="filter-form">
            <div>
              <label htmlFor="category">Category:</label>
              <select id="category" value={categoryFilter} onChange={handleCategoryFilter}>
                <option value="">All</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="price">Price Range:</label>
              <select id="price" value={priceFilter} onChange={handlePriceFilter}>
                <option value="">All</option>
                <option value="1000">1000 or Below</option>
                <option value="5000">5000 or Below</option>
                <option value="10000">10000 or Below</option>
              </select>
            </div>

            <div>
              <label htmlFor="availability">Availability:</label>
              <select id="availability" value={availabilityFilter} onChange={handleAvailabilityFilter}>
                <option value="">All</option>
                <option value="Yes">Available</option>
                <option value="No">Not Available</option>
              </select>
            </div>

            <button type="submit" className="filter-btn">Apply Filters</button>
          </form>

          <div>
            {filteredServices.map((service) => (
              <div key={service.id}>
                <h3>{service.name}</h3>
                <p>Category: {service.category}</p>
                <p>Price: {service.price}</p>
                <p>Availability: {service.availability ? "Available" : "Not Available"}</p>
              </div>
            ))}
          </div>
        </div>


       {/* --------------------------------------------------------------------------------------- */}

   
                
        <div className="table-responsive">
        <table className="table text-white">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Sub Services</th>
              <th scope="col">Price: Rs. </th>
              <th scope="col">Availability</th>

            </tr>
          </thead>
          <tbody>
      {services.map((service, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>
            <a href={`/getService/${service._id}`} style={{ textDecoration: 'none' }}>
              {service.name}
            </a>
          </td>
          <td>{service.category}</td>
          <td>{service.subServices}</td>
          <td>{service.price}</td>
        
          <td>{service.availability==='Yes'? "Yes" : "No"}</td>
          
          
          <td>
          <div className="btn-group" role="group">
        
              <a className="btn btn-warning" href={`/updateService/${service._id}`}>
                <i className="fas fa-edit"></i>&nbsp; Update Details
              </a>
              &nbsp;
              &nbsp;
              <a className="btn btn-danger" href={`/deleteService/${service._id}`}>
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
          className="btn btn-success btn-lg"
          style={{ marginBottom: "10px" }}
          onClick={() => generatePDF(services)}
        >
        <a style={{ textDecoration: "none", color: "white" }}>Monthly Services Report</a>
        </button>
        
        <br />
        <button className="btn btn-danger btn-lg">
          <a href="/getService" style={{ textDecoration: "none", color: "white" }}>Monthly End Reset</a>
        </button>
        </div>

          </div>
          </div>
)
 }

 