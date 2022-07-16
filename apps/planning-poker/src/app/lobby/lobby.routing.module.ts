import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IsAuthenticatedGuard } from "../shared/guards/is-authenticated.guard";
import { LeaveLobbyGuard } from "../shared/guards/leave-lobby.guard";

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
            canActivate: [IsAuthenticatedGuard],
            canDeactivate: [LeaveLobbyGuard],
            children: [
              { path: "", loadChildren: () => import("./lobby-room/lobby-room.module").then((m) => m.LobbyRoomModule) },
              {
                path: "vote",
                loadChildren: () =>
                  import("./lobby-room/lobby-room-vote/lobby-room-vote.module").then((m) => m.LobbyRoomVoteModule),
              },
              {
                path: "results",
                loadChildren: () =>
                  import("./lobby-room/lobby-room-results/lobby-room-results.module").then(
                    (m) => m.LobbyRoomResultsModule
                  ),
              },
            ],
          },
        ],
      },
    ]),
  ],
})
export class LobbyRoutingModule {}
