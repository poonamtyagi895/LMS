import { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./StudentsEnrolled.css";

import AddButton from "../../Custom_components/Buttons/AddButton/AddButton";
import SearchBar from "../../Custom_components/Buttons/SearchBar/SearchBar";
import EditButton from "../../Custom_components/Buttons/EditButton/EditButton";
import DeleteButton from "../../Custom_components/Buttons/DeleteButton/DeleteButton";

import StudentInfoChangeCard from "../../Custom_components/StudentInfoChangeCard/StudentInfoChangeCard";
import DeleteConfirmCard from "../../Custom_components/DeleteConfirmCard/DeleteConfirmCard";
import Loader2 from "../../Custom_components/Loaders/Loader2";

const INITIAL_STUDENTS = [
  {
    id: 1,
    gender: "male",
    name: "Yuri Berry",
    email: "info@example.com",
    mobile: "9158522265",
  },
  {
    id: 2,
    gender: "female",
    name: "Tiger Nixon",
    email: "info@example.com",
    mobile: "7845885444",
  },
  {
    id: 3,
    gender: "female",
    name: "Tatyana Fitzpatrick",
    email: "info@example.com",
    mobile: "999785327",
  },
];

const EMPTY_STUDENT = { name: "", email: "", mobile: "" };

const StudentsEnrolled = () => {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [showPopup, setShowPopup] = useState(false);
  const [mode, setMode] = useState("add");
  const [activeId, setActiveId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_STUDENT);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [showLoader, setShowLoader] = useState(false);

  const runWithLoader = (callback) => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      callback();
    }, 500);
  };

  /* FILTER */
  const filteredStudents = students.filter((s) =>
    `${s.name} ${s.email} ${s.mobile}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /* PAGINATION */
  const totalPages = Math.ceil(filteredStudents.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const visibleStudents = filteredStudents.slice(startIndex, endIndex);

  /* RESET PAGE ON SEARCH / ENTRIES CHANGE */
  const handleEntriesChange = (value) => {
    setEntriesPerPage(value);
    setCurrentPage(1);
  };

  /* ADD */
  const handleAddNew = () => {
    runWithLoader(() => {
      setMode("add");
      setFormData(EMPTY_STUDENT);
      setActiveId(null);
      setShowPopup(true);
    });
  };

  /* EDIT */
  const handleEdit = (student) => {
    runWithLoader(() => {
      setMode("edit");
      setFormData({
        name: student.name,
        email: student.email,
        mobile: student.mobile,
      });
      setActiveId(student.id);
      setShowPopup(true);
    });
  };

  /* SAVE */
  const handleSave = () => {
    if (mode === "add") {
      setStudents([
        ...students,
        {
          ...formData,
          id: Date.now(),
          gender: "male",
        },
      ]);
    } else {
      setStudents(
        students.map((s) =>
          s.id === activeId ? { ...s, ...formData } : s
        )
      );
    }
    setShowPopup(false);
  };

  /* DELETE */
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    runWithLoader(() => {
      setStudents(students.filter((s) => s.id !== deleteId));
      setShowDeletePopup(false);
    });
  };

  return (
    <div className="students-enrolled-page">
      {showLoader && <Loader2 />}

      {/* HEADER */}
      <div className="students-enrolled-header">
        <h1 className="students-enrolled-title">Students Enrolled</h1>
        <p className="students-enrolled-subtitle">
          Total Students: {students.length}
        </p>
      </div>

      {/* CONTROLS */}
      <div className="students-enrolled-controls">
        <div className="students-enrolled-entries">
          Show
          <select
            value={entriesPerPage}
            onChange={(e) => handleEntriesChange(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          entries
        </div>

        <div className="students-enrolled-actions-top">
          <SearchBar
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <AddButton onClick={handleAddNew} />
        </div>
      </div>

      {/* TABLE */}
      <div className="students-enrolled-table-card">
        <table className="students-enrolled-table">
          <thead>
            <tr>
              <th>Profile</th>
              <th>S.No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {visibleStudents.map((s, index) => (
              <tr key={s.id}>
                <td>
                  <div className="students-enrolled-avatar">
                    <DotLottieReact
                      src={
                        s.gender === "male"
                          ? "https://lottie.host/f2ffc4a9-3e7d-4eee-95f7-4aeaac63e5da/y0dA0Bl62z.lottie"
                          : "https://lottie.host/cd22b1f3-55fc-4d27-b91a-4bb55da64d34/4r9g7dOxUC.lottie"
                      }
                      loop
                      autoplay
                    />
                  </div>
                </td>

                <td>{startIndex + index + 1}</td>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.mobile}</td>

                <td>
                  <div className="students-enrolled-row-actions">
                    <EditButton onClick={() => handleEdit(s)} />
                    <DeleteButton onClick={() => handleDeleteClick(s.id)} />
                  </div>
                </td>
              </tr>
            ))}

            {visibleStudents.length === 0 && (
              <tr>
                <td colSpan="6" className="no-data">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* INFO + PAGINATION */}
      <div className="table-footer">
        <p className="table-info">
          Showing {filteredStudents.length === 0 ? 0 : startIndex + 1} to{" "}
          {Math.min(endIndex, filteredStudents.length)} of{" "}
          {filteredStudents.length} entries
        </p>

        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* POPUPS */}
      {showPopup && (
        <StudentInfoChangeCard
          mode={mode}
          data={formData}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          onSave={handleSave}
          onCancel={() => setShowPopup(false)}
        />
      )}

      {showDeletePopup && (
        <DeleteConfirmCard
          message="You want to delete this student."
          onDelete={confirmDelete}
          onCancel={() => setShowDeletePopup(false)}
        />
      )}
    </div>
  );
};

export default StudentsEnrolled;
