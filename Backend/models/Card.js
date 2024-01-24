const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cardSchema = new Schema({

    type:{
        type : String,
        required : true
     
    },
    num:{
        type :String,
        required :true
    },
    expireDate:{
        type :String,
        required :true
    },
    cvn:{
        type :String,
        required :true
    }
   
})


const Card = mongoose.model("Cards",cardSchema);
module.exports =Card;  

