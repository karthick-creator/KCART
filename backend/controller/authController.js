 const catchAsyncError = require('../middlewares/catchAsyncError');
const User = require('../models/userModel');
const sendEmail = require('../utils/email');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwt');
const crypto = require('crypto')

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

     if(!user.isValidPassword(password)){
        return next(new ErrorHandler("Invalid email or password",401));
     }

     sendToken(user, 201, res)

 })

 exports.logoutUser = (req,res,next) =>{
   res.cookie('token',null, {
      expires: new Date(Date.now()),
      httpOnly : true 
   })
   .status(200)
   .json(
      {
         success: true,
         message: "logged out"
      }
   )
 }

 exports.forgotPassword = async (req,res,next) => {
   
   const user = await User.findOne({email: req.body.email});

   if(!user){
      return new ErrorHandler('User not found with this email')
   }

   const resetToken = user.getResetToken();
   user.save({validateBeforeSave: false});

   //create reset url
   const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

   const message = `Your password url is as follows \n\n ${resetUrl} \n\n If you have not request this mail, then ignore it`

   try {

      sendEmail({
            email: user.email,
            subject: 'KCART password recovery',
            message
      })

      res.status(200).json({
         success : true,
         message : `Email sent to ${user.email}`
      })

   } catch (error) {
      user.setPasswordToken =undefined;
      user.resetPasswordTokenExpire = undefined;
      user.save({validateBeforeSave: false})
      return new ErrorHandler(error.message,500)
   }
 }

 exports.resetPassword = catchAsyncError(async(req,res,next) =>{
   const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

   const user = await user.findOne({
      resetPasswordToken,
      resetPasswordTokenExpire : {
         $gt : Date.now()
      }
   })
   if(!user){
      return next(new ErrorHandler('Passsword reset token is expired'))
   }

   if(req.body.password !== req.body.confirmPassword){
      return next(new ErrorHandler('Passsword does not match'))
   }

   user.password = req.body.password;
   user.resetPasswordToken = undefined;
   user.resetPasswordTokenExpire = undefined;
   await user.save({validateBeforeSave: false})

   sendToken(user, 201, res)
 })