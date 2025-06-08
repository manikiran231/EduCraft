import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CourseCard.css';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleMoreDetails = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate(`/my-courses/course/${course._id}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="course-card">
      <h3>{course.course_title}</h3>
      <p className="description">{course.description}</p>

      <div className="course-meta">
        <p><strong>Subject:</strong> {course.subject_area}</p>
        <p><strong>Instructor:</strong> {course.instructor_name}</p>
        <p><strong>Target Audience:</strong> {course.target_audience}</p>
      </div>

      <div className="ratings">
        <span>⭐ Difficulty: {course.difficulty_rating} / 5</span>
        <span>🔥 Popularity: {course.popularity_score}%</span>
      </div>

      <button className="details-btn" onClick={handleMoreDetails}> Continue</button>
    </div>
  );
};

export default CourseCard;
