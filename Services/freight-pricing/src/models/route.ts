import { model, Schema } from "mongoose";

interface IRoute {
    userId:Schema.Types.ObjectId
    from: string,
    to: string,
    distance_km: number,
    isDiscounted:boolean,
    totalPrice:number
};

const routeSchema = new Schema<IRoute>({
    userId:{type:Schema.Types.ObjectId, ref:"User"},
    from: { type: String },
    to: { type: String},
    distance_km: { type: Number,},
    isDiscounted:{type:Boolean,default:false},
    totalPrice:{type:Number}
});

const RouteModel = model<IRoute>("Route", routeSchema);

export default RouteModel;