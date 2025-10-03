import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight">
            Mini LMS
          </h1>
          <ul className="hidden md:flex space-x-10 text-gray-600 font-medium text-sm">
            <li><a href="#about" className="hover:text-indigo-700 transition duration-150">About</a></li>
            <li><a href="#features" className="hover:text-indigo-700 transition duration-150">Features</a></li>
            <li><a href="#institute" className="hover:text-indigo-700 transition duration-150">Institute</a></li>
            <li><a href="#contact" className="hover:text-indigo-700 transition duration-150">Contact</a></li>
          </ul>

          <div className="flex space-x-3">
            <button
              onClick={() => navigate("/select-role")}
              className="px-6 py-2.5 text-sm font-semibold bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition transform hover:-translate-y-0.5"
            >
              Login / Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full Width, modern gradient */}
      <header className="py-24 md:py-32 text-center bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm font-semibold text-indigo-600 mb-2 uppercase tracking-wider">
            Education Reimagined
          </p>
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            The simplest way to <span className="text-indigo-600">learn and teach</span> online.
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Mini LMS is a powerful, lightweight platform designed for Students, Teachers, and Institutions to make learning smooth, efficient, and deeply engaging.
          </p>
          <div className="flex justify-center space-x-4">
             <button
              onClick={() => navigate("/select-role")}
              className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-xl shadow-indigo-300 hover:bg-indigo-700 transition transform hover:scale-[1.02]"
            >
              Start Learning Today
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-3 bg-white text-gray-700 font-semibold border border-gray-300 rounded-xl shadow-md hover:bg-gray-100 transition"
            >
              Explore Features
            </button>
          </div>
        </div>
      </header>

      {/* About Section - Simplified and focused */}
      <section className="py-20 px-6 bg-white" id="about">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Mini LMS?</h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Focus on what matters most: accessible, high-quality education for everyone, everywhere.
          </p>
        </div>
      </section>

      {/* Features - More visual cards */}
      <section className="py-20 px-6 bg-gray-50" id="features">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Key Features Designed For Success
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon="📚"
              title="Interactive Courses"
              description="Enroll and master new skills with structured, media-rich lessons."
              color="indigo"
            />
            <FeatureCard 
              icon="✍️"
              title="Assignments & Grading"
              description="Track progress efficiently with engaging quizzes and streamlined teacher grading."
              color="green"
            />
            <FeatureCard 
              icon="🏅"
              title="Official Certificates"
              description="Receive verified certificates upon course completion to showcase your achievements."
              color="purple"
            />
          </div>
        </div>
      </section>

      {/* Contact Section - Clean Call-to-Action */}
      <section className="py-20 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Learning?</h3>
          <p className="text-lg text-gray-600 mb-8">
            Join the Mini LMS community and experience seamless online education.
          </p>
          <a
            href="mailto:support@minilms.com"
            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-300 hover:bg-indigo-700 transition transform hover:scale-105"
          >
            Contact Support
          </a>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 text-center border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm">&copy; {new Date().getFullYear()} Mini LMS. All rights reserved. | Built with React & Tailwind</p>
          <p className="text-xs mt-2">
            <a href="#" className="hover:text-white mx-2">Privacy Policy</a>
            <span className="text-gray-600">•</span>
            <a href="#" className="hover:text-white mx-2">Terms of Service</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

// Helper Component for Feature Card
const FeatureCard = ({ icon, title, description, color }) => (
  <div className="p-8 bg-white rounded-3xl shadow-xl border border-gray-100 
    transition-transform transform hover:-translate-y-2 hover:shadow-2xl text-center">
    <div className={`text-4xl mb-4 p-3 inline-block rounded-xl bg-${color}-100`}>
      {icon}
    </div>
    <h4 className={`text-xl font-extrabold text-gray-800 mb-2`}>{title}</h4>
    <p className="text-gray-500">{description}</p>
  </div>
);