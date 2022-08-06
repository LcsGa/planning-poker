import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { PlanningEvent, PokerCard } from "@planning-poker/shared";
import { Socket } from "ngx-socket-io";
import { ConfirmationService } from "primeng/api";
import { combineLatest, filter, map, startWith, Subject, switchMap } from "rxjs";
import { LobbyService } from "../../../shared/services/lobby.service";
import { UserService } from "../../../shared/services/user.service";
import { Icon } from "../../../shared/utils/icon.utils";

@UntilDestroy()
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

  public readonly isHost$ = this.userService.singleUser$.pipe(map((user) => user?.isHost));

  public readonly usersLength$ = this.lobbyService.users$.pipe(map((users) => users.length));

  public readonly voteCount$ = this.socket.fromEvent<number>(PlanningEvent.VOTE_COUNT).pipe(startWith(0));

  private readonly canCompleteVote$ = new Subject<boolean>();

  private readonly requestVoteCompletion$ = new Subject<void>();

  constructor(
    private readonly userService: UserService,
    private readonly lobbyService: LobbyService,
    private readonly socket: Socket,
    router: Router,
    activatedRoute: ActivatedRoute,
    private readonly confirmationService: ConfirmationService
  ) {
    socket
      .fromOneTimeEvent(PlanningEvent.VOTE_DONE)
      .then(() => router.navigate(["..", "results"], { relativeTo: activatedRoute }));

    combineLatest([this.voteCount$, this.usersLength$])
      .pipe(
        switchMap(([voteCount, usersLength]) => this.requestVoteCompletion$.pipe(map(() => [voteCount, usersLength]))),
        untilDestroyed(this)
      )
      .subscribe(([voteCount, usersLength]) => {
        if (voteCount !== usersLength) {
          this.confirmationService.confirm({
            header: "Clôturer les votes ?",
            icon: Icon.of("triangle-exclamation"),
            message: "Certains joueurs n'ont pas voté, veux-tu clôturer les votes ?",
            acceptLabel: "Confirmer",
            rejectLabel: "Refuser",
            accept: () => this.canCompleteVote$.next(true),
            reject: () => this.canCompleteVote$.next(false),
            closeOnEscape: true,
            dismissableMask: true,
          });
        } else {
          this.canCompleteVote$.next(true);
        }
      });

    this.canCompleteVote$
      .pipe(
        filter(Boolean),
        switchMap(() => this.userService.singleUser$),
        untilDestroyed(this)
      )
      .subscribe((user) => this.socket.emit(PlanningEvent.VOTE_DONE, user?.lobbyId));
  }

  public selectCard(points: PokerCard["points"]): void {
    this.cards.forEach((card) => (card.selected = card.points === points && !card.selected));
    this.vote();
  }

  public get points(): PokerCard["points"] | undefined {
    return this.cards.find((card) => card.selected)?.points;
  }

  private vote(): void {
    this.userService.singleUser$.subscribe((user) =>
      this.socket.emit(PlanningEvent.VOTE, { user, points: this.points })
    );
  }

  public requestVoteCompletion(): void {
    this.requestVoteCompletion$.next();
  }
}
