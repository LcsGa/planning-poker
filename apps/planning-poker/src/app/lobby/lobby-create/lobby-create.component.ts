import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { generate as shortUuid } from 'short-uuid';
import { UserService } from '../../shared/services/user.service';
import { Icon } from '../../shared/utils/icon.utils';

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

  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

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

  public startLobby(): void {
    this.userService.addLobby(this.lobbyId);
    this.router.navigateByUrl(`/lobby/${this.lobbyId}`);
  }
}
