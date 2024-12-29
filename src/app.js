import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import config from "./config/config.js";

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOptions = {
  origin: [config.frontedUrl],
  Credential: true,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to AI project."
    })
});

app.use(globalErrorHandler)
export default app;