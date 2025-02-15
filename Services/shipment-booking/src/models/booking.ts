import { model, Schema } from "mongoose";

interface IShipmentBooking {
    userId: Schema.Types.ObjectId;
    loadingPort: string;
    dischargePort: string;
    containerType: string;
    bookingDate: Date;
    status: "pending" | "confirmed" | "canceled";
};

const shipmentBookingSchema = new Schema<IShipmentBooking>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    loadingPort: { type: String, required: true },
    dischargePort: { type: String, required: true },
    containerType: { type: String, required: true },
    bookingDate: { type: Date, default: Date.now },
    status: { type: String, enum: ["pending", "confirmed", "canceled"], default: "pending" },
},
    { timestamps: true }
);

const ShipmentBookingModel = model<IShipmentBooking>("ShipmentBooking", shipmentBookingSchema);

export default ShipmentBookingModel;