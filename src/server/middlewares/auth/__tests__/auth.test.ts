import { type NextFunction, type Response, type Request } from "express";
import admin from "firebase-admin";
import { type AuthRequest } from "../../../types";
import auth from "../auth";
import CustomError from "../../../../CustomError/CustomError.js";
import { type DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import User from "../../../../database/models/User";
import { userMock } from "../../../mocks/usersMock";

jest.mock("firebase-admin");

beforeEach(() => {
  jest.clearAllMocks();
});

const token: Partial<DecodedIdToken> = {
  authId: "8w33480basjdb23k2",
};

describe("Given an auth middleware", () => {
  const res: Partial<Response> = {};
  const next: NextFunction = jest.fn();

  describe("When it receives a request with a valid token, and a next function", () => {
    test("Then it should call the function next", async () => {
      const req: Partial<Request> = {
        header: jest.fn().mockReturnValue("8w33480basjdb23k2"),
      };

      admin.auth = jest.fn().mockReturnValue({
        verifyIdToken: jest.fn().mockResolvedValue(token),
      });

      User.findOne = jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(userMock) });

      await auth(req as AuthRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe("When it receives a request without token, a response and a next function", () => {
    test("Then it should call the next function with an error 'Unauthorized'", async () => {
      const req: Partial<Request> = {
        header: jest.fn().mockReturnValue(undefined),
      };
      const customError = new CustomError(
        "Unauthorized",
        401,
        "No token provided",
      );

      admin.auth = jest.fn().mockReturnValue({
        verifyIdToken: jest.fn().mockResolvedValue(undefined),
      });

      await auth(req as AuthRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });

  describe("When it receives a request with an invalid token, a response and a next function", () => {
    test("Then it should call the function next with error 'Invalid token'", async () => {
      const req: Partial<Request> = {
        header: jest.fn().mockReturnValue("token"),
      };
      const error = new Error("Invalid token");

      admin.auth = jest.fn().mockReturnValue({
        verifyIdToken: jest.fn().mockRejectedValue(error),
      });

      await auth(req as AuthRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it receives a valid token, a response and a next function, but there isn't a user", () => {
    test("Then the next function should be called with 'Couldn't find the user'", async () => {
      const error = new Error("Couldn't find the user");
      const req: Partial<Request> = {
        header: jest.fn().mockReturnValue("token"),
      };

      admin.auth = jest.fn().mockReturnValue({
        verifyIdToken: jest.fn().mockResolvedValue(token),
      });

      User.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await auth(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
