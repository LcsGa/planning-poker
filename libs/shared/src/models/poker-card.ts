export interface PokerCard {
  points: "0" | "demi" | "1" | "2" | "3" | "5" | "8" | "13" | "20" | "40" | "80" | "100" | "question" | "coffee";
  selected: boolean;
}

export const PointsLabel: Map<PokerCard["points"], string> = new Map([
  ["0", "0"],
  ["demi", "0.5"],
  ["1", "1"],
  ["2", "2"],
  ["3", "3"],
  ["5", "5"],
  ["8", "8"],
  ["13", "13"],
  ["20", "20"],
  ["40", "40"],
  ["80", "80"],
  ["100", "100"],
  ["question", "?"],
  ["coffee", "Café"],
]);

export type VoteResult = [PokerCard["points"], number];
