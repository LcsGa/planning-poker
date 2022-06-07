import { Route } from '@angular/router';

export const routes: Route[] = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'lobby',
    loadChildren: () =>
      import('./lobby/lobby.routing.module').then((m) => m.LobbyRoutingModule),
  },
];
