import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import Swal from "sweetalert2";
import Header from "./CustomerHeader";

const FetchData = () => {
  const [inquiries, setInquiries] = useState(null);

  useEffect(() => {
    function getInquiries() {
      axios
        .get("http://localhost:8070/inquirie/in")
        .then((res) => {
          console.log(res.data);
          setInquiries(res.data);
        })
        .catch((err) => {
          // alert(err.message);
          Swal.fire({
            title: "Error!",
            text: err.response.data.msg,
            icon: 'error',
            confirmButtonText: "OK",
            type: "error"
        });
        });
    }

    getInquiries();
  }, []);

  function print() {
    let x = 100;
    var doc = new jsPDF("p", "pt");
    doc.setTextColor(254, 8, 8);
    doc.text(20, 20, "Report");
    doc.addFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(3, 3, 3);
    doc.text(25, 60, " Report ");
    for (let i = 0; i < inquiries.length; i++) {
      doc.text(
        25,
        x,
        "Name : " +
          " " +
          " " +
          " " +
          " " +
          " " +
          " " +
          inquiries[i].name +
          " " +
          " " +
          " " +
          " " +
          " " +
          " " +
          " " +
          " Mobile Number : " +
          inquiries[i].mobileNumber +
          " " +
          " " +
          " " +
          " " +
          " " +
          " " +
          " " +
          " Inquiries : " +
          inquiries[i].inquiries +
          " " +
          " " +
          " " +
          " " +
          " " +
          " " +
          " " +
          " Howhelp : " +
          inquiries[i].howhelp
      );
      x = x + 20;
    }
    doc.save("Report.pdf");
  }

  //search for inquiries

  function handleSearchArea(e) {
    const searchKey = e.currentTarget.value;
    axios
      .get("http://localhost:8070/inquirie/in")
      .then((res) => {
        const filteredData = res.data.filter(
          (inquirie) =>
            inquirie.name.includes(searchKey) ||
            inquirie.email.includes(searchKey) ||
            inquirie.mobileNumber.includes(searchKey)
        );
        setInquiries(filteredData);
      })
      .catch((err) => {
        alert(err.message);
      });
  }
  // //report
  // function generatePDF(inquiries) {

  //   const doc = new jsPDF();

  //   const tableColumn = ["Customer ID", "Name","Email", "Mobile Number","Inquiry","How Help"];
  //   const tableRows = [];

  //   inquiries.forEach((inquirie, index) => {
  //     const inquirieData = [
  //       index + 1,
  //       inquirie.name,
  //       inquirie.email,
  //       inquirie.mobileNum,
  //       inquirie.inquirie,
  //       inquirie.howHelp
  //     ];
  //     tableRows.push(inquirieData);
  //   });

  //   doc.autoTable({columns: tableColumn, body: tableRows, startY: 20 });
  //   doc.text("All Inquiries Details", 14, 15);
  //   doc.save("All Inquiries Details.pdf");
  // }

  return (
    <div style={{ 
      backgroundImage: `url(${process.env.PUBLIC_URL + '../background.gif'})`, 
      backgroundSize: 'cover',
      minHeight: '100vh',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      
  }}>
    <Header />
    <div className="col-lg-9-mt-2 mb-2 p-3 pt-4 text-white">
      <h1 style={{ textAlign: "left" ,paddingLeft:"60px" }}>All inquiries</h1>
      &nbsp; &nbsp; &nbsp; &nbsp;
      <input
        className="form control"
        type="search"
        placeholder="Search"
        name="searchQuery"
        onChange={handleSearchArea}
      />
      &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; 
    
      <Link to='/inadd' className="btn btn-success btn-block">New Inquiry</Link> &nbsp;
      <button
          type="submit"
          className="btn btn-primary btn-block"
          style={{ width: "200px" }}
          onClick={print}
        >
          {" "}
          Report
        </button>
      <div className="container shadow-lg p-3  mt-5 text-white  rounded" style={{background:"#04052e"}}>
      <table className="table text-white">
        <thead>
          <tr>
            <th scope="col">Customer ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile number</th>
            <th scope="col">Inquiries</th>
            <th scope="col">Howhelp</th>
          </tr>
        </thead>
        <tbody>
          {inquiries &&
            inquiries.map((inquirie) => (
              <tr key={inquirie._id}>
                <th scope="row">{inquirie._id}</th>
                <td>{inquirie.name}</td>
                <td>{inquirie.email}</td>
                <td>{inquirie.mobileNumber}</td>
                <td>{inquirie.inquiries}</td>
                <td>{inquirie.howhelp}</td>

                <div className="btn-group" role="group">
                  <a
                    className="btn btn-warning"
                    href={`/inupdate/${inquirie._id}`}
                  >
                    <i className="fas fa-edit"></i>
                    Edit
                  </a>
                  &nbsp; &nbsp;
                  <a
                    className="btn btn-danger"
                    href={`/indelete/${inquirie._id}`}
                  >
                    <i className="fas fa-trash-alt"></i>&nbsp; Delete
                  </a>
                </div>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
     </div>
     </div>
  );
};

export default FetchData;
