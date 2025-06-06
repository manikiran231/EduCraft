import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
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
    setLoading(true); // start loading
    try {
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage(response.data.message || 'Check your email for reset instructions.');
      toast.success("OTP sent to your email!");
      setError('');
      setTimeout(() => {
        navigate(`/reset-password/${encodeURIComponent(email)}`);
      }, 2000);
    } catch (err) {
      console.error('Forgot password error:', err);
      setMessage('');
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false); // end loading
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
        <label htmlFor="email" >Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={loading} // disable input while loading
        />
        <button type="submit" className="forgot-button" disabled={loading}>
          {loading ? "Sending..." : "Send Passcode"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Forgot;
