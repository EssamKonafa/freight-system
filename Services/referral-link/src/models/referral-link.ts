import { model, Schema } from "mongoose";

interface IReferralLink {
    code: string;
    referrerUserId: Schema.Types.ObjectId;
    referredUserId:Schema.Types.ObjectId;
    isDiscounted:boolean;
    pointsEarned: number; 
};

const referralLinkSchema = new Schema<IReferralLink>({
    code: { type: String, required: true },
    referrerUserId: { type: Schema.Types.ObjectId, ref: "User" },
    referredUserId: { type: Schema.Types.ObjectId, ref: "User" , default:null},
    isDiscounted:{type:Boolean,default:false},
    pointsEarned:{type: Number}
},{ timestamps: true } 
);

const ReferralLinkModel = model<IReferralLink>("ReferralLink", referralLinkSchema);

export default ReferralLinkModel;