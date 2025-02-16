import UserModel from "../../models/user";
import { publishEvent } from "../events/publishEvent";
import { subscribeEvent } from "../events/subscribeEvent";

export async function userReferredHandler(data: any) {
    console.log("Event received: user.referred", data);

    const { referredUserId } = data;
    console.log("referredUserId",referredUserId);

    try {
        const user = await UserModel.findById(referredUserId);
        if (!user) {
            console.log("User not found");
            return;
        }
        await user.save();
        await publishEvent("user.referred", { referredUserId: user._id });

        console.log(`✅ User ${referredUserId} updated`);
    } catch (error) {
        console.error("Error updating user as referred:", error);
    }
}

subscribeEvent("user.referred", userReferredHandler);
