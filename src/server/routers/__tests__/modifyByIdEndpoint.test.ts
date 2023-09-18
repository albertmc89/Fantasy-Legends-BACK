import { MongoMemoryServer } from "mongodb-memory-server";
import admin from "firebase-admin";
import mongoose from "mongoose";
import request from "supertest";
import connectToDataBase from "../../../database/connectToDatabase";
import Player from "../../../database/models/Player";
import { idPlayerMock, playerByIdMock } from "../../mocks/playersMock";
import app from "../..";
import { type DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { mockId, userMock } from "../../mocks/usersMock";
import User from "../../../database/models/User";
jest.mock("firebase-admin");

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDataBase(server.getUri());

  const token: Partial<DecodedIdToken> = {
    uid: mockId,
  };

  admin.auth = jest.fn().mockReturnValue({
    verifyIdToken: jest.fn().mockResolvedValue(token),
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

describe(`Given a PATCH '/players/:idPlayer' endpoint`, () => {
  describe("When it receives a request", () => {
    test("Then it should respond with status 200 and a player'", async () => {
      const expectedStatusCode = 200;
      const path = `/players/${idPlayerMock}`;
      const playerById = playerByIdMock[0].isBought;

      await Player.create(playerByIdMock);
      await User.create(userMock);

      const response = await request(app)
        .patch(path)
        .set("Authorization", "Bearer token")
        .send({ isBought: false })
        .expect(expectedStatusCode);

      expect(response.body.player).toHaveProperty("isBought", playerById);
    });
  });
});
