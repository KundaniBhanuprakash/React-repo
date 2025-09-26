const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  profilePic: String,
  learningHours: { type: Number, default: 0 },
  trainings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Training" }],
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }],
  badges: [{ type: mongoose.Schema.Types.ObjectId, ref: "Badge" }],
});

module.exports = mongoose.model("Student", studentSchema);
