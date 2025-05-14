import { useParams } from "react-router-dom";
import courses from "../../../utils/data"; // wherever you store the data

function CourseDetails() {
  const { id } = useParams();
  const course = courses.find((c) => c.id.toString() === id);

  if (!course) {
    return <p>Course not found.</p>;
  }

  return (
    <div className="course-details">
      <h3>{course.name}</h3>
      <img src={course.image} alt={course.name} />
      <p>{course.description}</p>
      <div className="course-additional-info">
        <p><strong>Fee:</strong> {course.fee}</p>
        <p><strong>Rating:</strong> {course.rating}</p>
        <p><strong>Users Enrolled:</strong> {course.usersEnrolled}</p>
        <p><strong>Teacher Type:</strong> {course.teacherType}</p>
        <h4>Key Features:</h4>
        <ul>
          {course.keyFeatures.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CourseDetails;
