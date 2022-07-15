import { ColorTriplet } from "../types/color-triplet";
import { PokerCard } from "./poker-card";

export interface User {
  id?: string;
  name: string;
  color: ColorTriplet;
  lobbyId?: string;
  isHost?: boolean;
  vote?: PokerCard["points"];
}
