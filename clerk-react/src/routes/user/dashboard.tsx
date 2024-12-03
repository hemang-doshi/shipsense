import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { MagnifyingGlassIcon, TruckIcon } from "@heroicons/react/24/solid";
import toast, { Toaster } from "react-hot-toast";
import { useJsApiLoader } from "@react-google-maps/api";

export default function DashboardPage() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [packageDetails, setPackageDetails] = useState<any>(null);
  const [driverLocation, setDriverLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const mapRef = useRef<HTMLDivElement | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:
      import.meta.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
      "AIzaSyBSXwyBgvdViinAAaqUEBbfKPgY43GqSno",
    libraries: ["places"],
  });

  useEffect(() => {
    if (isLoaded && (driverLocation || userLocation)) {
      const initMap = async () => {
        const { Map } = (await google.maps.importLibrary(
          "maps"
        )) as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = (await google.maps.importLibrary(
          "marker"
        )) as google.maps.MarkerLibrary;

        if (mapRef.current) {
          const map = new Map(mapRef.current, {
            center: driverLocation || userLocation || { lat: 0, lng: 0 },
            zoom: 14,
            mapId: "8d96fc12f2ba1f1b",
          });

          if (driverLocation) {
            new AdvancedMarkerElement({
              map,
              position: driverLocation,
              title: "Driver's Location",
            });
          }

          if (userLocation) {
            new AdvancedMarkerElement({
              map,
              position: userLocation,
              title: "Your Location",
            });
          }
        }
      };

      initMap();
    }
  }, [isLoaded, driverLocation, userLocation]);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchDriverId = navigator.geolocation.watchPosition(
        (position) => {
          setDriverLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting the driver's location: ", error);
          toast.error("Error getting the driver's location.");
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );

      const watchUserId = navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting the user's location: ", error);
          toast.error("Error getting your location.");
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchDriverId);
        navigator.geolocation.clearWatch(watchUserId);
      };
    }
  }, []);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3333/user/track-package",
        {
          tracking_no: e.currentTarget.tracking_no.value,
        }
      );
      toast.success("Shipment found successfully!");
      setPackageDetails(response.data.packageDetails);
    } catch (error) {
      toast.error("Error finding shipment.");
      setPackageDetails(null);
      setDriverLocation(null);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center px-4 py-12">
      <Toaster position="top-center" reverseOrder={false} />

      <motion.div
        className="bg-white shadow-2xl rounded-xl p-12 max-w-4xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          <motion.h1
            className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span>Track Your Shipment</span>
          </motion.h1>
          <p className="text-lg text-gray-600 mb-10">
            Enter your AWB/Consignment No. to track your package in real time.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={submitHandler}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <motion.input
            type="text"
            placeholder="AWB / Consignment No."
            name="tracking_no"
            className="p-4 w-full md:w-2/3 border border-gray-300 rounded-lg shadow-md focus:ring-blue-400 focus:border-blue-400 transition-all"
            whileHover={{ scale: 1.05 }}
          />
          <motion.button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-blue-500 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none"
          >
            <MagnifyingGlassIcon className="h-6 w-6" />
          </motion.button>
        </form>

        {/* Success/Error Message */}
        <Transition
          show={!!successMessage}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="text-center text-green-600 font-semibold mb-6">
            {successMessage}
          </div>
        </Transition>

        {/* Package Details */}
        {packageDetails && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Package Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p>
                  <strong>Tracking Number:</strong>{" "}
                  {packageDetails.tracking_number}
                </p>
                <p>
                  <strong>Status:</strong> {packageDetails.status}
                </p>
              </div>
              <div>
                <p>
                  <strong>Origin:</strong> {packageDetails.origin_text}
                </p>
                <p>
                  <strong>Destination:</strong>{" "}
                  {packageDetails.destination_text}
                </p>
              </div>
            </div>

            {/* Transit Events */}
            <div className="justify-center items-center mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Transit History
              </h3>
              <ol className="relative border-l border-gray-300">
                {packageDetails.transit_events.map(
                  (event: any, index: number) => (
                    <li key={index} className="mb-10 ml-6">
                      <span
                        className={`absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full ring-8 ${
                          index === packageDetails.transit_events.length - 1
                            ? "bg-blue-500"
                            : "bg-gray-300"
                        }`}
                      >
                        <TruckIcon className="w-4 h-4 text-white" />
                      </span>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">
                          {event.reached_text}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Next: {event.next_text}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(event.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </li>
                  )
                )}
              </ol>
            </div>
          </div>
        )}

        {/* Real-time Map for Live Tracking */}
        {packageDetails?.status === "out_for_delivery" && driverLocation && (
          <div
            className="w-full mt-10 relative"
            ref={mapRef}
            style={{ height: "400px" }}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-600 border-b-2"></div>
            </div>

            {/* Map will be rendered here */}
          </div>
        )}
      </motion.div>
    </div>
  );
}
