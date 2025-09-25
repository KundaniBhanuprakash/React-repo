import express from "express";
import Course from "../models/Course.js";
import Announcement from "../models/Announcement.js";
import Activity from "../models/Activity.js";
import { authMiddleware } from "../middleware/auth.js"; // ensures teacher is logged in


const express = require('express');
const router = express.Router();




// GET all courses for logged-in teacher
router.get("/courses", authMiddleware, async (req, res) => {
  try {
    const courses = await Course.find({ teacher: req.user._id }).populate("students", "name email");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new course
router.post("/courses", authMiddleware, async (req, res) => {
  const { title, description } = req.body;
  try {
    const course = await Course.create({
      title,
      description,
      teacher: req.user._id,
      students: [],
    });
    // Add activity
    await Activity.create({
      message: `Created course: ${title}`,
      teacher: req.user._id,
    });
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new announcement
router.post("/announcements", authMiddleware, async (req, res) => {
  const { text } = req.body;
  try {
    const announcement = await Announcement.create({
      text,
      teacher: req.user._id,
    });

    await Activity.create({
      message: `Posted announcement: ${text}`,
      teacher: req.user._id,
    });

    res.status(201).json({ message: text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET activity feed
router.get("/activity", authMiddleware, async (req, res) => {
  try {
    const activities = await Activity.find({ teacher: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
