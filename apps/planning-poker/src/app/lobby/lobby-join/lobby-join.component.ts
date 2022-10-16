import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { filter, from, map, merge, Subject, switchMap, take, tap, timer } from "rxjs";
import { LobbyService } from "../../shared/services/lobby.service";
import { Icon } from "../../shared/utils/icon.utils";

@UntilDestroy()
@Component({
  selector: "pp-lobby-join",
  templateUrl: "./lobby-join.component.html",
  styleUrls: ["./lobby-join.component.scss"],
})
export class LobbyJoinComponent {
  protected readonly lobbyIdCtrl = new FormControl<string>("", {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(this.lobbyService.ID_PATTERN)],
  });

  protected readonly pasteLobbyId$$ = new Subject<void>();

  protected readonly joinLobby$$ = new Subject<void>();

  protected readonly ICON = {
    PASTE: Icon.of("paste"),
    JOIN: Icon.of("person-walking-arrow-right"),
  };

  constructor(private readonly lobbyService: LobbyService, router: Router) {
    merge(timer(0), this.pasteLobbyId$$)
      .pipe(
        map(() => navigator.clipboard),
        filter(Boolean),
        switchMap((clipboard) => from(clipboard.readText())),
        filter((text) => lobbyService.ID_PATTERN.test(text)),
        untilDestroyed(this)
      )
      .subscribe((lobbyId) => this.lobbyIdCtrl.setValue(lobbyId));

    this.joinLobby$$
      .pipe(
        tap(() => {
          this.lobbyIdCtrl.updateValueAndValidity();
          this.lobbyIdCtrl.markAsTouched();
          this.lobbyIdCtrl.markAsDirty();
        }),
        filter(() => this.lobbyIdCtrl.valid),
        take(1),
        switchMap(() => lobbyService.join$(this.lobbyIdCtrl.value))
      )
      .subscribe(({ state }) =>
        router.navigateByUrl(`/lobby/${this.lobbyIdCtrl.value}/${state !== "pending" ? state : ""}`)
      );
  }
}
