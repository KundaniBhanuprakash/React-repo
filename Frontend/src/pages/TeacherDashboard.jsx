import { useEffect, useState } from "react";
import axios from "../api/api";

export default function TeacherDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Backend should return courses with enrolled students
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
    return <div className="p-10 text-center text-gray-500">Loading courses...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Teacher Dashboard</h1>

      {courses.length === 0 ? (
        <p className="text-gray-600">You are not assigned to any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-2xl shadow p-6 border border-gray-200"
            >
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-500 mb-4">{course.description}</p>

              <h3 className="font-medium text-gray-700 mb-2">Enrolled Students:</h3>
              {course.students.length === 0 ? (
                <p className="text-sm text-gray-500">No students enrolled yet.</p>
              ) : (
                <ul className="space-y-2">
                  {course.students.map((student) => (
                    <li
                      key={student._id}
                      className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded"
                    >
                      <span>{student.name} ({student.email})</span>
                      <button
                        onClick={() => alert(`Remove ${student.name}`)}
                        className="text-red-500 hover:underline text-sm"
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
