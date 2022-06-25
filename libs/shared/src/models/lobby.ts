import { User } from "./user";

export interface Lobby {
  host: User["id"];
  users: User[];
}

export type Lobbies = Record<string, Lobby>;
