import React from 'react';
import './CourseLoader.css';

const CourseLoader = () => {
  return (
    <div className="course-page">
      <div className="course-header">
        <div className="course-details">
          <div className="skeleton title-skeleton"></div>
          <div className="skeleton subtitle-skeleton"></div>
          <div className="skeleton tag-skeleton"></div>
          <div className="skeleton text-line"></div>
          <div className="skeleton text-line"></div>
          <div className="skeleton stats-skeleton"></div>
          <div className="skeleton text-line short"></div>
        </div>

        <div className="course-video-box">
          <div className="skeleton video-skeleton"></div>

          <div className="course-price-box">
            <div className="skeleton price-skeleton"></div>
            <div className="skeleton offer-skeleton"></div>
            <div className="skeleton enroll-btn-skeleton"></div>
            <div className="skeleton text-line short"></div>
            <div className="skeleton text-line short"></div>
          </div>
        </div>
      </div>

      <div className="review-section">
        <div className="skeleton review-title-skeleton"></div>
        <div className="skeleton input-skeleton"></div>
        <div className="skeleton textarea-skeleton"></div>
        <div className="skeleton submit-btn-skeleton"></div>
      </div>
    </div>
  );
};

export default CourseLoader;
