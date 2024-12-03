import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBox, FaCog, FaTruck } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Function to handle the button clicks
  const handleCreateShipment = () => {
    navigate("/admin-dashboard/create-shipment"); // Redirect to the AdminCreateShipment route
  };

  const handleConfigureDelivery = () => {
    navigate("/admin-dashboard/configure-delivery"); // Redirect to Configure Delivery route
  };

  const handleUpdateShipment = () => {
    navigate("/admin-dashboard/update-shipment-status"); // Redirect to the AdminUpdateShipment route
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b w-full from-blue-100 to-blue-200">
      <div className="max-w-4xl w-1/2 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Manage your shipments and delivery configurations with ease.
        </p>
        <div className="flex justify-around mb-4">
          <motion.button
            onClick={handleCreateShipment}
            className="flex items-center bg-orange-500 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-600 transition duration-300 ease-in-out transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaBox className="mr-2" />
            Create Shipment
          </motion.button>
          <motion.button
            onClick={handleConfigureDelivery}
            className="flex items-center bg-orange-500 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-600 transition duration-300 ease-in-out transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaCog className="mr-2" />
            Configure Delivery
          </motion.button>
          <motion.button
            onClick={handleUpdateShipment}
            className="flex items-center bg-orange-500 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-600 transition duration-300 ease-in-out transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaTruck className="mr-2" />
            Update Shipment
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
