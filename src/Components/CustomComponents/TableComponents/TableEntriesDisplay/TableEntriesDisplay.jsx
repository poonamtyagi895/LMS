import "./TableEntriesDisplay.css";

const TableEntriesDisplay = ({
  startIndex = 0,
  endIndex = 0,
  total = 0,
}) => {
  return (
    <p className="table-entries-display">
      Showing {total === 0 ? 0 : startIndex + 1} to{" "}
      {Math.min(endIndex, total)} of {total} entries
    </p>
  );
};

export default TableEntriesDisplay;
