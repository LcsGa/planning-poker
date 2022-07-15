import { Component, OnDestroy } from "@angular/core";
import { PokerCard } from "@planning-poker/shared";
import { LobbyService } from "../../shared/services/lobby.service";
import { Icon } from "../../shared/utils/icon.utils";

@Component({
  selector: "pp-lobby-room",
  templateUrl: "./lobby-room.component.html",
  styleUrls: ["./lobby-room.component.scss"],
})
export class LobbyRoomComponent implements OnDestroy {
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

  public readonly ICON = {
    CHECK: Icon.of("circle-check"),
  };

  public started = false;

  constructor(private readonly lobbyService: LobbyService) {}

  ngOnDestroy(): void {
    this.lobbyService.disconnect();
  }

  public selectCard(points: string): void {
    this.cards.forEach((card) => (card.selected = card.points === points && !card.selected));
  }
}
