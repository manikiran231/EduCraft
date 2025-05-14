const express = require('express');
const router = express.Router();
const multer = require('multer');
const PersonalDetails = require('../models/PersonalDetails');

// Multer setup for resume upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/resumes'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.post('/update', upload.single('resume'), async (req, res) => {
  try {
    const {
      userId, age, collegeOrSchool, passingYear,
      interestedAreas, about, dob, role, github, linkedin, phone
    } = req.body;

    const updateData = {
      age,
      collegeOrSchool,
      passingYear,
      interestedAreas: JSON.parse(interestedAreas),
      about,
      dob,
      role,
      github,
      linkedin,
      phone
    };

    if (role === 'college' && req.file) {
      updateData.resume = req.file.path;
    }

    const existing = await PersonalDetails.findOneAndUpdate(
      { userId },
      updateData,
      { upsert: true, new: true }
    );

    res.status(200).json({ msg: 'Profile updated', data: existing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error while updating profile' });
  }
});

// GET route to fetch details for profile
router.get('/:userId', async (req, res) => {
  try {
    const details = await PersonalDetails.findOne({ userId: req.params.userId });
    if (!details) return res.status(404).json({ msg: 'Profile not found' });
    res.json(details);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching profile' });
  }
});

module.exports = router;
