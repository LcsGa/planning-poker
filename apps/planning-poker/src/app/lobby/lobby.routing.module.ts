import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        children: [
          {
            path: "init",
            loadChildren: () => import("./lobby-init/lobby-init.module").then((m) => m.LobbyInitModule),
          },
          {
            path: "create",
            loadChildren: () => import("./lobby-create/lobby-create.module").then((m) => m.LobbyCreateModule),
          },
          {
            path: "join",
            loadChildren: () => import("./lobby-join/lobby-join.module").then((m) => m.LobbyJoinModule),
          },
          {
            path: ":id",
            loadChildren: () => import("./lobby-room/lobby-room.module").then((m) => m.LobbyRoomModule),
          },
        ],
      },
    ]),
  ],
})
export class LobbyRoutingModule {}
