import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageCourses.css";

import AddButton from "../../CustomComponents/Buttons/AddButton/AddButton";
import SearchBar from "../../CustomComponents/Buttons/SearchBar/SearchBar";
import EditButton from "../../CustomComponents/Buttons/EditButton/EditButton";
import DeleteButton from "../../CustomComponents/Buttons/DeleteButton/DeleteButton";
import ChangeTextButton from "../../CustomComponents/Buttons/ChangeTextButton/ChangeTextButton";

import ConfirmationCard from "../../CustomComponents/ConfirmationCard/ConfirmationCard";
import JumpLoader from "../../CustomComponents/Loaders/JumpLoader/JumpLoader";
import { showToast } from "../../CustomComponents/CustomToast/CustomToast";

import Table from "../../CustomComponents/TableComponents/Table/Table";
import TablePagination from "../../CustomComponents/TableComponents/TablePagination/TablePagination";
import TableEntriesDisplay from "../../CustomComponents/TableComponents/TableEntriesDisplay/TableEntriesDisplay";
import TableEntriesSelector from "../../CustomComponents/TableComponents/TableEntriesSelector/TableEntriesSelector";

const INITIAL_COURSES = [
  { id: 1, title: "React for Beginners", price: "₹1999", published: true },
  { id: 2, title: "Advanced JavaScript", price: "₹2499", published: false },
  { id: 3, title: "UI/UX Design Basics", price: "₹1499", published: true },
];

const ManageCourses = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [showPublishPopup, setShowPublishPopup] = useState(false);
  const [publishId, setPublishId] = useState(null);
  const [publishNextState, setPublishNextState] = useState(false);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  /* LOADER HELPER */
  const runWithLoader = (callback) => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      callback();
    }, 500);
  };

  /* SEARCH (TITLE ONLY) */
  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  /* PAGINATION */
  const totalPages = Math.ceil(filteredCourses.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const visibleCourses = filteredCourses.slice(startIndex, endIndex);

  /* DELETE */
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    runWithLoader(() => {
      setCourses(courses.filter((c) => c.id !== deleteId));
      setShowDeletePopup(false);
      setDeleteId(null);
      showToast("info", "Course deleted");
    });
  };

  /* CONFIRM PUBLISH */
  const confirmPublishToggle = () => {
    runWithLoader(() => {
      setCourses(
        courses.map((c) =>
          c.id === publishId
            ? { ...c, published: publishNextState }
            : c
        )
      );
      setShowPublishPopup(false);
      setPublishId(null);
      if (publishNextState) {
        showToast("success", "Course published successfully");
      } else {
        showToast("warning", "Course unpublished");
      }
    });
  };

  const columns = [
    {
      key: "serial",
      label: "S.No.",
      render: (_, row, index) => startIndex + index + 1,
    },
    { key: "title", label: "Course Title" },
    { key: "price", label: "Price" },

    {
      key: "published",
      label: "Published",
      render: (_, row) => (
        <ChangeTextButton
          isActive={row.published}
          beforeText="Unpublished"
          afterText="Published"
          onClick={() => {
            setPublishId(row.id);
            setPublishNextState(!row.published);
            setShowPublishPopup(true);
          }}
        />
      ),
    },

    {
      key: "actions",
      label: "Actions",
      align: "center",
      render: (_, row) => (
        <div className="manage-courses-row-actions">
          <EditButton
            onClick={() =>
              runWithLoader(() => {
                showToast("info", "Course setup page opened");
                navigate(`/admin/manage-courses/edit/${row.id}`);
              })
            }
          />
          <DeleteButton onClick={() => handleDeleteClick(row.id)} />
        </div>
      ),
    },
  ];

  return (
    <div className="manage-courses-page">
      {showLoader && <JumpLoader />}

      {/* HEADER */}
      <div className="manage-courses-header">
        <h1 className="manage-courses-title">Manage Courses</h1>
        <p className="manage-courses-subtitle">
          Total Courses: {courses.length}
        </p>
      </div>

      {/* CONTROLS */}
      <div className="manage-courses-controls">
        <TableEntriesSelector
          value={entriesPerPage}
          onChange={(value) => {
            setEntriesPerPage(value);
            setCurrentPage(1);
          }}
        />

        <div className="manage-courses-actions">
          <SearchBar
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <AddButton
            onClick={() =>
              runWithLoader(() => {
                showToast("info", "Course setup page opened");
                navigate("/admin/manage-courses/new");
              })
            }
          />
        </div>
      </div>

      {/* TABLE */}
      <Table
        columns={columns}
        data={visibleCourses}
        rowKey="id"
        size="compact"
      />

      {/* FOOTER */}
      <div className="manage-courses-footer">
        <TableEntriesDisplay
          startIndex={startIndex}
          endIndex={endIndex}
          total={filteredCourses.length}
        />

        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* DELETE CONFIRM */}
      {showDeletePopup && (
        <ConfirmationCard
          message="You want to delete this course."
          onConfirm={confirmDelete}
          onCancel={() => setShowDeletePopup(false)}
        />
      )}
      {showPublishPopup && (
        <ConfirmationCard
          message={
            publishNextState
              ? "Do you want to publish this course?"
              : "Do you want to unpublish this course?"
          }
          onConfirm={confirmPublishToggle}
          onCancel={() => setShowPublishPopup(false)}
        />
      )}
    </div>
  );
};

export default ManageCourses;
