const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Course = require('../models/Course');
const { authMiddleware, requireRole } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`)
});
const upload = multer({ storage });

// admin: list users
router.get('/', authMiddleware, requireRole('admin'), async (req, res) => {
  const users = await User.find().select('-passwordHash');
  res.json(users);
});

// admin: create user
router.post('/', authMiddleware, requireRole('admin'), async (req, res) => {
  const { name, email, password, role } = req.body;
  // reuse auth/register logic - simplified here
  // ... for brevity assume the admin will call /auth/register
  res.status(501).json({ message: 'Use /auth/register or implement admin create' });
});

// admin upload offer letter for a student
router.post('/:id/offer-letter', authMiddleware, requireRole('admin'), upload.single('file'), async (req, res) => {
  const student = await User.findById(req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found' });
  student.offerLetterUrl = req.file.filename;
  await student.save();
  res.json({ message: 'Uploaded', file: req.file.filename });
});

// teacher: get students of their courses
router.get('/my-students', authMiddleware, requireRole('teacher'), async (req, res) => {
  const courses = await Course.find({ teachers: req.user._id }).populate('students', 'name email enrolledCourses');
  // aggregate students
  const studentMap = {};
  courses.forEach(c => {
    c.students.forEach(s => { studentMap[s._id] = s; });
  });
  res.json(Object.values(studentMap));
});

module.exports = router;
