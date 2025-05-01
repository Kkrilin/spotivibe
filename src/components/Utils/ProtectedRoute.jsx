import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute({ children, redirectPath = "/" }) {
  const isAuthenticated = Boolean(localStorage.getItem("access_token"));

  return isAuthenticated ? children : <Navigate to={redirectPath} />;
}

export default ProtectedRoute;
