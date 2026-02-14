import { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./StudentsEnrolled.css";

import AddButton from "../../CustomComponents/Buttons/AddButton/AddButton";
import SearchBar from "../../CustomComponents/Buttons/SearchBar/SearchBar";
import EditButton from "../../CustomComponents/Buttons/EditButton/EditButton";
import DeleteButton from "../../CustomComponents/Buttons/DeleteButton/DeleteButton";

import StudentInfoChangeCard from "../StudentInfoChangeCard/StudentInfoChangeCard";
import ConfirmationCard from "../../CustomComponents/ConfirmationCard/ConfirmationCard";
import JumpLoader from "../../CustomComponents/Loaders/JumpLoader/JumpLoader";
import { showToast } from "../../CustomComponents/CustomToast/CustomToast";
import Table from "../../CustomComponents/TableComponents/Table/Table";
import TablePagination from "../../CustomComponents/TableComponents/TablePagination/TablePagination";
import TableEntriesDisplay from "../../CustomComponents/TableComponents/TableEntriesDisplay/TableEntriesDisplay";
import TableEntriesSelector from "../../CustomComponents/TableComponents/TableEntriesSelector/TableEntriesSelector";

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
    mobile: "9997851327",
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
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidMobile = (mobile) => {
    return /^[0-9]{10}$/.test(mobile);
  };
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
  // Empty check
  if (!formData.name || !formData.email || !formData.mobile) {
    showToast("warning", "Complete all the fields first");
    return;
  }
  // Email validation
  if (!isValidEmail(formData.email)) {
    showToast("error", "Enter a valid email address");
    return;
  }
  // Mobile validation
  if (!isValidMobile(formData.mobile)) {
    showToast("error", "Enter a valid 10-digit mobile number");
    return;
  }
  // ADD
  if (mode === "add") {
    setStudents([
      ...students,
      {
        ...formData,
        id: Date.now(),
        gender: "male",
      },
    ]);
    showToast("success", "User added successfully");
  } 
  // EDIT
  else {
    setStudents(
      students.map((s) =>
        s.id === activeId ? { ...s, ...formData } : s
      )
    );
    showToast("success", "User updated successfully");
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

      showToast("info", "User deleted");
    });
  };

  const columns = [
    {
      key: "profile",
      label: "Profile",
      render: (_, row) => (
        <div className="students-enrolled-avatar">
          <DotLottieReact
            src={
              row.gender === "male"
                ? "https://lottie.host/f2ffc4a9-3e7d-4eee-95f7-4aeaac63e5da/y0dA0Bl62z.lottie"
                : "https://lottie.host/cd22b1f3-55fc-4d27-b91a-4bb55da64d34/4r9g7dOxUC.lottie"
            }
            loop
            autoplay
          />
        </div>
      ),
    },
    {
      key: "serial",
      label: "S.No.",
      render: (_, row, index) => startIndex + index + 1,
    },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "mobile", label: "Mobile" },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="students-enrolled-row-actions">
          <EditButton onClick={() => handleEdit(row)} />
          <DeleteButton onClick={() => handleDeleteClick(row.id)} />
        </div>
      ),
    },
  ];

  return (
    <div className="students-enrolled-page">
      {showLoader && <JumpLoader />}

      {/* HEADER */}
      <div className="students-enrolled-header">
        <h1 className="students-enrolled-title">Students Enrolled</h1>
        <p className="students-enrolled-subtitle">
          Total Students: {students.length}
        </p>
      </div>

      {/* CONTROLS */}
      <div className="students-enrolled-controls">
        <TableEntriesSelector
          value={entriesPerPage}
          onChange={handleEntriesChange}
        />

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
      <Table
        columns={columns}
        data={visibleStudents}
        rowKey="id"
        size="tight"
      />

      {/* INFO + PAGINATION */}
      <div className="table-footer">
        <TableEntriesDisplay
          startIndex={startIndex}
          endIndex={endIndex}
          total={filteredStudents.length}
        />

        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
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
        <ConfirmationCard
          message="You want to delete this student."
          onConfirm={confirmDelete}
          onCancel={() => setShowDeletePopup(false)}
        />
      )}
    </div>
  );
};

export default StudentsEnrolled;
