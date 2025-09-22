// backend/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Course = require('./models/Course');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({});
  await Course.deleteMany({});

  const pass = await bcrypt.hash('password123', 10);
  const admin = await User.create({ name: 'Admin', email: 'admin@site.com', passwordHash: pass, role: 'admin' });
  const teacher = await User.create({ name: 'Teacher A', email: 'teacher@site.com', passwordHash: pass, role: 'teacher' });
  const student = await User.create({ name: 'Student A', email: 'student@site.com', passwordHash: pass, role: 'student' });

  const course = await Course.create({ title: 'Intro to JS', description: 'Basic JS course', teachers: [teacher._id], students: [student._id] });

  student.enrolledCourses.push(course._id);
  await student.save();

  console.log('Seeded', { admin, teacher, student, course });
  process.exit(0);
}
seed();
