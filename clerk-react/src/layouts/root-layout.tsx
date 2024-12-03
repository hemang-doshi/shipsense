import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import React from "react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  const navigate = useNavigate();

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <nav className="fixed top-0 left-0 w-full bg-white shadow-lg z-50 overflow-y-hidden">
        <ul className="flex items-center justify-between  pt-2 pb-2 mx-4 text-lg font-medium">
          <li className="mt-2">
            <button onClick={() => navigate("/")}>
              <img
                src="./src/assets/images/shipsense-logo-zip-file/png/logo_no_background.png"
                alt="logo"
                width={160}
              />
            </button>
          </li>
          <div className="flex space-x-36 mr-14">
            <li>
              <Link
                to="/sign-up"
                className="bg-gradient-to-r from-orange-700 via-orange-600 to-orange-500 bg-clip-text text-transparent hover:text-blue-800 transition-colors duration-300"
              >
                <b>Sign Up</b>
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 bg-clip-text text-transparent hover:text-blue-800 transition-colors duration-300"
              >
                <b>Contact</b>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent hover:text-blue-800 transition-colors duration-300"
              >
                <b>Dashboard</b>
              </Link>
            </li>
          </div>
          <SignedIn>
            <div className="ml-4">
              <UserButton />
            </div>
          </SignedIn>
          <SignedOut>
            <div className="flex justify-center items-center">
              <Link
                to="/sign-in"
                className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-clip-text text-transparent hover:text-blue-800 transition-colors duration-300"
              >
                <b>Sign In</b>
              </Link>
            </div>
          </SignedOut>
        </ul>
      </nav>
      <main className="mt-16 flex items-center justify-center min-h-screen bg-blue-50">
        <Outlet />
      </main>
    </ClerkProvider>
  );
}
