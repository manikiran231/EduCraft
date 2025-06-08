import React from "react";
import "./ProfileLoading.css"; // reuse the existing skeleton styles

const ProfileLoading = () => {
  return (
    <div className="profile-card loading">
      <div className="skeleton avatar-skeleton"></div>
      <div className="user-info-skeleton">
        <div className="skeleton title-skeleton"></div>
        <div className="skeleton subtitle-skeleton"></div>
        <div className="skeleton subtitle-skeleton"></div>
        <div className="skeleton bio-skeleton"></div>
      </div>

      <div className="stats-skeleton">
        <div className="skeleton stat-skeleton"></div>
        <div className="skeleton stat-skeleton"></div>
        <div className="skeleton stat-skeleton"></div>
      </div>

      <div className="progress-skeleton">
        <div className="skeleton progress-title-skeleton"></div>
        <div className="skeleton progress-bar-skeleton"></div>
        <div className="skeleton progress-bar-skeleton"></div>
      </div>
    </div>
  );
};

export default ProfileLoading;
