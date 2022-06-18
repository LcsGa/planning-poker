export class Icon {
  public static of(iconName: string | number): string {
    return "fa-solid fa-" + String(iconName);
  }
}
