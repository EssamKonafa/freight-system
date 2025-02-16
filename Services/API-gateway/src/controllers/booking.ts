import axios from "axios";
import { Request, Response } from "express";

const BOOKING_SERVICE = process.env.BOOKING_SERVICE_URL||'http://localhost:4002/shipment-booking'; 

async function createBooking(req: Request, res: Response) {
    const { userId, loadingPort, dischargePort, containerType } = req.body;
    try {
        const response = await axios.post(`${BOOKING_SERVICE}`, {
            userId,
            loadingPort,
            dischargePort,
            containerType,
        });
        res.status(response.status).json(response.data);
        return;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            res.status(error.response.status).json(error.response.data);
            return;
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function getAllBookings(req: Request, res: Response) {
    try {
        const response = await axios.get(`${BOOKING_SERVICE}/all-bookings`);
        res.status(response.status).json(response.data);
        return;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            res.status(error.response.status).json(error.response.data);
            return;
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function getUserBookings(req: Request, res: Response) {
    const { userId } = req.params;
    if (!userId) { res.status(400).json({ message: "User ID is required" }); return; }
    try {
        const response = await axios.get(`${BOOKING_SERVICE}/${userId}`);   
        res.status(response.status).json(response.data);
        return;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            res.status(error.response.status).json(error.response.data);
            return;
        }
        res.status(500).json({ message: "Internal Server Error" }); 
        return;
    };
}

export default { createBooking, getAllBookings, getUserBookings };