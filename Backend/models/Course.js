const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  description: { 
    type: String, 
    trim: true 
  },
  teachers: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  }],
  students: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  category: { 
    type: String, 
    default: 'General' 
  },
  status: { 
    type: String, 
    enum: ['draft', 'active', 'archived'], 
    default: 'draft' 
  },
  startDate: { type: Date },
  endDate: { type: Date },
  resources: [
    {
      title: String,
      url: String,
      type: { type: String, enum: ['video', 'pdf', 'link'], default: 'link' }
    }
  ],
  announcements: [
    {
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
