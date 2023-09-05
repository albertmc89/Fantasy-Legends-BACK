import { type UserStructure, type PlayerStructure } from "../../types";
import mongoose from "mongoose";

export const userMock: UserStructure[] = [
  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: "Daniela",
    authId: "8w33480basjdb23k2",
  },
];

export const playersMock: PlayerStructure[] = [
  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: "Leo Messi",
    country: "Argentina",
    age: 36,
    height: 169,
    goals: 818,
    games: 1038,
    position: "ST",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg",
    isBought: true,
    user: new mongoose.Types.ObjectId().toString(),
  },
  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: "Thierry Henry",
    country: "France",
    age: 42,
    height: 188,
    goals: 416,
    games: 922,
    position: "ST",
    image:
      "https://tmssl.akamaized.net/images/foto/galerie/thierry-henry-1417524348-3352.jpg?lm=1483605830",
    isBought: true,
    user: new mongoose.Types.ObjectId().toString(),
  },
];
