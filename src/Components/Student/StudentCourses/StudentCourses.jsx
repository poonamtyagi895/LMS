import { useState } from "react";
import "./StudentCourses.css";
import SearchBar from "../../CustomComponents/Buttons/SearchBar/SearchBar";
import CourseCard from "../../CustomComponents/CourseCard/CourseCard";
import { showToast } from "../../CustomComponents/CustomToast/CustomToast";

const StudentCourses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Introduction to Filming",
      category: "Class 5",
      chapters: 2,
      progress: 50,
      enrolledOn: "12 Jan 2024",
      image: "/images/student/1.jpg",
      bookmarked: false,
    },
    {
      id: 2,
      title: "Structural Design Principles",
      category: "Class 8",
      chapters: 10,
      progress: 30,
      enrolledOn: "02 Feb 2024",
      image: "/images/student/2.jpg",
      bookmarked: false,
    },
    {
      id: 3,
      title: "UI/UX Fundamentals",
      category: "Class 10",
      chapters: 8,
      progress: 100,
      enrolledOn: "22 Dec 2023",
      image: "/images/student/3.jpg",
      bookmarked: false,
    },
    {
      id: 4,
      title: "React for Beginners",
      category: "Class 9",
      chapters: 12,
      progress: 40,
      enrolledOn: "05 Mar 2024",
      image: "/images/student/4.jpg",
      bookmarked: false,
    },
    {
      id: 5,
      title: "Advanced JavaScript",
      category: "Class 9",
      chapters: 15,
      progress: 20,
      enrolledOn: "18 Mar 2024",
      image: "/images/student/5.jpg",
      bookmarked: false,
    },
  ]);

  const handleBookmarkToggle = (courseId) => {
    const currentCourse = courses.find(c => c.id === courseId);
    const willBeBookmarked = !currentCourse.bookmarked;
    showToast(
      willBeBookmarked ? "success" : "info",
      willBeBookmarked ? "Course bookmarked" : "Bookmark removed"
    );
    setCourses((prevCourses) => {
      const updated = prevCourses.map((course) =>
        course.id === courseId
          ? { ...course, bookmarked: willBeBookmarked }
          : course
      );

      return [
        ...updated.filter(c => c.bookmarked),
        ...updated.filter(c => !c.bookmarked),
      ];
    });
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="student-courses">
      <div className="student-courses-header">
        <div>
          <h1 className="student-courses-title">My Courses</h1>
          <p className="student-courses-subtitle">
            Track and continue your learning
          </p>
        </div>

        <SearchBar
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="student-courses-grid">
        {filteredCourses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            onBookmarkToggle={handleBookmarkToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default StudentCourses;
