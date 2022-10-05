import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ImagePathPipe } from "./pipes/image-path.pipe";
import { SvgMaskPipe } from "./pipes/svg-mask.pipe";

@Component({
  selector: "pp-poker-card",
  standalone: true,
  imports: [CommonModule, ImagePathPipe, SvgMaskPipe],
  templateUrl: "./poker-card.component.html",
  styleUrls: ["./poker-card.component.scss"],
})
export class PokerCardComponent {
  @Input()
  public points?: string;

  @Input()
  public selected = false;

  @Input()
  public disabled = false;
}
