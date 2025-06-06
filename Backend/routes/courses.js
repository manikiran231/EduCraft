// routes/courses.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Course = require('../models/Course');
const mongoose = require('mongoose');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}

// Get course by ID


router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let course = null;

    // Try to find by MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      course = await Course.findById(id);
    }

    // If not found and ID is numeric, try finding by numeric custom 'id' field
    if (!course && !isNaN(id)) {
      course = await Course.findOne({ id: parseInt(id, 10) });
    }

    // If still not found, return 404
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


// Get all courses (optional)
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/batch', authenticateToken, async (req, res) => {
  console.log('🔥 /api/courses/batch hit:', req.body);
  const { courseIds } = req.body;
  if (!Array.isArray(courseIds)) {
    return res.status(400).json({ message: 'courseIds must be an array' });
  }

  try {
    const courses = await Course.find({ id: { $in: courseIds } });
    res.json(courses);
  } catch (err) {
    console.error('Error in batch fetch:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
