import express from 'express';
import freight from "../controllers/freight";
const router = express.Router();

router.get('/shippingPrice',freight.shippingPrice);
router.get('/allFreights',freight.getAllFreights);
router.get('/KM_prices',freight.getKM_prices);
router.get('/containers',freight.getContainers);

export default router;