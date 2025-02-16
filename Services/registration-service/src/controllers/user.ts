import { sendEmail } from "../config/sendEmail";
import UserModel from "../models/user";
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { publishEvent } from "../RABBITMQ/events/publishEvent";


async function userRegister(req: Request, res: Response) {

    const { email, referralCode } = req.body;
    if (!email) { res.status(404).json({ message: "email not found" }); return; };

    try {
        const existingUser = await UserModel.exists({ email });
        if (existingUser) { res.status(409).json({ message: "email already exists" }); return; };

        const OTPCode = Math.floor(100000 + Math.random() * 900000);
        const OTPExpiresAt = new Date(Date.now() + 500 * 600 * 1000);

        sendEmail({
            htmlContent: `<p> Your verification code is <strong>${OTPCode}</strong>. Use this code to activate your account."<p/>`,
            receiverEmail: email,
        });

        const newUser = new UserModel({ email, OTPCode, OTPExpiresAt });

        if (referralCode) {
            await publishEvent("newUser.registered", { userId: newUser._id, referralCode });
            await publishEvent("user.discount", { userId: newUser._id });
        }

        await newUser.save();
        res.status(201).json({ message: `OTP code sended successfully to: ${email}` });
        return;

    } catch (error) {
        console.error("error while creating user", error);
        res.status(500).json({ message: "error while sending OTP code" });
        return;
    }
};


async function userActivation(req: Request, res: Response) {
    const { OTPCode } = req.body;
    if (!OTPCode) {
        res.status(404).json({ message: "OTP code is required." });
        return;
    }
    try {
        const newUser = await UserModel.findOne({ OTPCode });
        if (!newUser) {
            res.status(404).json({ message: "OTP code not found" });
            return;
        };
        // const validOTPCode = bcrypt.compare(OTPCode, newUser.OTPCode)
        // if (!validOTPCode) {
        //     res.status(401).json({ message: 'invalid password' })
        //     return;
        // }
        if (OTPCode != newUser.OTPCode || !newUser.OTPExpiresAt || newUser.OTPExpiresAt.getTime() < Date.now()) {
            res.status(404).json({ message: "Invalid or expired OTP." });
            return;
        }
        newUser.isActivated = true;
        newUser.OTPCode = null;
        newUser.OTPExpiresAt = null;

        await newUser.save();
        res.status(201).json({ message: "user Activated successfully", newUser });
        return;
    } catch (error) {
        console.error("error while creating user", error);
        res.status(500).json({ message: "error while creating user" });
        return;
    }
};

async function getUser(req: Request, res: Response) {
    const { userId } = req.params;
    if (!userId) res.status(404).json({ message: "userId not found" });
    try {
        const user = await UserModel.findById(userId);
        if (!user) res.status(404).json({ message: "user not found" });
        res.status(200).json(user);
        return;
    } catch (error) {
        console.error("error while fetching user", error);
        res.status(500).json({ message: "error while getting user" });
        return;
    };
};

export default { userRegister, userActivation, getUser };