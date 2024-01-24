const mongoose= require('mongoose');


 const Schema=mongoose.Schema;

 const AdminSchema = new Schema({
    
    name : {
        type :String,
        required:true
    },
    mobileNumber:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
 })

AdminSchema.methods.generateAuthToken = function(){
 
}
 const Admin = mongoose.model("Admin",AdminSchema);
 
 module.exports = Admin;