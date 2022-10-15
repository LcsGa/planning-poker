import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { MessageService } from "primeng/api";
import {
  debounceTime,
  delayWhen,
  distinctUntilChanged,
  filter,
  from,
  map,
  merge,
  Subject,
  take,
  tap,
  timer,
} from "rxjs";
import { generate as shortUuid } from "short-uuid";
import { LobbyService } from "../../shared/services/lobby.service";
import { Icon } from "../../shared/utils/icon.utils";

@UntilDestroy()
@Component({
  selector: "pp-lobby-create",
  templateUrl: "./lobby-create.component.html",
  styleUrls: ["./lobby-create.component.scss"],
})
export class LobbyCreateComponent {
  protected readonly lobbyIdCtrl = new FormControl<string>(shortUuid().slice(0, 10), {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(10)],
  });

  protected readonly filterPattern = /\w/;

  protected readonly ICON = {
    COPY: Icon.of("copy"),
    START: Icon.of("flag-checkered"),
  };

  protected readonly createLobby$$ = new Subject<void>();

  protected readonly copyLobbyId$$ = new Subject<void>();

  constructor(messageService: MessageService, lobbyService: LobbyService, router: Router) {
    this.createLobby$$
      .pipe(
        filter(() => this.lobbyIdCtrl.valid),
        take(1),
        delayWhen(() => lobbyService.join$(this.lobbyIdCtrl.value))
      )
      .subscribe((lobbyId) => router.navigateByUrl(`/lobby/${lobbyId}`));

    merge(timer(0), this.lobbyIdCtrl.valueChanges.pipe(distinctUntilChanged(), debounceTime(300)), this.copyLobbyId$$)
      .pipe(
        filter(() => this.lobbyIdCtrl.valid),
        map(() => navigator.clipboard),
        filter(Boolean),
        delayWhen((clipboard) => from(clipboard.writeText(this.lobbyIdCtrl.value))),
        tap(() =>
          messageService.add({
            severity: "info",
            summary: "Copié !",
            closable: false,
            life: 1000,
          })
        ),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
