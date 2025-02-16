import ReferralLinkModel from "../../models/referral-link";
import { subscribeEvent } from "../events/subscribeEvent";

export async function applyDiscountHandler(data: any) {
    console.log("event subscribed to user.discount:", data);
    const { userId } = data;

    try{
        const referredUser = await ReferralLinkModel.findOne({userId});
        if (!referredUser) {console.log("referredUser not found");return;}
        referredUser.isDiscounted=true;
        await referredUser.save();
        console.log("User updated as discount 1%");
    }catch (error) {
        console.error("Error handling user discount event:", error);
        throw error;
    }
}

