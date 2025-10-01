import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/api";

export default function RoleSelection() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState(["student", "teacher"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get("/auth/current-user"); // backend check
        if (res.data?.role === "admin") {
          setRoles(["student", "teacher", "admin"]);
        }
      } catch (err) {
        console.warn("No backend detected, defaulting roles.");
      } finally {
        setLoading(false);
      }
    };
    checkAdmin();
  }, []);

  const handleRoleClick = (role) => {
    if (role === "admin") navigate("/login"); // admin has general login
    else navigate(`/login/${role}`);
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-12">Select Your Role</h2>

      <div
        className={`grid gap-8 px-6 w-full max-w-6xl 
          ${roles.length === 1 ? "grid-cols-1 place-items-center" : ""}
          ${roles.length === 2 ? "grid-cols-1 md:grid-cols-2" : ""}
          ${roles.length === 3 ? "grid-cols-1 md:grid-cols-3" : ""}`}
      >
        {roles.map((role) => (
          <div
            key={role}
            onClick={() => handleRoleClick(role)}
            className={`cursor-pointer p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition text-center
              ${role === "student" ? "text-indigo-600" : role === "teacher" ? "text-green-600" : "text-red-600"}
            `}
          >
            <h3 className="text-xl font-bold mb-2">
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </h3>
            <p className="text-gray-600">
              {role === "student"
                ? "Access courses, quizzes, and certificates."
                : role === "teacher"
                ? "Manage courses, assignments, and student progress."
                : "Admin login for authorized personnel only."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
