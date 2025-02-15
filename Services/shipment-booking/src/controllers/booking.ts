import { Request, Response } from "express";
import ShipmentBookingModel from "../models/booking";

async function createShipmentBooking(req: Request, res: Response) {
    const { userId, loadingPort, dischargePort, containerType } = req.body;
    if (!userId || !loadingPort || !dischargePort || !containerType) { res.status(404).json({ message: "missing required fields" }); return; };
    try {
        const newShipmentBooking = new ShipmentBookingModel({
            userId,
            loadingPort,
            dischargePort,
            containerType,
        });
        await newShipmentBooking.save();
        res.status(201).json({ message: "shipment booking created successfully", newShipmentBooking });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "there is something went wrong with your createShipmentBooking" });
        return;
    };
};

async function getAllShipmentBookings(req: Request, res: Response) {
    try {
        const allShipBooks = await ShipmentBookingModel.find();
        res.status(200).json(allShipBooks);
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "there is something went wrong with getShipBooks" });
        return;
    };
};

async function getUserBookings(req: Request, res: Response) {
    const { userId } = req.params;
    if (!userId) { res.status(400).json({ message: "User ID is required" }); return;}
    try {
        const userBookings = await ShipmentBookingModel.find({ userId });
        if (userBookings.length === 0) { res.status(404).json({ message: "No bookings found for this user" }); return;}
        res.status(200).json({ message: "User bookings retrieved successfully", userBookings });
        return;
    } catch (error) {
        console.error("Error fetching user bookings:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};

export default { createShipmentBooking, getAllShipmentBookings, getUserBookings };