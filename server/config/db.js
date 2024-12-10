import mongoose from "mongoose";

// MongoDB connection
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('MongoDB connected');
    } catch (err) {
      console.error("MongoDB connection failed", err);
    }
  };

export default connectDB;