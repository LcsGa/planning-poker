import { Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map, Observable, Subject, switchMap, take, tap } from "rxjs";
import { LobbyService } from "../../services/lobby.service";
import { ThemeLabel, ThemeService } from "../../services/theme.service";
import { Icon } from "../../utils/icon.utils";

interface ThemeIcon {
  on: string;
  off: string;
}

@UntilDestroy()
@Component({
  selector: "pp-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent {
  protected readonly ICON = {
    SUN: Icon.of("sun"),
    MOON: Icon.of("moon"),
  };

  private readonly themeLabel$$ = new Subject<ThemeLabel>();
  protected readonly themeLabel$ = this.themeLabel$$.asObservable();

  protected readonly switchTheme$$ = new Subject<void>();

  protected readonly icon$: Observable<ThemeIcon> = this.themeService.theme$.pipe(
    take(1),
    map((theme) =>
      theme === "light" ? { on: this.ICON.MOON, off: this.ICON.SUN } : { on: this.ICON.SUN, off: this.ICON.MOON }
    )
  );

  constructor(protected readonly lobbyService: LobbyService, private readonly themeService: ThemeService) {
    this.themeService.theme$
      .pipe(untilDestroyed(this))
      .subscribe((theme) => this.themeLabel$$.next(theme === "light" ? "clair" : "sombre"));

    this.switchTheme$$
      .pipe(
        switchMap(() => this.themeService.theme$.pipe(take(1))),
        untilDestroyed(this)
      )
      .subscribe((theme) => this.themeService.update(theme === "light" ? "dark" : "light"));
  }
}
