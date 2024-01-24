import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from "./CustomerHeader";

export default function UpdateCard(){
    const [card, setCard] = useState({});
    const [loading, setLoading] = useState(true);

    let [type, setType] = useState("");
    const [num,setNum] = useState("");
    const [expireDate,setExpireDate] = useState("");
    const [cvn,setCvn] = useState("");

    const params = useParams();
    const userId = params.id;

    useEffect(() => {
        async function Getid(){
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:8070/card/cdget/${userId}`)
                setCard(res.data.card);
                console.log(res.data);

                setType(res.data.card.type);
                setNum(res.data.card.num);
                setExpireDate(res.data.card.expireDate);
                setCvn(res.data.card.cvn);
               
               
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
        const updatedCard = {
            type,
            num,
            expireDate,
            cvn
        }
        axios.put(`http://localhost:8070/card/cdupdate/${userId}`, updatedCard)
            .then(() => {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Card Update Successfull',
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
      <Header />
             
<div className="col-lg-9-mt-2 mb-2 p-3 pt-4 text-white">
            <h1 style={{ textAlign: "left" ,paddingLeft:"90px" }}>Update Card</h1>
        </div>
        
    <div className="container shadow-lg p-3 mb-5  rounded" style={{background:"#04052e"}}>

            {loading ? (
                <div>Loading...</div>
            ) : (
              <form onSubmit={handleSubmit}>

<div className="mb-3 text-white">
  <label htmlFor="cardType" className="form-label">Card Type</label>
  <div>
    <input type="radio" id="visa" name="cardType" value="visa" required onChange={(e) => setType(e.target.value)} />
    <label htmlFor="visa"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" alt="Visa" width="50" height="30" /></label>
    &nbsp; &nbsp; &nbsp; &nbsp;
    
    <input type="radio" id="master" name="cardType" value="master" required onChange={(e) => setType(e.target.value)} />
    <label htmlFor="master"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Mastercard-logo.png/200px-Mastercard-logo.png" alt="Mastercard" width="50" height="30" /></label>
  </div>
</div>




<div class="row g-3">
  <div className="col mb-3 text-white">
    <label for="cardNumber" className="form-label">Credit Card Number</label>
    <input type="text" className="form-control" id="cardNumber" placeholder="Enter Credit Card Number"
    value={num}
       required 
      onChange={(e) => setNum(e.target.value)} />
  </div>
</div>

<div class="row g-3">
<div className="col mb-3 text-white">
  <label htmlFor="expiredate" className="form-label">Expire Date</label>
  <input type="date" className="form-control" id="bday" placeholder="Enter Expire Day"
  value={expireDate}
    required onChange={(e)=>{
      setExpireDate(e.target.value);
    }}
  />
</div>

<div className="col mb-3 text-white">
  <label htmlFor="cvv" className="form-label">CVV</label>
  <input type="text" className="form-control" id="cvv" placeholder="Enter CVV"
  value={cvn}
    inputmode="numeric" pattern="\d{3}" maxlength="3" required
    onChange={(e) => setCvn(e.target.value)} />
</div>
</div>
                            
                                            <button type="submit" className="btn btn-primary">Update</button>
                            
                                        </form>
            )}
        </div>
        </div>
    );
}
