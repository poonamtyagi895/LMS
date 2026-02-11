import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./TestInfoChangeCard.css";

import BackButton from "../../CustomComponents/Buttons/BackButton/BackButton";
import EditButton from "../../CustomComponents/Buttons/EditButton/EditButton";
import DotButton from "../../CustomComponents/Buttons/DotButton/DotButton";
import ChangeTextButton from "../../CustomComponents/Buttons/ChangeTextButton/ChangeTextButton";
import DeleteButton from "../../CustomComponents/Buttons/DeleteButton/DeleteButton";
import AddButton from "../../CustomComponents/Buttons/AddButton/AddButton";
import ConfirmationCard from "../../CustomComponents/ConfirmationCard/ConfirmationCard";
import JumpLoader from "../../CustomComponents/Loaders/JumpLoader/JumpLoader";
import ProgressBarLoader from "../../CustomComponents/Loaders/ProgressBarLoader/ProgressBarLoader";
import { showToast } from "../../CustomComponents/CustomToast/CustomToast";

/* MOCK DATA */
const MOCK_TESTS = {
  1: {
    title: "Maths Unit Test",
    description: "Chapter 1 to 5",
    category: "Class 6",
    testType: "Mock Test",
    duration: 60,
    marks: 100,
    uploaded: true,
    attachments: [],
  },

  2: {
    title: "Science Monthly Test",
    description: "Identify strengths & weak areas",
    category: "Class 8",
    testType: "Diagnostic Test",
    duration: 45,
    marks: 50,
    uploaded: false,
    attachments: [],
  },

  3: {
    title: "English Grammar Test",
    description: "Grammar and comprehension practice",
    category: "Class 10",
    testType: "Practice Test",
    duration: 30,
    marks: 40,
    uploaded: true,
    attachments: [],
  },
};


const CATEGORIES = Array.from({ length: 10 }, (_, i) => `Class ${i + 1}`);

const TestInfoChangeCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [test, setTest] = useState(
    isEdit && MOCK_TESTS[id]
        ? {
            ...MOCK_TESTS[id],
            attachments: MOCK_TESTS[id].attachments || [],
            testType: MOCK_TESTS[id].testType || "",
        }
        : {
            title: "",
            description: "",
            category: "",
            testType: "",
            duration: "",
            marks: "",
            uploaded: false,
            attachments: [],
        }
    );

  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [confirmType, setConfirmType] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [isUploadingAttachment, setIsUploadingAttachment] = useState(false);

  const runWithLoader = (cb) => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      cb();
    }, 500);
  };

  const mandatoryFields = [
    "title",
    "description",
    "category",
    "testType",
    "duration",
    "marks",
  ];
  const completed = mandatoryFields.filter((f) => test[f]).length;

  const startEdit = (field) => {
    setEditField(field);
    setTempValue(test[field] || "");
  };

  const saveEdit = () => {
    runWithLoader(() => {
      setTest({ ...test, [editField]: tempValue });
      setEditField(null);
      setTempValue("");
      showToast("success", "Field updated");
    });
  };

  const handleAddAttachments = (files) => {
    if (!files || files.length === 0) return;

    if (files.length > 3) {
        showToast("error", "You can select maximum 3 files at a time");
        return;
    }

    setIsUploadingAttachment(true);

    setTimeout(() => {
        setTest({
        ...test,
        attachments: [...test.attachments, ...Array.from(files)],
        });

        setIsUploadingAttachment(false);
        showToast("success", "Attachment(s) uploaded");
    }, 700);
    };

    const handleDeleteAttachment = (index) => {
    runWithLoader(() => {
        const updated = test.attachments.filter((_, i) => i !== index);
        setTest({ ...test, attachments: updated });
        showToast("info", "Attachment removed");
    });
    };

  return (
    <div className="test-info-change-page">
      {showLoader && <JumpLoader />}

      {/* HEADER */}
      <div className="test-info-change-topbar">
        <BackButton onClick={() => navigate(-1)} />
        <div className="test-info-change-actions">
          <ChangeTextButton
            isActive={test.uploaded}
            beforeText="Draft"
            afterText="Uploaded"
            onClick={() => setConfirmType("upload")}
          />
          <DeleteButton onClick={() => setConfirmType("delete")} />
        </div>
      </div>

      <h1 className="test-info-change-heading">Test Creation</h1>
      <p className="test-info-change-subheading">
        Complete all fields ({completed}/{mandatoryFields.length})
      </p>

      <div className="test-info-change-content">
        {/* LEFT */}
        <div>
          <div className="test-info-change-section-title">
             <span className="test-info-change-icon">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAnElEQVR4nO2VQQqAMAwE97HqF7x69AeJD+rB39gXrFQ8iNCSBAQRAzm1yxx2w4KKgYpMBRubKehxjktzflwpmKurx/t2Adg1B00woTEUTOXfBWDX/AALoLidqBirK0g3kx0AQV/EzcgJNi7oQoDI8FUAxi6ZPpP9l8ynY5rNyQsBxJG8dyUiMkEPBk8fxEzWvw++3gfZfsmRPnBodsWDodNMPfi7AAAAAElFTkSuQmCC" alt="external-desktop-application-templates-bar-label-style-page-basic-regular-tal-revivo"/>
            </span>
            Customize your test
          </div>

          {["title", "description", "category", "testType"].map((field) => (
            <div className="test-info-change-card" key={field}>
              <div className="test-info-change-card-header">
                <label>
                    {field === "testType"
                        ? "Test type"
                        : field.replace(/^\w/, (c) => c.toUpperCase())}
                </label>
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
                    ) : field === "testType" ? (
                    <select
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                    >
                        <option value="">Select test type</option>
                        <option value="Mock Test">Mock Test</option>
                        <option value="Diagnostic Test">Diagnostic Test</option>
                        <option value="Practice Test">Practice Test</option>
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
                  <div className="test-info-change-edit-actions">
                    <DotButton label="Save" onClick={saveEdit} />
                    <button
                      className="test-info-change-cancel"
                      onClick={() => setEditField(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <p className="test-info-change-value">
                  {test[field] || <i>No {field}</i>}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div>
          <div className="test-info-change-section-title">
            <span className="test-info-change-icon">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAB4ElEQVR4nOVUzS5kURD+kN6IfoJmxyTEzw6PwUIveQMeYXbsR7c6t3XCFmEjxJKVh5iFFbOZEQQZET45daqvps+9adELiZNUuk/dqq+qvqpTwLc4FCzRgW9EsNTJAJuRAJudAh+hw5mCrmFaJQQ5898+BkZ0UXBMwS4TzFFQoeDZAB+ZoFfF/w+6J7Mpq4/3Jbrysp1vocLhPwW/WMVwalfFMB1W9dt7+wQLcfAK+ig4N37X6XBKh9+sYjwzoSrG1cbbBh/ve8E6iq3GDsuWxR8mKKjuJ7r1t4YfdNij4MbE0zH0xiZBQcFDkJUYPbMU3FmQI19RE/hlhLq/FJTUpo6i+gTwOyaYiZecYIoO9zYxo1bZngHue0DW0E+HA9Ntqc0aRu1+7zEym2yV3KpxowLBjWVWauJ+wHRXaf/C/TYXPBrA4VrvNfR/OgAFky0UCXat/AOlx4MLDk23Y9SOpRQJJrP4n4k2WTCkDW1dFf9YwWBTBflN9qOVOaaCkm+o0eVlJwXfRo8lWFDfzDH1o/Y6x+09NMFE+tAc6rkPzbJYiK4Kh9XoqhA8tL0qGpRQcGKvtmz75il32YVAZfM5adDa9mHINr6um6r61KHDRoS6jY6AI/RmMcL1YscCfOnzAtieRlLpk7lPAAAAAElFTkSuQmCC" alt="settings--v1"></img>
            </span>
            Test configuration
          </div>
          {["duration", "marks"].map((field) => (
            <div className="test-info-change-card" key={field}>
              <div className="test-info-change-card-header">
                <label>
                  {field === "duration"
                    ? "Test duration (minutes)"
                    : "Total marks"}
                </label>
                {editField !== field && (
                  <EditButton onClick={() => startEdit(field)} />
                )}
              </div>

              {editField === field ? (
                <>
                  <input
                    type="number"
                    min="0"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                  />

                  <div className="test-info-change-edit-actions">
                    <DotButton label="Save" onClick={saveEdit} />
                    <button
                      className="test-info-change-cancel"
                      onClick={() => setEditField(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <p className="test-info-change-value">
                  {test[field] || <i>Not set</i>}
                </p>
              )}
            </div>
          ))}

          {/* ATTACHMENTS */}
          <div className="test-info-change-section-title">
            <span className="test-info-change-icon">
                <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABeElEQVR4nO2ZwUrDQBCGf4tPog+gZ/VWfRsRWg/iKT166LmzG/RtfIjqGwiCHnspv5g2kASVZGd3iTA/zCWBmfmSzWSYAUz/QCxwSI9LOszpcBdsgmuWOM2bvMcFHV7pwEi2pWDJApNcyW8iJt+0x6QQ1bFpPnnBJwWegocgc3jOCsHdma+T/+AKRyp/gkXWN0GP20YQp/bXBnhPDsFmQMEitj8KVh2Ip6gQyQGIg6QQqQGqa0wIkQMgKUR0gGZREPjWPSaASPAGrv4qyywwqapRrOoUHeCnH6ND2emV7unw1oIQLEcBoGhNthScjAJg7/ecgpdBEB43owFoteeCWa/eKSR+SoAs8WkAOtEAxABUogGIAahEAxADUIkGIAagEg1ADEAlGoAYgEo0AP/7LDOHuJva1bOheYiDaWsMqFwxDYrtcbwfPdYA03hLPs2euJ+VneTX37mMcc3axzb0OAtKPuGiu6+t1ckPmmXGs1n1/YUeGxPy6guI6odWKpaMUwAAAABJRU5ErkJggg=="
                alt="attachments"
                />
            </span>
            Resources & Attachments
            </div>

            <div className="test-info-change-card">
            {/* HEADER */}
            <div className="test-info-change-card-header">
                <label>Test Attachments</label>

                <AddButton
                label="Add"
                onClick={() =>
                    document.getElementById("testAttachmentInput").click()
                }
                />
            </div>

            {/* HIDDEN FILE INPUT */}
            <input
                type="file"
                hidden
                id="testAttachmentInput"
                multiple
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                onChange={(e) => handleAddAttachments(e.target.files)}
            />

            {/* PROGRESS BAR */}
            {isUploadingAttachment && <ProgressBarLoader />}

            {/* EMPTY STATE */}
            {!isUploadingAttachment && test.attachments.length === 0 && (
                <p className="test-info-change-value">
                <i>No attachments yet</i>
                </p>
            )}

            {/* ATTACHMENT ITEMS */}
            {test.attachments.map((file, index) => (
                <div
                key={index}
                className="test-info-change-attachment-row"
                >
                <span>{file.name}</span>
                <DeleteButton onClick={() => handleDeleteAttachment(index)} />
                </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONFIRMATIONS */}
      {confirmType === "upload" && (
        <ConfirmationCard
          message={
            test.uploaded
              ? "Move this test back to draft?"
              : "Upload this test?"
          }
          onConfirm={() =>
            runWithLoader(() => {
              setTest({ ...test, uploaded: !test.uploaded });
              showToast(
                test.uploaded ? "warning" : "success",
                test.uploaded ? "Test moved to draft" : "Test uploaded"
              );
              setConfirmType(null);
            })
          }
          onCancel={() => setConfirmType(null)}
        />
      )}

      {confirmType === "delete" && (
        <ConfirmationCard
          message="You want to delete this test."
          onConfirm={() =>
            runWithLoader(() => {
              showToast("info", "Test deleted");
              navigate(-1);
            })
          }
          onCancel={() => setConfirmType(null)}
        />
      )}
    </div>
  );
};

export default TestInfoChangeCard;
