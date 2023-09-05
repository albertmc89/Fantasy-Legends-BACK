import { Schema, model } from "mongoose";
import { type PlayerStructure } from "../../types";

const playerSchema = new Schema<PlayerStructure>({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  goals: {
    type: Number,
    required: true,
  },
  games: {
    type: Number,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  isBought: {
    type: Boolean,
    default: true,
  },
  user: {
    type: String,
    ref: "User",
    required: true,
  },
});

const Player = model("Player", playerSchema, "players");

export default Player;
