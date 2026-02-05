import { useState } from "react";
import "./CoursePage.css";
import BackButton from "../Buttons/BackButton/BackButton";
import ShareButton from "../Buttons/ShareButton/ShareButton";
import DotButton from "../Buttons/DotButton/DotButton";
import ProgressPercentBar from "../ProgressPercentBar/ProgressPercentBar";
import RatingPage from "../RatingPage/RatingPage";

const CoursePage = () => {
  const [showRating, setShowRating] = useState(false);

  return (
    <>
      <div className="course-page">
        {/* TOP ACTION ROW */}
        <div className="course-page-actions">
          <BackButton />
          <div className="course-page-actions-right">
            <ProgressPercentBar />
            <DotButton
              label="Give A Rating"
              onClick={() => setShowRating(true)}
            />
            <ShareButton />
          </div>
        </div>

        {/* HERO SECTION */}
        <div className="course-page-hero">
          {/* LEFT IMAGE */}
          <div className="course-page-hero-image">
            <img src="/images/student/1.jpg" alt="Course" />
          </div>

          {/* RIGHT CONTENT */}
          <div className="course-page-hero-content">
            <div className="course-page-header">
              <h1>Course Details</h1>
              <p>Continue learning and track your progress</p>
            </div>

            {/* RATINGS */}
            <div className="course-page-rating">
              ⭐ ⭐ ⭐ ⭐ ☆
              <span>(4.0 / 5)</span>
            </div>

            {/* KEY POINTS */}
            <ul className="course-page-keypoints">
              <li>Beginner friendly course structure</li>
              <li>Step-by-step concept explanations</li>
              <li>Practical examples included</li>
              <li>Track progress chapter-wise</li>
            </ul>
          </div>
        </div>

        {/* COURSE DESCRIPTION */}
        <div className="course-page-card">
          <div className="course-page-card-header">
            <h3>Course Description</h3>
          </div>

          <p className="course-page-text">
            This course is designed to help learners build strong fundamentals
            through well-structured lessons. Each chapter focuses on clear
            explanations and practical understanding, allowing you to progress at
            your own pace while tracking your learning journey.
          </p>
        </div>
      </div>
      {showRating && (
        <RatingPage onClose={() => setShowRating(false)} />
      )}
    </>
  );
};

export default CoursePage;
