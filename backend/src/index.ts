import "dotenv/config";
import express from "express"
import connectToDatabase from "./config/db"
import cors from "cors";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler";
import catchErrors from "./utils/catchErrors";
import { OK } from "./constants/http";
import authRoutes from "./routes/auth.route";
import authenticate from "./middleware/authenticate";
import userRoutes from "./routes/user.route";
import sessionRoutes from "./routes/session.route";

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
    cors({
        origin: APP_ORIGIN,
        credentials: true
    })
)

app.use(cookieParser())


app.get("/", (req, res, next) => {
    return res.status(OK).json({
        status: "healthy",
    });
});

// auth routes

app.use("/auth", authRoutes)
app.use("/sessions", authenticate, sessionRoutes);

// procted routes

app.use("/user", authenticate, userRoutes);





app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`port is running on ${PORT} in ${NODE_ENV} `)
    await connectToDatabase();
})

