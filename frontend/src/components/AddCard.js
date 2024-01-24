import React,{useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import Header from "./CustomerHeader";



 function AddCard(){
  
  let [type, setType] = useState("");
  const [num,setNum] = useState("");
  const [expireDate,setExpireDate] = useState("");
  const [cvn,setCvn] = useState("");
  const [invalidInput, setInvalidInput] = useState(false);

  const handleInputChange = (e) => {
    const input = e.target.value;
    const regex = /^[0-9\b]+$/;
    if (input === '' || regex.test(input)) {
      setNum(input);
      if (input.length < 16) {
        setInvalidInput(true);
      } else {
        setInvalidInput(false);
      }
    }
  }


  function sendData(e){
    e.preventDefault();

    const newCard = {

        type,
        num,
        expireDate,
        cvn

    }

    axios.post("http://localhost:8070/card/cdadd",newCard).then(()=>{
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Card Add Successfull',
            showConfirmButton: false,
            timer: 1500
          })
    }).catch((err)=>{
      alert(err)
    })
   
  }

    return(

      <div style={{ 
        backgroundImage: `url(${process.env.PUBLIC_URL + '../background.gif'})`, 
        backgroundSize: 'cover',
        minHeight: '200vh',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        
    }}>
      <Header />

<div className="col-lg-9-mt-2 mb-2 p-3 pt-4 text-white">
                <h1 style={{ textAlign: "left" ,paddingLeft:"90px" }}>Add New Card</h1>
            </div>
            
        <div className="container shadow-lg p-3 mb-5  rounded" style={{background:"#04052e"}}>

<form onSubmit={sendData}>


<div className="mb-3 text-white">
  <label htmlFor="cardType" className="form-label">Card Type</label>
  <div>
    <input type="radio" id="visa" name="cardType" value="Visa" required onChange={(e) => setType(e.target.value)} />
    <label htmlFor="visa"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" alt="Visa" width="50" height="30" /></label>
    &nbsp; &nbsp; &nbsp; &nbsp;
  
    <input type="radio" id="master" name="cardType" value="Master" required onChange={(e) => setType(e.target.value)} />
    <label htmlFor="master"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Mastercard-logo.png/200px-Mastercard-logo.png" alt="Mastercard" width="50" height="30" /></label>
  </div>
</div>




<div class="row g-3">


  <div className="col mb-3 text-white">
        <label htmlFor="cardNumber" className="form-label">Credit Card Number</label>
        <input
          type="text"
          className="form-control"
          id="cardNumber"
          placeholder="Enter Credit Card Number"
          maxLength="16"
          required
          value={num}
          onChange={handleInputChange}
        />
        {invalidInput && <p className="text-danger">Please enter a valid 16-digit number.</p>}
      </div>




</div>
<div class="row g-3">
<div className="col mb-3 text-white">
  <label htmlFor="expiredate" className="form-label">Expire Date</label>
  <input type="date" className="form-control" id="bday" placeholder="Enter Expire Day"
    required onChange={(e)=>{
      setExpireDate(e.target.value);
    }}
  />
</div>

<div className="col mb-3 text-white">
  <label htmlFor="cvv" className="form-label">CVV</label>
  <input type="text" className="form-control" id="cvv" placeholder="Enter CVV"
    inputmode="numeric" pattern="\d{3}" maxlength="3" required
    onChange={(e) => setCvn(e.target.value)} />
</div>
</div>



  <button type="submit" className="btn btn-primary btn-lg">Submit</button>
  

</form>


        </div>
        </div>
    )
}
export default AddCard;