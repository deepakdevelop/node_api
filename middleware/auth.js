const jwt= require('jsonwebtoken');
const config = require('../config/config');
const User = require("../models/userModel");
const mongoose = require("mongoose");
//const ObjectId = mongoose.Types.ObjectId;


const verifyToken= async(req,res,next)=>{

    const token =req.body.token || req.query.token || req.headers["authorization"];
    //console.log(token);
    if(!token){
        res.status(200).send({success:false, message:"token is required fo authentication"});
    }
    try{
        //console.log(config.secret_jwt);
        const  decode = jwt.verify(token,config.secret_jwt);
        //const decodeData = decode;
        //console.log(decode._id);
        const userData = await User.findOne({_id:decode._id}).lean();
        //console.log('userData========>'+ JSON.stringify(userData));
        req.user = userData._id;
        
    }catch(error){
        res.status(400).send('invalid');
    }
    next();

}

module.exports=verifyToken;