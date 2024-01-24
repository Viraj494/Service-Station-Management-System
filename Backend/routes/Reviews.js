const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
let service = require("../models/Service");
let review = require("../models/Review");


// Create a new service-------------------------------------------------

router.post("/:serviceId", async (req, res, next) => {

    const serviceId = req.params.serviceId
    const newReview = new review({ ...req.body})

    try {
        const savedReview = await newReview.save();

        //after creating a new review now update the reviews array of the service
        await service.findByIdAndUpdate(serviceId, {
            $push: {reviews: savedReview._id}
        })

        res.status(200).json({success:true, message: 'Review submitted', data:savedReview});
   
    }catch (error) {
        res.status(500).json({success:false, message: 'Failed to submit.Try again'})
       
    }
});

module.exports = router;