import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import referralLinkRouter from "./routes/referral-link";
import { subscribeEvent } from "./RABBITMQ/events/subscribeEvent";
import { UserRegisteredHandler } from "./RABBITMQ/handlers/UserRegisteredHandler";
import { startDiscountHandler } from "./RABBITMQ/handlers/discountHandler";
const app = express();

const PORT = process.env.PORT || 4003;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
}); 

//connecting to database
mongoose
    .connect(process.env.DATABASE_LINK || 'mongodb://localhost:27017/referral-link')
    .then(() => console.log("connected to referral-link database"))
    .catch((err: Error) => {
        console.error("Error connecting to the database", err);
        process.exit(1); //to exist if unable to connecting to database
    });

//middlewares
app.use(express.json());
subscribeEvent("newUser.registered", UserRegisteredHandler); 

//routes
app.use("/referral-link", referralLinkRouter);

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
