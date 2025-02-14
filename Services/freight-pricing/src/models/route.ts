import { model, Schema } from "mongoose";

interface IRoute {
    from: string,
    to: string,
    distance_km: number,
};

const routeSchema = new Schema<IRoute>({
    from: { type: String, required: true },
    to: { type: String, required: true },
    distance_km: { type: Number, required: true },
});

const RouteModel = model<IRoute>("Route", routeSchema);

export default RouteModel;