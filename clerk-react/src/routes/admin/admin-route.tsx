import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  // Check if the user has the admin role
  if (user?.publicMetadata?.role !== "admin") {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};

export default AdminRoute;
