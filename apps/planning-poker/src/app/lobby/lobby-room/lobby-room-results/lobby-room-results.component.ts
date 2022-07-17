import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PlanningEvent, PointsLabel, VoteResult } from "@planning-poker/shared";
import { ChartData, ChartOptions } from "chart.js";
import { Socket } from "ngx-socket-io";
import { from, Observable } from "rxjs";
import { map, share, take, tap } from "rxjs/operators";
import { ThemeService } from "../../../shared/services/theme.service";
import { UserService } from "../../../shared/services/user.service";
import { Color } from "../../../shared/utils/color.utils";
import { median } from "../../../shared/utils/median.utils";

@Component({
  selector: "pp-lobby-room-results",
  templateUrl: "./lobby-room-results.component.html",
  styleUrls: ["./lobby-room-results.component.scss", "../lobby-room.component.scss"],
})
export class LobbyRoomResultsComponent {
  public readonly chartOptions$: Observable<ChartOptions> = this.themeService.theme$.pipe(
    map((theme) => ({
      plugins: {
        legend: { labels: { color: theme === "dark" ? Color.TEXT.DARK : Color.TEXT.LIGHT } },
      },
    }))
  );

  private readonly user$ = this.userService.user$.pipe(take(1));

  public readonly isHost$ = this.user$.pipe(map((user) => user?.isHost));

  private results$ = from(this.socket.fromOneTimeEvent<VoteResult[]>(PlanningEvent.RESULTS)).pipe(
    map((results) => results.filter(([, count]) => count !== 0)),
    map((results) => results.map(([label, count]) => [PointsLabel.get(label)!, count] as const))
  );

  public resultsData$: Observable<ChartData> = this.results$.pipe(
    map((results) => ({
      labels: results.map(([label]) => label),
      datasets: [
        {
          data: results.map(([, count]) => count),
          backgroundColor: Object.values(Color.THEME),
        },
      ],
    }))
  );

  private readonly transformedResutls$ = this.results$.pipe(
    map((results) => results.map(([label, count]) => [Number(label), count]).filter(([val]) => !Number.isNaN(val)))
  );

  public readonly average$: Observable<number | undefined> = this.transformedResutls$.pipe(
    map((results) =>
      results.reduce(([accVal, accCount], [val, count]) => [accVal + val * count, accCount + count], [0, 0])
    ),
    map(([sumValues, sumCounts]) => (sumCounts ? sumValues / sumCounts : undefined)),
    share()
  );

  public median$: Observable<number | undefined> = this.transformedResutls$.pipe(
    map((results) =>
      median(
        results.map(([val, count]: number[]) => new Array(count).fill(val)).reduce((acc, val) => [...acc, ...val], []) // FIXME use flatMap instead of reduce (not available in the current ts version)
      )
    ),
    share()
  );

  constructor(
    private readonly userService: UserService,
    private readonly themeService: ThemeService,
    private readonly socket: Socket,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.user$.pipe(tap((user) => socket.emit(PlanningEvent.RESULTS, user!.lobbyId))).subscribe(); // ask for results

    socket
      .fromOneTimeEvent(PlanningEvent.VOTE_NEXT)
      .then(() => router.navigate(["..", "vote"], { relativeTo: activatedRoute }));
  }

  public keepVoting(): void {
    this.user$.pipe(tap((user) => this.socket.emit(PlanningEvent.VOTE_NEXT, user!.lobbyId))).subscribe();
  }
}
