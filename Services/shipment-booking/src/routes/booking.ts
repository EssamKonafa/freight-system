import express from 'express';
import shipmentBooking from "../controllers/booking";

const router = express.Router();

router.post("/",shipmentBooking.createShipmentBooking);
router.get("/allBookings",shipmentBooking.getAllShipmentBookings);

export default router;