const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:[true,'Email is exist']
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    }
})
const User = new mongoose.model("User",userSchema);
module.exports = User;