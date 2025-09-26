import React, { useEffect, useState } from "react";
import axios from "../api/api"; // axios instance with baseURL set

const StudentDashboard = ({ user }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrCreateStudent = async () => {
      if (!user?._id) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      try {
        // Call backend to create student if it doesn't exist
        const res = await axios.post("/student/create", {
          userId: user._id,
          name: user.name,
          email: user.email,
          profilePic: user.profilePic || "",
          phone: user.phone || "",
        });

        setStudent(res.data); // set student data from backend
      } catch (err) {
        console.error("Error fetching/creating student:", err);
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrCreateStudent();
  }, [user]);

  if (loading) return <div className="p-6 text-center">Loading dashboard...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!student) return <div className="p-6 text-center text-red-500">Failed to load data</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Profile Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl p-6 mb-8">
        <div className="absolute top-4 right-4 cursor-pointer text-white">✎</div>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src={student.profilePic || "https://via.placeholder.com/100"}
              alt="profile"
              className="w-24 h-24 rounded-full border-4 border-white"
            />
            <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer">📷</div>
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
        <StatCard label="Learning Hours" value={`${student.learningHours || 0} hrs`} color="text-indigo-600" />
        <StatCard label="Badges" value={student.badges?.length || 0} color="text-yellow-500" />
        <StatCard label="Assigned Trainings" value={student.trainings?.length || 0} color="text-green-500" />
        <StatCard label="Quizzes" value={student.quizzes?.length || 0} color="text-pink-500" />
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SectionCard title="Assigned Trainings" items={student.trainings} />
        <SectionCard title="Upcoming Quizzes" items={student.quizzes} />
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-bold text-lg mb-4">Badges</h2>
          <div className="flex flex-wrap gap-3">
            {student.badges?.length > 0 ? (
              student.badges.map((badge) => (
                <span
                  key={badge._id}
                  className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold"
                >
                  {badge.name}
                </span>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No badges yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable components
const StatCard = ({ label, value, color }) => (
  <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition cursor-pointer">
    <h2 className="text-gray-500 text-sm">{label}</h2>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
  </div>
);

const SectionCard = ({ title, items }) => (
  <div className="bg-white rounded-2xl shadow p-6">
    <h2 className="font-bold text-lg mb-4">{title}</h2>
    {items?.length > 0 ? (
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item._id} className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition cursor-pointer">
            {item.title || item.name}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500 text-sm">No {title.toLowerCase()} available.</p>
    )}
  </div>
);

export default StudentDashboard;
