import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IsAuthenticatedGuard } from "../shared/guards/is-authenticated.guard";
import { LeaveLobbyGuard } from "../shared/guards/leave-lobby.guard";
import { LobbyRoomResultsComponent } from "./lobby-room/lobby-room-results/lobby-room-results.component";
import { LobbyRoomVoteComponent } from "./lobby-room/lobby-room-vote/lobby-room-vote.component";
import { LobbyRoomComponent } from "./lobby-room/lobby-room.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        children: [
          {
            path: "init",
            loadComponent: () => import("./lobby-init/lobby-init.component").then((m) => m.LobbyInitComponent),
            canActivate: [IsAuthenticatedGuard],
          },
          {
            path: "create",
            loadComponent: () => import("./lobby-create/lobby-create.component").then((m) => m.LobbyCreateComponent),
            canActivate: [IsAuthenticatedGuard],
          },
          {
            path: "join",
            loadComponent: () => import("./lobby-join/lobby-join.component").then((m) => m.LobbyJoinComponent),
            canActivate: [IsAuthenticatedGuard],
          },
          {
            path: ":id",
            canActivate: [IsAuthenticatedGuard],
            canDeactivate: [LeaveLobbyGuard],
            loadChildren: () => [
              { path: "", component: LobbyRoomComponent },
              { path: "vote", component: LobbyRoomVoteComponent },
              { path: "results", component: LobbyRoomResultsComponent },
            ],
          },
        ],
      },
    ]),
  ],
})
export class LobbyRoutingModule {}
