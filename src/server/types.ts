import { type Request } from "express";
import { type PlayerStructure } from "../types";

export interface AuthRequest extends Request {
  userId?: string;
}

export interface RequestWithBody
  extends Request<
    Record<string, unknown>,
    Record<string, unknown>,
    PlayerStructure
  > {
  userId?: string;
}
