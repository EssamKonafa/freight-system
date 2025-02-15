import express from 'express';
import user from '../controllers/user';

const router = express.Router();

router.post("/register", user.userRegister);
router.post("/activation", user.userActivation);
router.get("/:userId", user.getUser);

export default router;