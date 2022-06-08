import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';

import { LobbyJoinComponent } from './lobby-join.component';

import { IsAuthenticatedGuard } from '../../shared/guards/is-authenticated.guard';

@NgModule({
  declarations: [LobbyJoinComponent],
  imports: [
    ButtonModule,
    CardModule,
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
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
