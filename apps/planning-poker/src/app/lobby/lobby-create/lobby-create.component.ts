import { Component } from '@angular/core';
import { Icon } from '../../shared/utils/icon.utils';
import { generate as shortUuid } from 'short-uuid';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'pp-lobby-create',
  templateUrl: './lobby-create.component.html',
  styleUrls: ['./lobby-create.component.scss'],
})
export class LobbyCreateComponent {
  public lobbyId = shortUuid().slice(0, 10);

  public readonly ICON = {
    COPY: Icon.of('clone'),
    START: Icon.of('flag-checkered'),
  };

  constructor(private readonly messageService: MessageService) {}

  public copyLobbyId(): void {
    navigator.clipboard.writeText(this.lobbyId).then(() =>
      this.messageService.add({
        severity: 'info',
        summary: 'Copié !',
        closable: false,
        life: 1_000,
      })
    );
  }
}
