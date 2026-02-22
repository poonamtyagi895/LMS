import { useState } from "react";
import "./AdminSupport.css";
import DotButton from "../../CustomComponents/Buttons/DotButton/DotButton";
import SegmentedTabs from "../../CustomComponents/SegmentedTabs/SegmentedTabs";

const ticketsData = [
  {
    id: 1,
    student: "Rahul",
    assignedTo: null,
    messages: [{ type: "user", text: "Explain closures" }],
  },
];

const teachers = ["Poonam Tyagi", "Pooja"];

const AdminSupport = () => {
  const [role, setRole] = useState("admin");
  // eslint-disable-next-line no-unused-vars
  const [tickets, setTickets] = useState(ticketsData);
  const [selectedTicket, setSelectedTicket] = useState(tickets[0]);
  const [input, setInput] = useState("");

  const tabs = [
    { label: "Admin", value: "admin" },
    { label: "Teacher", value: "teacher" },
  ];

  const filtered =
    role === "teacher"
      ? tickets.filter((t) => t.assignedTo === "Poonam Tyagi")
      : tickets;

  const sendReply = () => {
    if (!input.trim()) return;
    selectedTicket.messages.push({
      type: "bot",
      text: input,
    });
    setInput("");
  };

  return (
    <div className="admin-support-page">

      <SegmentedTabs tabs={tabs} activeValue={role} onChange={setRole} />

      <div className="admin-support-layout">

        <div className="admin-support-sidebar">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="admin-support-ticket"
              onClick={() => setSelectedTicket(t)}
            >
              {t.student}
            </div>
          ))}
        </div>

        <div className="admin-support-chat">

          {role === "admin" && (
            <select
              className="admin-support-assign"
              onChange={(e) => {
                selectedTicket.assignedTo = e.target.value;
              }}
            >
              <option>Assign Teacher</option>
              {teachers.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          )}

          <div className="admin-support-messages">
            {selectedTicket.messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.type === "user"
                    ? "admin-support-user-msg"
                    : "admin-support-bot-msg"
                }
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="admin-support-input-row">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Reply..."
            />
            <DotButton label="Send" onClick={sendReply} />
          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminSupport;