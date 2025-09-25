import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import RoleSelection from "./pages/RoleSelection";
import Login from "./pages/Login";
import StudentLogin from "./pages/StudentLogin";
import TeacherLogin from "./pages/TeacherLogin";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Logout from "./components/Logout";

export default function App() {
  const [user, setUser] = useState(null);

  // Login handler
  const handleLogin = ({ email, role }) => setUser({ email, role });

  // Logout handler
  const handleLogout = () => setUser(null);

  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Role Selection */}
        <Route path="/select-role" element={<RoleSelection />} />

        {/* Generic Login */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to={`/dashboard/${user.role}`} replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* Student Login */}
        <Route
          path="/login/student"
          element={
            user ? (
              <Navigate to="/dashboard/student" replace />
            ) : (
              <StudentLogin onLogin={handleLogin} />
            )
          }
        />
        {/* Teacher Login */}
        <Route
          path="/login/teacher"
          element={
            user ? (
              <Navigate to="/dashboard/teacher" replace />
            ) : (
              <TeacherLogin onLogin={handleLogin} />
            )
          }
        />

        {/* Student Dashboard */}
        <Route
          path="/dashboard/student"
          element={
            user?.role === "student" ? (
              <div className="min-h-screen flex flex-col">
                <div className="flex justify-end p-4 bg-indigo-100">
                  <Logout onLogout={handleLogout} />
                </div>
                <StudentDashboard />
              </div>
            ) : (
              <Navigate to="/login/student" replace />
            )
          }
        />

        {/* Teacher Dashboard */}
        <Route
          path="/dashboard/teacher"
          element={
            user?.role === "teacher" ? (
              <div className="min-h-screen flex flex-col">
                <div className="flex justify-end p-4 bg-green-100">
                  <Logout onLogout={handleLogout} />
                </div>
                <TeacherDashboard />
              </div>
            ) : (
              <Navigate to="/login/teacher" replace />
            )
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/dashboard/admin"
          element={
            user?.role === "admin" && user?.email === "bhanuprakashmdpl@gmail.com" ? (
              <div className="min-h-screen flex flex-col">
                <div className="flex justify-end p-4 bg-gray-100">
                  <Logout onLogout={handleLogout} />
                </div>
                <AdminDashboard />
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch-all Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
