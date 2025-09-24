// src/pages/Login.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/api";

export default function Login({ onLogin }) {
  const { role } = useParams(); // "student", "teacher", "admin"
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Make API call to backend login endpoint
      const res = await api.post("/auth/login", { email, password });
      
      if (res.data.success) {
        onLogin({ email: res.data.email, role: res.data.role });
        navigate(`/dashboard/${res.data.role}`); // Role-based redirection
      } else {
        alert("Login failed: " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Login error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {role?.charAt(0).toUpperCase() + role?.slice(1)} Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded mb-6"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
