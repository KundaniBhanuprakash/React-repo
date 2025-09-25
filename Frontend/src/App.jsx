import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import RoleSelection from "./pages/RoleSelection";
import Login from "./pages/Login";
import StudentLogin from "./pages/StudentLogin";
import TeacherLogin from "./pages/TeacherLogin";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  const [user, setUser] = useState(null);

  // Restore from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Handle login
  const handleLogin = ({ email, role }) => {
    const loggedInUser = { email, role };
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <Routes>
        {/* Landing + Role select */}
        <Route path="/" element={<Landing />} />
        <Route path="/select-role" element={<RoleSelection />} />

        {/* Generic Login (not used much if role-based logins exist) */}
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

        {/* Student Login → Dashboard */}
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
          path="/dashboard/student"
          element={
            user?.role === "student" ? (
              <StudentDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login/student" replace />
            )
          }
        />

        {/* Teacher Login → Dashboard */}
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
        <Route
          path="/dashboard/teacher"
          element={
            user?.role === "teacher" ? (
              <TeacherDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login/teacher" replace />
            )
          }
        />

        {/* Admin Login → Dashboard */}
        <Route
          path="/dashboard/admin"
          element={
            user?.role === "admin" && user?.email === "bhanuprakashmdpl@gmail.com" ? (
              <AdminDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
