import express from 'express';
import referralLink from '../controllers/referral-link';

const router = express.Router();

router.post("/generate", referralLink.generateReferralLink);
router.post("/save", referralLink.saveReferralCode);
router.post("/apply", referralLink.applyReferralCode);

export default router;
