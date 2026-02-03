import "./StudentCourses.css";

const StudentCourses = () => {
  const courses = [
    {
      id: 1,
      title: "React for Beginners",
      instructor: "John Doe",
      progress: 65,
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      instructor: "Jane Smith",
      progress: 30,
    },
    {
      id: 3,
      title: "UI/UX Fundamentals",
      instructor: "Alex Brown",
      progress: 100,
    },
  ];

  return (
    <div className="student-courses">
      {/* Header */}
      <div className="student-courses-header">
        <h1 className="student-courses-title">My Courses</h1>
        <p className="student-courses-subtitle">
          Track and continue your learning
        </p>
      </div>

      {/* Courses Grid */}
      <div className="student-courses-grid">
        {courses.map(course => (
          <div key={course.id} className="student-course-card">
            <h3 className="course-title">{course.title}</h3>
            <p className="course-instructor">
              Instructor: {course.instructor}
            </p>

            <div className="course-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <span className="progress-text">
                {course.progress}% completed
              </span>
            </div>

            <button className="course-btn">
              {course.progress === 100 ? "View Certificate" : "Continue"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentCourses;
