import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';

import { LobbyInitComponent } from './lobby-init.component';

import { IsAuthenticatedGuard } from '../../shared/guards/is-authenticated.guard';

@NgModule({
  declarations: [LobbyInitComponent],
  imports: [
    ButtonModule,
    CardModule,
    CommonModule,
    RippleModule,
    RouterModule.forChild([
      {
        path: '',
        component: LobbyInitComponent,
        canActivate: [IsAuthenticatedGuard],
      },
    ]),
  ],
})
export class LobbyInitModule {}
