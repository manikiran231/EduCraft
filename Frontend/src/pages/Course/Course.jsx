import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SimpleVideoPlayer from '../../components/SimpleVideoPlayer/SimpleVideoPlayer';
import CourseLoader from './CourseLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

const Course = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`https://educraft-backend-ax1v.onrender.com/api/courses/${id}`);
        if (!res.ok) throw new Error('Failed to fetch course');
        const data = await res.json();
        setCourse(data);

        toast.success(`${data.course_title} loaded successfully!`, {
          position: 'top-right',
          autoClose: 2500,
        });
      } catch (err) {
        console.error(err);
        toast.error('Course not found');
        navigate('/');
      }
    };

    fetchCourse();
  }, [id, navigate]);

  useEffect(() => {
    const checkEnrollment = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch(`https://educraft-backend-ax1v.onrender.com/api/enrollments/is-enrolled/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok && data.enrolled) {
          setEnrolled(true);
        }
      } catch (err) {
        console.error('Enrollment check failed', err);
      }
    };

    checkEnrollment();
  }, [id]);

  const handleEnroll = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in to enroll.');
      return;
    }

    navigate(`/payment/${id}`);
  };


  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!enrolled) {
      toast.warning('Please enroll in the course before submitting a review.');
      return;
    }

    console.log('Review Submitted:', { rating, review });
    toast.info('Thanks for your feedback!');
    setRating('');
    setReview('');
  };

  if (!course) return <CourseLoader />;

  const videoUrl = course.video_url;
  const isValidYouTube = isYouTubeUrl(videoUrl);
  const embedUrl = isValidYouTube ? getYouTubeEmbedUrl(videoUrl) : '';

  return (
    <div className="course-page">
      <ToastContainer />
      <div className="course-header">
        <div className="course-details">
          <h1>{course.course_title}</h1>
          <p className="subtitle">
            Pass this course on your first attempt! Includes full access & preview video.
          </p>
          <p className="tag">Bestseller</p>
          <p>
            <strong>Instructor:</strong> {course.instructor_name}
          </p>
          <p>
            <strong>Languages:</strong> English
          </p>
          <div className="stats">
            <span>⭐ {course.difficulty_rating} / 5 difficulty</span>
            <span>🔥 {course.popularity_score}% popularity</span>
            <span>👨‍🎓 Duration: {course.course_duration} mins</span>
          </div>
          <p>
            <strong>Start:</strong> {new Date(course.start_date).toLocaleDateString()} |{' '}
            <strong>End:</strong> {new Date(course.end_date).toLocaleDateString()}
          </p>
        </div>

        <div className="course-video-box">
          {enrolled ? (
            isValidYouTube && embedUrl ? (
              <iframe
                width="100%"
                height="200"
                src={embedUrl}
                title="Course Preview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : videoUrl ? (
              <SimpleVideoPlayer videoUrl={videoUrl} />
            ) : (
              <div className="video-unavailable">
                <p>No video preview available for this course.</p>
              </div>
            )
          ) : (
            <div className="video-lock-message">
              <p style={{ color: 'red', fontWeight: 'bold' }}>
                🔒 Enroll to view this course in your personal space.
              </p>
            </div>
          )}


          <div className="course-price-box">
            <p className="price">
              ₹{Math.floor(course.price - 0.2 * course.price)}{' '}
              <span className="old-price">₹{course.price}</span>{' '}
              <span className="discount">20% off</span>
            </p>
            <p className="offer-time">⏳ 6 days left at this price!</p>

            {enrolled ? (
              <button className="enrolled-btn" disabled>
                ✅ Enrolled
              </button>
            ) : (
              <button className="enroll-btn" onClick={handleEnroll}>
                Enroll Now
              </button>
            )}

            <p className="guarantee">30-Day Money-Back Guarantee</p>
            <p className="lifetime">Full Lifetime Access</p>
          </div>
        </div>
      </div>

      <div className="review-section">
        <h2>Leave a Rating & Review</h2>
        <form onSubmit={handleReviewSubmit}>
          <label>
            Rating (1–5):
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </label>
          <label>
            Review:
            <textarea
              rows="4"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            />
          </label>
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default Course;
