const router = require("express").Router();
let supplier = require("../models/supplier");

router.route("/addsup").post((req,res)=>{

    const name = req.body.name
    const suppId = req.body.suppId
    const mobile = req.body.mobile
    const product = req.body.product
    const company = req.body.company

    const newsup = new supplier({
        name,
        suppId,
        mobile,
        product,
        company
    })

    newsup.save().then(()=>{
        res.json("Supplier Added")
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/getsup").get((req,res)=>{

    supplier.find().then((suppliers)=>{
        res.json(suppliers)
    }).catch((err)=>{
        console.log(err)
    })

})

router.route("/updatesup/:id").put(async(req,res)=>{

    let supId = req.params.id;
    const {name,suppId,mobile,product,company} = req.body;

    const updatesupplier = {
        name,
        suppId,
        mobile,
        product,
        company
    }

    const update = await supplier.findByIdAndUpdate(supId, updatesupplier).then(()=>{
        res.status(200).send({status: "Supplier data updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating the data", error: err.message});
    })
    
})

router.route("/deletesup/:id").delete(async(req,res)=>{
    let supId = req.params.id;

    await supplier.findByIdAndDelete(supId).then(()=>{
        res.status(200).send({status: "Supplier deleted"})
    }).catch((err)=>{supp
        console.log(err.message);
        res.status(500).send({status: "Error while deleting the status",  error: err.message});
    })
})

router.route("/getsup/:id").get(async(req,res)=>{
    let supId = req.params.id;
    const cust = await supplier.findById(supId).then((supplier)=>{
        res.status(200).send({status: "user fetched", supplier})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "error in fetching", error: err.message});
    })
})

module.exports = router;