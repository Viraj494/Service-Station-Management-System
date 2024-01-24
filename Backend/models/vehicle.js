const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vehicleschema = new Schema({

    regNo : {
        type: String,
        required: true
    },
    make : {
        type: String,
        required: true
    },
    model : {
        type: String,
        required: true
    },
    engC : {
        type: String,
        required: true
    },
    mileage : {
        type: String,
        required: true
    },
    fuel : {
        type: String,
        required: true
    }

});

const vehicle = mongoose.model("vehicle", vehicleschema);

module.exports = vehicle;