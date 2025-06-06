import React, { useEffect, useState } from 'react';
import CourseCard from './CourseCard/CourseCard';
import LoadingCard from './LoadingCard/LoadingCard';
import './MyCourses.css'; // Reuse styling

const MyCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const coursesPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('User not logged in');
          setLoading(false);
          return;
        }

        const res = await fetch('/api/auth/enrollments', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Failed to fetch enrollments');

        const data = await res.json();

        const courses = data
          .map((enroll) => enroll.courseId)
          .filter((course) => course !== null);

        setEnrolledCourses(courses);
        setLoading(false);
      } catch (err) {
        console.error('Error loading courses:', err);
        setError(err.message || 'Error loading courses');
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = enrolledCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(enrolledCourses.length / coursesPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="course-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <LoadingCard key={i} />
        ))}
      </div>
    );
  }

  if (error) return <p className="error">{error}</p>;
  if (enrolledCourses.length === 0) return <p>You haven't enrolled in any courses yet.</p>;

  return (
    <div className="container">
      <h2 className="title">My Enrolled Courses</h2>
      <p className="description">
        These are the courses you're currently enrolled in. Continue learning at your own pace!
      </p>

      <div className="course-grid">
        {currentCourses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ⬅ Prev
          </button>

          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx + 1}
              onClick={() => handlePageChange(idx + 1)}
              className={currentPage === idx + 1 ? 'active' : ''}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
