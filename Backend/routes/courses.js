const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User');
const { authMiddleware, requireRole } = require('../middleware/auth');

// create course (admin)
router.post('/', authMiddleware, requireRole('admin'), async (req, res) => {
  const { title, description } = req.body;
  const c = await Course.create({ title, description });
  res.json(c);
});

// list courses (public)
router.get('/', async (req, res) => {
  const courses = await Course.find().populate('teachers', 'name email').populate('students', 'name email');
  res.json(courses);
});

// assign teacher to course (admin)
router.post('/:id/assign-teacher', authMiddleware, requireRole('admin'), async (req, res) => {
  const { teacherId } = req.body;
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  if (!course.teachers.includes(teacherId)) course.teachers.push(teacherId);
  await course.save();
  res.json(course);
});

// enroll student (admin or student self)
router.post('/:id/enroll', authMiddleware, async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });

  const studentId = req.body.studentId || req.user._id;
  if (!course.students.includes(studentId)) course.students.push(studentId);
  await course.save();

  // also add course to student's enrolledCourses
  const student = await User.findById(studentId);
  if (!student.enrolledCourses.includes(course._id)) student.enrolledCourses.push(course._id);
  await student.save();

  res.json({ message: 'Enrolled', course });
});

// get course by id
router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id).populate('teachers', 'name email');
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.json(course);
});

module.exports = router;
