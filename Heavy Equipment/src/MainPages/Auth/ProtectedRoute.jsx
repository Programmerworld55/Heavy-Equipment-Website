import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, requiredRole, ...rest }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || (requiredRole && user?.role !== requiredRole)) {
    // Redirect to login if not authenticated or role doesn't match
    return <Navigate to="/login" replace />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
