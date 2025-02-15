import axios from "axios";
import { Request, Response } from "express";
const REFERRAL_LINK_SERVICE = process.env.REFERRAL_LINK_SERVICE_URL||'http://localhost:4003/referral-link';

async function generateReferralLink(req: Request, res: Response) {
    const { userId } = req.body;
    if (!userId) { res.status(400).json({ message: "userId is required" }); return; };
    try{
        const response = await axios.post(`${REFERRAL_LINK_SERVICE}/generate`, {userId});
        res.status(response.status).json(response.data);
        return;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            res.status(error.response.status).json(error.response.data);
            return;
        }
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
} 

async function applyReferralCode(req: Request, res: Response) {
    const { referredUserId, referralCode } = req.body;
    if (!referredUserId) { res.status(400).json({ message: "referredUserId is required" }); return; };
    if (!referralCode) { res.status(400).json({ message: "referralCode is required" }); return; };
    try{
        const response = await axios.post(`${REFERRAL_LINK_SERVICE}/apply`, {referredUserId, referralCode});
        res.status(response.status).json(response.data);
        return;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            res.status(error.response.status).json(error.response.data);
            return;
        }
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
}

export default { generateReferralLink, applyReferralCode };