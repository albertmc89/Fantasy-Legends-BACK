import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import pingController from "./controllers/ping/pingController.js";
import { endpointNotFound, generalError } from "./middlewares/error/errors.js";
import playersRouter from "./routers/playersRouters.js";
import auth from "./middlewares/auth/auth.js";

const app = express();
app.disable("x-powered-by");

const corsOptions = {
  origin: [process.env.ALLOW_PROD_ORIGIN!, process.env.ALLOW_LOCAL_ORIGIN!],
};

app.use(morgan("dev"));

app.use(express.json());

app.use(cors(corsOptions));

app.get("/", pingController);

app.use(auth);

app.use("/players", playersRouter);

app.use(endpointNotFound);

app.use(generalError);

export default app;
