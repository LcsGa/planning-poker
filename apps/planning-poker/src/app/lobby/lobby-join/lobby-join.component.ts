import { AfterViewInit, Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { filter, from } from "rxjs";
import { LobbyService } from "../../shared/services/lobby.service";
import { Icon } from "../../shared/utils/icon.utils";

@Component({
  selector: "pp-lobby-join",
  templateUrl: "./lobby-join.component.html",
  styleUrls: ["./lobby-join.component.scss"],
})
export class LobbyJoinComponent implements AfterViewInit {
  public lobbyIdCtrl: FormControl;

  public readonly ICON = {
    PASTE: Icon.of("paste"),
    JOIN: Icon.of("person-walking-arrow-right"),
    FACE_SWEAT: Icon.of("face-grin-beam-sweat"),
  };

  constructor(private readonly lobbyService: LobbyService, private readonly router: Router) {
    this.lobbyIdCtrl = new FormControl("", [Validators.required, Validators.pattern(lobbyService.ID_PATTERN)]);
  }

  ngAfterViewInit(): void {
    this.pasteLobbyId();
  }

  public pasteLobbyId(): void {
    from(navigator.clipboard.readText())
      .pipe(filter((text) => this.lobbyService.ID_PATTERN.test(text)))
      .subscribe({ next: (text) => this.lobbyIdCtrl.setValue(text), error: console.error });
  }

  public joinLobby(): void {
    if (this.lobbyIdCtrl.valid) {
      this.lobbyService
        .joinOnce$(this.lobbyIdCtrl.value)
        .subscribe(({ state }) =>
          this.router.navigateByUrl(`/lobby/${this.lobbyIdCtrl.value}${state !== "pending" ? "/" + state : ""}`)
        );
    } else {
      this.lobbyIdCtrl.updateValueAndValidity();
      this.lobbyIdCtrl.markAsTouched();
    }
  }
}
