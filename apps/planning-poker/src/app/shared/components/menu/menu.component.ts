import { Component } from "@angular/core";
import { map, Observable, take } from "rxjs";
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

  private readonly initialTheme$ = this.themeService.theme$.pipe(take(1));

  public readonly icon$: Observable<ThemeIcon> = this.initialTheme$.pipe(
    map((theme) =>
      theme === "light" ? { on: this.ICON.MOON, off: this.ICON.SUN } : { on: this.ICON.SUN, off: this.ICON.MOON }
    )
  );

  constructor(private readonly lobbyService: LobbyService, private readonly themeService: ThemeService) {
    this.initialTheme$.subscribe((theme) => (this.themeLabel = theme === "light" ? "clair" : "sombre"));
  }

  public switchTheme(): void {
    this.initialTheme$.subscribe((theme) => {
      this.themeLabel = theme === "light" ? "sombre" : "clair";
      this.themeService.switch(theme === "light" ? "dark" : "light");
    });
  }
}
