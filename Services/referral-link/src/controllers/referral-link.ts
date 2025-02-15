import { Request, Response } from "express";
import ReferralLinkModel from "../models/referral-link";

async function generateReferralLink(req: Request, res: Response) {
    const { userId } = req.body;
    if (!userId) { res.status(400).json({ message: "userId is required" }); return; };
    try {
        const generateCode = Math.random().toString(32).substring(2, 8);
        const referralCode = new ReferralLinkModel({ code: generateCode, referrer: userId });
        await referralCode.save();
        res.status(200).json({ message: "code generated successfully", referralCode });
        return;
    } catch (error) {
        console.error("error while generating referral link", error);
        res.status(500).json({ message: "error while generating referral link" });
        return;
    };
};

async function applyReferralCode(req: Request, res: Response) {
    const { referredUserId, referralCode } = req.body;
    if (!referredUserId) { res.status(400).json({ message: "referredUserId is required" }); return; };
    if (!referralCode) { res.status(400).json({ message: "referralCode is required" }); return; };
    try {
        const code = await ReferralLinkModel.findOne({ code: referralCode });
        if (!code) { res.status(404).json({ message: "invalid referral code" }); return; };
        if (code.referrer === referredUserId) { res.status(400).json({ message: "you can't refer yourself" }); return; };
        if (code.referredUsers.includes(referredUserId)) { res.status(400).json({ message: "you have already used this referral code" }); return; };
        code.referredUsers.push(referredUserId);
        code.pointsEarned++;
        await code.save();
        res.status(200).json({
            message: "referral applied successfully",
            referrer: code.referrer,
            referredUser: referredUserId,
        });
        return;
    } catch (error) {
        console.error("error while applying referral code", error);
        res.status(500).json({ message: "error while applying referral code" });
        return;
    };
};

export default { generateReferralLink, applyReferralCode };