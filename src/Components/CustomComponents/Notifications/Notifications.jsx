import React, { useEffect, useRef, useState, useMemo } from "react";
import "./Notifications.css";

const Notifications = ({ role }) => {
  const scrollRef = useRef(null);
  const [hasScroll, setHasScroll] = useState(false);

  const isStudent = role === "student";

  const notificationsData = useMemo(() => {
    return isStudent
    ? [
        {
          tag: "New",
          title: "New course available",
          description: "Advanced React added",
        },
        {
          tag: "Alert",
          title: "Assignment due",
          description: "UI task ends tomorrow",
        },
        {
          tag: "Info",
          title: "Profile updated",
          description: "Your info was saved",
        },
        {
          tag: "Info",
          title: "Profile updated",
          description: "Your info was saved",
        },
        {
          tag: "Info",
          title: "Profile updated",
          description: "Your info was saved",
        },
        {
          tag: "Info",
          title: "Profile updated",
          description: "Your info was saved",
        },
      ]
      : [
        {
          tag: "New",
          title: "New student enrolled",
          description: "Rahul joined React batch",
        },
        {
          tag: "Alert",
          title: "Pending approvals",
          description: "Course approvals pending",
        },
        {
          tag: "Info",
          title: "System update",
          description: "Dashboard updated successfully",
        },
        {
          tag: "Info",
          title: "System update",
          description: "Dashboard updated successfully",
        },
        {
          tag: "Info",
          title: "System update",
          description: "Dashboard updated successfully",
        },
        {
          tag: "Info",
          title: "System update",
          description: "Dashboard updated successfully",
        },
      ];
    }, [isStudent]);

  // ✅ Total number of notifications
  const totalCount = notificationsData.length;

  useEffect(() => {
    const el = scrollRef.current;

    const checkScroll = () => {
      if (el) {
        setHasScroll(el.scrollHeight > el.clientHeight);
      }
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);

    return () => window.removeEventListener("resize", checkScroll);
  }, [notificationsData]);

  return (
    <div className={`notifications-card ${hasScroll ? "has-scroll" : ""}`}>
      
      {/* HEADER */}
      <div className="notifications-header">
        <h5 className="notifications-title">My Notifications</h5>

        {totalCount > 0 && (
          <span className="notifications-total-count">
            {totalCount}
          </span>
        )}
      </div>

      {/* LIST */}
      <div className="notifications-scroll" ref={scrollRef}>
        {notificationsData.map((item, index) => (
          <div className="notifications-item" key={index}>
            <div className="notifications-content">
              
              <div className="notifications-top">
                <strong>{item.title}</strong>
                <span className="notifications-tag">{item.tag}</span>
              </div>

              <small className="notifications-description">
                {item.description}
              </small>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
