export type ColorTriplet = { r: number; g: number; b: number };

export class Color {
  private static get randomRgbInt(): number {
    return Math.floor(Math.random() * 256);
  }

  public static get random(): ColorTriplet {
    return { r: Color.randomRgbInt, g: Color.randomRgbInt, b: Color.randomRgbInt };
  }
}
