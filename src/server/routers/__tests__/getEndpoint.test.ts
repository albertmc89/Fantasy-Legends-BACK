import { MongoMemoryServer } from "mongodb-memory-server";
import { type PlayerStructure } from "../../../types";
import mongoose from "mongoose";
import app from "../..";
import request from "supertest";
import {
  playersMock,
  playersMock1,
  playersMock2,
} from "../../mocks/playersMock.js";
import Player from "../../../database/models/Player.js";
import { type DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import connectToDataBase from "../../../database/connectToDatabase.js";
import admin from "firebase-admin";
import User from "../../../database/models/User.js";
import { mockId, userMock } from "../../mocks/usersMock.js";

jest.mock("firebase-admin");

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDataBase(server.getUri());

  const token: Partial<DecodedIdToken> = {
    uid: mockId,
  };

  admin.auth = jest.fn().mockReturnValue({
    verifyIdToken: jest.fn().mockResolvedValue(token as DecodedIdToken),
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

describe("Given a GET '/players' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with status 200 and players 'Leo Messi' and 'Thierry Henry'", async () => {
      const expectedStatusCode = 200;
      const path = "/players";

      await Player.create(playersMock1);
      await Player.create(playersMock2);
      await User.create(userMock);

      const response = await request(app)
        .get(path)
        .set("Authorization", "Bearer token")
        .expect(expectedStatusCode);

      const responseBody = response.body as { players: PlayerStructure[] };

      responseBody.players.forEach(
        (player: PlayerStructure, playerPosisiton) => {
          expect(player).toHaveProperty(
            "name",
            playersMock[playerPosisiton].name,
          );
        },
      );
    });
  });
});
