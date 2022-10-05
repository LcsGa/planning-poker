import { Route } from "@angular/router";

export const routes: Route[] = [
  { path: "", redirectTo: "auth", pathMatch: "full" },
  {
    path: "auth",
    loadComponent: () => import("./auth/auth.component").then((m) => m.AuthComponent),
  },
  {
    path: "lobby",
    loadChildren: () => import("./lobby/lobby.routing.module").then((m) => m.LobbyRoutingModule),
  },
];
