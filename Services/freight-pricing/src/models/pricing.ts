import { model, Schema } from "mongoose";

interface Pricing {
    base_price_per_km: number;
    fuel_charge_per_km: number;
};

const PricingSchema = new Schema<Pricing>({
    base_price_per_km: { type: Number },
    fuel_charge_per_km: { type: Number },
});

const PricingModel = model<Pricing>("Pricing", PricingSchema);

export default PricingModel;