import { type Request, type Response, type NextFunction } from "express";
import Player from "../../../database/models/Player.js";
import CustomError from "../../../CustomError/CustomError.js";
import { type RequestWithBody, type AuthRequest } from "../../types.js";

export const getPlayersController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const limitRequest = 10;

  try {
    const _id = req.userId;

    const players = await Player.find({ user: _id }).limit(limitRequest).exec();

    res.status(200).json({ players });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      404,
      "Couldn't retrieve players",
    );

    next(customError);
  }
};

export const addPlayerController = async (
  req: RequestWithBody,
  res: Response,
  next: NextFunction,
) => {
  const player = req.body;
  const _id = req.userId;

  try {
    const newPlayer = await Player.create({ ...player, user: _id });

    res.status(201).json({ player: newPlayer });
  } catch (error) {
    const customError = new CustomError(
      "Couldn't create the player",
      404,
      (error as Error).message,
    );

    next(customError);
  }
};

export const deletePlayerByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { idPlayer } = req.params;

  try {
    const player = await Player.findByIdAndDelete({ _id: idPlayer }).exec();

    if (!player) {
      next(new CustomError("Player not found", 404, "Player not found"));
      return;
    }

    res.status(200).json({ message: "Player successfully deleted" });
  } catch (error: unknown) {
    const customError = new CustomError(
      "Can't delete player",
      500,
      (error as Error).message,
    );

    next(customError);
  }
};

export const getPlayerByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { idPlayer } = req.params;

  try {
    const player = await Player.findById(idPlayer).exec();

    res.status(200).json({ player });
  } catch (error: unknown) {
    const customError = new CustomError(
      "Can't retrieve player",
      500,
      (error as Error).message,
    );

    next(customError);
  }
};
