import express from 'express';
import { loginUser } from '../controllers/authController.js';

const router = express.Router();

// @desc    Auth user & get token
// @route   POST /api/auth/login
// ✅ SENIOR TIP: Keep the router clean. Just point it to the controller.
router.post('/login', loginUser);

export default router;