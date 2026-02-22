import { useState, useEffect, useCallback, useRef } from "react";
import "./StudentSupport.css";
import DotButton from "../../CustomComponents/Buttons/DotButton/DotButton";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { showToast } from "../../CustomComponents/CustomToast/CustomToast";
import CopyButton from "../../CustomComponents/Buttons/CopyButton/CopyButton";
import ScrollDownButton from "../../CustomComponents/Buttons/ScrollDownButton/ScrollDownButton";
import JumpLoader from "../../CustomComponents/Loaders/JumpLoader/JumpLoader"
import ConfirmationCard from "../../CustomComponents/ConfirmationCard/ConfirmationCard";
import RollingEyes from "../../CustomComponents/RollingEyes/RollingEyes";
import QueryPopup from "./QueryPopup/QueryPopup";
import BounceLoader from "../../CustomComponents/Loaders/BounceLoader/BounceLoader";

const profileLottie =
  "https://lottie.host/f2ffc4a9-3e7d-4eee-95f7-4aeaac63e5da/y0dA0Bl62z.lottie";

const initialStaticSuggestions = [
  "Payment related",
  "Course access",
  "Technical issue",
  "Certificate help"
];

const allSuggestions = [
  "Course content issue","Video not loading","Assignment doubt","Exam query",
  "Payment failed","Refund status","Certificate issue","Course expired",
  "Login problem","Forgot password","App crashing","Download notes",
  "Quiz not submitting","Test marks issue","Audio problem","Subtitles missing",
  "Project help","Assignment upload","UI bug","Slow buffering",
  "Network error","Teacher support","Course access","Resource missing",
  "Invalid payment","Wrong certificate","Video lagging","File upload error",
  "Course locked","Language change"
];

const getTime = () =>
  new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

const StudentSupport = () => {
  const chatRef = useRef(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatStarted, setChatStarted] = useState(false);
  const [chips, setChips] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [showQueryPopup, setShowQueryPopup] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [fullPreview, setFullPreview] = useState(null);
  const [loadingSupport, setLoadingSupport] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const rotateChips = useCallback(() => {
    const shuffled = [...allSuggestions].sort(() => 0.5 - Math.random());
    if (questionCount >= 5) {
      setChips([
        shuffled[0],
        shuffled[1],
        "Post Query"
      ]);
    } else {
      setChips(shuffled.slice(0, 3));
    }
  }, [questionCount]);

  useEffect(() => {
    rotateChips();
  }, [rotateChips]);

  const handleChipClick = (chipText) => {
    if (chipText === "Post Query") {
      setLoadingSupport(true);
      setTimeout(()=>{
        setLoadingSupport(false);
        setShowConfirmation(true);
      },400);
      return;
    }
    sendMessage(chipText);
  };

  useEffect(() => {
    const chat = chatRef.current;
    if (!chat) return;
    const handleScroll = () => {
      const isAtBottom =
        Math.abs(chat.scrollHeight - chat.scrollTop - chat.clientHeight) <= 2;
      setShowScrollBtn(!isAtBottom);
    };
    chat.addEventListener("scroll", handleScroll);
    return () => {
      chat.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!chatStarted) return;
    const chat = chatRef.current;
    if (!chat) return;
    requestAnimationFrame(() => {
      if (chat.scrollHeight <= chat.clientHeight) {
        setShowScrollBtn(false);
        return;
      }
      const isAtBottom =
        Math.abs(chat.scrollHeight - chat.scrollTop - chat.clientHeight) <= 5;
      setShowScrollBtn(!isAtBottom);
    });
  }, [messages, chatStarted]);

  useEffect(() => {
    if (!chatStarted) return;
    const chat = chatRef.current;
    if (!chat) return;
    const handleScroll = () => {
      if (chat.scrollHeight <= chat.clientHeight) {
        setShowScrollBtn(false);
        return;
      }
      const isAtBottom =
        Math.abs(chat.scrollHeight - chat.scrollTop - chat.clientHeight) <= 5;
      setShowScrollBtn(!isAtBottom);
    };
    chat.addEventListener("scroll", handleScroll);
    requestAnimationFrame(handleScroll);
    return () => {
      chat.removeEventListener("scroll", handleScroll);
    };
  }, [chatStarted]);

  const sendMessage = (text = null) => {
    const finalText = text || input;
    if (!finalText.trim()) {
      showToast("warning", "Please write your query");
      return;
    }
    if (!chatStarted) setChatStarted(true);
    const attachmentPreview = attachments.map(file => ({
      file,
      preview: file.type.startsWith("image")
        ? URL.createObjectURL(file)
        : null
    }));
    const botLoaderId = Date.now();
    setMessages((p) => [
      ...p,
      {
        type: "user",
        text: finalText,
        time: getTime(),
        attachments: attachmentPreview
      },
      {
        id: botLoaderId,
        type: "bot-loading",
      }
    ]);
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botLoaderId
            ? {
                type: "bot",
                text: "Here is the solution to your query 🙂",
                time: getTime()
              }
            : msg
        )
      );
    }, 1500);
    setQuestionCount(prev => prev + 1);
    setInput("");
    setAttachments([]);
  };

  const handleAttachment = (files) => {
    if (!files.length) return;
    const fileArr = Array.from(files);
    if (attachments.length + fileArr.length > 3) {
      showToast("error", "Upload only 3 attachments");
      return;
    }
    setAttachments(prev => [...prev, ...fileArr]);
    showToast("success", "Attachment added successfully");
  };

  const removeAttachment = (indexToRemove) => {
    setAttachments(prev => prev.filter((_,i)=> i !== indexToRemove));
    showToast("success","Attachment removed");
  };

  const scrollToBottom = () => {
    const chat = chatRef.current;
    if (!chat) return;

    chat.scrollTo({
      top: chat.scrollHeight,
      behavior: "smooth"
    });
  };

  return (
    <div className="student-support-page">
      <div className="student-support-header">
        <div>
          <div className="student-support-heading">Student Support</div>
          <div className="student-support-subheading">
            Ask AI assistant for instant help
          </div>
        </div>
        <DotButton
          label="Post Query"
          onClick={()=>{
            setLoadingSupport(true);
            setTimeout(()=>{
              setLoadingSupport(false);
              setShowConfirmation(true);
            },400);
          }}
        />
      </div>
      <div className="student-support-chat-card">
        <div className="student-support-bg-eyes">
          <RollingEyes />
        </div>
        {showQueryPopup && (
          <QueryPopup onClose={() => setShowQueryPopup(false)} />
        )}

        {!chatStarted && (
          <div className="student-support-initial">

            <div className="student-support-big-title">
              How can I help you today?
            </div>

            <div className="student-support-big-subtitle">
              Choose one of the common queries below
            </div>

            <div className="student-support-initial-suggestions">
              {initialStaticSuggestions.map((s, i) => (
                <div
                  key={i}
                  className="student-support-initial-chip"
                  onClick={() => sendMessage(s)}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        )}

        {chatStarted && (
          <div className="student-support-messages" ref={chatRef}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={
                  msg.type === "user"
                    ? "student-support-row right"
                    : "student-support-row"
                }
              >
                {(msg.type === "bot" || msg.type === "bot-loading") && (
                  <div className="student-support-bot-avatar">
                    <i className="fa-solid fa-robot"></i>
                  </div>
                )}
                {msg.type === "user" && (
                  <div className="student-support-user-avatar">
                    <DotLottieReact src={profileLottie} loop autoplay />
                  </div>
                )}
                <div className="student-support-msg-group">
                  {msg.type === "bot-loading" ? (
                    <div className="student-support-loader-only">
                      <BounceLoader size={200}/>
                    </div>
                  ) : (
                    <>
                      <div className="student-support-bubble-row">
                        <div className="student-support-msg-group">

                          {msg.attachments && msg.attachments.length > 0 && (
                            <div className="student-support-msg-attachments">
                              {msg.attachments.map((att, idx) =>
                                att.preview ? (
                                  <img
                                    key={idx}
                                    src={att.preview}
                                    className="student-support-msg-thumb"
                                    onClick={() => setFullPreview(att.preview)}
                                    alt="attachment preview"
                                  />
                                ) : (
                                  <div key={idx} className="student-support-msg-file">
                                    <i className="fa-solid fa-file"></i>
                                  </div>
                                )
                              )}
                            </div>
                          )}

                          <div
                            className={
                              msg.type === "user"
                                ? "student-support-user-msg"
                                : "student-support-bot-msg"
                            }
                          >
                            {msg.text}
                          </div>

                        </div>

                        {msg.type !== "bot-loading" && (
                          <CopyButton text={msg.text} />
                        )}
                      </div>

                      <div className="student-support-time">
                        {msg.time}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}

            {!messages.some(m => m.type === "bot-loading") && (
              <div className="student-support-chip-row">
                {chips.map((s, i) => (
                  <div
                    key={i}
                    className="student-support-chip"
                    onClick={() => handleChipClick(s)}
                  >
                    {s}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {attachments.length > 0 && (
          <div className="student-support-msg-attachments">
          {attachments.map((file,i)=>{
          const isImage=file.type.startsWith("image");
          const previewURL = URL.createObjectURL(file);
          const handlePreview = () => {
            setFullPreview(previewURL);
            setTimeout(()=>{
              URL.revokeObjectURL(previewURL);
            },1000);
          };

          return(
            <div key={i} style={{position:"relative"}}>
              {/* REMOVE BUTTON */}
              <span
                className="student-support-attachment-remove"
                onClick={()=>removeAttachment(i)}
              >
                ✖
              </span>
              {isImage ? (
                <img
                  src={previewURL}
                  className="student-support-msg-thumb"
                  alt="attachment preview"
                  onClick={handlePreview}
                  style={{cursor:"pointer"}}
                />
              ):(
                <div className="student-support-msg-file-card">
                  <div className="student-support-file-icon">
                    <i className="fa-solid fa-file-lines"></i>
                  </div>
                  <div className="student-support-file-info">
                    <span>{file.name}</span>
                    <span>{file.type.split("/")[1]}</span>
                  </div>
                </div>
              )}
            </div>
          )
          })}
          </div>
        )}
        {showScrollBtn && (
          <div className={`student-support-scroll-btn ${attachments.length>0 ? "with-attachments":""}`}>
            <ScrollDownButton onClick={scrollToBottom} />
          </div>
        )}
        <div className="student-support-input-row">
          <div className="student-support-input-wrapper">
            <label className="student-support-attach-inside">
              <i className="fa-solid fa-paperclip"></i>
              <input
                type="file"
                multiple
                hidden
                onChange={(e) => handleAttachment(e.target.files)}
              />
            </label>
            <textarea
              value={input}
              rows={1}
              placeholder="Type your message..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
          </div>
          <DotButton label="Send" onClick={() => sendMessage()} />
        </div>
      </div>
      {loadingSupport && <JumpLoader />}
      {showConfirmation &&
        <ConfirmationCard
          title="Post Query?"
          message="Do you want to raise a query?"
          onConfirm={()=>{
            setShowConfirmation(false);
            setShowQueryPopup(true);
          }}
          onCancel={()=>setShowConfirmation(false)}
        />
      }
      {fullPreview && (
        <div
          className="student-support-full-preview"
          onClick={()=>{
            setFullPreview(null);
          }}
        >
          <img src={fullPreview} alt="" />
        </div>
      )}
    </div>
  );
};

export default StudentSupport;
