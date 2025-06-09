import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // ✅ React Icons
import './login.css';

const Login = () => { 
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://educraft-backend-ax1v.onrender.com/api/auth/login', formData);
      toast.success(res.data.msg);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }
      window.location.href = "/";
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login Failed, Please try again.");
    }
  };

  return (
    <>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Welcome Back</h2>
          <p>Please login to your account</p>

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <div style={{ position: 'relative' }}>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              onChange={handleChange}
              required
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
                fontSize: '20px',
                color: '#555',
                paddingRight:'10px'
              }}
              title={showPassword ? "Hide Password" : "Show Password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="extra-options" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }}>
            Forgot Password..? 
            <a href="/forgot-password" className="forgot-password-link" style={{ marginLeft: "10px", color: "#1e90ff" }}>Click Here</a>
          </div>

          <button type="submit">Login</button>

          <div className="register-link">
            Don't have an account? <a href="/register">Register here</a>
          </div>
        </form>
      </div>

      <ToastContainer />
    </>
  );
};

export default Login;
