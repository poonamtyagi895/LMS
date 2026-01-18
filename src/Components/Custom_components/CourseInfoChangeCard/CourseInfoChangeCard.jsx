import { useParams } from "react-router-dom";
import { useState } from "react";
import "./CourseInfoChangeCard.css";

const CourseInfoChangeCard = ({ mode }) => {
  const { id } = useParams();
  const isEdit = mode === "edit";

  const [course, setCourse] = useState({
    title: isEdit ? "Cinematic Techniques" : "",
    description: isEdit
      ? "This is a course on Cinematic Techniques"
      : "",
    price: isEdit ? "9300" : "",
    published: true,
  });

  return (
    <div className="course-info-change-page">
      <div className="course-info-change-header">
        <h1>Course setup</h1>

        <div className="course-info-change-actions">
          <button className="course-info-change-unpublish">
            Unpublish
          </button>
          <button className="course-info-change-delete">🗑</button>
        </div>
      </div>

      <div className="course-info-change-content">
        {/* LEFT */}
        <div className="course-info-change-left">
          <div className="course-info-change-card">
            <label>Course title</label>
            <input
              type="text"
              value={course.title}
              onChange={(e) =>
                setCourse({ ...course, title: e.target.value })
              }
            />
          </div>

          <div className="course-info-change-card">
            <label>Course description</label>
            <textarea
              rows="4"
              value={course.description}
              onChange={(e) =>
                setCourse({
                  ...course,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div className="course-info-change-card">
            <label>Course image</label>
            <img
              src="/images/bg9.jpg"
              alt="course"
              className="course-info-change-image"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="course-info-change-right">
          <div className="course-info-change-card">
            <h3>Course chapters</h3>
            <div className="course-info-change-chapter">Introduction</div>
            <div className="course-info-change-chapter">
              Exploring the Basics
            </div>
            <div className="course-info-change-chapter">
              Practical Hands-on Activities
            </div>

            <button className="course-info-change-add-chapter">
              + Add a chapter
            </button>
          </div>

          <div className="course-info-change-card">
            <h3>Sell your course</h3>
            <label>Course price</label>
            <input
              type="number"
              value={course.price}
              onChange={(e) =>
                setCourse({ ...course, price: e.target.value })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInfoChangeCard;
