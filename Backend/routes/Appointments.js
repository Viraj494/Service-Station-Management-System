const router = require("express").Router();
const { response } = require("express");
let appointment = require("../models/appointment");

router.route("/addapp").post((req,res)=>{
    const name = req.body.name;
    const vehicle = req.body.vehicle;
    const service = req.body.service;
    const date = req.body.date;
    const time = req.body.time;

    const newAppointment = new appointment({
        name,
        vehicle,
        service,
        date,
        time
    })

    newAppointment.save().then(()=>{
        res.json("Appointment added successful")
    }).catch((err)=>{
        console.log(err);
    })

})


router.route("/getapp").get((req,res)=>{
    appointment.find().then((appointments)=>{
        res.json(appointments)
    }).catch((err)=>{
        console.log(err);
    })
})


router.route("/updateapp/:id").put(async(req,res)=>{
    let appointmentId = req.params.id;
    const{name,vehicle,service,date,time} = req.body;

    const updateAppointment = {
        name,
        vehicle,
        service,
        date,
        time
    }

    const update = await appointment.findByIdAndUpdate(appointmentId,updateAppointment).then(()=>{
        res.status(200).send({status:"Appointment updated"
    
    })
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data"});
    })  
})


router.route("/deleteapp/:id").delete(async(req,res)=>{
    let appointmentId = req.params.id;
    
    await appointment.findByIdAndDelete(appointmentId).then(()=>{
        res.status(200).send({status:"Appointment cancelled"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with cancel appointment", error:err.message});
    })
})


router.route("/getapp/:id").get(async(req,res)=>{
    let appointmentId = req.params.id;
    await appointment.findById(appointmentId).then((appointment)=>{
        res.status(200).send({status:"Appointment fetched" , appointment})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get appointment", error:err.message});
    })
})

module.exports = router;