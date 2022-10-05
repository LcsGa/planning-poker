import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { RippleModule } from "primeng/ripple";
import { map } from "rxjs";
import { UserService } from "../../shared/services/user.service";
import { Icon } from "../../shared/utils/icon.utils";

@Component({
  selector: "pp-lobby-init",
  standalone: true,
  imports: [ButtonModule, CardModule, CommonModule, RippleModule],
  templateUrl: "./lobby-init.component.html",
  styleUrls: ["./lobby-init.component.scss"],
})
export class LobbyInitComponent {
  protected readonly initHeader$ = this.userService.singleUser$.pipe(
    map((user) => `${user!.name}, que veux-tu faire maintenant ?`)
  );

  protected readonly ICON = {
    CREATE: Icon.of("plus-square"),
    JOIN: Icon.of("person-booth"),
  };

  constructor(private readonly userService: UserService) {}
}
