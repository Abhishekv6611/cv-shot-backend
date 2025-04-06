import { jsonwebtoken } from "../lib/jsontoken.js"
import Users from "../model/user.model.js"

export const Signin=async(req,res)=>{
  const {email,password}=req.body
  if(!email || !password ){
    return res.status(400).json({success:false,message:"required all fields"})
  }
  const existedUser=await Users.findOne({email})
  if(existedUser){
      const token=await jsonwebtoken(existedUser._id)
      return res.status(200).json({success:true,message:"user existed",existedUser,token,})
    }
    return res.status(400).json({success:false,message:"user not existed"})
}

export const Signup=async(req,res)=>{

  const{email,password}=req.body

  try {
    if(!email || !password){
      return res.status(400).json({success:false,message:"required all fields"})
    }
  
    const existedUser=await Users.findOne({email})
    if(existedUser){
      return res.status(400).json({success:false,message:"User already existed"})
    }
   
    const newUser=await Users.create({
      email,
      password
    })
    const token=await jsonwebtoken(newUser._id)
 
    return res.status(200).json({success:true,message:"User added successfully",newUser,token})

  } catch (error) {
    console.log(error);
    return res.status(500).json({success:false,message:"Internal server error"})
  }
}