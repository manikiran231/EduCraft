const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  percentage: Number,
  lastAccessed: Date
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  resetPasscode: String,
  otpExpiry: Date,
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  progress: [progressSchema]
});

module.exports = mongoose.model('User', userSchema);
  