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
}

export interface UserStructure {
  _id: string;
  name: string;
  authId: string;
}
