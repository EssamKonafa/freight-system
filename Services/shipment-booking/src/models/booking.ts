import { model, Schema } from "mongoose";

interface IShipmentBooking {
    loadingPort: string;
    dischargePort: string;
    containerType: string;
    shipmentPrice: number;
    bookingDate: Date;
    status: string;
};

const shipmentBookingSchema = new Schema<IShipmentBooking>({
    loadingPort: { type: String, required: true },
    dischargePort: { type: String, required: true },
    containerType: { type: String, required: true },
    shipmentPrice: { type: Number, required: true },
    bookingDate: { type: Date, default: Date.now },
    status: { type: String, default: "pending" },
});

const ShipmentBookingModel = model<IShipmentBooking>("ShipmentBooking", shipmentBookingSchema);

export default ShipmentBookingModel;