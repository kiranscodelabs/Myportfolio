import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';
import projectRoutes from './routes/projectRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Load env vars
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// 1. GLOBAL MIDDLEWARE
// Content Security Policy (CSP) fix for S3 images in production
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
})); 

// 🛡️ PRODUCTION CORS: Allow both local and production frontend
const allowedOrigins = [
  'http://localhost:5173', 
  'https://myportfolio-kirannc.vercel.app', // Explicitly add this
  process.env.FRONTEND_URL?.replace(/\/$/, "") // Remove trailing slash if exists
].filter(Boolean); // Remove any undefined/null values

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    // Check if origin exists in our allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.log("❌ BLOCKED_ORIGIN:", origin); // Check Render logs to see what's being blocked
      return callback(new Error('CORS_NOT_ALLOWED'), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Added OPTIONS for pre-flight
  credentials: true
}));

app.use(morgan('dev')); // Logging
app.use(express.json()); // Body parser (Standard for JSON data)

// 2. ROUTES
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);

// 3. HEALTH CHECK ROUTE
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'active', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 4. ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    // Hide stack trace in production for security
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
});

// 5. DYNAMIC PORT (Required for Render/Heroku)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});