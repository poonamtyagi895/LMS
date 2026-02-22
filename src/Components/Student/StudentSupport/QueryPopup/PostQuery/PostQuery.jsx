import { useRef, useState } from "react";
import "./PostQuery.css";

import DotButton from "../../../../CustomComponents/Buttons/DotButton/DotButton";
import ConfirmationCard from "../../../../CustomComponents/ConfirmationCard/ConfirmationCard";
import JumpLoader from "../../../../CustomComponents/Loaders/JumpLoader/JumpLoader";
import { showToast } from "../../../../CustomComponents/CustomToast/CustomToast";

const QUERY_TYPES = [
  "Payment Related",
  "Course Related",
  "Chapter Related",
  "Technical Issue",
  "Certificate Help"
];

const PostQuery = () => {

  const fileRef = useRef(null);

  const [type,setType] = useState("");
  const [message,setMessage] = useState("");
  const [files,setFiles] = useState([]);

  const [showConfirm,setShowConfirm] = useState(false);
  const [showLoader,setShowLoader] = useState(false);

  const handleAttachment = (e) => {

    const selected = Array.from(e.target.files);

    if(selected.length > 2){
      showToast("error","Upload only 2 attachments");
      e.target.value = "";
      return;
    }

    setFiles(selected);
  };

  const handleSubmit = () => {

    if(!type){
      showToast("error","Select query type");
      return;
    }

    if(!message.trim()){
      showToast("error","Write your query message");
      return;
    }

    setShowConfirm(true);
  };

  const confirmSubmit = () => {

    setShowConfirm(false);
    setShowLoader(true);

    setTimeout(()=>{
      setShowLoader(false);

      showToast("success","Query submitted");

      setType("");
      setMessage("");
      setFiles([]);
      fileRef.current.value = "";

    },500);
  };

  return(
    <div className="post-query-container">

      {/* QUERY TYPE */}
      <div className="post-query-field">
        <label>Query Type</label>
        <select
          className="post-query-select"
          value={type}
          onChange={(e)=>setType(e.target.value)}
        >
          <option value="">Select Query Type</option>
          {QUERY_TYPES.map((q,i)=>(
            <option key={i}>{q}</option>
          ))}
        </select>
      </div>

      {/* MESSAGE */}
      <div className="post-query-field">
        <label>Query Message</label>
        <textarea
          className="post-query-textarea"
          placeholder="Write your query..."
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
        />
      </div>

      {/* ATTACHMENT */}
      <div className="post-query-field">
        <label>Attachments</label>

        <div className="post-query-file-wrapper">

          <label className="post-query-file-btn">
            Choose Files
            <input
              type="file"
              multiple
              ref={fileRef}
              hidden
              onChange={handleAttachment}
            />
          </label>

          <span className="post-query-file-text">
            {files.length > 0
              ? files.map(f=>f.name).join(", ")
              : "No file chosen"
            }
          </span>

        </div>
      </div>

      <div className="post-query-submit">
        <DotButton
          label="Submit Query"
          onClick={handleSubmit}
        />
      </div>

      {showConfirm && (
        <ConfirmationCard
          title="Submit Query?"
          message="Do you want to raise this query?"
          onConfirm={confirmSubmit}
          onCancel={()=>setShowConfirm(false)}
        />
      )}

      {showLoader && <JumpLoader/>}

    </div>
  );
};

export default PostQuery;