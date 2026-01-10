import "./DashboardAdminLatestEnrollments.css";

const DashboardAdminLatestEnrollments = () => {
  const enrollments = [
    {
      id: 1,
      name: "Sahil",
      course: "React",
      date: "08 Jan 2026",
    },
    {
      id: 2,
      name: "Priya Sharma",
      course: "Node.js",
      date: "07 Jan 2026",
    },
    {
      id: 3,
      name: "Rahul Singh",
      course: "MongoDB",
      date: "07 Jan 2026",
    },
    {
      id: 4,
      name: "Ananya Gupta",
      course: "JavaScript",
      date: "06 Jan 2026",
    },
    {
      id: 5,
      name: "Vikram Reddy",
      course: "HTML & CSS",
      date: "06 Jan 2026",
    },
  ];

  return (
    <div className="dashboard-latest-enrollments-container">
      <h3 className="dashboard-latest-enrollments-title">
        Latest enrollments
      </h3>

      <div className="dashboard-latest-enrollments-table-wrapper">
        <table className="dashboard-latest-enrollments-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Student Name</th>
              <th>Course</th>
              <th>Enrollment Date</th>
            </tr>
          </thead>

          <tbody>
            {enrollments.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.course}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardAdminLatestEnrollments;
