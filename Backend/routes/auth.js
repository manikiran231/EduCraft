const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// =======================
// Middleware to Verify JWT Token
// =======================
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

// =======================
// Utility Functions
// =======================
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOTPEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP for password reset is: ${otp}. It expires in 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
}

// =======================
// Auth Routes
// =======================
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email: email.toLowerCase(), password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '3d' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// =======================
// Password Reset Routes
// =======================
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const otp = generateOTP();
    user.resetPasscode = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendOTPEmail(email, otp);
    res.json({ message: 'OTP sent to your email' });
  } catch (err) {
    console.error('Forgot-password error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/reset-password', async (req, res) => {
  const { email, passcode, newPassword } = req.body;
  try {
    const user = await User.findOne({
      email: email.toLowerCase(),
      resetPasscode: passcode,
    });

    if (!user) return res.status(400).json({ message: 'Invalid email or passcode' });
    if (user.otpExpiry && user.otpExpiry < new Date()) {
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasscode = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Reset-password error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// =======================
// Get User Profile
// =======================
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const enrollments = await Enrollment.find({ userId: user._id }).populate('courseId');
    const enrolledCourses = enrollments.map(enrollment => enrollment.courseId);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      enrolledCourses,
      progress: user.progress || [],
      joinedAt: user._id.getTimestamp?.() || new Date(user.createdAt),
    });
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// =======================
// Enroll in Course
// =======================
router.post('/enroll/:courseId', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const courseIdNumber = Number(req.params.courseId);

    const course = await Course.findOne({ id: courseIdNumber });
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const alreadyEnrolled = await Enrollment.findOne({ userId, courseId: course._id });
    if (alreadyEnrolled) return res.status(200).json({ message: 'Already enrolled' });

    await Enrollment.create({ userId, courseId: course._id });

    res.status(200).json({ message: 'Enrolled successfully' });
  } catch (err) {
    console.error('Enroll error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// =======================
// Get Enrollments for Authenticated User
// =======================
router.get('/enrollments', authenticateToken, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.user.id }).populate('courseId');
    console.log(enrollments);
    res.json(enrollments);
  } catch (err) {
    console.error('Error fetching enrollments:', err);
    res.status(500).json({ message: 'Server error' });
  }
});



// =======================
// Get Course by ID
// =======================
router.get('/courses/:courseId', authenticateToken, async (req, res) => {
  try {
    const courseId = Number(req.params.courseId);
    const course = await Course.findOne({ id: courseId });
    if (!course) return res.status(404).json({ message: 'Course not found' });

    res.json(course);
  } catch (err) {
    console.error('Error fetching course:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update course progress
router.post('/progress/update', authenticateToken, async (req, res) => {
  const { courseId, percentage } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const progressEntry = user.progress.find(entry =>
      entry.courseId.toString() === courseId
    );

    if (progressEntry) {
      // Update existing entry
      progressEntry.percentage = percentage;
      progressEntry.lastAccessed = new Date();
    } else {
      // Add new entry
      user.progress.push({
        courseId,
        percentage,
        lastAccessed: new Date(),
      });
    }

    await user.save();
    res.status(200).json({ message: 'Progress updated successfully' });
  } catch (err) {
    console.error('Error updating progress:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
