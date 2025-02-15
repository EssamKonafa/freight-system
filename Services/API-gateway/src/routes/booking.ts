import express from "express";
import booking from "../controllers/booking";

const router = express.Router();

router.post("/create-booking", booking.createBooking);
router.get("/all-bookings", booking.getAllBookings);
router.get("/:userId", booking.getUserBookings);

export default router;