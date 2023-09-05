import { type Request, type Response, type NextFunction } from "express";
import Player from "../../database/models/Player.js";
import CustomError from "../../CustomError/CustomError.js";

export const getPlayersController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const limitRequest = 10;

  try {
    const players = await Player.find().limit(limitRequest).exec();

    res.status(200).json({ players });
  } catch (error: unknown) {
    const customError = new CustomError(
      "Couldn't retrieve players",
      404,
      (error as Error).message,
    );

    next(customError);
  }
};
