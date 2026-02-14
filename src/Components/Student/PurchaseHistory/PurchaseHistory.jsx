import "./PurchaseHistory.css";
import Table from "../../CustomComponents/TableComponents/Table/Table";

const PurchaseHistory = () => {
  const purchases = [
    {
      id: 1,
      course: "React Mastery",
      price: "₹2,999",
      date: "12 Jan 2026",
    },
    {
      id: 2,
      course: "Node.js Backend",
      price: "₹2,499",
      date: "05 Jan 2026",
    },
    {
      id: 3,
      course: "MongoDB Essentials",
      price: "₹1,999",
      date: "28 Dec 2025",
    },
  ];

  const columns = [
    { key: "course", label: "Course Name" },
    { key: "price", label: "Price" },
    { key: "date", label: "Purchase Date" },
  ];

  return (
    <div className="purchase-history-page">
      <div className="purchase-history-header">
        <h1 className="purchase-history-title">Purchase History</h1>
        <p className="purchase-history-subtitle">
          View all your purchased courses
        </p>
      </div>

      <Table
        title="Purchased Courses"
        columns={columns}
        data={purchases}
      />
    </div>
  );
};

export default PurchaseHistory;
