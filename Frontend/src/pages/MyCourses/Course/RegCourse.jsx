import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify'; // 👈 Import toast
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

  useEffect(() => {
    const fetchCourseAndProgress = async () => {
      try {
        const token = localStorage.getItem('token');

        const courseRes = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!courseRes.ok) throw new Error('Failed to load course');
        const courseData = await courseRes.json();
        setCourse(courseData);

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
            const saved = localStorage.getItem(`progress-${courseId}`);
            setProgress(saved ? Number(saved) : 0);
          }
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        toast.error('Failed to fetch course data'); // 👈 Toast on error
      } finally {
        setLoading(false);
      }
    };

    fetchCourseAndProgress();
  }, [courseId]);

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

      if (!res.ok) throw new Error('Failed to update progress');
      toast.success('Program loaded successfully 🎯'); // ✅ Toast on success
    } catch (err) {
      console.error('Error Loading progress:', err);
      toast.error('Could not Load Program'); // ❌ Toast on failure
    }
  };

  if (loading) {
    return (
      <div className="course-detail-container loading">
        <div className="skeleton-title shimmer"></div>
        <div className="skeleton-text shimmer"></div>
        <div className="skeleton-text shimmer short"></div>
        <div className="skeleton-video shimmer"></div>
        <div className="skeleton-progress shimmer"></div>
      </div>
    );
  }

  if (!course) return <p>Course not found</p>;

  const videoUrl = course.video_url;
  const isYouTube = isYouTubeUrl(videoUrl);
  const embedUrl = isYouTube ? getYouTubeEmbedUrl(videoUrl) : '';

  return (
    <div className="course-detail-container">
      <div className="course-header">
        <h1 className="course-title">{course.course_title}</h1>
        <p className="course-instructor">
          <strong>Instructor:</strong> {course.instructor_name || 'TBA'}
        </p>
      </div>

      <div className="course-card">
        <p className="course-description">{course.description}</p>

        <div className="video-wrapper">
          {embedUrl ? (
            <iframe src={embedUrl} title="Course Video" allowFullScreen />
          ) : videoUrl ? (
            <video controls>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <p>No video available</p>
          )}
        </div>

        <div className="progress-section">
          <label htmlFor="progressRange">
            <strong>Track Your Progress</strong> 🚀
          </label>
          <input
            type="range"
            id="progressRange"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => handleProgressChange(Number(e.target.value))}
          />
          <div className="progress-feedback">
            <p>{progress}% completed</p>
            <span>
              {progress === 100
                ? '🎉 Great job!'
                : progress >= 75
                ? '🔥 Almost there!'
                : progress >= 50
                ? '👍 Keep going!'
                : progress >= 25
                ? '📚 You’re getting there!'
                : '💡 Just getting started!'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegCourse;
