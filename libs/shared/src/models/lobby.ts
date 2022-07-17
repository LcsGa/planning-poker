import { User } from "./user";

export interface Lobby {
  host: User["id"];
  users: User[];
  state: "pending" | "vote" | "results";
}

export type Lobbies = Record<string, Lobby>;
