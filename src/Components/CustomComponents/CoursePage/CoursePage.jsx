import { useState } from "react";
import "./CoursePage.css";
import BackButton from "../Buttons/BackButton/BackButton";
import ShareButton from "../Buttons/ShareButton/ShareButton";
import DotButton from "../Buttons/DotButton/DotButton";
import ProgressPercentBar from "../ProgressPercentBar/ProgressPercentBar";
import RatingPage from "../RatingPage/RatingPage";
import StarRating from "../RatingPage/StarRating";
import BulletPoint from "../BulletPoint/BulletPoint";
import ChapterPage from "../ChapterPage/ChapterPage";

const CoursePage = () => {
  const [showRating, setShowRating] = useState(false);

  const keyPoints = [
    "10+ hours of video content",
    "Life time access to course materials",
  ];

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
          {/* TOP SECTION */}
          <div className="course-page-hero-top">
            {/* LEFT IMAGE */}
            <div className="course-page-hero-image">
              <img src="/images/student/1.jpg" alt="Course" />
            </div>

            {/* RIGHT CONTENT */}
            <div className="course-page-hero-content">
              <div className="course-page-header">
                <span className="course-page-category">Class 9</span>
                <h1>React for Beginners</h1>
              </div>

              {/* RATINGS */}
              <div className="course-page-rating">
                <StarRating value={4} readOnly />
                <span>(120 reviews)</span>
              </div>

              {/* KEY POINTS */}
              <ul className="course-page-keypoints">
                {keyPoints.map((text, index) => (
                  <li className="course-page-keypoint" key={index}>
                    <BulletPoint />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* DESCRIPTION — SAME BOX */}
          <div className="course-page-description">
            <h3>Course Description</h3>
            <p>
              This course is designed to help learners build strong fundamentals
              through well-structured lessons. Each chapter focuses on clear
              explanations and practical understanding, allowing you to progress
              at your own pace while tracking your learning journey.
              This course is designed to help learners build strong fundamentals
              through well-structured lessons. Each chapter focuses on clear
              explanations and practical understanding, allowing you to progress
              at your own pace while tracking your learning journey.
            </p>
          </div>
          {/* CURRICULUM + VIDEO (INSIDE SAME BOX) */}
          <ChapterPage/>
        </div>
      </div>
      {showRating && (
        <RatingPage onClose={() => setShowRating(false)} />
      )}
    </>
  );
};

export default CoursePage;
