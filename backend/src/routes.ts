import express, { Request, Response, NextFunction } from "express";
import { createShipmentHandler } from "./admin-api/create-shipment";
import { createClerkClient } from "@clerk/backend";
import { configureDeliveryHandler } from "./admin-api/configure-delivery";
import { fetchPackageDetails } from "./user-api/package-details";
import { updateShipmentHandler } from "./admin-api/update-shipment";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
  proxyUrl: process.env.CLERK_PROXY_URL,
});

const router = express.Router();

// Add USER ROUTES HERE 🚀

// User fetches package details
router.post(
  "/user/track-package",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Fetch package details
      const packageDetails = await fetchPackageDetails(req, res, next);

      // Return users to the frontend
      res.status(200).json(packageDetails);
    } catch (error) {
      console.error("Error fulfilling package information request: ", error);
      next(error); // Pass error to Express error handler
    }
  }
);

// Add ADMIN ROUTES HERE 🚀

// Admin creates a shipment
router.post(
  "/admin/create-shipment",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shipment = await createShipmentHandler(req, res, next);

      res.status(200).json(shipment);
    } catch (error) {
      console.log("Error fulfilling shipment request: ", error);
      next(error);
    }
  }
);

// Admin fetches all Clerk users
router.get(
  "/admin/fetch-users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Fetch users using Clerk's latest client API
      const users = await clerkClient.users.getUserList();
      // Return users to the frontend
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users from Clerk:", error);
      next(error); // Pass error to Express error handler
    }
  }
);

router.post(
  "/admin/configure-delivery",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Fetch users using Clerk's latest client API
      const delivery = await configureDeliveryHandler(req, res, next);

      // Return users to the frontend
      res.status(200).json(delivery);
    } catch (error) {
      console.error("Error fulfilling delivery request: ", error);
      next(error); // Pass error to Express error handler
    }
  }
);

router.post(
  "/admin/update-shipment-status",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedShipment = await updateShipmentHandler(req, res, next);

      res.status(200).json(updatedShipment);
    } catch (error) {
      console.log("Error fulfilling update shipment request: ", error);
      next(error);
    }
  }
);

export default router;
