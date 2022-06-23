import { Component } from "@angular/core";
import { LobbyService } from "../../services/lobby.service";
import { ThemeService } from "../../services/theme.service";
import { Icon } from "../../utils/icon.utils";

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

  public theme?: "clair" | "sombre";

  constructor(private readonly lobbyService: LobbyService, private readonly themeService: ThemeService) {}

  public switchTheme(): void {
    this.theme = this.themeService.stored === "light" ? "sombre" : "clair";
    this.themeService.switch(this.themeService.stored === "light" ? "dark" : "light");
  }
}
