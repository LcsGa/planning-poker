import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { DividerModule } from "primeng/divider";
import { ToggleButtonModule } from "primeng/togglebutton";
import { map, Observable, Subject, take } from "rxjs";
import { LobbyService } from "../../services/lobby.service";
import { ThemeLabel, ThemeService } from "../../services/theme.service";
import { Icon } from "../../utils/icon.utils";
import { AvatarComponent } from "../avatar/avatar.component";

interface ThemeIcon {
  on: string;
  off: string;
}

@Component({
  selector: "pp-menu",
  standalone: true,
  imports: [AvatarComponent, CommonModule, DividerModule, ToggleButtonModule],
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent {
  protected readonly ICON = {
    SUN: Icon.of("sun"),
    MOON: Icon.of("moon"),
  };

  protected readonly themeLabel$$ = new Subject<ThemeLabel>();

  private readonly initialTheme$ = this.themeService.theme$.pipe(take(1));

  protected readonly icon$: Observable<ThemeIcon> = this.initialTheme$.pipe(
    map((theme) =>
      theme === "light" ? { on: this.ICON.MOON, off: this.ICON.SUN } : { on: this.ICON.SUN, off: this.ICON.MOON }
    )
  );

  constructor(protected readonly lobbyService: LobbyService, private readonly themeService: ThemeService) {
    this.initialTheme$.subscribe((theme) => this.themeLabel$$.next(theme === "light" ? "clair" : "sombre"));
  }

  protected switchTheme(): void {
    this.initialTheme$.subscribe((theme) => {
      this.themeLabel$$.next(theme === "light" ? "sombre" : "clair");
      this.themeService.switch(theme === "light" ? "dark" : "light");
    });
  }
}
