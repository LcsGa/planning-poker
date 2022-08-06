import { Component } from "@angular/core";
import { map } from "rxjs";
import { UserService } from "../../shared/services/user.service";
import { Icon } from "../../shared/utils/icon.utils";

@Component({
  selector: "pp-lobby-init",
  templateUrl: "./lobby-init.component.html",
  styleUrls: ["./lobby-init.component.scss"],
})
export class LobbyInitComponent {
  public readonly initHeader$ = this.userService.singleUser$.pipe(
    map((user) => `${user!.name}, que veux-tu faire maintenant ?`)
  );

  public readonly ICON = {
    CREATE: Icon.of("plus-square"),
    JOIN: Icon.of("person-booth"),
  };

  constructor(private readonly userService: UserService) {}
}
