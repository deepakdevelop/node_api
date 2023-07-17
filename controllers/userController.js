const User = require("../models/userModel");

const bcryptjs = require("bcryptjs");
const config = require('../config/config');
const jwt = require('jsonwebtoken');

const passwordHash = async(password) => {
    try{
        const passwordH = await bcryptjs.hash(password,10);
        return passwordH;
    }catch(e){
       // res.status(400).send(e.message);
    }
}

const userRegister = async(req,response) => {
    try{
        const secure_password = await passwordHash(req.body.password);
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:secure_password,
            address:req.body.address,
            image:req.file.filename,
            type:req.body.type
        });
        console.log(user);
        const checkUser = User.find({email:req.body.email});
        // if(checkUser){
        //     console.log('checkUser true');
        //     response.status(200).send({success:false,message:'already exist'});
        // }else{
            console.log('checkUser false');
            const userData = await user.save();
            console.log('userData',userData);
            response.status(200).send({success:true,data:userData});
        //}
    }catch(e){
        response.status(400).send(e.message);
    }
}

const createtoken=async(_id)=>{
    try{
       const token= await jwt.sign({_id},config.secret_jwt);
       return token;
    }catch(e){
        response.status(400).send(e.message);
    }
}
//Login Method
const userLogin= async(req,res)=>{
    try{
       
       const  email= req.body.email;
       const password=req.body.password;

       const user= await User.findOne({email:email});
       if(user){

        const passwordMatch= await bcryptjs.compare(password,user.password);
        if(passwordMatch){
            const token= await createtoken(user._id);
            const userResult={
                _id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                password:user.password,
                address:user.address,
                type:user.type,
                image:user.image,
                token:token,

            }
            const response={
                success:true,
                message:'user details',
                data:userResult,
            }
            res.status(200).send(response);
        }else{
            res.status(200).send({message:'details are incorrect'});
        }

       }else{
        res.status(400).send({message:'invalid credentoials'});
       }

    }catch(error){

        res.status(500).send(error.message);

    }
}

const userProfile = async(req,res) => {
      try{
            const _id = req.user;
            //res.send(_id);
            const user = await User.findOne(_id);
            //console.log('getUserData=>', user);
            if(user){
                const userResult={
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    phone:user.phone,
                    password:user.password,
                    address:user.address,
                    type:user.type,
                    image:user.image
            
                    }
                    const response={
                        success:true,
                        message:'user details',
                        data:userResult,
                    }
                    res.status(200).send(response);
            }else{
                const response={
                    success:false,
                    message:'user details not found',
                    data:'',
                }
                res.status(200).send(response);
            }
           

      }catch(e){
        res.status(500).send(e.message);
      }
}

module.exports ={
    userRegister,
    userLogin,
    userProfile
}
