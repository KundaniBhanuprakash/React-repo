const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Certificate = require('../models/Certificate');
const Course = require('../models/Course');
const User = require('../models/User');
const { authMiddleware, requireRole } = require('../middleware/auth');

const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`)
});
const upload = multer({ storage });

// admin generates certificate (upload PDF)
router.post('/issue', authMiddleware, requireRole('admin'), upload.single('file'), async (req, res) => {
  const { studentId, courseId } = req.body;
  if (!req.file) return res.status(400).json({ message: 'Certificate file required' });
  const cert = await Certificate.create({
    student: studentId,
    course: courseId,
    issuedBy: req.user._id,
    fileUrl: req.file.filename
  });
  res.json(cert);
});

// student lists their certificates
router.get('/my', authMiddleware, requireRole('student'), async (req, res) => {
  const certs = await Certificate.find({ student: req.user._id }).populate('course', 'title');
  res.json(certs);
});

// download certificate - public link by filename
router.get('/download/:filename', (req, res) => {
  const file = `${UPLOAD_DIR}/${req.params.filename}`;
  res.download(file);
});

module.exports = router;
