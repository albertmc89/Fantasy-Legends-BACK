import { type Response, type NextFunction } from "express";
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
