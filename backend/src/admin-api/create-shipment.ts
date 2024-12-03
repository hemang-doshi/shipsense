import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/db";
import { convertLocationToCoordinates } from "./convert-location-to-coordinates";
import type { coordinatesType } from "../../tame/admin-types";

export const createShipmentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const generateTrackingNumber = () => {
      return "TRK" + Math.floor(1000000000 + Math.random() * 9000000000); // Simple random tracking number generator
    };

    const trackingNumber = generateTrackingNumber();
    const packageStatus = "Processing";

    const { user_id, packageDescription, originAddress, destinationAddress } =
      req.body;

    // Ensure all necessary fields are provided
    if (
      !user_id ||
      !packageDescription ||
      !originAddress ||
      !destinationAddress
    ) {
      res.status(400).json({ message: "All fields are required" });
      return; // Exit early to prevent further execution
    }

    // Convert addresses to geo-coordinates
    const originCoordinates: coordinatesType =
      await convertLocationToCoordinates(originAddress);
    const destinationCoordinates: coordinatesType =
      await convertLocationToCoordinates(destinationAddress);

    // Create the shipment payload based on the Prisma model
    const shipmentPayload = {
      user_id: user_id, // This is the customer’s ID, not the admin's
      tracking_number: trackingNumber,
      status: packageStatus,
      description: packageDescription,
      origin_text: originAddress,
      destination_text: destinationAddress,
      origin_latitude: originCoordinates.latitude,
      origin_longitude: originCoordinates.longitude,
      destination_latitude: destinationCoordinates.latitude,
      destination_longitude: destinationCoordinates.longitude,
      estimated_delivery_date: null, // Optional: Set this if needed
    };

    // Insert the new shipment into the database
    const newShipment = await prisma.package.create({
      data: shipmentPayload,
    });

    const shipmentResponse = {
      ...newShipment,
      id: newShipment.tracking_number.toString(),
    }

    // Send a success response without returning the response object
    res
      .status(201)
      .json({ message: "Shipment created successfully", shipmentResponse });
  } catch (error) {
    console.error("Error creating shipment: ", error);
    next(error); // Pass the error to the next middleware (error handler)
  }
};
