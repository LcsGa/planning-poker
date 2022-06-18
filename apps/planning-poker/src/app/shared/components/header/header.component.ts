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
    MENU: Icon.of("bars"),
  };

  public displayMenu = false;
}
