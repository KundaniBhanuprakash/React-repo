const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, default: "yellow" },
  awardedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }]
}, { timestamps: true });

module.exports = mongoose.model("Badge", badgeSchema);
