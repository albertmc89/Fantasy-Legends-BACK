import { type NextFunction, type Response, type Request } from "express";
import Player from "../../../../database/models/Player.js";
import { playersMock } from "../../../mocks/playersMock.js";
import { deletePlayerByIdController } from "../playersControllers.js";
import CustomError from "../../../../CustomError/CustomError.js";

const playerIdMock = "l3mdlfd0324n292";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const req: Partial<Request> = {
  params: {
    playerId: playerIdMock,
  },
};

const next: NextFunction = jest.fn();

describe("Given a deletePlayerById controller", () => {
  describe("When it receives a response", () => {
    Player.findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ playersMock }),
    });

    test("Then it should call its method status with 200", async () => {
      const expectedStatusCode = 200;

      await deletePlayerByIdController(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then the method json should be called an object with a player the id 'l3mdlfd0324n292' has been deleted", async () => {
      await deletePlayerByIdController(req as Request, res as Response, next);

      expect(res.json).toBeCalledWith({
        message: "Player successfully deleted",
      });
    });

    test("Then it should call the received next function with a 404 'Player not found' error", async () => {
      Player.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      const expectedError = new CustomError(
        "Player not found",
        404,
        "Player not found",
      );

      await deletePlayerByIdController(req as Request, res as Response, next);

      expect(next).toBeCalledWith(expectedError);
    });

    test("Then it should call the received next function with a 500  'Can't delete player' error", async () => {
      const expectedError = new CustomError(
        "Can't delete player",
        500,
        "Can't delete player",
      );

      Player.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(expectedError),
      });

      await deletePlayerByIdController(req as Request, res as Response, next);

      expect(next).toBeCalledWith(expectedError);
    });
  });
});
