const mongoose = require('mongoose');

const certSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  issuedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // admin or teacher id
  fileUrl: { type: String, required: true },
  issuedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Certificate', certSchema);
