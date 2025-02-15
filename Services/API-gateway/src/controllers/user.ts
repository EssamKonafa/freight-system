import axios from "axios";
import { Request, Response } from "express";

const REGISTER_SERVICE = process.env.REGISTER_SERVICE || "http://localhost:4000/user";

async function userRegister(req: Request, res: Response) {
    const { email, referralCode } = req.body;
    if (!email) { res.status(404).json({ message: "email not found" }); return; };
    try {
        const response = await axios.post(`${REGISTER_SERVICE}`, { email, referralCode });
        res.status(response.status).json(response.data);
        return;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            res.status(error.response.status).json(error.response.data);
            return;
        }
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }; 
};

async function userActivation(req: Request, res: Response) {
    const { OTPCode } = req.body;
    if (!OTPCode) { res.status(404).json({ message: "OTP code is required." }); return; };
    try {
        const response = await axios.post(`${REGISTER_SERVICE}/activation`, { OTPCode });
        res.status(201).json(response.data);
        return;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            res.status(error.response.status).json(error.response.data);
            return;
        }
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
};

async function getUser(req: Request, res: Response) {
    const { userId } = req.params;
    if (!userId) { res.status(404).json({ message: "userId not found" }); return; };
    try {
        const response = await axios.get(`${REGISTER_SERVICE}/${userId}`);
        res.status(200).json(response.data);
        return;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            res.status(error.response.status).json(error.response.data);
            return;
        }
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
};

export default { userRegister, userActivation, getUser };