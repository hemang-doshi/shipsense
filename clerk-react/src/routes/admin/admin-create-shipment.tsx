import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { FaUser, FaBox, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

const AdminCreateShipment = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    user_id: "",
    packageDescription: "",
    originAddress: "",
    destinationAddress: "",
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3333/admin/fetch-users"
        );
        if (response?.data?.data && Array.isArray(response.data.data)) {
          setUsers(
            response.data.data.map((user: any) => ({
              id: user.id,
              name: `${user.firstName} ${user.lastName}`,
              email: user.emailAddresses?.[0]?.emailAddress || "No Email",
            }))
          );
        } else {
          toast.error("Failed to fetch users: Unexpected response structure.");
        }
      } catch (error) {
        toast.error("Failed to fetch users.");
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (selectedOption: any) => {
    setFormData((prev) => ({
      ...prev,
      user_id: selectedOption?.value || "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3333/admin/create-shipment", formData);
      setSuccessMessage("Shipment created successfully!");
      setFormData({
        user_id: "",
        packageDescription: "",
        originAddress: "",
        destinationAddress: "",
      });
      toast.success("Shipment created successfully!");
    } catch (error) {
      toast.error("Failed to create shipment.");
    }
  };

  const userOptions = users.map((user) => ({
    value: user.id,
    label: `${user.name} (${user.email})`,
  }));

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
            Create Shipment
          </h2>
          <p className="text-gray-500 mt-2">
            Fill in the details to create a new shipment
          </p>
        </div>

        {successMessage && (
          <motion.div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {successMessage}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
            <Select
              className="pl-10 w-full"
              classNamePrefix="select"
              isClearable={true}
              isSearchable={true}
              name="user_id"
              options={userOptions}
              onChange={handleSelectChange}
              value={userOptions.find(
                (option) => option.value === formData.user_id
              )}
              placeholder="Select Customer"
            />
          </div>

          <div className="relative">
            <FaBox className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
            <input
              type="text"
              name="packageDescription"
              placeholder="Package Description"
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
              onChange={handleChange}
              value={formData.packageDescription}
              required
            />
          </div>

          <div className="relative">
            <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
            <input
              type="text"
              name="originAddress"
              placeholder="Origin Address"
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
              onChange={handleChange}
              value={formData.originAddress}
              required
            />
          </div>

          <div className="relative">
            <FaArrowRight className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
            <input
              type="text"
              name="destinationAddress"
              placeholder="Destination Address"
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
              onChange={handleChange}
              value={formData.destinationAddress}
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-300"
          >
            Create Shipment
          </motion.button>
        </form>

        <ToastContainer />
      </motion.div>
    </div>
  );
};

export default AdminCreateShipment;
