import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 bg-white shadow-md rounded-b-xl">
        <h1 className="text-4xl font-extrabold text-indigo-600">Mini LMS</h1>
        <Link
          to="/login"
          className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Login
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 text-center mt-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to Mini LMS
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-10">
          A simple learning management system. Please login as a Student, Teacher, or Admin to get started.
        </p>

        {/* Role Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mt-10">
        {/* Student Card */}
         <Link to="/login/student" className="p-6 bg-white rounded-2xl shadow-lg transform hover:scale-105 transition duration-300 block">
           <h3 className="text-xl font-bold text-indigo-600 mb-2">Students</h3>
          <p className="text-gray-600">View enrolled courses, download certificates.</p>
         </Link>

         {/* Teacher Card */}
         <Link to="/login/teacher" className="p-6 bg-white rounded-2xl shadow-lg transform hover:scale-105 transition duration-300 block">
          <h3 className="text-xl font-bold text-green-600 mb-2">Teachers</h3>
          <p className="text-gray-600">Manage students, upload assignments, track progress.</p>
         </Link>

          {/* Admin Card */}
         <Link to="/login/admin" className="p-6 bg-white rounded-2xl shadow-lg transform hover:scale-105 transition duration-300 block">
          <h3 className="text-xl font-bold text-red-600 mb-2">Admins</h3>
          <p className="text-gray-600">Admin login is restricted to authorized personnel.</p>
         </Link>
        </section>

      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500">
        &copy; {new Date().getFullYear()} Mini LMS. All rights reserved.
      </footer>
    </div>
  );
}
