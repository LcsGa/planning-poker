import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PlanningEvent } from "@planning-poker/shared";
import { Socket } from "ngx-socket-io";
import { map, take } from "rxjs";
import { LobbyService } from "../../shared/services/lobby.service";
import { UserService } from "../../shared/services/user.service";

@Component({
  selector: "pp-lobby-room",
  templateUrl: "./lobby-room.component.html",
  styleUrls: ["./lobby-room.component.scss"],
})
export class LobbyRoomComponent {
  public readonly isHost$ = this.userService.singleUser$.pipe(map((user) => user?.isHost));

  public readonly pendingMessage$ = this.userService.singleUser$.pipe(
    map((user) => (user?.isHost ? "Lancer la plannif'..." : "En attente de l'hôte..."))
  );

  public readonly usersLength$ = this.lobbyService.users$.pipe(map((users) => users.length));

  constructor(
    private readonly userService: UserService,
    private readonly lobbyService: LobbyService,
    private readonly socket: Socket,
    router: Router,
    activatedRoute: ActivatedRoute
  ) {
    this.socket
      .fromOneTimeEvent(PlanningEvent.START)
      .then(() => router.navigate([".", "vote"], { relativeTo: activatedRoute }));
  }

  public start(): void {
    this.userService.singleUser$.subscribe((user) => this.socket.emit(PlanningEvent.START, user!.lobbyId));
  }
}
