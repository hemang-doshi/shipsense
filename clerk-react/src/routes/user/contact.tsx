import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { FiMail, FiPhone } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-200">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-xl p-10 w-full max-w-5xl"
      >
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Get in Touch with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-orange-500">
            ShipSense
          </span>
        </h1>
        <p className="text-gray-600 text-center mb-12">
          We're here to help! Reach out to us for any inquiries, and we'll get
          back to you shortly.
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <label className="block text-lg font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-2 p-4 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-lg font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-2 p-4 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className="mt-2 p-4 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500"
              rows={5}
              placeholder="How can we assist you?"
              required
            ></textarea>
          </div>
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-blue-500 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none"
            >
              Send Message
            </motion.button>
          </div>
        </form>

        {/* Additional Contact Info */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Other Ways to Contact Us
          </h2>
          <p className="text-gray-600 mb-8">
            You can also reach out via email or phone.
          </p>

          <div className="flex flex-col md:flex-row gap-12 justify-center">
            <div className="flex items-center justify-center bg-blue-50 p-6 rounded-lg shadow-md">
              <FiMail className="text-orange-600 text-3xl mr-4" />
              <p className="text-lg text-gray-700">support@shipsense.com</p>
            </div>
            <div className="flex items-center justify-center bg-blue-50 p-6 rounded-lg shadow-md">
              <FiPhone className="text-orange-600 text-3xl mr-4" />
              <p className="text-lg text-gray-700">+91 9515110270</p>
            </div>
          </div>

          {/* Placeholder for map or additional info */}
          <div className="bg-gray-200 p-6 rounded-lg mt-12">
            <p>
              [Map, Office Location, and Additional Contact Information Coming
              Soon]
            </p>
          </div>
        </div>
      </motion.div>
      <ToastContainer />
    </div>
  );
}
