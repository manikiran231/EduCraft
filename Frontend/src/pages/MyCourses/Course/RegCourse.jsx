import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Course.css';

const isYouTubeUrl = (url) =>
  url.includes('youtu.be') || url.includes('youtube.com/watch?v=');

const getYouTubeEmbedUrl = (url) => {
  if (!url) return '';
  if (url.includes('youtu.be')) {
    const videoId = url.split('youtu.be/')[1].split(/[?&]/)[0];
    return `https://www.youtube.com/embed/${videoId}`;
  } else if (url.includes('youtube.com/watch?v=')) {
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const videoId = urlParams.get('v');
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return '';
};

const RegCourse = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Fetch course and progress
  useEffect(() => {
    const fetchCourseAndProgress = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch course details
        const courseRes = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!courseRes.ok) throw new Error('Failed to load course');
        const courseData = await courseRes.json();
        setCourse(courseData);

        // Fetch user progress (optional)
        const profileRes = await fetch(`http://localhost:5000/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          const progressEntry = profileData.progress.find(
            (entry) => entry.courseId === courseData._id
          );
          if (progressEntry) {
            setProgress(progressEntry.percentage);
          } else {
            // fallback to localStorage
            const saved = localStorage.getItem(`progress-${courseId}`);
            setProgress(saved ? Number(saved) : 0);
          }
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseAndProgress();
  }, [courseId]);

  // Update progress in DB and localStorage
  const handleProgressChange = async (value) => {
    setProgress(value);
    localStorage.setItem(`progress-${courseId}`, value.toString());

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/auth/progress/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId: course._id, percentage: value }),
      });

      if (!res.ok) {
        console.error('Failed to update progress');
      }
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  };

  if (loading) return <p>Loading course details...</p>;
  if (!course) return <p>Course not found</p>;

  const videoUrl = course.video_url;
  const isYouTube = isYouTubeUrl(videoUrl);
  const embedUrl = isYouTube ? getYouTubeEmbedUrl(videoUrl) : '';

  return (
    <div className="course-detail-container">
      <h1 className="course-title">{course.course_title}</h1>
      <p className="course-instructor">
        <strong>Instructor:</strong> {course.instructor_name || 'TBA'}
      </p>
      <p className="course-description">{course.description}</p>

      <div className="video-container">
        {embedUrl ? (
          <iframe
            width="100%"
            height="500"
            src={embedUrl}
            title="Course Video"
            frameBorder="0"
            allowFullScreen
          />
        ) : videoUrl ? (
          <video width="100%" height="500" controls>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>No video available</p>
        )}
      </div>

      <div className="progress-section">
        <label htmlFor="progressRange">
          <strong>Track Your Progress:</strong>
        </label>
        <input
          type="range"
          id="progressRange"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => handleProgressChange(Number(e.target.value))}
        />
        <p>{progress}% completed</p>
      </div>
    </div>
  );
};

export default RegCourse;
