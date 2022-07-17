import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { LobbyService } from "../../services/lobby.service";
import { ThemeLabel, ThemeService } from "../../services/theme.service";
import { Icon } from "../../utils/icon.utils";

interface ThemeIcon {
  on: string;
  off: string;
}

@Component({
  selector: "pp-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent {
  public users$ = this.lobbyService.users$;

  public readonly ICON = {
    SUN: Icon.of("sun"),
    MOON: Icon.of("moon"),
  };

  public themeLabel!: ThemeLabel;

  private readonly theme$ = this.themeService.theme$.pipe(take(1));

  public readonly icon$: Observable<ThemeIcon> = this.theme$.pipe(
    map((theme) =>
      theme === "light" ? { on: this.ICON.MOON, off: this.ICON.SUN } : { on: this.ICON.SUN, off: this.ICON.MOON }
    )
  );

  constructor(private readonly lobbyService: LobbyService, private readonly themeService: ThemeService) {
    this.theme$.pipe(tap((theme) => (this.themeLabel = theme === "light" ? "clair" : "sombre"))).subscribe();
  }

  public switchTheme(): void {
    this.theme$
      .pipe(
        tap((theme) => (this.themeLabel = theme === "light" ? "sombre" : "clair")),
        tap((theme) => this.themeService.switch(theme === "light" ? "dark" : "light"))
      )
      .subscribe();
  }
}
