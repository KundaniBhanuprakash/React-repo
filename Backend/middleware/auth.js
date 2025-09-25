const jwt = require('jsonwebtoken');
const User = require('../models/User');
const secret = process.env.JWT_SECRET;

/**
 * Middleware to authenticate user via JWT
 */
exports.authMiddleware = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'No token provided' });

  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, secret);
    const user = await User.findById(payload.id).select('-passwordHash');
    if (!user) return res.status(401).json({ message: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

/**
 * Middleware to require specific role(s)
 * @param {string|string[]} role - single role or array of allowed roles
 */
exports.requireRole = (role) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated' });

  if (Array.isArray(role)) {
    if (!role.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
  } else {
    if (req.user.role !== role) return res.status(403).json({ message: 'Forbidden' });
  }

  next();
};
