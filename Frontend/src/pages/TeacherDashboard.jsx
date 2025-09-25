import React, { useEffect, useState } from "react";
import axios from "../api/api";

export default function TeacherDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
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
      <div className="p-10 text-center text-gray-500 text-lg animate-pulse">
        Loading dashboard...
      </div>
    );
  }

  const totalStudents = courses.reduce(
    (acc, course) => acc + course.students.length,
    0
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      {/* Header */}
      <h1 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
        Teacher Dashboard
      </h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-gray-500 font-medium">Total Courses</h3>
          <p className="text-3xl font-bold text-indigo-600">{courses.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-gray-500 font-medium">Total Students</h3>
          <p className="text-3xl font-bold text-green-600">{totalStudents}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-gray-500 font-medium">Pending Assignments</h3>
          <p className="text-3xl font-bold text-red-600">
            {/* Placeholder - backend pending assignments count */}
            {Math.floor(Math.random() * 10)}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-4">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600">
            + Create New Course
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600">
            Grade Assignments
          </button>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600">
            Post Announcement
          </button>
        </div>
      </div>

      {/* Courses Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">My Courses</h2>
        {courses.length === 0 ? (
          <p className="text-gray-600 text-lg">
            You are not assigned to any courses yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-3xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
              >
                <h2 className="text-2xl font-bold mb-2 text-gray-800">
                  {course.title}
                </h2>
                <p className="text-gray-500 mb-4">{course.description}</p>

                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-700">
                    Enrolled Students
                  </h3>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {course.students.length}
                  </span>
                </div>

                {course.students.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No students enrolled yet.
                  </p>
                ) : (
                  <ul className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {course.students.map((student) => (
                      <li
                        key={student._id}
                        className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                      >
                        <span className="truncate">
                          {student.name} ({student.email})
                        </span>
                        <button
                          onClick={() =>
                            alert(`Remove ${student.name} from ${course.title}`)
                          }
                          className="text-red-500 hover:text-red-700 font-medium text-sm"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Announcements */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-4">
        <h2 className="text-2xl font-bold">Announcements</h2>
        <textarea
          placeholder="Write an announcement..."
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400"
        />
        <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600">
          Post
        </button>
      </div>

      {/* Activity Feed */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <ul className="space-y-3">
          <li className="text-gray-600">Student A submitted Quiz 1</li>
          <li className="text-gray-600">Student B enrolled in Physics</li>
          <li className="text-gray-600">Assignment 2 deadline updated</li>
        </ul>
      </div>
    </div>
  );
}
