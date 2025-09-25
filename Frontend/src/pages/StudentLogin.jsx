import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Mock validation (replace with backend call)
    if (email && password) {
      onLogin({ email, role: "student" });
      navigate("/dashboard/student"); // 🚀 go to student dashboard
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
          Student Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
