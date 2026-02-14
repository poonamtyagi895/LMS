import "./TableEntriesSelector.css";

const TableEntriesSelector = ({
  value,
  options = [10, 25, 50],
  onChange,
}) => {
  return (
    <div className="table-entries-selector">
      Show
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      entries
    </div>
  );
};

export default TableEntriesSelector;
