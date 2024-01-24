const router =require("express").Router();
let Admin=require("../models/Admin.js");

router.route("/add").post((req,res)=>{
   console.log("hello world")
    const name=req.body.name;
    const mobileNumber=req.body.mobileNumber;
    const email=req.body.email;
    const address=req.body.address;
    const password=req.body.password;

    if (!name || !mobileNumber || !email || !address || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    else if (password.length < 6) {
        return res
          .status(400)
          .json({ msg: 'Password needs to be at least 6 characters long' });    
    
      }//oyta hoda ekk select krgnn athnin

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
    const newAdmin = new Admin({
        name,
        mobileNumber,
        email,
        address,
        password,
    })

    //Check if email already exists
    Admin.findOne({ email: email }).then((Admin) => {
        if (Admin) return res.status(400).json({ msg: 'Email already exists' });

        newAdmin.save().then(()=>{

            res.json("Admin Added");
    
        }).catch((err)=>{
            console.log(err);
            res.status(400).json({msg: "Error: " + err});
        })
        
    });
    }
})

//Login
router.route("/login").post((req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    console.log(email,password)

    Admin.findOne({email:email}).then((Admin)=>{
        if(Admin.password===password){
            res.status(200).send({status:"Login Success",Admin})
        }else{
            res.status(200).send({status:"Login Failed"})
        }
    }).catch((err)=>{
        console.log(err);
        res.status(400).json("Error: " + err);
    })
})


module.exports = router;