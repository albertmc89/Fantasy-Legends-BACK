import express from "express";
import { getPlayersController } from "../controllers/players/playersControllers.js";

const playersRouter = express.Router();

playersRouter.get("/", getPlayersController);

export default playersRouter;
