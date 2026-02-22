import { useState } from "react";
import "./QueryPopup.css";
import SegmentedTabs from "../../../CustomComponents/SegmentedTabs/SegmentedTabs";

import OpenQueries from "./OpenQueries/OpenQueries";
import CloseQueries from "./CloseQueries/CloseQueries";
import PostQuery from "./PostQuery/PostQuery";

const QueryPopup = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("open");

  const tabOptions = [
    { label: "Open Queries", value: "open" },
    { label: "Closed Queries", value: "closed" },
    { label: "Post Query", value: "post" }
  ];

  return (
    <div className="query-popup-overlay">
      <div className="query-popup-card">

        <div className="query-popup-header">
          <h3 className="query-popup-title">Queries</h3>
          <span className="query-popup-close" onClick={onClose}>✖</span>
        </div>

        <div className="query-popup-tabs">
          <SegmentedTabs
            tabs={tabOptions}
            activeValue={activeTab}
            onChange={setActiveTab}
          />
        </div>

        <div className="query-popup-content">
          {activeTab === "open" && <OpenQueries />}
          {activeTab === "closed" && <CloseQueries />}
          {activeTab === "post" && <PostQuery />}
        </div>

      </div>
    </div>
  );
};

export default QueryPopup;