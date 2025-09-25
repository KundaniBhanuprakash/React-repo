// src/components/Logout.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({ onLogout }) {
  const navigate = useNavigate();

  const handleClick = () => {
    onLogout();          // clear user in App.jsx
    navigate("/login");  // redirect to login page
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
    >
      Logout
    </button>
  );
}
