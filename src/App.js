import { Routes, Route, Navigate } from "react-router-dom";
import ToastProvider from "./Components/CustomComponents/CustomToast/ToastProvider";
import Auth from "./Components/Auth/Auth";
import StudentLayout from "./Components/Student/StudentLayout";
import StudentDashboard from "./Components/Student/StudentDashboard/StudentDashboard";
import StudentProfile from "./Components/Student/StudentProfile/StudentProfile";
import StudentCourses from "./Components/Student/StudentCourses/StudentCourses";
import ReferFriend from "./Components/Student/ReferFriend/ReferFriend";
import PurchaseHistory from "./Components/Student/PurchaseHistory/PurchaseHistory";
import StudentSupport from "./Components/Student/StudentSupport/StudentSupport";
import AdminLayout from "./Components/Admin/AdminLayout";
import AdminDashboard from "./Components/Admin/AdminDashboard/AdminDashboard";
import StudentsEnrolled from "./Components/Admin/StudentsEnrolled/StudentsEnrolled";
import ManageCourses from "./Components/Admin/ManageCourses/ManageCourses";
import CoursePage from "./Components/Student/CoursePage/CoursePage";
import CourseInfoChangeCard from "./Components/Admin/CourseInfoChangeCard/CourseInfoChangeCard";
import ChapterInfoChangeCard from "./Components/Admin/ChapterInfoChangeCard/ChapterInfoChangeCard";
import TestManagement from "./Components/Admin/TestManagement/TestManagement";
import TestInfoChangeCard from "./Components/Admin/TestInfoChangeCard/TestInfoChangeCard";
import HomePage from "./Components/Website/HomePage/HomePage";
import BackGround from "./Components/CustomComponents/BackGround/BackGround";
import AutoCarousel from "./Components/CustomComponents/AutoCarousel/AutoCarousel";

function App() {
  return (
    <>
      <ToastProvider />

      <Routes>
        {/* Public Website */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" />} />

        {/* Auth */}
        <Route path="/login" element={<Auth />} />

        {/* Student Panel */}
        <Route path="/student" element={<StudentLayout />}>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="courses" element={<StudentCourses />} />
          <Route path="courses/:courseId" element={<CoursePage />} />
          <Route path="refer-friend" element={<ReferFriend />} />
          <Route path="purchase-history" element={<PurchaseHistory />} />
          <Route path="support" element={<StudentSupport />} />
        </Route>

        {/* Admin Panel */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<StudentsEnrolled />} />
          <Route path="manage-courses" element={<ManageCourses />} />
          <Route
            path="manage-courses/new"
            element={<CourseInfoChangeCard mode="create" />}
          />
          <Route
            path="manage-courses/edit/:id"
            element={<CourseInfoChangeCard mode="edit" />}
          />
          <Route
            path="manage-courses/:courseId/chapters/:chapterIndex"
            element={<ChapterInfoChangeCard />}
          />
          <Route path="test-management" element={<TestManagement />} />
          <Route
            path="test-management/new"
            element={<TestInfoChangeCard mode="create" />}
          />
          <Route
            path="test-management/edit/:id"
            element={<TestInfoChangeCard mode="edit" />}
          />
        </Route>

        {/* Extra / Testing Routes */}
        <Route path="/carousel" element={<AutoCarousel />} />
        <Route path="/bg" element={<BackGround />} />

        {/* Fallback */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </>
  );
}

export default App;
