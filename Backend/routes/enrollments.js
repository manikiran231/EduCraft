const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');

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

module.exports = router;
