import { jsonwebtoken } from "../lib/jsontoken.js"
import { ForgetPass, sendResetPasswordEmail } from "../lib/nodemailer.js"
import Users from "../model/user.model.js"
import crypto from 'crypto'
import bcrypt from 'bcryptjs'

export const Signin=async(req,res)=>{
  const {email,password}=req.body
  try {
    
    if(!email || !password ){
      return res.status(400).json({success:false,message:"required all fields"})
    }
    const existedUser=await Users.findOne({email})
    if(!existedUser){
      return res.status(400).json({success:false,message:"user not existed"})
    }
   const isMatch=await bcrypt.compare(password,existedUser.password)
   if(!isMatch){
    return res.status(400).json({success:false,message:"Password is not matched"})
   }
  
    const token=await jsonwebtoken(existedUser._id)
    return res.status(200).json({
      success:true,
      message:"user existed",
      existedUser,
      token,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({success:false,message:"Internal server error"})
    
  }
}

export const Signup=async(req,res)=>{

  const{email,password,username}=req.body
  try {
    if(!email || !password || !username){
      return res.status(400).json({success:false,message:"required all fields"})
    }
  
    const existedUser=await Users.findOne({email})
    if(existedUser){
      return res.status(400).json({success:false,message:"User already existed"})
    }

    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser=await Users.create({
      username,
      email,
      password:hashedPassword
    })
    const token=await jsonwebtoken(newUser._id)
 
    return res.status(200).json({success:true,message:"User added successfully",newUser,token})

  } catch (error) {
    console.log(error);
    return res.status(500).json({success:false,message:"Internal server error"})
  }
}

export  const ForgetPassword=async(req,res)=>{
  const {email}=req.body
  try {
    if(!email){
      return res.status(400).json({success:false,message:"required email"})
    }

    const existedUser=await Users.findOne({email})
    if(!existedUser){
       return res.status(404).json({success:false,message:"User not found"})
    }
    const resetPasswordToken=crypto.randomBytes(32).toString("hex")
    const resetPasswordExpireAt=Date.now()+1*60*60*1000
    existedUser.resetPasswordToken=resetPasswordToken
    existedUser.resetPasswordExpireAt=resetPasswordExpireAt

    await existedUser.save()
    const resetUrl=`${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`
    await ForgetPass(existedUser.email,resetUrl)
    return res.status(200).json({success:true,message:"Email successfully sended"})
  } catch (error) {
    console.log(error);
    return res.status(500).json({success:false,message:"Internal server error"})    
  }
}

export const ResetPassword=async(req,res)=>{
   const {token}=req.params
   const {password}=req.body
   try {
    const user=await Users.findOne({
      resetPasswordToken:token,
      resetPasswordExpireAt:{$gt:Date.now()}
    })
    if(!user){
      return res.status(400).json({success:false,message:"Invalid or expired token"})
    }
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
    user.password=hashedPassword
    user.resetPasswordToken=undefined
    user.resetPasswordExpireAt=undefined
    await user.save()
    await sendResetPasswordEmail(user.email)
    return res.status(200).json({success:true,message:"Password reset successfully"})
   } catch (error) {
    console.log("Error in ResetPassword",error);
    return res.status(500).json({success:false,message:"Internal server error"})
   }
}

