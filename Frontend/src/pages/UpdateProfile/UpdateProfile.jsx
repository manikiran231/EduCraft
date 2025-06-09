import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // 👈 Import Toastify
import './UpdateProfile.css';

const UpdateProfile = () => {
  const [form, setForm] = useState({
    userId: '', // Assume this comes from auth
    name: '',
    age: '',
    educationLevel: 'College',
    institutionName: '',
    passingYear: '',
    interests: '',
    about: '',
    dob: '',
  });

  const [resume, setResume] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleResumeUpload = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (key === 'interests') {
        formData.append(key, JSON.stringify(value.split(',')));
      } else {
        formData.append(key, value);
      }
    });

    if (resume && form.educationLevel === 'College') {
      formData.append('resume', resume);
    }

    try {
      const res = await axios.post('https://educraft-backend-ax1v.onrender.com/api/details/update', formData);
      toast.success(res.data.msg || "Profile submitted successfully!"); // ✅ Show success
      toast.info("This feature is under development. Please check back later."); // ✅ Additional message
    } catch (err) {
      toast.error(err.response?.data?.msg || "Something went wrong"); // ❌ Show error
    }
  };

  return (
    <div className="update-profile-container">
      <h2>Update Profile</h2>

      <form onSubmit={handleSubmit}>
        <input name="userId" placeholder="User ID" onChange={handleChange} required />
        <input name="name" placeholder="Full Name" onChange={handleChange} required />
        <input name="age" type="number" placeholder="Age" onChange={handleChange} required />

        <select name="educationLevel" onChange={handleChange}>
          <option value="College">College</option>
          <option value="School">School</option>
        </select>

        <input name="institutionName" placeholder="College/School Name" onChange={handleChange} required />
        <input name="passingYear" type="number" placeholder="Passing Year" onChange={handleChange} required />
        <input name="interests" placeholder="Interests (comma separated)" onChange={handleChange} />
        <textarea name="about" placeholder="A little about you" onChange={handleChange}></textarea>
        <input name="dob" type="date" onChange={handleChange} />

        {form.educationLevel === 'College' && (
          <div>
            <label>Upload Resume:</label>
            <input type="file" onChange={handleResumeUpload} accept=".pdf,.doc,.docx" />
          </div>
        )}

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
