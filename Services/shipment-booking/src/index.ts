import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import shipmentBookingRouter from "../src/routes/booking";

const app = express();

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//connecting to database
mongoose
    .connect(process.env.DATABASE_LINK || 'mongodb://localhost:27017/shipment-booking')
    .then(() => console.log("connected to shipment-booking database"))
    .catch((err: Error) => {
        console.error("Error connecting to the database", err);
        process.exit(1); //to exist if unable to connecting to database
    });

//middlewares
app.use(express.json());

//routes
app.use("/shipment-booking", shipmentBookingRouter);

//not found middleware
app.use("*", (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: " route not found " });
});

//handling middleware error
app.use(
    (err: Error, req: express.Request, res: express.Response, next: express.NextFunction
    ) => {
        console.error(err.stack); 
        res.status(500).json({ message: "there is something went wrong with your API" });
    }
);
