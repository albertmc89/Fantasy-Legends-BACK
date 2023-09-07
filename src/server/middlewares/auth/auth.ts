import { type NextFunction, type Response } from "express";
import admin from "firebase-admin";
import CustomError from "../../../CustomError/CustomError.js";
import firebaseApp from "../../../firebase.js";
import { type AuthRequest } from "../../types.js";

const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  try {
    if (!token) {
      const error = new CustomError("Unauthorized", 401, "Unauthorized");

      next(error);
      return;
    }

    const userData = await admin.auth(firebaseApp).verifyIdToken(token);

    req.authId = userData.uid;

    next();
  } catch (error: unknown) {
    const customError = new CustomError(
      "Invalid token",
      401,
      (error as Error).message,
    );

    next(customError);
  }
};

export default auth;
