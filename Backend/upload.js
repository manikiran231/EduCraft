const mongoose = require('mongoose');
const fs = require('fs');
const Course = require('./models/course'); // adjust the path as needed

async function uploadCourses() {
  try {
    await mongoose.connect('mongodb+srv://manikiran:manikiran@cluster-1.sp5n7m5.mongodb.net/root?retryWrites=true&w=majority&appName=Cluster-1');

    const rawData = fs.readFileSync('temp.json', 'utf-8');
    const courses = JSON.parse(rawData);

    // Convert date strings to Date objects
    courses.forEach(course => {
      course.start_date = new Date(course.start_date);
      course.end_date = new Date(course.end_date);
    });

    await Course.insertMany(courses);
    console.log(`${courses.length} courses uploaded successfully!`);
  } catch (err) {
    console.error("Error uploading courses:", err);
  } finally {
    await mongoose.disconnect();
  }
}

uploadCourses();
