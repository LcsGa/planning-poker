import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { take } from "rxjs/operators";

type Theme = "dark" | "light";

export type ThemeLabel = "clair" | "sombre";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private readonly KEY = "theme";

  private readonly theme$$ = new ReplaySubject<Theme>(1);
  public readonly theme$ = this.theme$$.pipe(take(1));

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  public switch(theme: Theme): void {
    const themeLink = this.document.querySelector("[theme]") as HTMLLinkElement;
    themeLink.href = theme + ".css";
    this.store(theme);
  }

  public store(theme: Theme): void {
    this.theme$$.next(theme);
    localStorage.setItem(this.KEY, theme);
  }

  public init(): void {
    this.switch((localStorage.getItem(this.KEY) as Theme | null) ?? "light");
  }
}
