import express from "express";
import adminRouter from "./routes/admin-routes.js";
import userRouter from "./routes/user-routes.js";
import turnRouter from "./routes/turn-routes.js";
import authRouter from "./routes/auth-routes.js";
import serviceRouter from "./routes/service-routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

// parse cookies for routes that need to read the auth cookie
app.use(cookieParser());

app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true
    }
));

app.use("", adminRouter);
app.use("", userRouter);
app.use("", turnRouter);
app.use("", authRouter);
app.use("", serviceRouter);

export default app;