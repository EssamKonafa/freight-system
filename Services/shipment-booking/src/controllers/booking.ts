import { Request, Response } from "express";
import ShipmentBookingModel from "../models/booking";

async function createShipmentBooking(req: Request, res: Response) {
    const { loadingPort, dischargePort, containerType, shipmentPrice } = req.body;
    if (!loadingPort || !dischargePort || !containerType || !shipmentPrice) { res.status(404).json({ message: "missing required fields" }); return; };
    try {
        const newShipmentBooking = new ShipmentBookingModel({
            loadingPort,
            dischargePort,
            containerType,
            shipmentPrice
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

export default { createShipmentBooking, getAllShipmentBookings };