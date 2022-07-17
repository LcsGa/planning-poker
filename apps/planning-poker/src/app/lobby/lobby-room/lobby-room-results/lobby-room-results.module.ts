import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { ChartModule } from "primeng/chart";
import { CommonModule } from "@angular/common";
import { RippleModule } from "primeng/ripple";
import { RouterModule } from "@angular/router";

import { LobbyRoomResultsComponent } from "./lobby-room-results.component";
import { DisplayResultComponent } from "./display-result/display-result.component";

@NgModule({
  declarations: [LobbyRoomResultsComponent, DisplayResultComponent],
  imports: [
    ButtonModule,
    CardModule,
    ChartModule,
    CommonModule,
    RippleModule,
    RouterModule.forChild([{ path: "", component: LobbyRoomResultsComponent }]),
  ],
})
export class LobbyRoomResultsModule {}
