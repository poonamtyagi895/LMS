import { Routes, Route, Navigate } from "react-router-dom";

import Auth from "./Components/Auth/Auth";
import StudentDashboard from "./Components/Student/StudentDashboard";

import AdminLayout from "./Components/Admin/AdminLayout";
import AdminDashboard from "./Components/Admin/AdminDashboard/AdminDashboard";
import StudentsEnrolled from "./Components/Admin/StudentsEnrolled/StudentsEnrolled";
import ManageCourses from "./Components/Admin/ManageCourses/ManageCourses";
import TestManagement from "./Components/Admin/TestManagement/TestManagement";
import Home from "./Components/Home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Auth />} />

      <Route path="/student/dashboard" element={<StudentDashboard />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="students" element={<StudentsEnrolled />} />
        <Route path="courses" element={<ManageCourses />} />
        <Route path="tests" element={<TestManagement />} />
      </Route>

      <Route path="/home" element={<Home/>}/>

      <Route path="*" element={<h2>Page Not Found</h2>} />
    </Routes>
  );
}

export default App;
