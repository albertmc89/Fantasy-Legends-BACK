import express from "express";
import {
  addPlayerController,
  deletePlayerByIdController,
  getPlayerByIdController,
  getPlayersController,
} from "../controllers/players/playersControllers.js";

const playersRouter = express.Router();

playersRouter.get("/", getPlayersController);

playersRouter.delete("/:idPlayer", deletePlayerByIdController);

playersRouter.post("/", addPlayerController);

playersRouter.get("/:idPlayer", getPlayerByIdController);

export default playersRouter;
