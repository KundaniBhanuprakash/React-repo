import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/api"; // Assuming correct path

export default function RoleSelection() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState(["student", "teacher"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      // Simulate API call for admin detection
      try {
        const res = await axios.get("/auth/current-user"); 
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
    // Admin uses a generic login page, others use role-specific
    if (role === "admin") navigate("/login"); 
    else navigate(`/login/${role}`);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center py-20 text-gray-500 text-xl animate-pulse">
        Checking roles...
      </div>
    </div>
  );

  const roleConfigs = {
    student: {
      title: "Student",
      description: "Access your enrolled courses, submit assignments, and track grades. Ready to learn?",
      icon: "🎓",
      color: "indigo",
    },
    teacher: {
      title: "Teacher",
      description: "Manage your assigned courses, grade student work, and post announcements. Time to teach!",
      icon: "👩‍🏫",
      color: "green",
    },
    admin: {
      title: "Administrator",
      description: "System management: oversee courses, users, and institute settings. Authorized personnel only.",
      icon: "⚙️",
      color: "red",
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-16 px-4">
      <div className="max-w-5xl w-full">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
          Who Are You Logging In As?
        </h2>
        <p className="text-lg text-gray-600 mb-12 text-center">
          Select your role to be redirected to the appropriate login page.
        </p>

        <div
          className={`grid gap-8 w-full 
            ${roles.length === 1 ? "grid-cols-1 place-items-center" : ""}
            ${roles.length === 2 ? "grid-cols-1 md:grid-cols-2" : ""}
            ${roles.length === 3 ? "grid-cols-1 md:grid-cols-3" : ""}`}
        >
          {roles.map((role) => {
            const config = roleConfigs[role];
            return (
              <RoleCard
                key={role}
                config={config}
                onClick={() => handleRoleClick(role)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Reusable Role Card Component
const RoleCard = ({ config, onClick }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer p-8 bg-white rounded-3xl shadow-xl border-t-4 border-${config.color}-500 
      hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 text-center space-y-3`}
  >
    <div className={`text-5xl mb-4 text-${config.color}-600`}>{config.icon}</div>
    <h3 className={`text-2xl font-bold mb-2 text-gray-800`}>
      {config.title} Login
    </h3>
    <p className="text-gray-500 text-sm">{config.description}</p>
    <button
      className={`mt-4 px-6 py-2 bg-${config.color}-600 text-white font-semibold rounded-lg shadow hover:bg-${config.color}-700 transition`}
    >
      Continue as {config.title}
    </button>
  </div>
);