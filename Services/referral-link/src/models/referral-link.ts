import { model, Schema } from "mongoose";

interface IReferralLink {
    code: string;
    referrerUserId: Schema.Types.ObjectId;
};

const referralLinkSchema = new Schema<IReferralLink>({
    code: { type: String, required: true },
    referrerUserId: { type: Schema.Types.ObjectId, ref: "User" },
},{ timestamps: true } 
);

const ReferralLinkModel = model<IReferralLink>("ReferralLink", referralLinkSchema);

export default ReferralLinkModel;