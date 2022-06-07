import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LobbyCreateComponent } from './lobby-create.component';

import { IsAuthenticatedGuard } from '../../shared/guards/is-authenticated.guard';

@NgModule({
  declarations: [LobbyCreateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LobbyCreateComponent,
        canActivate: [IsAuthenticatedGuard],
      },
    ]),
  ],
})
export class LobbyCreateModule {}
