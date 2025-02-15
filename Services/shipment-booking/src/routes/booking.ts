import express from 'express';
import shipmentBooking from "../controllers/booking";

const router = express.Router();

router.post("/",shipmentBooking.createShipmentBooking);
router.get("/all-bookings",shipmentBooking.getAllShipmentBookings);
router.get("/:userId",shipmentBooking.getUserBookings);

export default router;