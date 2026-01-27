import { useEffect, useRef, useState } from "react";
import "./SegmentedTabs.css";

const SegmentedTabs = ({ tabs, activeValue, onChange }) => {
  const containerRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  useEffect(() => {
    const activeIndex = tabs.findIndex(t => t.value === activeValue);
    const activeBtn = containerRef.current?.children[activeIndex + 1];

    if (activeBtn) {
      setIndicatorStyle({
        width: activeBtn.offsetWidth,
        transform: `translateX(${activeBtn.offsetLeft}px)`
      });
    }
  }, [activeValue, tabs]);

  return (
    <div className="segmented-tabs-container" ref={containerRef}>
      <div className="segmented-tabs-indicator" style={indicatorStyle} />

      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`segmented-tabs-btn ${
            activeValue === tab.value ? "active" : ""
          }`}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default SegmentedTabs;
