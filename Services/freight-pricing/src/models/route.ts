import { model, Schema } from "mongoose";

interface IRoute {
    from: string,
    to: string,
    distance_km: number,
};

const routeSchema = new Schema<IRoute>({
    from: { type: String },
    to: { type: String},
    distance_km: { type: Number,},
});

const RouteModel = model<IRoute>("Route", routeSchema);

export default RouteModel;