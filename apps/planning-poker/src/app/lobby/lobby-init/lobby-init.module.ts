import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LobbyInitComponent } from './lobby-init.component';

import { LobbyInitGuard } from './guards/lobby-init.guard';

@NgModule({
  declarations: [LobbyInitComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LobbyInitComponent,
        canActivate: [LobbyInitGuard],
      },
    ]),
  ],
})
export class LobbyInitModule {}
