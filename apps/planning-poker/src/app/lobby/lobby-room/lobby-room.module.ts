import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { CommonModule } from "@angular/common";
import { RippleModule } from "primeng/ripple";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { SVGModule } from "../../shared/svg/svg.module";

import { LobbyRoomComponent } from "./lobby-room.component";

import { IsAuthenticatedGuard } from "../../shared/guards/is-authenticated.guard";

@NgModule({
  declarations: [LobbyRoomComponent],
  imports: [
    ButtonModule,
    CardModule,
    CommonModule,
    RippleModule,
    RouterModule.forChild([
      {
        path: "",
        component: LobbyRoomComponent,
        canActivate: [IsAuthenticatedGuard],
      },
    ]),
    SharedModule,
    SVGModule,
  ],
})
export class LobbyRoomModule {}
