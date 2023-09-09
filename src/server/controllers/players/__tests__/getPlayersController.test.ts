import { type NextFunction, type Response, type Request } from "express";
import Player from "../../../../database/models/Player.js";
import { playersMock } from "../../../mocks/playersMock.js";
import CustomError from "../../../../CustomError/CustomError.js";
import { getPlayersController } from "../playersControllers.js";
import { type AuthRequest } from "../../../types.js";

const req: Partial<Request> = {};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next: NextFunction = jest.fn();

describe("Given a getPlayersController controller", () => {
  describe("When it receives a request", () => {
    Player.find = jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockReturnValue(playersMock),
    });

    test("Then it should call its status method with code 200", async () => {
      const expectedStatusCode = 200;

      await getPlayersController(req as AuthRequest, res as Response, next);

      expect(res.status).toBeCalledWith(expectedStatusCode);
    });

    test("Then it should call it's json method with the players 'Leo Messi' and 'Thierry Henry'", async () => {
      await getPlayersController(req as AuthRequest, res as Response, next);

      expect(res.json).toBeCalledWith({ players: playersMock });
    });
  });

  describe("When it receives a response with a status mehtod that rejects and a next function", () => {
    test("Then the next function should be called with error 'Couldn't retrieve players'", async () => {
      const expectedErrorMessage =
        "Cannot read properties of undefined (reading 'json')";

      const res: Partial<Response> = {
        status: jest.fn(),
        json: jest.fn(),
      };

      const customError = new CustomError(
        expectedErrorMessage,
        404,
        expectedErrorMessage,
      );

      await getPlayersController(req as AuthRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
