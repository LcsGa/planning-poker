import { ColorTriplet } from "../types/color-triplet";

export interface User {
  id?: string;
  name: string;
  color: ColorTriplet;
  lobbyId?: string;
  isHost?: boolean;
}

export type SimpleUser = Omit<User, "lobbyId" | "isHost">;
