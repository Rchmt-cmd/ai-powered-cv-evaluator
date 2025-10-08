import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import rateLimit from "express-rate-limit";

const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 menit
  max: 30, // maks 30 request per menit per IP
  message: "Too many requests, please try again later.",
});

// Middleware dasar
app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routing utama
app.use("/api", routes);

// Error handling (selalu di bawah route)
app.use(errorHandler);

export default app;
