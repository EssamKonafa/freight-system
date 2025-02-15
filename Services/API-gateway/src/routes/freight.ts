import express from "express";
import freight from "../controllers/freight";

const router = express.Router();

router.post("/shipping-price", freight.shippingPrice);
router.get("/all-freights", freight.getAllFreights);
router.get("/km-prices", freight.getKM_prices);
router.get("/containers", freight.getContainers);
 
export default router;