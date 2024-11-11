import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { token, role } = useSelector((state) => state.auth);
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token && role) {
      setLoading(false);
    }
  }, [token, role]);

  if (loading) {
    return null;
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role === "admin" && location.pathname !== "/admin-dashboard") {
    return <Navigate to="/admin-dashboard" replace />;
  }

  if (role === "user" && location.pathname !== "/dashboard") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
