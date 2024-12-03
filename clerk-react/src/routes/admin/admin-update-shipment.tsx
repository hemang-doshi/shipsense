import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { FaBox, FaTruck } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const AdminUpdateShipment = () => {
  const [PackageNumber, setPackageNumber] = useState("");
  const [packageStatus, setPackageStatus] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Update formData whenever PackageNumber or packageStatus changes
  const formData = {
    PackageNumber,
    packageStatus,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3333/admin/update-shipment-status",
        formData
      );
      toast.success("Delivery configured successfully!", {});
      setIsSubmitted(true);
    } catch (error) {
      toast.error("Error configuring delivery.", {});
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-blue-200 flex items-center justify-center">
      <motion.div
        className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-orange-500">
            Update Shipment Status
          </h2>
          <p className="text-gray-500 mt-2">
            Enter shipment details to update the status.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FaBox className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
            <input
              type="text"
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
              value={PackageNumber}
              onChange={(e) => setPackageNumber(e.target.value)}
              placeholder="Package Number"
            />
          </div>

          <div className="relative">
            <FaTruck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
            <select
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
              value={packageStatus}
              onChange={(e) => setPackageStatus(e.target.value)}
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="in_transit">In Transit</option>
              <option value="out_for_delivery">Out For Delivery</option>
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-300"
          >
            Update Shipment
          </motion.button>
        </form>
      </motion.div>

      {isSubmitted && (
        <Dialog open={isSubmitted} onClose={() => setIsSubmitted(false)}>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <h3 className="text-2xl font-bold text-blue-600">
                Shipment Updated!
              </h3>
              <p className="mt-4 text-gray-500">
                The shipment status has been updated successfully.
              </p>
              <button
                className="mt-6 py-2 px-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                onClick={() => setIsSubmitted(false)}
              >
                Close
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default AdminUpdateShipment;
