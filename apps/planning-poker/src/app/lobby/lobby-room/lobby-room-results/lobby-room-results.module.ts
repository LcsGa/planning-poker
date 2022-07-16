import { NgModule } from "@angular/core";
import { CardModule } from "primeng/card";
import { ChartModule } from "primeng/chart";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { LobbyRoomResultsComponent } from "./lobby-room-results.component";

@NgModule({
  declarations: [LobbyRoomResultsComponent],
  imports: [
    CardModule,
    ChartModule,
    CommonModule,
    RouterModule.forChild([{ path: "", component: LobbyRoomResultsComponent }]),
  ],
})
export class LobbyRoomResultsModule {}
