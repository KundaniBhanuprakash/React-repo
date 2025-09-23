import React, { useEffect, useState } from "react";
import API from "../api/api";

export default function StudentDashboard() {
  const [me, setMe] = useState(null);
  const [courses, setCourses] = useState([]);
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const c = await API.get("/courses");
        setCourses(c.data);
        const res = await API.get("/certificates/my");
        setCerts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 p-6">
      <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-8 text-center">
        Student Dashboard
      </h2>

      {/* Enrolled Courses */}
      <section className="mb-10">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Enrolled Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.filter((c) => false).length === 0 ? (
            <div className="text-center text-gray-500 col-span-full py-10 bg-white rounded-2xl shadow-md">
              Your enrolled courses will appear here (seed backend for demo).
            </div>
          ) : (
            courses.map((course) => (
              <div
                key={course._id}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="font-bold text-lg text-indigo-600">{course.title}</div>
                <p className="text-gray-600 mt-2">{course.description || "No description"}</p>
                <div className="mt-4 text-sm text-gray-500">Instructor: {course.instructor?.name || "TBA"}</div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Certificates */}
      <section>
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Certificates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certs.length === 0 ? (
            <div className="text-center text-gray-500 py-10 bg-white rounded-2xl shadow-md col-span-full">
              No certificates yet.
            </div>
          ) : (
            certs.map((cert) => (
              <div
                key={cert._id}
                className="flex justify-between items-center p-4 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
              >
                <div>
                  <div className="font-semibold text-indigo-600">{cert.course?.title || "Course"}</div>
                  <div className="text-sm text-gray-500">
                    Issued: {new Date(cert.issuedAt).toLocaleDateString()}
                  </div>
                </div>
                <a
                  href={`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/certificates/download/${cert.fileUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                >
                  Download
                </a>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
