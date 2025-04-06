import mongoose, { Schema } from "mongoose";

const UserSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    resetPasswordToken:String,
    resetPasswordExpireAt:Date,
    verificationToken:String,
    verificationTokenExpireAt:Date,
})

const Users=mongoose.model("Users",UserSchema)
export default Users