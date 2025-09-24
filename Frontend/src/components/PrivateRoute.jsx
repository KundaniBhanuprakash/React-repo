import React from "react";
import { Navigate } from "react-router-dom";

/**
 * PrivateRoute: Protects dashboards and enforces role-based access
 *
 * Props:
 * - user: { email, role } object from App.jsx
 * - role: string ("student", "teacher", "admin") that this route requires
 * - component: the dashboard component to render
 */
export default function PrivateRoute({ user, role, component: Component }) {
  // Not logged in → redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // Admin dashboard: extra email check for security
  if (role === "admin") {
    if (user.role === "admin" && user.email === "bhanuprakashmdpl@gmail.com") {
      return <Component />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  // Student/Teacher dashboards
  if (user.role === role) {
    return <Component />;
  } else {
    // Redirect user to their correct dashboard if they try to access another role
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }
}
