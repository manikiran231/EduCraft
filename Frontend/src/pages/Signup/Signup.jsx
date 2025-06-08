import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import "./signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    const { name, email, password } = formData;

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Invalid email format";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    return newErrors;
  };

  const getPasswordStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)) return "Strong";
    if (password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)) return "Medium";
    return "Weak";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      toast.success(res.data.msg);
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Signup failed");
    }
  };

  const { password } = formData;
  const passwordStrength = getPasswordStrength(password);

  return (
    <>
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Create Account</h2>
          <p>Please fill in the details to register</p>

          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
            value={formData.name}
          />
          {submitted && errors.name && <span className="error">{errors.name}</span>}

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
            value={formData.email}
          />
          {submitted && errors.email && <span className="error">{errors.email}</span>}

          <label htmlFor="password">Password</label>
          <div style={{ position: 'relative' }}>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              onChange={handleChange}
              value={formData.password}
              style={{ paddingRight: '35px' }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: 8,
                top: '35%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                fontSize: '18px',
                color: '#555',
                paddingRight: '10px',
              }}
              title={showPassword ? "Hide Password" : "Show Password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {submitted && errors.password && <span className="error">{errors.password}</span>}
          {password && submitted && !errors.password && (
            <span className={`strength ${passwordStrength.toLowerCase()}`}>
              Password Strength: {passwordStrength}
            </span>
          )}

          <button type="submit">Register</button>

          <div className="login-link">
            Already have an account? <a href="/login">Login here</a>
          </div>
        </form>
      </div>

      <ToastContainer />
    </>
  );
};

export default Signup;
