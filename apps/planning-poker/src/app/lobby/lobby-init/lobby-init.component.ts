import { Component } from "@angular/core";
import { User } from "@planning-poker/shared";
import { map } from "rxjs/operators";
import { UserService } from "../../shared/services/user.service";
import { Icon } from "../../shared/utils/icon.utils";

@Component({
  selector: "pp-lobby-init",
  templateUrl: "./lobby-init.component.html",
  styleUrls: ["./lobby-init.component.scss"],
})
export class LobbyInitComponent {
  public readonly initHeader$ = this.userService.user$.pipe(
    map((user) => user as User),
    map((user) => `${user.name}, que veux-tu faire maintenant ?`)
  );

  public readonly ICON = {
    CREATE: Icon.of("plus-square"),
    JOIN: Icon.of("person-booth"),
  };

  constructor(private readonly userService: UserService) {}
}
