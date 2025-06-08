const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  id:Number, 
  course_title: String,
  description: String,
  difficulty_rating: Number,
  popularity_score: Number,
  target_audience: String,
  subject_area: String,
  course_duration: Number,
  start_date: Date,
  end_date: Date,
  instructor_name: String,
  video_url: String,
  price:Number,
});

module.exports = mongoose.model('Course', courseSchema);
