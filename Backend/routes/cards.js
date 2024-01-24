const router = require("express").Router();
let Card =require("../models/Card");

//create



router.route("/cdadd").post((req,res)=>{

    const type =req.body.type;
    const num=req.body.num;
    const expireDate=req.body.expireDate;
    const cvn=req.body.cvn;
   
    

    const newCard = new Card({

        type,
        num,
        expireDate,
        cvn

    })

    newCard.save().then(()=>{
        res.json("Card Added")
    }).catch((err)=>{
        console.log(err);
    })
  

})   


//read

router.route("/cd").get((req,res)=>{

    Card.find().then((cards)=>{
        res.json(cards)
    }).catch((err)=>{
        console.log(err)
    })
})

//update



router.route("/cdupdate/:id").put(async(req,res)=>{
    let userId = req.params.id;

    const{
        type,
        num,
        expireDate,
        cvn} =req.body;



    const updateCard ={
        type,
        num,
        expireDate,
        cvn
    }

    const update = await Card.findByIdAndUpdate(userId,updateCard)
    .then(()=>{
        res.status(200).send({status: "Card update"})

    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});

    })



    
})

//delete
router.route("/cddelete/:id").delete(async(req,res) =>{
    let userId = req.params.id;

    await Card.findByIdAndDelete(userId)
    .then(() =>{
        res.status(200).send({status : "Card deleted"});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status : "Error with delete user", error : err.message});
    })
})

//fetch


router.route("/cdget/:id").get(async (req,res) =>{
    let userId =req.params.id;

    const user = await Card.findById(userId)
    .then((card)=>{
        res.status(200).send({status : "Card fetched", card})
        
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({statys :"Error with get user",error : err.message});
    })
})


module.exports =router;