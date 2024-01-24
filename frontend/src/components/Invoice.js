import React, {useState, useEffect} from "react";
import axios from "axios"; 
import { Link } from "react-router-dom";
import Header from "./CustomerHeader";



//report
import jsPDF from "jspdf";
import "jspdf-autotable";


export default function Allcards(){

    const name = "Maneesha Palihawadhana"
    const address="174/2, Kothalawela,Kaduwela"
    const contactNum ="071 5478541"
    const labour=6000;
    const material=4500;
    const reparing=7500;
    const subtotal=34500;
    const tax=1500;
    const total=(subtotal+tax);


    

        //bill
        const generatePDF = () => {
            const doc = new jsPDF();
          
            // Add background color
            doc.setFillColor(176, 224, 230); // Light blue color
            doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');
            
            // Logo
            doc.addImage(process.env.PUBLIC_URL + '../slogo.png', "PNG", 10, 10, 50, 15);
          
            // Title
            doc.setFontSize(18);
            doc.setFont("helvetica", "bold");
            doc.text("UniCorn Services Invoice", 80, 25);
          
            // Bill to
            doc.setFontSize(14);
            doc.setFont("helvetica", "normal");
            doc.text("Bill to", 10, 50);
          
            doc.line(10, 53, 100, 53); // horizontal line
          
            doc.setFont("helvetica", "bold");
            doc.text(name, 10, 60);
            doc.setFont("helvetica", "normal");
            doc.text(address, 10, 68);
            doc.text(contactNum, 10, 76);
          
            // Services details
            doc.setFont("helvetica", "bold");
            doc.text("Services Details", 10, 95);
          
            doc.line(10, 98, 100, 98); // horizontal line
          
            doc.setFont("helvetica", "normal");
            doc.text(`Labour Cost: ${labour}`, 10, 105);
            doc.text(`Material Cost: ${material}`, 10, 112);
            doc.text(`Repairing Parts: ${reparing}`, 10, 119);
          
            // Total
            doc.setFont("helvetica", "bold");
            doc.text(`Sub Total: ${subtotal}`, 10, 140);
            doc.text(`Tax: ${tax}`, 10, 147);
            doc.text(`Total: ${total}`, 10, 154);
          
            // Save the PDF document
            doc.save("invoice.pdf");
          };
          
          
          
         
        

 return(

<div style={{ 

        backgroundImage: `url(${process.env.PUBLIC_URL + '../background.gif'})`, 
        backgroundSize: 'cover',
        minHeight: '130vh',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        
    }}>  
   <Header />
<div>
    <div className="col-lg-9-mt-2 mb-2 p-3 pt-4 text-white">
                <h1 style={{ textAlign: "left" ,paddingLeft:"90px" }}>Services Invoice</h1>
            </div>


<div className="container shadow-lg p-3 mb-5  rounded" style={{background:"#04052e"}}>
  <div className="text-white">
     <h1>Bill to</h1>   
     <hr></hr>
     <div className="text-white mb-4">
        <h3>Name : {name} </h3>
        <h3>Address : {address} </h3>
        <h3>Contact Number : {contactNum} </h3>
     </div>
     <hr></hr>
     <h1>Services Details</h1>
     <div className="">
        <h3>Labour Cost : {labour} </h3>
        <h3>Material Cost : {material} </h3>
        <h3>Reparing Parts : {reparing} </h3>
     </div>
     <hr></hr>
     <h3 style={{ textAlign: "right" ,paddingLeft:"90px" }}>Sub Total : {subtotal}</h3>
     <h3 style={{ textAlign: "right" ,paddingLeft:"90px" }}>Tax : {tax}</h3>
     <h3 style={{ textAlign: "right" ,paddingLeft:"90px" }}>Total : {total}</h3>
     </div>

<div style={{ textAlign: "center", padding: "10px" }}>

<button className="btn btn-success btn-lg" onClick={generatePDF}>
  Download Bill
</button>

</div>

            
                
    </div>


    </div>
    </div>
)
 }

