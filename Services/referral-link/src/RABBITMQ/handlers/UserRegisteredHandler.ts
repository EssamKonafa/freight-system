import ReferralLinkModel from "../../models/referral-link";
import { subscribeEvent } from "../events/subscribeEvent";

export async function updateReferralCode(data: any) {
    console.log("event subscribed to newUser.registered:", data);
    const { userId, referralCode } = data;

    try {
        const theReferralCode = await ReferralLinkModel.findOne({ code: referralCode });
        if (!theReferralCode) {console.log("Referral code not found");return;}
        theReferralCode.referredUserId= userId
        await theReferralCode.save();
        console.log("User updated as referrer");
    } catch (error) {
        console.error("Error handling new user registration event:", error);
        throw error;
    }
}

subscribeEvent("newUser.registered", updateReferralCode);