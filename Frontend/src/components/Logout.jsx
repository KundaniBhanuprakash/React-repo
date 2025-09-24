import React from "react";

export default function Logout({ onLogout }) {
  return (
    <button
      onClick={onLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
}
