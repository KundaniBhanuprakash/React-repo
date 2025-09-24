import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import RoleSelection from "./pages/RoleSelection";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import StudentLogin from "./pages/StudentLogin";
import TeacherLogin from "./pages/TeacherLogin";

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin = ({ email, role }) => {
    setUser({ email, role });
  };

  return (
    <Router>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Landing />} />
        <Route path="/select-role" element={<RoleSelection />} />
        <Route path="/login/:role" element={<Login />} />

        {/* Login pages */}
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

        {/* Dashboards (protected) */}
        <Route
          path="/dashboard/student"
          element={
            user?.role === "student" ? (
              <StudentDashboard />
            ) : (
              <Navigate to="/login/student" replace />
            )
          }
        />

        <Route
          path="/dashboard/teacher"
          element={
            user?.role === "teacher" ? (
              <TeacherDashboard />
            ) : (
              <Navigate to="/login/teacher" replace />
            )
          }
        />

        <Route
          path="/dashboard/admin"
          element={
            user?.role === "admin" && user?.email === "bhanuprakashmdpl@gmail.com" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}
