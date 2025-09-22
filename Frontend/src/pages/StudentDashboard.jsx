import React, { useEffect, useState } from 'react';
import API from '../api/api';

export default function StudentDashboard() {
  const [me, setMe] = useState(null);
  const [courses, setCourses] = useState([]);
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        // load user profile by token (login returned user, but we didn't store — simple approach: call /users? later)
        // For this scaffold we'll fetch enrolled courses by calling /api/courses and filtering
        const c = await API.get('/courses');
        setCourses(c.data);
        const res = await API.get('/certificates/my');
        setCerts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Student Dashboard</h2>

      <section className="mb-6">
        <h3 className="font-semibold">Enrolled Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          {courses.filter(c => false /* implement filtering: backend should provide /my-enrollments; adjust later */).length === 0 && (
            <div className="text-sm text-gray-600">Your enrolled courses will appear here (seed backend for demo).</div>
          )}
        </div>
      </section>

      <section>
        <h3 className="font-semibold">Certificates</h3>
        <ul className="mt-3 space-y-2">
          {certs.map(cert => (
            <li key={cert._id} className="p-3 border rounded flex justify-between items-center">
              <div>
                <div className="font-medium">{cert.course?.title || 'Course'}</div>
                <div className="text-sm text-gray-600">Issued: {new Date(cert.issuedAt).toLocaleDateString()}</div>
              </div>
              <a href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/certificates/download/${cert.fileUrl}`} target="_blank" rel="noreferrer" className="px-3 py-1 bg-green-600 text-white rounded">Download</a>
            </li>
          ))}
          {certs.length === 0 && <div className="text-sm text-gray-600">No certificates yet.</div>}
        </ul>
      </section>
    </div>
  );
}
