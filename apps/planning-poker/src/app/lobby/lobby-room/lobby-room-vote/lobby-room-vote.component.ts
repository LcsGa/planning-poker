import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { PlanningEvent, PokerCard } from "@planning-poker/shared";
import { Socket } from "ngx-socket-io";
import { ConfirmationService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { ChipModule } from "primeng/chip";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { combineLatest, filter, map, Observable, of, startWith, Subject, switchMap, take, tap } from "rxjs";
import { PokerCardComponent } from "../../../shared/components/poker-card/poker-card.component";
import { LobbyService } from "../../../shared/services/lobby.service";
import { UserService } from "../../../shared/services/user.service";
import { Icon } from "../../../shared/utils/icon.utils";

@UntilDestroy()
@Component({
  selector: "pp-vote",
  standalone: true,
  imports: [ButtonModule, ChipModule, CommonModule, ConfirmDialogModule, PokerCardComponent],
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

  protected readonly voteCount$ = this.socket.fromEvent<number>(PlanningEvent.VOTE_COUNT).pipe(startWith(0));

  private readonly requestVoteCompletion$$ = new Subject<void>();

  private readonly canCompleteVote$ = new Observable((subsciber) => {
    this.confirmationService.confirm({
      header: "Clôturer les votes ?",
      icon: Icon.of("triangle-exclamation"),
      message: "Certains joueurs n'ont pas voté, veux-tu clôturer les votes ?",
      acceptLabel: "Confirmer",
      rejectLabel: "Refuser",
      accept: () => subsciber.next(true),
      reject: () => subsciber.next(false),
      closeOnEscape: true,
      dismissableMask: true,
    });
    subsciber.complete();
  });

  constructor(
    protected readonly userService: UserService,
    protected readonly lobbyService: LobbyService,
    private readonly socket: Socket,
    router: Router,
    activatedRoute: ActivatedRoute,
    private readonly confirmationService: ConfirmationService
  ) {
    this.requestsVoteCount();

    socket
      .fromOneTimeEvent(PlanningEvent.VOTE_DONE)
      .then(() => router.navigate(["..", "results"], { relativeTo: activatedRoute }));

    combineLatest([this.voteCount$, this.lobbyService.usersLength$])
      .pipe(
        switchMap(([voteCount, usersLength]) => this.requestVoteCompletion$$.pipe(map(() => [voteCount, usersLength]))),
        switchMap(([voteCount, usersLength]) => (voteCount !== usersLength ? this.canCompleteVote$ : of(true))),
        filter(Boolean),
        switchMap(() => this.userService.singleUser$),
        untilDestroyed(this)
      )
      .subscribe((user) => this.socket.emit(PlanningEvent.VOTE_DONE, user?.lobbyId));
  }

  protected selectCard(points: PokerCard["points"]): void {
    this.cards.forEach((card) => (card.selected = card.points === points && !card.selected));
    this.vote();
  }

  private requestsVoteCount(): void {
    this.userService.singleUser$.subscribe((user) => this.socket.emit(PlanningEvent.VOTE_COUNT, user?.lobbyId));
  }

  protected get points(): PokerCard["points"] | undefined {
    return this.cards.find((card) => card.selected)?.points;
  }

  private vote(): void {
    this.userService.singleUser$.subscribe((user) =>
      this.socket.emit(PlanningEvent.VOTE, { user, points: this.points })
    );
  }

  protected requestVoteCompletion(): void {
    this.requestVoteCompletion$$.next();
  }
}
