// Table.jsx
import "./Table.css";

const Table = ({
  title = "",
  columns = [],
  data = [],
  rowKey = "id",
  rightSlot = null,
}) => {
  return (
    <div className="table-card">
      {(title || rightSlot) && (
        <div className="table-header">
          {title && <h3 className="table-title">{title}</h3>}
          {rightSlot && <div className="table-header-right">{rightSlot}</div>}
        </div>
      )}

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="table-empty"
                >
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row[rowKey]}>
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render
                        ? col.render(row[col.key], row)
                        : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
