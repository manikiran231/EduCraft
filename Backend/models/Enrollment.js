// models/Enrollment.js
const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // <--- FIXED
  enrolledAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
