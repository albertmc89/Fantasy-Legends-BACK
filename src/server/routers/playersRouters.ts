import express from "express";
import {
  addPlayerController,
  deletePlayerByIdController,
  getPlayerByIdController,
  getPlayersController,
  modifyByIdController,
} from "../controllers/players/playersControllers.js";

const playersRouter = express.Router();

playersRouter.get("/", getPlayersController);

playersRouter.delete("/:idPlayer", deletePlayerByIdController);

playersRouter.post("/", addPlayerController);

playersRouter.get("/:idPlayer", getPlayerByIdController);

playersRouter.patch("/:idPlayer", modifyByIdController);

export default playersRouter;
