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
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAnElEQVR4nO2VQQqAMAwE97HqF7x69AeJD+rB39gXrFQ8iNCSBAQRAzm1yxx2w4KKgYpMBRubKehxjktzflwpmKurx/t2Adg1B00woTEUTOXfBWDX/AALoLidqBirK0g3kx0AQV/EzcgJNi7oQoDI8FUAxi6ZPpP9l8ynY5rNyQsBxJG8dyUiMkEPBk8fxEzWvw++3gfZfsmRPnBodsWDodNMPfi7AAAAAElFTkSuQmCC" alt="external-desktop-application-templates-bar-label-style-page-basic-regular-tal-revivo"/>
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
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAcUlEQVR4nO3YwQmAQAxE0em/ArsdO1AEXRbzHuS2EPi3bAIAcKNHejX5uwqQRwHu3n89ArytAkSArly4m04PAAAAzNTpx1AFiA+RChABKkDWLNxNpwcAAABm6vRjqALEh0gFiAAVIGsW7qbTAwAA+ZsTnlzRzEvmUXoAAAAASUVORK5CYII=" alt="list"/>
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
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFIElEQVR4nO1aW4xeUxT+ULcqOu3ULe48UCJ94IUgqVsbqWtCKo0HNPogaY0nD4wXQV2Syfz/WfvMdDKUeKgHD9QlkVBEyww6LmFUNYRGtJGWoFR8svbe558z0/9yLvt0RLqSSWem+19rfXutva4DHKD/KbEPxzDCzRQ8SsHLFIxT8BMN9lDwJw1+puALGqynweMUXM8IXdUqJdhEwXsdz8U4lIKlFLxBwV80YK4vwd8UvE6DZezD4eGBeEEt/38dDqNBDwXbU4rtpcGbNOi1lolxDocwTxW0gCN0sY5zGeMGCh70Z/ekQP1geQ7jiP0ChDGupcGWFIAxCpYXcRMOY7b9rMFoCtDXjLG4MiB6UxTUKPjHC/wsmEAncxEFH6cuqF7aOlOBMMJxFIz43+vjvZe9mBECwCS563AIBStp8Lu/rBEO4vggQCg4nQZf+d9t4QAWhFS+qfw6LrBRb0LmGcUYJeaN0Z1iOKqWCa51Kx0idNHgXS97K2s4IT+TiYe3yf/7Adfg6Eo0bqfHWhyV0mEk95uZEu+3lvHTTqG84+f7MTflFfVCwjMktHeqBtJ4M0kAMFiErJQjO7+dlVdm4S2IBqsajz9k0mxHFFxFg+esW06A/oiCh4rWV+zFDBps9rxWhdc6LSzGTBq80MGK33EA5xXkv9jz+L6S2qwhSPC0F/QrYzygCtvIE+NYxriSBhsbASTGzNz8iYMo+NCnhtuqARHhGh8Afml147aAVBcr4R4U3O3lvFpa6aYCEpeKcV8HRZZmjXgtE6Xrb/aqpRGaKPjRAzk1Q8ZWi+wsIestyyPCdUV5tGae9BZVPkJPNvo5q65GaLJ9hLPIRcGZTyEKbvRWfQmhiYInGnVZjO7gAlJko6ED8iVCEwcxhwbbGpFLm7AIl2pbHFxWjG4vZ0c1NVGMEyl4ZUo99psdTmheiXGx5oIyMlJh3DZ5qKom8rwupMFTFHzSaI0ngH3DCHeUAcR2QKoi7wY3UdBnS4sJQM8WBcO2rqWlhMFlVTZQvvBbRsEur8idwR87kyQTcDLSUhEF4zvQ4OGXgkfsjMpgSQhlO45XHZBd/8WEuMMyH8Scjmd1AuludHdBWRv855tfOgWX0GANa5iVm7kbgeot3Z7h7K1J8iyUr8QXjcOY3fxQ8k4Ey3ML0JCazHBrOK3NuTMp+NafXZlbjsEKb431rQ+5AfNqxjgrt4BeHNywilsh3M8I59toWMMsxrjcrhwMdvszG3W4nbuxMr6fydJY8UkcqTeXG4x2grob6Tx9ebFIL0E3QHftcqfSh4L5vmbaXHS+67vF5/eZ2hv06zsskYPGMruktYaWEQafso5TigitaBzU40GMZy5EWcPZdjmjPjmEeSUVKF+MDmABBX/Yui3G1UUKs7XWPfoxd9pGpkM25zgXFfQVnVGN2jI8wkJMA1GjncH7jShXdMLIfpykJbn9PsLCqju/JpZwILSNDrHSsP2FWkZNXPLNZH4TpuFO450mM/ks41Zvz9gAMICTdU0WhPm+IbbHPuzEncqs3lq+GV1LazTT0KyLywJJsylvvRyX7Ma8FbSrrFfR708OzS7PbLPgtHaKcVehQtMNLFakxqj0Y6UrqtG+edKcb7/X2swpMGh/NlhiV80pYNaSunnS2kvbXv2jAi3FXRWbANhOwT2VWqEtKFdobtAJiQfi3EOLRF03t6+5FMhrFNwybQBaEQ0es8C06p0MZCcNPrfjIsHD9gKmYcF6gLCf6F9LGCYWiUt0ygAAAABJRU5ErkJggg==" alt="refund-2"/>
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
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABeElEQVR4nO2ZwUrDQBCGf4tPog+gZ/VWfRsRWg/iKT166LmzG/RtfIjqGwiCHnspv5g2kASVZGd3iTA/zCWBmfmSzWSYAUz/QCxwSI9LOszpcBdsgmuWOM2bvMcFHV7pwEi2pWDJApNcyW8iJt+0x6QQ1bFpPnnBJwWegocgc3jOCsHdma+T/+AKRyp/gkXWN0GP20YQp/bXBnhPDsFmQMEitj8KVh2Ip6gQyQGIg6QQqQGqa0wIkQMgKUR0gGZREPjWPSaASPAGrv4qyywwqapRrOoUHeCnH6ND2emV7unw1oIQLEcBoGhNthScjAJg7/ecgpdBEB43owFoteeCWa/eKSR+SoAs8WkAOtEAxABUogGIAahEAxADUIkGIAagEg1ADEAlGoAYgEo0AP/7LDOHuJva1bOheYiDaWsMqFwxDYrtcbwfPdYA03hLPs2euJ+VneTX37mMcc3axzb0OAtKPuGiu6+t1ckPmmXGs1n1/YUeGxPy6guI6odWKpaMUwAAAABJRU5ErkJggg==" alt="external-File-file-tanah-basah-basic-outline-tanah-basah"/>
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
