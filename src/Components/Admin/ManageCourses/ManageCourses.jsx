import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageCourses.css";

import AddButton from "../../CustomComponents/Buttons/AddButton/AddButton";
import SearchBar from "../../CustomComponents/Buttons/SearchBar/SearchBar";
import EditButton from "../../CustomComponents/Buttons/EditButton/EditButton";
import DeleteButton from "../../CustomComponents/Buttons/DeleteButton/DeleteButton";
import ChangeTextButton from "../../CustomComponents/Buttons/ChangeTextButton/ChangeTextButton";

import ConfirmationCard from "../../CustomComponents/ConfirmationCard/ConfirmationCard";
import Loader2 from "../../CustomComponents/Loaders/Loader2";
import { showToast } from "../../CustomComponents/CustomToast/CustomToast";

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

  return (
    <div className="manage-courses-page">
      {showLoader && <Loader2 />}

      {/* HEADER */}
      <div className="manage-courses-header">
        <h1 className="manage-courses-title">Manage Courses</h1>
        <p className="manage-courses-subtitle">
          Total Courses: {courses.length}
        </p>
      </div>

      {/* CONTROLS */}
      <div className="manage-courses-controls">
        <div className="manage-courses-entries">
          Show
          <select
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          entries
        </div>

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
      <div className="manage-courses-table-card">
        <table className="manage-courses-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Course Title</th>
              <th>Price</th>
              <th>Published</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {visibleCourses.map((c, index) => (
              <tr key={c.id}>
                <td>{startIndex + index + 1}</td>
                <td>{c.title}</td>
                <td>{c.price}</td>
                <td>
                  <ChangeTextButton
                    isActive={c.published}
                    beforeText="Unpublished"
                    afterText="Published"
                    onClick={() => {
                      setPublishId(c.id);
                      setPublishNextState(!c.published);
                      setShowPublishPopup(true);
                    }}
                  />
                </td>
                <td>
                  <div className="manage-courses-row-actions">
                    <EditButton
                      onClick={() =>
                        runWithLoader(() => {
                          showToast("info", "Course setup page opened");
                          navigate(`/admin/manage-courses/edit/${c.id}`);
                        })
                      }
                    />
                    <DeleteButton onClick={() => handleDeleteClick(c.id)} />
                  </div>
                </td>
              </tr>
            ))}

            {visibleCourses.length === 0 && (
              <tr>
                <td colSpan="5" className="manage-courses-no-data">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="manage-courses-footer">
        <p className="manage-courses-info">
          Showing {filteredCourses.length === 0 ? 0 : startIndex + 1} to{" "}
          {Math.min(endIndex, filteredCourses.length)} of{" "}
          {filteredCourses.length} entries
        </p>

        <div className="manage-courses-pagination">
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
