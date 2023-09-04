import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import pingController from "./controllers/ping/pingController.js";
import { endPointNotFound, generalErrorHandler } from "./middlewares/errors.js";

const app = express();
app.disable("x-powered-by");

const corsOptions = {
  origin: [process.env.ALLOW_PROD_ORIGIN!, process.env.ALLOW_LOCAL_ORIGIN!],
  methods: "GET,POST",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(morgan("dev"));
app.use(express.json());

app.use(cors(corsOptions));

app.get("/", pingController);

app.use(endPointNotFound);
app.use(generalErrorHandler);

export default app;
