import React from "react";
import "./Profile.css";

const Profile = () => {
  const user = {
    name: "Mani Kiran",
    email: "manikiran231@example.com",
    joined: "June 2023",
    bio: "Aspiring Full Stack Developer | React • MongoDB • NodeJS",
    progress: {
      coursesCompleted: 5,
      challengesSolved: 120,
      projectsBuilt: 7,
    },
    journeyProgress: 75, // %
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
          alt="User Avatar"
          className="avatar"
        />
        <div className="user-info">
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <span>Joined: {user.joined}</span>
          <p className="bio">"{user.bio}"</p>
        </div>
      </div>

      <div className="progress-section">
        <h2>Journey Progress</h2>
        <div className="progress-bar-background">
          <div
            className="progress-bar-fill"
            style={{ width: `${user.journeyProgress}%` }}
          ></div>
        </div>

        <div className="stats">
          <div className="stat-card blue">
            <h3>Courses</h3>
            <p>{user.progress.coursesCompleted}</p>
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
      </div>
    </div>
  );
};

export default Profile;
