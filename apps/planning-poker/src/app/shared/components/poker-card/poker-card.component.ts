import { Component, Input } from "@angular/core";

@Component({
  selector: "pp-poker-card",
  templateUrl: "./poker-card.component.html",
  styleUrls: ["./poker-card.component.scss"],
})
export class PokerCardComponent {
  @Input()
  public points?: string;

  @Input()
  public isSelected = false;
}
