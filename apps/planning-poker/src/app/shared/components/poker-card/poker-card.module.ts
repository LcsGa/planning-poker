import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PokerCardComponent } from "./poker-card.component";
import { ImagePathPipe } from "./pipes/image-path.pipe";
import { SvgMaskPipe } from "./pipes/svg-mask.pipe";

@NgModule({
  declarations: [PokerCardComponent, ImagePathPipe, SvgMaskPipe],
  imports: [CommonModule],
  exports: [PokerCardComponent],
})
export class PokerCardModule {}
