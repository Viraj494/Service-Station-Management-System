const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stockSchema = new Schema({

    item : {
        type : String,
        required : true
     
    },
    quantity:{
        type :String,
        required :true
    },
    unitPrice:{
        type :Number,
        required :true
    },
    expireDate:{
        type :String,
        required :true
    },
    supplier:{
        type :String,
        required :true
    },
    payment:{
        type :String,
        required :true
    }
   
   
   
})


const Stock = mongoose.model("Stocks",stockSchema);
module.exports =Stock;  

