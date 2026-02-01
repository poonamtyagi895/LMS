import { useEffect, useState, useRef } from "react";
import Highcharts from "highcharts";
import Calendar from "../Calendar/Calendar";
import "./LineGraph.css";

export default function LineGraph({
  title = "Line Graph",
  data = [],
  yMax = 10,
  yStep = 1,
  unit = "",
  type = "hours",
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showPicker]);


  // -------------------------------
  // LAST 7 DAYS (BASED ON SELECTED DATE)
  // -------------------------------
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - i);
    last7Days.push(
      d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      })
    );
  }

  const getDateLabel = () => {
    const end = new Date(selectedDate);
    const start = new Date(selectedDate);
    start.setDate(end.getDate() - 6);

    const format = (d) =>
      d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

    return `${format(start)} - ${format(end)}`;
  };

  useEffect(() => {
    Highcharts.chart("line-graph-chart", {
      credits: { enabled: false },
      chart: {
        type: "area",
        marginRight: 40,
        spacingLeft: 40,
        spacingBottom: 50,
      },
      title: { text: null },
      subtitle: { text: null },

      xAxis: {
        categories: last7Days,
        lineColor: "#eeeeee",
        labels: {
          style: { color: "#999999" },
          y: 35,
        },
        tickColor: "#eeeeee",
        tickmarkPlacement: "on",
      },

      yAxis: {
        min: 0,
        max: yMax,
        tickInterval: yStep,
        gridLineColor: "#eeeeee",
        title: { text: null },
        labels: {
          style: { color: "#999999", fontSize: "9px" },
          formatter: function () {
            return this.value;
          },
        },
      },

      tooltip: {
        useHTML: true,
        formatter: function () {
          if (type === "hours") {
            const totalMinutes = Math.round(this.y * 60);
            const h = Math.floor(totalMinutes / 60);
            const m = totalMinutes % 60;

            return `
              <div class="line-graph-tooltip">
                <div class="line-graph-tooltip-title">${this.key}</div>
                <div class="line-graph-tooltip-value">
                  Total hours spent: ${h}h ${m}m
                </div>
              </div>
            `;
          }

          return `
            <div class="line-graph-tooltip">
              <div class="line-graph-tooltip-title">${this.key}</div>
              <div class="line-graph-tooltip-value">
                Total enrollments: ${this.y}
              </div>
            </div>
          `;
        },
        backgroundColor: "transparent",
        borderWidth: 0,
        shadow: false,
      },

      legend: { enabled: false },

      plotOptions: {
        area: {
          lineWidth: 2,
          marker: { symbol: "circle", radius: 4 },
        },
        series: {
          fillOpacity: 0.12,
          stickyTracking: false,
        },
      },

      series: [
        {
          name: title,
          data: data.length ? data : Array(7).fill(0),
          color: "#FD7177",
        },
      ],
    });
  }, [last7Days, title, type, data, yMax, yStep]);

  return (
    <div className="line-graph-box">
      <h3 className="line-graph-title">
        {title}
        <span className="line-graph-date">
          <button
            className="line-graph-date-btn"
            onClick={() => setShowPicker((prev) => !prev)}
          >
            <i className="fa fa-calendar" /> {getDateLabel()}{" "}
            <i className="fa fa-caret-down" />
          </button>

          {showPicker && (
            <div ref={pickerRef} className="line-graph-calendar">
              <Calendar
                mode="picker"
                onSelectDate={(date) => {
                  setSelectedDate(date);
                  setShowPicker(false);
                }}
              />
            </div>
          )}
        </span>
      </h3>

      <div id="line-graph-chart" className="line-graph-chart" />
    </div>
  );
}
