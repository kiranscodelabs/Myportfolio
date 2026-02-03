import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs'; // Ensure bcrypt is used for manual entry
import User from './models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    // 🛡️ Guard: Ensure MONGO_URI exists
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in .env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("📡 Connected to MongoDB...");

    // 🛡️ Use env variables or defaults
    const adminEmail = 'admin@kiran.dev';
    const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || 'YourStrongPassword123';

    // 1. Check if admin already exists
    const adminExists = await User.findOne({ email: adminEmail });
    if (adminExists) {
      console.log("⚠️  Admin with this email already exists!");
      process.exit();
    }

    // 2. Create the Admin Instance
    // Note: If your User model has a .pre('save') hook for bcrypt, 
    // it will hash the password automatically. 
    const admin = new User({
      name: 'Kiran Admin',
      email: adminEmail,
      password: adminPassword, 
      isAdmin: true 
    });

    await admin.save();
    
    console.log("--------------------------------------");
    console.log("✅ Master Admin Created Successfully!");
    console.log(`📧 Email: ${adminEmail}`);
    console.log("🔑 Password: (Check your .env or script)");
    console.log("--------------------------------------");
    
    process.exit();
  } catch (error) {
    console.error("❌ ERROR CREATING ADMIN:", error.message);
    process.exit(1);
  }
};

createAdmin();