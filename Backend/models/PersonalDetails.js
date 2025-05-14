const mongoose = require('mongoose');

const personalDetailsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, unique: true },
  age: Number,
  collegeOrSchool: String,
  passingYear: Number,
  interestedAreas: [String],
  about: String,
  dob: Date,
  resume: String, // file path or URL
  role: { type: String, enum: ['college', 'school'] }, // For conditional resume
  github: String,
  linkedin: String,
  phone: String
}, { timestamps: true });

module.exports = mongoose.model('PersonalDetails', personalDetailsSchema);
