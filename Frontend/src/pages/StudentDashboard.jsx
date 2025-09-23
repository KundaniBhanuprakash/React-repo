import React from "react";

const StudentDashboard = () => {
  const student = {
    name: "Bhanu Kundhani",
    email: "bhanuprakashkundhani1213@gmail.com",
    phone: "+91-9000890519",
    learningHours: 12,
    badges: 5,
    trainings: 3,
    quizzes: 2,
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Profile Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl p-6 mb-8">
        <div className="absolute top-4 right-4 cursor-pointer text-white">
          ✎ {/* Edit background icon */}
        </div>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src="https://via.placeholder.com/100"
              alt="profile"
              className="w-24 h-24 rounded-full border-4 border-white"
            />
            <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer">
              📷
            </div>
          </div>
          <div className="text-white">
            <h1 className="text-2xl font-bold">{student.name}</h1>
            <p className="text-sm">{student.email}</p>
            <p className="text-sm">{student.phone}</p>
            <button className="mt-2 px-4 py-1 bg-white text-indigo-600 font-semibold rounded hover:bg-gray-100 transition">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition cursor-pointer">
          <h2 className="text-gray-500 text-sm">Learning Hours</h2>
          <p className="text-2xl font-bold text-indigo-600">{student.learningHours} hrs</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition cursor-pointer">
          <h2 className="text-gray-500 text-sm">Badges</h2>
          <p className="text-2xl font-bold text-yellow-500">{student.badges}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition cursor-pointer">
          <h2 className="text-gray-500 text-sm">Assigned Trainings</h2>
          <p className="text-2xl font-bold text-green-500">{student.trainings}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition cursor-pointer">
          <h2 className="text-gray-500 text-sm">Quizzes</h2>
          <p className="text-2xl font-bold text-pink-500">{student.quizzes}</p>
        </div>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assigned Trainings */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-bold text-lg mb-4">Assigned Trainings</h2>
          <ul className="space-y-2">
            <li className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition cursor-pointer">
              React Basics
            </li>
            <li className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition cursor-pointer">
              Advanced JavaScript
            </li>
            <li className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition cursor-pointer">
              Tailwind CSS Mastery
            </li>
          </ul>
        </div>

        {/* Quizzes */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-bold text-lg mb-4">Upcoming Quizzes</h2>
          <ul className="space-y-2">
            <li className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition cursor-pointer">
              JS Fundamentals Quiz
            </li>
            <li className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition cursor-pointer">
              React Hooks Quiz
            </li>
          </ul>
        </div>

        {/* Badges / Achievements */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-bold text-lg mb-4">Badges</h2>
          <div className="flex flex-wrap gap-3">
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
              JS Beginner
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
              React Pro
            </span>
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
              Tailwind Expert
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
