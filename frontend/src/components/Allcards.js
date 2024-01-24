import React, {useState, useEffect} from "react";
import axios from "axios"; 
import { Link } from "react-router-dom";
import Header from "./CustomerHeader";

//report
import jsPDF from "jspdf";
import "jspdf-autotable";



export default function Allcards(){

    const [cards, setCards] = useState([]);

  
    

  

    useEffect(()=>{

        function getCards(){
            axios.get("http://localhost:8070/card/cd").then((res)=>{
               // console.log(res.data);  
               setCards(res.data);
            }).catch((err)=>{
                alert("err.message");
            })
        }
        getCards();
        

    },[])

        //report 
        function generatePDF(cards) {
          const doc = new jsPDF();
        
          // Set background color
          doc.setFillColor("#072b52");
          doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, "F");
        
          const tableColumn = ["ID", "Type", "Number", "Expire Date", "CVV"];
          const tableRows = [];
        
          cards.forEach((card, index) => {
            const cardData = [
                 index + 1,
                 card.type,
                 card.num,
                 card.expireDate,
                 card.cvn,
                
            ];
            tableRows.push(cardData);
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
        
          doc.text("All Cards Details", 14, 45);
        
          doc.save("all-Cards Details.pdf");
        }

    //search

    function filterData(cards,searchKey){
        const result = cards.filter((card)=>
        card.num.includes(searchKey)||
        card.type.includes(searchKey)||
        card.expireDate.includes(searchKey)

        )
        
        setCards(result);
    }

   function handleSearchArea  (e){
        const searchKey= e.currentTarget.value;

        axios.get("http://localhost:8070/card/cd").then((res)=>{
            // console.log(res.data);  
          filterData(res.data,searchKey);
         })
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
      <Header />   
   
<div className="container">
    <div className="col-lg-9-mt-2 mb-2 p-3 pt-4 text-white">
                <h1 style={{ textAlign: "left" ,paddingLeft:"90px" }}>All Payment Methods</h1>
            </div>
            <div style={{textAlign:"right",paddingRight:"100px",paddingBottom:"20px" }}>
  <button className="btn btn-success btn-lg float-right"><a href="/cdadd" style={{textDecoration:'none',color:"white"}}>+ Add New Card</a></button>
</div>

 
<div style={{background:"#04052e"}}>
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
        <th scope="col">Type</th>
        <th scope="col">Number</th>
        <th scope="col">Expire Date</th>
        <th scope="col">CVN</th>
      

        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      {cards.map((card, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>
            <a href={`/cdget/${card._id}`} style={{ textDecoration: 'none' }}>
              {card.type}
            </a>
          </td>
          <td>{card.num}</td>
          <td>{card.expireDate}</td>
          <td>{card.cvn}</td>
          
          <td>
            <div className="btn-group" role="group">
              
              <a className="btn btn-warning" href={`/cdupdate/${card._id}`}>
                <i className="fas fa-edit"></i>&nbsp; Update Card
              </a>
              &nbsp;
              &nbsp;
              <a className="btn btn-danger" href={`/cddelete/${card._id}`}>
                <i className="fas fa-trash-alt"></i>&nbsp; Delete
              </a> &nbsp; &nbsp;

            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

<div style={{ textAlign: "center", padding: "10px" }}>


<button
    className="btn btn-success btn-lg"
    style={{ marginBottom: "10px" }}
    onClick={() => generatePDF(cards)}
  >
    <a style={{ textDecoration: "none", color: "white" }}>Cards Report</a>
  </button>


</div>

            
                
    </div>


    </div>
    </div>
)
 }

