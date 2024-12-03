import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/db";

export const updateShipmentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { PackageNumber, packageStatus } = req.body;

    if (!PackageNumber || !packageStatus) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const updationPayload = {
      tracking_number: PackageNumber,
      status: packageStatus,
    };

    // Ensure the query is awaited
    await prisma.package.update({
      where: {
        tracking_number: updationPayload.tracking_number,
      },
      data: updationPayload,
    });

    // If the package is out for delivery, fetch tracking info
    if (packageStatus === "out_for_delivery") {
      const trackingEvent = await prisma.trackingEvent.findFirst({
        where: {
          package_tracking_number: PackageNumber,
        },
        include: {
          vehicle: true,
        },
      });

      if (trackingEvent) {
        res.status(200).json({
          message: "Package updated successfully",
          trackingEvent,
        });
        return;
      }
    }

    res.status(200).json({ message: "Shipment updated successfully" });
  } catch (error) {
    console.log("Error updating shipment: ", error);
    next(error);
  }
};
