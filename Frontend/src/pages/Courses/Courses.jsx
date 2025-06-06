import React, { useState, useEffect } from 'react';
import CourseCard from './CourseCard/CourseCard';
import LoadingCard from './LoadingCard/LoadingCard';
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [userType, setUserType] = useState('student');
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const coursesPerPage = 9;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/courses');
        if (!res.ok) throw new Error('Failed to fetch courses');
        const data = await res.json();
        setCourses(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const getFilteredCourses = () => {
    let filtered = courses.filter((course) =>
      (course.course_title || '').toLowerCase().includes(search.toLowerCase()) &&
      course.target_audience === userType
    );

    if (sortBy === 'rating') {
      filtered.sort((a, b) => b.difficulty_rating - a.difficulty_rating);
    } else if (sortBy === 'popularity') {
      filtered.sort((a, b) => b.popularity_score - a.popularity_score);
    }

    return filtered;
  };

  const filteredCourses = getFilteredCourses();
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const welcomeMessage =
    userType === 'parent'
      ? "Hey Parent! Here are some featured courses your kids might enjoy – like math tutorials, other subjects, and fun games on your wish."
      : "Hey Student! Welcome – choose your courses like Web Dev, HTML, CSS, Python, C, C++, and more!";

  return (
    <div className="container">
      <h2 className="title">Our Courses</h2>
      <p className="description">
        Explore our wide range of courses tailored for students and parents.
        Use the filters to find the perfect course for you!
      </p>

      <div className="filters">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select value={userType} onChange={(e) => {
          setUserType(e.target.value);
          setCurrentPage(1);
        }}>
          <option value="student">Student</option>
          <option value="parent">Parent</option>
        </select>
        <select value={sortBy} onChange={(e) => {
          setSortBy(e.target.value);
          setCurrentPage(1);
        }}>
          <option value="relevance">Relevance</option>
          <option value="popularity">Popularity</option>
          <option value="rating">Difficulty</option>
        </select>
      </div>

      <h2 className="welcome">{welcomeMessage}</h2>

      {loading ? (
        <div className="course-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      ) : (

        <>
          <div className="course-grid">
            {currentCourses.length > 0 ? (
              currentCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))
            ) : (
              <p>No courses found matching your criteria.</p>
            )}
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
        </>
      )}
    </div>
  );
};

export default Courses;
