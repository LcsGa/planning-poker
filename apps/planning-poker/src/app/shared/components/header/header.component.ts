import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { SidebarModule } from "primeng/sidebar";
import { Icon } from "../../utils/icon.utils";
import { MenuComponent } from "../menu/menu.component";

@Component({
  selector: "pp-header",
  standalone: true,
  imports: [CommonModule, ButtonModule, MenuComponent, RippleModule, RouterModule, SidebarModule],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  protected readonly ICON = {
    MENU: Icon.of("bars"),
  };

  protected displayMenu = false;

  constructor(private readonly router: Router) {}

  protected goToAuth(): void {
    this.router.navigateByUrl("/auth");
  }
}
