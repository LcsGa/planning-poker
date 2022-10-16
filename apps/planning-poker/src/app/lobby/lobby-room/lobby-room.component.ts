import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { PlanningEvent } from "@planning-poker/shared";
import { Socket } from "ngx-socket-io";
import { map, Subject, switchMap } from "rxjs";
import { LobbyService } from "../../shared/services/lobby.service";
import { UserService } from "../../shared/services/user.service";

@UntilDestroy()
@Component({
  selector: "pp-lobby-room",
  templateUrl: "./lobby-room.component.html",
  styleUrls: ["./lobby-room.component.scss"],
})
export class LobbyRoomComponent {
  protected readonly pendingMessage$ = this.userService.user$.pipe(
    map((user) => (user?.isHost ? "Lancer la plannif'..." : "En attente de l'hôte..."))
  );

  protected readonly start$$ = new Subject<void>();

  constructor(
    protected readonly userService: UserService,
    protected readonly lobbyService: LobbyService,
    socket: Socket,
    router: Router,
    activatedRoute: ActivatedRoute
  ) {
    socket
      .fromOneTimeEvent(PlanningEvent.START)
      .then(() => router.navigate([".", "vote"], { relativeTo: activatedRoute }));

    this.start$$
      .pipe(
        switchMap(() => userService.singleUser$),
        untilDestroyed(this)
      )
      .subscribe((user) => socket.emit(PlanningEvent.START, user!.lobbyId));
  }
}
