import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import RoleSelection from "./pages/RoleSelection";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import StudentLogin from "./pages/StudentLogin";
import TeacherLogin from "./pages/TeacherLogin";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Logout from "./components/Logout";
import api from "./api/api"; // axios instance

export default function App() {
  const [user, setUser] = useState(null);

  // Login handler
  const handleLogin = async (loginData) => {
    try {
      const res = await api.post("/auth/login", {
        email: loginData.email,
        password: loginData.password,
      });

      if (!res.data.success) {
        alert("Login failed: " + res.data.message);
        return;
      }

      const loggedInUser = {
        email: res.data.email,
        role: res.data.role,
        _id: res.data._id,
        name: res.data.name,
        profilePic: res.data.profilePic || "",
        phone: res.data.phone || "",
      };

      // Admin access check
      if (loggedInUser.role === "admin" && loggedInUser.email !== "bhanuprakashmdpl@gmail.com") {
        alert("Unauthorized admin access");
        return;
      }

      let studentProfile = null;

      // If student, create/fetch student profile
      if (loggedInUser.role === "student") {
        try {
          const studentRes = await api.post("/student/create", {
            userId: loggedInUser._id,
            name: loggedInUser.name,
            email: loggedInUser.email,
            profilePic: loggedInUser.profilePic,
            phone: loggedInUser.phone,
          });
          studentProfile = studentRes.data;
        } catch (err) {
          console.error("Failed to create student profile:", err);
          alert("Failed to create student profile");
          return;
        }
      }

      setUser({ ...loggedInUser, studentProfile });
    } catch (err) {
      console.error("Login error:", err);
      alert("Login error");
    }
  };

  // Logout handler
  const handleLogout = () => setUser(null);

  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Role Selection */}
        <Route path="/select-role" element={<RoleSelection />} />

        {/* Signup */}
        <Route path="/signup" element={<Signup />} />

        {/* Generic Login */}
        <Route
          path="/login"
          element={
            user ? <Navigate to={`/dashboard/${user.role}`} replace /> : <Login onLogin={handleLogin} />
          }
        />

        {/* Student Login */}
        <Route
          path="/login/student"
          element={
            user ? <Navigate to="/dashboard/student" replace /> : <StudentLogin onLogin={handleLogin} />
          }
        />

        {/* Teacher Login */}
        <Route
          path="/login/teacher"
          element={
            user ? <Navigate to="/dashboard/teacher" replace /> : <TeacherLogin onLogin={handleLogin} />
          }
        />

        {/* Dashboards */}
        <Route
          path="/dashboard/student"
          element={
            user?.role === "student" ? (
              <div className="min-h-screen flex flex-col">
                <div className="flex justify-end p-4 bg-indigo-100">
                  <Logout onLogout={handleLogout} />
                </div>
                <StudentDashboard studentProfile={user.studentProfile} />
              </div>
            ) : (
              <Navigate to="/login/student" replace />
            )
          }
        />

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

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
