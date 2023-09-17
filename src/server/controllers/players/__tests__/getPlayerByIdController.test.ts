import { type NextFunction, type Response } from "express";
import Player from "../../../../database/models/Player.js";
import { idPlayerMock, playersMock1 } from "../../../mocks/playersMock.js";
import { getPlayerByIdController } from "../playersControllers.js";
import CustomError from "../../../../CustomError/CustomError.js";
import { type AuthRequest } from "../../../types.js";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const req: Partial<AuthRequest> = {
  params: {
    playerId: idPlayerMock,
  },
};

const next: NextFunction = jest.fn();

describe("Given a getPlayerByIdController controller", () => {
  describe("When it receives a response", () => {
    Player.findById = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(playersMock1),
    });

    test("Then it should call its method status with 200", async () => {
      const expectedStatusCode = 200;

      await getPlayerByIdController(req as AuthRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then the method json should be called an object with a player the playerId has been loaded", async () => {
      await getPlayerByIdController(req as AuthRequest, res as Response, next);

      expect(res.json).toBeCalledWith({ player: playersMock1 });
    });

    test("Then it should call the received next function with a 500  'Couldn't retrieve player' error", async () => {
      const expectedError =
        "Cannot read properties of undefined (reading 'json')";
      const customError = new CustomError(
        "Can't retrieve player",
        500,
        expectedError,
      );

      Player.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(playersMock1),
      });

      const res: Partial<Response> = {
        status: jest.fn(),
        json: jest.fn(),
      };

      await getPlayerByIdController(req as AuthRequest, res as Response, next);

      expect(next).toBeCalledWith(customError);
    });
  });
});
