import express from "express";
import {
  addPlayerController,
  deletePlayerByIdController,
  getPlayersController,
} from "../controllers/players/playersControllers.js";

const playersRouter = express.Router();

playersRouter.get("/", getPlayersController);

playersRouter.delete("/:idPlayer", deletePlayerByIdController);

playersRouter.post("/", addPlayerController);

export default playersRouter;
