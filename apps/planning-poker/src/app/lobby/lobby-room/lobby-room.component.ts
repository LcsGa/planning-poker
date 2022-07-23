import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PlanningEvent } from "@planning-poker/shared";
import { Socket } from "ngx-socket-io";
import { map, take, tap } from "rxjs/operators";
import { LobbyService } from "../../shared/services/lobby.service";
import { UserService } from "../../shared/services/user.service";

@Component({
  selector: "pp-lobby-room",
  templateUrl: "./lobby-room.component.html",
  styleUrls: ["./lobby-room.component.scss"],
})
export class LobbyRoomComponent {
  private readonly user$ = this.userService.user$.pipe(take(1));

  public readonly isHost$ = this.userService.user$.pipe(
    // tap(console.log), // FIXME too many calls
    map((user) => user?.isHost)
  );

  public readonly pendingMessage$ = this.user$.pipe(
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
    this.user$.pipe(tap((user) => this.socket.emit(PlanningEvent.START, user!.lobbyId))).subscribe();
  }
}
