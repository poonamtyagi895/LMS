import "./StudentCourses.css";
import CourseCard from "../../CustomComponents/CourseCard/CourseCard";

const StudentCourses = () => {
  const courses = [
    {
      id: 1,
      title: "Introduction to Filming",
      category: "Class 5",
      chapters: 2,
      progress: 50,
      enrolledOn: "12 Jan 2024",
      image: "/images/student/1.jpg",
    },
    {
      id: 2,
      title: "Structural Design Principles",
      category: "Class 8",
      chapters: 10,
      progress: 30,
      enrolledOn: "02 Feb 2024",
      image: "/images/student/2.jpg",
    },
    {
      id: 3,
      title: "UI/UX Fundamentals",
      category: "Class 10",
      chapters: 8,
      progress: 100,
      enrolledOn: "22 Dec 2023",
      image: "/images/student/3.jpg",
    },
    {
      id: 4,
      title: "React for Beginners",
      category: "Class 9",
      chapters: 12,
      progress: 40,
      enrolledOn: "05 Mar 2024",
      image: "/images/student/4.jpg",
    },
    {
      id: 5,
      title: "Advanced JavaScript",
      category: "Class 9",
      chapters: 15,
      progress: 20,
      enrolledOn: "18 Mar 2024",
      image: "/images/student/5.jpg",
    },
  ];

  return (
    <div className="student-courses">
      <div className="student-courses-header">
        <h1 className="student-courses-title">My Courses</h1>
        <p className="student-courses-subtitle">
          Track and continue your learning
        </p>
      </div>

      <div className="student-courses-grid">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default StudentCourses;
