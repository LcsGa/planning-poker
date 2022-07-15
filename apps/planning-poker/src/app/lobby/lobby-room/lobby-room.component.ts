import { Component } from "@angular/core";
import { map, take } from "rxjs/operators";
import { UserService } from "../../shared/services/user.service";

@Component({
  selector: "pp-lobby-room",
  templateUrl: "./lobby-room.component.html",
  styleUrls: ["./lobby-room.component.scss"],
})
export class LobbyRoomComponent {
  public readonly isHost$ = this.userService.user$.pipe(
    take(1),
    map((user) => user?.isHost)
  );

  constructor(private readonly userService: UserService) {}
}
