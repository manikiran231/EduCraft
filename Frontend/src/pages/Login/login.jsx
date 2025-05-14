import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // 👈 Import Toastify
import './login.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            toast.success(res.data.msg); // 👈 Show success toast
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            window.location.href = "/"; // Redirect to homepage
        } catch (err) {
            toast.error(err.response?.data?.msg || "Login failed"); // 👈 Show error toast
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
        </>
    );
};

export default Login;
