export interface PlayerStructure {
  _id: string;
  name: string;
  country: string;
  age: number;
  height: number;
  goals: number;
  games: number;
  position: string;
  image: string;
  isBought: boolean;
  user: string;
  __v?: number;
}

export interface UserStructure {
  _id: string;
  name: string;
  authId: string;
}

export interface ReceivedPlayer {
  name: string;
  country: string;
  age: number;
  height: number;
  goals: number;
  games: number;
  position: string;
  image: string;
  isBought: boolean;
}
