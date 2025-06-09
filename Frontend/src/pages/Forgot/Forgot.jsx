import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom"; // 👈 import Link
import './Forgot.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Forgot() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://educraft-backend-ax1v.onrender.com/api/auth/forgot-password', { email });
      setMessage(response.data.message || 'Check your email for reset instructions.');
      toast.success("OTP sent to your email!");
      setError('');
      setTimeout(() => {
        navigate(`/reset-password/${encodeURIComponent(email)}`);
      }, 2000);
    } catch (err) {
      console.error('Forgot password error:', err);
      setMessage('');
      setError(err.response?.data?.error || 'Please Check your email or try again later.');
      toast.error("Invalid email, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <header>
        <h1>Forgot Password</h1>
        <p>Enter your email to reset your password</p>
      </header>
      <form onSubmit={handleSubmit}>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={loading}
        />
        <button type="submit" className="forgot-button" disabled={loading}>
          {loading ? "Sending..." : "Send Passcode"}
        </button>
      </form>

      {/* 🔙 Back to Login link */}
      <div className="back-to-login">
        <p>
          Remember your password?{" "}
          <Link to="/login" style={{ color: "#1e90ff", fontWeight: "normal",paddingLeft:"2px"}}>Back to Login</Link>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Forgot;
