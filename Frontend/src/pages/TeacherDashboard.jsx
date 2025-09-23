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
        Loading courses...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
        Teacher Dashboard
      </h1>

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
                <ul className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {course.students.map((student) => (
                    <li
                      key={student._id}
                      className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                    >
                      <span className="truncate">
                        {student.name} ({student.email})
                      </span>
                      <button
                        onClick={() => alert(`Remove ${student.name}`)}
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
  );
}
