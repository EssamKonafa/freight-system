import axios from "axios";
import { Request, Response } from "express";

const FREIGHT_SERVICE = process.env.FREIGHT_SERVICE || "http://localhost:4001/freight";

async function shippingPrice(req: Request, res: Response) {

    const { userId,loadingPort, dischargePort, containerType } = req.body;

    try {
        const response = await axios.post(`${FREIGHT_SERVICE}/shipping-price`, {
            userId,
            loadingPort,
            dischargePort,
            containerType
        });
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
}

async function getAllFreights(req: Request, res: Response) {
    try {
        const response = await axios.get(`${FREIGHT_SERVICE}/all-freights`);
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

async function getKM_prices(req: Request, res: Response) {
    try {
        const response = await axios.get(`${FREIGHT_SERVICE}/km-prices`);
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

async function getContainers(req: Request, res: Response) { 
    try {
        const response = await axios.get(`${FREIGHT_SERVICE}/containers`);
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
};

export default { shippingPrice, getAllFreights, getKM_prices, getContainers };