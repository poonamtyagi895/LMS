import { useState } from "react";
import "./OpenQueries.css";

import Table from "../../../../CustomComponents/TableComponents/Table/Table";
import TablePagination from "../../../../CustomComponents/TableComponents/TablePagination/TablePagination";
import TableEntriesDisplay from "../../../../CustomComponents/TableComponents/TableEntriesDisplay/TableEntriesDisplay";
import TableEntriesSelector from "../../../../CustomComponents/TableComponents/TableEntriesSelector/TableEntriesSelector";
import SearchBar from "../../../../CustomComponents/Buttons/SearchBar/SearchBar";

const INITIAL_OPEN = [];

const OpenQueries = () => {

  const [queries] = useState(INITIAL_OPEN);
  const [search,setSearch] = useState("");
  const [entriesPerPage,setEntriesPerPage] = useState(10);
  const [currentPage,setCurrentPage] = useState(1);

  const filtered = queries.filter(q =>
    (q.message || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / entriesPerPage);
  const startIndex = (currentPage-1)*entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const visible = filtered.slice(startIndex,endIndex);

  const columns = [
    { key:"caseId",label:"CASE ID" },
    { key:"message",label:"QUERY MESSAGE" },
    { key:"type",label:"QUERY TYPE" },
    { key:"date",label:"DATE OF QUERY" },
    { key:"status",label:"QUERY STATUS" }
  ];

  return(
    <div className="open-queries-page">

      <div className="open-queries-controls">
        <TableEntriesSelector
          value={entriesPerPage}
          onChange={(v)=>{
            setEntriesPerPage(v);
            setCurrentPage(1);
          }}
        />
        <SearchBar
          value={search}
          onChange={(e)=>{
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <Table
        columns={columns}
        data={visible}
        rowKey="id"
        size="compact"
      />

      <div className="open-queries-footer">
        <TableEntriesDisplay
          startIndex={startIndex}
          endIndex={endIndex}
          total={filtered.length}
        />
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

    </div>
  );
};

export default OpenQueries;