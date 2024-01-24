
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
   
    name: { 
        type: String, 
        required: [true, 'Please enter service name'] },

    category: [{ 
        type: String, 
        required: [true, 'Please select a service category'] }],

    subServices: { 
        type: String, 
        required: true },

    price: { 
        type: Number, 
        required: [true, 'Please enter price'],
        default: 0, },

    description: {
        type: String},

    availability: { 
        type: String, 
        required:  [true, 'Please select availability status'] },
   
    reviews : [
        {
            type: mongoose.Types.ObjectId,
            ref : "Review",
        },
    ],
   

    /*
        photo:{
        type: String,
        required: true,
    },
     featured : {
        type: Boolean,
        default: false,
    }, 
   
   
    
    
    reviews: [
        {
            name:{
                type: String,
                required: true
            },
            rating:{
                type: Number,
                required: true
            },
            comment:{
                type: Number,
                required: true
            }
        }
    ],

    // reviews: [feedbackSchema],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
        required: true,
    },*/

    },
    {
        timestamps: true,
    }  
    );



const service = mongoose.model("service", serviceSchema);

module.exports = service;
















