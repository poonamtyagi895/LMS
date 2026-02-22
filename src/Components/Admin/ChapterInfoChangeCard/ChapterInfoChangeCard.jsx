import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./ChapterInfoChangeCard.css";

import BackButton from "../../CustomComponents/Buttons/BackButton/BackButton";
import EditButton from "../../CustomComponents/Buttons/EditButton/EditButton";
import DotButton from "../../CustomComponents/Buttons/DotButton/DotButton";
import ChangeTextButton from "../../CustomComponents/Buttons/ChangeTextButton/ChangeTextButton";
import DeleteButton from "../../CustomComponents/Buttons/DeleteButton/DeleteButton";
import ConfirmationCard from "../../CustomComponents/ConfirmationCard/ConfirmationCard";
import JumpLoader from "../../CustomComponents/Loaders/JumpLoader/JumpLoader";
import { showToast } from "../../CustomComponents/CustomToast/CustomToast";
import ProgressBarLoader from "../../CustomComponents/Loaders/ProgressBarLoader/ProgressBarLoader";
import CheckBoxEye from "../../CustomComponents/CheckBox/CheckBoxEye/CheckBoxEye";

const ChapterInfoChangeCard = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { chapter } = state || {};

  const [chapterData, setChapterData] = useState({
    title: chapter?.title || "",
    description: chapter?.description || "",
    video: null,
    freePreview: false,
    published: chapter?.published || false,
  });

  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [confirmType, setConfirmType] = useState(null);

  const mandatory = ["title", "description", "video"];
  const completed = mandatory.filter((f) => chapterData[f]).length;

  const startEdit = (field) => {
    setEditField(field);
    setTempValue(chapterData[field] || "");
  };

  const saveEdit = () => {
    setShowLoader(true);
    setTimeout(() => {
      setChapterData({ ...chapterData, [editField]: tempValue });
      setEditField(null);
      setTempValue("");
      setShowLoader(false);
      showToast("success", "Chapter updated");
    }, 500);
  };

  const handleVideoSelect = (file) => {
    if (!file) return;

    setIsUploadingVideo(true);

    setTimeout(() => {
      setTempValue(file);
      setIsUploadingVideo(false);
      showToast("success", "Video uploaded");
    }, 900);
  };


  return (
    <div className="chapter-info-change-page">
      {showLoader && <JumpLoader />}

      {/* HEADER */}
      <div className="chapter-info-change-topbar">
        <BackButton onClick={() => navigate(-1)} />
        <div className="chapter-info-change-actions">
          <ChangeTextButton
            isActive={chapterData.published}
            beforeText="Unpublished"
            afterText="Published"
            onClick={() => setConfirmType("publish")}
          />
          <DeleteButton onClick={() => setConfirmType("delete")} />
        </div>
      </div>

      <h1 className="chapter-info-change-heading">Chapter Creation</h1>
      <p className="chapter-info-change-subheading">
        Complete all fields ({completed}/{mandatory.length})
      </p>

      <div className="chapter-info-change-content">
        {/* LEFT */}
        <div>
          {/* CUSTOMIZE */}
          <div className="chapter-info-change-section-title">
            <span className="chapter-info-change-icon">
              <i className="fa-solid fa-sliders"></i>
            </span>
            Customize your chapter
          </div>

          {/* TITLE */}
          <div className="chapter-info-change-card">
            <div className="chapter-info-change-card-header">
              <label>Chapter title</label>
              {editField !== "title" && (
                <EditButton onClick={() => startEdit("title")} />
              )}
            </div>

            {editField === "title" ? (
              <>
                <input
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                />
                <div className="chapter-info-change-edit-actions">
                  <DotButton label="Save" onClick={saveEdit} />
                  <button
                    className="chapter-info-change-cancel"
                    onClick={() => setEditField(null)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <p
                className={`chapter-info-change-value ${
                  !chapterData.title ? "chapter-info-change-placeholder" : ""
                }`}
              >
                {chapterData.title || "No title"}
              </p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="chapter-info-change-card">
            <div className="chapter-info-change-card-header">
              <label>Chapter description</label>
              {editField !== "description" && (
                <EditButton onClick={() => startEdit("description")} />
              )}
            </div>

            {editField === "description" ? (
              <>
                <textarea
                  rows="4"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                />
                <div className="chapter-info-change-edit-actions">
                  <DotButton label="Save" onClick={saveEdit} />
                  <button
                    className="chapter-info-change-cancel"
                    onClick={() => setEditField(null)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <p
                className={`chapter-info-change-value ${
                  !chapterData.description ? "chapter-info-change-placeholder" : ""
                }`}
              >
                {chapterData.description || "No description"}
              </p>
            )}
          </div>

          {/* ACCESS */}
          <div className="chapter-info-change-section-title">
            <span className="chapter-info-change-icon">
              <i className="fa-solid fa-eye"></i>
            </span>
            Access Settings
          </div>

          <div className="chapter-info-change-card">
            <div className="chapter-info-change-card-header">
              <label>Free preview chapter</label>
              <EditButton onClick={() => setEditField("freePreview")} />
            </div>

            {editField === "freePreview" ? (
              <>
                <div className="chapter-free-preview-row">
                  <CheckBoxEye
                    checked={!chapterData.freePreview}
                    onChange={(e) =>
                      setChapterData({
                        ...chapterData,
                        freePreview: !e.target.checked,
                      })
                    }
                  />
                  <p className="chapter-free-preview-text">
                    Check this box if you want to make this chapter free for preview
                  </p>
                </div>

                <div className="chapter-info-change-edit-actions">
                  <DotButton
                    label="Save"
                    onClick={() => {
                      setEditField(null);
                      showToast("success", "Access updated");
                    }}
                  />
                  <button
                    className="chapter-info-change-cancel"
                    onClick={() => setEditField(null)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <p className="chapter-info-change-value">
                {chapterData.freePreview
                  ? "This chapter is free"
                  : "This chapter is not free"}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <div className="chapter-info-change-section-title">
            <span className="chapter-info-change-icon">
              <i className="fa-solid fa-video"></i>
            </span>
            Add a video
          </div>

          <div className="chapter-info-change-card">
            <div className="chapter-info-change-card-header">
              <label>Chapter video</label>
              {!editField && (
                <EditButton onClick={() => setEditField("video")} />
              )}
            </div>

            {/* ===== VIEW MODE ===== */}
            {editField !== "video" && (
              <p className="chapter-info-change-value">
                {chapterData.video ? (
                  <video
                    src={URL.createObjectURL(chapterData.video)}
                    controls
                    className="chapter-video-preview"
                  />
                ) : (
                  <i className="chapter-info-change-placeholder">No video uploaded</i>
                )}
              </p>
            )}
            {/* ===== EDIT MODE ===== */}
            {editField === "video" && (
              <>
                {/* PROGRESS */}
                {isUploadingVideo && <ProgressBarLoader />}

                {/* UPLOAD BOX */}
                {!isUploadingVideo && !tempValue && (
                  <div
                    className="chapter-video-upload-box"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      handleVideoSelect(e.dataTransfer.files[0]);
                    }}
                  >
                    <input
                      type="file"
                      hidden
                      accept="video/*"
                      id="chapterVideoInput"
                      onChange={(e) => handleVideoSelect(e.target.files[0])}
                    />
                    <label htmlFor="chapterVideoInput">
                      <p><b>Choose files</b> or drag and drop</p>
                      <span>Video (512MB)</span>
                    </label>
                  </div>
                )}

                {/* VIDEO PREVIEW (after upload) */}
                {!isUploadingVideo && tempValue && (
                  <video
                    src={URL.createObjectURL(tempValue)}
                    controls
                    className="chapter-video-preview"
                  />
                )}

                <p className="chapter-video-hint">
                  Upload this chapter&apos;s video
                </p>

                {/* ACTIONS */}
                <div className="chapter-info-change-edit-actions">
                  <DotButton
                    label="Save"
                    onClick={() => {
                      setShowLoader(true);
                      setTimeout(() => {
                        setChapterData({ ...chapterData, video: tempValue });
                        setTempValue(null);
                        setEditField(null);
                        setShowLoader(false);
                        showToast("success", "Video saved");
                      }, 600);
                    }}
                  />
                  <button
                    className="chapter-info-change-cancel"
                    onClick={() => {
                      setEditField(null);
                      setTempValue(null);
                      setIsUploadingVideo(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* CONFIRMATIONS */}
      {confirmType === "publish" && (
        <ConfirmationCard
          message={
            chapterData.published
              ? "Unpublish this chapter?"
              : "Publish this chapter?"
          }
          onConfirm={() => {
            setChapterData({
              ...chapterData,
              published: !chapterData.published,
            });
            showToast(
              chapterData.published ? "warning" : "success",
              chapterData.published
                ? "Chapter unpublished"
                : "Chapter published"
            );
            setConfirmType(null);
          }}
          onCancel={() => setConfirmType(null)}
        />
      )}

      {confirmType === "delete" && (
        <ConfirmationCard
          message="Delete this chapter?"
          onConfirm={() => {
            showToast("info", "Chapter deleted");
            navigate(-1);
          }}
          onCancel={() => setConfirmType(null)}
        />
      )}
    </div>
  );
};

export default ChapterInfoChangeCard;
