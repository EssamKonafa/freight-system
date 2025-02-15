import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import freightRouter from "./routes/freight"
import RouteModel from './models/route';
import PricingModel from './models/pricing';
import ContainerTypeModel from './models/containerType';

const app = express();

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//connecting to database
mongoose
    .connect(process.env.DATABASE_LINK || 'mongodb://localhost:27017/freight-pricing')
    .then(async () => {
        const existingRoute = await RouteModel.findOne();
        const existingPricing = await PricingModel.findOne();
        const existingContainerTypePrice = await ContainerTypeModel.findOne();
        if (!existingRoute || !existingPricing || !existingContainerTypePrice) {
            await RouteModel.insertMany([
                { from: "Alexandria", to: "Shanghai", distance_km: 9300 },
                { from: "Alexandria", to: "New York", distance_km: 8500 },
                { from: "Damietta", to: "Rotterdam", distance_km: 3200 },
                { from: "Port Said", to: "Dubai", distance_km: 2400 },
                { from: "Sokhna", to: "Mumbai", distance_km: 5600 }
            ]);
            await PricingModel.insertOne(
                {
                    base_price_per_km: 0.25,
                    fuel_charge_per_km: 0.05,
                } 
            );
            await ContainerTypeModel.insertMany([
                { type: "20_dry", price: 1.5 },
                { type: "40_dry", price: 2.8 }
            ]);
        } 
    })
    .then(() => console.log("connected to freight-pricing database"))
    .catch((err: Error) => {
        console.error("Error connecting to the database", err);
        process.exit(1); //to exist if unable to connecting to database
    });

//middlewares
app.use(express.json());

//routes
app.use('/freight', freightRouter);

//not found middleware
app.use("*", (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: " route not found " });
});

//handling middleware error
app.use(
    (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.status(500).json({ message: "there is something went wrong with your API" });
    }
);