import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user";
import freightRouter from "./routes/freight";
import bookingRouter from "./routes/booking";
import referralRouter from "./routes/referral";

const app = express();

const PORT = process.env.PORT || 4004;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//connecting to database
mongoose
    .connect(process.env.DATABASE_LINK || 'mongodb://localhost:27017/api-gateway')
    .then(() => console.log("connected to API-gateway database"))
    .catch((err: Error) => {
        console.error("Error connecting to the database", err);
        process.exit(1); //to exist if unable to connecting to database
    });

//middlewares
app.use(express.json());

//routes
app.use("/user", userRouter);
app.use("/freight", freightRouter); 
app.use("/booking", bookingRouter);
app.use("/referral", referralRouter);

//not found middleware
app.use("*", (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: " API gateway route not found " });
});

//handling middleware error
app.use(
    (err: Error, req: express.Request, res: express.Response, next: express.NextFunction
    ) => {
        console.error(err.stack); 
        res.status(500).json({ message: "there is something went wrong with your API" });
    }
); 