import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import ConnectDB from './lib/db.js'
import RouterApp from './view/authView.js' 
dotenv.config()
const app=express()

const PORT=process.env.PORT || 5050
app.use(cors())
app.use(express.json())


ConnectDB()
app.use(RouterApp)
app.get('/',(req,res)=>{
  res.json({message :"This is / page"})
})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    
})
