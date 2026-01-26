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
import Home from "./Components/Home/Home";

//Test
import BackGround from "./Components/CustomComponents/BackGround/BackGround";

function App() {
  return (
    <>
      <ToastProvider /> {/* GLOBAL TOAST HOST */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Auth />} />

        <Route path="/student/dashboard" element={<StudentDashboard />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<StudentsEnrolled />} />
          <Route path="manage-courses" element={<ManageCourses />} />
            <Route path="manage-courses/new" element={<CourseInfoChangeCard mode="create" />}/>
            <Route path="manage-courses/edit/:id" element={<CourseInfoChangeCard mode="edit" />}/>
            <Route path="manage-courses/:courseId/chapters/:chapterIndex" element={<ChapterInfoChangeCard />}/>
          <Route path="test-management" element={<TestManagement />} />
        </Route>

        {/* Test */}

        <Route path="/bg" element={<BackGround/>}/>

        {/* Test */}


        <Route path="/home" element={<Home/>}/>

        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </>
  );
}

export default App;
