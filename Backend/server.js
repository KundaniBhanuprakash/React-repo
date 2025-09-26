require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Import your custom modules
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const certificateRoutes = require('./routes/certificates');
const userRoutes = require('./routes/users');
const studentRoutes = require('./routes/student'); // make sure this exists

const app = express();

// ---------------------------
// Middleware
// ---------------------------

// Enable CORS
app.use(cors());

// Parse JSON payloads
app.use(express.json());

// Parse urlencoded payloads (for forms)
app.use(express.urlencoded({ extended: true }));

// ---------------------------
// Upload directory
// ---------------------------
const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// ---------------------------
// Connect Database
// ---------------------------
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/lms_db');

// ---------------------------
// Routes
// ---------------------------
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/users', userRoutes);
app.use('/api/student', studentRoutes);

// Serve uploads
app.use('/uploads', express.static(path.join(__dirname, UPLOAD_DIR)));

// ---------------------------
// Start Server
// ---------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
