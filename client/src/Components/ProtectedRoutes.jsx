import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredType }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT
  const userType = decodedToken.type;

  if (userType !== requiredType) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
