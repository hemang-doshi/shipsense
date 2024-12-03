import { Request, Response, NextFunction } from "express";
import { convertLocationToCoordinates } from "./convert-location-to-coordinates";
import { coordinatesType } from "../../tame/admin-types";
import prisma from "../../prisma/db";

export const configureDeliveryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      PackageNumber, // Adjusted to reference `tracking_number`
      driverName,
      vehicleNumber,
      driverContact,
      locationReached,
      nextLocation,
    } = req.body;

    // Validate required fields
    if (
      !PackageNumber ||
      !driverName ||
      !vehicleNumber ||
      !driverContact ||
      !locationReached ||
      !nextLocation
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Convert location strings to coordinates
    const reachedCoordinates: coordinatesType =
      await convertLocationToCoordinates(locationReached);
    const nextCoordinates: coordinatesType = await convertLocationToCoordinates(
      nextLocation
    );

    // Create the TransitEvent first
    const transitEvent = await prisma.transitEvent.create({
      data: {
        reached_text: locationReached,
        next_text: nextLocation,
        reached_latitude: reachedCoordinates.latitude,
        reached_longitude: reachedCoordinates.longitude,
        next_latitude: nextCoordinates.latitude,
        next_longitude: nextCoordinates.longitude,
        // Link it to the Package via the package_tracking_number
        Package: { connect: { tracking_number: PackageNumber } },
      },
    });

    // Create the DeliveryVehicle and link it with the TransitEvent and Package
    const newDelivery = await prisma.deliveryVehicle.create({
      data: {
        vehicle_number: vehicleNumber,
        driver_name: driverName,
        driver_contact: driverContact,
        TransitEvent: { connect: { id: transitEvent.id } }, // Link to the created TransitEvent
        Package: { connect: { tracking_number: PackageNumber } }, // Link to the Package using tracking_number
      },
    });

    const deliveryResponse = {
      vehicle_number: newDelivery.vehicle_number,
      driver_name: newDelivery.driver_name,
      driver_contact: newDelivery.driver_contact,
      id: newDelivery.id.toString(), // Convert Int to string
      transitEventId: newDelivery.transitEventId?.toString(), // Convert Int to string if it exists
    };

    console.log(res);

    return res
      .status(201)
      .json({ message: "Delivery configured successfully", deliveryResponse });
  } catch (error) {
    console.error("Error configuring delivery: ", error);
    next(error);
  }
};
