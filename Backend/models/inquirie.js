const mongoose= require('mongoose');

 const Schema=mongoose.Schema;

 const inquirieSchema = new Schema({
    
    name : {
        type :String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:String,
        required:true
    },
    
    inquiries:{
        type:String,
        required:true
      
    },
    howhelp:{
        type:String,
        required:true
       
        
    }
 })

 const inquiries = mongoose.model("inquiries",inquirieSchema);
 
 module.exports = inquiries;