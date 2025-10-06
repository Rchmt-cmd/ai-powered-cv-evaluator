import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// Middleware dasar
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routing utama
app.use("/api", routes);

// Error handling (selalu di bawah route)
app.use(errorHandler);

export default app;
