import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { FaTruck, FaMapMarkerAlt, FaBox, FaUser, FaPhoneAlt, FaArrowRight } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";

const AdminConfigureDelivery = () => {
  const [formData, setFormData] = useState({
    PackageNumber: "",
    driverName: "",
    vehicleNumber: "",
    driverContact: "",
    locationReached: "",
    nextLocation: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3333/admin/configure-delivery",
        formData
      );
      toast.success("Delivery configured successfully!", {});
      setIsModalOpen(false); // Close modal on success
    } catch (error) {
      toast.error("Error configuring delivery.", {});
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b w-full from-blue-50 to-blue-200 flex items-center justify-center">
      <motion.div
        className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-orange-500">
            Configure Delivery
          </h2>
          <p className="text-gray-500 mt-2">
            Manage and update shipment details with ease
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FaBox className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
            <input
              type="text"
              name="PackageNumber"
              placeholder="Package Number"
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
              onChange={handleChange}
              value={formData.PackageNumber}
            />
          </div>

          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
            <input
              type="text"
              name="driverName"
              placeholder="Driver Name"
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
              onChange={handleChange}
              value={formData.driverName}
            />
          </div>

          <div className="relative">
            <FaTruck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
            <input
              type="text"
              name="vehicleNumber"
              placeholder="Vehicle Number"
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
              onChange={handleChange}
              value={formData.vehicleNumber}
            />
          </div>

          <div className="relative">
            <FaPhoneAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
            <input
              type="text"
              name="driverContact"
              placeholder="Driver Contact"
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
              onChange={handleChange}
              value={formData.driverContact}
            />
          </div>

          <div className="relative">
            <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
            <input
              type="text"
              name="locationReached"
              placeholder="Location Reached"
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
              onChange={handleChange}
              value={formData.locationReached}
            />
          </div>

          <div className="relative">
            <FaArrowRight className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
            <input
              type="text"
              name="nextLocation"
              placeholder="Next Location"
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
              onChange={handleChange}
              value={formData.nextLocation}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-300"
          >
            Submit
          </motion.button>
        </form>
      </motion.div>

      <ToastContainer />

      {/* Modal for confirmation */}
      <Transition appear show={isModalOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsModalOpen(false)}
        >
          <div
            className="fixed inset-0 bg-black bg-opacity-25"
            aria-hidden="true"
          />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="max-w-sm w-full bg-white p-6 rounded-lg shadow-xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-bold text-orange-600"
              >
                Delivery Configured
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-gray-500">
                  Your delivery has been successfully configured!
                </p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="w-full bg-orange-600 py-2 text-white font-semibold rounded-lg hover:bg-orange-700"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default AdminConfigureDelivery;
