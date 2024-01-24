
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({


    name: { 
        type: String, 
        required: true },

    category: [{ 
        type: String, 
        required: true }],

    subServices: { 
        type: String, 
        required: true },

    price: { 
        type: Number, 
        required: true },

    description: {
        type: String},

    availability: { 
        type: String, 
        required: true },

});


const service = mongoose.model("Service", serviceSchema);

module.exports = service;
















