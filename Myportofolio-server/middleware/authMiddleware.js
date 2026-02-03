import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // 1. Check for Bearer token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; 
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request (minus password)
      req.user = await User.findById(decoded.id).select('-password');

      // 🛡️ Guard: If token is valid but user was deleted from DB
      if (!req.user) {
        res.status(401);
        return next(new Error('User no longer exists'));
      }

      return next(); // Exit successfully
    } catch (error) {
      console.error("JWT_VERIFY_ERROR:", error.message);
      res.status(401);
      return next(new Error('Not authorized, token failed'));
    }
  }

  // 2. If no token was found at all
  if (!token) {
    res.status(401);
    return next(new Error('Not authorized, no token'));
  }
};

// 🛡️ Admin Authorization Middleware
export const admin = (req, res, next) => {
  // This middleware runs AFTER protect, so req.user is already available
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403);
    next(new Error('Not authorized as an admin'));
  }
};