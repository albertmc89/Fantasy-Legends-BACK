import { type NextFunction, type Response, type Request } from "express";
import Player from "../../../../database/models/Player.js";
import { playersMock } from "../../../mocks/playersMock.js";
import { modifyByIdController } from "../playersControllers.js";
import { type RequestWithBody } from "../../../types.js";

const playerIdMock = "l3mdlfd0324n292";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const req: Partial<RequestWithBody> = {
  params: {
    playerId: playerIdMock,
  },
  body: {
    name: "Zinedine Zidane",
    country: "France",
    age: 42,
    height: 188,
    goals: 416,
    games: 922,
    position: "MD",
    image:
      "https://tmssl.akamaized.net/images/foto/galerie/thierry-henry-1417524348-3352.jpg?lm=1483605830",
    isBought: true,
  },
};

const next: NextFunction = jest.fn();

Player.findByIdAndUpdate = jest.fn().mockReturnValue({
  exec: jest.fn().mockResolvedValue({
    ...playersMock[0],
    isBought: true,
  }),
});

describe("Given a modifyById controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its method status with 200", async () => {
      const expectedStatusCode = 200;

      await modifyByIdController(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then the json method should respond with the player modified", async () => {
      await modifyByIdController(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({
        player: {
          ...playersMock[0],
          isBought: true,
        },
      });
    });
  });

  describe("when it receives a request without a idPlayer, a response and a next function", () => {
    test("Then the next function should be called with 'Couldn't modify the player'", async () => {
      const error = new Error();

      Player.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue({}),
      });

      await modifyByIdController(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
