import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';

import { LobbyJoinComponent } from './lobby-join.component';

import { IsAuthenticatedGuard } from '../../shared/guards/is-authenticated.guard';

@NgModule({
  declarations: [LobbyJoinComponent],
  imports: [
    CommonModule,
    RippleModule,
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
