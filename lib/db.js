import mongoose from 'mongoose';

let isConnected = false;

const ConnectDB = async () => {
  if (isConnected) {
    console.log("🔁 Using existing MongoDB connection");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default ConnectDB;
