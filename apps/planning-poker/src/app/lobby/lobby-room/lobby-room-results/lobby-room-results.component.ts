import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PlanningEvent, PointsLabel, VoteResult } from "@planning-poker/shared";
import { ChartData, ChartOptions } from "chart.js";
import { Socket } from "ngx-socket-io";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { ChartModule } from "primeng/chart";
import { RippleModule } from "primeng/ripple";
import { from, map, Observable, share } from "rxjs";
import { LabelValueComponent } from "../../../shared/components/label-value/label-value.component";
import { ThemeService } from "../../../shared/services/theme.service";
import { UserService } from "../../../shared/services/user.service";
import { Color } from "../../../shared/utils/color.utils";
import { median } from "../../../shared/utils/median.utils";

@Component({
  selector: "pp-lobby-room-results",
  standalone: true,
  imports: [ButtonModule, CardModule, ChartModule, CommonModule, LabelValueComponent, RippleModule],
  templateUrl: "./lobby-room-results.component.html",
  styleUrls: ["./lobby-room-results.component.scss", "../lobby-room.component.scss"],
})
export class LobbyRoomResultsComponent {
  protected readonly chartOptions$: Observable<ChartOptions> = this.themeService.theme$.pipe(
    map((theme) => ({
      plugins: {
        legend: { labels: { color: theme === "dark" ? Color.TEXT.DARK : Color.TEXT.LIGHT } },
      },
    }))
  );

  private readonly currentResults$ = from(this.socket.fromOneTimeEvent<VoteResult[]>(PlanningEvent.RESULTS)).pipe(
    map((results) => results.filter(([, count]) => count !== 0)),
    map((results) => results.map(([label, count]) => [PointsLabel.get(label)!, count] as const)),
    share()
  );

  protected readonly resultsData$: Observable<ChartData> = this.currentResults$.pipe(
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

  private readonly transformedResutls$ = this.currentResults$.pipe(
    map((results) => results.map(([label, count]) => [Number(label), count]).filter(([val]) => !Number.isNaN(val))),
    share()
  );

  protected readonly average$: Observable<number | undefined> = this.transformedResutls$.pipe(
    map((results) =>
      results.reduce(([accVal, accCount], [val, count]) => [accVal + val * count, accCount + count], [0, 0])
    ),
    map(([sumValues, sumCounts]) => (sumCounts ? sumValues / sumCounts : undefined)),
    share()
  );

  protected median$: Observable<number | undefined> = this.transformedResutls$.pipe(
    map((results) =>
      median(
        results.map(([val, count]: number[]) => new Array(count).fill(val)).reduce((acc, val) => [...acc, ...val], []) // FIXME use flatMap instead of reduce (not available in the current ts version)
      )
    ),
    share()
  );

  constructor(
    protected readonly userService: UserService,
    private readonly themeService: ThemeService,
    private readonly socket: Socket,
    router: Router,
    activatedRoute: ActivatedRoute
  ) {
    // requests results
    this.userService.singleUser$.subscribe((user) => socket.emit(PlanningEvent.RESULTS, user!.lobbyId));

    socket
      .fromOneTimeEvent(PlanningEvent.VOTE_NEXT)
      .then(() => router.navigate(["..", "vote"], { relativeTo: activatedRoute }));
  }

  protected keepVoting(): void {
    this.userService.singleUser$.subscribe((user) => this.socket.emit(PlanningEvent.VOTE_NEXT, user!.lobbyId));
  }
}
