import { model, Schema } from "mongoose";

interface IReferralLink {
    code: string;
    referrer: Schema.Types.ObjectId;
    referredUsers: Schema.Types.ObjectId[];
    pointsEarned: number;
};

const referralLinkSchema = new Schema<IReferralLink>({
    code: { type: String, required: true },
    referrer: { type: Schema.Types.ObjectId, ref: "User" },
    referredUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    pointsEarned: { type: Number, default: 0 },
});

const ReferralLinkModel = model<IReferralLink>("ReferralLink", referralLinkSchema);

export default ReferralLinkModel;