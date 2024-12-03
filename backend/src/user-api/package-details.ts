import { Request, Response, NextFunction } from "express";
import prisma from "../../prisma/db"; // Assuming your Prisma client is initialized here

export const fetchPackageDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { tracking_no } = req.body;

    // Validate the presence of packageId
    if (!tracking_no) {
      return res.status(400).json({ message: "Package ID is required" });
    }

    // Fetch package details with related info
    const packageDetails = await prisma.package.findUnique({
      where: { tracking_number: tracking_no }, // Adjust this if your ID is not BigInt
      include: {
        tracking_events: {
          select: {
            timestamp: true,
            event_latitude: true,
            event_longitude: true,
          },
          orderBy: { timestamp: "asc" }, // To get events in chronological order
        },
        transit_events: {
          // Updated to match your schema
          select: {
            reached_text: true,
            reached_latitude: true,
            reached_longitude: true,
            next_text: true,
            next_latitude: true,
            next_longitude: true,
          },
        },
        delivery_vehicles: {
          select: {
            vehicle_number: true,
            driver_name: true,
            driver_contact: true,
          },
        },
      },
    });

    // Check if the package exists
    if (!packageDetails) {
      return res.status(404).json({ message: "Package not found" });
    }

    // Return the package details in the response
    return res.status(200).json({ packageDetails });
  } catch (error) {
    console.error("Error fetching package details: ", error);
    next(error); // Pass error to the error handler
  }
};
