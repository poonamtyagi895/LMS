import "./CourseCard.css";

const CourseCard = ({ course }) => {
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
      <div className="course-card-image">
        <img src={image} alt={title} />
      </div>

      <div className="course-card-content">
        <span className="course-card-category">{category}</span>

        <h3 className="course-card-title">{title}</h3>

        <div className="course-card-meta">
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
