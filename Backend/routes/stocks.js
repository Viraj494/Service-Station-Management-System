const router = require("express").Router();
let Stock =require("../models/Stock");

//create



router.route("/stadd").post((req,res)=>{

    const item =req.body.item;
    const quantity=req.body.quantity;
    const unitPrice=req.body.unitPrice;
    const expireDate=req.body.expireDate;
    const supplier =req.body.supplier;
    const payment =req.body.payment;
    
    

    const newStock = new Stock({

        item,
        quantity,
        unitPrice,
        expireDate,
        payment,
        supplier
        
       

    })

    newStock.save().then(()=>{
        res.json("Stock Added")
    }).catch((err)=>{
        console.log(err);
    })
  

})   


//read

router.route("/st").get((req,res)=>{

    Stock.find().then((stock)=>{
        res.json(stock)
    }).catch((err)=>{
        console.log(err)
    })
})

//update



router.route("/stupdate/:id").put(async(req,res)=>{
    let userId = req.params.id;

    const{
        item,
        quantity,
        unitPrice,
        expireDate,
        payment,
        supplier} =req.body;

 

    const updateStock ={
        item,
        quantity,
        unitPrice,
        expireDate,
        payment,
        supplier
    }

    const update = await Stock.findByIdAndUpdate(userId,updateStock)
    .then(()=>{
        res.status(200).send({status: "Stock update"})

    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});

    })



    
})

//delete
router.route("/stdelete/:id").delete(async(req,res) =>{
    let userId = req.params.id;

    await Stock.findByIdAndDelete(userId)
    .then(() =>{
        res.status(200).send({status : "Stock deleted"});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status : "Error with delete user", error : err.message});
    })
})

//fetch


router.route("/stget/:id").get(async (req,res) =>{
    let userId =req.params.id;

    const user = await Stock.findById(userId)
    .then((stock)=>{
        res.status(200).send({status : "Stock fetched", stock})
        
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({statys :"Error with get user",error : err.message});
    })
})


module.exports =router;