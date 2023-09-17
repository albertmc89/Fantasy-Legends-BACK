import mongoose from "mongoose";
import admin from "firebase-admin";
import Player from "../../../database/models/Player.js";
import { playersMock, postPlayerMock } from "../../mocks/playersMock.js";
import app from "../..";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDataBase from "../../../database/connectToDatabase.js";
import { type DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { mockId, userMock } from "../../mocks/usersMock.js";
import User from "../../../database/models/User.js";

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

describe(`Given a ADD '/players' endpoint`, () => {
  beforeEach(async () => {
    await Player.create(playersMock);
    await User.create(userMock);
  });

  describe("When it receives a request with an existan player id", () => {
    test(`Then it should respond with a status 201 and the player 'Zinedine Zidane' posted'`, async () => {
      const expectedStatusCode = 201;
      const path = "/players";

      const response = await request(app)
        .post(path)
        .set("Authorization", "Bearer token")
        .send(postPlayerMock)
        .expect(expectedStatusCode);

      expect(response.body).toHaveProperty("player", postPlayerMock);
    });
  });
});
