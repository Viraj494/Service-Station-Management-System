let service = require("../models/Service");
const mongoose = require("mongoose"); 
const express = require("express");
const router = express.Router();
const Features = require("./Features");


  // Create a new service------------------------------------------

router.route("/addService").post((req,res)=>{
    const name = req.body.name;
    const category = req.body.category;
    const subServices =req.body.subServices;
    const description = req.body.description;
    const price = req.body.price;
    const availability = req.body.availability;
  
  
    const newService = new service({
        name,
        category,
        subServices,
        description,
        price,
        availability,
    }) 
  
    newService.save().then(()=>{
        res.json("Service Added");
    }).catch((err)=>{
        console.log(err);
    })
  })
  
  // Get a one service------------------------------------------
  
  router.route("/getService/:id").get(async (req,res) =>{
    let userId =req.params.id;
  
    const user = await service.findById(userId)
    .then((services)=>{
        res.status(200).send({status : "Service fetched", services})
        
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({statys :"Error with get user",error : err.message});
    })
  })


  // Update a service by ID------------------------------------------------
  
  router.route("/updateService/:id").put(async (req, res) => {
  
    let userId = req.params.id;
    const {name, category, subServices,description, price, availability} = req.body
  
    const updateService = {name, category, subServices,description, price, availability}  //object
  
    try {
        const update = await service.findByIdAndUpdate(userId, updateService);
        res.status(200).send({status: "Service updated", user: update});
    } catch (err) {
        console.log(err);
        res.status(500).send({status: "Error while updating service data"});
    }
  
  
  })
  
  // Delete a service by ID----------------------------------------------------------------------
  
  router.route("/deleteService/:id").delete(async(req,res)=>{
    let userId = req.params.id;
  
    await service.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status: "Service Deleted"})
  
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error while deleting the Service", error: err.message})
    })
  })
  
  
  // Get all services--------------------------------------------------------------------------------------------------
  
  
  router.get("/getService", async (req, res, next) => {
      try {
        const services = await service.find();
        res.json(services);
      } catch (error) {
        next(error);
      }
    }); 


    
  

module.exports = router;