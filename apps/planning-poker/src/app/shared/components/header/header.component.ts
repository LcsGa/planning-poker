import { Component } from "@angular/core";
import { ThemeService } from "../../services/theme.service";
import { Icon } from "../../utils/icon.utils";

@Component({
  selector: "pp-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  public readonly ICON = {
    SUN: Icon.of("sun"),
    MOON: Icon.of("moon"),
    MENU: Icon.of("bars"),
  };

  public display = false;

  public readonly THEME = {
    LIGHT: "clair",
    DARK: "sombre",
  };

  public theme = this.THEME.LIGHT;

  constructor(private readonly themeService: ThemeService) {}

  public switchTheme(): void {
    this.theme = this.themeService.stored === "light" ? this.THEME.DARK : this.THEME.LIGHT;
    this.themeService.switch(this.theme === this.THEME.DARK ? "dark" : "light");
  }
}
