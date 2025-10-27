// src/components/ProtectedRoute.jsx
import React from "react";
// Need Navigate for redirecting
import { Navigate } from "react-router-dom";

// Wraps pages that need login (Dashboard, Tickets)
// 'children' is the actual page component (e.g., <DashboardPage />)
function ProtectedRoute({ children }) {
  // Check if login token exists
  const isLoggedIn = !!localStorage.getItem("ticketapp_session");

  // If not logged in...
  if (!isLoggedIn) {
    // ...send user back to login. 'replace' avoids back button issues.
    return <Navigate to="/login" replace />;
  }

  // If logged in, show the requested page (the children).
  return children;
}

export default ProtectedRoute;
