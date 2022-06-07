import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        children: [
          {
            path: 'init',
            loadChildren: () =>
              import('./lobby-init/lobby-init.module').then(
                (m) => m.LobbyInitModule
              ),
          },
        ],
      },
    ]),
  ],
})
export class LobbyRoutingModule {}
