import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./CourseInfoChangeCard.css";

import BackButton from "../../CustomComponents/Buttons/BackButton/BackButton";
import EditButton from "../../CustomComponents/Buttons/EditButton/EditButton";
import AddButton from "../../CustomComponents/Buttons/AddButton/AddButton";
import DotButton from "../../CustomComponents/Buttons/DotButton/DotButton";
import ChangeTextButton from "../../CustomComponents/Buttons/ChangeTextButton/ChangeTextButton";
import DeleteButton from "../../CustomComponents/Buttons/DeleteButton/DeleteButton";
import ConfirmationCard from "../../CustomComponents/ConfirmationCard/ConfirmationCard";
import JumpLoader from "../../CustomComponents/Loaders/JumpLoader/JumpLoader";
import { showToast } from "../../CustomComponents/CustomToast/CustomToast";
import ProgressBarLoader from "../../CustomComponents/Loaders/ProgressBarLoader/ProgressBarLoader"

/* MOCK DATA */
const MOCK_COURSES = {
  1: {
    title: "React for Beginners",
    description: "Learn React from scratch",
    keypoints: [
      "10+ hours of video content",
      "Lifetime access to course materials",
    ],
    category: "Class 6",
    price: "1999",
    image: "/images/bg9.jpg",
    published: true,
    chapters: [],
    attachments: [],
  },
  2: {
    title: "Advanced JavaScript",
    description: "Deep dive into advanced JavaScript concepts",
    keypoints: [
      "10+ hours of video content",
      "Lifetime access to course materials",
    ],
    category: "Class 8",
    price: "2499",
    image: "/images/bg9.jpg",
    published: false,
    chapters: [],
    attachments: [],
  },
  3: {
    title: "UI/UX Design Basics",
    description: "Understand UI/UX principles and design thinking",
    keypoints: [
      "10+ hours of video content",
      "Lifetime access to course materials",
    ],
    category: "Class 10",
    price: "1499",
    image: "/images/bg9.jpg",
    published: true,
    chapters: [],
    attachments: [],
  },
};

const CATEGORIES = Array.from({ length: 10 }, (_, i) => `Class ${i + 1}`);

const CourseInfoChangeCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [course, setCourse] = useState(
    isEdit && MOCK_COURSES[id]
      ? MOCK_COURSES[id]
      : {
          title: "",
          description: "",
          keypoints: [],
          category: "",
          price: "",
          image: null,
          published: false,
          chapters: [],
          attachments: [],
        }
  );

  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [confirmType, setConfirmType] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingAttachment, setIsUploadingAttachment] = useState(false);
  const [dragIndex, setDragIndex] = useState(null);
  const [isAddingChapter, setIsAddingChapter] = useState(false);
  const [newChapterName, setNewChapterName] = useState("");
  const [newKeypoint, setNewKeypoint] = useState("");
  const [editingKeypoints, setEditingKeypoints] = useState(false);

  const runWithLoader = (cb) => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      cb();
    }, 500);
  };

  const mandatoryFields = ["title", "description", "category", "price", "image"];
  const completed = mandatoryFields.filter((f) => course[f]).length;

  const startEdit = (field) => {
    setEditField(field);

    if (field === "image") {
      setTempValue(null);
    } else if (field === "price") {
      setTempValue(Number(course.price) || 0);
    } else {
      setTempValue(course[field] || "");
    }
  };

  const saveEdit = () => {
    if (editField === "image" && !tempValue) {
      showToast("error", "Please select an image");
      return;
    }

    runWithLoader(() => {
      setCourse({ ...course, [editField]: tempValue });
      setEditField(null);
      setTempValue("");
      showToast("success", "Field updated");
    });
  };

  const handleImageUpload = (file) => {
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      showToast("error", "File size must be less than 4MB");
      return;
    }

    setIsUploadingImage(true);

    // fake upload delay
    setTimeout(() => {
      setTempValue(file);
      setIsUploadingImage(false); 
      showToast("success", "Image uploaded");
    }, 800);
  };

  const handleAddAttachments = (files) => {
    if (!files || files.length === 0) return;

    // LIMIT ONLY WHILE CHOOSING
    if (files.length > 3) {
      showToast("error", "You can select maximum 3 files at a time");
      return;
    }

    setIsUploadingAttachment(true);

    setTimeout(() => {
      setCourse({
        ...course,
        attachments: [...course.attachments, ...Array.from(files)],
      });

      setIsUploadingAttachment(false);
      showToast("success", "Attachment(s) uploaded");
    }, 700);
  };

  const handleDeleteAttachment = (index) => {
    runWithLoader(() => {
      const updated = course.attachments.filter((_, i) => i !== index);
      setCourse({ ...course, attachments: updated });
      showToast("info", "Attachment removed");
    });
  };

  const handleConfirmAddChapter = () => {
    if (!newChapterName.trim()) {
      showToast("error", "Chapter name is required");
      return;
    }

    setShowLoader(true);

    setTimeout(() => {
      setCourse({
        ...course,
        chapters: [
          ...course.chapters,
          {
            title: newChapterName.trim(),
            published: false,
          },
        ],
      });

      setNewChapterName("");
      setIsAddingChapter(false);
      setShowLoader(false);

      showToast("success", "Chapter added");
    }, 600);
  };

  const toggleChapterPublish = (index) => {
    const updated = [...course.chapters];
    updated[index].published = !updated[index].published;

    setCourse({ ...course, chapters: updated });

    showToast(
      updated[index].published ? "success" : "warning",
      updated[index].published
        ? "Chapter published"
        : "Chapter unpublished"
    );
  };

  /* DRAG & DROP */
  const handleDragStart = (index) => setDragIndex(index);

  const handleDrop = (index) => {
    if (dragIndex === null) return;

    const updated = [...course.chapters];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(index, 0, moved);

    setCourse({ ...course, chapters: updated });
    setDragIndex(null);

    showToast("info", "Chapters reordered");
  };

  return (
    <div className="course-info-change-page">
      {showLoader && <JumpLoader />}

      {/* HEADER */}
      <div className="course-info-change-topbar">
        <BackButton onClick={() => navigate(-1)} />
        <div className="course-info-change-actions">
          <ChangeTextButton
            isActive={course.published}
            beforeText="Unpublished"
            afterText="Published"
            onClick={() => setConfirmType("publish")}
          />
          <DeleteButton onClick={() => setConfirmType("delete")} />
        </div>
      </div>

      <h1 className="course-info-change-heading">Course Creation</h1>
      <p className="course-info-change-subheading">
        Complete all fields ({completed}/{mandatoryFields.length})
      </p>

      <div className="course-info-change-content">
        {/* LEFT */}
        <div>
          <div className="course-info-change-section-title">
            <span className="course-info-change-icon">
              <i className="fa-solid fa-sliders"></i>
            </span>
            Customize your course
          </div>

          {["title", "description", "category"].map((field) => (
            <div className="course-info-change-card" key={field}>
              <div className="course-info-change-card-header">
                <label>{field.replace(/^\w/, (c) => c.toUpperCase())}</label>
                {editField !== field && (
                  <EditButton onClick={() => startEdit(field)} />
                )}
              </div>

              {editField === field ? (
                <>
                  {field === "category" ? (
                    <select
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                    >
                      <option value="">Select category</option>
                      {CATEGORIES.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  ) : field === "description" ? (
                    <textarea
                      rows="4"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                    />
                  ) : (
                    <input
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                    />
                  )}
                  <div className="course-info-change-edit-actions">
                    <DotButton label="Save" onClick={saveEdit} />
                    <button
                      className="course-info-change-cancel"
                      onClick={() => setEditField(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <p className="course-info-change-value">
                  {course[field] || <i>No {field}</i>}
                </p>
              )}
            </div>
          ))}

          {/* KEYPOINTS */}
          <div className="course-info-change-card">
            <div className="course-info-change-card-header">
              <label>Keypoints</label>

              <AddButton
                label="Add"
                onClick={() => setEditingKeypoints(true)}
              />
            </div>

            {/* VIEW MODE */}
            {!editingKeypoints && (
              <>
                {course.keypoints.length === 0 ? (
                  <p className="course-info-change-value">
                    <i>No keypoints added</i>
                  </p>
                ) : (
                  <ul className="course-keypoints-list">
                    {course.keypoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                )}
              </>
            )}

            {/* EDIT MODE */}
            {editingKeypoints && (
              <>
                {/* EXISTING KEYPOINTS */}
                {course.keypoints.map((point, index) => (
                  <div key={index} className="course-keypoint-item">
                    <span>{point}</span>
                    <DeleteButton
                      onClick={() =>
                        setCourse({
                          ...course,
                          keypoints: course.keypoints.filter((_, i) => i !== index),
                        })
                      }
                    />
                  </div>
                ))}

                {/* INPUT */}
                <div className="course-keypoint-add">
                  <input
                    placeholder="Enter keypoint (e.g. 10+ hours of video content)"
                    value={newKeypoint}
                    onChange={(e) => setNewKeypoint(e.target.value)}
                  />
                </div>

                {/* ACTIONS (same position as Save earlier) */}
                <div className="course-info-change-edit-actions">
                  <DotButton
                    label="Add"
                    onClick={() => {
                      if (!newKeypoint.trim()) {
                        showToast("error", "Keypoint cannot be empty");
                        return;
                      }

                      setShowLoader(true);

                      setTimeout(() => {
                        setCourse({
                          ...course,
                          keypoints: [...course.keypoints, newKeypoint.trim()],
                        });

                        setNewKeypoint("");
                        setEditingKeypoints(false); // 👈 HIDE INPUT + BUTTONS
                        setShowLoader(false);

                        showToast("success", "Keypoint added");
                      }, 500);
                    }}
                  />

                  <button
                    className="course-info-change-cancel"
                    onClick={() => {
                      setEditingKeypoints(false);
                      setNewKeypoint("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>

          {/* IMAGE */}
          <div className="course-info-change-card">
            <div className="course-info-change-card-header">
              <label>Course Image</label>
              {editField !== "image" && (
                <EditButton onClick={() => startEdit("image")} />
              )}
            </div>

            {/* VIEW MODE */}
            {editField !== "image" && (
              <div className="course-info-change-value">
                {course.image ? (
                  <img
                    src={
                      typeof course.image === "string"
                        ? course.image
                        : URL.createObjectURL(course.image)
                    }
                    className="course-info-change-image"
                    alt=""
                  />
                ) : (
                  <i>No image uploaded</i>
                )}
              </div>
            )}

            {/* EDIT MODE */}
            {editField === "image" && (
              <>
                {/* PROGRESS BAR */}
                {isUploadingImage && <ProgressBarLoader />}

                {/* UPLOAD BOX (before upload) */}
                {!isUploadingImage && !tempValue && (
                  <div
                    className="course-image-upload-box"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      handleImageUpload(e.dataTransfer.files[0]);
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      id="courseImageInput"
                      onChange={(e) => handleImageUpload(e.target.files[0])}
                    />

                    <label
                      htmlFor="courseImageInput"
                      className="course-image-upload-content"
                    >
                      <p><b>Choose files</b> or drag and drop</p>
                      <span>Image (4MB)</span>
                    </label>
                  </div>
                )}

                {/* IMAGE PREVIEW (after upload) */}
                {!isUploadingImage && tempValue instanceof File && (
                  <img
                    src={URL.createObjectURL(tempValue)}
                    className="course-info-change-image"
                    alt=""
                  />
                )}

                <p className="course-image-hint">
                  16:9 aspect ratio recommended
                </p>

                <div className="course-info-change-edit-actions">
                  <DotButton label="Save" onClick={saveEdit} />
                  <button
                    className="course-info-change-cancel"
                    onClick={() => {
                      setEditField(null);
                      setTempValue("");
                      setIsUploadingImage(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}

          </div>
        </div>

        {/* RIGHT */}
        <div>
          {/* CHAPTERS */}
          <div className="course-info-change-section-title">
            <span className="course-info-change-icon">
              <i className="fa-solid fa-list-ul"></i>
            </span>
            Course chapters
          </div>

          <div className="course-info-change-card">
            {/* SUB HEADER */}
            <div className="course-info-change-card-header">
              <label>Course Chapters</label>
              <AddButton label="Add new" onClick={() => setIsAddingChapter(true)} />
            </div>

            {/* ADD CHAPTER INPUT */}
            {isAddingChapter && (
              <div style={{ marginTop: "10px" }}>
                <input
                  placeholder="Enter chapter name"
                  value={newChapterName}
                  onChange={(e) => setNewChapterName(e.target.value)}
                />

                <div className="course-info-change-edit-actions">
                  <DotButton label="Add" onClick={handleConfirmAddChapter} />
                  <button
                    className="course-info-change-cancel"
                    onClick={() => {
                      setIsAddingChapter(false);
                      setNewChapterName("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* CHAPTER LIST */}
            {course.chapters.map((chapter, index) => (
              <div
                key={index}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(index)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "#f9fafb",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  marginTop: "10px",
                }}
              >
                {/* DRAG ICON (ONLY THIS IS DRAGGABLE) */}
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAApElEQVR4nO3ZMQrDMAxG4f8g6Vhy92Jys0LtC6gUvFSblJSo5D3waKzP4MkSEVHlbpKapCHJgssX3T8kbZLWPcM/EwcfBbC5PjMsGUDbceiRAJP0yABGIUDPAKwQwAAIgABEA+ACEA2AC8DlAERXz/79ERuA7wBEA+ACEA2AC0A0AGcDRiHAKwPYCgFaBrAW+uC4K9kyPxf6CYA+bz49PBGRft4bOfnt9zhpsywAAAAASUVORK5CYII="
                  alt="drag"
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  style={{ cursor: "grab", width: "18px" }}
                />

                {/* NAME */}
                <span style={{ flex: 1 }}>{chapter.title}</span>

                {/* PUBLISH */}
                <ChangeTextButton
                  isActive={chapter.published}
                  beforeText="Unpublished"
                  afterText="Published"
                  onClick={() => toggleChapterPublish(index)}
                />

                {/* EDIT */}
                <EditButton
                  onClick={() =>
                    navigate(`/admin/manage-courses/${id}/chapters/${index}`, {
                      state: {
                        courseId: id,
                        chapterIndex: index,
                        chapter: chapter,
                      },
                    })
                  }
                />
              </div>
            ))}

            {/* HELPER TEXT */}
            <p className="course-image-hint" style={{ marginTop: "10px" }}>
              Drag and drop to reorder chapters
            </p>
          </div>


          {/* PRICE */}
          <div className="course-info-change-section-title">
            <span className="course-info-change-icon">
              <i className="fa-solid fa-dollar-sign"></i>
            </span>
            Sell your course
          </div>

          <div className="course-info-change-card">
            <div className="course-info-change-card-header">
              <label>Course price</label>
              {editField !== "price" && (
                <EditButton onClick={() => startEdit("price")} />
              )}
            </div>

            {editField === "price" ? (
              <>
                <div className="price-input-wrapper">
                  <input
                    type="number"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    min="0"
                    step="1"
                  />
                </div>

                <div className="course-info-change-edit-actions">
                  <DotButton label="Save" onClick={saveEdit} />
                  <button
                    className="course-info-change-cancel"
                    onClick={() => setEditField(null)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <p className="course-info-change-value">
                {course.price || <i>No price</i>}
              </p>
            )}
          </div>

          {/* ATTACHMENTS */}
          <div className="course-info-change-section-title">
            <span className="course-info-change-icon">
              <i className="fa-solid fa-paperclip"></i>
            </span>
            Resources & Attachments
          </div>

          <div className="course-info-change-card">
            {/* HEADER LIKE "COURSE PRICE" */}
            <div className="course-info-change-card-header">
              <label>Course Attachments</label>

              <AddButton
                label="Add"
                onClick={() =>
                  document.getElementById("attachmentInput").click()
                }
              />
            </div>

            {/* HIDDEN FILE INPUT */}
            <input
              type="file"
              hidden
              id="attachmentInput"
              multiple
              accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
              onChange={(e) => handleAddAttachments(e.target.files)}
            />

            {/* LOADER */}
            {isUploadingAttachment && <ProgressBarLoader />}

            {/* EMPTY STATE */}
            {!isUploadingAttachment && course.attachments.length === 0 && (
              <p className="course-info-change-value">
                <i>No attachments yet</i>
              </p>
            )}

            {/* ATTACHMENT LINE ITEMS */}
            {course.attachments.map((file, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "10px",
                  background: "var(--input-background)",
                  padding: "8px 12px",
                  borderRadius: "8px",
                }}
              >
                <span style={{ fontSize: "13px" }}>{file.name}</span>

                <DeleteButton
                  onClick={() => handleDeleteAttachment(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONFIRMATIONS */}
      {confirmType === "publish" && (
        <ConfirmationCard
          message={
            course.published
              ? "Do you want to unpublish this course?"
              : "Do you want to publish this course?"
          }
          onConfirm={() =>
            runWithLoader(() => {
              setCourse({ ...course, published: !course.published });
              showToast(
                course.published ? "warning" : "success",
                course.published
                  ? "This course is unpublished. It will not be visible to students."
                  : "Course published successfully"
              );
              setConfirmType(null);
            })
          }
          onCancel={() => setConfirmType(null)}
        />
      )}

      {confirmType === "delete" && (
        <ConfirmationCard
          message="You want to delete this course."
          onConfirm={() =>
            runWithLoader(() => {
              showToast("info", "Course deleted");
              navigate(-1);
            })
          }
          onCancel={() => setConfirmType(null)}
        />
      )}
    </div>
  );
};

export default CourseInfoChangeCard;
