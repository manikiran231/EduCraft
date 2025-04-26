import React, { useState } from 'react';
import axios from 'axios';
import "./signup.css";

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            alert(res.data.msg);
        } catch (err) {
            alert(err.response?.data?.msg || "Signup failed");
        }
    };

    return (
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
                    required
                />

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
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    required
                />

                <button type="submit">Register</button>

                <div className="login-link">
                    Already have an account? <a href="/login">Login here</a>
                </div>
            </form>
        </div>
    );
};

export default Signup;
