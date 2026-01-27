import { Routes, Route, Navigate } from "react-router-dom";

import ToastProvider from "./Components/CustomComponents/CustomToast/ToastProvider";

import Auth from "./Components/Auth/Auth";
import StudentDashboard from "./Components/Student/StudentDashboard";

import AdminLayout from "./Components/Admin/AdminLayout";
import AdminDashboard from "./Components/Admin/AdminDashboard/AdminDashboard";
import StudentsEnrolled from "./Components/Admin/StudentsEnrolled/StudentsEnrolled";

import ManageCourses from "./Components/Admin/ManageCourses/ManageCourses";
import CourseInfoChangeCard from "./Components/CustomComponents/CourseInfoChangeCard/CourseInfoChangeCard";
import ChapterInfoChangeCard from "./Components/CustomComponents/ChapterInfoChangeCard/ChapterInfoChangeCard";

import TestManagement from "./Components/Admin/TestManagement/TestManagement";
import TestInfoChangeCard from "./Components/CustomComponents/TestInfoChangeCard/TestInfoChangeCard";

import Home from "./Components/Home/Home";
import BackGround from "./Components/CustomComponents/BackGround/BackGround";

function App() {
  return (
    <>
      <ToastProvider />

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Auth />} />

        <Route path="/student/dashboard" element={<StudentDashboard />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>

          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<StudentsEnrolled />} />

          {/* COURSES */}
          <Route path="manage-courses" element={<ManageCourses />} />
          <Route path="manage-courses/new" element={<CourseInfoChangeCard mode="create" />} />
          <Route path="manage-courses/edit/:id" element={<CourseInfoChangeCard mode="edit" />} />
          <Route
            path="manage-courses/:courseId/chapters/:chapterIndex"
            element={<ChapterInfoChangeCard />}
          />

          {/* TESTS */}
          <Route path="test-management" element={<TestManagement />} />
          <Route path="test-management/new" element={<TestInfoChangeCard mode="create" />} />
          <Route path="test-management/edit/:id" element={<TestInfoChangeCard mode="edit" />} />

        </Route>

        {/* TEST / MISC */}
        <Route path="/bg" element={<BackGround />} />
        <Route path="/home" element={<Home />} />

        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </>
  );
}

export default App;
