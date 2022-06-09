import { Component } from '@angular/core';
import { Icon } from '../../shared/utils/icon.utils';

@Component({
  selector: 'pp-lobby-room',
  templateUrl: './lobby-room.component.html',
  styleUrls: ['./lobby-room.component.scss'],
})
export class LobbyRoomComponent {
  public readonly cardsPoints = [
    '0',
    'demi',
    '1',
    '2',
    '3',
    '5',
    '8',
    '13',
    '20',
    '40',
    '100',
    'question',
    'coffee',
  ];
}
