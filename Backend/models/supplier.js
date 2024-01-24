const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supplierSchema = new Schema({

    name : {
        type: String,
        required: true
    },
    suppId : {
        type: String,
        required: true
    },
    mobile : {
        type: String,
        required: true
    },
    product : {
        type: String,
        required: true
    },
    company : {
        type: String,
        required: true
    }

});

const supplier = mongoose.model("supplier", supplierSchema);

module.exports = supplier;