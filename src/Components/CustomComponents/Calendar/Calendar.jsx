import React, { useState } from "react";
import "./Calendar.css";

const Calendar = ({ mode = "display", onSelectDate }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];

  const years = Array.from({ length: 80 }, (_, i) => today.getFullYear() - i);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const isSelectable = (date) => {
    if (mode === "display") return true;
    return date.getTime() <= today.getTime();
  };

  const selectDate = (date) => {
    setSelectedDate(date);
    onSelectDate?.(date);
  };

  const handleDateClick = (day) => {
    if (mode !== "picker") return;

    const picked = new Date(year, month, day);
    picked.setHours(0, 0, 0, 0);

    if (!isSelectable(picked)) return;

    selectDate(picked);
  };

  return (
    <div className="calendar-card">
      {/* HEADER */}
      <div className="calendar-header">
        {mode === "picker" ? (
          <div className="calendar-selectors">
            <select
              value={month}
              onChange={(e) =>
                setCurrentDate(new Date(year, Number(e.target.value), 1))
              }
            >
              {months.map((m, i) => (
                <option key={m} value={i}>{m}</option>
              ))}
            </select>

            <select
              value={year}
              onChange={(e) =>
                setCurrentDate(new Date(Number(e.target.value), month, 1))
              }
            >
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        ) : (
          <span>{months[month]} {year}</span>
        )}

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

      {/* GRID */}
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

      {/* FOOTER (ONLY PICKER) */}
      {mode === "picker" && (
        <div className="calendar-footer">
          <button
            className="calendar-btn ghost"
            onClick={() => {
              setSelectedDate(null);
              onSelectDate?.(null);
            }}
          >
            Clear
          </button>

          <button
            className="calendar-btn primary"
            onClick={() => selectDate(today)}
          >
            Today
          </button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
