import { type Request } from "express";
import { type ReceivedPlayer } from "../types";

export interface AuthRequest extends Request {
  userId?: string;
}

export interface RequestWithBody
  extends Request<
    Record<string, unknown>,
    Record<string, unknown>,
    ReceivedPlayer
  > {
  userId?: string;
}

export interface AuthRequestWithBooleanBody
  extends Request<
    Record<string, unknown>,
    Record<string, unknown>,
    { isBought: boolean }
  > {
  userId?: string;
}
