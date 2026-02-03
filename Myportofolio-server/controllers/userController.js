export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // 1. Find user and explicitly pull the hidden password
    const user = await User.findOne({ email }).select('+password'); 

    // 2. 🛡️ Guard Clause: If no user is found, exit early
    // This prevents calling .matchPassword on 'null' which crashes the server
    if (!user) {
      res.status(401);
      throw new Error('Invalid email or password');
    }

    // 3. Compare passwords
    const isMatch = await user.matchPassword(password);

    if (isMatch) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    // Pass to your global error handler (helmet/morgan sync)
    next(error);
  }
};