const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // for password hashing
const express = require('express');
const router = express.Router();
const User = require('../models/User');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher', 'admin'], required: true },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  offerLetterUrl: { type: String }, // for admin uploads
  isActive: { type: Boolean, default: true }, // optional status flag
  profilePicUrl: { type: String }, // optional profile picture
}, { timestamps: true });

// Method to set hashed password
userSchema.methods.setPassword = async function(password) {
  this.passwordHash = await bcrypt.hash(password, 10);
};

// Method to verify password
userSchema.methods.verifyPassword = async function(password) {
  return await bcrypt.compare(password, this.passwordHash);
};

// Optional: Virtual field to return user without sensitive info
userSchema.virtual('safeUser').get(function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    enrolledCourses: this.enrolledCourses,
    offerLetterUrl: this.offerLetterUrl,
    profilePicUrl: this.profilePicUrl,
    isActive: this.isActive,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
});

router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = mongoose.model('User', userSchema);
