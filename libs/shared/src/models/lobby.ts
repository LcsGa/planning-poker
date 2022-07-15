import { User } from "./user";

export interface Lobby {
  host: User["id"];
  users: User[];
  started: boolean;
}

export type Lobbies = Record<string, Lobby>;
