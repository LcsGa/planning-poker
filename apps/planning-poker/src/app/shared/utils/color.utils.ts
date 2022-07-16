import { ColorTriplet } from "@planning-poker/shared";

export class Color {
  public static THEME = {
    BLUE: "#609af8",
    GREEN: "#4cd07d",
    YELLOW: "#eec137",
    CYAN: "#35c4dc",
    PINK: "#f06bac",
    INDIGO: "#8183f4",
    TEAL: "#41c5b7",
    ORANGE: "#fa8e42",
    PURPLE: "#b975f9",
    RED: "#ff6259",
  };

  public static TEXT = {
    DARK: "#ffffffde",
    LIGHT: "#495057",
  };

  private static get randomRgbInt(): number {
    return Math.floor(Math.random() * 256);
  }

  public static get random(): ColorTriplet {
    return { r: Color.randomRgbInt, g: Color.randomRgbInt, b: Color.randomRgbInt };
  }

  public static get randomRgb(): string {
    const color = this.random;
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
  }
}
