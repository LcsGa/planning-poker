import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PlanningEvent } from "@planning-poker/shared";
import { Socket } from "ngx-socket-io";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { RippleModule } from "primeng/ripple";
import { map } from "rxjs";
import { LabelValueComponent } from "../../shared/components/label-value/label-value.component";
import { LobbyService } from "../../shared/services/lobby.service";
import { UserService } from "../../shared/services/user.service";
import { WaitingComponent } from "../../shared/svg/waiting/waiting.component";

@Component({
  selector: "pp-lobby-room",
  standalone: true,
  imports: [ButtonModule, CardModule, CommonModule, LabelValueComponent, RippleModule, WaitingComponent],
  templateUrl: "./lobby-room.component.html",
  styleUrls: ["./lobby-room.component.scss"],
})
export class LobbyRoomComponent {
  protected readonly pendingMessage$ = this.userService.user$.pipe(
    map((user) => (user?.isHost ? "Lancer la plannif'..." : "En attente de l'hôte..."))
  );

  constructor(
    protected readonly userService: UserService,
    protected readonly lobbyService: LobbyService,
    private readonly socket: Socket,
    router: Router,
    activatedRoute: ActivatedRoute
  ) {
    this.socket
      .fromOneTimeEvent(PlanningEvent.START)
      .then(() => router.navigate([".", "vote"], { relativeTo: activatedRoute }));
  }

  protected start(): void {
    this.userService.singleUser$.subscribe((user) => this.socket.emit(PlanningEvent.START, user!.lobbyId));
  }
}
