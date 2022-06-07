import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LobbyJoinComponent } from './lobby-join.component';

import { IsAuthenticatedGuard } from '../../shared/guards/is-authenticated.guard';

@NgModule({
  declarations: [LobbyJoinComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LobbyJoinComponent,
        canActivate: [IsAuthenticatedGuard],
      },
    ]),
  ],
})
export class LobbyJoinModule {}
