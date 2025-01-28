import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || user?.role !== "admin") {
    // Redirect to login if not authenticated or not an admin
    return <Navigate to="/login" replace />;
  }

  return <Component {...rest} />;
};

export default AdminRoute;
