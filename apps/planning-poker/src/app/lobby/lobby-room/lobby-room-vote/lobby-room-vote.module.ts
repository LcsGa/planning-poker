import { NgModule } from "@angular/core";
import { ChipModule } from "primeng/chip";
import { CommonModule } from "@angular/common";
import { PokerCardModule } from "../../../shared/components/poker-card/poker-card.module";

import { LobbyRoomVoteComponent } from "./lobby-room-vote.component";
import { RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";

@NgModule({
  declarations: [LobbyRoomVoteComponent],
  imports: [
    ButtonModule,
    ChipModule,
    CommonModule,
    PokerCardModule,
    RippleModule,
    RouterModule.forChild([
      {
        path: "",
        component: LobbyRoomVoteComponent,
      },
    ]),
  ],
})
export class LobbyRoomVoteModule {}
