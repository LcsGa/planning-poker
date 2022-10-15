import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { PlanningEvent, PokerCard } from "@planning-poker/shared";
import { Socket } from "ngx-socket-io";
import { ConfirmationService } from "primeng/api";
import { audit, combineLatest, combineLatestWith, filter, Observable, of, Subject, switchMap } from "rxjs";
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
  protected readonly ICON = {
    CHECK: Icon.of("circle-check"),
  };

  protected readonly cards: PokerCard[] = [
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

  protected readonly vote$$ = new Subject<PokerCard["points"] | void>();

  protected readonly voteCount$ = this.socket.fromEvent<number>(PlanningEvent.VOTE_COUNT);

  protected readonly requestVoteCompletion$$ = new Subject<void>();

  private readonly requestForcedVoteCompletion$ = new Observable((subsciber) => {
    this.confirmationService.confirm({
      header: "Clôturer les votes ?",
      icon: Icon.of("triangle-exclamation"),
      message: "Certains joueurs n'ont pas voté, veux-tu clôturer les votes ?",
      acceptLabel: "Confirmer",
      rejectLabel: "Refuser",
      accept: () => {
        subsciber.next(true);
        subsciber.complete();
      },
      reject: () => {
        subsciber.next(false);
        subsciber.complete();
      },
      closeOnEscape: true,
      dismissableMask: true,
    });
  });

  constructor(
    protected readonly userService: UserService,
    protected readonly lobbyService: LobbyService,
    private readonly socket: Socket,
    router: Router,
    activatedRoute: ActivatedRoute,
    private readonly confirmationService: ConfirmationService
  ) {
    // start requesting the votes count
    this.userService.singleUser$.subscribe((user) => this.socket.emit(PlanningEvent.VOTE_COUNT, user?.lobbyId));

    this.vote$$
      .pipe(combineLatestWith(userService.singleUser$), untilDestroyed(this))
      .subscribe(([points, user]) => this.socket.emit(PlanningEvent.VOTE, { user, points }));

    socket
      .fromOneTimeEvent(PlanningEvent.VOTE_DONE)
      .then(() => router.navigate(["..", "results"], { relativeTo: activatedRoute }));

    combineLatest([this.voteCount$, lobbyService.usersLength$])
      .pipe(
        audit(() => this.requestVoteCompletion$$),
        switchMap(([voteCount, usersLength]) =>
          voteCount !== usersLength ? this.requestForcedVoteCompletion$ : of(true)
        ),
        filter(Boolean),
        switchMap(() => this.userService.singleUser$),
        untilDestroyed(this)
      )
      .subscribe((user) => this.socket.emit(PlanningEvent.VOTE_DONE, user?.lobbyId));
  }

  protected selectCard(points: PokerCard["points"]): void {
    this.cards.forEach((card) => (card.selected = card.points === points && !card.selected));
    this.vote$$.next(this.selectedPoints);
  }

  protected get selectedPoints(): PokerCard["points"] | undefined {
    return this.cards.find((card) => card.selected)?.points;
  }
}
