import { Component } from "@angular/core";
import { PlanningEvent } from "@planning-poker/shared";
import { ChartData, ChartOptions } from "chart.js";
import { Socket } from "ngx-socket-io";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ThemeService } from "../../../shared/services/theme.service";
import { Color } from "../../../shared/utils/color.utils";

@Component({
  selector: "pp-lobby-room-results",
  templateUrl: "./lobby-room-results.component.html",
  styleUrls: ["./lobby-room-results.component.scss"],
})
export class LobbyRoomResultsComponent {
  public results?: ChartData;

  public readonly chartOptions$: Observable<ChartOptions> = this.themeService.theme$.pipe(
    map((theme) => ({
      plugins: {
        legend: { labels: { color: theme === "dark" ? Color.TEXT.DARK : Color.TEXT.LIGHT } },
      },
    }))
  );

  private readonly labels = ["0", "1/2", "1", "2", "3", "5", "8", "13", "20", "40", "80", "100", "?", "Café"];

  constructor(private readonly themeService: ThemeService, private readonly socket: Socket) {
    this.socket.fromOneTimeEvent(PlanningEvent.RESULTS).then();
    this.results = {
      labels: this.labels,
      datasets: [
        {
          data: [28, 48, 40, 19, 86, 27, 90, 5, 4, 8, 97, 4],
          backgroundColor: Object.values(Color.THEME),
        },
      ],
    };
  }
}
