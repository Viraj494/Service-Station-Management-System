/*
const router = require("express").Router();
const Inquirie = require("../models/inquirie");

/*router.route("/add").post((req, res) => {
  const { name, email, mobileNumber, inquiries, howhelp } = req.body;
 
  if (!name || !mobileNumber || !email || inquiries || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
}



//Check if mobile number is valid using regex
else if (!/^[0-9]{10}$/.test(mobileNumber)) {
    return res
        .status(400)
        .json({ msg: 'Mobile Number is not valid' });
}

else if (mobileNumber.length < 10) {
    return res
        .status(400)
        .json({ msg: 'Mobile Number needs to be at least 10 characters long' });
}

//Check if email is valid using regex
else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res
        .status(400)
        .json({ msg: 'Email is not valid' });
}
else{ 
const newInquirie = new inquiries({
    name,
    mobileNumber,
    email,
    inquiries,
    password,
})

//Check if email already exists
Customer.findOne({ email: email }).then((inquirie) => {
    if (inquirie) return res.status(400).json({ msg: 'Email already exists' });

    newInquirie.save().then(()=>{

        res.json("inquirie Added");

    }).catch((err)=>{
        console.log(err);
        res.status(400).json({msg: "Error: " + err});
    })
    
});
}
})
  
  // newInquirie
  //   .save()
  //   .then(() => {
  //     res.json("Added your inquiry");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(400).json("Error: " + err);
  //   });


router.route("/inquiries").post((req,res)=>{

  const name =req.body.name;
  const email=req.body.fullname;
  const mobileNumber=req.body.nic;
  const inquiries=req.body.address;
  const howhelp =req.body.gender;
 
  

  const newInquirie = new Inquirie({

    name,
    email,
    mobileNumber,
    inquiries,
    howhelp,

  })

  newInquirie.save().then(()=>{
      res.json("Inquirie Added")
  }).catch((err)=>{
      console.log(err);
  })


})
router.route("/").get((req, res) => {
  Inquirie.find()
    .then((inquiries) => {
      res.json(inquiries);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error: " + err);
    });
});

router.route("/update/:id").put((req, res) => {
  const { name, email, mobileNumber, inquiries, howhelp } = req.body;
  const updateInquiry = {
    name,
    email,
    mobileNumber,
    inquiries,
    howhelp,
  };
  Inquirie.findByIdAndUpdate(req.params.id, updateInquiry)
    .then(() => {
      res.status(200).send({ status: "updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error: " + err);
    });
});

router.route("/delete/:id").delete((req, res) => {
  Inquirie.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).send({ status: "inquiry deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error: " + err);
    });
});

router.route("/get/:id").get(async(req, res) => {
    let userId =req.params.id;

    const user = await Inquirie.findById(userId)
    .then((inquiry) => {
      res.status(200).send({ status: "Inquiry fetched", inquiry });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error: " + err);
    });
});

module.exports = router;

*/
const router = require("express").Router();
let Inquirie =require("../models/inquirie");

//create



router.route("/inadd").post((req,res)=>{

  

    const name =req.body.name;
    const email=req.body.email;
    const mobileNumber=req.body.mobileNumber;
    const inquiries=req.body.inquiries;
    const howhelp =req.body.howhelp;
    

    const newInquirie = new Inquirie({

      name,
      mobileNumber,
      email,
      inquiries,
      
      howhelp

    })

    newInquirie.save().then(()=>{
        res.json("Inquirie Added")
    }).catch((err)=>{
        console.log(err);
    })
  

})   


//read

router.route("/in").get((req,res)=>{

  Inquirie.find().then((inquiries)=>{
        res.json(inquiries)
    }).catch((err)=>{
        console.log(err)
    })
})

//update
//put method use for get the data and update


router.route("/inupdate/:id").put(async(req,res)=>{
    let userId = req.params.id;

    const{
      name,
      mobileNumber,
      email,
      inquiries,
      
      howhelp} =req.body;

    /* const name =req.body.name;
    const age =Number(req.body.age); 
    const gender =req.body.gender;
    kiyna ekamai uda tiyenne
    */

    const updateInquirie ={
      name,
      mobileNumber,
      email,
      inquiries,
      
      howhelp
    }

    const update = await Inquirie.findByIdAndUpdate(userId,updateInquirie)
    .then(()=>{
        res.status(200).send({status: "Inquirie update"})

    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});

    })



    
})

//delete
router.route("/indelete/:id").delete(async(req,res) =>{
    let userId = req.params.id;

    await Inquirie.findByIdAndDelete(userId)
    .then(() =>{
        res.status(200).send({status : "Inquirie deleted"});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status : "Error with delete user", error : err.message});
    })
})

//fetch


router.route("/inget/:id").get(async (req,res) =>{
    let userId =req.params.id;

    const user = await Inquirie.findById(userId)
    .then((inquirie)=>{
        res.status(200).send({status : "inquirie fetched", inquirie})
        
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({statys :"Error with get user",error : err.message});
    })
})


module.exports =router;
