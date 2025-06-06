const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// Middle
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Error:', err));

// Your other routes (auth, personalDetails, Enrollments)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/details', require('./routes/personalDetails'));
app.use('/api/enrollments', require('./routes/Enrollments'));
app.use('/api/courses',require("./routes/courses"))
// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
