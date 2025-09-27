const jwt = require("jsonwebtoken");
const User = require("../models/User");

const secret = process.env.JWT_SECRET || "defaultsecret";

/**
 * Middleware to authenticate user via JWT
 */
exports.authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const payload = jwt.verify(token, secret);

    // Fetch user without password
    const user = await User.findById(payload.id).select("-password -passwordHash");
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

/**
 * Middleware to require specific role(s)
 * @param {string|string[]} roles - single role or array of allowed roles
 */
exports.requireRole = (roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  // Normalize roles into array
  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ error: "Forbidden: insufficient role" });
  }

  next();
};
