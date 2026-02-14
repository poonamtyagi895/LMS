import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TestManagement.css";

import AddButton from "../../CustomComponents/Buttons/AddButton/AddButton";
import SearchBar from "../../CustomComponents/Buttons/SearchBar/SearchBar";
import EditButton from "../../CustomComponents/Buttons/EditButton/EditButton";
import DeleteButton from "../../CustomComponents/Buttons/DeleteButton/DeleteButton";
import ChangeTextButton from "../../CustomComponents/Buttons/ChangeTextButton/ChangeTextButton";
import SegmentedTabs from "../../CustomComponents/SegmentedTabs/SegmentedTabs";

import ConfirmationCard from "../../CustomComponents/ConfirmationCard/ConfirmationCard";
import JumpLoader from "../../CustomComponents/Loaders/JumpLoader/JumpLoader";
import { showToast } from "../../CustomComponents/CustomToast/CustomToast";

import Table from "../../CustomComponents/TableComponents/Table/Table";
import TablePagination from "../../CustomComponents/TableComponents/TablePagination/TablePagination";
import TableEntriesDisplay from "../../CustomComponents/TableComponents/TableEntriesDisplay/TableEntriesDisplay";
import TableEntriesSelector from "../../CustomComponents/TableComponents/TableEntriesSelector/TableEntriesSelector";

/* MOCK TEST DATA */
const INITIAL_TESTS = [
  {
    id: 1,
    title: "Maths Unit Test",
    category: "Class 6",
    status: true,
    testType: "Mock Test",
  },
  {
    id: 2,
    title: "Science Monthly Test",
    category: "Class 8",
    status: false,
    testType: "Diagnostic Test",
  },
  {
    id: 3,
    title: "English Grammar Test",
    category: "Class 10",
    status: true,
    testType: "Practice Test",
  },
];

const TEST_TABS = [
  { label: "All", value: "all" },
  { label: "Mock Test", value: "Mock Test" },
  { label: "Diagnostic Test", value: "Diagnostic Test" },
  { label: "Practice Test", value: "Practice Test" },
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

  const [activeTab, setActiveTab] = useState("all");

  /* LOADER HELPER */
  const runWithLoader = (cb) => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      cb();
    }, 500);
  };

  /* SEARCH */
  const filteredTests = tests.filter((t) => {
    const matchesSearch = t.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesTab =
      activeTab === "all" ? true : t.testType === activeTab;

    return matchesSearch && matchesTab;
  });

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

  const columns = [
    {
      key: "serial",
      label: "S.No.",
      render: (_, row, index) => startIndex + index + 1,
    },
    { key: "title", label: "Test Title" },
    { key: "category", label: "Test Category" },

    {
      key: "status",
      label: "Status",
      render: (_, row) => (
        <ChangeTextButton
          isActive={row.status}
          beforeText="Draft"
          afterText="Uploaded"
          onClick={() => {
            setStatusId(row.id);
            setNextStatus(!row.status);
            setShowStatusPopup(true);
          }}
        />
      ),
    },

    {
      key: "actions",
      label: "Actions",
      align: "center",
      render: (_, row) => (
        <div className="test-management-row-actions">
          <EditButton
            onClick={() =>
              runWithLoader(() => {
                showToast("info", "Test edit page opened");
                navigate(`/admin/test-management/edit/${row.id}`);
              })
            }
          />
          <DeleteButton onClick={() => handleDeleteClick(row.id)} />
        </div>
      ),
    },
  ];

  return (
    <div className="test-management-page">
      {showLoader && <JumpLoader />}

      {/* HEADER */}
      <div className="test-management-header">
        <div>
          <h1 className="test-management-title">Manage Tests</h1>
          <p className="test-management-subtitle">
            Total Tests: {filteredTests.length}
          </p>
        </div>
        <div className="test-management-segmented-tabs">
          <SegmentedTabs
            tabs={TEST_TABS}
            activeValue={activeTab}
            onChange={setActiveTab}
          />
        </div>
      </div>
      {/* CONTROLS */}
      <div className="test-management-controls">
        <TableEntriesSelector
          value={entriesPerPage}
          onChange={(value) => {
            setEntriesPerPage(value);
            setCurrentPage(1);
          }}
        />

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
      <Table
        columns={columns}
        data={visibleTests}
        rowKey="id"
        size="compact"
      />

      {/* FOOTER */}
      <div className="test-management-footer">
        <TableEntriesDisplay
          startIndex={startIndex}
          endIndex={endIndex}
          total={filteredTests.length}
        />

        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
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
