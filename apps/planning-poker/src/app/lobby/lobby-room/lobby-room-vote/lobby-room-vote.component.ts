import { Component } from "@angular/core";
import { PokerCard } from "@planning-poker/shared";
import { map, take } from "rxjs/operators";
import { LobbyService } from "../../../shared/services/lobby.service";
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

  public usersLength$ = this.lobbyService.users$.pipe(
    take(1),
    map((users) => users.length)
  );

  constructor(private readonly lobbyService: LobbyService) {}

  public selectCard(points: string): void {
    this.cards.forEach((card) => (card.selected = card.points === points && !card.selected));
  }
}
