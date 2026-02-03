import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';

dotenv.config();

const projects = [
  {
    title: "MERN Shop Engine",
    description: "A full-scale e-commerce platform with Stripe integration and inventory management.",
    tags: ["Redux", "Express", "Stripe", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "SyncBoard",
    description: "Real-time collaborative task manager using Socket.io for instant team updates.",
    tags: ["Socket.io", "React", "Node.js"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "InsightSaaS",
    description: "Business analytics dashboard with automated reporting and RBAC security.",
    tags: ["Chart.js", "JWT", "Tailwind"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Personal Portfolio v1",
    description: "This very site! A production-grade MERN application to showcase my engineering journey.",
    tags: ["MERN", "Vite", "Cloudinary"],
    liveUrl: "#",
    githubUrl: "#"
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // 🟢 1. CLEAR EXISTING DATA: Prevents duplicates
    await Project.deleteMany();
    console.log("🗑️  Old projects cleared...");

    // 🟢 2. INJECT MULTIPLE: Pass the whole array
    await Project.insertMany(projects);
    
    console.log(`✅ Successfully seeded ${projects.length} projects!`);
    process.exit();
  } catch (error) {
    console.error("❌ Seeding Failed:", error);
    process.exit(1);
  }
};

seedData();