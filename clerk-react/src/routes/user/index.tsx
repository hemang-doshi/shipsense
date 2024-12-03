import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react"; // Use `useUser` to get access to user metadata
import EncryptButton from "../../components/buttons/EncryptButton";

export default function IndexPage() {
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser(); // Access both `isSignedIn` and `user`

  useEffect(() => {
    if (isSignedIn && user) {
      // Check if the user has the "admin" role
      if (user.publicMetadata?.role === "admin") {
        // Redirect to admin dashboard for admin users
        navigate("/admin-dashboard");
      } else {
        // Redirect to regular dashboard for non-admin users
        navigate("/dashboard");
      }
    }
  }, [isSignedIn, user, navigate]);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400 overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        src="./src/assets/images/hero_video.mp4" // Update this path to your actual video file
        autoPlay
        loop
        muted
      />

      {/* Content Wrapper */}
      <div className="relative bg-white bg-opacity-80 backdrop-blur-md shadow-2xl rounded-xl p-10 w-1/3 mx-4">
        {/* Greeting and Message */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
            Hey 👋, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-orange-500">Welcome!</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Track your packages in real-time with ShipSense. Our intuitive
            platform provides updates at every step of your shipment's journey,
            ensuring you never lose sight of your deliveries. Sign in to manage
            your packages effortlessly!
          </p>
        </div>

        {/* Button to Sign-In */}
        <div className="text-center">
          <Link to="/sign-in">
            <EncryptButton />
          </Link>
        </div>
      </div>
    </div>
  );
}
