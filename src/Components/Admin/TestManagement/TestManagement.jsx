import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TestManagement.css";

import AddButton from "../../CustomComponents/Buttons/AddButton/AddButton";
import SearchBar from "../../CustomComponents/Buttons/SearchBar/SearchBar";
import EditButton from "../../CustomComponents/Buttons/EditButton/EditButton";
import DeleteButton from "../../CustomComponents/Buttons/DeleteButton/DeleteButton";
import ChangeTextButton from "../../CustomComponents/Buttons/ChangeTextButton/ChangeTextButton";

import ConfirmationCard from "../../CustomComponents/ConfirmationCard/ConfirmationCard";
import Loader2 from "../../CustomComponents/Loaders/Loader2";
import { showToast } from "../../CustomComponents/CustomToast/CustomToast";

/* MOCK TEST DATA */
const INITIAL_TESTS = [
  {
    id: 1,
    title: "Maths Unit Test",
    category: "Class 6",
    status: true, // Uploaded
  },
  {
    id: 2,
    title: "Science Monthly Test",
    category: "Class 8",
    status: false, // Draft
  },
  {
    id: 3,
    title: "English Grammar Test",
    category: "Class 10",
    status: true,
  },
];

const TestManagement = () => {
  const navigate = useNavigate();

  const [tests, setTests] = useState(INITIAL_TESTS);
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [statusId, setStatusId] = useState(null);
  const [nextStatus, setNextStatus] = useState(false);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [showLoader, setShowLoader] = useState(false);

  /* LOADER HELPER */
  const runWithLoader = (cb) => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      cb();
    }, 500);
  };

  /* SEARCH */
  const filteredTests = tests.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  /* PAGINATION */
  const totalPages = Math.ceil(filteredTests.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const visibleTests = filteredTests.slice(startIndex, endIndex);

  /* DELETE */
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    runWithLoader(() => {
      setTests(tests.filter((t) => t.id !== deleteId));
      setShowDeletePopup(false);
      setDeleteId(null);
      showToast("info", "Test deleted");
    });
  };

  /* CONFIRM STATUS */
  const confirmStatusToggle = () => {
    runWithLoader(() => {
      setTests(
        tests.map((t) =>
          t.id === statusId ? { ...t, status: nextStatus } : t
        )
      );
      setShowStatusPopup(false);
      setStatusId(null);

      showToast(
        nextStatus ? "success" : "warning",
        nextStatus ? "Test uploaded" : "Test moved to draft"
      );
    });
  };

  return (
    <div className="test-management-page">
      {showLoader && <Loader2 />}

      {/* HEADER */}
      <div className="test-management-header">
        <h1 className="test-management-title">Manage Tests</h1>
        <p className="test-management-subtitle">
          Total Tests: {tests.length}
        </p>
      </div>

      {/* CONTROLS */}
      <div className="test-management-controls">
        <div className="test-management-entries">
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

        <div className="test-management-actions">
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
                showToast("info", "Test creation page opened");
                navigate("/admin/test-management/new");
              })
            }
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="test-management-table-card">
        <table className="test-management-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Test Title</th>
              <th>Test Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {visibleTests.map((t, index) => (
              <tr key={t.id}>
                <td>{startIndex + index + 1}</td>
                <td>{t.title}</td>
                <td>{t.category}</td>
                <td>
                  <ChangeTextButton
                    isActive={t.status}
                    beforeText="Draft"
                    afterText="Uploaded"
                    onClick={() => {
                      setStatusId(t.id);
                      setNextStatus(!t.status);
                      setShowStatusPopup(true);
                    }}
                  />
                </td>
                <td>
                  <div className="test-management-row-actions">
                    <EditButton
                      onClick={() =>
                        runWithLoader(() => {
                          showToast("info", "Test edit page opened");
                          navigate(`/admin/test-management/edit/${t.id}`);
                        })
                      }
                    />
                    <DeleteButton onClick={() => handleDeleteClick(t.id)} />
                  </div>
                </td>
              </tr>
            ))}

            {visibleTests.length === 0 && (
              <tr>
                <td colSpan="5" className="test-management-no-data">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="test-management-footer">
        <p className="test-management-info">
          Showing {filteredTests.length === 0 ? 0 : startIndex + 1} to{" "}
          {Math.min(endIndex, filteredTests.length)} of{" "}
          {filteredTests.length} entries
        </p>

        <div className="test-management-pagination">
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

      {/* CONFIRMATIONS */}
      {showDeletePopup && (
        <ConfirmationCard
          message="You want to delete this test."
          onConfirm={confirmDelete}
          onCancel={() => setShowDeletePopup(false)}
        />
      )}

      {showStatusPopup && (
        <ConfirmationCard
          message={
            nextStatus
              ? "Do you want to upload this test?"
              : "Do you want to move this test to draft?"
          }
          onConfirm={confirmStatusToggle}
          onCancel={() => setShowStatusPopup(false)}
        />
      )}
    </div>
  );
};

export default TestManagement;
