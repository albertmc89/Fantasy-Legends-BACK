import { type Response, type Request, type NextFunction } from "express";
import Player from "../../../../database/models/Player.js";
import { type PlayerStructure } from "../../../../types";
import { addPlayerController } from "../playersControllers.js";
import { playerCreatedMock } from "../../../mocks/playersMock.js";
import CustomError from "../../../../CustomError/CustomError.js";

describe("Given an addRobot controller", () => {
  const req: Partial<Request> = {};
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next: NextFunction = jest.fn();

  describe("When it receives a request with a new Robot, a response and a next function", () => {
    Player.create = jest.fn().mockResolvedValue(playerCreatedMock);

    test("Then it should repond with status 201", async () => {
      const expectedStatus = 201;

      await addPlayerController(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          PlayerStructure
        >,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should respond with the new player created", async () => {
      await addPlayerController(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          PlayerStructure
        >,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ player: playerCreatedMock });
    });

    describe("When it receives a request with a incorrect form player, and a response and a next function", () => {
      test("Then it should respond with an error", async () => {
        const error = new Error("error");
        const customError = new CustomError(
          "Couldn't create the player",
          404,
          error.message,
        );

        Player.create = jest.fn().mockRejectedValue(error);

        await addPlayerController(
          req as Request<
            Record<string, unknown>,
            Record<string, unknown>,
            PlayerStructure
          >,
          res as Response,
          next,
        );

        expect(next).toHaveBeenCalledWith(customError);
      });
    });
  });
});
