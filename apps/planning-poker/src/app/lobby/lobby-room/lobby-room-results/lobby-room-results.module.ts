import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { ChartModule } from "primeng/chart";
import { CommonModule } from "@angular/common";
import { RippleModule } from "primeng/ripple";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../../shared/shared.module";

import { LobbyRoomResultsComponent } from "./lobby-room-results.component";

@NgModule({
  declarations: [LobbyRoomResultsComponent],
  imports: [
    ButtonModule,
    CardModule,
    ChartModule,
    CommonModule,
    RippleModule,
    RouterModule.forChild([{ path: "", component: LobbyRoomResultsComponent }]),
    SharedModule,
  ],
})
export class LobbyRoomResultsModule {}
