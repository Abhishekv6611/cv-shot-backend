import jwt from 'jsonwebtoken'


export const jsonwebtoken=async(id)=>{
  const token=await jwt.sign({id},process.env.JWT_SECRET,{
    expiresIn:"30d",
  })
    return token
}