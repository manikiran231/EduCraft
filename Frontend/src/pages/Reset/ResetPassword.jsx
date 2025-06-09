import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ResetPassword.css";

function ResetPassword() {
    const { email: encodedEmail } = useParams();
    const email = decodeURIComponent(encodedEmail);

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
    const navigate = useNavigate();

    useEffect(() => {
        if (timeLeft <= 0) return;
        const interval = setInterval(() => {
            setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, "0");
        const s = String(seconds % 60).padStart(2, "0");
        return `${m}:${s}`;
    };

    const handleOtpChange = (index, value) => {
        if (!/^\d?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
        if (!value && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        }
    };

    const handleOtpPaste = (e) => {
        e.preventDefault();
        const paste = e.clipboardData.getData("text").trim();
        if (!/^\d{6}$/.test(paste)) return;
        const newOtp = paste.split("");
        setOtp(newOtp);
        document.getElementById(`otp-5`).focus();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        if (timeLeft === 0) {
            toast.error("OTP has expired. Please request a new one.");
            return;
        }

        const otpCode = otp.join("");
        if (otpCode.length !== 6) {
            toast.error("Please enter a valid 6-digit OTP.");
            return;
        }

        try {
            const res = await axios.post("https://educraft-backend-ax1v.onrender.com/api/auth/reset-password", {
                email,
                passcode: otpCode,
                newPassword,
            });
            toast.success(res.data.message || "Password reset successful!");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            toast.error(err.response?.data?.error || "Error resetting password");
        }
    };

    return (
        <div className="reset-container">
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <label>Enter OTP</label>
                <div className="otp-inputs" onPaste={handleOtpPaste}>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Backspace" && !otp[index] && index > 0) {
                                    document.getElementById(`otp-${index - 1}`).focus();
                                }
                            }}
                        />
                    ))}
                </div>

                <div className="timer">
                    {timeLeft > 0 ? (
                        <p>
                            OTP expires in: <strong>{formatTime(timeLeft)}</strong>
                        </p>
                    ) : (
                        <p className="expired">OTP has expired. Please request a new one.</p>
                    )}
                </div>

                <label>New Password</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />

                <label>Confirm New Password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <button type="submit" className="reset-button" disabled={timeLeft === 0}>
                    Reset Password
                </button>
            </form>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}

export default ResetPassword;
