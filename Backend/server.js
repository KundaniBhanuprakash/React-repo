require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const fs = require('fs');

const studentRoutes = require("./routes/student");

const app = express();
app.use(express.json());
app.use(cors());


const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// connect db
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/lms_db');

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/certificates', require('./routes/certificates'));
app.use('/api/users', require('./routes/users'));
app.use("/api/student", studentRoutes);

// serve uploads
app.use('/uploads', express.static(path.join(__dirname, process.env.UPLOAD_DIR || 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
