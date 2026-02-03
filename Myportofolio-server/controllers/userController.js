import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // 1. Find user and explicitly select password (which is hidden by default in your schema)
    const user = await User.findOne({ email }).select('+password');

    // 2. Check if user exists
    if (!user) {
      res.status(401);
      return next(new Error('Invalid email or password'));
    }

    // 3. Compare passwords using the matchPassword method in your User model
    const isMatch = await user.matchPassword(password);

    if (isMatch) {
      // 4. Generate Token (Integrated directly since utils is missing)
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token,
      });
    } else {
      res.status(401);
      return next(new Error('Invalid email or password'));
    }
  } catch (error) {
    // This catches issues like JWT_SECRET missing or DB connection drops
    next(error);
  }
};