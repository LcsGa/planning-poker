import { Component } from "@angular/core";
import { Router } from "@angular/router";
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

  constructor(private readonly router: Router) {}

  public goToAuth(): void {
    this.router.navigateByUrl("/auth");
  }
}
