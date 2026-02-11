import { Link } from "react-router-dom";
import "./CourseCard.css";
import BookmarkButton from "../../CustomComponents/Buttons/BookmarkButton/BookmarkButton";

const CourseCard = ({ course, onBookmarkToggle }) => {
  const {
    title,
    category,
    chapters,
    progress,
    enrolledOn,
    image,
  } = course;

  return (
    <div className="course-card">
      {/* Bookmark button */}
      <BookmarkButton
        checked={course.bookmarked}
        onToggle={() => onBookmarkToggle(course.id)}
      />

      <div className="course-card-image">
        <img src={image} alt={title} />
      </div>

      <div className="course-card-content">
        <span className="course-card-category">{category}</span>

        <Link
          to={`/student/courses/${course.id}`}
          className="course-card-title course-card-title-link"
        >
          {title}
        </Link>

        <div className="course-card-chapters-data">
          <i className="fas fa-book-open"></i>
          <span>{chapters} Chapters</span>
        </div>

        <div className="course-card-progress">
          <div className="course-card-progress-bar">
            <div
              className="course-card-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="course-card-progress-text">
            {progress}% Complete
          </span>
        </div>

        {enrolledOn && (
          <p className="course-card-enrolled">
            Enrolled on {enrolledOn}
          </p>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
