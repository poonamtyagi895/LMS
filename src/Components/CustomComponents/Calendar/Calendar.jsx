import React, { useState } from "react";
import "./Calendar.css";

/**
 * mode:
 * - "display" → static calendar (right panel)
 * - "picker"  → date picker (line graph)
 */
const Calendar = ({ mode = "display", onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const isSelectable = (date) => {
    if (mode === "display") return true;
    return date.getTime() <= today.getTime(); // ⛔ future blocked
  };

  const handleDateClick = (day) => {
    if (mode !== "picker") return;

    const picked = new Date(year, month, day);
    picked.setHours(0, 0, 0, 0);

    if (!isSelectable(picked)) return;

    setSelectedDate(picked);
    onSelectDate?.(picked);
  };

  return (
    <div className="calendar-card">
      <div className="calendar-header">
        <span>{months[month]} {year}</span>
        <div className="calendar-nav">
          <i
            className="fas fa-chevron-left"
            onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
          />
          <i
            className="fas fa-chevron-right"
            onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
          />
        </div>
      </div>

      <div className="calendar-grid">
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
          <div key={d} className="calendar-day">{d}</div>
        ))}

        {Array(firstDay).fill(null).map((_, i) => (
          <div key={`e-${i}`} />
        ))}

        {Array(daysInMonth).fill(null).map((_, i) => {
          const day = i + 1;
          const dateObj = new Date(year, month, day);
          dateObj.setHours(0, 0, 0, 0);

          const isToday = dateObj.getTime() === today.getTime();
          const selectable = isSelectable(dateObj);
          const selected =
            mode === "picker" &&
            selectedDate &&
            selectedDate.getTime() === dateObj.getTime();

          return (
            <div
              key={day}
              className={`calendar-date
                ${isToday ? "today" : ""}
                ${mode === "picker" && !selectable ? "disabled" : ""}
                ${mode === "picker" ? "selectable" : ""}
                ${selected ? "selected" : ""}
              `}
              onClick={() => handleDateClick(day)}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
