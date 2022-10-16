import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";

type Theme = "dark" | "light";

export type ThemeLabel = "clair" | "sombre";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private readonly KEY = "theme";

  private readonly theme$$ = new ReplaySubject<Theme>(1);
  public readonly theme$ = this.theme$$.asObservable();

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  public update(theme: Theme): void {
    const themeLink = this.document.querySelector("[theme]") as HTMLLinkElement;
    themeLink.href = theme + ".css";
    this.store(theme);
  }

  public store(theme: Theme): void {
    this.theme$$.next(theme);
    localStorage.setItem(this.KEY, theme);
  }

  public init(): void {
    this.update((localStorage.getItem(this.KEY) as Theme | null) ?? "light");
  }
}
