import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Import the layouts
import RootLayout from "./layouts/root-layout";
import DashboardLayout from "./layouts/dashboard-layout";

// Import the components
import IndexPage from "./routes/user";
import ContactPage from "./routes/user/contact";
import SignInPage from "./routes/user/sign-in";
import SignUpPage from "./routes/user/sign-up";
import DashboardPage from "./routes/user/dashboard";
import AdminDashboard from "./routes/admin/admin-dashboard";
import AdminSignIn from "./routes/admin/admin-sign-in";
import AdminRoute from "./routes/admin/admin-route";
import NotAuthorized from "./routes/admin/not-authorized";
import { ClerkProvider } from "@clerk/clerk-react";
import AdminCreateShipment from "./routes/admin/admin-create-shipment";
import AdminConfigureDelivery from "./routes/admin/admin-configure-delivery";
import AdminUpdateShipment from "./routes/admin/admin-update-shipment";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <IndexPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/sign-in/*", element: <SignInPage /> },
      { path: "/sign-up/*", element: <SignUpPage /> },
      { path: "/admin-sign-in/*", element: <AdminSignIn /> },
      { path: "/not-authorized/*", element: <NotAuthorized /> },
      {
        element: <DashboardLayout />,
        path: "dashboard",
        children: [{ path: "", element: <DashboardPage /> }],
      },
      {
        element: <DashboardLayout />,
        path: "admin-dashboard",
        children: [
          {
            path: "",
            element: (
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            ),
          },
          {
            path: "create-shipment", // Define the create-shipment path
            element: <AdminCreateShipment />,
          },
          {
            path: "configure-delivery", // Define the configure-delivery path
            element: <AdminConfigureDelivery />,
          },
          {
            path: "update-shipment-status", // Define the configure-delivery path
            element: <AdminUpdateShipment />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
