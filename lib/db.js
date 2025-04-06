import mongoose from "mongoose"


const ConnectDB=async()=>{
    try {
        const connect=await mongoose.connect(process.env.MONGODB_URI)
        console.log(connect?`MONGODB connected ${connect.connection.host}`:"not connected");
    } catch (error) {
        console.log(error.message);
    }
}

export default ConnectDB