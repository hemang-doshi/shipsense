import { SignIn, useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminSignIn = () => {
  const { isSignedIn, user } = useUser(); // Use Clerk's hook to get the user
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn && user) {
      // This effect runs after the user signs in
      if (user.publicMetadata?.role === "admin") {
        // Navigate to admin dashboard if the user is an admin
        navigate("/admin-dashboard");
      } else {
        // Redirect to error or unauthorized page if not an admin
        navigate("/not-authorized");
      }
    }
  }, [isSignedIn, user, navigate]);

  return <SignIn />;
};

export default AdminSignIn;
