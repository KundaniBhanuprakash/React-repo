import React from "react";
import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const navigate = useNavigate();

  const handleRoleClick = (role) => {
    switch (role) {
      case "student":
        navigate("/login/student");
        break;
      case "teacher":
        navigate("/login/teacher");
        break;
      case "admin":
        navigate("/login/admin");
        break;
      default:
        navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-12">Select Your Role</h2>
      <div className="grid gap-8 md:grid-cols-3 max-w-6xl w-full px-6">
        {/* Student */}
        <div
          onClick={() => handleRoleClick("student")}
          className="cursor-pointer p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition text-center"
        >
          <h3 className="text-xl font-bold text-indigo-600 mb-2">Student</h3>
          <p className="text-gray-600">Access courses, quizzes, and certificates.</p>
        </div>

        {/* Teacher */}
        <div
          onClick={() => handleRoleClick("teacher")}
          className="cursor-pointer p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition text-center"
        >
          <h3 className="text-xl font-bold text-green-600 mb-2">Teacher</h3>
          <p className="text-gray-600">Manage courses, assignments, and student progress.</p>
        </div>

        {/* Admin */}
        <div
          onClick={() => handleRoleClick("admin")}
          className="cursor-pointer p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition text-center"
        >
          <h3 className="text-xl font-bold text-red-600 mb-2">Admin</h3>
          <p className="text-gray-600">Admin login for authorized personnel only.</p>
        </div>
      </div>
    </div>
  );
}
