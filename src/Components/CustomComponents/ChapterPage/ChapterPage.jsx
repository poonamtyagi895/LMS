import "./ChapterPage.css";

const ChapterPage = () => {
  return (
    <div className="chapter-page">
      {/* LEFT: CHAPTERS */}
      <div className="chapter-page-chapters">
        <h3>Course Curriculum</h3>
        <p className="chapter-page-chapters-count">4 Chapters</p>

        <ul className="chapter-page-chapter-menu">
          <li className="chapter-page-chapter-item active">
            <i className="fas fa-play-circle"></i>
            <span>Introduction to HTML</span>
          </li>

          <li className="chapter-page-chapter-item">
            <i className="fas fa-lock"></i>
            <span>Create Vite Project</span>
          </li>

          <li className="chapter-page-chapter-item">
            <i className="fas fa-lock"></i>
            <span>Free</span>
          </li>

          <li className="chapter-page-chapter-item">
            <i className="fas fa-lock"></i>
            <span>Free1</span>
          </li>
        </ul>
      </div>

      {/* RIGHT: VIDEO */}
      <div className="chapter-page-video">
        <div className="chapter-page-video-player">
          <p>Select a preview lecture to watch</p>
        </div>

        <div className="chapter-page-video-title">
          <strong>Lecture Title</strong>
          <span>Complete HTML Course</span>
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;
