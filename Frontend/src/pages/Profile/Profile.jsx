import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./Profile.css";

const API_BASE_URL = "http://localhost:5000/api/auth";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#a28eff", "#ff6f91"];

const averageProgress = (progressArray) => {
  if (!Array.isArray(progressArray) || progressArray.length === 0) return 0;
  const total = progressArray.reduce((sum, item) => sum + (item?.percentage || 0), 0);
  return Math.round(total / progressArray.length);
};

const Profile = () => {
  const [user, setUser ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCharts, setShowCharts] = useState(true); // State to toggle charts visibility

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please login again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;

        setUser ({
          name: data.name,
          email: data.email,
          joined: new Date(data.joinedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          bio: "Aspiring Full Stack Developer | React • MongoDB • NodeJS",
          progress: {
            coursesCompleted: data.enrolledCourses?.length || 0,
            challengesSolved: 120,
            projectsBuilt: 7,
          },
          journeyProgress: averageProgress(data.progress),
          progressDetails: data.progress || [],
        });

        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError("Failed to load profile. Please try again.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  // Prepare chart data
  const pieData = user.progressDetails.map((item) => ({
    name: `Course ${item.courseId || "N/A"}`,
    value: item.percentage,
  }));

  const barData = pieData;

  // Motivational message based on average progress
  const motivationalMessage = user.journeyProgress < 50 
    ? "Keep pushing! You're doing great, and every step counts!" 
    : "Awesome job! You're on the right track!";

  return (
    <div className="profile-container">
      <h1 className="dashboard-title">User Dashboard</h1>
<p className="welcome-message">Welcome back, {user.name}! Let’s track your learning journey 🚀</p>

      <div className="profile-header">
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name || "User ")}`}
          alt="User  Avatar"
          className="avatar"
        />
        <div className="user-info">
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <span>Joined: {user.joined}</span>
          <p className="bio">"{user.bio}"</p>
        </div>
      </div>

      <div className="stats">
        <div className="stat-card blue">
          <h3>Courses</h3>
          <p>
            <Link to="/my-courses">{user.progress.coursesCompleted}</Link>
          </p>
        </div>
        <div className="stat-card green">
          <h3>Challenges</h3>
          <p>{user.progress.challengesSolved}</p>
        </div>
        <div className="stat-card purple">
          <h3>Projects</h3>
          <p>{user.progress.projectsBuilt}</p>
        </div>
      </div>

      <div className="progress-section">
        <h2>Journey Progress</h2>
        <p className="motivational-message">{motivationalMessage}</p>

        <button className="toggle-charts" onClick={() => setShowCharts(!showCharts)}>
          {showCharts ? "Hide Charts" : "Show Charts"}
        </button>

        {showCharts && (
          <>
            <div style={{ width: "100%", maxWidth: 400, margin: "auto" }}>
              <h3>Course Completion Pie</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                    animationDuration={500}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <ReTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div style={{ width: "100%", maxWidth: 600, margin: "50px auto" }}>
              <h3>Course Completion Bar</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={barData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  animationDuration={500}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <ReTooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
