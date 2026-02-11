import { useState } from "react";
import "./ChapterPage.css";

import ChangeTextButton from "../Buttons/ChangeTextButton/ChangeTextButton";
import JumpLoader from "../Loaders/JumpLoader/JumpLoader";
import { showToast } from "../CustomToast/CustomToast";

const chaptersData = [
  {
    id: 1,
    title: "Introduction to HTML",
    video: "/videos/v1.mp4",
  },
  {
    id: 2,
    title: "Create Vite Project",
    video: "/videos/v2.mov",
  },
];

const ChapterPage = () => {
  const [activeChapter, setActiveChapter] = useState(chaptersData[0]);
  const [completedChapters, setCompletedChapters] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  const isCompleted = (id) => completedChapters.includes(id);

  const runWithLoader = (cb) => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      cb();
    }, 500);
  };

  const toggleCompleted = () => {
    runWithLoader(() => {
      if (isCompleted(activeChapter.id)) {
        setCompletedChapters(
          completedChapters.filter((id) => id !== activeChapter.id)
        );
        showToast("info", "Marked as not completed");
      } else {
        setCompletedChapters([...completedChapters, activeChapter.id]);
        showToast("success", "Chapter completed");
      }
    });
  };

  const handleVideoEnd = () => {
    if (!isCompleted(activeChapter.id)) {
      setCompletedChapters([...completedChapters, activeChapter.id]);
      showToast("success", "Chapter completed");
    }
  };

  return (
    <div className="chapter-page">
      {showLoader && <JumpLoader />}

      {/* LEFT */}
      <div className="chapter-page-chapters">
        <h3>Course Curriculum</h3>
        <p className="chapter-page-chapters-count">
          {chaptersData.length} Chapters
        </p>

        <ul className="chapter-page-chapter-menu">
          {chaptersData.map((chapter) => (
            <li
              key={chapter.id}
              className={`chapter-page-chapter-item ${
                activeChapter.id === chapter.id ? "active" : ""
              }`}
              onClick={() => setActiveChapter(chapter)}
            >
              <i
                className={`fas ${
                  isCompleted(chapter.id)
                    ? "fa-check-circle"
                    : "fa-play-circle"
                }`}
              ></i>
              <span>{chapter.title}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="chapter-page-video">
        <div className="chapter-page-video-player">
          <video
            key={activeChapter.video}
            src={activeChapter.video}
            controls
            width="100%"
            height="100%"
            onEnded={handleVideoEnd}
          />
        </div>

        <div className="chapter-page-video-title">
          <div className="chapter-page-video-title-row">
            <strong>{activeChapter.title}</strong>

            <ChangeTextButton
              isActive={isCompleted(activeChapter.id)}
              beforeText="Not Completed"
              afterText="Completed"
              onClick={toggleCompleted}
            />
          </div>

          <span>React for Beginners</span>
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;
