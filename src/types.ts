export interface PlayerStructure {
  id: string;
  name: string;
  country: string;
  age: number;
  height: number;
  goals: number;
  games: number;
  position: string;
  image: string;
  user: string;
}

export interface UserStructure {
  id: string;
  name: string;
  authId: string;
}
