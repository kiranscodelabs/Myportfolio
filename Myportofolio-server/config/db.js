import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Attempting to connect using the URI from our .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    // Success message with the host name (Production standard)
    console.log(`📡 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If connection fails, log the error and kill the process
    console.error(`❌ Database Connection Error: ${error.message}`);
    process.exit(1); // 1 means exit with failure
  }
};

export default connectDB;