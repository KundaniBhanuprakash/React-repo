import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
  message: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Activity", ActivitySchema);
