const mongoose =require("mongoose");

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({

    name:{
        type : String,
        required :false
    },

    vehicle:{
        type:String,
        required:false
    },

    service:{
        type:String,
        required:false
    },

    date:{
        type:String,
        required:false
    },

    time:{
        type:String,
        required:false
    }

})

const Appointment = mongoose.model("appointments",appointmentSchema);

module.exports = Appointment;
