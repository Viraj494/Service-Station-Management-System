import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AddVehicle from "./components/AddVehicle";
import FetchVehicle from "./components/FetchVehicle";
import EditVehicle from "./components/EditVehicle";
import ViewVehicle from "./components/ViewVehicle";

import AddAppointment from "./components/AddAppointment";
import FetchAppointment from "./components/FetchAppointment";
import EditAppointment from "./components/EditAppointment";

import Allcards from './components/Allcards';
import AddCard from './components/AddCard'
import UpdateCard from './components/UpdateCard'
import DeleteCard from './components/DeleteCard'
import Invoice from './components/Invoice'
import Home from "./components/home";

import Inquiries from "./components/inquiries";
import FetchData from "./components/fetchData";
import UpdateInq from "./components/Update";
import DeleteInq from "./components/Delete";

import AddEmployee from './components/AddEmployee';
import AllEmployees from './components/AllEmployees';
import FullDetails from './components/FullDetails';
import UpdateEmployee from './components/UpdateEmployee';
import DeleteEmployee from './components/DeleteEmployee';

import SalaryCal from './components/SalaryCal';

import AllStocks from './components/AllStocks';
import AddStock from './components/AddStock';
import UpdateStock from './components/UpdateStock';
import DeleteStock from './components/DeleteStock';

import AddSupplier from "./components/AddSupplier";
import FetchSupplier from "./components/FetchSupplier";
import EditSupplier from "./components/EditSupplier";

import AddService from './components/AddService';
import AllServices from './components/DisplayServices';
import UpdateService from './components/UpdateServices';
import DeleteService from './components/DeleteService';
import ServiceHome from './components/ServiceHome';

import Register from "./components/Register";
import Login from "./components/Login";
import AllCustomer from "./components/AllCustomer";
import FetchCustomer from "./components/fetchCustomer";
import CheckEmail from "./components/CheckEmail";
import PWrecover from "./components/PWrecover";
import ResetPassword from "./components/AddEmail";
import UpdateCus from "./components/UpdateCustomer";
import DeleteCus from "./components/DeleteCustomer";
import AdminLogin from "./components/AdminLogin";
import Profile from "./components/Profile";

import Footer from "./components/Footer";
import ServiceDetails from "./components/ServiceDetails";

function App() {
  return (
    
    <div className="App">
     
     <Routes>
        <Route path="/getvehicle" element={<FetchVehicle/>}/>
        <Route path="/addvehicle" element={<AddVehicle/>}/>
        <Route path="/updatevehicle/:id" element={<EditVehicle/>}/>
        <Route path="/getvehicle/:id" element={<ViewVehicle/>}/>
        <Route path="/getapp" element={<FetchAppointment/>}/>
        <Route path="/addapp" element={<AddAppointment/>}/>
        <Route path="/updateapp/:id" element={<EditAppointment/>}/>
        <Route path="/cd" element={<Allcards/>}/>
        <Route path="/cdadd" element={<AddCard/>}/>
        <Route path="/cdupdate/:id" element={<UpdateCard/>}/>
        <Route path="/cddelete/:id" element={<DeleteCard/>}/>
        <Route path="/cdinvoice" element={<Invoice/>}/>
        <Route exact path='/homepg' element={<Home/>}/> 
        <Route exact path='/inadd' element={<Inquiries/>}/> 
        <Route exact path='/in' element={<FetchData/>}/>
        <Route exact path='/inupdate/:id' element={<UpdateInq/>}/>
        <Route exact path='/indelete/:id' element={<DeleteInq/>}/>

       <Route path="/emadd" element={<AddEmployee/>}/>
       <Route path="/em" element={<AllEmployees/>}/>
       <Route path="/emget/:id" element={<FullDetails/>}/>
       <Route path="/emupdate/:id" element={<UpdateEmployee/>}/>
       <Route path="/emdelete/:id" element={<DeleteEmployee/>}/>
    
       <Route path="/cal/:id" element={<SalaryCal/>}/>

       <Route path="/st" element={<AllStocks/>}/>
       <Route path="/stadd" element={<AddStock/>}/>
       <Route path="/stupdate/:id" element={<UpdateStock/>}/>
       <Route path="/stdelete/:id" element={<DeleteStock/>}/>

       <Route path="/getSup" element={<FetchSupplier/>}/>
       <Route path="/addSup" element={<AddSupplier/>}/>
       <Route path="/updatesup/:id" element={<EditSupplier/>}/>

       <Route exact path='/add' element={<Register/>}/> 
          <Route exact path='/profile' element={<Profile/>}/> 
          <Route exact path='/get' element={<AllCustomer/>}/>        
          <Route exact path='/login' element={<Login/>}/> 
          <Route exact path='/adminlogin' element={<AdminLogin/>}/>           
          <Route exact path='/home' element={<Home/>}/> 
          <Route exact path='/fecth' element={<FetchCustomer/>}/>
          <Route exact path='/Check' element={<CheckEmail/>}/> 
          <Route exact path='/PWrecover' element={<PWrecover/>}/> 
          <Route exact path='/Rpw' element={<ResetPassword/>}/>
          <Route exact path='/update/:id' element={<UpdateCus/>}/>
          <Route exact path='/delete/:id' element={<DeleteCus/>}/>

          <Route path="/addService" element={<AddService/>} />
          <Route path="/getService" element={<AllServices />} />
          <Route path="/updateService/:id" element={<UpdateService />} />
          <Route path="/deleteService/:id" element={<DeleteService />} />

          <Route path="/" element={<ServiceHome />} />
          <Route path="/ServiceDetails" element={<ServiceDetails />} />
               
     </Routes>
    </div>

  );
}

export default App;