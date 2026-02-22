import { useState } from "react";
import "./CloseQueries.css";

import Table from "../../../../CustomComponents/TableComponents/Table/Table";
import TablePagination from "../../../../CustomComponents/TableComponents/TablePagination/TablePagination";
import TableEntriesDisplay from "../../../../CustomComponents/TableComponents/TableEntriesDisplay/TableEntriesDisplay";
import TableEntriesSelector from "../../../../CustomComponents/TableComponents/TableEntriesSelector/TableEntriesSelector";
import SearchBar from "../../../../CustomComponents/Buttons/SearchBar/SearchBar";
import DotButton from "../../../../CustomComponents/Buttons/DotButton/DotButton";
import RatingPage from "../../../../CustomComponents/RatingPage/RatingPage";
import StarRating from "../../../../CustomComponents/RatingPage/StarRating";

const INITIAL_CLOSE = [
  { id:1, caseId:"Q201", message:"Certificate issue", type:"Certificate", date:"10 Feb 2026", status:"Closed", rating:"" },
  { id:2, caseId:"Q202", message:"Video not loading", type:"Technical", date:"08 Feb 2026", status:"Closed", rating:"" }
];

const CloseQueries = () => {

  const [queries] = useState(INITIAL_CLOSE);
  const [search,setSearch] = useState("");
  const [entriesPerPage,setEntriesPerPage] = useState(10);
  const [currentPage,setCurrentPage] = useState(1);
  const [showRating,setShowRating] = useState(false);
  const [activeQueryId,setActiveQueryId] = useState(null);
  const [ratings,setRatings] = useState({});

  const filtered = queries.filter(q =>
    q.message.toLowerCase().includes(search.toLowerCase())
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
    { key:"status",label:"QUERY STATUS" },
    {
      key:"rating",
      label:"RATING",
      align:"center",
      render:(_,row)=>(
        ratings[row.id] ? (
          <StarRating value={ratings[row.id]} readOnly />
        ) : (
          <DotButton
            label="Rate"
            onClick={()=>{
              setActiveQueryId(row.id);
              setShowRating(true);
            }}
          />
        )
      )
    }
  ];

  return(
    <div className="close-queries-page">

      <div className="close-queries-controls">
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

      <div className="close-queries-footer">
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
      {showRating && (
        <RatingPage
          onClose={()=>setShowRating(false)}
          onSubmit={(value)=>{
            setRatings(prev=>({
              ...prev,
              [activeQueryId]: value
            }));
            setShowRating(false);
          }}
        />
      )}
    </div>
  );
};

export default CloseQueries;