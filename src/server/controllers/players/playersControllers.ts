import { type Request, type Response, type NextFunction } from "express";
import Player from "../../../database/models/Player.js";
import CustomError from "../../../CustomError/CustomError.js";
import { type PlayerStructure } from "../../../types.js";
import { type AuthRequest } from "../../types.js";

export const getPlayersController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const limitRequest = 10;

  try {
    const _id = req.userId;

    const players = await Player.find<PlayerStructure[]>({ user: _id })
      .limit(limitRequest)
      .exec();

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
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    PlayerStructure
  >,
  res: Response,
  next: NextFunction,
) => {
  const player = req.body;

  try {
    const newPlayer = await Player.create(player);

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
