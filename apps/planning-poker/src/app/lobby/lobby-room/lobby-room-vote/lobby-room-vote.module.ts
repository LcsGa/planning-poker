import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { ChipModule } from "primeng/chip";
import { CommonModule } from "@angular/common";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { PokerCardModule } from "../../../shared/components/poker-card/poker-card.module";
import { RouterModule } from "@angular/router";

import { LobbyRoomVoteComponent } from "./lobby-room-vote.component";

import { ConfirmationService } from "primeng/api";

@NgModule({
  declarations: [LobbyRoomVoteComponent],
  imports: [
    ButtonModule,
    ChipModule,
    CommonModule,
    ConfirmDialogModule,
    PokerCardModule,
    RouterModule.forChild([
      {
        path: "",
        component: LobbyRoomVoteComponent,
      },
    ]),
  ],
  providers: [ConfirmationService],
})
export class LobbyRoomVoteModule {}
