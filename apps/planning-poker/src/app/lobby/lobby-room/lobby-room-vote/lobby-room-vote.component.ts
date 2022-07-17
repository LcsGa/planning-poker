import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PlanningEvent, PokerCard } from "@planning-poker/shared";
import { Socket } from "ngx-socket-io";
import { map, startWith, take, tap } from "rxjs/operators";
import { LobbyService } from "../../../shared/services/lobby.service";
import { UserService } from "../../../shared/services/user.service";
import { Icon } from "../../../shared/utils/icon.utils";

@Component({
  selector: "pp-vote",
  templateUrl: "./lobby-room-vote.component.html",
  styleUrls: ["../lobby-room.component.scss"],
})
export class LobbyRoomVoteComponent {
  public readonly ICON = {
    CHECK: Icon.of("circle-check"),
  };

  public readonly cards: PokerCard[] = [
    { points: "0", selected: false },
    { points: "demi", selected: false },
    { points: "1", selected: false },
    { points: "2", selected: false },
    { points: "3", selected: false },
    { points: "5", selected: false },
    { points: "8", selected: false },
    { points: "13", selected: false },
    { points: "20", selected: false },
    { points: "40", selected: false },
    { points: "80", selected: false },
    { points: "100", selected: false },
    { points: "question", selected: false },
    { points: "coffee", selected: false },
  ];

  private user$ = this.userService.user$.pipe(take(1));

  public isHost$ = this.user$.pipe(map((user) => user?.isHost));

  public usersLength$ = this.lobbyService.users$.pipe(map((users) => users.length));

  public voteCount$ = this.socket.fromEvent(PlanningEvent.VOTE_COUNT).pipe(startWith(0));

  constructor(
    private readonly userService: UserService,
    private readonly lobbyService: LobbyService,
    private readonly socket: Socket,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    socket
      .fromOneTimeEvent(PlanningEvent.VOTE_DONE)
      .then(() => router.navigate(["..", "results"], { relativeTo: activatedRoute }));
  }

  public selectCard(points: PokerCard["points"]): void {
    this.cards.forEach((card) => (card.selected = card.points === points && !card.selected));
    this.vote();
  }

  private get points(): PokerCard["points"] | undefined {
    return this.cards.find((card) => card.selected)?.points;
  }

  private vote(): void {
    this.user$.pipe(tap((user) => this.socket.emit(PlanningEvent.VOTE, { user, points: this.points }))).subscribe();
  }

  public completeVotes(): void {
    this.user$.pipe(tap((user) => this.socket.emit(PlanningEvent.VOTE_DONE, user?.lobbyId))).subscribe();
  }
}
