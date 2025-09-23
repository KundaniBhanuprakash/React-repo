import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TeacherLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "teacher@example.com" && password === "teacher123") {
      alert("Teacher logged in successfully!");
      navigate("/dashboard/teacher"); // Redirect to teacher dashboard
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-green-600 text-center">Teacher Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-400" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-400" required />
        <button className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition">Login</button>
        <p className="mt-4 text-gray-500 text-sm">Test: teacher@example.com / teacher123</p>
      </form>
    </div>
  );
}
