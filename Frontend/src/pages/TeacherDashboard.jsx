import React, { useEffect, useState } from "react";
import axios from "../api/api"; // Assuming correct path

export default function TeacherDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Simulating API call for teacher's courses
        const res = await axios.get("/teacher/courses"); 
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching teacher courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-10 text-center text-gray-500 text-xl animate-pulse">
          Loading personalized dashboard...
        </div>
      </div>
    );
  }

  const totalStudents = courses.reduce(
    (acc, course) => acc + course.students.length,
    0
  );
  
  const pendingAssignmentsCount = Math.floor(Math.random() * 10); // Placeholder

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-12 bg-gray-50 min-h-screen">
      
      {/* Header and Welcome */}
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Teacher Dashboard 👋
        </h1>
        <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-500 hidden sm:block">Welcome back!</span>
            {/*  - Placeholder for profile image */}
            <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 font-bold">T</div>
        </div>
      </div>

      {/* Stats Overview - Grid layout with more emphasis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          label="Total Courses" 
          value={courses.length} 
          icon="📚"
          color="indigo"
        />
        <StatCard 
          label="Total Students" 
          value={totalStudents} 
          icon="👥"
          color="green"
        />
        <StatCard 
          label="Pending Grading" 
          value={pendingAssignmentsCount} 
          icon="⚠️"
          color="red"
        />
      </div>

      {/* Layout: Courses on the left, Actions/Announcements on the right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content (My Courses) */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-3xl font-bold text-gray-800">My Courses</h2>
          {courses.length === 0 ? (
            <div className="bg-white p-6 rounded-2xl shadow border border-dashed border-gray-300">
              <p className="text-gray-600 text-lg text-center">
                You are not assigned to any courses yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar (Actions and Announcements) */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Quick Actions */}
          <QuickActions />

          {/* Announcements Section */}
          <AnnouncementsSection />

          {/* Activity Feed */}
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}

// --- Reusable Dashboard Components ---

const StatCard = ({ label, value, icon, color }) => (
  <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition transform hover:scale-[1.01]">
    <div className="flex items-center space-x-4">
        <div className={`text-3xl p-3 rounded-xl bg-${color}-100`}>
            {icon}
        </div>
        <div>
            <h3 className="text-gray-500 font-medium text-sm uppercase">{label}</h3>
            <p className={`text-4xl font-extrabold text-${color}-600`}>{value}</p>
        </div>
    </div>
  </div>
);

const CourseCard = ({ course }) => (
    <div
        className="bg-white rounded-3xl shadow-xl p-6 border-t-4 border-indigo-500 hover:shadow-2xl transition-shadow duration-300 space-y-4"
    >
        <h2 className="text-2xl font-bold text-gray-800 truncate">
            {course.title}
        </h2>
        <p className="text-gray-500 text-sm line-clamp-2">{course.description}</p>

        <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-700">Enrolled Students</h3>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                {course.students.length}
            </span>
        </div>

        <button 
            onClick={() => alert(`View details for ${course.title}`)}
            className="w-full text-indigo-600 font-semibold py-2 border border-indigo-200 rounded-xl hover:bg-indigo-50 transition"
        >
            Manage Course
        </button>
    </div>
);

const QuickActions = () => (
    <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <ActionButton text="+ New Course" color="indigo" />
          <ActionButton text="Grade Work" color="green" />
          <ActionButton text="Post Announce" color="yellow" />
          <ActionButton text="View Reports" color="blue" />
        </div>
    </div>
);

const ActionButton = ({ text, color }) => (
    <button className={`px-4 py-3 text-sm font-semibold bg-${color}-500 text-white rounded-xl shadow hover:bg-${color}-600 transition`}>
        {text}
    </button>
);

const AnnouncementsSection = () => {
    const [announcement, setAnnouncement] = useState("");

    const handlePost = () => {
        if (announcement.trim()) {
            alert(`Posting announcement: ${announcement}`);
            setAnnouncement("");
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800">Post Announcement</h2>
            <textarea
                placeholder="Write an announcement for your students..."
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 h-24 resize-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
            />
            <button 
                onClick={handlePost}
                className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
                disabled={!announcement.trim()}
            >
                Post Now
            </button>
        </div>
    );
};

const ActivityFeed = () => (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Recent Activity</h2>
        <ul className="space-y-3">
          <ActivityItem text="Student A submitted Quiz 1 in Calculus" time="5 mins ago" />
          <ActivityItem text="Student B enrolled in Physics 101" time="2 hours ago" />
          <ActivityItem text="Assignment 2 deadline updated by Admin" time="Yesterday" />
        </ul>
    </div>
);

const ActivityItem = ({ text, time }) => (
    <li className="flex justify-between items-start text-sm border-b pb-2 last:border-b-0 text-gray-600">
        <span className="max-w-[70%]">{text}</span>
        <span className="text-xs font-medium text-gray-400">{time}</span>
    </li>
);