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
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./components/Logout";

export default function App() {
  const [user, setUser] = useState(null);

  // Login handler: updates user state with email and role
  const handleLogin = ({ email, role }) => setUser({ email, role });

  // Logout handler: clears user state
  const handleLogout = () => setUser(null);

  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Role Selection Page */}
        <Route path="/select-role" element={<RoleSelection />} />

        {/* Generic Login: redirects to role-based dashboard if already logged in */}
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

        {/* Student Dashboard (Protected) */}
        <Route
            path="/dashboard/student"
             element={
        <PrivateRoute
            user={user}
          role="student"
           component={() => <StudentDashboard onLogout={handleLogout} />}
          />
       }
        />

        <Route
            path="/dashboard/teacher"
            element={
        <PrivateRoute
            user={user}
            role="teacher"
           component={() => <TeacherDashboard onLogout={handleLogout} />}
          />
       }
        />

        <Route
            path="/dashboard/admin"
            element={
        <PrivateRoute
            user={user}
           role="admin"
           component={() => <AdminDashboard onLogout={handleLogout} />}
         />
       }
        />

        {/* Catch-all Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
