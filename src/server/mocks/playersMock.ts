import { type ReceivedPlayer, type PlayerStructure } from "../../types";
import mongoose from "mongoose";
import { userMongooseId } from "./usersMock";

export const idPlayerMock = new mongoose.Types.ObjectId().toString();

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
    user: userMongooseId,
    __v: 0,
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
    __v: 0,
  },
];

export const playersMock1: PlayerStructure[] = [
  {
    _id: idPlayerMock,
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
    user: userMongooseId,
    __v: 0,
  },
];

export const playersMock2: PlayerStructure[] = [
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

export const playerCreatedMock: Omit<PlayerStructure, "_id"> = {
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
  user: new mongoose.Types.ObjectId().toString(),
};

export const postPlayerMock: PlayerStructure = {
  _id: new mongoose.Types.ObjectId().toString(),
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
  user: userMongooseId,
  __v: 0,
};

export const playerByIdMock: PlayerStructure[] = [
  {
    _id: idPlayerMock,
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
    user: userMongooseId,
    __v: 0,
  },
];

export const receivedPlayer: ReceivedPlayer = {
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
};
