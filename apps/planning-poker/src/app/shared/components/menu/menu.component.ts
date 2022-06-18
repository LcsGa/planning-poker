import { Component } from "@angular/core";
import { ThemeService } from "../../services/theme.service";
import { Icon } from "../../utils/icon.utils";

@Component({
  selector: "pp-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent {
  public readonly ICON = {
    SUN: Icon.of("sun"),
    MOON: Icon.of("moon"),
  };

  public theme?: "clair" | "sombre";

  constructor(private readonly themeService: ThemeService) {}

  public switchTheme(): void {
    this.theme = this.themeService.stored === "light" ? "sombre" : "clair";
    this.themeService.switch(this.themeService.stored === "light" ? "dark" : "light");
  }
}
