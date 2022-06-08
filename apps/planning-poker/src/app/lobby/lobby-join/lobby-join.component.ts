import { AfterViewInit, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LobbyService } from '../../shared/services/lobby.service';
import { Icon } from '../../shared/utils/icon.utils';

@Component({
  selector: 'pp-lobby-join',
  templateUrl: './lobby-join.component.html',
  styleUrls: ['./lobby-join.component.scss'],
})
export class LobbyJoinComponent implements AfterViewInit {
  public lobbyIdCtrl: FormControl;

  public readonly ICON = {
    PASTE: Icon.of('paste'),
    JOIN: Icon.of('person-walking-arrow-right'),
  };

  constructor(private readonly lobbyService: LobbyService) {
    this.lobbyIdCtrl = new FormControl('', [
      Validators.pattern(lobbyService.ID_PATTERN),
    ]);
  }

  ngAfterViewInit(): void {
    this.pasteLobbyId();
  }

  public pasteLobbyId(): void {
    navigator.clipboard
      .readText()
      .then((text) => {
        if (this.lobbyService.ID_PATTERN.test(text)) {
          this.lobbyIdCtrl.setValue(text);
        }
      })
      .catch(console.error);
  }
}
