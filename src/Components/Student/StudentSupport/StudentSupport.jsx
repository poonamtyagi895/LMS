import { useEffect, useState } from "react";
import "./StudentSupport.css";

import DotButton from "../../CustomComponents/Buttons/DotButton/DotButton";
import AddButton from "../../CustomComponents/Buttons/AddButton/AddButton";
import DeleteButton from "../../CustomComponents/Buttons/DeleteButton/DeleteButton";
import SegmentedTabs from "../../CustomComponents/SegmentedTabs/SegmentedTabs";
import ConfirmationCard from "../../CustomComponents/ConfirmationCard/ConfirmationCard";
import JumpLoader from "../../CustomComponents/Loaders/JumpLoader/JumpLoader";
import { showToast } from "../../CustomComponents/CustomToast/CustomToast";

const suggestions = [
  "Help me plan a game night with my friends.",
  "How can I improve my public speaking skills?",
  "Latest web development trends?",
  "Write JS code to sum array elements.",
];

const teachers = ["Poonam Tyagi", "Tyagi", "Pooja"];

const StudentSupport = () => {
  const [mode, setMode] = useState("ai");

  const [aiMessages, setAiMessages] = useState([]);
  const [aiInput, setAiInput] = useState("");

  const [teacherChats, setTeacherChats] = useState({});
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [teacherInput, setTeacherInput] = useState("");

  const [showTeacherPopup, setShowTeacherPopup] = useState(false);
  const [tempTeacher, setTempTeacher] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const tabs = [
    { label: "AI Assistant", value: "ai" },
    { label: "Teachers Support", value: "teacher" },
  ];

  useEffect(() => {
    if (mode === "teacher" && !selectedTeacher) {
      setTempTeacher("");
      setShowTeacherPopup(true);
    }
  }, [mode, selectedTeacher]);

  const messages =
    mode === "ai"
      ? aiMessages
      : teacherChats[selectedTeacher] || [];

  const input = mode === "ai" ? aiInput : teacherInput;

  const setInput = (v) =>
    mode === "ai" ? setAiInput(v) : setTeacherInput(v);

  const sendMessage = (text = null) => {
    const finalText = text || input;
    if (!finalText.trim()) return;

    const userMsg = { type: "user", text: finalText };
    const botMsg =
      mode === "ai"
        ? { type: "bot", text: "I’m your AI assistant 🙂" }
        : { type: "bot", text: `${selectedTeacher} will reply soon 👨‍🏫` };

    if (mode === "ai") {
      setAiMessages((p) => [...p, userMsg, botMsg]);
      setAiInput("");
    } else {
      setTeacherChats((prev) => ({
        ...prev,
        [selectedTeacher]: [
          ...(prev[selectedTeacher] || []),
          userMsg,
          botMsg,
        ],
      }));
      setTeacherInput("");
    }
  };

  const askDelete = () => {
    if (messages.length === 0) {
      showToast("warning", "No chats to delete");
      return;
    }
    setShowConfirm(true);
  };

  const handleDelete = () => {
    setShowLoader(true);

    setTimeout(() => {
      if (mode === "ai") setAiMessages([]);
      else {
        setTeacherChats((prev) => ({
          ...prev,
          [selectedTeacher]: [],
        }));
      }

      setShowLoader(false);
      setShowConfirm(false);
      showToast("info", "Chat deleted");
    }, 600);
  };

  return (
    <div className="student-support-page">

      {showLoader && <JumpLoader />}

      {/* HEADER */}
      <div className="student-support-header">
        <h1 className="student-support-title">Student Support</h1>
        <p className="student-support-subtitle">
          Talk with AI or get help from teachers
        </p>
      </div>

      <SegmentedTabs tabs={tabs} activeValue={mode} onChange={setMode} />

      <div className="student-support-layout">

        {/* TEACHER SIDEBAR */}
        {mode === "teacher" && (
          <div className="student-support-teacher-sidebar">
            <h3>Teachers</h3>

            <ul className="student-support-teacher-list">
              {Object.keys(teacherChats).map((teacher) => (
                <li
                  key={teacher}
                  className={`student-support-teacher-item ${
                    selectedTeacher === teacher ? "active" : ""
                  }`}
                  onClick={() => setSelectedTeacher(teacher)}
                >
                  {teacher}
                </li>
              ))}
            </ul>

            <AddButton
              label="Add Teacher"
              onClick={() => {
                setTempTeacher("");
                setShowTeacherPopup(true);
              }}
            />
          </div>
        )}

        {/* CHAT CARD */}
        <div className="student-support-chat-card">

          <div className="student-support-topbar">
            <h3>
              {mode === "ai"
                ? "🤖 AI Assistant"
                : `👨‍🏫 ${selectedTeacher || "Teacher Support"}`}
            </h3>
            <DeleteButton onClick={askDelete} />
          </div>

          <div className="student-support-messages">

            {messages.length === 0 ? (
              <div className="student-support-empty">
                <div className="student-support-hero">
                  <h1>Hello, <span>there</span></h1>
                  <p>
                    {mode === "ai"
                      ? "How can I help you today?"
                      : "Ask your teacher anything"}
                  </p>
                </div>

                {mode === "ai" && (
                  <div className="student-support-suggestions">
                    {suggestions.map((text, i) => (
                      <div
                        key={i}
                        className="student-support-suggestion-card"
                        onClick={() => sendMessage(text)}
                      >
                        {text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`student-support-msg ${
                    msg.type === "user"
                      ? "student-support-user-msg"
                      : "student-support-bot-msg"
                  }`}
                >
                  {msg.text}
                </div>
              ))
            )}
          </div>

          <div className="student-support-input-row">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                mode === "ai"
                  ? "Ask AI anything..."
                  : "Message your teacher..."
              }
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <DotButton label="Send" onClick={() => sendMessage()} />
          </div>
        </div>
      </div>

      {/* DELETE */}
      {showConfirm && (
        <ConfirmationCard
          message="Delete all chats?"
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {/* TEACHER POPUP */}
      {showTeacherPopup && (
        <ConfirmationCard
          title="Select Teacher"
          message={
            <div className="student-support-teacher-popup">
              <select
                value={tempTeacher}
                onChange={(e) => setTempTeacher(e.target.value)}
              >
                <option value="">Choose teacher</option>
                {teachers.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          }
          onConfirm={() => {
            if (!tempTeacher) {
              showToast("warning", "Please select a teacher");
              return;
            }

            setSelectedTeacher(tempTeacher);
            setTeacherChats((p) => ({
              ...p,
              [tempTeacher]: p[tempTeacher] || [],
            }));

            setShowTeacherPopup(false);
            showToast("success", `Chat started with ${tempTeacher}`);
          }}
          onCancel={() => {
            setShowTeacherPopup(false);
            setMode("ai");
          }}
        />
      )}
    </div>
  );
};

export default StudentSupport;
