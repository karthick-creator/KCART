 const catchAsyncError = require('../middlewares/catchAsyncError');
const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const errorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwt');

 exports.registerUsers = catchAsyncError(async(req,res,next) => {
    const {name,email,password,avatar} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar
    })

    // const token = user.getJwtToken();

    // res.status(201).json({
    //     success : true,
    //     user,
    //     token
    // })
    sendToken(user, 201, res)
 })

 exports.loginUser = catchAsyncError(async(req,res,next) =>{
     const {email, password} = req.body;

     if(!email || !password){
        return next(new ErrorHandler("Enter email or password", 400));
     }
     const user = await User.findOne({email}).select('+password')

     if(!user){
        return next(new ErrorHandler("Invalid email or password",401));
     }

     if(user.isValidPassword(password)){
        return next(new ErrorHandler("Invalid email or password",401));
     }

     sendToken(user, 201, res)

 })