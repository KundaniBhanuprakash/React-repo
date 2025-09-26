const express = require("express");
const Student = require("../models/Student");
const Training = require("../models/Training");
const Quiz = require("../models/Quiz");
const Badge = require("../models/Badge");

const router = express.Router();

/**
 * @route   POST /api/student/create
 * @desc    Create a student profile if it doesn't exist
 */
router.post("/create", async (req, res) => {
  try {
    const { userId, name, email, profilePic, phone } = req.body;

    if (!userId) return res.status(400).json({ error: "userId is required" });

    // Check if student already exists
    let student = await Student.findOne({ user: userId })
      .populate("trainings")
      .populate("quizzes")
      .populate("badges");

    if (student) return res.status(200).json(student);

    // Create new student document
    student = new Student({
      user: userId,
      name: name || "New Student",
      email,
      profilePic: profilePic || "",
      phone: phone || "",
      learningHours: 0,
      badges: [],
      trainings: [],
      quizzes: [],
    });

    await student.save();

    // Populate references
    student = await Student.findById(student._id)
      .populate("trainings")
      .populate("quizzes")
      .populate("badges");

    res.status(201).json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   GET /api/student/:id
 * @desc    Get student profile with trainings, quizzes, and badges
 */
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate("trainings")
      .populate("quizzes")
      .populate("badges");

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   PUT /api/student/:id
 * @desc    Update student profile
 */
router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("trainings")
      .populate("quizzes")
      .populate("badges");

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   POST /api/student/:id/trainings/:trainingId
 * @desc    Assign training to student
 */
router.post("/:id/trainings/:trainingId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    const training = await Training.findById(req.params.trainingId);

    if (!student || !training)
      return res.status(404).json({ message: "Student or Training not found" });

    if (!student.trainings.includes(training._id)) {
      student.trainings.push(training._id);
    }
    if (!training.assignedTo.includes(student._id)) {
      training.assignedTo.push(student._id);
    }

    await student.save();
    await training.save();

    const updatedStudent = await Student.findById(student._id)
      .populate("trainings")
      .populate("quizzes")
      .populate("badges");

    res.json({ message: "Training assigned", student: updatedStudent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   POST /api/student/:id/quizzes/:quizId
 * @desc    Assign quiz to student
 */
router.post("/:id/quizzes/:quizId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    const quiz = await Quiz.findById(req.params.quizId);

    if (!student || !quiz)
      return res.status(404).json({ message: "Student or Quiz not found" });

    if (!student.quizzes.includes(quiz._id)) {
      student.quizzes.push(quiz._id);
    }
    if (!quiz.assignedTo.includes(student._id)) {
      quiz.assignedTo.push(student._id);
    }

    await student.save();
    await quiz.save();

    const updatedStudent = await Student.findById(student._id)
      .populate("trainings")
      .populate("quizzes")
      .populate("badges");

    res.json({ message: "Quiz assigned", student: updatedStudent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   POST /api/student/:id/badges/:badgeId
 * @desc    Award badge to student
 */
router.post("/:id/badges/:badgeId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    const badge = await Badge.findById(req.params.badgeId);

    if (!student || !badge)
      return res.status(404).json({ message: "Student or Badge not found" });

    if (!student.badges.includes(badge._id)) {
      student.badges.push(badge._id);
    }
    if (!badge.awardedTo.includes(student._id)) {
      badge.awardedTo.push(student._id);
    }

    await student.save();
    await badge.save();

    const updatedStudent = await Student.findById(student._id)
      .populate("trainings")
      .populate("quizzes")
      .populate("badges");

    res.json({ message: "Badge awarded", student: updatedStudent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
