import { Route } from '@angular/router';

export const routes: Route[] = [
  { path: '', redirectTo: 'authenticate', pathMatch: 'full' },
  {
    path: 'authenticate',
    loadChildren: () =>
      import('./authenticate/authenticate.module').then(
        (m) => m.AuthenticateModule
      ),
  },
];
