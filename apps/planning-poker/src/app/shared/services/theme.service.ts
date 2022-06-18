import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";

type Theme = "dark" | "light";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private readonly KEY = "theme";

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  public get stored(): Theme {
    return (localStorage.getItem(this.KEY) as Theme) ?? "light";
  }

  public switch(theme: Theme): void {
    const themeLink = this.document.querySelector("[theme]") as HTMLLinkElement;
    themeLink.href = theme + ".css";
    this.store(theme);
  }

  public store(theme: Theme): void {
    localStorage.setItem(this.KEY, theme);
  }

  public init(): void {
    this.switch(this.stored);
  }
}
