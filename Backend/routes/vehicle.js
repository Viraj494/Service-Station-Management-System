const router = require("express").Router();
let vehicle = require("../models/vehicle");

router.route("/addvehicle").post((req,res)=>{

    const regNo = req.body.regNo
    const make = req.body.make
    const model = req.body.model
    const engC = req.body.engC
    const mileage = req.body.mileage
    const fuel = req.body.fuel

    const newvehi = new vehicle({
        regNo,
        make,
        model,
        engC,
        mileage,
        fuel
    })

    newvehi.save().then(()=>{
        res.json("Vehicle Added")
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/getvehicle").get((req,res)=>{

    vehicle.find().then((vehicles)=>{
        res.json(vehicles)
    }).catch((err)=>{
        console.log(err)
    })

})

router.route("/updatevehicle/:id").put(async(req,res)=>{

    let vehiID = req.params.id;
    const {regNo,make,model,engC,mileage,fuel} = req.body;

    const updatevehi = {
        regNo,
        make,
        model,
        engC,
        mileage,
        fuel
    }

    const update = await vehicle.findByIdAndUpdate(vehiID, updatevehi).then(()=>{
        res.status(200).send({status: "Vehicle updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating the data", error: err.message});
    })
    
})

router.route("/deletevehicle/:id").delete(async(req,res)=>{
    let vehiID = req.params.id;

    await vehicle.findByIdAndDelete(vehiID).then(()=>{
        res.status(200).send({status: "Vehicle deleted"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error while deleting the status",  error: err.message});
    })
})

router.route("/getvehicle/:id").get(async(req,res)=>{
    let vehiID = req.params.id;
    const cust = await vehicle.findById(vehiID).then((vehicle)=>{
        res.status(200).send({status: "Vehicle fetched", vehicle})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "error in fetching", error: err.message});
    })
})

module.exports = router;