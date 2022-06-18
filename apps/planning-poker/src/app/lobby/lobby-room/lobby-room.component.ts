import { Component } from "@angular/core";
import { Icon } from "../../shared/utils/icon.utils";

@Component({
  selector: "pp-lobby-room",
  templateUrl: "./lobby-room.component.html",
  styleUrls: ["./lobby-room.component.scss"],
})
export class LobbyRoomComponent {
  public readonly cards = [
    { points: "0" as const, isSelected: false },
    { points: "demi" as const, isSelected: false },
    { points: "1" as const, isSelected: false },
    { points: "2" as const, isSelected: false },
    { points: "3" as const, isSelected: false },
    { points: "5" as const, isSelected: false },
    { points: "8" as const, isSelected: false },
    { points: "13" as const, isSelected: false },
    { points: "20" as const, isSelected: false },
    { points: "40" as const, isSelected: false },
    { points: "100" as const, isSelected: false },
    { points: "question" as const, isSelected: false },
    { points: "coffee" as const, isSelected: false },
  ];

  public selectCard(points: string): void {
    this.cards.forEach((card) => (card.isSelected = card.points === points && !card.isSelected));
  }
}
