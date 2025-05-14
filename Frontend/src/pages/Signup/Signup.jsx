import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';
import "./signup.css";

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate(); // 👈 React Router hook

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            toast.success(res.data.msg); // 👈 Show success toast
            navigate("/login"); // 👈 Redirect to login page after successful registration
        } catch (err) {
            toast.error(err.response?.data?.msg || "Signup failed"); // 👈 Show error toast
        }
    };

    return (
        <>
            {/* ToastContainer should be placed somewhere in the root of your app */}
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
        </>
    );
};

export default Signup;
