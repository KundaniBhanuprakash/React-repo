import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Mini LMS</h1>
        <Link to="/login" className="px-4 py-2 bg-indigo-600 text-white rounded">Login</Link>
      </header>

      <main className="mt-12">
        <h2 className="text-2xl font-semibold">Welcome</h2>
        <p className="mt-4">This is the public landing page. Please login as Student, Teacher or Admin.</p>
        <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border rounded">
            <h3 className="font-bold">Students</h3>
            <p className="mt-2">View enrolled courses, download certificates.</p>
          </div>
          <div className="p-4 border rounded">
            <h3 className="font-bold">Teachers</h3>
            <p className="mt-2">Manage students in your courses.</p>
          </div>
          <div className="p-4 border rounded">
            <h3 className="font-bold">Admins</h3>
            <p className="mt-2">Assign teachers, upload offer letters, issue certificates.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
