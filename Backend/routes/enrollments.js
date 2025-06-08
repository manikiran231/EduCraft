const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');
const authenticateToken=require('../middlewares/auth')
const Course=require('../models/Course')
// Check enrollment status
router.get('/', async (req, res) => {
  const { userId, courseId } = req.query;
  try {
    const enrollment = await Enrollment.findOne({ userId, courseId });
    res.json(enrollment ? { enrolled: true, enrollment } : { enrolled: false });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Enroll a user
router.post('/', async (req, res) => {
  const { userId, courseId } = req.body;
  try {
    const existing = await Enrollment.findOne({ userId, courseId });
    if (existing) {
      return res.status(400).json({ message: 'Already enrolled' });
    }

    const enrollment = new Enrollment({ userId, courseId });
    await enrollment.save();
    res.status(201).json({ message: 'Enrollment successful', enrollment });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/enrollments/is-enrolled/:courseId
router.get('/is-enrolled/:courseId', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const courseIdNumber = Number(req.params.courseId);

  const course = await Course.findOne({ id: courseIdNumber });
  if (!course) return res.status(404).json({ message: 'Course not found' });

  const enrolled = await Enrollment.findOne({
    userId,
    courseId: course._id,
  });

  res.json({ enrolled: !!enrolled });
});


module.exports = router;
