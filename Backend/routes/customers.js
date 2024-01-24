const router = require("express").Router();
let Customer = require("../models/customer");

router.route("/add").post((req, res) => {

    const name = req.body.name;
    const mobileNumber = req.body.mobileNumber;
    const email = req.body.email;
    const address = req.body.address;
    const password = req.body.password;

    if (!name || !mobileNumber || !email || !address || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    else if (password.length < 6) {
        return res
            .status(400)
            .json({ msg: 'Password needs to be at least 6 characters long' });

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
    else {
        const newCustomer = new Customer({
            name,
            mobileNumber,
            email,
            address,
            password,
        })

        //Check if email already exists
        Customer.findOne({ email: email }).then((customer) => {
            if (customer) return res.status(400).json({ msg: 'Email already exists' });

            newCustomer.save().then(() => {

                res.json("Customer Added");

            }).catch((err) => {
                console.log(err);
                res.status(400).json({ msg: "Error: " + err });
            })

        });
    }
})

//Login
router.route("/login").post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password)

    Customer.findOne({ email: email }).then((customer) => {
        if (customer.password === password) {
            res.status(200).send({ status: "Login Success", customer })
        } else {
            res.status(200).send({ status: "Login Failed" })
        }
    }).catch((err) => {
        console.log(err);
        res.status(400).json("Error: " + err);
    })
})


router.route("/get").get((req, res) => {
    let userId = req.params.id;

    Customer.find().then((customer) => {
        res.json(customer)
    }).catch((err) => {
        console.log(err);
        res.status(400).json("Error: " + err);
    });

});

router.route("/update/:id").put((req, res) => {
    let userId = req.params.id;
    const { name, mobileNumber, email, address, password } = req.body;

    const updateCustomer = {
        name,
        mobileNumber,
        email,
        address,
        password,
    }

    Customer.findByIdAndUpdate(req.params.id, updateCustomer).then(() => {
        res.status(200).send({ status: "User updated" })
    }).catch((err) => {
        console.log(err);
        res.status(500).json("Error with updating data" + err);
    });

});

router.route("/delete/:id").delete((req, res) => {
    Customer.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).send({ status: "user deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json("Error with delete user" + err);
        });


});

router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await Customer.findById(userId)
        .then((customer) => {
            res.status(200).send({ status: "User fetched", customer })
        }).catch((err
        ) => {
            console.log(err.message);
            res.status(500).json("Error with get user" + err);
        });

});

router.route("/getCus/:userName").get((req, res) => {

    Customer.find({ email: req.params.userName })
        .then(customer => res.json(customer))
        .catch(err => res.status(400).json('No Data'))
});





module.exports = router;