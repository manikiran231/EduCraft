import React, { useState } from 'react';
import axios from 'axios';
import "./login.css";

const Login = () => {
    const [formData, setFormData] = useState({ name: '', password: '' });

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            alert(res.data.msg);
        } catch (err) {
            alert(err.response?.data?.msg || "Login failed");
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Welcome Back</h2>
                <p>Please login to your account</p>

                <label htmlFor="name">Username</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your username"
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

                <button type="submit">Login</button>

                <div className="register-link">
                    Don't have an account? <a href="/register">Register here</a>
                </div>
            </form>
        </div>
    );
};

export default Login;
