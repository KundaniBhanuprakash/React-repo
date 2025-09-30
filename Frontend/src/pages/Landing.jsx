import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Mini LMS</h1>
          <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
            <li><a href="#about" className="hover:text-indigo-600">About</a></li>
            <li><a href="#features" className="hover:text-indigo-600">Features</a></li>
            <li><a href="#institute" className="hover:text-indigo-600">Institute</a></li>
            <li><a href="#contact" className="hover:text-indigo-600">Contact</a></li>
          </ul>
          <button
            onClick={() => navigate("/select-role")}
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-indigo-100 to-purple-100 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Welcome to Mini LMS
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          A modern and simple Learning Management System designed for Students, Teachers, 
          and Institutions to make learning smooth, efficient, and fun.
        </p>
      </header>

      {/* About Section */}
      <section className="py-16 px-6 bg-white" id="about">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">About Us</h3>
          <p className="text-gray-600 leading-relaxed">
            Mini LMS is a lightweight yet powerful learning management system built to simplify online education.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-50" id="features">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-12">Key Features</h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded-2xl shadow">
              <h4 className="font-bold text-indigo-600 mb-2">Interactive Courses</h4>
              <p className="text-gray-600">Enroll and learn with structured lessons and resources.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow">
              <h4 className="font-bold text-green-600 mb-2">Assignments & Quizzes</h4>
              <p className="text-gray-600">Track your progress with engaging quizzes and assignments.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow">
              <h4 className="font-bold text-purple-600 mb-2">Certificates</h4>
              <p className="text-gray-600">Get certified for your efforts and showcase your skills.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Institute Section */}
      <section className="py-16 px-6 bg-white" id="institute">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Institute</h3>
          <p className="text-gray-600">
            Partnered with leading educators, Mini LMS brings quality education to your fingertips.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 bg-gray-50" id="contact">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h3>
          <p className="text-gray-600 mb-4">
            Have questions? Reach out to us and we’ll be happy to help!
          </p>
          <a
            href="mailto:support@minilms.com"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          >
            support@minilms.com
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 mt-10 text-center">
        <p>&copy; {new Date().getFullYear()} Mini LMS. All rights reserved.</p>
      </footer>
    </div>
  );
}
