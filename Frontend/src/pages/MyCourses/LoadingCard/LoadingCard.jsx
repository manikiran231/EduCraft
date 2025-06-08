import React from 'react';
import './LoadingCard.css'; // reuse the existing styles

const CourseCard = () => {
  return (
    <div className="course-card loading">
      <div className="skeleton title-skeleton"></div>
      <div className="skeleton description-skeleton"></div>

      <div className="course-meta">
        <p className="skeleton meta-skeleton"></p>
        <p className="skeleton meta-skeleton"></p>
        <p className="skeleton meta-skeleton"></p>
      </div>

      <div className="ratings">
        <span className="skeleton rating-skeleton"></span>
        <span className="skeleton rating-skeleton"></span>
      </div>

      <button className="details-btn skeleton-btn" disabled>Loading...</button>
    </div>
  );
};

export default CourseCard;
