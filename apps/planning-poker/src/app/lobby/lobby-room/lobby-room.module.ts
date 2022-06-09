import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokerCardModule } from '../../shared/components/poker-card/poker-card.module';
import { RouterModule } from '@angular/router';

import { LobbyRoomComponent } from './lobby-room.component';

import { IsAuthenticatedGuard } from '../../shared/guards/is-authenticated.guard';

@NgModule({
  declarations: [LobbyRoomComponent],
  imports: [
    CommonModule,
    PokerCardModule,
    RouterModule.forChild([
      {
        path: '',
        component: LobbyRoomComponent,
        canActivate: [IsAuthenticatedGuard],
      },
    ]),
  ],
})
export class LobbyRoomModule {}
