import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { ChipModule } from "primeng/chip";
import { CommonModule } from "@angular/common";
import { PokerCardModule } from "../../shared/components/poker-card/poker-card.module";
import { RippleModule } from "primeng/ripple";
import { RouterModule } from "@angular/router";
import { SVGModule } from "../../shared/svg/svg.module";
import { ToolbarModule } from "primeng/toolbar";

import { LobbyRoomComponent } from "./lobby-room.component";

import { IsAuthenticatedGuard } from "../../shared/guards/is-authenticated.guard";

@NgModule({
  declarations: [LobbyRoomComponent],
  imports: [
    ButtonModule,
    CardModule,
    ChipModule,
    CommonModule,
    PokerCardModule,
    RippleModule,
    RouterModule.forChild([
      {
        path: "",
        component: LobbyRoomComponent,
        canActivate: [IsAuthenticatedGuard],
      },
    ]),
    SVGModule,
    ToolbarModule,
  ],
})
export class LobbyRoomModule {}
