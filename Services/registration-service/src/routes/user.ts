import express from "express";
import user from "../controllers/user";

const router = express.Router();

//send OTP to new registered user
router.post("/", user.userRegister);

//user actions
router.post("/activation",user.userActivation);
router.get("/:userId", user.getUser);

export default router;