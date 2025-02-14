import { Request, Response } from "express";

async function generateReferralLink(req: Request, res: Response) {
    try {
        const generateCode = Math.random().toString(32).substring(2,8);
        res.status(200).json({ message:"code generated successfully", referralCode: generateCode });
        return;
    } catch (error) {
        console.error("error while generating referral link", error);
        res.status(500).json({ message: "error while generating referral link" });
        return;
    };
};

async function saveReferralCode(req: Request, res: Response) {
    const { user, referralCode } = req.body;
    if (!user) { res.status(400).json({ message: "userId is required" }); return; };
    if (!referralCode) { res.status(400).json({ message: "referralCode is required" }); return; };
    try{
        user.referralCode = referralCode;
    }catch (error) {
        console.error("error while saving referral code", error);
        res.status(500).json({ message: "error while saving referral code" });
        return;
    };
};

async function applyReferralCode(req: Request, res: Response) {
    const { referredUser, referrerUser } = req.body;
    if (!referredUser) { res.status(400).json({ message: "referredUser is required" }); return; };
    if (!referrerUser) { res.status(400).json({ message: "referrerUser is required" }); return; };
    try{
        if(referredUser.referralCode != null) {
        };
        referredUser.shippmentDiscount-10;
        referrerUser.referralPoints++;
        await referredUser.save();
        await referrerUser.save();
        res.status(200).json({ 
            message: "referral code applied successfully",
            referredUser: referredUser,
            referrerUser: referrerUser
        });
        return;
    }catch (error) {
        console.error("error while applying referral code", error);
        res.status(500).json({ message: "error while applying referral code" });
        return;
    };
};

export default { generateReferralLink, saveReferralCode, applyReferralCode };