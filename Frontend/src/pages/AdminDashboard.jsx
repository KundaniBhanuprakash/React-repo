import { useEffect, useState } from "react";
import axios from "../api/api";

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, studentsRes, teachersRes] = await Promise.all([
          axios.get("/admin/courses"),
          axios.get("/admin/students"),
          axios.get("/admin/teachers"),
        ]);
        setCourses(coursesRes.data);
        setStudents(studentsRes.data);
        setTeachers(teachersRes.data);
      } catch (err) {
        console.error("Error fetching admin data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-10 text-center text-gray-500">Loading admin data...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-purple-600">Admin Dashboard</h1>

      {/* Courses Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-2xl shadow p-6 border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-500 mb-4">{course.description}</p>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Assign Teacher:
              </label>
              <select
                defaultValue={course.teacher?._id || ""}
                onChange={(e) =>
                  alert(`Assign teacher ${e.target.value} to ${course.title}`)
                }
                className="w-full border rounded p-2"
              >
                <option value="">-- Select Teacher --</option>
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </section>

      {/* Students Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Students</h2>
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
          {students.length === 0 ? (
            <p className="text-gray-500">No students found.</p>
          ) : (
            <ul className="space-y-3">
              {students.map((student) => (
                <li
                  key={student._id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <span>
                    {student.name} ({student.email})
                  </span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => alert(`Generate offer letter for ${student.name}`)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Offer Letter
                    </button>
                    <button
                      onClick={() => alert(`Generate certificate for ${student.name}`)}
                      className="text-sm text-green-600 hover:underline"
                    >
                      Certificate
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
