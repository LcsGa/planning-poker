import { ColorTriplet } from "@planning-poker/shared";

export class Color {
  private static get randomRgbInt(): number {
    return Math.floor(Math.random() * 256);
  }

  public static get random(): ColorTriplet {
    return { r: Color.randomRgbInt, g: Color.randomRgbInt, b: Color.randomRgbInt };
  }
}