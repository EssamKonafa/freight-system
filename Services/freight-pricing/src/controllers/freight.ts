import { Request, Response } from 'express';
import RouteModel from '../models/route';
import PricingModel from '../models/pricing';
import ContainerTypeModel from '../models/containerType';
import { publishEvent } from '../RABBITMQ/events/publishEvent';

async function shippingPrice(req: Request, res: Response) {
    const { userId, loadingPort, dischargePort, containerType } = req.body;
    
    if (!userId) { res.status(400).json({ message: "userId is required" }); return; };
    if (!loadingPort) { res.status(400).json({ message: "loadingPort is required" }); return; };
    if (!dischargePort) { res.status(400).json({ message: "dischargePort is required" }); return; };
    if (!containerType) { res.status(400).json({ message: "containerType is required" }); return; };
    try {


        const [route, pricing, containerTypePrice] = await Promise.all([
            RouteModel.findOne({ from: loadingPort, to: dischargePort }),
            PricingModel.findOne(),
            ContainerTypeModel.findOne({ type: containerType })
        ]);
        if (!route) { res.status(404).json({ message: "route not found or not supported right now" }); return; };
        if (!pricing) { res.status(404).json({ message: "pricing not found or not supported right now" }); return; };
        if (!containerTypePrice) { res.status(404).json({ message: "containerType not found or not supported right now" }); return; };

        const shippingPrice = ((pricing.base_price_per_km + pricing.fuel_charge_per_km) * route.distance_km + containerTypePrice.price);

        new RouteModel({
            from: route.from,
            to: route.to,
            distance_km: route.distance_km,
            totalPrice: shippingPrice});
            await route.save()
        res.status(200).json({
            message: "Shipping price calculated successfully.",
            route: {
                from: route.from,
                to: route.to,
                distance_km: route.distance_km,
                totalPrice: shippingPrice,
                isDiscounted:route.isDiscounted
            },
            container: {
                type: containerTypePrice.type,
                price: containerTypePrice.price,
            },
        });
        return;
    } catch (error) {
        console.error("error happened while calculating shippingPrice", error);
        res.status(500).json({ message: "error happened while calculating shippingPrice" });
        return;
    }
};

async function getAllFreights(req: Request, res: Response) {
    try {
        const routes = await RouteModel.find();
        if (!routes) {
            res.status(404).json({ message: "routes not found" });
            return;
        }
        res.status(200).json(routes);
        return;
    } catch (error) {
        console.error("error happened while getting routes", error);
        res.status(500).json({ message: "error happened while getting routes" });
        return;
    }
};

async function getKM_prices(req: Request, res: Response) {
    try {
        const KM_prices = await PricingModel.find();
        if (!KM_prices) {
            res.status(404).json({ message: "prices not found" });
            return;
        }
        res.status(200).json(KM_prices);
        return;
    } catch (error) {
        console.error("error happened while getting prices", error);
        res.status(500).json({ message: "error happened while getting prices" });
        return;
    };
};

async function getContainers(req: Request, res: Response) {
    try {
        const container = await ContainerTypeModel.find();
        if (!container) {
            res.status(404).json({ message: "container not found" });
            return;
        }
        res.status(200).json(container);
        return;
    } catch (error) {
        console.error("error happened while getting container", error);
        res.status(500).json({ message: "error happened while getting container" });
        return;
    };
}



export default { shippingPrice, getAllFreights, getKM_prices, getContainers };