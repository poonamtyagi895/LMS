import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Auth from "./Components/Auth/Auth";
import Dashboard from "./Components/Dashboard/Dashboard";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import StudentDashboard from "./Components/Student/StudentDashboard";

function App() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Auth */}
      <Route path="/login" element={<Auth />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />

      {/* Fallback */}
      <Route path="*" element={<h2>Page Not Found</h2>} />
    </Routes>
  );
}

export default App;
