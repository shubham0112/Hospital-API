
const User=require('../models/User')
const {StatusCodes}=require('http-status-codes');
const {BadRequestError,UnauthenticatedError}=require('../errors') //by default we will get index.js

const register=async(req,res)=>{
    //since we are using mongoose midlleware so password will get hashed when we reach here
    const user=await User.create({...req.body});
    const token=user.createJWT(); //our custom method
    
    res.status(StatusCodes.CREATED).json({
        user:{name:user.name},
        token,
    });
}
const login=async(req,res)=>{
    const {email,password}=req.body;

    if(!email || !password){
        throw new BadRequestError('Please provide email and password');
    }
    const user=await User.findOne({email});
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials');
    }

    //compare passsword
    const isPasswordCorrect=await user.comparePassword(password);  //our custom method
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Credentials');
    }

    const token=user.createJWT();
    
    res.status(StatusCodes.OK).json({
        user:{name:user.name},
        token,
    });
}

module.exports={
    register,
    login,
}

