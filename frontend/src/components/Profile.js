import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from "./CustomerHeader";
import { reactLocalStorage } from 'reactjs-localstorage';
import 'font-awesome/css/font-awesome.min.css';


function Profile() {

    var tempuserName = reactLocalStorage.getObject('userName');
    const userName = tempuserName[0]

    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [mobileNumber, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [submit, setSubmit] = useState(true);

    async function edit(e) {
        e.preventDefault();
        const userReg = { password, name, address, email, mobileNumber };

        try {
            const response = await axios.put("http://localhost:8070/customer/update/");
            console.log(response);

            Swal.fire({
                title: "Updated!",
                text: response.data.message,
                icon: "success",
                confirmButtonText: "OK",
                type: "success",
            }).then((okay) => {
                if (okay) {
                    window.location.href = "/Profile";
                }
            });

        } catch (err) {
            Swal.fire({
                title: "Error!",
                text: "Updated Not Success",
                icon: "error",
                confirmButtonText: "OK",
                type: "success",
            });
            setTimeout(() => {
                window.location.href = "/Profile";
            }, 3000);
        }
    }

    const valid = () => {
        if ((password !== "") && (name !== "") && (address !== "") && (email !== "") && (mobileNumber !== "")) {
            setSubmit(false)
        } else {
            setSubmit(true)
        }
    }

    const getProfile = async () => {
        try {
            const res = await axios.get("http://localhost:8070" + "/customer/getcus/" + userName);
            setName(res.data[0].name)
            setEmail(res.data[0].email)
            setAddress(res.data[0].address)
            setPhone(res.data[0].mobileNumber)
            setPassword(res.data[0].password)
        } catch (error) {
            console.log(error);
        }
    };


    function remove() {
        axios.delete("http://localhost:8070" + "/customer/delete/" + userName).then(() => {
            Swal.fire({
                title: "Delete!",
                text: "Deleted",
                icon: "success",
                confirmButtonText: "OK",
                type: "success",
            })
            setTimeout(() => {
                window.location.href = "/Login";
            }, 3000);


        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })
    }

    useEffect(() => {
        getProfile()

    }, [])

    useEffect(() => {

        valid()
    }, [password, name, address, email, mobileNumber])

    return (
        <div style={{ 
            backgroundImage: `url(${process.env.PUBLIC_URL + '../background.gif'})`, 
            backgroundSize: 'cover',
            minHeight: '150vh',
            backgroundRepeat: 'no-repeat',
            
        }}>
            <Header />
            {/* <Navbar /> */}
            <br />
            <br />
            <center>
                
                
                <div className='card' style={{ backgroundColor: "", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", width: "50%" }}>

                    <h3 style={{ marginTop: '40px' }}>Customer Profile</h3>

                    <div class="row container-fluid" style={{ marginTop: '7%', marginBottom: '7%' }}>
                        <div style={{ paddingBottom: "50px" }}>
                            <img
                                src="https://t4.ftcdn.net/jpg/01/18/03/35/360_F_118033506_uMrhnrjBWBxVE9sYGTgBht8S5liVnIeY.jpg"
                                class="img"
                                alt="Hollywood Sign on The Hill"
                                style={{ width: "35%" }}
                            />
                        </div>

                        <form style={{ backgroundColor: "white", textAlign: "left", paddingLeft: "0px", boxShadow: "0 0 0px rgba(0, 0, 0, 0)" }}>

                            <div class="row mb-4">
                                <div className="col">
                                    <label>Name</label>
                                    <input className="form-control" id="outlined-basic" label="Name" variant="outlined" style={{ width: "700px", }} onChange={(e) => {
                                        setName(e.target.value);
                                    }} value={name} />
                                </div>
                            </div>
                            <div class="row mb-4">
                                <div className="col">
                                    <label>Email</label>
                                    <input className="form-control" id="outlined-basic" label="Email" variant="outlined" style={{ width: "700px", }} onChange={(e) => {
                                        setEmail(e.target.value);
                                    }} value={email} disabled />
                                </div>
                            </div>
                            <div class="row mb-4">
                                <div className="col">
                                    <label>Password</label>
                                    <input className="form-control" type='password' id="outlined-basic" label="Password" variant="outlined" style={{ width: "700px", }} onChange={(e) => {
                                        setPassword(e.target.value);
                                    }} value={password} />
                                </div>
                            </div>
                            <div class="row mb-4">
                                <div className="col">
                                    <label>Address</label>
                                    <input className="form-control" id="outlined-basic" label="NIC" variant="outlined" style={{ width: "700px", }} onChange={(e) => {
                                        setAddress(e.target.value);
                                    }} value={address} />
                                </div>
                            </div>
                            <div class="row mb-4">
                                <div className="col">
                                    <label>Mobile No</label>
                                    <input className="form-control" id="outlined-basic" label="Phone Number" variant="outlined" style={{ width: "700px", }} onChange={(e) => {
                                        const inputValue = e.target.value;
                                        const sanitizedValue = inputValue.replace(/[^0-9-]/g, '');
                                        const numericValue = sanitizedValue.replace(/^-/, '');
                                        const truncatedValue = numericValue.slice(0, 10);
                                        if (truncatedValue !== '') {
                                            setPhone(truncatedValue);
                                        }
                                    }} value={mobileNumber} />
                                </div>
                            </div>
                            <br />
                            <br />
                        </form>
                    </div>
                </div>
            </center >
            <br />
            <br />
            <br />
            <br />
            {/* <Footer /> */}
        </div >
    )
};

export default Profile
