import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema({
  text: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("Announcement", AnnouncementSchema);
