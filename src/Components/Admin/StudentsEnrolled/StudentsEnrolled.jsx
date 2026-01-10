import "./StudentsEnrolled.css";

const StudentsEnrolled = () => {
  const students = [
    { id: 1, name: "Sahil", email: "sahil@gmail.com", courses: 3, date: "08 Jan 2026", status: "Active" },
    { id: 2, name: "Priya Sharma", email: "priya@gmail.com", courses: 2, date: "07 Jan 2026", status: "Completed" },
    { id: 3, name: "Rahul Singh", email: "rahul@gmail.com", courses: 4, date: "06 Jan 2026", status: "Active" },
    { id: 4, name: "Ananya Gupta", email: "ananya@gmail.com", courses: 1, date: "06 Jan 2026", status: "Completed" },
  ];

  return (
    <div className="students-enrolled">
      <h1>Students Enrolled</h1>
      <p>Total Students: {students.length}</p>

      <div className="students-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Email</th>
              <th>Courses</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.courses}</td>
                <td>{s.date}</td>
                <td>
                  <span className={`status ${s.status.toLowerCase()}`}>
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsEnrolled;
