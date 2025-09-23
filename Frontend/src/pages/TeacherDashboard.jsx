import { useEffect, useState } from "react";
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
    return <div className="p-10 text-center text-gray-500 text-lg">Loading courses...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-8 text-blue-600 border-b-2 pb-4">Teacher Dashboard</h1>

      {courses.length === 0 ? (
        <p className="text-gray-600 text-lg mt-6">You are not assigned to any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 transform hover:scale-105 transition duration-300"
            >
              {/* Course Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">{course.title}</h2>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {course.students.length} {course.students.length === 1 ? "Student" : "Students"}
                </span>
              </div>
              <p className="text-gray-500 mb-6">{course.description}</p>

              {/* Enrolled Students */}
              <h3 className="font-medium text-gray-700 mb-3">Enrolled Students:</h3>
              {course.students.length === 0 ? (
                <p className="text-sm text-gray-500">No students enrolled yet.</p>
              ) : (
                <ul className="space-y-2">
                  {course.students.map((student) => (
                    <li
                      key={student._id}
                      className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100 transition"
                    >
                      <span className="text-gray-800 font-medium">
                        {student.name} <span className="text-gray-500 text-sm">({student.email})</span>
                      </span>
                      <button
                        onClick={() => alert(`Remove ${student.name}`)}
                        className="text-red-500 hover:bg-red-100 px-2 py-1 rounded transition text-sm"
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
